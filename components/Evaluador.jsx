'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase-browser'
import {
  SECCIONES,
  calcularScoreCrisis,
  calcularScorePreparacion,
  determinarDecision,
  getVerdictoCrisis,
} from '../lib/preguntas'
import Resultados from './Resultados'
import styles from './Evaluador.module.css'

export default function Evaluador({ user }) {
  const router = useRouter()
  const [seccionActual, setSeccionActual] = useState(0) // 0 = landing
  const [respuestas, setRespuestas] = useState({})
  const [titulo, setTitulo] = useState('')
  const [cliente, setCliente] = useState('')
  const [notas, setNotas] = useState('')
  const [mostrandoResultados, setMostrandoResultados] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [evaluacionGuardada, setEvaluacionGuardada] = useState(null)

  const totalPreguntas = SECCIONES.reduce((acc, s) => acc + s.preguntas.length, 0)
  const respondidas = Object.keys(respuestas).length
  const progreso = Math.round((respondidas / totalPreguntas) * 100)

  function seleccionar(secIdx, pregIdx, optIdx) {
    setRespuestas(prev => ({ ...prev, [`${secIdx}-${pregIdx}`]: optIdx }))
  }

  function contarRespondidas(secIdx) {
    return SECCIONES[secIdx - 1].preguntas.filter((_, qi) =>
      respuestas[`${secIdx}-${qi}`] !== undefined
    ).length
  }

  function irA(idx) {
    setSeccionActual(idx)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function verResultados() {
    setMostrandoResultados(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function guardarEvaluacion() {
    if (!user) {
      router.push('/login?redirect=/evaluacion/nueva')
      return
    }
    setGuardando(true)
    const crisisScore = calcularScoreCrisis(respuestas)
    const prepScore = calcularScorePreparacion(respuestas)
    const decision = determinarDecision(crisisScore, prepScore)
    const veredicto = getVerdictoCrisis(crisisScore)

    const supabase = createClient()
    if (!supabase) {
      alert('Error de conexion. Intentá de nuevo más tarde.')
      setGuardando(false)
      return
    }
    const { data, error } = await supabase
      .from('evaluaciones')
      .insert({
        user_id: user.id,
        titulo: titulo || 'Evaluación sin título',
        cliente: cliente || null,
        answers: respuestas,
        crisis_score: crisisScore,
        prep_score: prepScore,
        appear_decision: decision,
        verdict: veredicto.nivel,
        notas: notas || null,
      })
      .select()
      .single()

    setGuardando(false)
    if (!error && data) {
      setEvaluacionGuardada(data)
    } else {
      alert('Error al guardar. Revisá tu conexión e intentá de nuevo.')
    }
  }

  function resetear() {
    setRespuestas({})
    setSeccionActual(0)
    setMostrandoResultados(false)
    setEvaluacionGuardada(null)
    setTitulo('')
    setCliente('')
    setNotas('')
  }

  if (mostrandoResultados) {
    return (
      <Resultados
        respuestas={respuestas}
        titulo={titulo}
        cliente={cliente}
        notas={notas}
        setNotas={setNotas}
        onGuardar={guardarEvaluacion}
        guardando={guardando}
        guardada={evaluacionGuardada}
        onNuevaEvaluacion={resetear}
        onVolver={() => { setMostrandoResultados(false); irA(6) }}
        user={user}
      />
    )
  }

  // Landing
  if (seccionActual === 0) {
    return (
      <div className={styles.landing}>
        <div className={styles.landingHero}>
          <div className={styles.badge}>⚡ Para consultores de comunicación</div>
          <h1 className={styles.heroTitle}>
            ¿Es una <span className={styles.gradient}>crisis mediática</span>?<br />
            ¿Hay que salir a hablar?
          </h1>
          <p className={styles.heroSub}>
            Evaluá cualquier situación en minutos. El sistema analiza 26 variables en 6 dimensiones y te da un diagnóstico claro con recomendaciones de acción.
          </p>

          <div className={styles.metaFields}>
            <div className={styles.field}>
              <label>Nombre de la evaluación</label>
              <input
                type="text"
                placeholder="Ej: Caso filtración datos — Cliente X"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Cliente / Organización (opcional)</label>
              <input
                type="text"
                placeholder="Ej: Empresa ABC"
                value={cliente}
                onChange={e => setCliente(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }} onClick={() => irA(1)}>
            Comenzar evaluación →
          </button>
        </div>

        <div className={styles.cardsGrid}>
          {[
            { icon: '🎯', title: '¿Es una crisis?', desc: 'Score de intensidad en 5 dimensiones: naturaleza, medios, redes, stakeholders y timing.' },
            { icon: '🎙️', title: '¿Hay que aparecer?', desc: 'Evaluación de preparación para definir si salir, esperar o mantener silencio estratégico.' },
            { icon: '📋', title: 'Plan de acción', desc: 'Recomendaciones concretas y pasos inmediatos según el perfil específico de la situación.' },
          ].map(c => (
            <div key={c.title} className={styles.infoCard}>
              <div className={styles.infoIcon}>{c.icon}</div>
              <div className={styles.infoTitle}>{c.title}</div>
              <div className={styles.infoDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Sections 1-6
  const secData = SECCIONES[seccionActual - 1]
  const respondCount = contarRespondidas(seccionActual)
  const totalCount = secData.preguntas.length
  const isLast = seccionActual === 6

  return (
    <div className={styles.evaluador}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <button className={styles.backBtn} onClick={() => irA(0)}>← Inicio</button>
          <div className={styles.navLabel}>Dimensiones</div>
          {SECCIONES.map((sec, idx) => {
            const sIdx = idx + 1
            const done = sec.preguntas.every((_, qi) => respuestas[`${sIdx}-${qi}`] !== undefined)
            const active = seccionActual === sIdx
            return (
              <button
                key={sIdx}
                className={`${styles.navItem} ${active ? styles.active : ''} ${done ? styles.done : ''}`}
                onClick={() => irA(sIdx)}
              >
                <span className={styles.navNum}>{done ? '✓' : sIdx}</span>
                <span>{sec.nombre}</span>
              </button>
            )
          })}
        </div>

        <div className={styles.sidebarBottom}>
          <div className={styles.progressLabel}>
            <span>Progreso</span>
            <span>{progreso}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>
            {seccionActual <= 5 ? `Dimensión ${seccionActual} de 6` : 'Dimensión 6 de 6 — Para decidir si aparecer'}
          </div>
          <h2 className={styles.sectionTitle}>{secData.nombre}</h2>
          <p className={styles.sectionDesc}>
            {seccionActual === 6
              ? 'Evaluá con qué herramientas contás hoy para salir a comunicar. Esta dimensión determina si es el momento correcto de aparecer.'
              : 'Respondé según la situación que estás evaluando. Si algo es incierto, usá la opción del medio.'}
          </p>
        </div>

        {secData.preguntas.map((preg, qi) => {
          const key = `${seccionActual}-${qi}`
          const selected = respuestas[key]
          const answered = selected !== undefined
          return (
            <div key={qi} className={`${styles.questionCard} ${answered ? styles.answered : ''}`}>
              <div className={styles.questionTop}>
                <span className={styles.questionNum}>{qi + 1}</span>
                <div>
                  <div className={styles.questionText}>{preg.texto}</div>
                  {preg.hint && <div className={styles.questionHint}>💡 {preg.hint}</div>}
                </div>
              </div>
              <div className={styles.options}>
                {preg.opciones.map((opt, oi) => {
                  const isSel = selected === oi
                  const score = preg.scores[oi]
                  let selClass = ''
                  if (isSel) {
                    selClass = score === 2 ? styles.selDanger : score === 1 ? styles.selWarning : styles.selSafe
                  }
                  return (
                    <button
                      key={oi}
                      className={`${styles.optBtn} ${isSel ? styles.selected : ''} ${selClass}`}
                      onClick={() => seleccionar(seccionActual, qi, oi)}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        <div className={styles.navBtns}>
          <button className="btn btn-secondary" onClick={() => irA(seccionActual - 1)}>← Anterior</button>
          <span className={styles.countLabel}>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{respondCount}</span>/{totalCount} respondidas
          </span>
          {isLast ? (
            <button className="btn btn-primary" onClick={verResultados}>
              Ver resultados →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => irA(seccionActual + 1)}>
              Siguiente →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import {
  calcularScoreCrisis,
  calcularScorePreparacion,
  calcularScorePorDimension,
  determinarDecision,
  getVerdictoCrisis,
  getAcciones,
} from '../lib/preguntas'
import styles from './Resultados.module.css'

export default function Resultados({
  respuestas,
  titulo,
  cliente,
  notas,
  setNotas,
  onGuardar,
  guardando,
  guardada,
  onNuevaEvaluacion,
  onVolver,
  user,
  readOnly = false,
}) {
  const crisisScore = calcularScoreCrisis(respuestas)
  const prepScore = calcularScorePreparacion(respuestas)
  const decision = determinarDecision(crisisScore, prepScore)
  const veredicto = getVerdictoCrisis(crisisScore)
  const dimScores = calcularScorePorDimension(respuestas)
  const acciones = getAcciones(decision)

  const prepColor = prepScore >= 65 ? '#10b981' : prepScore >= 35 ? '#f59e0b' : '#ef4444'
  const prepDesc = prepScore >= 65 ? 'Alta — condiciones dadas para salir' : prepScore >= 35 ? 'Media — completar preparación' : 'Baja — preparar antes de salir'

  const ringCrisisRef = useRef(null)
  const ringPrepRef = useRef(null)

  useEffect(() => {
    const circumference = 314
    setTimeout(() => {
      if (ringCrisisRef.current) {
        ringCrisisRef.current.style.strokeDashoffset = circumference - (circumference * crisisScore / 100)
        ringCrisisRef.current.style.stroke = veredicto.color
      }
      if (ringPrepRef.current) {
        ringPrepRef.current.style.strokeDashoffset = circumference - (circumference * prepScore / 100)
        ringPrepRef.current.style.stroke = prepColor
      }
    }, 150)
  }, [crisisScore, prepScore, veredicto.color, prepColor])

  function copiarResumen() {
    const decisionText = decision === 'si' ? 'SÍ — Salir a comunicar' : decision === 'esperar' ? 'ESPERAR — Preparación urgente' : 'NO — Monitoreo preventivo'
    const text = [
      'CRISIS CHECK — Evaluación de crisis mediática',
      '==============================================',
      titulo ? `Evaluación: ${titulo}` : '',
      cliente ? `Cliente: ${cliente}` : '',
      '',
      `Diagnóstico: ${veredicto.titulo}`,
      `Score de crisis: ${crisisScore}%`,
      `Score de preparación: ${prepScore}%`,
      `¿Hay que salir a hablar? ${decisionText}`,
      '',
      `Generado con Crisis Check — ${new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    ].filter(Boolean).join('\n')

    navigator.clipboard.writeText(text).then(() => {
      alert('Resumen copiado al portapapeles')
    })
  }

  return (
    <div className={styles.resultados}>
      {/* Header */}
      <div className={styles.header}>
        <div className={`${styles.verdictBadge} ${styles[`badge_${veredicto.nivel}`]}`}>
          {veredicto.label}
        </div>
        <h2 className={styles.verdictTitle}>{veredicto.titulo}</h2>
        {titulo && <div className={styles.evalTitulo}>{titulo}{cliente ? ` — ${cliente}` : ''}</div>}
      </div>

      {/* Scores */}
      <div className={styles.scoresGrid}>
        <div className={styles.scoreCard}>
          <div className={styles.scoreLabel}>Score de crisis</div>
          <div className={styles.scoreRing}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface2)" strokeWidth="10" />
              <circle
                ref={ringCrisisRef}
                cx="60" cy="60" r="50"
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset="314"
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s' }}
              />
            </svg>
            <div className={styles.scoreNum} style={{ color: veredicto.color }}>{crisisScore}%</div>
          </div>
          <div className={styles.scoreDesc}>
            {crisisScore >= 65 ? 'Alto — acción inmediata requerida' : crisisScore >= 35 ? 'Moderado — monitoreo activo' : 'Bajo — gestión preventiva'}
          </div>
        </div>

        <div className={styles.scoreCard}>
          <div className={styles.scoreLabel}>Score de preparación</div>
          <div className={styles.scoreRing}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface2)" strokeWidth="10" />
              <circle
                ref={ringPrepRef}
                cx="60" cy="60" r="50"
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset="314"
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s' }}
              />
            </svg>
            <div className={styles.scoreNum} style={{ color: prepColor }}>{prepScore}%</div>
          </div>
          <div className={styles.scoreDesc}>{prepDesc}</div>
        </div>
      </div>

      {/* Dimension breakdown */}
      <div className={styles.breakdown}>
        <div className={styles.breakdownTitle}>Detalle por dimensión</div>
        {dimScores.map(dim => {
          const color = dim.pct >= 65 ? '#ef4444' : dim.pct >= 35 ? '#f59e0b' : '#10b981'
          return (
            <div key={dim.nombre} className={styles.dimRow}>
              <div className={styles.dimName}>{dim.nombre}</div>
              <div className={styles.dimTrack}>
                <div className={styles.dimFill} style={{ width: `${dim.pct}%`, background: color }} />
              </div>
              <div className={styles.dimPct} style={{ color }}>{dim.pct}%</div>
            </div>
          )
        })}
      </div>

      {/* Decision */}
      <div className={styles.appearDecision}>
        <div className={styles.appearTitle}>🎙️ ¿Hay que salir a hablar?</div>
        <div className={styles.appearCards}>
          {[
            { key: 'si', icon: '✅', title: 'Sí, salir', desc: 'Crisis confirmada y preparación suficiente. El silencio ya tiene costo.' },
            { key: 'esperar', icon: '⏳', title: 'Esperar / preparar', desc: 'Hay presión pero faltan condiciones. Completar preparación en las próximas horas.' },
            { key: 'no', icon: '🔇', title: 'No salir', desc: 'La situación no justifica aparición. Monitoreo preventivo.' },
          ].map(opt => (
            <div key={opt.key} className={`${styles.appearCard} ${styles[`card_${opt.key}`]} ${decision === opt.key ? styles.cardActive : ''}`}>
              <div className={styles.appearIcon}>{opt.icon}</div>
              <div className={styles.appearCardTitle}>{opt.title}</div>
              <div className={styles.appearCardDesc}>{opt.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className={`${styles.recBox} ${styles[`rec_${decision}`]}`}>
        <div className={styles.recHeader}>
          <div className={styles.recIcon}>
            {decision === 'si' ? '🚨' : decision === 'esperar' ? '⚡' : '🔍'}
          </div>
          <div>
            <div className={styles.recTitle}>
              {decision === 'si' ? 'Salir a comunicar — Plan de acción inmediato' :
               decision === 'esperar' ? 'Preparación urgente — Ventana de 2-4 horas' :
               'Monitoreo preventivo — Sin acción inmediata'}
            </div>
          </div>
        </div>
        {acciones.map((a, i) => (
          <div key={i} className={styles.actionItem}>
            <span className={styles.actionNum}>{i + 1}</span>
            <span>{a}</span>
          </div>
        ))}
      </div>

      {/* Notas */}
      {!readOnly && (
        <div className={styles.notasBox}>
          <label>Notas adicionales (opcional)</label>
          <textarea
            placeholder="Contexto, próximos pasos, personas clave, etc."
            value={notas}
            onChange={e => setNotas(e.target.value)}
            rows={4}
          />
        </div>
      )}

      {readOnly && notas && (
        <div className={styles.notasBox}>
          <label>Notas</label>
          <p className={styles.notasText}>{notas}</p>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {!readOnly && !guardada && (
          <>
            <button className="btn btn-secondary no-print" onClick={onVolver}>← Editar respuestas</button>
            <button className="btn btn-secondary no-print" onClick={() => window.print()}>🖨️ Imprimir / PDF</button>
            <button className="btn btn-secondary no-print" onClick={copiarResumen}>📋 Copiar resumen</button>
            {user ? (
              <button className="btn btn-primary no-print" onClick={onGuardar} disabled={guardando}>
                {guardando ? 'Guardando...' : '💾 Guardar evaluación'}
              </button>
            ) : (
              <a href="/login?redirect=/evaluacion/nueva" className="btn btn-primary no-print">
                Iniciar sesión para guardar
              </a>
            )}
          </>
        )}
        {guardada && (
          <>
            <div className={styles.savedBadge}>✅ Evaluación guardada</div>
            <a href="/dashboard" className="btn btn-secondary">Ver mis evaluaciones</a>
            <button className="btn btn-primary" onClick={onNuevaEvaluacion}>+ Nueva evaluación</button>
          </>
        )}
        {readOnly && (
          <>
            <button className="btn btn-secondary" onClick={() => window.print()}>🖨️ Imprimir / PDF</button>
            <button className="btn btn-secondary" onClick={copiarResumen}>📋 Copiar resumen</button>
            <a href="/dashboard" className="btn btn-secondary">← Volver al dashboard</a>
          </>
        )}
      </div>
    </div>
  )
}

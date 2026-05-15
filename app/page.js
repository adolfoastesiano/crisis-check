import { createClient } from '../lib/supabase-server'
import Nav from '../components/Nav'
import Link from 'next/link'
import styles from './page.module.css'

export default async function Home() {
  const supabase = await createClient()
  let user = null
  
  if (supabase) {
    const { data } = await supabase.auth.getUser()
    user = data?.user
  }

  return (
    <>
      <Nav user={user} />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.badge}>⚡ Para consultores de comunicación</div>
          <h1 className={styles.title}>
            ¿Es una <span className={styles.gradient}>crisis mediática</span>?<br />
            ¿Hay que salir a hablar?
          </h1>
          <p className={styles.sub}>
            Evaluá cualquier situación en minutos. Diagnóstico en 26 variables y 6 dimensiones.
            Score de crisis, score de preparación y plan de acción concreto.
          </p>
          <div className={styles.ctas}>
            <Link href="/evaluacion/nueva" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
              Comenzar evaluación →
            </Link>
            {!user && (
              <Link href="/login" className="btn btn-secondary" style={{ fontSize: 15, padding: '14px 24px' }}>
                Crear cuenta gratis
              </Link>
            )}
          </div>
        </div>

        <div className={styles.features}>
          {[
            {
              icon: '🎯',
              title: '¿Es una crisis?',
              desc: 'Score ponderado en 5 dimensiones: naturaleza del hecho, presión mediática, redes sociales, stakeholders y timing.',
            },
            {
              icon: '🎙️',
              title: '¿Hay que aparecer?',
              desc: 'Evaluación de preparación para decidir si salir, esperar o mantener silencio estratégico.',
            },
            {
              icon: '📋',
              title: 'Plan de acción',
              desc: 'Pasos inmediatos y recomendaciones concretas según el perfil específico de cada situación.',
            },
            {
              icon: '💾',
              title: 'Historial de casos',
              desc: 'Guardá cada evaluación, revisala cuando quieras y construí un archivo de casos para tu consultoría.',
            },
          ].map(f => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div className={styles.howto}>
          <h2 className={styles.howtoTitle}>Cómo funciona</h2>
          <div className={styles.steps}>
            {[
              { n: '1', t: 'Describí la situación', d: 'Dale un nombre y asociala a un cliente antes de empezar.' },
              { n: '2', t: 'Respondé 26 preguntas', d: 'Organizadas en 6 dimensiones. No necesitás tener toda la info — las opciones contemplan incertidumbre.' },
              { n: '3', t: 'Recibí el diagnóstico', d: 'Score de crisis, score de preparación y decisión sobre si aparecer públicamente.' },
              { n: '4', t: 'Guardá y compartí', d: 'Archivá la evaluación en tu historial y exportá el reporte en PDF.' },
            ].map(s => (
              <div key={s.n} className={styles.step}>
                <div className={styles.stepNum}>{s.n}</div>
                <div className={styles.stepTitle}>{s.t}</div>
                <div className={styles.stepDesc}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

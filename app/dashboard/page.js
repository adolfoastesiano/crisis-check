import { createClient } from '../../lib/supabase-server'
import { redirect } from 'next/navigation'
import Nav from '../../components/Nav'
import Link from 'next/link'
import styles from './dashboard.module.css'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: evaluaciones } = await supabase
    .from('evaluaciones')
    .select('id, titulo, cliente, created_at, crisis_score, prep_score, appear_decision, verdict')
    .order('created_at', { ascending: false })

  const nivelColor = { crisis: '#ef4444', alerta: '#f59e0b', ok: '#10b981' }
  const nivelLabel = { crisis: '🔴 Crisis', alerta: '🟡 Alerta', ok: '🟢 Bajo control' }
  const decisionLabel = { si: 'Salir a hablar', esperar: 'Esperar / preparar', no: 'No salir' }

  return (
    <>
      <Nav user={user} />
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Mis evaluaciones</h1>
            <p className={styles.sub}>{evaluaciones?.length || 0} caso{evaluaciones?.length !== 1 ? 's' : ''} guardado{evaluaciones?.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/evaluacion/nueva" className="btn btn-primary">
            + Nueva evaluación
          </Link>
        </div>

        {!evaluaciones?.length ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📋</div>
            <div className={styles.emptyTitle}>Todavía no tenés evaluaciones guardadas</div>
            <p className={styles.emptyDesc}>Empezá evaluando una situación. El diagnóstico se guarda automáticamente en tu cuenta.</p>
            <Link href="/evaluacion/nueva" className="btn btn-primary">
              Comenzar primera evaluación →
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {evaluaciones.map(ev => (
              <Link key={ev.id} href={`/evaluacion/${ev.id}`} className={styles.card}>
                <div className={styles.cardLeft}>
                  <div className={styles.cardTitle}>{ev.titulo || 'Evaluación sin título'}</div>
                  {ev.cliente && <div className={styles.cardCliente}>{ev.cliente}</div>}
                  <div className={styles.cardDate}>
                    {new Date(ev.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <div className={styles.cardRight}>
                  <div className={styles.scores}>
                    <div className={styles.scorePill}>
                      <span className={styles.scoreVal} style={{ color: nivelColor[ev.verdict] }}>{ev.crisis_score}%</span>
                      <span className={styles.scoreKey}>crisis</span>
                    </div>
                    <div className={styles.scorePill}>
                      <span className={styles.scoreVal}>{ev.prep_score}%</span>
                      <span className={styles.scoreKey}>prep.</span>
                    </div>
                  </div>
                  <div className={styles.verdictTag} style={{ color: nivelColor[ev.verdict] }}>
                    {nivelLabel[ev.verdict]}
                  </div>
                  <div className={styles.decisionTag}>{decisionLabel[ev.appear_decision]}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

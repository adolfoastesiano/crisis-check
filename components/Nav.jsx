'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase-browser'
import styles from './Nav.module.css'

export default function Nav({ user }) {
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⚡</span>
        <span className={styles.logoText}>Crisis Check</span>
      </div>
      <div className={styles.right}>
        {user ? (
          <>
            <a href="/dashboard" className={styles.navLink}>Dashboard</a>
            <a href="/evaluacion/nueva" className={styles.btnNew}>+ Nueva evaluación</a>
            <button onClick={signOut} className={styles.signOut}>Salir</button>
          </>
        ) : (
          <>
            <a href="/login" className={styles.navLink}>Iniciar sesión</a>
            <a href="/login" className={styles.btnNew}>Comenzar gratis</a>
          </>
        )}
      </div>
    </nav>
  )
}

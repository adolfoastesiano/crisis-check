'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '../../lib/supabase-browser'
import styles from './login.module.css'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'

  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const supabase = createClient()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message === 'Email not confirmed'
        ? 'Tu cuenta todavía no fue confirmada. Revisá tu bandeja de spam o creá una cuenta nueva.'
        : 'Email o contraseña incorrectos.')
    } else if (data.session) {
      window.location.href = redirect
    }
    setLoading(false)
  }

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    if (error) {
      setError(error.message)
    } else if (data.session) {
      window.location.href = '/dashboard'
    } else {
      setSuccess('¡Cuenta creada! Revisá tu email para confirmar la cuenta antes de ingresar.')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <a href="/" className={styles.logo}>
        <span className={styles.logoIcon}>⚡</span>
        <span>Crisis Check</span>
      </a>

      <div className={styles.card}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === 'login' ? styles.tabActive : ''}`} onClick={() => { setTab('login'); setError(''); setSuccess('') }}>
            Iniciar sesión
          </button>
          <button className={`${styles.tab} ${tab === 'signup' ? styles.tabActive : ''}`} onClick={() => { setTab('signup'); setError(''); setSuccess('') }}>
            Crear cuenta
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className={styles.form}>
            <h2 className={styles.formTitle}>Bienvenido de vuelta</h2>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" required placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Contraseña</label>
              <input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className={styles.form}>
            <h2 className={styles.formTitle}>Crear cuenta gratis</h2>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" required placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Contraseña</label>
              <input type="password" required placeholder="Mínimo 6 caracteres" minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

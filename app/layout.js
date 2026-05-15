import './globals.css'
import ThemeProvider from '../components/ThemeProvider'

export const metadata = {
  title: 'Crisis Check — Evaluador de Crisis Mediática',
  description: 'Evaluá cualquier situación en minutos: ¿es una crisis mediática? ¿hay que salir a hablar? Diagnóstico en 6 dimensiones para consultores de comunicación.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

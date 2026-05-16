# ⚡ Crisis Check

Plataforma para consultores de comunicación que evalúa si una situación es una crisis mediática y si hay que salir a hablar. Diagnóstico en 26 variables / 6 dimensiones con score de crisis, score de preparación y plan de acción.

**Stack:** Next.js 14 · Supabase (auth + DB) · Vercel

---

## Instalación local

```bash
# 1. Clonar el repo
git clone https://github.com/TU_USUARIO/crisis-check.git
cd crisis-check

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Completar con tus credenciales de Supabase

# 4. Levantar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

---

## Configuración de Supabase

### 1. Crear proyecto

1. Ir a [supabase.com](https://supabase.com) → New project
2. Copiar `Project URL` y `anon public key` desde **Settings → API**
3. Pegarlos en `.env.local`

### 2. Crear la base de datos

En el panel de Supabase ir a **SQL Editor** y ejecutar el contenido de `supabase/schema.sql`.

### 3. Configurar autenticación

En **Authentication → URL Configuration**:
- **Site URL:** `https://tu-dominio.vercel.app`
- **Redirect URLs:** `https://tu-dominio.vercel.app/auth/callback`

Para desarrollo local también agregar:
- `http://localhost:3000`
- `http://localhost:3000/auth/callback`

---

## Deploy en Vercel

### Opción A — Vercel + Supabase Integration (recomendado)

1. Subir el repo a GitHub
2. Importar en [vercel.com](https://vercel.com) → New Project
3. En **Integrations** del proyecto en Vercel, agregar **Supabase**
4. La integración configura `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` automáticamente
5. Deploy 🚀

### Opción B — Variables manuales

1. En Vercel → Settings → Environment Variables agregar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Redeploy

---

## Estructura del proyecto

```
crisis-check/
├── app/
│   ├── page.js                    # Landing
│   ├── login/page.js              # Auth (login + signup)
│   ├── dashboard/page.js          # Lista de evaluaciones
│   ├── evaluacion/
│   │   ├── nueva/page.js          # Wizard de evaluación
│   │   └── [id]/page.js           # Ver evaluación guardada
│   └── auth/callback/route.js     # OAuth callback
├── components/
│   ├── Evaluador.jsx              # Wizard de 6 secciones
│   ├── Resultados.jsx             # Pantalla de resultados
│   └── Nav.jsx                    # Navbar
├── lib/
│   ├── preguntas.js               # Las 26 preguntas + lógica de scoring
│   ├── supabase-browser.js        # Cliente Supabase (client-side)
│   └── supabase-server.js         # Cliente Supabase (server-side)
├── supabase/
│   └── schema.sql                 # Schema de la base de datos
└── middleware.js                  # Auth middleware (protege rutas)
```

---

## Las 6 dimensiones

| # | Dimensión | Peso en score de crisis |
|---|-----------|------------------------|
| 1 | Naturaleza del hecho | 20% |
| 2 | Presión mediática | 25% |
| 3 | Redes sociales | 20% |
| 4 | Stakeholders | 15% |
| 5 | Timing y momentum | 20% |
| 6 | Preparación | Score independiente |

---

## Licencia

MIT

import { createClient } from '../../../lib/supabase-server'
import { notFound, redirect } from 'next/navigation'
import Nav from '../../../components/Nav'
import Resultados from '../../../components/Resultados'

export async function generateMetadata({ params }) {
  return { title: 'Evaluación guardada — Crisis Check' }
}

export default async function EvaluacionGuardada({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: evaluacion } = await supabase
    .from('evaluaciones')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!evaluacion) notFound()

  return (
    <>
      <Nav user={user} />
      <Resultados
        respuestas={evaluacion.answers}
        titulo={evaluacion.titulo}
        cliente={evaluacion.cliente}
        notas={evaluacion.notas}
        readOnly={true}
        user={user}
      />
    </>
  )
}

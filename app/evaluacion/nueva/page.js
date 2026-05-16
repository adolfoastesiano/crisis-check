import { createClient } from '../../../lib/supabase-server'
import Nav from '../../../components/Nav'
import Evaluador from '../../../components/Evaluador'

export const metadata = { title: 'Nueva evaluación — Crisis Check' }

export default async function NuevaEvaluacion() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <Nav user={user} />
      <Evaluador user={user} />
    </>
  )
}

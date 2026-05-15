import { createClient } from '../../../lib/supabase-server'
import Nav from '../../../components/Nav'
import Evaluador from '../../../components/Evaluador'

export const metadata = { title: 'Nueva evaluación — Crisis Check' }

export default async function NuevaEvaluacion() {
  const supabase = await createClient()
  let user = null

  if (supabase) {
    const { data } = await supabase.auth.getUser()
    user = data?.user
  }

  return (
    <>
      <Nav user={user} />
      <Evaluador user={user} />
    </>
  )
}

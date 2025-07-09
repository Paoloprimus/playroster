'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'verified' | 'error'>('loading')

  useEffect(() => {
    const checkUser = async () => {
      const { data: userResponse, error } = await supabase.auth.getUser()

      if (error || !userResponse?.user) {
        setStatus('error')
        return
      }

      const user = userResponse.user

      if (user.email_confirmed_at) {
        // Aggiorna la tabella users con verified = true
        await supabase.from('users')
          .update({ verified: true })
          .eq('id', user.id)

        setStatus('verified')
        // Redirige dopo qualche secondo
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        setStatus('error')
      }
    }

    checkUser()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      {status === 'loading' && <p>Verifica in corso...</p>}
      {status === 'verified' && <p>Email verificata ✔️ Reindirizzamento...</p>}
      {status === 'error' && <p>Errore durante la verifica. Riprova o contatta supporto.</p>}
    </div>
  )
}

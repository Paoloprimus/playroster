'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleVerification = async () => {
      const { data: sessionData, error } = await supabase.auth.getUser()

      if (error || !sessionData?.user) {
        console.error('Errore nel recupero utente:', error)
        return
      }

      const user = sessionData.user
      const isVerified = !!user.email_confirmed_at

      if (isVerified) {
        // Aggiorna la tabella `users` con verified = true
        await supabase.from('users')
          .update({ verified: true })
          .eq('id', user.id)
      }

      // Reindirizza alla dashboard
      router.push('/dashboard')
    }

    handleVerification()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4">
      <p>Verifica dell’account in corso... Attendi qualche secondo.</p>
    </div>
  )
}

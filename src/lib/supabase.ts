import { createClient } from '@supabase/supabase-js'

// 1. Pegar variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// 2. Criar cliente do Supabase
export const supabase = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('<https://placeholder.supabase.co>', 'placeholder-key')

// 3. Log para debug (apenas em desenvolvimento)
if (import.meta.env.DEV) {
  console.log('🔍 Supabase configurado:', {
    url: supabaseUrl ? '✅ Definida' : '❌ Não definida',
    key: supabaseAnonKey ? '✅ Definida' : '❌ Não definida',
  })
}

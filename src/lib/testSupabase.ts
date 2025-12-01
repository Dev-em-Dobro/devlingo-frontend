import { supabase } from './supabase'

// Função para testar a conexão
export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Testando conexão com Supabase...')

    // 1. Testar se consegue acessar a tabela user_profiles
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Erro ao conectar:', error.message)
      return { success: false, error: error.message }
    }

    console.log('✅ Conexão com Supabase funcionando!')
    console.log('📊 Dados retornados:', data)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Erro inesperado:', error)
    return { success: false, error: String(error) }
  }
}

import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { IoFlame, IoDiamond, IoHeart } from 'react-icons/io5'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useAuth } from '@/contexts/AuthContext'

const Header = () => {
  const { profile, loading } = useUserProfile()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const totalXP = profile?.total_xp || 0

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <>
      {/* Top bar with icons */}
      <div className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-between md:max-w-6xl md:mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#f7df1e] rounded flex items-center justify-center">
              <span className="text-black font-bold text-xs">JS</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IoFlame size={24} className="text-orange-500" />
              <span className="font-bold text-gray-700">0</span>
            </div>
            <div className="flex items-center gap-2">
              <IoDiamond size={24} className="text-blue-500" />
              <span className="font-bold text-gray-700">
                {loading ? '...' : totalXP.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IoHeart size={24} className="text-red-500" />
              <span className="font-bold text-gray-700">∞</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
              title="Sair da conta"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-[#9225D4] py-6 px-4 md:px-8 border-b-[5px] border-[#6c19a0] rounded-[12px] mx-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-white/90 text-sm font-semibold uppercase tracking-wide">
                  SEÇÃO 1, UNIDADE 1
                </div>
                <h1 className="text-white text-2xl font-bold mt-1">
                  Fundamentos de JavaScript
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header


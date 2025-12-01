// ============================================================
// LanguageSelection.tsx - Tela de Seleção de Linguagem
// ============================================================

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { IoLogoHtml5, IoLogoCss3, IoLogoJavascript } from 'react-icons/io5'
import DevlingoChar from '../../assets/images/devlingo-char.png'
import { useUserPreferences } from '@/contexts/UserPreferences/UserPreferencesContext'

// Tipos de linguagem disponíveis
type Language = 'html' | 'css' | 'javascript'

const languages = [
    {
        id: 'html' as Language,
        name: 'HTML',
        icon: IoLogoHtml5,
        color: 'text-orange-500',
    },
    {
        id: 'css' as Language,
        name: 'CSS',
        icon: IoLogoCss3,
        color: 'text-blue-500',
    },
    {
        id: 'javascript' as Language,
        name: 'JavaScript',
        icon: IoLogoJavascript,
        color: 'text-yellow-500',
    },
]

const LanguageSelection = () => {
    // Estado da linguagem selecionada
    const { preferences, setLanguage, loading } = useUserPreferences()
     const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    preferences.language || null
  )
console.log(preferences);

    // Hooks
    const navigate = useNavigate()

    // 3. Sincronizar com preferências existentes
    useEffect(() => {
        if (preferences.language) {
            setSelectedLanguage(preferences.language)
        }
    }, [preferences.language])

    // Função para continuar (aqui você salvaria a escolha)
    const handleContinue = () => {
        if (selectedLanguage) {
            // Aqui você salvaria a linguagem escolhida
            // Por enquanto, apenas mostra um alert
            setLanguage(selectedLanguage)

            // Redireciona para próxima tela (quando existir)
            navigate('/level-selection')
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Barra superior */}
            {/* Top bar with progress */}
            <div className="bg-white border-b border-gray-200 py-3 px-4">
                <div className="flex items-center gap-3 md:max-w-3xl md:mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#58CC02] rounded-full" style={{ width: '33%' }} />
                    </div>
                </div>
            </div>

            {/* Conteúdo principal */}
            {/* Main content */}
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Character and question */}
                <div className="flex items-start gap-6 mb-8">
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <img
                                src={DevlingoChar}
                                alt="Devlingo"
                                className="w-24 h-24 object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex-1 pt-4">
                        <div className="bg-white border-2 border-gray-300 rounded-2xl p-4 shadow-sm relative">
                            <div className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-gray-300 border-b-8 border-b-transparent"></div>
                            <div className="absolute -left-2 top-6 w-0 h-0 border-t-7 border-t-transparent border-r-7 border-r-white border-b-7 border-b-transparent"></div>
                            <p className="text-xl font-semibold text-gray-800">
                                Qual linguagem você quer aprender?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Language options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {languages.map((lang) => {
                        const Icon = lang.icon
                        const isSelected = selectedLanguage === lang.id

                        return (
                            <button
                                key={lang.id}
                                onClick={() => setSelectedLanguage(lang.id)}
                                className={`
                  flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer
                  ${isSelected
                                        ? 'border-[#58CC02] bg-green-50 shadow-md'
                                        : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm'
                                    }
                `}
                            >
                                <Icon size={32} className={lang.color} />
                                <span className="text-lg font-semibold text-gray-800">{lang.name}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Continue button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleContinue}
                        disabled={!selectedLanguage}
                        className={`
              px-8 py-4 rounded-2xl font-bold text-white text-lg uppercase
              transition-all disabled:opacity-50 disabled:cursor-not-allowed
              ${selectedLanguage
                                ? 'bg-[#58CC02] hover:bg-[#4cb302] shadow-lg hover:shadow-xl'
                                : 'bg-gray-300'
                            }
            `}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LanguageSelection

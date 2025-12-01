import type { Language, Level } from '@/contexts/UserPreferences/UserPreferencesContext'

// 1. Definir tipos para as perguntas
export interface Question {
  id: string
  type: 'multiple-choice' | 'fill-blank' | 'code-snippet'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation?: string
}

// 2. Definir tipo para uma lição
export interface Lesson {
  id: string
  title: string
  description: string
  questions: Question[]
  xpReward: number
}

// 3. Estrutura: lessonsData[linguagem][nivel] = Lesson[]
export const lessonsData: Record<Language, Record<Level, Lesson[]>> = {
  html: {
    beginner: [
      {
        id: 'html-beginner-1',
        title: 'Estrutura básica HTML',
        description: 'Aprenda as tags fundamentais do HTML',
        xpReward: 10,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Qual tag HTML é usada para criar um parágrafo?',
            options: ['<p>', '<paragraph>', '<text>', '<para>'],
            correctAnswer: 0,
            explanation: 'A tag <p> é usada para criar parágrafos em HTML.',
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'Qual tag define o título principal de uma página?',
            options: ['<h1>', '<title>', '<head>', '<header>'],
            correctAnswer: 0,
            explanation: 'A tag <h1> representa o título principal da página.',
          },
        ],
      },
      {
        id: 'html-beginner-2',
        title: 'Listas e links',
        description: 'Crie listas ordenadas e desordenadas',
        xpReward: 10,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Qual tag cria uma lista não ordenada?',
            options: ['<ul>', '<ol>', '<li>', '<list>'],
            correctAnswer: 0,
            explanation: '<ul> cria uma lista não ordenada (com marcadores).',
          },
        ],
      },
      // ... mais lições
    ],
    intermediate: [
      // lições intermediárias
    ],
    advanced: [
      // lições avançadas
    ],
  },
  css: {
    beginner: [
      {
        id: 'css-beginner-1',
        title: 'Introdução ao CSS',
        description: 'Aprenda os fundamentos do CSS',
        xpReward: 10,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Qual propriedade CSS altera a cor do texto?',
            options: ['text-color', 'color', 'font-color', 'text-style'],
            correctAnswer: 1,
            explanation: 'A propriedade color define a cor do texto.',
          },
        ],
      },
      // ... mais lições
    ],
    intermediate: [],
    advanced: [],
  },
  javascript: {
    beginner: [
      {
        id: 'js-beginner-1',
        title: 'Variáveis e tipos',
        description: 'Aprenda sobre variáveis em JavaScript',
        xpReward: 10,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Qual palavra-chave cria uma variável mutável?',
            options: ['const', 'let', 'var', 'variable'],
            correctAnswer: 1,
            explanation: 'let permite reatribuição, diferente de const.',
          },
        ],
      },
      {
        id: 'js-beginner-2',
        title: 'Funções',
        description: 'Crie e use funções',
        xpReward: 10,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Qual palavra-chave define uma função?',
            options: ['func', 'function', 'def', 'fn'],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 'js-beginner-3',
        title: 'Arrays',
        description: 'Trabalhe com listas de dados',
        xpReward: 10,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Qual método adiciona um elemento ao final do array?',
            options: ['push()', 'add()', 'append()', 'insert()'],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'js-beginner-4',
        title: 'Objetos',
        description: 'Entenda objetos JavaScript',
        xpReward: 10,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Como você acessa a propriedade de um objeto?',
            options: ['object.property', 'object->property', 'object::property', 'object[property]'],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'js-beginner-5',
        title: 'Condicionais',
        description: 'Use if, else e switch',
        xpReward: 10,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Qual operador compara valores?',
            options: ['=', '==', '===', 'Todas as anteriores'],
            correctAnswer: 2,
            explanation: '=== compara valor e tipo.',
          },
        ],
      },
    ],
    intermediate: [
      // lições intermediárias
    ],
    advanced: [
      // lições avançadas
    ],
  },
}

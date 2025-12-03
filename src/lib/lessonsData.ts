// Tipos para as perguntas
export interface Question {
  id: string
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation?: string
}

// Tipo para uma lição
export interface Lesson {
  id: string
  unitId: number  // Qual unidade esta lição pertence
  title: string
  description: string
  questions: Question[]
  xpReward: number
}

// Dados das lições (todas são beginner por padrão)
export const lessonsData: Lesson[] = [
  {
    id: 'js-beginner-1',
    unitId: 1,
    title: 'Variáveis e tipos',
    description: 'Aprenda sobre variáveis em JavaScript',
    xpReward: 10,
    questions: [
      {
        id: 'q1',
        question: 'Qual palavra-chave cria uma variável mutável?',
        options: ['const', 'let', 'var', 'variable'],
        correctAnswer: 1,
        explanation: 'let permite reatribuição, diferente de const.',
      },
      {
        id: 'q2',
        question: 'Qual palavra-chave cria uma variável que não pode ser reatribuída?',
        options: ['const', 'let', 'var', 'final'],
        correctAnswer: 0,
        explanation: 'const declara uma variável de valor constante.',
      },
      {
        id: 'q3',
        question: 'Qual tipo de dado representa texto em JavaScript?',
        options: ['number', 'string', 'text', 'char'],
        correctAnswer: 1,
        explanation: 'string é o tipo usado para texto em JavaScript.',
      },
       {
        id: 'q4',
        question: 'Qual tipo de dado representa texto em JavaScript?',
        options: ['number', 'string', 'text', 'char'],
        correctAnswer: 1,
        explanation: 'string é o tipo usado para texto em JavaScript.',
      },
    ],
  },
  {
    id: 'js-beginner-2',
    unitId: 2,
    title: 'Funções',
    description: 'Crie e use funções',
    xpReward: 10,
    questions: [
      {
        id: 'q1',
        question: 'Qual palavra-chave define uma função?',
        options: ['func', 'function', 'def', 'fn'],
        correctAnswer: 1,
        explanation: 'function é usada para declarar funções em JavaScript.',
      },
      {
        id: 'q2',
        question: 'Como você chama uma função chamada "minhaFuncao"?',
        options: ['minhaFuncao()', 'call minhaFuncao', 'minhaFuncao[]', 'run minhaFuncao'],
        correctAnswer: 0,
        explanation: 'Use parênteses () após o nome da função para executá-la.',
      },
      {
        id: 'q3',
        question: 'Qual palavra-chave retorna um valor de uma função?',
        options: ['return', 'output', 'result', 'give'],
        correctAnswer: 0,
        explanation: 'return é usado para retornar valores de funções.',
      },
    ],
  },
  {
    id: 'js-beginner-3',
    unitId: 3,
    title: 'Arrays',
    description: 'Trabalhe com listas de dados',
    xpReward: 10,
    questions: [
      {
        id: 'q1',
        question: 'Qual método adiciona um elemento ao final do array?',
        options: ['push()', 'add()', 'append()', 'insert()'],
        correctAnswer: 0,
        explanation: 'push() adiciona elementos ao final de um array.',
      },
      {
        id: 'q2',
        question: 'Como você acessa o primeiro elemento de um array?',
        options: ['array[0]', 'array[1]', 'array.first()', 'array.get(0)'],
        correctAnswer: 0,
        explanation: 'Arrays em JavaScript começam no índice 0.',
      },
      {
        id: 'q3',
        question: 'Qual propriedade retorna o tamanho de um array?',
        options: ['size', 'length', 'count', 'total'],
        correctAnswer: 1,
        explanation: 'A propriedade length retorna o número de elementos.',
      },
    ],
  },
  {
    id: 'js-beginner-4',
    unitId: 4,
    title: 'Objetos',
    description: 'Entenda objetos JavaScript',
    xpReward: 10,
    questions: [
      {
        id: 'q1',
        question: 'Como você acessa a propriedade de um objeto?',
        options: ['object.property', 'object->property', 'object::property', 'object@property'],
        correctAnswer: 0,
        explanation: 'Use ponto (.) para acessar propriedades de objetos.',
      },
      {
        id: 'q2',
        question: 'Como você cria um objeto vazio?',
        options: ['{}', '[]', '()', 'object()'],
        correctAnswer: 0,
        explanation: 'Chaves {} criam um objeto vazio em JavaScript.',
      },
      {
        id: 'q3',
        question: 'Como você adiciona uma nova propriedade "idade" a um objeto "pessoa"?',
        options: ['pessoa.idade = 25', 'pessoa->idade = 25', 'pessoa[idade] = 25', 'pessoa::idade = 25'],
        correctAnswer: 0,
        explanation: 'Use notação de ponto para adicionar ou modificar propriedades.',
      },
    ],
  },
  {
    id: 'js-beginner-5',
    unitId: 5,
    title: 'Condicionais',
    description: 'Use if, else e switch',
    xpReward: 10,
    questions: [
      {
        id: 'q1',
        question: 'Qual operador compara valores e tipos?',
        options: ['=', '==', '===', '!='],
        correctAnswer: 2,
        explanation: '=== compara valor e tipo (comparação estrita).',
      },
      {
        id: 'q2',
        question: 'Qual palavra-chave executa código quando a condição é falsa?',
        options: ['else', 'otherwise', 'then', 'when'],
        correctAnswer: 0,
        explanation: 'else executa o bloco quando a condição do if é falsa.',
      },
      {
        id: 'q3',
        question: 'Qual estrutura testa múltiplas condições de forma mais limpa?',
        options: ['if...else', 'switch', 'for', 'while'],
        correctAnswer: 1,
        explanation: 'switch é ideal para testar múltiplos valores de uma variável.',
      },
    ],
  },
]
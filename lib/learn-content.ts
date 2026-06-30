export type Question = {
  id: string
  question: string
  choices: string[]
  correct: number
  explanation: string
}

export type Lesson = {
  id: string
  title: string
  description: string
  xp: number
  rubies: number
  questions: Question[]
}

export type Subject = {
  id: string
  label: string
  emoji: string
  color: string
  bg: string
  border: string
  lessons: Lesson[]
}

export const subjects: Subject[] = [
  {
    id: 'math',
    label: 'Math',
    emoji: '➗',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    lessons: [
      {
        id: 'math-1',
        title: 'Order of Operations',
        description: 'PEMDAS / BODMAS rules',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'What is 2 + 3 × 4?', choices: ['20', '14', '24', '10'], correct: 1, explanation: 'Multiplication before addition: 3×4=12, then 2+12=14.' },
          { id: 'q2', question: 'Evaluate: (8 ÷ 2) × (2 + 2)', choices: ['16', '8', '4', '1'], correct: 0, explanation: 'Parentheses first: 8÷2=4 and 2+2=4, then 4×4=16.' },
          { id: 'q3', question: 'What is 5² − 3 × 4?', choices: ['13', '37', '48', '9'], correct: 0, explanation: 'Exponent first: 5²=25, then 3×4=12, then 25−12=13.' },
          { id: 'q4', question: 'Simplify: 3 + 6 × (5 + 4) ÷ 3 − 7', choices: ['14', '29', '12', '8'], correct: 0, explanation: 'Parentheses → multiply/divide left-to-right → add/subtract: 6×9=54, 54÷3=18, 3+18−7=14.' },
          { id: 'q5', question: 'Which operation do you perform first in 4 + 8 ÷ 2 − 1?', choices: ['Addition', 'Division', 'Subtraction', 'Left to right'], correct: 1, explanation: 'Division has higher precedence than addition or subtraction.' },
        ],
      },
      {
        id: 'math-2',
        title: 'Fractions & Decimals',
        description: 'Convert and calculate',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'What is ½ + ¼?', choices: ['¾', '⅔', '1', '⅖'], correct: 0, explanation: '½ = 2/4, so 2/4 + 1/4 = 3/4.' },
          { id: 'q2', question: 'Convert 0.75 to a fraction in simplest form.', choices: ['75/100', '3/4', '7/10', '15/20'], correct: 1, explanation: '0.75 = 75/100 = 3/4 after dividing by 25.' },
          { id: 'q3', question: 'What is ⅔ × ¾?', choices: ['½', '6/12', '½', '5/12'], correct: 0, explanation: '(2×3)/(3×4) = 6/12 = ½.' },
          { id: 'q4', question: 'Which is larger: 0.6 or ⅝?', choices: ['0.6', '⅝', 'They are equal', 'Cannot compare'], correct: 1, explanation: '⅝ = 0.625, which is greater than 0.6.' },
          { id: 'q5', question: 'What is 1¾ as a decimal?', choices: ['1.34', '1.75', '1.25', '1.4'], correct: 1, explanation: '¾ = 0.75, so 1¾ = 1.75.' },
        ],
      },
      {
        id: 'math-3',
        title: 'Algebra Basics',
        description: 'Variables, expressions, equations',
        xp: 15, rubies: 7,
        questions: [
          { id: 'q1', question: 'Solve for x: 2x + 4 = 10', choices: ['x = 3', 'x = 7', 'x = 4', 'x = 2'], correct: 0, explanation: '2x = 6, so x = 3.' },
          { id: 'q2', question: 'Simplify: 3x + 5x', choices: ['8x', '8', '15x', '15x²'], correct: 0, explanation: 'Like terms: 3x + 5x = 8x.' },
          { id: 'q3', question: 'Which is a correct solution to x² = 9?', choices: ['x = 3 only', 'x = −3 only', 'x = ±3', 'x = 4.5'], correct: 2, explanation: 'Both 3² and (−3)² equal 9, so x = ±3.' },
          { id: 'q4', question: 'If y = 3x − 1 and x = 4, what is y?', choices: ['11', '9', '13', '10'], correct: 0, explanation: 'y = 3(4) − 1 = 12 − 1 = 11.' },
          { id: 'q5', question: 'Expand: 2(x + 5)', choices: ['2x + 5', '2x + 10', 'x + 10', '7x'], correct: 1, explanation: 'Distribute: 2·x + 2·5 = 2x + 10.' },
        ],
      },
    ],
  },
  {
    id: 'science',
    label: 'Science',
    emoji: '🔬',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    lessons: [
      {
        id: 'science-1',
        title: 'The Scientific Method',
        description: 'How scientists investigate the world',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'What is the first step of the scientific method?', choices: ['Hypothesis', 'Observation/Question', 'Experiment', 'Conclusion'], correct: 1, explanation: 'Science begins with making an observation and asking a question about it.' },
          { id: 'q2', question: 'What is a hypothesis?', choices: ['A proven fact', 'A testable prediction', 'The final result', 'A control group'], correct: 1, explanation: 'A hypothesis is an educated, testable prediction.' },
          { id: 'q3', question: 'In an experiment, the variable that is changed is called the ___?', choices: ['Dependent variable', 'Control variable', 'Independent variable', 'Constant'], correct: 2, explanation: 'The independent variable is what you deliberately change.' },
          { id: 'q4', question: 'Why do scientists repeat experiments?', choices: ['To fill time', 'To ensure reliability', 'To change the hypothesis', 'To find a different answer'], correct: 1, explanation: 'Repeating ensures results are reliable and not due to chance.' },
          { id: 'q5', question: 'What does peer review mean?', choices: ['Friends reading your notes', 'Other scientists checking your work', 'Reviewing your peers\' grades', 'Publishing results online'], correct: 1, explanation: 'Peer review is when other scientists evaluate your research for accuracy.' },
        ],
      },
      {
        id: 'science-2',
        title: 'Cells & Life',
        description: 'Basic biology of living cells',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'What is the powerhouse of the cell?', choices: ['Nucleus', 'Ribosome', 'Mitochondria', 'Cell wall'], correct: 2, explanation: 'Mitochondria produce ATP, the cell\'s energy currency.' },
          { id: 'q2', question: 'Which organelle contains the cell\'s DNA?', choices: ['Mitochondria', 'Nucleus', 'Golgi apparatus', 'Vacuole'], correct: 1, explanation: 'The nucleus houses the cell\'s genetic material.' },
          { id: 'q3', question: 'What structure do plant cells have that animal cells do not?', choices: ['Cell membrane', 'Mitochondria', 'Cell wall', 'Nucleus'], correct: 2, explanation: 'Plant cells have a rigid cell wall made of cellulose.' },
          { id: 'q4', question: 'What is the process by which plants make food?', choices: ['Respiration', 'Photosynthesis', 'Fermentation', 'Digestion'], correct: 1, explanation: 'Photosynthesis converts sunlight, CO₂, and water into glucose.' },
          { id: 'q5', question: 'What is the basic unit of life?', choices: ['Atom', 'Molecule', 'Cell', 'Organ'], correct: 2, explanation: 'All living organisms are made of cells — the smallest unit of life.' },
        ],
      },
      {
        id: 'science-3',
        title: 'Forces & Motion',
        description: 'Newton\'s laws and physics basics',
        xp: 15, rubies: 7,
        questions: [
          { id: 'q1', question: 'Newton\'s First Law states an object at rest will stay at rest unless acted on by a(n)...', choices: ['Force', 'Acceleration', 'Velocity', 'Mass'], correct: 0, explanation: 'Inertia means objects resist changes in motion without an unbalanced force.' },
          { id: 'q2', question: 'F = ma is Newton\'s _____ Law.', choices: ['First', 'Second', 'Third', 'Fourth'], correct: 1, explanation: 'Force equals mass times acceleration — the Second Law.' },
          { id: 'q3', question: 'For every action there is an equal and opposite ___?', choices: ['Force', 'Reaction', 'Velocity', 'Momentum'], correct: 1, explanation: 'Newton\'s Third Law: action-reaction pairs.' },
          { id: 'q4', question: 'What is the unit of force?', choices: ['Joule', 'Watt', 'Newton', 'Pascal'], correct: 2, explanation: 'Force is measured in Newtons (N = kg·m/s²).' },
          { id: 'q5', question: 'A 10 kg box is accelerated at 2 m/s². What force was applied?', choices: ['5 N', '12 N', '20 N', '8 N'], correct: 2, explanation: 'F = ma = 10 × 2 = 20 N.' },
        ],
      },
    ],
  },
  {
    id: 'history',
    label: 'History',
    emoji: '🏛️',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    lessons: [
      {
        id: 'history-1',
        title: 'Ancient Civilizations',
        description: 'Egypt, Greece, and Rome',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'The ancient Egyptians built pyramids primarily as...', choices: ['Temples for worship', 'Royal tombs', 'Grain storage', 'Military forts'], correct: 1, explanation: 'Pyramids served as monumental tombs for pharaohs.' },
          { id: 'q2', question: 'Which river was central to ancient Egyptian civilization?', choices: ['Tigris', 'Euphrates', 'Nile', 'Indus'], correct: 2, explanation: 'The Nile\'s annual floods deposited rich soil that supported agriculture.' },
          { id: 'q3', question: 'What form of government did ancient Athens pioneer?', choices: ['Monarchy', 'Oligarchy', 'Democracy', 'Theocracy'], correct: 2, explanation: 'Athens is credited with the earliest form of democratic governance.' },
          { id: 'q4', question: 'Who was the first Roman Emperor?', choices: ['Julius Caesar', 'Augustus', 'Nero', 'Trajan'], correct: 1, explanation: 'Augustus (Octavian) became the first emperor in 27 BCE.' },
          { id: 'q5', question: 'The Colosseum is located in which modern-day country?', choices: ['Greece', 'Egypt', 'France', 'Italy'], correct: 3, explanation: 'The Colosseum is in Rome, Italy, built around 70–80 CE.' },
        ],
      },
      {
        id: 'history-2',
        title: 'American Revolution',
        description: 'Birth of the United States',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'The Declaration of Independence was signed in which year?', choices: ['1763', '1776', '1789', '1812'], correct: 1, explanation: 'The Declaration was adopted on July 4, 1776.' },
          { id: 'q2', question: 'What was the main grievance in "no taxation without representation"?', choices: ['Colonists paid too much tax', 'Colonists had no say in British Parliament', 'Britain refused to trade', 'Colonists were too poor'], correct: 1, explanation: 'Colonists objected to being taxed by a Parliament where they had no elected representatives.' },
          { id: 'q3', question: 'Who wrote most of the Declaration of Independence?', choices: ['John Adams', 'Benjamin Franklin', 'Thomas Jefferson', 'George Washington'], correct: 2, explanation: 'Thomas Jefferson was the primary author.' },
          { id: 'q4', question: 'The Battle of Lexington and Concord is known as "the shot heard ___."', choices: ['Around the world', 'Across America', 'Heard in London', 'Through history'], correct: 0, explanation: '"The shot heard \'round the world" — first shots of the Revolutionary War.' },
          { id: 'q5', question: 'Who was the commander of the Continental Army?', choices: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Alexander Hamilton'], correct: 2, explanation: 'George Washington commanded the Continental Army to victory.' },
        ],
      },
      {
        id: 'history-3',
        title: 'World War II',
        description: 'The global conflict 1939–1945',
        xp: 15, rubies: 7,
        questions: [
          { id: 'q1', question: 'What event brought the United States into WWII?', choices: ['Invasion of Poland', 'Attack on Pearl Harbor', 'D-Day', 'Fall of France'], correct: 1, explanation: 'Japan\'s attack on Pearl Harbor on December 7, 1941 prompted the US to declare war.' },
          { id: 'q2', question: 'Who was the leader of Nazi Germany?', choices: ['Mussolini', 'Hirohito', 'Stalin', 'Hitler'], correct: 3, explanation: 'Adolf Hitler led Nazi Germany from 1933 until his death in 1945.' },
          { id: 'q3', question: 'D-Day (June 6, 1944) was the Allied invasion of...', choices: ['Italy', 'Germany', 'Normandy, France', 'North Africa'], correct: 2, explanation: 'Operation Overlord landed Allied forces on the beaches of Normandy.' },
          { id: 'q4', question: 'Which two cities were struck by atomic bombs in 1945?', choices: ['Tokyo and Osaka', 'Hiroshima and Nagasaki', 'Kyoto and Hiroshima', 'Nagasaki and Tokyo'], correct: 1, explanation: 'The US dropped atomic bombs on Hiroshima (Aug 6) and Nagasaki (Aug 9), 1945.' },
          { id: 'q5', question: 'What alliance did the US, UK, and USSR form against the Axis?', choices: ['NATO', 'The Allies', 'The League of Nations', 'The United Nations'], correct: 1, explanation: 'The Allied Powers united to fight the Axis (Germany, Italy, Japan).' },
        ],
      },
    ],
  },
  {
    id: 'english',
    label: 'English',
    emoji: '📖',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    lessons: [
      {
        id: 'english-1',
        title: 'Grammar Foundations',
        description: 'Nouns, verbs, adjectives, and more',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'Which word is a noun in "The quick brown fox jumps"?', choices: ['quick', 'brown', 'fox', 'jumps'], correct: 2, explanation: '"Fox" is the noun — a person, place, or thing.' },
          { id: 'q2', question: 'What is the verb in "She quickly ran to school"?', choices: ['quickly', 'ran', 'school', 'She'], correct: 1, explanation: '"Ran" is the action verb.' },
          { id: 'q3', question: 'Which sentence uses a comma correctly?', choices: ['I like cats dogs and fish', 'I like cats, dogs, and fish.', 'I like, cats dogs and fish', 'I like cats dogs, and fish'], correct: 1, explanation: 'A serial (Oxford) comma separates items in a list.' },
          { id: 'q4', question: 'What type of word is "beautiful" in "a beautiful sunset"?', choices: ['Noun', 'Verb', 'Adjective', 'Adverb'], correct: 2, explanation: '"Beautiful" modifies the noun "sunset" — making it an adjective.' },
          { id: 'q5', question: 'Choose the correct sentence:', choices: ['Their going to the store.', 'There going to the store.', 'They\'re going to the store.', 'Theyre going to the store.'], correct: 2, explanation: '"They\'re" is the contraction of "they are."' },
        ],
      },
      {
        id: 'english-2',
        title: 'Reading Comprehension',
        description: 'Main idea, inference, and evidence',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'The "main idea" of a passage is...', choices: ['The first sentence', 'The most important point', 'The last paragraph', 'A supporting detail'], correct: 1, explanation: 'The main idea is the central message the author wants to convey.' },
          { id: 'q2', question: 'When you "infer," you...', choices: ['Copy text directly', 'Look up a definition', 'Draw a conclusion from clues', 'Summarize the passage'], correct: 2, explanation: 'Inference means reading between the lines using evidence and reasoning.' },
          { id: 'q3', question: 'A "theme" in literature is...', choices: ['The setting of the story', 'A character\'s name', 'A universal message or lesson', 'The plot summary'], correct: 2, explanation: 'Theme is the underlying life lesson or universal truth of a story.' },
          { id: 'q4', question: 'Which is an example of a simile?', choices: ['The wind howled', 'Her smile was the sun', 'Her smile was like the sun', 'She had a bright smile'], correct: 2, explanation: 'A simile uses "like" or "as" to compare: "smile was like the sun."' },
          { id: 'q5', question: 'Textual evidence means...', choices: ['Guessing the author\'s meaning', 'Using quotes or details from the text to support a claim', 'Paraphrasing in your own words', 'Citing outside sources'], correct: 1, explanation: 'Textual evidence is specific words or passages from the text to back up an argument.' },
        ],
      },
      {
        id: 'english-3',
        title: 'Essay Writing',
        description: 'Structure, thesis, and argumentation',
        xp: 15, rubies: 7,
        questions: [
          { id: 'q1', question: 'A thesis statement should appear in the...', choices: ['Conclusion', 'Body paragraph', 'Introduction', 'Works cited'], correct: 2, explanation: 'The thesis is typically in the introduction, stating your main argument.' },
          { id: 'q2', question: 'The purpose of a topic sentence is to...', choices: ['End the paragraph', 'Introduce the main idea of a paragraph', 'Provide evidence', 'Transition to the next paragraph'], correct: 1, explanation: 'Each body paragraph begins with a topic sentence stating its focus.' },
          { id: 'q3', question: 'Which transition best shows contrast?', choices: ['Furthermore', 'In addition', 'However', 'For example'], correct: 2, explanation: '"However" signals a contrast or counterpoint.' },
          { id: 'q4', question: 'A conclusion paragraph should...', choices: ['Introduce new evidence', 'Restate the thesis and summarize key points', 'Begin with "I"', 'Add a new argument'], correct: 1, explanation: 'Conclusions wrap up the essay by restating the thesis and synthesizing arguments.' },
          { id: 'q5', question: 'Which is an example of a strong thesis statement?', choices: ['Pollution is bad.', 'This essay will talk about climate change.', 'Industrial carbon emissions are the leading driver of climate change and require immediate policy action.', 'I think pollution should be reduced.'], correct: 2, explanation: 'A strong thesis is specific, arguable, and indicates the essay\'s direction.' },
        ],
      },
    ],
  },
  {
    id: 'spanish',
    label: 'Spanish',
    emoji: '🇪🇸',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    lessons: [
      {
        id: 'spanish-1',
        title: 'Greetings & Basics',
        description: 'Say hello and introduce yourself',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'How do you say "Hello" in Spanish?', choices: ['Bonjour', 'Hola', 'Ciao', 'Guten Tag'], correct: 1, explanation: '"Hola" is the most common greeting in Spanish.' },
          { id: 'q2', question: 'What does "¿Cómo te llamas?" mean?', choices: ['How are you?', 'Where are you from?', 'What is your name?', 'How old are you?'], correct: 2, explanation: 'Literally: "What do you call yourself?" — asking someone\'s name.' },
          { id: 'q3', question: '"Mucho gusto" means...', choices: ['Very good', 'Nice to meet you', 'Thank you', 'Goodbye'], correct: 1, explanation: '"Mucho gusto" = "Nice to meet you."' },
          { id: 'q4', question: 'How do you say "Thank you" in Spanish?', choices: ['De nada', 'Por favor', 'Gracias', 'Lo siento'], correct: 2, explanation: '"Gracias" = "Thank you."' },
          { id: 'q5', question: 'What does "Buenos días" mean?', choices: ['Good night', 'Good afternoon', 'Good morning', 'Goodbye'], correct: 2, explanation: '"Buenos días" = "Good morning."' },
        ],
      },
      {
        id: 'spanish-2',
        title: 'Numbers 1–20',
        description: 'Count and use basic numbers',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'What is "cinco" in English?', choices: ['4', '5', '6', '7'], correct: 1, explanation: '"Cinco" = 5.' },
          { id: 'q2', question: 'How do you say "ten" in Spanish?', choices: ['Nueve', 'Ocho', 'Diez', 'Once'], correct: 2, explanation: '"Diez" = 10.' },
          { id: 'q3', question: 'What is "dieciséis"?', choices: ['15', '16', '17', '18'], correct: 1, explanation: '"Dieciséis" = 16 (diez + seis).' },
          { id: 'q4', question: '"Veinte" means...', choices: ['12', '15', '18', '20'], correct: 3, explanation: '"Veinte" = 20.' },
          { id: 'q5', question: 'What is "tres" + "cuatro"?', choices: ['Seis', 'Siete', 'Ocho', 'Nueve'], correct: 1, explanation: '3 + 4 = 7 = "siete."' },
        ],
      },
      {
        id: 'spanish-3',
        title: 'Ser vs Estar',
        description: 'Two verbs for "to be"',
        xp: 15, rubies: 7,
        questions: [
          { id: 'q1', question: 'Which verb describes permanent traits like nationality?', choices: ['Estar', 'Ser', 'Tener', 'Hacer'], correct: 1, explanation: '"Ser" is used for permanent or inherent characteristics.' },
          { id: 'q2', question: '"Estoy cansado" means...', choices: ['I am tired (right now)', 'I am always tired', 'I was tired', 'I will be tired'], correct: 0, explanation: '"Estar" describes temporary states — being tired right now.' },
          { id: 'q3', question: 'Choose the correct sentence: "La casa ___ grande."', choices: ['está', 'es', 'son', 'están'], correct: 1, explanation: '"Ser" is used for inherent characteristics — the house is (inherently) big.' },
          { id: 'q4', question: '"¿Dónde ___ el baño?" uses which verb?', choices: ['ser', 'estar', 'tener', 'ir'], correct: 1, explanation: 'Location (except permanent) uses "estar."' },
          { id: 'q5', question: '"Ella ___ médica" (She is a doctor) — which verb?', choices: ['está', 'es', 'tiene', 'hace'], correct: 1, explanation: 'Professions use "ser": "Ella es médica."' },
        ],
      },
    ],
  },
  {
    id: 'french',
    label: 'French',
    emoji: '🇫🇷',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    lessons: [
      {
        id: 'french-1',
        title: 'Bonjour! Basics',
        description: 'Greetings and introductions',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'How do you say "Good evening" in French?', choices: ['Bonjour', 'Bonsoir', 'Au revoir', 'Bonne nuit'], correct: 1, explanation: '"Bonsoir" = "Good evening."' },
          { id: 'q2', question: 'What does "Comment t\'appelles-tu?" mean?', choices: ['How are you?', 'Where are you?', 'What is your name?', 'How old are you?'], correct: 2, explanation: '"Comment t\'appelles-tu?" = "What is your name?"' },
          { id: 'q3', question: '"Merci beaucoup" means...', choices: ['You\'re welcome', 'Please', 'Thank you very much', 'Excuse me'], correct: 2, explanation: '"Merci beaucoup" = "Thank you very much."' },
          { id: 'q4', question: 'How do you say "Yes" and "No" in French?', choices: ['Sí / No', 'Ja / Nein', 'Oui / Non', 'Sì / No'], correct: 2, explanation: '"Oui" = Yes, "Non" = No in French.' },
          { id: 'q5', question: 'What does "S\'il vous plaît" mean?', choices: ['Thank you', 'Excuse me', 'Please (formal)', 'You\'re welcome'], correct: 2, explanation: '"S\'il vous plaît" = "Please" (formal/plural).' },
        ],
      },
      {
        id: 'french-2',
        title: 'Colors & Articles',
        description: 'La/le/les and basic colors',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'The French word for "the" (masculine singular) is...', choices: ['La', 'Le', 'Les', 'Un'], correct: 1, explanation: '"Le" is the masculine definite article.' },
          { id: 'q2', question: '"Rouge" means...', choices: ['Blue', 'Green', 'Red', 'Yellow'], correct: 2, explanation: '"Rouge" = red.' },
          { id: 'q3', question: 'How do you say "a blue car" in French (masculine)?', choices: ['Un voiture bleu', 'Une voiture bleue', 'Le voiture bleu', 'Un auto bleu'], correct: 1, explanation: '"Voiture" is feminine: "une voiture bleue." Adjectives agree in gender.' },
          { id: 'q4', question: '"Vert" / "Verte" means...', choices: ['Black', 'White', 'Green', 'Yellow'], correct: 2, explanation: '"Vert/verte" = green.' },
          { id: 'q5', question: 'Which is the plural definite article in French?', choices: ['Le', 'La', 'Un', 'Les'], correct: 3, explanation: '"Les" is used for all plural nouns.' },
        ],
      },
    ],
  },
  {
    id: 'german',
    label: 'German',
    emoji: '🇩🇪',
    color: 'text-gray-700',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    lessons: [
      {
        id: 'german-1',
        title: 'Guten Tag! Basics',
        description: 'Essential German greetings',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: '"Guten Morgen" means...', choices: ['Good night', 'Good afternoon', 'Good morning', 'Goodbye'], correct: 2, explanation: '"Guten Morgen" = "Good morning."' },
          { id: 'q2', question: 'How do you say "Thank you" in German?', choices: ['Bitte', 'Danke', 'Entschuldigung', 'Hallo'], correct: 1, explanation: '"Danke" = "Thank you."' },
          { id: 'q3', question: 'What does "Wie heißt du?" mean?', choices: ['How are you?', 'Where do you live?', 'What is your name?', 'How old are you?'], correct: 2, explanation: '"Wie heißt du?" literally means "How are you called?" — asking your name.' },
          { id: 'q4', question: '"Auf Wiedersehen" means...', choices: ['Hello', 'Good night', 'Goodbye', 'See you soon'], correct: 2, explanation: '"Auf Wiedersehen" = "Goodbye" (formal).' },
          { id: 'q5', question: '"Bitte" can mean both "please" and...', choices: ['Thank you', 'You\'re welcome', 'Excuse me', 'Sorry'], correct: 1, explanation: '"Bitte" = "please" when asking, "you\'re welcome" when responding to thanks.' },
        ],
      },
      {
        id: 'german-2',
        title: 'Der, Die, Das',
        description: 'German grammatical gender',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'German has how many grammatical genders?', choices: ['1', '2', '3', '4'], correct: 2, explanation: 'German has three: masculine (der), feminine (die), neuter (das).' },
          { id: 'q2', question: '"Das Buch" (the book) uses which article — what gender is it?', choices: ['Masculine', 'Feminine', 'Neuter', 'Plural'], correct: 2, explanation: '"Das" is the neuter article.' },
          { id: 'q3', question: 'The plural definite article for all genders is...', choices: ['Der', 'Die', 'Das', 'Den'], correct: 1, explanation: '"Die" is used for all plural nouns.' },
          { id: 'q4', question: '"Die Frau" (the woman) — what article gender?', choices: ['Masculine', 'Feminine', 'Neuter', 'Plural'], correct: 1, explanation: '"Die" indicates feminine gender here.' },
          { id: 'q5', question: 'Which article is masculine nominative?', choices: ['Die', 'Das', 'Der', 'Den'], correct: 2, explanation: '"Der" is the masculine nominative article.' },
        ],
      },
    ],
  },
  {
    id: 'latin',
    label: 'Latin',
    emoji: '🏺',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    lessons: [
      {
        id: 'latin-1',
        title: 'Latin Roots & English',
        description: 'How Latin built the English language',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: 'The Latin root "port" means...', choices: ['To write', 'To carry', 'To see', 'To speak'], correct: 1, explanation: '"Port" = to carry, seen in export, import, transport.' },
          { id: 'q2', question: '"Aqua" in Latin means...', choices: ['Fire', 'Earth', 'Water', 'Air'], correct: 2, explanation: '"Aqua" = water, giving us words like aquarium and aquatic.' },
          { id: 'q3', question: 'The prefix "bene-" means...', choices: ['Bad', 'Good/well', 'Against', 'Before'], correct: 1, explanation: '"Bene" = well/good: benefit, benevolent, benediction.' },
          { id: 'q4', question: 'Which English word comes from "scrib/script" (to write)?', choices: ['Describe', 'Script', 'Scribble', 'All of the above'], correct: 3, explanation: 'All three come from Latin "scribere" (to write).' },
          { id: 'q5', question: '"Omni" means...', choices: ['One', 'Many', 'All', 'None'], correct: 2, explanation: '"Omni" = all: omnivore, omnipotent, omniscient.' },
        ],
      },
      {
        id: 'latin-2',
        title: 'Basic Latin Phrases',
        description: 'Common Latin expressions still in use',
        xp: 10, rubies: 5,
        questions: [
          { id: 'q1', question: '"Carpe diem" translates to...', choices: ['Time flies', 'Seize the day', 'To each their own', 'In the moment'], correct: 1, explanation: '"Carpe diem" = "Seize the day" — from Horace.' },
          { id: 'q2', question: '"E pluribus unum" (US motto) means...', choices: ['In God we trust', 'Out of many, one', 'United we stand', 'Liberty for all'], correct: 1, explanation: '"E pluribus unum" = "Out of many, one."' },
          { id: 'q3', question: '"Per se" means...', choices: ['By the way', 'By itself/in itself', 'Therefore', 'That is'], correct: 1, explanation: '"Per se" = "by itself" — used to mean "intrinsically."' },
          { id: 'q4', question: '"Veni, vidi, vici" is attributed to Julius Caesar and means...', choices: ['I fought, I won, I left', 'I came, I saw, I conquered', 'I ruled, I lived, I died', 'I loved, I lost, I learned'], correct: 1, explanation: '"Veni, vidi, vici" = "I came, I saw, I conquered."' },
          { id: 'q5', question: '"Et cetera" (etc.) means...', choices: ['And others', 'And so on', 'And the rest', 'All of the above'], correct: 3, explanation: '"Et cetera" literally means "and the other things" — all answers capture this meaning.' },
        ],
      },
    ],
  },
]

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id)
}

export function getLesson(subjectId: string, lessonId: string): Lesson | undefined {
  return getSubject(subjectId)?.lessons.find((l) => l.id === lessonId)
}

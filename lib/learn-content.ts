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
  level: 1 | 2 | 3
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
  hasPlacement: boolean
  placementQuestions: Question[]
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
    hasPlacement: true,
    placementQuestions: [
      {
        id: 'mp1',
        question: 'What is 3 + 4 × 2?',
        choices: ['14', '11', '10', '8'],
        correct: 1,
        explanation: 'By order of operations (PEMDAS), multiplication comes before addition: 4 × 2 = 8, then 3 + 8 = 11.',
      },
      {
        id: 'mp2',
        question: 'What is 3/4 + 1/8?',
        choices: ['4/12', '7/8', '1/2', '5/8'],
        correct: 1,
        explanation: 'Convert 3/4 to 6/8, then add 1/8 to get 7/8.',
      },
      {
        id: 'mp3',
        question: 'What is 25% of 80?',
        choices: ['15', '25', '20', '30'],
        correct: 2,
        explanation: '25% means 25/100 = 0.25. Multiply 0.25 × 80 = 20.',
      },
      {
        id: 'mp4',
        question: 'A bag has 3 red and 7 blue marbles. What fraction are red?',
        choices: ['3/7', '7/10', '3/10', '7/3'],
        correct: 2,
        explanation: 'Total marbles = 3 + 7 = 10. Fraction red = 3/10.',
      },
      {
        id: 'mp5',
        question: 'Solve for x: 2x + 5 = 13',
        choices: ['x = 3', 'x = 4', 'x = 9', 'x = 6'],
        correct: 1,
        explanation: 'Subtract 5 from both sides: 2x = 8. Divide by 2: x = 4.',
      },
      {
        id: 'mp6',
        question: 'What is the slope of the line y = 3x − 7?',
        choices: ['−7', '3', '7', '1/3'],
        correct: 1,
        explanation: 'In slope-intercept form y = mx + b, the slope m is the coefficient of x, which is 3.',
      },
      {
        id: 'mp7',
        question: 'If f(x) = 2x² − 3x + 1, what is f(2)?',
        choices: ['3', '4', '5', '7'],
        correct: 0,
        explanation: 'f(2) = 2(4) − 3(2) + 1 = 8 − 6 + 1 = 3.',
      },
      {
        id: 'mp8',
        question: 'Which of the following is a solution to x² − 5x + 6 = 0?',
        choices: ['x = 1', 'x = 2', 'x = 4', 'x = −3'],
        correct: 1,
        explanation: 'Factor: (x − 2)(x − 3) = 0, so x = 2 or x = 3. x = 2 is listed.',
      },
      {
        id: 'mp9',
        question: 'A dataset has values 4, 7, 7, 9, 13. What is the median?',
        choices: ['7', '8', '9', '7.5'],
        correct: 0,
        explanation: 'Sorted: 4, 7, 7, 9, 13. The middle value (3rd of 5) is 7.',
      },
      {
        id: 'mp10',
        question: 'What is the mean of 5, 10, 15, 20?',
        choices: ['10', '12.5', '15', '11'],
        correct: 1,
        explanation: 'Mean = (5 + 10 + 15 + 20) / 4 = 50 / 4 = 12.5.',
      },
      {
        id: 'mp11',
        question: 'Solve the system: x + y = 5 and x − y = 1. What is x?',
        choices: ['2', '3', '4', '1'],
        correct: 1,
        explanation: 'Add the equations: 2x = 6, so x = 3. Then y = 5 − 3 = 2.',
      },
      {
        id: 'mp12',
        question: 'What is the probability of rolling a 4 on a fair six-sided die?',
        choices: ['1/3', '1/4', '1/6', '2/6'],
        correct: 2,
        explanation: 'There is one favorable outcome (rolling a 4) out of 6 equally likely outcomes, so P = 1/6.',
      },
    ],
    lessons: [
      {
        id: 'math-1',
        title: 'Order of Operations',
        description: 'Master PEMDAS to solve expressions correctly every time.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          {
            id: 'q1',
            question: 'Evaluate: 8 + 2 × 3',
            choices: ['30', '14', '22', '18'],
            correct: 1,
            explanation: 'Multiplication first: 2 × 3 = 6. Then addition: 8 + 6 = 14.',
          },
          {
            id: 'q2',
            question: 'Evaluate: (5 + 3)²',
            choices: ['28', '64', '16', '34'],
            correct: 1,
            explanation: 'Parentheses first: 5 + 3 = 8. Then exponent: 8² = 64.',
          },
          {
            id: 'q3',
            question: 'Evaluate: 20 ÷ 4 + 3 × 2',
            choices: ['13', '10', '11', '16'],
            correct: 2,
            explanation: 'Division and multiplication first: 20 ÷ 4 = 5 and 3 × 2 = 6. Then addition: 5 + 6 = 11.',
          },
          {
            id: 'q4',
            question: 'Evaluate: 2³ + 4 × (6 − 2)',
            choices: ['40', '24', '28', '32'],
            correct: 1,
            explanation: 'Parentheses: 6 − 2 = 4. Exponent: 2³ = 8. Multiplication: 4 × 4 = 16. Addition: 8 + 16 = 24.',
          },
          {
            id: 'q5',
            question: 'Evaluate: 3 + 6 ÷ 2 − 1',
            choices: ['3', '5', '4', '6'],
            correct: 1,
            explanation: 'Division first: 6 ÷ 2 = 3. Then left to right: 3 + 3 − 1 = 5.',
          },
        ],
      },
      {
        id: 'math-2',
        title: 'Fractions & Decimals',
        description: 'Convert, compare, and calculate with fractions and decimals.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          {
            id: 'q1',
            question: 'What is 2/5 as a decimal?',
            choices: ['0.25', '0.4', '0.5', '0.2'],
            correct: 1,
            explanation: 'Divide 2 by 5: 2 ÷ 5 = 0.4.',
          },
          {
            id: 'q2',
            question: 'What is 1/3 + 1/6?',
            choices: ['2/9', '1/2', '2/6', '1/3'],
            correct: 1,
            explanation: 'Find a common denominator of 6: 1/3 = 2/6. Then 2/6 + 1/6 = 3/6 = 1/2.',
          },
          {
            id: 'q3',
            question: 'Which fraction is equivalent to 0.75?',
            choices: ['3/5', '7/10', '3/4', '2/3'],
            correct: 2,
            explanation: '0.75 = 75/100 = 3/4 when simplified by dividing numerator and denominator by 25.',
          },
          {
            id: 'q4',
            question: 'What is 5/6 − 1/3?',
            choices: ['4/3', '1/2', '2/6', '4/6'],
            correct: 1,
            explanation: 'Convert 1/3 to 2/6. Then 5/6 − 2/6 = 3/6 = 1/2.',
          },
          {
            id: 'q5',
            question: 'What is 3/4 × 8?',
            choices: ['5', '6', '7', '8'],
            correct: 1,
            explanation: '3/4 × 8 = (3 × 8) / 4 = 24/4 = 6.',
          },
        ],
      },
      {
        id: 'math-3',
        title: 'Percents & Ratios',
        description: 'Understand percentages, ratios, and proportional reasoning.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          {
            id: 'q1',
            question: 'What is 15% of 200?',
            choices: ['20', '25', '30', '35'],
            correct: 2,
            explanation: '15% = 0.15. Multiply: 0.15 × 200 = 30.',
          },
          {
            id: 'q2',
            question: 'A shirt costs $40 and is on sale for 20% off. What is the sale price?',
            choices: ['$28', '$30', '$32', '$36'],
            correct: 2,
            explanation: '20% of $40 = $8. Sale price = $40 − $8 = $32.',
          },
          {
            id: 'q3',
            question: 'If the ratio of cats to dogs is 3:5 and there are 15 cats, how many dogs are there?',
            choices: ['9', '20', '25', '12'],
            correct: 2,
            explanation: 'Ratio 3:5. 15 cats ÷ 3 = 5 (scale factor). Dogs = 5 × 5 = 25.',
          },
          {
            id: 'q4',
            question: 'What percent of 80 is 20?',
            choices: ['15%', '20%', '25%', '40%'],
            correct: 2,
            explanation: '(20 / 80) × 100 = 0.25 × 100 = 25%.',
          },
          {
            id: 'q5',
            question: 'A recipe calls for 2 cups of flour for every 3 cups of sugar. How much flour is needed for 9 cups of sugar?',
            choices: ['4 cups', '5 cups', '6 cups', '7 cups'],
            correct: 2,
            explanation: 'Ratio 2:3. 9 cups sugar ÷ 3 = 3 (scale factor). Flour = 2 × 3 = 6 cups.',
          },
        ],
      },
      {
        id: 'math-4',
        title: 'Algebra Basics',
        description: 'Learn variables, expressions, and the foundation of algebra.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          {
            id: 'q1',
            question: 'Simplify: 3x + 5x − 2x',
            choices: ['5x', '6x', '8x', '10x'],
            correct: 1,
            explanation: 'Combine like terms: (3 + 5 − 2)x = 6x.',
          },
          {
            id: 'q2',
            question: 'Expand: 4(2x − 3)',
            choices: ['6x − 7', '8x − 12', '8x − 3', '2x − 12'],
            correct: 1,
            explanation: 'Distribute 4: 4 × 2x = 8x and 4 × (−3) = −12. Result: 8x − 12.',
          },
          {
            id: 'q3',
            question: 'If x = 3, what is the value of 2x² − 4?',
            choices: ['10', '14', '18', '22'],
            correct: 1,
            explanation: '2(3²) − 4 = 2(9) − 4 = 18 − 4 = 14.',
          },
          {
            id: 'q4',
            question: 'Which expression is equivalent to 5(x + 2) − 3x?',
            choices: ['2x + 10', '8x + 2', '2x + 2', '5x + 10'],
            correct: 0,
            explanation: 'Distribute: 5x + 10 − 3x = 2x + 10.',
          },
          {
            id: 'q5',
            question: 'Factor out the GCF from 6x² + 9x.',
            choices: ['3(2x² + 3x)', '3x(2x + 3)', '6x(x + 9)', '9x(x + 1)'],
            correct: 1,
            explanation: 'The GCF of 6x² and 9x is 3x. Factoring: 3x(2x + 3).',
          },
        ],
      },
      {
        id: 'math-5',
        title: 'Linear Equations',
        description: 'Solve one- and two-variable linear equations and graph lines.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          {
            id: 'q1',
            question: 'Solve: 3x − 7 = 11',
            choices: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
            correct: 2,
            explanation: 'Add 7 to both sides: 3x = 18. Divide by 3: x = 6.',
          },
          {
            id: 'q2',
            question: 'What is the y-intercept of the line y = −2x + 5?',
            choices: ['−2', '5', '2', '−5'],
            correct: 1,
            explanation: 'In y = mx + b, b is the y-intercept. Here b = 5.',
          },
          {
            id: 'q3',
            question: 'Which equation represents a line with slope −3 passing through (0, 4)?',
            choices: ['y = 4x − 3', 'y = −3x + 4', 'y = 3x + 4', 'y = −4x + 3'],
            correct: 1,
            explanation: 'Slope-intercept form y = mx + b. m = −3 and b = 4 gives y = −3x + 4.',
          },
          {
            id: 'q4',
            question: 'If 4x + 2y = 20 and y = 2, what is x?',
            choices: ['3', '4', '5', '6'],
            correct: 1,
            explanation: 'Substitute y = 2: 4x + 4 = 20. 4x = 16. x = 4.',
          },
          {
            id: 'q5',
            question: 'Two points on a line are (1, 3) and (3, 7). What is the slope?',
            choices: ['1', '2', '3', '4'],
            correct: 1,
            explanation: 'Slope = (y₂ − y₁)/(x₂ − x₁) = (7 − 3)/(3 − 1) = 4/2 = 2.',
          },
        ],
      },
      {
        id: 'math-6',
        title: 'Geometry Essentials',
        description: 'Explore area, perimeter, angles, and basic geometric shapes.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          {
            id: 'q1',
            question: 'What is the area of a triangle with base 10 and height 6?',
            choices: ['30', '60', '16', '45'],
            correct: 0,
            explanation: 'Area of triangle = (1/2) × base × height = (1/2) × 10 × 6 = 30.',
          },
          {
            id: 'q2',
            question: 'What is the circumference of a circle with radius 7? (Use π ≈ 3.14)',
            choices: ['43.96', '21.98', '153.86', '49'],
            correct: 0,
            explanation: 'Circumference = 2πr = 2 × 3.14 × 7 = 43.96.',
          },
          {
            id: 'q3',
            question: 'The angles of a triangle are 50°, 70°, and x°. What is x?',
            choices: ['40°', '50°', '60°', '70°'],
            correct: 2,
            explanation: 'Angles of a triangle sum to 180°. x = 180 − 50 − 70 = 60°.',
          },
          {
            id: 'q4',
            question: 'What is the perimeter of a rectangle with length 8 and width 5?',
            choices: ['13', '26', '40', '45'],
            correct: 1,
            explanation: 'Perimeter = 2(length + width) = 2(8 + 5) = 2 × 13 = 26.',
          },
          {
            id: 'q5',
            question: 'Using the Pythagorean theorem, find the hypotenuse of a right triangle with legs 3 and 4.',
            choices: ['5', '6', '7', '8'],
            correct: 0,
            explanation: 'a² + b² = c². 3² + 4² = 9 + 16 = 25. c = √25 = 5.',
          },
        ],
      },
      {
        id: 'math-7',
        title: 'Quadratic Equations',
        description: 'Solve quadratics by factoring, completing the square, and the quadratic formula.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          {
            id: 'q1',
            question: 'Solve by factoring: x² + 5x + 6 = 0',
            choices: ['x = 2, x = 3', 'x = −2, x = −3', 'x = 1, x = 6', 'x = −1, x = −6'],
            correct: 1,
            explanation: 'Factor: (x + 2)(x + 3) = 0. So x = −2 or x = −3.',
          },
          {
            id: 'q2',
            question: 'What is the vertex of the parabola y = x² − 4x + 3?',
            choices: ['(2, −1)', '(−2, 1)', '(4, 3)', '(2, 3)'],
            correct: 0,
            explanation: 'Vertex x = −b/(2a) = 4/2 = 2. y = 4 − 8 + 3 = −1. Vertex is (2, −1).',
          },
          {
            id: 'q3',
            question: 'Use the quadratic formula to solve x² − 6x + 9 = 0.',
            choices: ['x = 3', 'x = −3', 'x = 3, x = −3', 'x = 9'],
            correct: 0,
            explanation: 'Discriminant: 36 − 36 = 0. One solution: x = 6/2 = 3.',
          },
          {
            id: 'q4',
            question: 'Which value of c makes x² + 8x + c a perfect square trinomial?',
            choices: ['4', '8', '16', '64'],
            correct: 2,
            explanation: 'Half of 8 is 4. Square it: 4² = 16. So c = 16.',
          },
          {
            id: 'q5',
            question: 'How many real solutions does x² + 4 = 0 have?',
            choices: ['None', 'One', 'Two', 'Infinite'],
            correct: 0,
            explanation: 'x² = −4 has no real solutions because the square of any real number is non-negative.',
          },
        ],
      },
      {
        id: 'math-8',
        title: 'Systems of Equations',
        description: 'Solve systems by substitution, elimination, and graphing.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          {
            id: 'q1',
            question: 'Solve by substitution: y = 2x and x + y = 9. What is x?',
            choices: ['2', '3', '4', '6'],
            correct: 1,
            explanation: 'Substitute y = 2x: x + 2x = 9, so 3x = 9, x = 3.',
          },
          {
            id: 'q2',
            question: 'Solve by elimination: 2x + y = 10 and x − y = 2. What is x?',
            choices: ['2', '3', '4', '5'],
            correct: 2,
            explanation: 'Add equations: 3x = 12, so x = 4.',
          },
          {
            id: 'q3',
            question: 'How many solutions does the system y = 2x + 1 and y = 2x − 3 have?',
            choices: ['None', 'One', 'Two', 'Infinite'],
            correct: 0,
            explanation: 'Both lines have slope 2 but different y-intercepts, so they are parallel and never intersect.',
          },
          {
            id: 'q4',
            question: 'A system of equations has two lines that are identical. How many solutions does it have?',
            choices: ['None', 'Exactly one', 'Exactly two', 'Infinite'],
            correct: 3,
            explanation: 'If two equations represent the same line, every point on the line is a solution, giving infinitely many solutions.',
          },
          {
            id: 'q5',
            question: 'Two numbers sum to 20 and differ by 4. What is the larger number?',
            choices: ['10', '11', '12', '13'],
            correct: 2,
            explanation: 'Let x + y = 20 and x − y = 4. Add: 2x = 24, x = 12.',
          },
        ],
      },
      {
        id: 'math-9',
        title: 'Statistics & Probability',
        description: 'Analyze data sets and calculate probabilities of events.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          {
            id: 'q1',
            question: 'Find the mode of the data set: 3, 5, 7, 5, 9, 3, 5.',
            choices: ['3', '5', '7', '9'],
            correct: 1,
            explanation: 'The mode is the value that appears most often. 5 appears 3 times, more than any other value.',
          },
          {
            id: 'q2',
            question: 'A jar has 4 red, 3 blue, and 3 green marbles. What is the probability of picking blue?',
            choices: ['1/4', '3/10', '3/7', '1/3'],
            correct: 1,
            explanation: 'Total marbles = 10. P(blue) = 3/10.',
          },
          {
            id: 'q3',
            question: 'What is the range of the data set: 8, 3, 15, 7, 11?',
            choices: ['7', '8', '12', '15'],
            correct: 2,
            explanation: 'Range = maximum − minimum = 15 − 3 = 12.',
          },
          {
            id: 'q4',
            question: 'If P(A) = 0.4 and P(B) = 0.3 and A and B are independent, what is P(A and B)?',
            choices: ['0.7', '0.12', '0.1', '0.34'],
            correct: 1,
            explanation: 'For independent events, P(A and B) = P(A) × P(B) = 0.4 × 0.3 = 0.12.',
          },
          {
            id: 'q5',
            question: 'A survey of 50 students shows 30 like soccer. What is the experimental probability a randomly chosen student likes soccer?',
            choices: ['3/5', '2/5', '1/2', '3/10'],
            correct: 0,
            explanation: 'P(likes soccer) = 30/50 = 3/5.',
          },
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
    hasPlacement: true,
    placementQuestions: [
      {
        id: 'sp1',
        question: 'What is the first step of the scientific method?',
        choices: ['Hypothesis', 'Experiment', 'Observation', 'Conclusion'],
        correct: 2,
        explanation: 'The scientific method begins with observation — noticing and describing a phenomenon.',
      },
      {
        id: 'sp2',
        question: 'Which organelle is known as the powerhouse of the cell?',
        choices: ['Nucleus', 'Ribosome', 'Mitochondria', 'Vacuole'],
        correct: 2,
        explanation: 'Mitochondria produce ATP through cellular respiration, earning the nickname "powerhouse of the cell."',
      },
      {
        id: 'sp3',
        question: 'What is the unit of force in the SI system?',
        choices: ['Watt', 'Joule', 'Newton', 'Pascal'],
        correct: 2,
        explanation: 'Force is measured in Newtons (N) in the SI system, named after Sir Isaac Newton.',
      },
      {
        id: 'sp4',
        question: 'What is the chemical symbol for water?',
        choices: ['WA', 'HO', 'H₂O', 'O₂H'],
        correct: 2,
        explanation: 'Water consists of two hydrogen atoms bonded to one oxygen atom, written as H₂O.',
      },
      {
        id: 'sp5',
        question: 'What molecule carries genetic information in cells?',
        choices: ['RNA', 'ATP', 'DNA', 'mRNA'],
        correct: 2,
        explanation: 'DNA (deoxyribonucleic acid) stores and carries genetic information in the nucleus of cells.',
      },
      {
        id: 'sp6',
        question: 'Which gas do plants absorb during photosynthesis?',
        choices: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
        correct: 2,
        explanation: 'Plants absorb carbon dioxide (CO₂) and use sunlight to convert it into glucose during photosynthesis.',
      },
      {
        id: 'sp7',
        question: 'What law states that for every action there is an equal and opposite reaction?',
        choices: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", 'Law of Gravity'],
        correct: 2,
        explanation: "Newton's Third Law of Motion states that for every action there is an equal and opposite reaction.",
      },
      {
        id: 'sp8',
        question: 'What is the atomic number of carbon?',
        choices: ['2', '4', '6', '12'],
        correct: 2,
        explanation: 'Carbon has 6 protons, so its atomic number is 6.',
      },
      {
        id: 'sp9',
        question: 'What is the process by which organisms pass traits to offspring?',
        choices: ['Photosynthesis', 'Heredity', 'Osmosis', 'Evolution'],
        correct: 1,
        explanation: 'Heredity is the process by which genetic traits are passed from parents to offspring.',
      },
      {
        id: 'sp10',
        question: 'Which term describes all the living organisms and their interactions in an area?',
        choices: ['Habitat', 'Ecosystem', 'Biome', 'Population'],
        correct: 1,
        explanation: 'An ecosystem includes all living organisms (biotic factors) and their interactions with the environment.',
      },
      {
        id: 'sp11',
        question: 'In a DNA double helix, adenine pairs with which base?',
        choices: ['Cytosine', 'Guanine', 'Thymine', 'Uracil'],
        correct: 2,
        explanation: 'In DNA, adenine (A) pairs with thymine (T), while cytosine (C) pairs with guanine (G).',
      },
      {
        id: 'sp12',
        question: 'What term describes species that are at risk of extinction due to environmental changes?',
        choices: ['Invasive', 'Endemic', 'Endangered', 'Migratory'],
        correct: 2,
        explanation: 'Endangered species face a very high risk of extinction in the wild if conditions do not improve.',
      },
    ],
    lessons: [
      {
        id: 'science-1',
        title: 'Scientific Method',
        description: 'Learn how scientists ask questions, form hypotheses, and test ideas.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          {
            id: 'q1',
            question: 'What is a hypothesis?',
            choices: ['A proven fact', 'A testable prediction or explanation', 'The final conclusion of an experiment', 'A summary of data collected'],
            correct: 1,
            explanation: 'A hypothesis is an educated, testable prediction or explanation for an observation.',
          },
          {
            id: 'q2',
            question: 'In an experiment, the variable that is deliberately changed is called the ___.',
            choices: ['Dependent variable', 'Control variable', 'Independent variable', 'Constant'],
            correct: 2,
            explanation: 'The independent variable is the one the experimenter intentionally changes to observe its effect.',
          },
          {
            id: 'q3',
            question: 'Why is it important to have a control group in an experiment?',
            choices: [
              'To make the experiment longer',
              'To provide a baseline for comparison',
              'To increase the number of variables',
              'To ensure the hypothesis is correct',
            ],
            correct: 1,
            explanation: 'A control group is unchanged and provides a baseline to compare the effect of the variable being tested.',
          },
          {
            id: 'q4',
            question: 'Which step follows forming a hypothesis in the scientific method?',
            choices: ['Draw conclusions', 'Conduct an experiment', 'Ask a question', 'Communicate results'],
            correct: 1,
            explanation: 'After forming a hypothesis, scientists design and conduct an experiment to test it.',
          },
          {
            id: 'q5',
            question: 'What does it mean if an experiment is "reproducible"?',
            choices: [
              'It can only be done once',
              'Other scientists can perform it and get the same results',
              'It was performed by one scientist',
              'It produces different results each time',
            ],
            correct: 1,
            explanation: 'Reproducibility means other researchers can repeat the experiment and obtain consistent results, which validates the findings.',
          },
        ],
      },
      {
        id: 'science-2',
        title: 'Cells & Life',
        description: 'Explore cell structure, function, and the building blocks of living things.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          {
            id: 'q1',
            question: 'What is the main difference between a prokaryotic and eukaryotic cell?',
            choices: [
              'Eukaryotic cells have a nucleus; prokaryotic cells do not',
              'Prokaryotic cells are larger than eukaryotic cells',
              'Only eukaryotic cells have a cell membrane',
              'Prokaryotic cells contain more DNA',
            ],
            correct: 0,
            explanation: 'Eukaryotic cells have a membrane-bound nucleus; prokaryotic cells (like bacteria) lack one.',
          },
          {
            id: 'q2',
            question: 'Which organelle controls what enters and exits the cell?',
            choices: ['Cell wall', 'Nucleus', 'Cell membrane', 'Golgi apparatus'],
            correct: 2,
            explanation: 'The cell membrane regulates the movement of substances into and out of the cell.',
          },
          {
            id: 'q3',
            question: 'What process do plant cells use to make food using sunlight?',
            choices: ['Respiration', 'Fermentation', 'Photosynthesis', 'Osmosis'],
            correct: 2,
            explanation: 'Photosynthesis occurs in chloroplasts and converts light energy, CO₂, and water into glucose and oxygen.',
          },
          {
            id: 'q4',
            question: 'Which structure is found in plant cells but NOT animal cells?',
            choices: ['Mitochondria', 'Ribosome', 'Cell wall', 'Nucleus'],
            correct: 2,
            explanation: 'Plant cells have a rigid cell wall made of cellulose; animal cells do not.',
          },
          {
            id: 'q5',
            question: "What is the function of the nucleus?",
            choices: [
              'To produce energy for the cell',
              "To control the cell's activities and store DNA",
              'To synthesize proteins',
              'To transport materials within the cell',
            ],
            correct: 1,
            explanation: 'The nucleus is the control center of the cell, housing DNA and directing cellular activities.',
          },
        ],
      },
      {
        id: 'science-3',
        title: 'Forces & Motion',
        description: "Understand Newton's laws, gravity, and how forces affect movement.",
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          {
            id: 'q1',
            question: "Newton's First Law states that an object at rest will stay at rest unless acted upon by a(n) ___.",
            choices: ['Equal force', 'Unbalanced force', 'Internal force', 'Gravitational force'],
            correct: 1,
            explanation: "Newton's First Law (inertia) says objects resist changes in motion; an unbalanced (net) force is needed to change that.",
          },
          {
            id: 'q2',
            question: 'A 10 kg object accelerates at 3 m/s². What net force acts on it?',
            choices: ['13 N', '3.3 N', '30 N', '7 N'],
            correct: 2,
            explanation: "F = ma = 10 kg × 3 m/s² = 30 N (Newton's Second Law).",
          },
          {
            id: 'q3',
            question: 'Which force pulls objects toward Earth?',
            choices: ['Friction', 'Normal force', 'Tension', 'Gravity'],
            correct: 3,
            explanation: 'Gravity is the attractive force between masses that pulls objects toward Earth.',
          },
          {
            id: 'q4',
            question: 'A rocket launches upward by expelling gas downward. This demonstrates which law?',
            choices: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", 'Law of Conservation of Energy'],
            correct: 2,
            explanation: "Newton's Third Law: the rocket pushes gas down (action) and gas pushes the rocket up (reaction).",
          },
          {
            id: 'q5',
            question: 'What force opposes the motion of a sliding book on a table?',
            choices: ['Gravity', 'Normal force', 'Friction', 'Applied force'],
            correct: 2,
            explanation: 'Friction is a contact force that opposes relative motion between surfaces.',
          },
        ],
      },
      {
        id: 'science-4',
        title: 'Chemistry Basics',
        description: 'Explore atoms, elements, compounds, and chemical reactions.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          {
            id: 'q1',
            question: 'What is the smallest unit of an element that retains its chemical properties?',
            choices: ['Molecule', 'Atom', 'Proton', 'Electron'],
            correct: 1,
            explanation: 'An atom is the smallest particle of an element that still has the chemical properties of that element.',
          },
          {
            id: 'q2',
            question: 'In the periodic table, elements in the same group share similar ___.',
            choices: ['Atomic mass', 'Number of neutrons', 'Chemical properties', 'Physical state'],
            correct: 2,
            explanation: 'Elements in the same group (column) have the same number of valence electrons and therefore similar chemical properties.',
          },
          {
            id: 'q3',
            question: 'What type of bond involves sharing electrons between atoms?',
            choices: ['Ionic bond', 'Covalent bond', 'Hydrogen bond', 'Metallic bond'],
            correct: 1,
            explanation: 'A covalent bond forms when atoms share one or more pairs of electrons.',
          },
          {
            id: 'q4',
            question: 'Which of the following is a sign that a chemical reaction has occurred?',
            choices: [
              'The substance changes shape',
              'The substance changes color and produces gas',
              'The substance is cut in half',
              'The substance melts',
            ],
            correct: 1,
            explanation: 'Color change and gas production are evidence of a chemical reaction (new substances formed). Shape changes and melting are physical changes.',
          },
          {
            id: 'q5',
            question: 'What does the law of conservation of mass state?',
            choices: [
              'Mass is created during chemical reactions',
              'Mass is destroyed during chemical reactions',
              'Mass is neither created nor destroyed in a chemical reaction',
              'Mass increases when substances dissolve',
            ],
            correct: 2,
            explanation: 'The law of conservation of mass states that the total mass of reactants equals the total mass of products in a chemical reaction.',
          },
        ],
      },
      {
        id: 'science-5',
        title: 'Genetics & DNA',
        description: 'Understand heredity, genes, and how traits are inherited.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          {
            id: 'q1',
            question: 'What are alleles?',
            choices: [
              'Different versions of the same gene',
              'Identical copies of DNA',
              'Segments of RNA',
              'Proteins produced by cells',
            ],
            correct: 0,
            explanation: 'Alleles are different versions (variants) of the same gene, one inherited from each parent.',
          },
          {
            id: 'q2',
            question: 'If T (tall) is dominant and t (short) is recessive, what is the phenotype of a Tt plant?',
            choices: ['Short', 'Tall', 'Medium', 'Cannot be determined'],
            correct: 1,
            explanation: 'Having at least one dominant allele (T) results in the dominant phenotype — the plant will be tall.',
          },
          {
            id: 'q3',
            question: 'During which process is DNA copied before cell division?',
            choices: ['Transcription', 'Translation', 'DNA replication', 'Meiosis'],
            correct: 2,
            explanation: 'DNA replication duplicates the DNA so each daughter cell receives a complete copy of the genome.',
          },
          {
            id: 'q4',
            question: "Mendel's Law of Segregation states that ___.",
            choices: [
              'Genes for different traits are inherited together',
              'Each organism has two alleles for each trait that separate during gamete formation',
              'Dominant alleles always mask recessive ones',
              'Traits skip generations randomly',
            ],
            correct: 1,
            explanation: 'The Law of Segregation says the two alleles for a trait separate (segregate) during meiosis so each gamete gets only one allele.',
          },
          {
            id: 'q5',
            question: 'What is a mutation?',
            choices: [
              'A normal change in protein structure',
              'A change in the DNA sequence',
              'The process of gene expression',
              'The division of a cell',
            ],
            correct: 1,
            explanation: 'A mutation is a change in the DNA nucleotide sequence, which can affect gene function and inherited traits.',
          },
        ],
      },
      {
        id: 'science-6',
        title: 'Ecology & Environment',
        description: 'Study ecosystems, food webs, and the impact of human activity on the environment.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          {
            id: 'q1',
            question: 'In a food chain, organisms that make their own food are called ___.',
            choices: ['Consumers', 'Decomposers', 'Producers', 'Omnivores'],
            correct: 2,
            explanation: 'Producers (mostly plants and algae) make their own food through photosynthesis and form the base of food chains.',
          },
          {
            id: 'q2',
            question: 'What is biodiversity?',
            choices: [
              'The study of a single species',
              'The variety of life forms in an ecosystem',
              'The number of producers in a food web',
              'The total biomass of an area',
            ],
            correct: 1,
            explanation: 'Biodiversity refers to the variety of different species, genes, and ecosystems in a given area.',
          },
          {
            id: 'q3',
            question: 'Which human activity is a major contributor to the greenhouse effect?',
            choices: [
              'Planting forests',
              'Burning fossil fuels',
              'Using solar energy',
              'Recycling materials',
            ],
            correct: 1,
            explanation: 'Burning fossil fuels releases CO₂ and other greenhouse gases that trap heat in the atmosphere, enhancing the greenhouse effect.',
          },
          {
            id: 'q4',
            question: 'What is the role of decomposers in an ecosystem?',
            choices: [
              'They produce energy from sunlight',
              'They eat primary consumers',
              'They break down dead organisms and recycle nutrients',
              'They convert nitrogen gas into usable form',
            ],
            correct: 2,
            explanation: 'Decomposers (fungi, bacteria) break down dead organic matter and return nutrients to the soil, cycling them through the ecosystem.',
          },
          {
            id: 'q5',
            question: 'An invasive species is one that ___.',
            choices: [
              'Is native to an ecosystem and keeps it in balance',
              'Is introduced to a new area and disrupts the existing ecosystem',
              'Only lives in tropical regions',
              'Has gone extinct in its native habitat',
            ],
            correct: 1,
            explanation: 'Invasive species are non-native organisms introduced to a new habitat where they can outcompete native species and disrupt the ecosystem.',
          },
        ],
      },
    ],
  },
  {
    id: 'us_history',
    label: 'U.S. History',
    emoji: '🦅',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    hasPlacement: false,
    placementQuestions: [],
    lessons: [
      {
        id: 'ush-1',
        title: 'Colonial America',
        description: 'Explore the founding of the thirteen colonies and life in colonial times.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          {
            id: 'q1',
            question: 'Which was the first permanent English settlement in North America?',
            choices: ['Plymouth', 'Boston', 'Jamestown', 'Roanoke'],
            correct: 2,
            explanation: 'Jamestown, Virginia, founded in 1607, was the first permanent English settlement in North America.',
          },
          {
            id: 'q2',
            question: 'The Mayflower Compact (1620) was significant because it ___.',
            choices: [
              'Declared independence from Britain',
              'Established the idea of self-government among the Pilgrims',
              'Created the first colonial legislature',
              'Ended conflict with Native Americans',
            ],
            correct: 1,
            explanation: 'The Mayflower Compact was a self-governing agreement signed by the Pilgrims, establishing the principle of majority rule and consent of the governed.',
          },
          {
            id: 'q3',
            question: 'Which colony was founded as a refuge for English Catholics?',
            choices: ['Pennsylvania', 'Rhode Island', 'Maryland', 'Georgia'],
            correct: 2,
            explanation: 'Maryland was founded in 1632 by Lord Baltimore as a haven for English Catholics facing persecution.',
          },
          {
            id: 'q4',
            question: 'The triangular trade involved the exchange of enslaved Africans, raw materials, and ___.',
            choices: ['Weapons', 'Manufactured goods', 'Spices', 'Gold'],
            correct: 1,
            explanation: 'Triangular trade linked the Americas, Europe, and Africa, exchanging enslaved people, raw materials (cotton, tobacco), and European manufactured goods.',
          },
          {
            id: 'q5',
            question: 'Which colonial region was known for large tobacco and rice plantations relying on enslaved labor?',
            choices: ['New England colonies', 'Middle colonies', 'Southern colonies', 'Western frontier'],
            correct: 2,
            explanation: 'The Southern colonies (Virginia, the Carolinas, Georgia) developed large plantations that grew tobacco and rice using enslaved African labor.',
          },
        ],
      },
      {
        id: 'ush-2',
        title: 'American Revolution',
        description: 'Discover the causes, key events, and outcomes of American independence.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          {
            id: 'q1',
            question: 'The phrase "no taxation without representation" expressed colonial anger about ___.',
            choices: [
              'Military drafts by Britain',
              'British taxes imposed without colonial input in Parliament',
              'Trade restrictions on colonial goods',
              'The quartering of soldiers in homes',
            ],
            correct: 1,
            explanation: 'Colonists objected to British taxes like the Stamp Act because they had no elected representatives in the British Parliament.',
          },
          {
            id: 'q2',
            question: 'The Declaration of Independence was primarily authored by ___.',
            choices: ['George Washington', 'John Adams', 'Benjamin Franklin', 'Thomas Jefferson'],
            correct: 3,
            explanation: 'Thomas Jefferson was the principal author of the Declaration of Independence, adopted on July 4, 1776.',
          },
          {
            id: 'q3',
            question: 'Which battle is considered the turning point of the American Revolution because it convinced France to ally with the colonists?',
            choices: ['Battle of Lexington', 'Battle of Bunker Hill', 'Battle of Saratoga', 'Battle of Yorktown'],
            correct: 2,
            explanation: 'The American victory at the Battle of Saratoga (1777) convinced France to formally ally with the American colonists against Britain.',
          },
          {
            id: 'q4',
            question: 'The Treaty of Paris (1783) recognized American independence and set the western boundary of the new nation at the ___.',
            choices: ['Appalachian Mountains', 'Mississippi River', 'Rocky Mountains', 'Ohio River'],
            correct: 1,
            explanation: 'The Treaty of Paris established the Mississippi River as the western boundary of the United States.',
          },
          {
            id: 'q5',
            question: 'The colonists\' victory at the Siege of Yorktown (1781) effectively ended the war because ___.',
            choices: [
              'The British navy was destroyed',
              'The British Parliament voted to end the war',
              'British General Cornwallis surrendered his entire army',
              'King George III was removed from power',
            ],
            correct: 2,
            explanation: 'At Yorktown, British General Cornwallis surrendered approximately 8,000 troops to Washington and Rochambeau, effectively ending major combat operations.',
          },
        ],
      },
      {
        id: 'ush-3',
        title: 'Civil War Era',
        description: 'Examine the causes, course, and consequences of the American Civil War.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          {
            id: 'q1',
            question: 'Which event immediately triggered Southern states to begin seceding from the Union in 1860?',
            choices: [
              'The abolition of slavery in the North',
              'The election of Abraham Lincoln as president',
              'The raid on Harpers Ferry',
              'The Dred Scott decision',
            ],
            correct: 1,
            explanation: 'The election of Abraham Lincoln in November 1860, who opposed the expansion of slavery, prompted Southern states to begin seceding.',
          },
          {
            id: 'q2',
            question: 'The Emancipation Proclamation (1863) declared ___.',
            choices: [
              'All enslaved people in the United States immediately free',
              'Enslaved people in Confederate states in rebellion to be free',
              'Slavery to be illegal in all territories',
              'Equal rights for all citizens regardless of race',
            ],
            correct: 1,
            explanation: 'The Emancipation Proclamation declared enslaved people in Confederate states currently in rebellion against the Union to be free, as a war measure.',
          },
          {
            id: 'q3',
            question: 'What was the significance of the Battle of Gettysburg (1863)?',
            choices: [
              'It was the first major battle of the Civil War',
              'It ended the war in the East',
              'It was the bloodiest battle and turned back the Confederate invasion of the North',
              'It was fought entirely at sea',
            ],
            correct: 2,
            explanation: "The Battle of Gettysburg (July 1–3, 1863) was the war's costliest battle and a decisive Union victory that ended General Lee's invasion of Pennsylvania.",
          },
          {
            id: 'q4',
            question: 'The 13th Amendment to the Constitution (1865) ___.',
            choices: [
              'Granted citizenship to formerly enslaved people',
              'Gave Black men the right to vote',
              'Abolished slavery throughout the United States',
              'Established Reconstruction policies',
            ],
            correct: 2,
            explanation: 'The 13th Amendment, ratified in December 1865, formally abolished slavery and involuntary servitude throughout the United States.',
          },
          {
            id: 'q5',
            question: 'Reconstruction (1865–1877) primarily aimed to ___.',
            choices: [
              'Punish Confederate leaders with imprisonment',
              'Rebuild the South and integrate formerly enslaved people as citizens',
              'Expand U.S. territory westward',
              'Industrialize the Northern economy',
            ],
            correct: 1,
            explanation: 'Reconstruction was the federal effort to rebuild the South after the Civil War and to integrate formerly enslaved African Americans into society as citizens.',
          },
        ],
      },
      {
        id: 'ush-4',
        title: 'Industrial Age',
        description: 'Learn how industrialization, immigration, and urbanization transformed America.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          {
            id: 'q1',
            question: 'The completion of the Transcontinental Railroad in 1869 was significant because it ___.',
            choices: [
              'Connected the Atlantic and Pacific coasts, boosting commerce and migration',
              'Ended conflict with Native American tribes',
              'Brought electricity to rural communities',
              'Replaced all river-based transportation',
            ],
            correct: 0,
            explanation: 'The Transcontinental Railroad linked the East and West Coasts, dramatically reducing travel time and stimulating trade and westward settlement.',
          },
          {
            id: 'q2',
            question: 'Captains of industry like Andrew Carnegie (steel) and John D. Rockefeller (oil) were sometimes called "robber barons" because they ___.',
            choices: [
              'Stole inventions from other companies',
              'Used monopolistic practices and exploited workers to accumulate vast wealth',
              'Refused to pay any taxes to the government',
              'Engaged in literal theft of public land',
            ],
            correct: 1,
            explanation: 'Critics called these industrialists "robber barons" because they used trusts and monopolies to crush competition and paid workers very low wages.',
          },
          {
            id: 'q3',
            question: 'Between 1880 and 1920, millions of immigrants arrived from southern and eastern Europe. Where did many of them first arrive?',
            choices: ['Boston Harbor', 'Ellis Island, New York', 'Angel Island, California', 'Baltimore Harbor'],
            correct: 1,
            explanation: 'Ellis Island in New York Harbor was the main entry point for the approximately 12 million European immigrants who arrived between 1892 and 1954.',
          },
          {
            id: 'q4',
            question: 'The Sherman Antitrust Act (1890) was designed to ___.',
            choices: [
              'Regulate immigration from Asia',
              'Break up monopolies and promote competition in business',
              "Protect workers' rights to unionize",
              'Limit foreign investment in American industries',
            ],
            correct: 1,
            explanation: 'The Sherman Antitrust Act outlawed business combinations that restrained trade or commerce, targeting monopolistic trusts.',
          },
          {
            id: 'q5',
            question: 'The Progressive Era (roughly 1890–1920) was characterized by ___.',
            choices: [
              'A return to agricultural society',
              'Isolationism from world affairs',
              'Reforms to address corruption, poverty, and poor working conditions',
              'Expansion of slavery into new territories',
            ],
            correct: 2,
            explanation: "Progressives pushed for political reforms (direct election of senators, women's suffrage) and social reforms (child labor laws, food safety regulations).",
          },
        ],
      },
      {
        id: 'ush-5',
        title: 'World Wars',
        description: "Explore America's role in World War I and World War II.",
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          {
            id: 'q1',
            question: 'The United States entered World War I in 1917 partly because of ___.',
            choices: [
              'The Japanese attack on Pearl Harbor',
              'The sinking of American ships by German submarines and the Zimmermann Telegram',
              'The German invasion of France',
              'A request from the League of Nations',
            ],
            correct: 1,
            explanation: 'Unrestricted German submarine warfare killing American civilians and the Zimmermann Telegram (proposing a German-Mexican alliance against the U.S.) pushed Congress to declare war.',
          },
          {
            id: 'q2',
            question: "President Woodrow Wilson's Fourteen Points proposed ___.",
            choices: [
              'Harsh reparations against Germany',
              'A framework for lasting peace including a League of Nations',
              'U.S. annexation of German colonies',
              'A military alliance with Britain and France',
            ],
            correct: 1,
            explanation: "Wilson's Fourteen Points outlined principles for peace, including self-determination of nations and the creation of a League of Nations to prevent future wars.",
          },
          {
            id: 'q3',
            question: 'The attack on Pearl Harbor on December 7, 1941, led to ___.',
            choices: [
              'The U.S. declaring war on Germany only',
              'The U.S. remaining neutral',
              'The U.S. declaring war on Japan, and then Germany and Italy declaring war on the U.S.',
              'The immediate defeat of Japan',
            ],
            correct: 2,
            explanation: "Japan's surprise attack on Pearl Harbor brought the U.S. into WWII. After the U.S. declared war on Japan, Germany and Italy (Axis allies) declared war on the U.S.",
          },
          {
            id: 'q4',
            question: 'D-Day (June 6, 1944) was the Allied invasion of ___.',
            choices: ['Sicily, Italy', 'Normandy, France', 'North Africa', 'The Philippines'],
            correct: 1,
            explanation: "Operation Overlord — the D-Day landings at Normandy beaches in France — was the largest seaborne invasion in history and opened a Western Front against Nazi Germany.",
          },
          {
            id: 'q5',
            question: 'The United States dropped atomic bombs on Hiroshima and Nagasaki in August 1945, which ___.',
            choices: [
              "Had no effect on the war's outcome",
              "Led to the Soviet Union's surrender",
              "Contributed to Japan's surrender and the end of World War II",
              'Was immediately condemned by all Allied nations',
            ],
            correct: 2,
            explanation: "The atomic bombings of Hiroshima (August 6) and Nagasaki (August 9) caused massive destruction and, combined with Soviet entry into the Pacific War, led to Japan's surrender on August 15, 1945.",
          },
        ],
      },
      {
        id: 'ush-6',
        title: 'Civil Rights Movement',
        description: 'Study the struggle for equality and justice for African Americans in the 20th century.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          {
            id: 'q1',
            question: "The Supreme Court's ruling in Brown v. Board of Education (1954) declared ___.",
            choices: [
              'Segregation in public transportation unconstitutional',
              'Racial segregation in public schools unconstitutional',
              'Poll taxes on Black voters illegal',
              'Affirmative action programs required',
            ],
            correct: 1,
            explanation: "In Brown v. Board of Education, the Supreme Court unanimously ruled that racial segregation in public schools violated the Equal Protection Clause of the 14th Amendment.",
          },
          {
            id: 'q2',
            question: "Rosa Parks' refusal to give up her bus seat in 1955 sparked ___.",
            choices: [
              'The March on Washington',
              'The Montgomery Bus Boycott',
              'The Freedom Rides',
              'The Selma to Montgomery marches',
            ],
            correct: 1,
            explanation: "Rosa Parks' arrest for refusing to give up her seat to a white passenger triggered the Montgomery Bus Boycott (1955–1956), a pivotal early civil rights campaign.",
          },
          {
            id: 'q3',
            question: 'Martin Luther King Jr.\'s "I Have a Dream" speech was delivered during ___.',
            choices: [
              'The March on Washington (1963)',
              'The Selma to Montgomery March (1965)',
              'The Montgomery Bus Boycott (1955)',
              'The signing of the Civil Rights Act (1964)',
            ],
            correct: 0,
            explanation: 'King delivered his iconic "I Have a Dream" speech on August 28, 1963, during the March on Washington for Jobs and Freedom.',
          },
          {
            id: 'q4',
            question: 'The Civil Rights Act of 1964 prohibited ___.',
            choices: [
              'Only segregation on federal property',
              'Discrimination based on race, color, religion, sex, or national origin in public places and employment',
              'Only voting discrimination against Black Americans',
              'All forms of affirmative action',
            ],
            correct: 1,
            explanation: 'The Civil Rights Act of 1964 banned discrimination in public accommodations, public facilities, and employment based on race, color, religion, sex, or national origin.',
          },
          {
            id: 'q5',
            question: "The Voting Rights Act of 1965 was passed in response to ___.",
            choices: [
              'Widespread voter fraud in Northern cities',
              "Violent attacks on peaceful marchers at Selma's Edmund Pettus Bridge",
              'The assassination of President Kennedy',
              'Protests against the Vietnam War',
            ],
            correct: 1,
            explanation: 'The brutal "Bloody Sunday" attack on peaceful marchers crossing Selma\'s Edmund Pettus Bridge on March 7, 1965, galvanized public support and led to the Voting Rights Act.',
          },
        ],
      },
    ],
  },
{
  id: 'world_history',
  label: 'World History',
  emoji: '🌍',
  color: 'text-orange-600',
  bg: 'bg-orange-50',
  border: 'border-orange-200',
  hasPlacement: false,
  placementQuestions: [],
  lessons: [
    {
      id: 'wh-1',
      title: 'Ancient Civilizations',
      description: 'Egypt, Greece, and Rome shaped the ancient world.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'Which river was central to the development of Ancient Egyptian civilization?',
          choices: ['Tigris', 'Euphrates', 'Nile', 'Indus'],
          correct: 2,
          explanation: 'The Nile River provided fertile soil through annual flooding, enabling Egyptian agriculture and civilization to flourish.',
        },
        {
          id: 'q2',
          question: 'What structure did the ancient Greeks use as a center of democracy and civic life?',
          choices: ['Colosseum', 'Agora', 'Ziggurat', 'Forum'],
          correct: 1,
          explanation: 'The Agora was the central public space in ancient Greek city-states, used for assemblies, markets, and civic activity.',
        },
        {
          id: 'q3',
          question: 'Which Roman structure was used primarily for gladiatorial contests and public spectacles?',
          choices: ['Pantheon', 'Circus Maximus', 'Colosseum', 'Forum of Trajan'],
          correct: 2,
          explanation: 'The Colosseum, completed in 80 AD, was an amphitheater used for gladiatorial games, animal hunts, and other public events.',
        },
        {
          id: 'q4',
          question: 'The ancient Egyptian writing system is known as:',
          choices: ['Cuneiform', 'Hieroglyphics', 'Linear B', 'Sanskrit'],
          correct: 1,
          explanation: 'Hieroglyphics was the formal writing system of ancient Egypt, using pictorial symbols to represent sounds and ideas.',
        },
        {
          id: 'q5',
          question: 'Which Greek philosopher was the teacher of Alexander the Great?',
          choices: ['Socrates', 'Plato', 'Aristotle', 'Pythagoras'],
          correct: 2,
          explanation: 'Aristotle tutored the young Alexander of Macedon, who later became Alexander the Great and built one of the largest empires in ancient history.',
        },
      ],
    },
    {
      id: 'wh-2',
      title: 'Medieval Europe',
      description: 'Feudalism, the Church, and the Middle Ages.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'What was the name of the system of land ownership and loyalty in Medieval Europe?',
          choices: ['Mercantilism', 'Feudalism', 'Colonialism', 'Capitalism'],
          correct: 1,
          explanation: 'Feudalism was the hierarchical system in medieval Europe where lords granted land (fiefs) to vassals in exchange for military service and loyalty.',
        },
        {
          id: 'q2',
          question: 'The Black Death that devastated Europe in the 14th century was caused by:',
          choices: ['A virus', 'A fungus', 'Bacteria (Yersinia pestis)', 'A parasite'],
          correct: 2,
          explanation: 'The Black Death (bubonic plague) was caused by the bacterium Yersinia pestis and killed an estimated one-third of Europe\'s population.',
        },
        {
          id: 'q3',
          question: 'The Magna Carta, signed in 1215, was significant because it:',
          choices: [
            'Established the first parliament',
            'Limited the power of the English king',
            'Ended the Hundred Years\' War',
            'Created the Catholic Church',
          ],
          correct: 1,
          explanation: 'The Magna Carta was a charter forced upon King John of England that limited royal power and established that the king was subject to the rule of law.',
        },
        {
          id: 'q4',
          question: 'Which series of religious wars were fought to reclaim the Holy Land from Muslim control?',
          choices: ['The Inquisitions', 'The Crusades', 'The Reconquista', 'The Thirty Years\' War'],
          correct: 1,
          explanation: 'The Crusades were a series of religious wars (1095–1291) sanctioned by the Latin Church, aimed at recovering the Holy Land from Islamic rule.',
        },
        {
          id: 'q5',
          question: 'Who was crowned Holy Roman Emperor on Christmas Day 800 AD?',
          choices: ['Otto I', 'Frederick Barbarossa', 'Charlemagne', 'Pepin the Short'],
          correct: 2,
          explanation: 'Charlemagne (Charles the Great), King of the Franks, was crowned Emperor of the Romans by Pope Leo III on December 25, 800 AD.',
        },
      ],
    },
    {
      id: 'wh-3',
      title: 'Age of Exploration',
      description: 'European voyages that connected the world.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'Who was the first European explorer to reach India by sailing around Africa?',
          choices: ['Christopher Columbus', 'Ferdinand Magellan', 'Vasco da Gama', 'Bartolomeu Dias'],
          correct: 2,
          explanation: 'Vasco da Gama completed the first sea voyage from Europe to India in 1498, sailing around the Cape of Good Hope.',
        },
        {
          id: 'q2',
          question: 'The Treaty of Tordesillas (1494) divided newly discovered lands between:',
          choices: ['England and France', 'Spain and Portugal', 'Holland and Spain', 'Portugal and England'],
          correct: 1,
          explanation: 'The Treaty of Tordesillas divided the newly discovered lands outside Europe between Spain and Portugal along a meridian in the Atlantic Ocean.',
        },
        {
          id: 'q3',
          question: 'Which explorer completed the first circumnavigation of the globe (1519–1522)?',
          choices: ['Christopher Columbus', 'Vasco da Gama', 'Ferdinand Magellan\'s expedition', 'John Cabot'],
          correct: 2,
          explanation: 'Ferdinand Magellan led the expedition that first circumnavigated the globe, though he died in the Philippines; Juan Sebastián Elcano completed the voyage.',
        },
        {
          id: 'q4',
          question: 'The Columbian Exchange refers to:',
          choices: [
            'A trade agreement between Columbus and Spain',
            'The transfer of plants, animals, and diseases between the Americas and the Old World',
            'Columbus\'s mapping of the Caribbean islands',
            'The exchange of gold between Spain and the Americas',
          ],
          correct: 1,
          explanation: 'The Columbian Exchange was the widespread transfer of plants, animals, culture, human populations, technology, and diseases between the Americas and the Old World following Columbus\'s 1492 voyage.',
        },
        {
          id: 'q5',
          question: 'Which Portuguese explorer sailed around the southern tip of Africa, naming it the Cape of Good Hope?',
          choices: ['Vasco da Gama', 'Pedro Álvares Cabral', 'Bartolomeu Dias', 'Prince Henry the Navigator'],
          correct: 2,
          explanation: 'Bartolomeu Dias rounded the southernmost tip of Africa in 1488, originally calling it the Cape of Storms; King John II of Portugal renamed it the Cape of Good Hope.',
        },
      ],
    },
    {
      id: 'wh-4',
      title: 'Revolutions & Empires',
      description: 'The French Revolution, Napoleon, and industrialization.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'The French Revolution began in 1789 with the storming of which famous prison?',
          choices: ['The Louvre', 'The Bastille', 'Versailles', 'Notre-Dame'],
          correct: 1,
          explanation: 'The storming of the Bastille on July 14, 1789, is considered the symbolic start of the French Revolution. The Bastille was a royal fortress and prison.',
        },
        {
          id: 'q2',
          question: 'Napoleon Bonaparte was finally defeated at which battle in 1815?',
          choices: ['Battle of Austerlitz', 'Battle of Trafalgar', 'Battle of Waterloo', 'Battle of Leipzig'],
          correct: 2,
          explanation: 'Napoleon was decisively defeated at the Battle of Waterloo on June 18, 1815, by the Duke of Wellington and the Prussian army, ending his rule.',
        },
        {
          id: 'q3',
          question: 'The slogan of the French Revolution was "Liberty, Equality, and ___":',
          choices: ['Justice', 'Fraternity', 'Democracy', 'Prosperity'],
          correct: 1,
          explanation: '"Liberté, Égalité, Fraternité" (Liberty, Equality, Fraternity) became the motto of the French Republic and remains France\'s national motto today.',
        },
        {
          id: 'q4',
          question: 'The Industrial Revolution began in which country during the late 18th century?',
          choices: ['France', 'Germany', 'United States', 'Great Britain'],
          correct: 3,
          explanation: 'The Industrial Revolution began in Great Britain in the late 18th century, driven by innovations in textiles, steam power, and iron production.',
        },
        {
          id: 'q5',
          question: 'Which invention by James Watt was crucial to powering the Industrial Revolution?',
          choices: ['The spinning jenny', 'The steam engine', 'The locomotive', 'The power loom'],
          correct: 1,
          explanation: 'James Watt\'s improved steam engine (patented 1769) was a transformative invention that powered factories, mines, and later transportation during the Industrial Revolution.',
        },
      ],
    },
    {
      id: 'wh-5',
      title: 'World War I',
      description: 'The Great War and the collapse of old empires.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'The assassination of which Austro-Hungarian heir triggered the start of World War I?',
          choices: ['Emperor Franz Joseph', 'Archduke Franz Ferdinand', 'Kaiser Wilhelm II', 'Tsar Nicholas II'],
          correct: 1,
          explanation: 'The assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo on June 28, 1914, set off a chain of events that led to the outbreak of World War I.',
        },
        {
          id: 'q2',
          question: 'Which military strategy involved a network of fortified ditches where soldiers lived and fought during WWI?',
          choices: ['Blitzkrieg', 'Trench warfare', 'Guerrilla warfare', 'Siege warfare'],
          correct: 1,
          explanation: 'Trench warfare defined the Western Front of WWI, where opposing armies dug hundreds of miles of trenches, leading to a prolonged and deadly stalemate.',
        },
        {
          id: 'q3',
          question: 'The Treaty of Versailles (1919) placed full blame for WWI on which country?',
          choices: ['Austria-Hungary', 'Ottoman Empire', 'Germany', 'Bulgaria'],
          correct: 2,
          explanation: 'The "War Guilt Clause" (Article 231) of the Treaty of Versailles assigned blame for WWI to Germany, requiring it to pay reparations and reduce its military.',
        },
        {
          id: 'q4',
          question: 'The sinking of which passenger ship in 1915 turned American public opinion against Germany?',
          choices: ['RMS Titanic', 'RMS Lusitania', 'SS Sussex', 'HMHS Britannic'],
          correct: 1,
          explanation: 'The sinking of the RMS Lusitania by a German U-boat on May 7, 1915, killing 1,198 passengers including 128 Americans, significantly inflamed anti-German sentiment in the United States.',
        },
        {
          id: 'q5',
          question: 'Which alliance system included Germany, Austria-Hungary, and the Ottoman Empire during WWI?',
          choices: ['The Triple Entente', 'The Allied Powers', 'The Central Powers', 'The Axis Powers'],
          correct: 2,
          explanation: 'The Central Powers consisted primarily of Germany, Austria-Hungary, the Ottoman Empire, and Bulgaria, opposing the Allied Powers (Triple Entente) in WWI.',
        },
      ],
    },
    {
      id: 'wh-6',
      title: 'Cold War Era',
      description: 'US-Soviet rivalry and the nuclear age.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'The Cold War was primarily a geopolitical tension between which two superpowers?',
          choices: ['USA and China', 'USA and USSR', 'UK and USSR', 'USA and Germany'],
          correct: 1,
          explanation: 'The Cold War (1947–1991) was a period of geopolitical tension between the United States and the Soviet Union (USSR), representing capitalism vs. communism.',
        },
        {
          id: 'q2',
          question: 'The Cuban Missile Crisis of 1962 brought the world closest to nuclear war when the USSR placed missiles in Cuba. Who was the US President at the time?',
          choices: ['Dwight D. Eisenhower', 'Lyndon B. Johnson', 'John F. Kennedy', 'Richard Nixon'],
          correct: 2,
          explanation: 'President John F. Kennedy managed the Cuban Missile Crisis in October 1962, ultimately negotiating a resolution where the USSR removed its missiles from Cuba.',
        },
        {
          id: 'q3',
          question: 'Which speech by Winston Churchill in 1946 coined the term "Iron Curtain"?',
          choices: ['The Sinews of Peace speech', 'The Iron Curtain Address', 'The Fulton Speech', 'Both A and C'],
          correct: 3,
          explanation: 'Churchill\'s "Sinews of Peace" speech, delivered in Fulton, Missouri in 1946, introduced the term "Iron Curtain" to describe the division between Soviet-controlled Eastern Europe and the West.',
        },
        {
          id: 'q4',
          question: 'The Berlin Wall, which divided East and West Berlin, fell in which year?',
          choices: ['1985', '1987', '1989', '1991'],
          correct: 2,
          explanation: 'The Berlin Wall fell on November 9, 1989, a pivotal event marking the end of the Cold War era and leading to German reunification in 1990.',
        },
        {
          id: 'q5',
          question: 'What was the name of the US policy of providing economic and military aid to countries threatened by communism after WWII?',
          choices: ['The Marshall Plan', 'The Truman Doctrine', 'Containment Policy', 'The Eisenhower Doctrine'],
          correct: 1,
          explanation: 'The Truman Doctrine (1947) was President Truman\'s policy of providing political, military, and economic support to countries threatened by Soviet expansion or communist takeover.',
        },
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
  hasPlacement: true,
  placementQuestions: [
    {
      id: 'q1',
      question: 'Which word is a noun in the following sentence: "The dog runs quickly"?',
      choices: ['The', 'dog', 'runs', 'quickly'],
      correct: 1,
      explanation: '"Dog" is a noun — it names a person, place, thing, or idea. "Runs" is a verb, "quickly" is an adverb, and "the" is an article.',
    },
    {
      id: 'q2',
      question: 'Which sentence uses correct subject-verb agreement?',
      choices: [
        'The group of students are studying.',
        'The group of students is studying.',
        'The groups of student is studying.',
        'The group of students were studying.',
      ],
      correct: 1,
      explanation: '"The group" is a singular collective noun, so it takes the singular verb "is." The prepositional phrase "of students" does not change the subject.',
    },
    {
      id: 'q3',
      question: 'What part of speech is the word "beautiful" in "She wore a beautiful dress"?',
      choices: ['Noun', 'Verb', 'Adjective', 'Adverb'],
      correct: 2,
      explanation: '"Beautiful" is an adjective because it modifies (describes) the noun "dress."',
    },
    {
      id: 'q4',
      question: 'Which punctuation mark is used to join two independent clauses?',
      choices: ['Comma', 'Semicolon', 'Colon', 'Hyphen'],
      correct: 1,
      explanation: 'A semicolon can join two closely related independent clauses without a coordinating conjunction, e.g., "I like tea; she prefers coffee."',
    },
    {
      id: 'q5',
      question: 'What literary device is used in the phrase "The wind whispered through the trees"?',
      choices: ['Simile', 'Metaphor', 'Personification', 'Alliteration'],
      correct: 2,
      explanation: 'Personification attributes human qualities (whispering) to a non-human thing (the wind).',
    },
    {
      id: 'q6',
      question: 'What is the primary purpose of a thesis statement in an essay?',
      choices: [
        'To provide background information on the topic',
        'To state the main argument or claim of the essay',
        'To summarize the conclusion',
        'To list the evidence used in the essay',
      ],
      correct: 1,
      explanation: 'A thesis statement presents the central argument or claim of an essay, giving the reader a roadmap for what the essay will argue and prove.',
    },
    {
      id: 'q7',
      question: 'Which of the following is an example of a simile?',
      choices: [
        'The classroom was a zoo.',
        'Her smile was the sun.',
        'He ran like the wind.',
        'The stars danced in the sky.',
      ],
      correct: 2,
      explanation: 'A simile makes a comparison using "like" or "as." "He ran like the wind" compares his running to the wind using "like."',
    },
    {
      id: 'q8',
      question: 'In essay structure, what does a body paragraph typically begin with?',
      choices: ['A hook', 'A topic sentence', 'A transition word', 'A counterargument'],
      correct: 1,
      explanation: 'A body paragraph typically begins with a topic sentence that states the paragraph\'s main idea and connects to the essay\'s thesis.',
    },
    {
      id: 'q9',
      question: 'Which rhetorical appeal relies on credibility and authority of the speaker?',
      choices: ['Pathos', 'Logos', 'Ethos', 'Kairos'],
      correct: 2,
      explanation: 'Ethos is the rhetorical appeal to credibility and character. A speaker establishes ethos by demonstrating expertise, trustworthiness, and moral integrity.',
    },
    {
      id: 'q10',
      question: 'What is the meaning of the word "ubiquitous"?',
      choices: ['Rare and precious', 'Present everywhere at the same time', 'Causing harm', 'Difficult to understand'],
      correct: 1,
      explanation: '"Ubiquitous" means present, appearing, or found everywhere. Example: "Smartphones have become ubiquitous in modern society."',
    },
    {
      id: 'q11',
      question: 'What is the term for the technique of presenting an opposing argument only to refute it?',
      choices: ['Anaphora', 'Counterargument', 'Epithet', 'Synecdoche'],
      correct: 1,
      explanation: 'A counterargument acknowledges an opposing viewpoint and then provides reasoning or evidence to refute it, strengthening the overall argument.',
    },
    {
      id: 'q12',
      question: 'Which word is most nearly opposite in meaning to "verbose"?',
      choices: ['Talkative', 'Concise', 'Eloquent', 'Ambiguous'],
      correct: 1,
      explanation: '"Verbose" means using more words than necessary (wordy). Its antonym is "concise," meaning expressing much in few words.',
    },
  ],
  lessons: [
    {
      id: 'eng-1',
      title: 'Grammar Foundations',
      description: 'Master nouns, verbs, adjectives, and more.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'Which of the following sentences is grammatically correct?',
          choices: [
            'Me and him went to the store.',
            'He and I went to the store.',
            'Him and me went to the store.',
            'I and him went to the store.',
          ],
          correct: 1,
          explanation: 'Subject pronouns "he" and "I" are correct when used as the subject of a sentence. Object pronouns like "me" and "him" are used after verbs or prepositions.',
        },
        {
          id: 'q2',
          question: 'What is the correct plural form of "child"?',
          choices: ['Childs', 'Childes', 'Children', 'Childrens'],
          correct: 2,
          explanation: '"Children" is the irregular plural of "child." It doesn\'t follow the standard rule of adding -s or -es.',
        },
        {
          id: 'q3',
          question: 'Which sentence contains a dangling modifier?',
          choices: [
            'Running quickly, she caught the bus.',
            'Running quickly, the bus was caught.',
            'She was running quickly to catch the bus.',
            'The bus was caught by her while running.',
          ],
          correct: 1,
          explanation: '"Running quickly, the bus was caught" is a dangling modifier because "running" should modify a person, not "the bus." The sentence implies the bus was running.',
        },
        {
          id: 'q4',
          question: 'A word that modifies a verb, adjective, or another adverb is called a(n):',
          choices: ['Adjective', 'Noun', 'Adverb', 'Preposition'],
          correct: 2,
          explanation: 'An adverb modifies verbs (ran quickly), adjectives (very tall), or other adverbs (quite slowly). Many adverbs end in -ly.',
        },
        {
          id: 'q5',
          question: 'Which of the following is an example of a compound sentence?',
          choices: [
            'Because it was raining, we stayed inside.',
            'We stayed inside.',
            'We stayed inside, and we watched a movie.',
            'Staying inside and watching a movie.',
          ],
          correct: 2,
          explanation: 'A compound sentence joins two independent clauses with a coordinating conjunction (FANBOYS). "We stayed inside, and we watched a movie" has two complete thoughts joined by "and."',
        },
      ],
    },
    {
      id: 'eng-2',
      title: 'Reading Comprehension',
      description: 'Main idea, inference, and textual evidence.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'What does "main idea" refer to in a reading passage?',
          choices: [
            'The first sentence of a paragraph',
            'The most important point the author is making',
            'The last sentence of the passage',
            'A specific detail supporting the topic',
          ],
          correct: 1,
          explanation: 'The main idea is the central point or most important concept the author is communicating in a passage. It is broader than supporting details.',
        },
        {
          id: 'q2',
          question: 'When you make an inference while reading, you are:',
          choices: [
            'Copying exact words from the text',
            'Summarizing the passage',
            'Drawing a conclusion based on evidence and reasoning',
            'Finding the definition of unknown words',
          ],
          correct: 2,
          explanation: 'An inference is a logical conclusion drawn from evidence in the text combined with your own knowledge. It goes beyond what is directly stated.',
        },
        {
          id: 'q3',
          question: 'What is the purpose of context clues?',
          choices: [
            'To help determine the meaning of unfamiliar words',
            'To identify the author\'s purpose',
            'To find the main idea of a passage',
            'To recognize figurative language',
          ],
          correct: 0,
          explanation: 'Context clues are words and phrases surrounding an unfamiliar word that help readers determine its meaning without using a dictionary.',
        },
        {
          id: 'q4',
          question: 'Which text structure presents events in the order they occurred?',
          choices: ['Compare and contrast', 'Cause and effect', 'Chronological order', 'Problem and solution'],
          correct: 2,
          explanation: 'Chronological order (sequential order) presents events in the time order in which they happened, often used in narratives and historical accounts.',
        },
        {
          id: 'q5',
          question: 'An author\'s "tone" refers to:',
          choices: [
            'The volume at which the text is read',
            'The attitude or feeling conveyed in the writing',
            'The topic of the passage',
            'The intended audience of the passage',
          ],
          correct: 1,
          explanation: 'Tone is the author\'s attitude toward the subject, conveyed through word choice, details, and style. Tone can be humorous, serious, sad, critical, etc.',
        },
      ],
    },
    {
      id: 'eng-3',
      title: 'Literary Devices',
      description: 'Simile, metaphor, irony, and other literary tools.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'Which literary device involves a reference to a well-known person, event, or work?',
          choices: ['Allusion', 'Illusion', 'Allegory', 'Analogy'],
          correct: 0,
          explanation: 'An allusion is an indirect reference to a person, event, place, or artwork. For example, "He was a real Romeo" alludes to Shakespeare\'s Romeo and Juliet.',
        },
        {
          id: 'q2',
          question: 'What is irony?',
          choices: [
            'The repetition of consonant sounds at the beginning of words',
            'A contradiction between what is expected and what actually occurs',
            'The use of symbols to represent ideas',
            'An exaggeration used for emphasis',
          ],
          correct: 1,
          explanation: 'Irony involves a contrast between appearance and reality, or between what is expected and what happens. Types include verbal, situational, and dramatic irony.',
        },
        {
          id: 'q3',
          question: 'In the sentence "The whole city came out to vote," "the whole city" is an example of:',
          choices: ['Metaphor', 'Hyperbole', 'Synecdoche', 'Oxymoron'],
          correct: 2,
          explanation: 'Synecdoche is a figure of speech where a part represents the whole or the whole represents a part. "The whole city" represents all the people in the city.',
        },
        {
          id: 'q4',
          question: 'What is the term for a story in which characters and events symbolically represent deeper moral or political meanings?',
          choices: ['Parable', 'Allegory', 'Fable', 'Satire'],
          correct: 1,
          explanation: 'An allegory is a narrative in which characters, settings, and events represent abstract ideas or moral qualities, conveying a deeper symbolic meaning beyond the literal story.',
        },
        {
          id: 'q5',
          question: 'Which device repeats the same word or phrase at the beginning of successive clauses?',
          choices: ['Epistrophe', 'Anaphora', 'Chiasmus', 'Asyndeton'],
          correct: 1,
          explanation: 'Anaphora is the repetition of a word or phrase at the beginning of successive clauses. Famous example: Martin Luther King Jr.\'s "I have a dream..." repeated throughout his speech.',
        },
      ],
    },
    {
      id: 'eng-4',
      title: 'Essay Writing',
      description: 'Structure, thesis, and body paragraphs.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What is the primary function of a hook in an essay\'s introduction?',
          choices: [
            'To state the thesis clearly',
            'To grab the reader\'s attention',
            'To provide background information',
            'To list the essay\'s main points',
          ],
          correct: 1,
          explanation: 'A hook is an engaging opening sentence designed to capture the reader\'s interest and encourage them to continue reading. It can be a question, quote, statistic, or anecdote.',
        },
        {
          id: 'q2',
          question: 'What does the acronym PIE stand for in paragraph writing?',
          choices: [
            'Point, Illustrate, Explain',
            'Purpose, Idea, Evidence',
            'Paragraph, Information, Examples',
            'Point, Idea, Evaluate',
          ],
          correct: 0,
          explanation: 'PIE stands for Point (the topic sentence), Illustrate (evidence or example), and Explain (how the evidence supports the point). It helps structure body paragraphs effectively.',
        },
        {
          id: 'q3',
          question: 'In a compare-and-contrast essay, the "block method" means:',
          choices: [
            'Alternating between two subjects paragraph by paragraph',
            'Discussing all aspects of one subject before moving to the other',
            'Using bullet points to list similarities and differences',
            'Starting with differences before similarities',
          ],
          correct: 1,
          explanation: 'The block method discusses all points about Subject A in one section, then all points about Subject B in another section, as opposed to the point-by-point method.',
        },
        {
          id: 'q4',
          question: 'Which transition word signals a contrast between ideas?',
          choices: ['Furthermore', 'However', 'Therefore', 'Similarly'],
          correct: 1,
          explanation: '"However" is a contrast transition that signals the next idea will differ from or contradict the previous one. Other contrast transitions include "but," "although," and "on the other hand."',
        },
        {
          id: 'q5',
          question: 'What should an essay conclusion NOT do?',
          choices: [
            'Restate the thesis in new words',
            'Summarize key points',
            'Introduce entirely new evidence',
            'Provide a sense of closure',
          ],
          correct: 2,
          explanation: 'A conclusion should not introduce new evidence or arguments that weren\'t discussed in the essay. Its purpose is to wrap up and synthesize what has already been presented.',
        },
      ],
    },
    {
      id: 'eng-5',
      title: 'Argumentative Writing',
      description: 'Build and defend a position with evidence.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'What is a logical fallacy?',
          choices: [
            'A strong piece of evidence in an argument',
            'An error in reasoning that weakens an argument',
            'A type of rhetorical appeal',
            'A counterargument to a thesis',
          ],
          correct: 1,
          explanation: 'A logical fallacy is a flaw in reasoning that makes an argument invalid or misleading, even if the conclusion might be true. Examples include ad hominem, straw man, and false dichotomy.',
        },
        {
          id: 'q2',
          question: 'The "ad hominem" fallacy involves:',
          choices: [
            'Attacking the person rather than their argument',
            'Appealing to the majority\'s opinion',
            'Using a weak analogy to support a claim',
            'Presenting a false either/or choice',
          ],
          correct: 0,
          explanation: 'Ad hominem (Latin for "to the person") is a fallacy that attacks the character or personal traits of an opponent rather than addressing the substance of their argument.',
        },
        {
          id: 'q3',
          question: 'Which of the following best describes "logos" as a rhetorical appeal?',
          choices: [
            'Appealing to the audience\'s emotions',
            'Appealing to the author\'s credibility',
            'Appealing to logic and reason through evidence',
            'Appealing to the audience\'s sense of morality',
          ],
          correct: 2,
          explanation: 'Logos is the rhetorical appeal to logic and reason. It relies on facts, statistics, evidence, and logical reasoning to persuade the audience.',
        },
        {
          id: 'q4',
          question: 'When writing an argumentative essay, why is it important to acknowledge counterarguments?',
          choices: [
            'To make the essay longer',
            'To show understanding of the issue and strengthen your own position',
            'To avoid taking a clear stance',
            'To confuse the reader',
          ],
          correct: 1,
          explanation: 'Acknowledging and refuting counterarguments demonstrates critical thinking, shows awareness of opposing views, and strengthens your argument by preemptively addressing objections.',
        },
        {
          id: 'q5',
          question: 'What is the "straw man" fallacy?',
          choices: [
            'Citing an authority figure to support your argument',
            'Misrepresenting someone\'s argument to make it easier to attack',
            'Assuming that two events in sequence are causally related',
            'Appealing to tradition as a reason to continue a practice',
          ],
          correct: 1,
          explanation: 'The straw man fallacy involves distorting or misrepresenting an opponent\'s argument into a weaker version that is easier to defeat, rather than engaging with their actual position.',
        },
      ],
    },
    {
      id: 'eng-6',
      title: 'Advanced Vocabulary',
      description: 'SAT-level words and context clues.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'What does "equivocal" mean?',
          choices: ['Clearly defined', 'Open to more than one interpretation; ambiguous', 'Completely false', 'Extremely important'],
          correct: 1,
          explanation: '"Equivocal" means open to multiple interpretations, often deliberately vague or ambiguous. Example: "His equivocal answer left us unsure of his true intentions."',
        },
        {
          id: 'q2',
          question: 'Which word means "to make something worse or more severe"?',
          choices: ['Alleviate', 'Mitigate', 'Exacerbate', 'Ameliorate'],
          correct: 2,
          explanation: '"Exacerbate" means to make a problem or bad situation worse. The other options — alleviate, mitigate, and ameliorate — all mean to make something better or less severe.',
        },
        {
          id: 'q3',
          question: 'The word "ephemeral" most nearly means:',
          choices: ['Lasting forever', 'Lasting for a very short time', 'Mysterious and unknown', 'Extremely large'],
          correct: 1,
          explanation: '"Ephemeral" means lasting for a very short time; transitory. Example: "The ephemeral beauty of cherry blossoms makes them all the more precious."',
        },
        {
          id: 'q4',
          question: 'What does "loquacious" mean?',
          choices: ['Reserved and quiet', 'Tending to talk a great deal; talkative', 'Logical and persuasive', 'Relating to a location'],
          correct: 1,
          explanation: '"Loquacious" describes someone who talks excessively or is very talkative. It comes from the Latin "loqui," meaning "to speak."',
        },
        {
          id: 'q5',
          question: 'Which word means "having a strong desire for knowledge; inquisitive"?',
          choices: ['Nefarious', 'Perspicacious', 'Inquisitive', 'Querulous'],
          correct: 2,
          explanation: '"Inquisitive" means having an eagerness to know or learn things. "Perspicacious" means having keen insight; "nefarious" means wicked; "querulous" means complaining.',
        },
      ],
    },
  ],
},
{
  id: 'geography',
  label: 'Geography',
  emoji: '🗺️',
  color: 'text-teal-600',
  bg: 'bg-teal-50',
  border: 'border-teal-200',
  hasPlacement: false,
  placementQuestions: [],
  lessons: [
    {
      id: 'geo-1',
      title: 'Continents & Oceans',
      description: 'The seven continents and five oceans.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'How many continents are there on Earth?',
          choices: ['5', '6', '7', '8'],
          correct: 2,
          explanation: 'There are 7 continents: Africa, Antarctica, Asia, Australia (Oceania), Europe, North America, and South America.',
        },
        {
          id: 'q2',
          question: 'Which is the largest ocean on Earth?',
          choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
          correct: 3,
          explanation: 'The Pacific Ocean is the largest and deepest ocean, covering more than 30% of Earth\'s surface — larger than all of Earth\'s landmass combined.',
        },
        {
          id: 'q3',
          question: 'Which continent is the largest by land area?',
          choices: ['Africa', 'North America', 'Asia', 'South America'],
          correct: 2,
          explanation: 'Asia is the largest continent by both area (about 44.6 million km²) and population. It covers roughly 30% of Earth\'s total land area.',
        },
        {
          id: 'q4',
          question: 'Which ocean lies between Europe/Africa and the Americas?',
          choices: ['Pacific Ocean', 'Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean'],
          correct: 2,
          explanation: 'The Atlantic Ocean separates the Americas to the west from Europe and Africa to the east. It is the second-largest ocean on Earth.',
        },
        {
          id: 'q5',
          question: 'Antarctica is unique among continents because:',
          choices: [
            'It has no mountains',
            'It has no permanent human population',
            'It is entirely covered in desert',
            'It is located near the equator',
          ],
          correct: 1,
          explanation: 'Antarctica has no permanent human population. Only temporary research stations operate there. It is the coldest, driest, and windiest continent.',
        },
      ],
    },
    {
      id: 'geo-2',
      title: 'Map Skills & Coordinates',
      description: 'Latitude, longitude, and reading maps.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'Lines of latitude run in which direction on a map?',
          choices: ['North to south', 'East to west (horizontally)', 'Diagonally', 'From the poles to the equator'],
          correct: 1,
          explanation: 'Lines of latitude (parallels) run horizontally (east to west) around the globe and measure distance north or south of the equator.',
        },
        {
          id: 'q2',
          question: 'The Prime Meridian (0° longitude) passes through which city?',
          choices: ['Paris, France', 'London, England (Greenwich)', 'Madrid, Spain', 'Cairo, Egypt'],
          correct: 1,
          explanation: 'The Prime Meridian passes through the Royal Observatory in Greenwich, London. It divides Earth into the Eastern and Western Hemispheres.',
        },
        {
          id: 'q3',
          question: 'What does a map\'s "scale" tell you?',
          choices: [
            'The age of the map',
            'The ratio between distances on the map and actual distances on Earth',
            'The types of terrain shown',
            'The compass direction of the map',
          ],
          correct: 1,
          explanation: 'A map scale shows the relationship between a distance on the map and the corresponding distance in the real world, helping readers calculate actual distances.',
        },
        {
          id: 'q4',
          question: 'A location at 0° latitude and 0° longitude is located:',
          choices: [
            'At the North Pole',
            'In the Gulf of Guinea, off the coast of Africa',
            'In the middle of the Pacific Ocean',
            'In London, England',
          ],
          correct: 1,
          explanation: 'The intersection of 0° latitude (Equator) and 0° longitude (Prime Meridian) is located in the Gulf of Guinea in the Atlantic Ocean, off the coast of Africa.',
        },
        {
          id: 'q5',
          question: 'Which type of map shows variations in elevation and terrain?',
          choices: ['Political map', 'Climate map', 'Topographic map', 'Road map'],
          correct: 2,
          explanation: 'A topographic map uses contour lines to represent elevation and the shape of the land surface, showing mountains, valleys, and other terrain features.',
        },
      ],
    },
    {
      id: 'geo-3',
      title: 'Climate & Biomes',
      description: 'Weather patterns and Earth\'s major biomes.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What is the primary difference between weather and climate?',
          choices: [
            'Weather refers to temperature; climate refers to precipitation',
            'Weather is short-term atmospheric conditions; climate is long-term patterns',
            'Weather occurs in cities; climate occurs in rural areas',
            'There is no difference between weather and climate',
          ],
          correct: 1,
          explanation: 'Weather refers to short-term atmospheric conditions (today\'s rain), while climate describes the average weather patterns of a region over a long period (usually 30+ years).',
        },
        {
          id: 'q2',
          question: 'Which biome receives the least amount of precipitation annually?',
          choices: ['Tropical rainforest', 'Temperate deciduous forest', 'Desert', 'Grassland'],
          correct: 2,
          explanation: 'Deserts receive less than 250 mm (10 inches) of precipitation per year, making them the driest biome. They can be hot (Sahara) or cold (Gobi).',
        },
        {
          id: 'q3',
          question: 'The tropical rainforest biome is characterized by:',
          choices: [
            'Cold temperatures and sparse vegetation',
            'High rainfall, warm temperatures, and high biodiversity',
            'Seasonal droughts and grasslands',
            'Frozen ground and low-growing plants',
          ],
          correct: 1,
          explanation: 'Tropical rainforests have consistently high temperatures (25–30°C), very high annual rainfall (over 2,000 mm), and are home to more than half of the world\'s species.',
        },
        {
          id: 'q4',
          question: 'Which factor most determines the type of biome found in an area?',
          choices: [
            'The country\'s government',
            'Proximity to major cities',
            'Temperature and precipitation patterns',
            'The size of the landmass',
          ],
          correct: 2,
          explanation: 'Temperature and precipitation are the two most important factors determining which biome exists in a region. Together they create the climate conditions that support specific ecosystems.',
        },
        {
          id: 'q5',
          question: 'The tundra biome is characterized by:',
          choices: [
            'Hot, dry conditions and cacti',
            'Frozen subsoil (permafrost), extreme cold, and treeless landscape',
            'Dense forest and high humidity',
            'Grasslands with seasonal wildfires',
          ],
          correct: 1,
          explanation: 'The tundra features permafrost (permanently frozen subsoil), very cold temperatures, low precipitation, and a treeless landscape with mosses, lichens, and low shrubs.',
        },
      ],
    },
    {
      id: 'geo-4',
      title: 'Human Geography',
      description: 'Population, culture, and urbanization.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What is "urbanization"?',
          choices: [
            'The process of people moving from cities to rural areas',
            'The growth of cities as more people move from rural areas to urban areas',
            'The construction of new roads and highways',
            'The spread of agriculture to new areas',
          ],
          correct: 1,
          explanation: 'Urbanization is the process by which an increasing proportion of a population comes to live in cities and towns, often driven by economic opportunities and industrialization.',
        },
        {
          id: 'q2',
          question: 'What is a "push factor" in human migration?',
          choices: [
            'An attractive feature of a destination that draws migrants',
            'A negative condition in a home country that drives people to leave',
            'A government policy encouraging immigration',
            'The distance between origin and destination',
          ],
          correct: 1,
          explanation: 'Push factors are conditions that drive people away from their homeland, such as poverty, conflict, natural disasters, or lack of opportunities. Pull factors attract migrants to new places.',
        },
        {
          id: 'q3',
          question: 'The "population density" of an area refers to:',
          choices: [
            'The total number of people in a country',
            'The birth rate minus the death rate',
            'The number of people per unit of area (e.g., per km²)',
            'The percentage of urban vs. rural population',
          ],
          correct: 2,
          explanation: 'Population density is the number of people living per unit of land area, typically expressed as people per square kilometer or square mile.',
        },
        {
          id: 'q4',
          question: 'Which of the following is an example of cultural diffusion?',
          choices: [
            'A country building a new capital city',
            'The spread of pizza from Italy to countries worldwide',
            'A government changing its official language',
            'A river changing its course over time',
          ],
          correct: 1,
          explanation: 'Cultural diffusion is the spread of cultural elements (ideas, customs, food, music) from one society to another. The global popularity of pizza, originally Italian, is a classic example.',
        },
        {
          id: 'q5',
          question: 'A country\'s GDP (Gross Domestic Product) measures:',
          choices: [
            'The total population of the country',
            'The total value of all goods and services produced within a country in a year',
            'The country\'s military strength',
            'The average education level of the population',
          ],
          correct: 1,
          explanation: 'GDP is the total monetary value of all goods and services produced within a country\'s borders in a specific time period. It is a primary indicator of a country\'s economic size and health.',
        },
      ],
    },
    {
      id: 'geo-5',
      title: 'Geopolitics',
      description: 'How geography shapes politics and power.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'What is a "buffer state" in geopolitics?',
          choices: [
            'A country with a very large military',
            'A neutral or smaller country located between two rival powers',
            'A country that stores strategic resources',
            'A country with no diplomatic relations with others',
          ],
          correct: 1,
          explanation: 'A buffer state is a smaller or neutral country situated between two larger, potentially hostile powers that serves to reduce the likelihood of direct conflict between them. Example: Belgium historically served as a buffer between France and Germany.',
        },
        {
          id: 'q2',
          question: 'The United Nations was founded in which year?',
          choices: ['1919', '1939', '1945', '1950'],
          correct: 2,
          explanation: 'The United Nations was founded on October 24, 1945, after World War II, to promote international cooperation, peace, and security. It replaced the League of Nations.',
        },
        {
          id: 'q3',
          question: 'What is the "heartland theory" in geopolitics?',
          choices: [
            'The idea that coastal nations control global trade',
            'The theory that whoever controls the central Eurasian landmass controls the world',
            'The belief that island nations are most strategically important',
            'The concept that economic power determines political influence',
          ],
          correct: 1,
          explanation: 'The Heartland Theory, proposed by Halford Mackinder in 1904, argued that control of the central Eurasian "heartland" would give a power the strategic advantage to dominate the world.',
        },
        {
          id: 'q4',
          question: 'What does "sovereignty" mean in the context of a nation-state?',
          choices: [
            'The right to vote in elections',
            'The supreme authority of a state to govern itself without external control',
            'The size of a country\'s economy',
            'A country\'s membership in international organizations',
          ],
          correct: 1,
          explanation: 'Sovereignty is the full right and power of a governing body over itself, without any interference from outside sources. It is a fundamental principle of the modern international system.',
        },
        {
          id: 'q5',
          question: 'The Strait of Hormuz is geopolitically significant because:',
          choices: [
            'It connects the Atlantic and Pacific Oceans',
            'It is the world\'s busiest shipping lane for oil from the Persian Gulf',
            'It marks the boundary between Europe and Asia',
            'It is the deepest ocean strait in the world',
          ],
          correct: 1,
          explanation: 'The Strait of Hormuz is a narrow waterway between Iran and Oman. About 20% of the world\'s oil passes through it, making it one of the world\'s most strategically important chokepoints.',
        },
      ],
    },
    {
      id: 'geo-6',
      title: 'Physical Geography',
      description: 'Landforms, plate tectonics, and natural processes.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'What is the theory of plate tectonics?',
          choices: [
            'The theory that continents are fixed in place',
            'The theory that Earth\'s outer shell is divided into moving plates whose interactions shape the landscape',
            'The theory that the Earth\'s core is solid',
            'The theory that volcanoes are caused by underground fires',
          ],
          correct: 1,
          explanation: 'Plate tectonics explains that Earth\'s lithosphere is divided into tectonic plates that move slowly over the asthenosphere, causing earthquakes, volcanic activity, and the formation of mountains.',
        },
        {
          id: 'q2',
          question: 'Which type of plate boundary causes the formation of mountain ranges when two continental plates collide?',
          choices: ['Divergent boundary', 'Convergent boundary', 'Transform boundary', 'Subduction zone'],
          correct: 1,
          explanation: 'Convergent boundaries occur when two plates move toward each other. When two continental plates collide, neither subducts, and the crust crumples upward to form mountain ranges like the Himalayas.',
        },
        {
          id: 'q3',
          question: 'The Himalayas were formed by the collision of which two tectonic plates?',
          choices: [
            'Pacific and North American plates',
            'African and Eurasian plates',
            'Indo-Australian and Eurasian plates',
            'Nazca and South American plates',
          ],
          correct: 2,
          explanation: 'The Himalayas formed from the collision of the Indo-Australian plate and the Eurasian plate, a process that began about 50 million years ago and continues today.',
        },
        {
          id: 'q4',
          question: 'What is "erosion" in physical geography?',
          choices: [
            'The movement of tectonic plates',
            'The process by which rock and soil are worn away and transported by water, wind, or ice',
            'The formation of new landmasses through volcanic activity',
            'The depositing of sediment at river mouths',
          ],
          correct: 1,
          explanation: 'Erosion is the process by which natural forces (water, wind, glaciers, waves) wear away and transport rock and soil. It shapes landforms such as river valleys, canyons, and coastal cliffs.',
        },
        {
          id: 'q5',
          question: 'A "fjord" is a landform created by:',
          choices: [
            'Wind erosion in desert regions',
            'Volcanic activity under the ocean',
            'A glacier carving a deep valley that becomes flooded by the sea',
            'River erosion forming a wide coastal plain',
          ],
          correct: 2,
          explanation: 'A fjord is a long, narrow, deep inlet of the sea between steep cliffs, formed when a glacial valley is flooded by seawater. They are common in Norway, Iceland, and New Zealand.',
        },
      ],
    },
  ],
},
{
  id: 'civics',
  label: 'Civics',
  emoji: '🏛️',
  color: 'text-indigo-600',
  bg: 'bg-indigo-50',
  border: 'border-indigo-200',
  hasPlacement: false,
  placementQuestions: [],
  lessons: [
    {
      id: 'civ-1',
      title: 'The Constitution',
      description: 'Principles and structure of the U.S. Constitution.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'In what year was the U.S. Constitution written?',
          choices: ['1776', '1787', '1791', '1803'],
          correct: 1,
          explanation: 'The Constitution was written in 1787 at the Constitutional Convention in Philadelphia.'
        },
        {
          id: 'q2',
          question: 'How many articles does the original U.S. Constitution contain?',
          choices: ['5', '6', '7', '10'],
          correct: 2,
          explanation: 'The original Constitution contains 7 articles that establish the structure of the federal government.'
        },
        {
          id: 'q3',
          question: 'What is the supreme law of the land in the United States?',
          choices: ['The Declaration of Independence', 'The Bill of Rights', 'The Constitution', 'Federal statutes'],
          correct: 2,
          explanation: 'The Constitution is the supreme law of the land, as stated in Article VI (the Supremacy Clause).'
        },
        {
          id: 'q4',
          question: 'Which principle divides power between the national and state governments?',
          choices: ['Separation of powers', 'Federalism', 'Checks and balances', 'Popular sovereignty'],
          correct: 1,
          explanation: 'Federalism divides governmental power between the national (federal) government and the state governments.'
        },
        {
          id: 'q5',
          question: 'What is the process called when the Constitution is formally changed?',
          choices: ['Revision', 'Referendum', 'Amendment', 'Ratification'],
          correct: 2,
          explanation: 'An amendment is a formal change or addition to the Constitution. The Constitution has been amended 27 times.'
        }
      ]
    },
    {
      id: 'civ-2',
      title: 'Branches of Government',
      description: 'Legislative, executive, and judicial branches.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'Which branch of government makes federal laws?',
          choices: ['Executive', 'Judicial', 'Legislative', 'Administrative'],
          correct: 2,
          explanation: 'The Legislative branch (Congress) is responsible for making federal laws.'
        },
        {
          id: 'q2',
          question: 'How many senators does each state send to the U.S. Senate?',
          choices: ['1', '2', '3', '4'],
          correct: 1,
          explanation: 'Each state is represented by 2 senators in the U.S. Senate, regardless of population.'
        },
        {
          id: 'q3',
          question: 'Which branch of government includes the Supreme Court?',
          choices: ['Executive', 'Legislative', 'Judicial', 'Federal'],
          correct: 2,
          explanation: 'The Judicial branch includes the Supreme Court and all lower federal courts.'
        },
        {
          id: 'q4',
          question: 'What is the primary role of the Executive branch?',
          choices: ['To make laws', 'To interpret laws', 'To enforce laws', 'To repeal laws'],
          correct: 2,
          explanation: 'The Executive branch, led by the President, is responsible for enforcing and implementing laws.'
        },
        {
          id: 'q5',
          question: 'What system prevents any one branch of government from becoming too powerful?',
          choices: ['Federalism', 'Checks and balances', 'Popular sovereignty', 'Judicial review'],
          correct: 1,
          explanation: 'Checks and balances is the system where each branch can limit the powers of the other branches.'
        }
      ]
    },
    {
      id: 'civ-3',
      title: 'Rights & Amendments',
      description: 'The Bill of Rights and key amendments.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What are the first ten amendments to the Constitution collectively called?',
          choices: ['The Civil Rights Acts', 'The Bill of Rights', 'The Federalist Papers', 'The Articles of Confederation'],
          correct: 1,
          explanation: 'The first ten amendments are called the Bill of Rights and protect individual liberties from government infringement.'
        },
        {
          id: 'q2',
          question: 'Which amendment abolished slavery in the United States?',
          choices: ['13th Amendment', '14th Amendment', '15th Amendment', '19th Amendment'],
          correct: 0,
          explanation: 'The 13th Amendment (1865) abolished slavery and involuntary servitude in the United States.'
        },
        {
          id: 'q3',
          question: 'Which amendment gave women the right to vote?',
          choices: ['15th Amendment', '17th Amendment', '19th Amendment', '24th Amendment'],
          correct: 2,
          explanation: 'The 19th Amendment (1920) granted women the right to vote (women\'s suffrage).'
        },
        {
          id: 'q4',
          question: 'The First Amendment protects which of the following freedoms?',
          choices: ['Right to bear arms', 'Freedom of speech and religion', 'Right to a fair trial', 'Protection from unreasonable searches'],
          correct: 1,
          explanation: 'The First Amendment protects freedom of speech, religion, press, assembly, and the right to petition the government.'
        },
        {
          id: 'q5',
          question: 'Which amendment lowered the voting age to 18?',
          choices: ['22nd Amendment', '24th Amendment', '25th Amendment', '26th Amendment'],
          correct: 3,
          explanation: 'The 26th Amendment (1971) lowered the voting age from 21 to 18 years old.'
        }
      ]
    },
    {
      id: 'civ-4',
      title: 'Elections & Voting',
      description: 'How American elections work.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'How often are U.S. Presidential elections held?',
          choices: ['Every 2 years', 'Every 4 years', 'Every 5 years', 'Every 6 years'],
          correct: 1,
          explanation: 'Presidential elections are held every 4 years, in years divisible by 4.'
        },
        {
          id: 'q2',
          question: 'What is the Electoral College?',
          choices: [
            'A group of electors who formally elect the President and Vice President',
            'A college that trains future politicians',
            'The total number of votes cast in an election',
            'A committee that oversees campaign finance'
          ],
          correct: 0,
          explanation: 'The Electoral College is a body of electors established by the Constitution who formally elect the President and Vice President.'
        },
        {
          id: 'q3',
          question: 'How many electoral votes are needed to win the presidency?',
          choices: ['218', '270', '300', '538'],
          correct: 1,
          explanation: 'A candidate needs 270 out of 538 total electoral votes to win the presidency — a majority.'
        },
        {
          id: 'q4',
          question: 'What are primary elections used for?',
          choices: [
            'To elect the President directly',
            'To select party candidates for the general election',
            'To vote on constitutional amendments',
            'To elect members of the Supreme Court'
          ],
          correct: 1,
          explanation: 'Primary elections allow voters within a party to choose their candidate who will run in the general election.'
        },
        {
          id: 'q5',
          question: 'What is gerrymandering?',
          choices: [
            'A method of counting electoral votes',
            'Manipulating district boundaries to favor a political party',
            'A type of campaign finance violation',
            'A process for recounting ballots'
          ],
          correct: 1,
          explanation: 'Gerrymandering is the manipulation of electoral district boundaries to give one political party an advantage over others.'
        }
      ]
    },
    {
      id: 'civ-5',
      title: 'Federal vs State Power',
      description: 'Federalism and the balance of power.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'Which amendment reserves powers not given to the federal government to the states or the people?',
          choices: ['9th Amendment', '10th Amendment', '11th Amendment', '14th Amendment'],
          correct: 1,
          explanation: 'The 10th Amendment states that powers not delegated to the federal government are reserved to the states or the people.'
        },
        {
          id: 'q2',
          question: 'What are "concurrent powers" in U.S. government?',
          choices: [
            'Powers held exclusively by the federal government',
            'Powers held exclusively by state governments',
            'Powers shared by both federal and state governments',
            'Powers held by the judicial branch'
          ],
          correct: 2,
          explanation: 'Concurrent powers are those shared by both federal and state governments, such as taxing, borrowing money, and establishing courts.'
        },
        {
          id: 'q3',
          question: 'Which clause of the Constitution gives Congress broad implied powers?',
          choices: ['Commerce Clause', 'Supremacy Clause', 'Necessary and Proper Clause', 'Equal Protection Clause'],
          correct: 2,
          explanation: 'The Necessary and Proper Clause (Article I, Section 8) allows Congress to make laws needed to carry out its enumerated powers.'
        },
        {
          id: 'q4',
          question: 'According to the Supremacy Clause, what happens when federal and state laws conflict?',
          choices: [
            'State law prevails',
            'Federal law prevails',
            'The Supreme Court decides case by case',
            'Both laws apply simultaneously'
          ],
          correct: 1,
          explanation: 'Under the Supremacy Clause, federal law is the supreme law of the land and takes precedence over conflicting state laws.'
        },
        {
          id: 'q5',
          question: 'What is the term for federal funds given to states with conditions attached?',
          choices: ['Block grants', 'Categorical grants', 'Revenue sharing', 'Mandates'],
          correct: 1,
          explanation: 'Categorical grants are federal funds given to states for specific purposes with conditions and restrictions attached.'
        }
      ]
    },
    {
      id: 'civ-6',
      title: 'International Relations',
      description: 'Foreign policy, treaties, and global organizations.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'Which branch of the U.S. government has the power to ratify treaties?',
          choices: ['The House of Representatives', 'The Senate', 'The President alone', 'The Supreme Court'],
          correct: 1,
          explanation: 'The Senate must approve (ratify) treaties with a two-thirds majority vote.'
        },
        {
          id: 'q2',
          question: 'What is the primary purpose of the United Nations?',
          choices: [
            'To govern all member nations',
            'To promote international peace, security, and cooperation',
            'To create a single world currency',
            'To enforce international trade agreements'
          ],
          correct: 1,
          explanation: 'The United Nations was founded in 1945 to maintain international peace and security and promote cooperation among nations.'
        },
        {
          id: 'q3',
          question: 'What is diplomacy?',
          choices: [
            'The use of military force to resolve conflicts',
            'The management of international relations through negotiation',
            'Economic sanctions imposed on foreign nations',
            'A type of international law enforcement'
          ],
          correct: 1,
          explanation: 'Diplomacy is the practice of managing international relations and negotiations between countries without resorting to force.'
        },
        {
          id: 'q4',
          question: 'What does NATO stand for?',
          choices: [
            'National Association of Treaty Organizations',
            'North Atlantic Trade Organization',
            'North Atlantic Treaty Organization',
            'National Allied Treaty Operations'
          ],
          correct: 2,
          explanation: 'NATO stands for North Atlantic Treaty Organization, a military alliance formed in 1949 for collective defense.'
        },
        {
          id: 'q5',
          question: 'What is foreign policy?',
          choices: [
            'Laws governing immigration within a country',
            'A government\'s strategy for dealing with other nations',
            'International economic regulations',
            'Rules for foreign nationals living in the U.S.'
          ],
          correct: 1,
          explanation: 'Foreign policy is a government\'s strategy in dealing with other nations, covering diplomacy, trade, and national security.'
        }
      ]
    }
  ]
},
{
  id: 'economics',
  label: 'Economics',
  emoji: '📈',
  color: 'text-green-700',
  bg: 'bg-green-50',
  border: 'border-green-200',
  hasPlacement: false,
  placementQuestions: [],
  lessons: [
    {
      id: 'eco-1',
      title: 'Supply & Demand',
      description: 'How prices are set in a market.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'What happens to the price of a good when demand increases but supply stays the same?',
          choices: ['Price falls', 'Price stays the same', 'Price rises', 'Supply automatically increases'],
          correct: 2,
          explanation: 'When demand increases and supply is constant, competition among buyers drives the price up.'
        },
        {
          id: 'q2',
          question: 'What is the "law of demand"?',
          choices: [
            'As price rises, quantity demanded rises',
            'As price falls, quantity demanded falls',
            'As price rises, quantity demanded falls',
            'Demand is always equal to supply'
          ],
          correct: 2,
          explanation: 'The law of demand states that as the price of a good rises, the quantity demanded falls, all else being equal.'
        },
        {
          id: 'q3',
          question: 'What is equilibrium price?',
          choices: [
            'The lowest price a seller will accept',
            'The price at which quantity supplied equals quantity demanded',
            'The government-set maximum price',
            'The average price across all markets'
          ],
          correct: 1,
          explanation: 'Equilibrium price is where the supply and demand curves intersect — the quantity supplied equals the quantity demanded.'
        },
        {
          id: 'q4',
          question: 'Which of the following would cause a decrease in supply?',
          choices: [
            'Lower production costs',
            'New technology improving production',
            'Higher input costs (e.g., raw materials)',
            'An increase in the number of producers'
          ],
          correct: 2,
          explanation: 'Higher input costs make production more expensive, reducing the amount suppliers are willing to offer at each price.'
        },
        {
          id: 'q5',
          question: 'What is a substitute good?',
          choices: [
            'A good used together with another good',
            'A good that can replace another good in consumption',
            'A government-subsidized product',
            'A good with no close alternatives'
          ],
          correct: 1,
          explanation: 'A substitute good is one that can be used in place of another. If the price of one rises, demand for its substitute increases.'
        }
      ]
    },
    {
      id: 'eco-2',
      title: 'Types of Markets',
      description: 'Competition, monopoly, and market structures.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'In a perfectly competitive market, what is true about individual sellers?',
          choices: [
            'They can set any price they want',
            'They are price makers',
            'They are price takers who accept the market price',
            'They control a large share of the market'
          ],
          correct: 2,
          explanation: 'In perfect competition, many sellers offer identical products, so each seller must accept the market price (price taker).'
        },
        {
          id: 'q2',
          question: 'What is a monopoly?',
          choices: [
            'A market with two dominant sellers',
            'A market with a single seller who controls the entire market',
            'A market with many competing sellers',
            'A government-regulated pricing system'
          ],
          correct: 1,
          explanation: 'A monopoly exists when a single seller controls the supply of a product with no close substitutes, giving them significant pricing power.'
        },
        {
          id: 'q3',
          question: 'What is an oligopoly?',
          choices: [
            'A market dominated by a few large firms',
            'A market with one seller',
            'A market with hundreds of small sellers',
            'A government-owned industry'
          ],
          correct: 0,
          explanation: 'An oligopoly is a market structure dominated by a small number of large firms, such as the smartphone or airline industry.'
        },
        {
          id: 'q4',
          question: 'Which market structure is characterized by many sellers offering slightly different products?',
          choices: ['Perfect competition', 'Monopoly', 'Oligopoly', 'Monopolistic competition'],
          correct: 3,
          explanation: 'Monopolistic competition has many sellers with differentiated (slightly different) products, like restaurants or clothing brands.'
        },
        {
          id: 'q5',
          question: 'What is a price ceiling?',
          choices: [
            'The minimum price allowed by law',
            'The maximum price allowed by law',
            'The average market price',
            'The price set by a monopolist'
          ],
          correct: 1,
          explanation: 'A price ceiling is a government-imposed maximum price for a good or service, set below equilibrium to keep prices affordable.'
        }
      ]
    },
    {
      id: 'eco-3',
      title: 'GDP & Economic Indicators',
      description: 'Measuring the health of an economy.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What does GDP stand for?',
          choices: ['General Development Product', 'Gross Domestic Product', 'Government Deficit Payment', 'Gross Dollar Production'],
          correct: 1,
          explanation: 'GDP stands for Gross Domestic Product — the total monetary value of all goods and services produced in a country in a given period.'
        },
        {
          id: 'q2',
          question: 'What does the unemployment rate measure?',
          choices: [
            'The percentage of all adults without jobs',
            'The percentage of the labor force actively seeking but unable to find work',
            'The number of people who retired early',
            'The total number of job openings available'
          ],
          correct: 1,
          explanation: 'The unemployment rate measures the percentage of people in the labor force who are actively looking for work but cannot find it.'
        },
        {
          id: 'q3',
          question: 'What is inflation?',
          choices: [
            'A decrease in the general price level',
            'An increase in the purchasing power of money',
            'A sustained increase in the general price level of goods and services',
            'A reduction in government spending'
          ],
          correct: 2,
          explanation: 'Inflation is a sustained increase in the average price level, meaning the purchasing power of money decreases over time.'
        },
        {
          id: 'q4',
          question: 'What is a recession?',
          choices: [
            'Two or more consecutive quarters of negative GDP growth',
            'A period of rapid economic expansion',
            'A sudden stock market crash',
            'A government budget surplus'
          ],
          correct: 0,
          explanation: 'A recession is commonly defined as two or more consecutive quarters of negative GDP growth, signaling economic contraction.'
        },
        {
          id: 'q5',
          question: 'Which organization is primarily responsible for measuring U.S. economic statistics including GDP?',
          choices: ['The Federal Reserve', 'The Bureau of Economic Analysis (BEA)', 'The Treasury Department', 'The Congressional Budget Office'],
          correct: 1,
          explanation: 'The Bureau of Economic Analysis (BEA) is the U.S. government agency that produces GDP and other national economic statistics.'
        }
      ]
    },
    {
      id: 'eco-4',
      title: 'Personal Finance',
      description: 'Budgeting, saving, credit, and investing.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What is compound interest?',
          choices: [
            'Interest earned only on the original principal',
            'Interest earned on both the principal and accumulated interest',
            'A fixed interest rate that never changes',
            'Interest charged by the government on taxes'
          ],
          correct: 1,
          explanation: 'Compound interest is interest earned on both the initial principal and the interest that has already been earned, causing savings to grow faster over time.'
        },
        {
          id: 'q2',
          question: 'What is a budget?',
          choices: [
            'A loan from a bank',
            'A plan for managing income and expenses',
            'A type of investment account',
            'A government tax form'
          ],
          correct: 1,
          explanation: 'A budget is a financial plan that tracks income and expenses, helping individuals or organizations allocate resources effectively.'
        },
        {
          id: 'q3',
          question: 'What does a credit score measure?',
          choices: [
            'Your total income and assets',
            'Your creditworthiness and likelihood to repay debts',
            'The amount of money in your bank account',
            'The number of credit cards you own'
          ],
          correct: 1,
          explanation: 'A credit score is a numerical rating (typically 300–850) that measures your creditworthiness based on your borrowing and repayment history.'
        },
        {
          id: 'q4',
          question: 'What is diversification in investing?',
          choices: [
            'Putting all savings into one high-performing stock',
            'Spreading investments across different assets to reduce risk',
            'Only investing in government bonds',
            'Withdrawing money frequently from investments'
          ],
          correct: 1,
          explanation: 'Diversification means spreading investments across various asset types so that poor performance in one area does not devastate the whole portfolio.'
        },
        {
          id: 'q5',
          question: 'What is an emergency fund?',
          choices: [
            'Money set aside for retirement',
            'A savings reserve for unexpected expenses or financial hardship',
            'A government assistance program',
            'A type of insurance policy'
          ],
          correct: 1,
          explanation: 'An emergency fund is savings set aside to cover unexpected costs like medical bills or job loss, typically covering 3–6 months of expenses.'
        }
      ]
    },
    {
      id: 'eco-5',
      title: 'Fiscal & Monetary Policy',
      description: 'How governments and central banks manage the economy.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'What is fiscal policy?',
          choices: [
            'The Federal Reserve\'s management of the money supply',
            'Government decisions about taxation and spending',
            'International trade agreements',
            'Regulations on the banking industry'
          ],
          correct: 1,
          explanation: 'Fiscal policy refers to government decisions on taxation and spending, used to influence the economy.'
        },
        {
          id: 'q2',
          question: 'Which institution conducts monetary policy in the United States?',
          choices: ['The Treasury Department', 'Congress', 'The Federal Reserve', 'The World Bank'],
          correct: 2,
          explanation: 'The Federal Reserve (the Fed) controls U.S. monetary policy by managing the money supply and setting interest rates.'
        },
        {
          id: 'q3',
          question: 'When the Federal Reserve raises interest rates, what is the typical effect on the economy?',
          choices: [
            'Borrowing becomes cheaper, stimulating spending',
            'Borrowing becomes more expensive, slowing spending and inflation',
            'The government collects more taxes',
            'Unemployment immediately falls'
          ],
          correct: 1,
          explanation: 'Higher interest rates increase borrowing costs, which reduces consumer spending and business investment, helping to slow inflation.'
        },
        {
          id: 'q4',
          question: 'What is a budget deficit?',
          choices: [
            'When government revenue exceeds spending',
            'When government spending exceeds revenue in a given period',
            'The total amount of government debt',
            'A reduction in the money supply'
          ],
          correct: 1,
          explanation: 'A budget deficit occurs when a government spends more money than it collects in revenue during a specific period.'
        },
        {
          id: 'q5',
          question: 'What is expansionary fiscal policy?',
          choices: [
            'Increasing taxes and reducing government spending during a boom',
            'Increasing government spending or cutting taxes to stimulate the economy',
            'Raising interest rates to reduce inflation',
            'Reducing the money supply to slow economic growth'
          ],
          correct: 1,
          explanation: 'Expansionary fiscal policy involves increasing government spending or cutting taxes to stimulate economic growth, typically during a recession.'
        }
      ]
    },
    {
      id: 'eco-6',
      title: 'Global Trade',
      description: 'Imports, exports, and international economics.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'What is comparative advantage?',
          choices: [
            'Producing more of everything than other countries',
            'The ability to produce a good at a lower opportunity cost than others',
            'Having the most advanced technology in manufacturing',
            'Exporting more than you import'
          ],
          correct: 1,
          explanation: 'Comparative advantage means a country can produce a good at a lower opportunity cost than others, forming the basis for beneficial international trade.'
        },
        {
          id: 'q2',
          question: 'What is a tariff?',
          choices: [
            'A government subsidy for domestic producers',
            'A tax imposed on imported goods',
            'A limit on the quantity of goods that can be imported',
            'An international trade agreement'
          ],
          correct: 1,
          explanation: 'A tariff is a tax on imported goods, which makes foreign products more expensive and protects domestic industries from foreign competition.'
        },
        {
          id: 'q3',
          question: 'What is a trade deficit?',
          choices: [
            'When a country exports more than it imports',
            'When a country imports more than it exports',
            'A penalty for violating trade agreements',
            'A surplus of foreign currency reserves'
          ],
          correct: 1,
          explanation: 'A trade deficit occurs when the value of a country\'s imports exceeds the value of its exports.'
        },
        {
          id: 'q4',
          question: 'What is the World Trade Organization (WTO)?',
          choices: [
            'A bank that finances international development projects',
            'An organization that manages global monetary policy',
            'An international body that regulates and promotes free trade between nations',
            'A group that sets global currency exchange rates'
          ],
          correct: 2,
          explanation: 'The WTO is an international organization that deals with the rules of trade between nations, aiming to promote free and fair trade.'
        },
        {
          id: 'q5',
          question: 'What does "free trade" mean?',
          choices: [
            'Trade that costs nothing to participate in',
            'Trade between countries without government-imposed restrictions like tariffs or quotas',
            'Trade exclusively between allied nations',
            'Trade subsidized by the government'
          ],
          correct: 1,
          explanation: 'Free trade refers to trade between countries that is not restricted by tariffs, quotas, or other government-imposed barriers.'
        }
      ]
    }
  ]
},
{
  id: 'career',
  label: 'Career Connections',
  emoji: '💼',
  color: 'text-cyan-700',
  bg: 'bg-cyan-50',
  border: 'border-cyan-200',
  hasPlacement: false,
  placementQuestions: [],
  lessons: [
    {
      id: 'car-1',
      title: 'Career Exploration',
      description: 'Discovering career paths and interests.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'What is a career cluster?',
          choices: [
            'A group of coworkers in the same department',
            'A group of careers that share similar knowledge and skills',
            'A list of the highest-paying jobs',
            'A type of college major'
          ],
          correct: 1,
          explanation: 'Career clusters group similar occupations and industries together, helping students explore careers that match their interests.'
        },
        {
          id: 'q2',
          question: 'What is a career interest inventory?',
          choices: [
            'A list of all available jobs in your area',
            'A tool that helps match personal interests to potential careers',
            'A record of your work history',
            'A financial report of different career salaries'
          ],
          correct: 1,
          explanation: 'A career interest inventory (like Holland Codes) is an assessment that matches your interests and strengths to suitable career paths.'
        },
        {
          id: 'q3',
          question: 'What is an informational interview?',
          choices: [
            'A formal job interview with an employer',
            'A conversation with someone in a field you\'re interested in to learn about their career',
            'An interview conducted by a journalist',
            'A test of your knowledge before starting a new job'
          ],
          correct: 1,
          explanation: 'An informational interview is a meeting with a professional in your field of interest to gain insight about their career, not to apply for a job.'
        },
        {
          id: 'q4',
          question: 'What does "job shadowing" mean?',
          choices: [
            'Working a night shift',
            'Following a professional to observe their daily work activities',
            'Secretly monitoring a coworker',
            'Applying for multiple jobs at once'
          ],
          correct: 1,
          explanation: 'Job shadowing involves spending time with a professional observing their work to gain firsthand insight into a particular career.'
        },
        {
          id: 'q5',
          question: 'What is the difference between a job and a career?',
          choices: [
            'A job pays more than a career',
            'A career requires no education while a job does',
            'A job is short-term work for pay; a career is a long-term professional path with growth',
            'There is no difference between the two'
          ],
          correct: 2,
          explanation: 'A job is typically short-term employment for immediate income, while a career is a long-term professional path with advancement and skill development.'
        }
      ]
    },
    {
      id: 'car-2',
      title: 'Resume & Applications',
      description: 'Writing a resume and applying for jobs.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'What is the purpose of a resume?',
          choices: [
            'To provide references from friends and family',
            'To summarize your education, skills, and experience for a potential employer',
            'To explain why you left your last job',
            'To list your hobbies and personal interests'
          ],
          correct: 1,
          explanation: 'A resume is a document that summarizes your education, work experience, skills, and achievements to present to potential employers.'
        },
        {
          id: 'q2',
          question: 'What should a cover letter include?',
          choices: [
            'Your salary history and references',
            'Your personal social media accounts',
            'A personalized introduction explaining why you want the job and what you offer',
            'A complete list of all your previous jobs'
          ],
          correct: 2,
          explanation: 'A cover letter introduces you to an employer, explains your interest in the position, and highlights how your skills match the job requirements.'
        },
        {
          id: 'q3',
          question: 'What is an ATS (Applicant Tracking System)?',
          choices: [
            'A software tool used by employers to filter and rank job applications',
            'A government database of available jobs',
            'A type of job skills test',
            'An automated phone screening system'
          ],
          correct: 0,
          explanation: 'An ATS is software used by employers to manage applications and filter candidates based on keywords and qualifications before human review.'
        },
        {
          id: 'q4',
          question: 'What are "action verbs" used for in a resume?',
          choices: [
            'To describe your personal character traits',
            'To make descriptions of your accomplishments strong and specific',
            'To list the companies you have applied to',
            'To explain gaps in employment'
          ],
          correct: 1,
          explanation: 'Action verbs (e.g., led, designed, managed, achieved) make resume bullet points more impactful by clearly describing your contributions.'
        },
        {
          id: 'q5',
          question: 'How long should a resume typically be for someone with little work experience?',
          choices: ['Half a page', 'One page', 'Two pages', 'Three or more pages'],
          correct: 1,
          explanation: 'For students and those with limited experience, a one-page resume is standard and most effective.'
        }
      ]
    },
    {
      id: 'car-3',
      title: 'Workplace Skills',
      description: 'Communication, teamwork, and professionalism.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What are "soft skills"?',
          choices: [
            'Technical abilities specific to a job (like coding or accounting)',
            'Interpersonal and communication skills that affect how you work with others',
            'Physical abilities required for manual labor',
            'Skills learned only through formal education'
          ],
          correct: 1,
          explanation: 'Soft skills are interpersonal qualities like communication, teamwork, adaptability, and problem-solving that apply across all workplaces.'
        },
        {
          id: 'q2',
          question: 'What is professional etiquette?',
          choices: [
            'Advanced technical certification',
            'Appropriate behavior and conduct in a workplace setting',
            'Dress code requirements set by a company',
            'Rules for conducting business internationally'
          ],
          correct: 1,
          explanation: 'Professional etiquette refers to the expected standards of behavior in the workplace, including punctuality, communication, and respect.'
        },
        {
          id: 'q3',
          question: 'What does "networking" mean in a professional context?',
          choices: [
            'Setting up computer systems at work',
            'Building and maintaining professional relationships that can support career growth',
            'Sharing company data with other businesses',
            'Joining a labor union'
          ],
          correct: 1,
          explanation: 'Professional networking involves building relationships with others in your industry to share opportunities, advice, and career support.'
        },
        {
          id: 'q4',
          question: 'What is constructive feedback?',
          choices: [
            'Praise that avoids mentioning any problems',
            'Criticism designed to help someone improve their performance',
            'Feedback given only during annual reviews',
            'Comments written in a formal HR report'
          ],
          correct: 1,
          explanation: 'Constructive feedback is specific, actionable criticism aimed at helping someone improve, not simply pointing out faults.'
        },
        {
          id: 'q5',
          question: 'Why is time management important in the workplace?',
          choices: [
            'It allows you to work fewer hours',
            'It helps you meet deadlines, reduce stress, and increase productivity',
            'It guarantees faster promotions',
            'It replaces the need for communication with coworkers'
          ],
          correct: 1,
          explanation: 'Effective time management helps employees prioritize tasks, meet deadlines, and maintain a productive and less stressful work environment.'
        }
      ]
    },
    {
      id: 'car-4',
      title: 'Financial Literacy',
      description: 'Understanding money, taxes, and banking.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What is the difference between gross pay and net pay?',
          choices: [
            'Gross pay is after taxes; net pay is before taxes',
            'Gross pay is total earnings before deductions; net pay is take-home pay after deductions',
            'They are the same amount',
            'Net pay includes overtime; gross pay does not'
          ],
          correct: 1,
          explanation: 'Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what remains after taxes and other deductions are taken out.'
        },
        {
          id: 'q2',
          question: 'What is a W-4 form used for?',
          choices: [
            'To report investment income to the IRS',
            'To tell your employer how much federal income tax to withhold from your paycheck',
            'To apply for Social Security benefits',
            'To file your annual tax return'
          ],
          correct: 1,
          explanation: 'A W-4 form is completed by employees to tell their employer how much federal income tax to withhold from each paycheck.'
        },
        {
          id: 'q3',
          question: 'What is FICA on a pay stub?',
          choices: [
            'Federal Income Credit Amount',
            'Federal Insurance Contributions Act — deductions for Social Security and Medicare',
            'Financial Investment Company Account',
            'A voluntary retirement contribution'
          ],
          correct: 1,
          explanation: 'FICA stands for Federal Insurance Contributions Act. It consists of Social Security and Medicare taxes withheld from your paycheck.'
        },
        {
          id: 'q4',
          question: 'What is a 401(k)?',
          choices: [
            'A type of health insurance plan',
            'A tax-advantaged retirement savings plan offered by employers',
            'A government student loan program',
            'A form of unemployment insurance'
          ],
          correct: 1,
          explanation: 'A 401(k) is an employer-sponsored retirement savings plan that allows employees to contribute pre-tax earnings, with many employers matching contributions.'
        },
        {
          id: 'q5',
          question: 'What is the purpose of a tax deduction?',
          choices: [
            'To increase the amount of taxes you owe',
            'To reduce your taxable income, thereby lowering the amount of tax owed',
            'To defer taxes until retirement',
            'To receive a refund automatically'
          ],
          correct: 1,
          explanation: 'A tax deduction reduces your taxable income, which in turn lowers the total amount of income tax you owe to the government.'
        }
      ]
    },
    {
      id: 'car-5',
      title: 'Entrepreneurship',
      description: 'Starting and running a business.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'What is an entrepreneur?',
          choices: [
            'A person who manages a large corporation',
            'Someone who starts and runs their own business, taking on financial risk',
            'A government official who oversees businesses',
            'A person who invests in the stock market'
          ],
          correct: 1,
          explanation: 'An entrepreneur is someone who identifies a business opportunity, starts a new venture, and accepts the financial risks in pursuit of profit.'
        },
        {
          id: 'q2',
          question: 'What is a business plan?',
          choices: [
            'A record of a company\'s past financial transactions',
            'A written document outlining a business\'s goals, strategies, and financial projections',
            'A legal contract between business partners',
            'A list of all employees and their roles'
          ],
          correct: 1,
          explanation: 'A business plan is a formal document that describes a business\'s goals, strategies, target market, and financial projections to guide the venture.'
        },
        {
          id: 'q3',
          question: 'What is "startup capital"?',
          choices: [
            'Profits earned in the first year of a business',
            'The initial money needed to start a business',
            'A government grant for small businesses',
            'Revenue from the first customers'
          ],
          correct: 1,
          explanation: 'Startup capital is the initial funding required to launch a new business, covering costs like equipment, inventory, and operating expenses.'
        },
        {
          id: 'q4',
          question: 'What does ROI stand for in business?',
          choices: ['Risk of Investment', 'Return on Investment', 'Rate of Inflation', 'Revenue Over Income'],
          correct: 1,
          explanation: 'ROI stands for Return on Investment — a measure of the profitability of an investment relative to its cost.'
        },
        {
          id: 'q5',
          question: 'What is a target market?',
          choices: [
            'The geographic location where a business sells products',
            'The specific group of consumers a business aims its products and marketing toward',
            'The annual sales goal of a company',
            'A store that sells discounted merchandise'
          ],
          correct: 1,
          explanation: 'A target market is the defined group of consumers who are most likely to buy a product or service, identified by demographics, interests, and needs.'
        }
      ]
    }
  ]
},
{
  id: 'spanish',
  label: 'Spanish',
  emoji: '🇪🇸',
  color: 'text-red-600',
  bg: 'bg-red-50',
  border: 'border-red-200',
  hasPlacement: true,
  placementQuestions: [
    {
      id: 'pq1',
      question: 'How do you say "Hello" in Spanish?',
      choices: ['Bonjour', 'Hola', 'Ciao', 'Hallo'],
      correct: 1,
      explanation: '"Hola" is the standard greeting meaning "Hello" in Spanish.',
    },
    {
      id: 'pq2',
      question: 'What is the Spanish word for "thank you"?',
      choices: ['Por favor', 'De nada', 'Gracias', 'Perdón'],
      correct: 2,
      explanation: '"Gracias" means "thank you" in Spanish.',
    },
    {
      id: 'pq3',
      question: 'What does "rojo" mean in English?',
      choices: ['Blue', 'Green', 'Yellow', 'Red'],
      correct: 3,
      explanation: '"Rojo" means "red" in Spanish.',
    },
    {
      id: 'pq4',
      question: 'Which number is "quince" in Spanish?',
      choices: ['5', '10', '15', '50'],
      correct: 2,
      explanation: '"Quince" means fifteen (15) in Spanish.',
    },
    {
      id: 'pq5',
      question: 'What is the difference between "ser" and "estar" in Spanish?',
      choices: [
        'They are completely interchangeable',
        '"Ser" is for permanent states; "estar" is for temporary states or locations',
        '"Ser" is for locations; "estar" is for emotions',
        '"Ser" is informal; "estar" is formal'
      ],
      correct: 1,
      explanation: '"Ser" is used for permanent characteristics (identity, nationality), while "estar" is for temporary states, emotions, and locations.',
    },
    {
      id: 'pq6',
      question: 'How do you conjugate "hablar" (to speak) for "yo" (I) in the present tense?',
      choices: ['hablo', 'hablas', 'habla', 'hablan'],
      correct: 0,
      explanation: 'For -ar verbs like "hablar," the yo form in the present tense ends in -o: "yo hablo" (I speak).',
    },
    {
      id: 'pq7',
      question: 'Which pronoun is the formal "you" in Spanish?',
      choices: ['tú', 'él', 'usted', 'vos'],
      correct: 2,
      explanation: '"Usted" (abbreviated Ud.) is the formal "you" in Spanish, used in respectful or professional contexts.',
    },
    {
      id: 'pq8',
      question: 'In Spanish, what tense is used to describe completed past actions at a specific time?',
      choices: ['Imperfect (imperfecto)', 'Preterite (pretérito)', 'Future (futuro)', 'Conditional (condicional)'],
      correct: 1,
      explanation: 'The preterite tense (pretérito indefinido) describes specific completed past actions with a defined beginning and end.',
    },
    {
      id: 'pq9',
      question: 'What is the preterite form of "ir" (to go) for "él/ella"?',
      choices: ['iba', 'fue', 'va', 'irá'],
      correct: 1,
      explanation: '"Fue" is the preterite form of both "ir" (to go) and "ser" (to be) for él/ella — context determines meaning.',
    },
    {
      id: 'pq10',
      question: 'When is the subjunctive mood typically used in Spanish?',
      choices: [
        'To describe completed past actions',
        'To express doubt, emotion, desire, or hypothetical situations',
        'To ask direct questions',
        'To give commands only'
      ],
      correct: 1,
      explanation: 'The subjunctive (subjuntivo) is used after expressions of doubt, emotion, desire, or in hypothetical clauses, often triggered by "que."',
    },
    {
      id: 'pq11',
      question: 'Which sentence uses the subjunctive correctly?',
      choices: [
        'Quiero que ella viene.',
        'Quiero que ella venga.',
        'Quiero que ella vendrá.',
        'Quiero que ella vino.'
      ],
      correct: 1,
      explanation: 'After "quiero que" (I want that), the subjunctive is required: "venga" is the present subjunctive of "venir" (to come).',
    },
    {
      id: 'pq12',
      question: 'What does "ojalá" express in Spanish?',
      choices: [
        'A definite future event',
        'A strong hope or wish (often triggers subjunctive)',
        'A completed past action',
        'A polite refusal'
      ],
      correct: 1,
      explanation: '"Ojalá" expresses a strong hope or wish and is derived from Arabic. It always triggers the subjunctive mood.',
    }
  ],
  lessons: [
    {
      id: 'sp-1',
      title: 'Greetings & Basics',
      description: 'Essential phrases to start communicating.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'How do you say "Good morning" in Spanish?',
          choices: ['Buenas noches', 'Buenas tardes', 'Buenos días', 'Buen provecho'],
          correct: 2,
          explanation: '"Buenos días" means "Good morning" in Spanish. "Buenas tardes" is good afternoon and "Buenas noches" is good evening/night.'
        },
        {
          id: 'q2',
          question: 'How do you ask "What is your name?" formally in Spanish?',
          choices: ['¿Cómo te llamas?', '¿Cómo se llama usted?', '¿Quién eres?', '¿Cuál es tu nombre?'],
          correct: 1,
          explanation: '"¿Cómo se llama usted?" is the formal way to ask someone\'s name. "¿Cómo te llamas?" is the informal version.'
        },
        {
          id: 'q3',
          question: 'What does "¿Cómo estás?" mean?',
          choices: ['What is your name?', 'Where are you from?', 'How are you?', 'How old are you?'],
          correct: 2,
          explanation: '"¿Cómo estás?" means "How are you?" (informal). The formal version is "¿Cómo está usted?"'
        },
        {
          id: 'q4',
          question: 'What does "Por favor" mean?',
          choices: ['Thank you', 'Please', 'Excuse me', 'You\'re welcome'],
          correct: 1,
          explanation: '"Por favor" means "please" in Spanish. It is used when making requests.'
        },
        {
          id: 'q5',
          question: 'How do you say "Goodbye" in Spanish?',
          choices: ['Hasta luego', 'Hola', 'Buenas', 'Perdón'],
          correct: 0,
          explanation: '"Hasta luego" means "Goodbye" or "See you later" in Spanish. "Adiós" is another common farewell.'
        }
      ]
    },
    {
      id: 'sp-2',
      title: 'Numbers & Colors',
      description: 'Count and describe the world around you.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'What is the Spanish word for the number 7?',
          choices: ['seis', 'ocho', 'siete', 'nueve'],
          correct: 2,
          explanation: '"Siete" is the Spanish word for 7. The numbers 6–10 are: seis, siete, ocho, nueve, diez.'
        },
        {
          id: 'q2',
          question: 'How do you say "blue" in Spanish?',
          choices: ['verde', 'azul', 'amarillo', 'negro'],
          correct: 1,
          explanation: '"Azul" means blue in Spanish. Common colors: rojo (red), azul (blue), verde (green), amarillo (yellow), negro (black).'
        },
        {
          id: 'q3',
          question: 'What does "veinte" mean?',
          choices: ['12', '15', '20', '25'],
          correct: 2,
          explanation: '"Veinte" means 20 in Spanish. Numbers: diez (10), quince (15), veinte (20), veinticinco (25).'
        },
        {
          id: 'q4',
          question: 'What is the Spanish word for "green"?',
          choices: ['gris', 'morado', 'verde', 'naranja'],
          correct: 2,
          explanation: '"Verde" means green in Spanish. Other colors: gris (gray), morado (purple), naranja (orange).'
        },
        {
          id: 'q5',
          question: 'In Spanish, colors must agree with the noun they describe. How would you say "the red house" (la casa)?',
          choices: ['la casa rojo', 'la casa roja', 'la casa rojos', 'la casa rojas'],
          correct: 1,
          explanation: 'Because "casa" is feminine, the adjective "rojo" changes to "roja" to agree: "la casa roja."'
        }
      ]
    },
    {
      id: 'sp-3',
      title: 'Ser vs Estar',
      description: 'Two verbs for "to be" in Spanish.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'Which verb would you use to describe someone\'s nationality?',
          choices: ['estar', 'ser', 'tener', 'hacer'],
          correct: 1,
          explanation: '"Ser" is used for permanent characteristics including nationality. Example: "Soy americano" (I am American).'
        },
        {
          id: 'q2',
          question: 'Which verb would you use to say you are tired right now?',
          choices: ['ser', 'haber', 'estar', 'ir'],
          correct: 2,
          explanation: '"Estar" is used for temporary states like emotions or physical conditions. "Estoy cansado" (I am tired).'
        },
        {
          id: 'q3',
          question: 'Complete the sentence: "La fiesta ___ en mi casa." (The party is at my house.)',
          choices: ['es', 'está', 'son', 'están'],
          correct: 1,
          explanation: '"Estar" is used for locations of people, events, and things. "La fiesta está en mi casa."'
        },
        {
          id: 'q4',
          question: 'Which sentence correctly uses "ser"?',
          choices: [
            'Ella está médica.',
            'Ella es médica.',
            'Ella está de España.',
            'Ella es enferma hoy.'
          ],
          correct: 1,
          explanation: '"Ser" is used for professions and permanent characteristics. "Ella es médica" = She is a doctor.'
        },
        {
          id: 'q5',
          question: 'The phrase "estar muerto" (to be dead) uses "estar" rather than "ser" because:',
          choices: [
            'Death is considered temporary in Spanish grammar',
            'It describes a resulting state (condition) of the person',
            'All biological states use "estar"',
            'It is an exception with no grammatical reason'
          ],
          correct: 1,
          explanation: '"Estar" is used for states resulting from a change. "Estar muerto" describes the resulting condition, even though death is permanent.'
        }
      ]
    },
    {
      id: 'sp-4',
      title: 'Present Tense Verbs',
      description: 'Conjugate German verbs in the present tense.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What is the "yo" (I) form of "comer" (to eat) in the present tense?',
          choices: ['comes', 'come', 'como', 'comen'],
          correct: 2,
          explanation: 'For -er verbs, the yo form drops -er and adds -o: "yo como" (I eat).'
        },
        {
          id: 'q2',
          question: 'How do you say "They speak" in Spanish?',
          choices: ['Hablo', 'Hablas', 'Habla', 'Hablan'],
          correct: 3,
          explanation: '"Hablan" is the ellos/ellas form of "hablar." The -an ending is used for the third person plural of -ar verbs.'
        },
        {
          id: 'q3',
          question: 'Which of the following is a stem-changing verb in the present tense?',
          choices: ['hablar', 'comer', 'poder', 'vivir'],
          correct: 2,
          explanation: '"Poder" (to be able to) is a stem-changing verb: the "o" changes to "ue" in most forms (puedo, puedes, puede, pueden).'
        },
        {
          id: 'q4',
          question: 'What is the "nosotros" form of "vivir" (to live)?',
          choices: ['vivo', 'vives', 'vivimos', 'viven'],
          correct: 2,
          explanation: 'For -ir verbs, the nosotros form is -imos: "nosotros vivimos" (we live).'
        },
        {
          id: 'q5',
          question: 'The verb "ir" (to go) is irregular. What is the "tú" form in the present tense?',
          choices: ['iro', 'ires', 'vas', 'vás'],
          correct: 2,
          explanation: '"Ir" is highly irregular: yo voy, tú vas, él/ella va, nosotros vamos, ellos van.'
        }
      ]
    },
    {
      id: 'sp-5',
      title: 'Past Tense (Preterite)',
      description: 'Talk about completed actions in the past.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'What is the preterite (yo) form of "hablar" (to speak)?',
          choices: ['hablé', 'hablaba', 'hablaré', 'hablo'],
          correct: 0,
          explanation: 'The preterite yo form of -ar verbs adds -é: "yo hablé" (I spoke). Note the accent mark.'
        },
        {
          id: 'q2',
          question: 'When is the preterite tense used?',
          choices: [
            'For ongoing or habitual past actions',
            'For completed actions at a specific moment in the past',
            'For future plans',
            'For describing what something was like in the past'
          ],
          correct: 1,
          explanation: 'The preterite is used for completed actions with a clear beginning and end in the past.'
        },
        {
          id: 'q3',
          question: 'What is the preterite form of "ser/ir" for "ellos"?',
          choices: ['eran', 'fueron', 'son', 'serían'],
          correct: 1,
          explanation: '"Ser" and "ir" share identical preterite forms. "Fueron" means both "they were" and "they went" — context clarifies meaning.'
        },
        {
          id: 'q4',
          question: 'Which time expression is most commonly associated with the preterite?',
          choices: ['siempre (always)', 'ayer (yesterday)', 'todos los días (every day)', 'de niño (as a child)'],
          correct: 1,
          explanation: '"Ayer" (yesterday) signals a specific completed past action, making it a preterite trigger. The others suggest habitual actions (imperfect).'
        },
        {
          id: 'q5',
          question: 'What is the preterite "tú" form of "tener" (to have)?',
          choices: ['tenías', 'tuviste', 'tienes', 'tendrás'],
          correct: 1,
          explanation: '"Tener" is irregular in the preterite. The tú form is "tuviste" (you had).'
        }
      ]
    },
    {
      id: 'sp-6',
      title: 'Subjunctive Mood',
      description: 'Express wishes, doubts, and hypotheticals.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'Which of the following triggers the subjunctive in Spanish?',
          choices: [
            'Describing factual events in the past',
            'Expressing wishes, doubt, emotion, or hypothetical situations',
            'Stating scientific facts',
            'Asking direct questions'
          ],
          correct: 1,
          explanation: 'The subjunctive is triggered by WEIRDO: Wishes, Emotion, Impersonal expressions, Recommendations, Doubt/Denial, Ojalá.'
        },
        {
          id: 'q2',
          question: 'What is the present subjunctive "yo" form of "hablar"?',
          choices: ['hablo', 'hable', 'hablaré', 'hablé'],
          correct: 1,
          explanation: 'To form the present subjunctive for -ar verbs, use the yo present indicative stem and add -e endings: "hable."'
        },
        {
          id: 'q3',
          question: 'Which sentence requires the subjunctive?',
          choices: [
            'Sé que ella trabaja aquí.',
            'Es obvio que él tiene razón.',
            'Espero que ellos lleguen a tiempo.',
            'Veo que tú estudias mucho.'
          ],
          correct: 2,
          explanation: '"Espero que" (I hope that) expresses a wish, triggering the subjunctive: "lleguen" is the subjunctive form of "llegar."'
        },
        {
          id: 'q4',
          question: 'What is the present subjunctive form of "ser" for "nosotros"?',
          choices: ['somos', 'éramos', 'seamos', 'fuimos'],
          correct: 2,
          explanation: '"Ser" is irregular in the subjunctive. The nosotros form is "seamos" (that we be/are).'
        },
        {
          id: 'q5',
          question: 'Complete: "No creo que él ___ aquí." (I don\'t believe he is here.)',
          choices: ['está', 'esté', 'estará', 'estaba'],
          correct: 1,
          explanation: '"No creo que" (I don\'t believe that) expresses doubt, triggering the subjunctive: "esté" is the present subjunctive of "estar."'
        }
      ]
    }
  ]
},
{
  id: 'french',
  label: 'French',
  emoji: '🇫🇷',
  color: 'text-blue-700',
  bg: 'bg-blue-50',
  border: 'border-blue-200',
  hasPlacement: false,
  placementQuestions: [],
  lessons: [
    {
      id: 'fr-1',
      title: 'Greetings & Basics',
      description: 'Essential phrases to start communicating.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'How do you say "Hello" in French?',
          choices: ['Salut', 'Bonjour', 'Bonsoir', 'Au revoir'],
          correct: 1,
          explanation: '"Bonjour" is the standard greeting in French, used during the day. "Salut" is informal, and "Bonsoir" is for evenings.'
        },
        {
          id: 'q2',
          question: 'What does "Comment vous appelez-vous?" mean?',
          choices: ['How are you?', 'Where are you from?', 'What is your name? (formal)', 'How old are you?'],
          correct: 2,
          explanation: '"Comment vous appelez-vous?" is the formal way to ask someone\'s name. The informal version is "Comment tu t\'appelles?"'
        },
        {
          id: 'q3',
          question: 'How do you say "Please" in French?',
          choices: ['Merci', 'Pardon', 'S\'il vous plaît', 'De rien'],
          correct: 2,
          explanation: '"S\'il vous plaît" (formal) or "s\'il te plaît" (informal) means "please" in French.'
        },
        {
          id: 'q4',
          question: 'What does "Au revoir" mean?',
          choices: ['Hello', 'Good night', 'Goodbye', 'See you tomorrow'],
          correct: 2,
          explanation: '"Au revoir" means "Goodbye" in French. It literally translates to "until seeing again."'
        },
        {
          id: 'q5',
          question: 'How do you say "Thank you very much" in French?',
          choices: ['Merci', 'Merci beaucoup', 'Merci bien', 'Je vous en prie'],
          correct: 1,
          explanation: '"Merci beaucoup" means "Thank you very much." "Merci" alone means "thank you."'
        }
      ]
    },
    {
      id: 'fr-2',
      title: 'Articles & Gender',
      description: 'Le/la/les and grammatical gender in French.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'In French, nouns are either masculine or feminine. What are the definite articles?',
          choices: ['un / une', 'le / la', 'du / de la', 'ce / cette'],
          correct: 1,
          explanation: '"Le" is the masculine definite article and "la" is the feminine. They are equivalent to "the" in English.'
        },
        {
          id: 'q2',
          question: 'What is the indefinite article for a feminine noun in French?',
          choices: ['le', 'un', 'une', 'des'],
          correct: 2,
          explanation: '"Une" is the feminine indefinite article (a/an). "Un" is masculine. Example: "une femme" (a woman), "un homme" (a man).'
        },
        {
          id: 'q3',
          question: 'What happens to "le" and "la" before a word starting with a vowel or silent h?',
          choices: ['They stay the same', 'They become "les"', 'They contract to "l\'"', 'They are dropped'],
          correct: 2,
          explanation: 'Before vowels or silent h, "le" and "la" elide to "l\'": "l\'ami" (the friend), "l\'heure" (the hour).'
        },
        {
          id: 'q4',
          question: 'What is the plural definite article in French?',
          choices: ['un', 'une', 'des', 'les'],
          correct: 3,
          explanation: '"Les" is the plural definite article for both masculine and feminine nouns. "Les livres" = the books.'
        },
        {
          id: 'q5',
          question: 'Which article would you use with "livre" (book, masculine)?',
          choices: ['la livre', 'une livre', 'un livre', 'les livre'],
          correct: 2,
          explanation: '"Livre" is masculine, so it uses "un" (indefinite) or "le" (definite). "Un livre" = a book; "le livre" = the book.'
        }
      ]
    },
    {
      id: 'fr-3',
      title: 'Present Tense',
      description: 'Conjugate French verbs in the present.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What are the three groups of French verbs based on their infinitive endings?',
          choices: ['-ar, -er, -ir', '-er, -ir, -re', '-er, -ir, -oir', '-er, -re, -oir'],
          correct: 1,
          explanation: 'French regular verbs fall into three groups: -er verbs (parler), -ir verbs (finir), and -re verbs (vendre).'
        },
        {
          id: 'q2',
          question: 'What is the "je" form of "parler" (to speak) in the present tense?',
          choices: ['parles', 'parle', 'parlons', 'parlent'],
          correct: 1,
          explanation: 'For -er verbs: drop -er and add endings. Je form = -e: "je parle" (I speak).'
        },
        {
          id: 'q3',
          question: 'How do you say "We finish" in French (finir - to finish)?',
          choices: ['Je finis', 'Vous finissez', 'Nous finissons', 'Ils finissent'],
          correct: 2,
          explanation: 'For -ir verbs in the nous form, add -issons: "nous finissons" (we finish).'
        },
        {
          id: 'q4',
          question: 'What is the present tense "ils/elles" form of "être" (to be)?',
          choices: ['est', 'êtes', 'sommes', 'sont'],
          correct: 3,
          explanation: '"Être" is irregular. Ils/elles form is "sont": "ils sont" (they are). Full conjugation: suis, es, est, sommes, êtes, sont.'
        },
        {
          id: 'q5',
          question: 'How do you say "I have" in French?',
          choices: ['Je suis', 'J\'ai', 'J\'habite', 'Je vais'],
          correct: 1,
          explanation: '"Avoir" (to have) is irregular. "J\'ai" = I have. Full: j\'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.'
        }
      ]
    },
    {
      id: 'fr-4',
      title: 'Numbers & Time',
      description: 'Count and tell time in French.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'How do you say "80" in French?',
          choices: ['huitante', 'octante', 'quatre-vingts', 'huitdix'],
          correct: 2,
          explanation: 'In standard French, 80 is "quatre-vingts" (four-twenties). Belgium and Switzerland use "huitante" regionally.'
        },
        {
          id: 'q2',
          question: 'How do you say "What time is it?" in French?',
          choices: ['Quelle heure est-il?', 'Quel temps fait-il?', 'Qu\'est-ce que c\'est?', 'Combien coûte-il?'],
          correct: 0,
          explanation: '"Quelle heure est-il?" means "What time is it?" Note: "quel temps fait-il?" means "What\'s the weather like?"'
        },
        {
          id: 'q3',
          question: 'How do you say "It is 3 o\'clock" in French?',
          choices: ['Il est trois heures.', 'Il fait trois heures.', 'C\'est trois heure.', 'Voilà trois heures.'],
          correct: 0,
          explanation: '"Il est + [number] + heure(s)" is the structure for telling time. "Il est trois heures" = It is 3 o\'clock.'
        },
        {
          id: 'q4',
          question: 'What is the French word for "yesterday"?',
          choices: ['demain', 'aujourd\'hui', 'hier', 'maintenant'],
          correct: 2,
          explanation: '"Hier" means yesterday. "Aujourd\'hui" = today, "demain" = tomorrow, "maintenant" = now.'
        },
        {
          id: 'q5',
          question: 'How do you say the number 70 in French?',
          choices: ['septante', 'soixante-dix', 'soixante-dix-sept', 'septdix'],
          correct: 1,
          explanation: '70 in French is "soixante-dix" (sixty-ten). Numbers 70–79 are formed as 60 + 10 to 19.'
        }
      ]
    },
    {
      id: 'fr-5',
      title: 'Passé Composé',
      description: 'The French past tense for completed actions.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'How is the passé composé formed?',
          choices: [
            'Subject + imperfect of avoir/être + past participle',
            'Subject + present of avoir/être + past participle',
            'Subject + past participle alone',
            'Subject + infinitive + past participle'
          ],
          correct: 1,
          explanation: 'The passé composé = subject + present tense of "avoir" or "être" + past participle. Example: "j\'ai mangé" (I ate).'
        },
        {
          id: 'q2',
          question: 'What is the past participle of "parler" (to speak)?',
          choices: ['parlé', 'parli', 'parlant', 'parla'],
          correct: 0,
          explanation: 'For -er verbs, the past participle ends in -é: "parlé." So "j\'ai parlé" = I spoke/I have spoken.'
        },
        {
          id: 'q3',
          question: 'Which verbs use "être" instead of "avoir" as the auxiliary in passé composé?',
          choices: [
            'All -er verbs',
            'Motion and state-of-being verbs (DR MRS VANDERTRAMP)',
            'All irregular verbs',
            'All verbs of more than two syllables'
          ],
          correct: 1,
          explanation: 'Verbs of motion and state change (aller, venir, partir, naître, mourir, etc.) use "être." These are remembered with DR MRS VANDERTRAMP.'
        },
        {
          id: 'q4',
          question: 'How do you say "She went" in French using passé composé?',
          choices: ['Elle a allé', 'Elle est allée', 'Elle est allé', 'Elle a été'],
          correct: 1,
          explanation: '"Aller" uses "être." Since the subject is feminine (elle), the past participle agrees: "allée." "Elle est allée."'
        },
        {
          id: 'q5',
          question: 'When does the past participle agree with the subject in passé composé?',
          choices: [
            'Always',
            'Never',
            'Only when using "être" as the auxiliary',
            'Only for plural subjects'
          ],
          correct: 2,
          explanation: 'When "être" is the auxiliary, the past participle agrees in gender and number with the subject. With "avoir," it generally does not agree with the subject.'
        }
      ]
    }
  ]
},
{
  id: 'german',
  label: 'German',
  emoji: '🇩🇪',
  color: 'text-gray-700',
  bg: 'bg-gray-50',
  border: 'border-gray-200',
  hasPlacement: false,
  placementQuestions: [],
  lessons: [
    {
      id: 'de-1',
      title: 'Greetings & Basics',
      description: 'Essential phrases to start communicating.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'How do you say "Hello" in German?',
          choices: ['Tschüss', 'Hallo', 'Guten Abend', 'Auf Wiedersehen'],
          correct: 1,
          explanation: '"Hallo" is the informal greeting in German. "Guten Tag" is more formal. "Tschüss" and "Auf Wiedersehen" are goodbyes.'
        },
        {
          id: 'q2',
          question: 'How do you say "Good morning" in German?',
          choices: ['Guten Abend', 'Gute Nacht', 'Guten Morgen', 'Guten Tag'],
          correct: 2,
          explanation: '"Guten Morgen" means good morning. "Guten Tag" = good day, "Guten Abend" = good evening, "Gute Nacht" = good night.'
        },
        {
          id: 'q3',
          question: 'How do you say "Thank you" in German?',
          choices: ['Bitte', 'Danke', 'Entschuldigung', 'Bitte schön'],
          correct: 1,
          explanation: '"Danke" means thank you. "Bitte" means please or you\'re welcome. "Danke schön" means thank you very much.'
        },
        {
          id: 'q4',
          question: 'What does "Wie heißen Sie?" mean?',
          choices: ['How old are you?', 'Where do you live?', 'What is your name? (formal)', 'How are you?'],
          correct: 2,
          explanation: '"Wie heißen Sie?" is the formal way to ask someone\'s name. The informal version is "Wie heißt du?"'
        },
        {
          id: 'q5',
          question: 'How do you say "Goodbye" (formal) in German?',
          choices: ['Tschüss', 'Ciao', 'Auf Wiedersehen', 'Bis später'],
          correct: 2,
          explanation: '"Auf Wiedersehen" is the formal goodbye in German, meaning "until we see again." "Tschüss" is informal.'
        }
      ]
    },
    {
      id: 'de-2',
      title: 'Der Die Das',
      description: 'German grammatical gender and articles.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'German has how many grammatical genders for nouns?',
          choices: ['1', '2', '3', '4'],
          correct: 2,
          explanation: 'German has three grammatical genders: masculine (der), feminine (die), and neuter (das).'
        },
        {
          id: 'q2',
          question: 'What is the definite article for a masculine noun (nominative case) in German?',
          choices: ['die', 'das', 'der', 'den'],
          correct: 2,
          explanation: '"Der" is the masculine nominative definite article. Example: "der Mann" (the man).'
        },
        {
          id: 'q3',
          question: 'What is the definite article for neuter nouns (nominative case) in German?',
          choices: ['der', 'die', 'das', 'dem'],
          correct: 2,
          explanation: '"Das" is the neuter definite article. Example: "das Kind" (the child), "das Buch" (the book).'
        },
        {
          id: 'q4',
          question: 'What definite article is used for ALL plural nouns in German (nominative case)?',
          choices: ['der', 'die', 'das', 'den'],
          correct: 1,
          explanation: '"Die" is used for all plural nouns in the nominative case, regardless of gender. "Die Bücher" = the books.'
        },
        {
          id: 'q5',
          question: 'What are the indefinite articles in German (nominative case)?',
          choices: [
            'der/die/das',
            'ein/eine/ein',
            'ein/ein/eine',
            'une/un/une'
          ],
          correct: 1,
          explanation: 'Indefinite articles: "ein" (masculine/neuter) and "eine" (feminine). "Ein Mann" (a man), "eine Frau" (a woman), "ein Kind" (a child).'
        }
      ]
    },
    {
      id: 'de-3',
      title: 'Present Tense Verbs',
      description: 'Conjugate German verbs in the present tense.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What is the "ich" (I) form of "spielen" (to play) in the present tense?',
          choices: ['spielst', 'spiele', 'spielen', 'spielt'],
          correct: 1,
          explanation: 'For regular verbs, the ich form ends in -e: "ich spiele" (I play).'
        },
        {
          id: 'q2',
          question: 'What is the "du" (you, informal) form of "machen" (to do/make)?',
          choices: ['mache', 'macht', 'machst', 'machen'],
          correct: 2,
          explanation: 'The du form adds -st: "du machst" (you do/make).'
        },
        {
          id: 'q3',
          question: 'How do you say "He works" in German (arbeiten - to work)?',
          choices: ['Er arbeite', 'Er arbeitest', 'Er arbeitet', 'Er arbeiten'],
          correct: 2,
          explanation: 'The er/sie/es form adds -t: "er arbeitet." For verbs with stems ending in -t, -d, add -et for pronunciation ease.'
        },
        {
          id: 'q4',
          question: 'What is the "wir" (we) form of "kommen" (to come)?',
          choices: ['komme', 'kommt', 'kommst', 'kommen'],
          correct: 3,
          explanation: 'The wir form uses the infinitive itself: "wir kommen" (we come).'
        },
        {
          id: 'q5',
          question: 'The verb "sein" (to be) is irregular. What is the "ich" form?',
          choices: ['seid', 'sind', 'bin', 'ist'],
          correct: 2,
          explanation: '"Sein" is highly irregular: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.'
        }
      ]
    },
    {
      id: 'de-4',
      title: 'Cases: Nominative & Accusative',
      description: 'The first two German grammatical cases.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What is the nominative case used for in German?',
          choices: [
            'The direct object of a sentence',
            'The subject of a sentence',
            'Indirect objects',
            'Possession'
          ],
          correct: 1,
          explanation: 'The nominative case marks the subject of a sentence — the noun doing the action.'
        },
        {
          id: 'q2',
          question: 'What is the accusative case used for?',
          choices: [
            'The subject of the sentence',
            'The direct object of the sentence',
            'Indicating possession',
            'The indirect object'
          ],
          correct: 1,
          explanation: 'The accusative case marks the direct object — the noun directly receiving the action of the verb.'
        },
        {
          id: 'q3',
          question: 'How does the masculine definite article change from nominative to accusative?',
          choices: [
            'der → die',
            'der → dem',
            'der → den',
            'der → des'
          ],
          correct: 2,
          explanation: 'Only the masculine article changes in the accusative: "der" becomes "den." Feminine (die) and neuter (das) stay the same.'
        },
        {
          id: 'q4',
          question: 'In the sentence "Der Mann sieht den Hund" (The man sees the dog), what case is "den Hund"?',
          choices: ['Nominative', 'Accusative', 'Dative', 'Genitive'],
          correct: 1,
          explanation: '"Den Hund" is the direct object (what is being seen), so it is in the accusative case. "Den" is the masculine accusative article.'
        },
        {
          id: 'q5',
          question: 'Which prepositions always take the accusative case in German?',
          choices: [
            'mit, nach, seit, von',
            'durch, für, gegen, ohne, um',
            'an, auf, hinter, in, neben',
            'bei, aus, zu, gegenüber'
          ],
          correct: 1,
          explanation: 'The prepositions "durch, für, gegen, ohne, um" always require the accusative case in German.'
        }
      ]
    },
    {
      id: 'de-5',
      title: 'Past Tense (Perfekt)',
      description: 'The German conversational past tense.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'How is the Perfekt (present perfect) tense formed in German?',
          choices: [
            'Subject + past participle + haben/sein',
            'Subject + haben/sein (present) + past participle',
            'Subject + infinitive + haben/sein',
            'Subject + past participle alone'
          ],
          correct: 1,
          explanation: 'German Perfekt = subject + present tense of "haben" or "sein" + past participle at the end. Example: "Ich habe gegessen" (I have eaten/I ate).'
        },
        {
          id: 'q2',
          question: 'How is the past participle of a regular (weak) verb formed in German?',
          choices: [
            'Remove -en from the infinitive',
            'ge- + verb stem + -t',
            'ge- + verb stem + -en',
            'verb stem + -te'
          ],
          correct: 1,
          explanation: 'Regular verbs form the past participle with "ge-" + stem + "-t." Example: "machen" → "gemacht" (made/done).'
        },
        {
          id: 'q3',
          question: 'Which auxiliary verb (haben or sein) is used with "gehen" (to go) in the Perfekt?',
          choices: ['haben', 'sein', 'Either can be used', 'Neither — no auxiliary needed'],
          correct: 1,
          explanation: 'Verbs of motion and change of state use "sein." "Ich bin gegangen" = I went/I have gone.'
        },
        {
          id: 'q4',
          question: 'What is the Perfekt form of "sehen" (to see) for "ich"?',
          choices: ['Ich habe gesehen', 'Ich bin gesehen', 'Ich habe gesieht', 'Ich bin gesieht'],
          correct: 0,
          explanation: '"Sehen" is a strong (irregular) verb. Its past participle is "gesehen." It uses "haben": "Ich habe gesehen" (I saw/I have seen).'
        },
        {
          id: 'q5',
          question: 'Where does the past participle appear in a German Perfekt sentence?',
          choices: [
            'Directly after the subject',
            'Immediately before the auxiliary verb',
            'At the very end of the sentence',
            'At the beginning of the sentence'
          ],
          correct: 2,
          explanation: 'In German, the past participle goes to the very end of the sentence/clause: "Ich habe das Buch gelesen." (I read the book.)'
        }
      ]
    }
  ]
},
{
  id: 'latin',
  label: 'Latin',
  emoji: '🏺',
  color: 'text-orange-700',
  bg: 'bg-orange-50',
  border: 'border-orange-200',
  hasPlacement: false,
  placementQuestions: [],
  lessons: [
    {
      id: 'lat-1',
      title: 'Latin Roots in English',
      description: 'How Latin roots build English vocabulary.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'The Latin root "scrib/script" means "to write." Which English word comes from this root?',
          choices: ['Sculpture', 'Describe', 'Screen', 'Scrutiny'],
          correct: 1,
          explanation: '"Describe" comes from Latin "describere" (to write down). Other examples: prescribe, inscription, manuscript.'
        },
        {
          id: 'q2',
          question: 'The Latin root "port" means "to carry." Which word uses this root?',
          choices: ['Portrait', 'Portal', 'Transport', 'Portion'],
          correct: 2,
          explanation: '"Transport" means to carry across. Other port-root words: import, export, portable, report.'
        },
        {
          id: 'q3',
          question: 'The Latin root "aud" means "to hear." Which word comes from this root?',
          choices: ['Auditorium', 'Attitude', 'Altitude', 'Autumn'],
          correct: 0,
          explanation: '"Auditorium" is a place where you hear performances. Related: audible, audience, audio, audition.'
        },
        {
          id: 'q4',
          question: 'The Latin prefix "bene-" means "good/well." Which word uses this prefix?',
          choices: ['Benefit', 'Between', 'Beneath', 'Believe'],
          correct: 0,
          explanation: '"Benefit" comes from Latin "benefactum" (good deed). Other bene- words: benevolent, benefactor, beneficial.'
        },
        {
          id: 'q5',
          question: 'The Latin root "vid/vis" means "to see." Which word uses this root?',
          choices: ['Vivid', 'Violin', 'Vision', 'Viking'],
          correct: 2,
          explanation: '"Vision" comes from Latin "visio" (sight). Other examples: visible, video, revise, evidence, supervise.'
        }
      ]
    },
    {
      id: 'lat-2',
      title: 'Common Latin Phrases',
      description: 'Latin expressions still used today.',
      level: 1,
      xp: 10,
      rubies: 5,
      questions: [
        {
          id: 'q1',
          question: 'What does "e pluribus unum" mean? (Found on U.S. currency)',
          choices: [
            'In God we trust',
            'Out of many, one',
            'We the people',
            'Liberty and justice for all'
          ],
          correct: 1,
          explanation: '"E pluribus unum" means "Out of many, one" — referring to the union of many states into one nation. It appears on the U.S. seal.'
        },
        {
          id: 'q2',
          question: 'What does "carpe diem" mean?',
          choices: ['Seize the day', 'Fish of the day', 'Day of reckoning', 'The day is long'],
          correct: 0,
          explanation: '"Carpe diem" from Horace\'s Odes means "Seize the day" — encouraging enjoyment of the present moment.'
        },
        {
          id: 'q3',
          question: 'What does "et cetera" (etc.) mean?',
          choices: ['And the end', 'And so forth/and other things', 'Also correct', 'Every century'],
          correct: 1,
          explanation: '"Et cetera" literally means "and the rest" or "and other things." It is used to indicate continuation of a list.'
        },
        {
          id: 'q4',
          question: 'What does "per se" mean?',
          choices: ['By itself/in itself', 'Per second', 'Through knowledge', 'For example'],
          correct: 0,
          explanation: '"Per se" means "by itself" or "in itself," used to indicate something intrinsic or in its own right.'
        },
        {
          id: 'q5',
          question: 'What does "alma mater" mean?',
          choices: [
            'An old friend',
            'A nourishing mother — used to refer to one\'s school or university',
            'Ancient wisdom',
            'A type of graduation ceremony'
          ],
          correct: 1,
          explanation: '"Alma mater" means "nourishing mother" and refers to the school, college, or university that one attended.'
        }
      ]
    },
    {
      id: 'lat-3',
      title: 'Noun Declensions',
      description: 'Latin noun endings and their functions.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'In Latin, what is a "declension"?',
          choices: [
            'A type of verb conjugation',
            'A group of nouns that share similar case endings',
            'A word that modifies a verb',
            'A set of pronouns'
          ],
          correct: 1,
          explanation: 'A declension is a class of Latin nouns that share the same set of endings for cases, number, and gender.'
        },
        {
          id: 'q2',
          question: 'How many cases does Latin have?',
          choices: ['3', '4', '5', '6'],
          correct: 3,
          explanation: 'Latin has 6 cases: Nominative, Genitive, Dative, Accusative, Ablative, and Vocative.'
        },
        {
          id: 'q3',
          question: 'What case is used for the subject of a Latin sentence?',
          choices: ['Genitive', 'Dative', 'Accusative', 'Nominative'],
          correct: 3,
          explanation: 'The Nominative case marks the subject of the sentence — the noun performing the action.'
        },
        {
          id: 'q4',
          question: 'The word "puella" (girl) belongs to which declension?',
          choices: ['First declension', 'Second declension', 'Third declension', 'Fourth declension'],
          correct: 0,
          explanation: '"Puella" is a first declension noun, characterized by the -a ending. First declension nouns are mostly feminine.'
        },
        {
          id: 'q5',
          question: 'What does the Genitive case indicate in Latin?',
          choices: ['Direct object', 'Possession or relationship', 'Indirect object', 'Subject of the sentence'],
          correct: 1,
          explanation: 'The Genitive case shows possession or relationship, equivalent to "of" or "\'s" in English. "Puellae" = of the girl.'
        }
      ]
    },
    {
      id: 'lat-4',
      title: 'Basic Latin Verbs',
      description: 'First and second conjugation Latin verbs.',
      level: 2,
      xp: 15,
      rubies: 8,
      questions: [
        {
          id: 'q1',
          question: 'What does "amare" mean in Latin?',
          choices: ['To run', 'To see', 'To love', 'To speak'],
          correct: 2,
          explanation: '"Amare" means "to love." It is a first conjugation verb. "Amo" = I love.'
        },
        {
          id: 'q2',
          question: 'What is the Latin verb "esse" and its first person singular form?',
          choices: [
            'To have — habeo',
            'To be — sum',
            'To go — eo',
            'To say — dico'
          ],
          correct: 1,
          explanation: '"Esse" means "to be" and is highly irregular. "Sum" = I am, "es" = you are, "est" = he/she/it is.'
        },
        {
          id: 'q3',
          question: 'How many conjugations of verbs does Latin have?',
          choices: ['2', '3', '4', '5'],
          correct: 2,
          explanation: 'Latin has 4 conjugations, grouped by the vowel before the infinitive ending: -āre (1st), -ēre (2nd), -ere (3rd), -īre (4th).'
        },
        {
          id: 'q4',
          question: 'What does "video" mean in Latin?',
          choices: ['I hear', 'I walk', 'I see', 'I say'],
          correct: 2,
          explanation: '"Video" (1st person singular of "videre") means "I see." This is the root of English words like "video" and "vision."'
        },
        {
          id: 'q5',
          question: 'What is the typical word order in a Latin sentence?',
          choices: [
            'Subject-Verb-Object (SVO)',
            'Verb-Subject-Object (VSO)',
            'Subject-Object-Verb (SOV)',
            'Object-Verb-Subject (OVS)'
          ],
          correct: 2,
          explanation: 'Latin typically follows Subject-Object-Verb (SOV) order: "Puella aquam amat" = The girl water loves (The girl loves water).'
        }
      ]
    },
    {
      id: 'lat-5',
      title: 'Reading Latin Sentences',
      description: 'Parse and translate simple Latin sentences.',
      level: 3,
      xp: 20,
      rubies: 12,
      questions: [
        {
          id: 'q1',
          question: 'What does "Veni, vidi, vici" mean? (Julius Caesar)',
          choices: [
            'I came, I fought, I won',
            'I came, I saw, I conquered',
            'I lived, I learned, I left',
            'I rose, I ruled, I fell'
          ],
          correct: 1,
          explanation: '"Veni, vidi, vici" means "I came, I saw, I conquered" — attributed to Julius Caesar after a swift victory in 47 BC.'
        },
        {
          id: 'q2',
          question: 'Translate: "Puella in horto ambulat."',
          choices: [
            'The girl runs through the forest.',
            'The girl walks in the garden.',
            'The woman works in the house.',
            'The girl sees the garden.'
          ],
          correct: 1,
          explanation: '"Puella" = girl (subject), "in horto" = in the garden, "ambulat" = walks (3rd person singular present). "The girl walks in the garden."'
        },
        {
          id: 'q3',
          question: 'In the sentence "Marcus librum legit" (Marcus reads the book), what case is "librum"?',
          choices: ['Nominative', 'Genitive', 'Dative', 'Accusative'],
          correct: 3,
          explanation: '"Librum" is the accusative singular of "liber" (book), functioning as the direct object of "legit" (reads).'
        },
        {
          id: 'q4',
          question: 'What does "Cogito, ergo sum" (Descartes) mean?',
          choices: [
            'I think, therefore I am',
            'I know, therefore I believe',
            'I live, therefore I think',
            'I dream, therefore I exist'
          ],
          correct: 0,
          explanation: '"Cogito, ergo sum" means "I think, therefore I am" — Descartes\' famous philosophical statement about the certainty of existence.'
        },
        {
          id: 'q5',
          question: 'Translate the motto "Dum spiro, spero."',
          choices: [
            'Where there is life, there is hope',
            'While I breathe, I hope',
            'If I dream, I achieve',
            'From darkness comes light'
          ],
          correct: 1,
          explanation: '"Dum spiro, spero" means "While I breathe, I hope" — a common motto expressing perseverance as long as one is alive.'
        }
      ]
    }
  ]
}
]

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id)
}

export function getLesson(subjectId: string, lessonId: string): Lesson | undefined {
  return getSubject(subjectId)?.lessons.find((l) => l.id === lessonId)
}

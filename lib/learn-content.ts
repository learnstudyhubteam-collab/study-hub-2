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
    id: 'algebra1',
    label: 'Algebra 1',
    emoji: '🔢',
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
    id: 'geometry',
    label: 'Geometry',
    emoji: '📐',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'geo2_p1', question: 'What is the sum of interior angles of a triangle?', choices: ['90°', '180°', '270°', '360°'], correct: 1, explanation: 'The interior angles of any triangle always add up to 180°.' },
      { id: 'geo2_p2', question: 'What is the area of a rectangle with length 8 and width 5?', choices: ['13', '26', '40', '80'], correct: 2, explanation: 'Area of a rectangle = length × width = 8 × 5 = 40.' },
      { id: 'geo2_p3', question: 'How many degrees are in a right angle?', choices: ['45°', '90°', '180°', '360°'], correct: 1, explanation: 'A right angle measures exactly 90°.' },
      { id: 'geo2_p4', question: 'What is the perimeter of a square with side length 6?', choices: ['12', '24', '36', '6'], correct: 1, explanation: 'Perimeter of a square = 4 × side = 4 × 6 = 24.' },
      { id: 'geo2_p5', question: 'Two triangles are congruent if they have the same __?', choices: ['Color', 'Orientation', 'Shape and size', 'Only shape'], correct: 2, explanation: 'Congruent triangles have exactly the same shape AND size.' },
      { id: 'geo2_p6', question: 'If a right triangle has legs 3 and 4, what is the hypotenuse?', choices: ['5', '6', '7', '8'], correct: 0, explanation: 'By the Pythagorean theorem: 3² + 4² = 9 + 16 = 25, so hypotenuse = 5.' },
      { id: 'geo2_p7', question: 'What is the circumference of a circle with radius 7? (use π ≈ 3.14)', choices: ['21.98', '43.96', '153.86', '87.92'], correct: 1, explanation: 'Circumference = 2πr = 2 × 3.14 × 7 ≈ 43.96.' },
      { id: 'geo2_p8', question: 'What transformation slides a figure without rotating or flipping it?', choices: ['Rotation', 'Reflection', 'Translation', 'Dilation'], correct: 2, explanation: 'A translation slides every point of a figure the same distance in the same direction.' },
      { id: 'geo2_p9', question: 'What is the slope of a line passing through (0,0) and (4,8)?', choices: ['0.5', '2', '4', '8'], correct: 1, explanation: 'Slope = rise/run = (8-0)/(4-0) = 8/4 = 2.' },
      { id: 'geo2_p10', question: 'In a circle, an angle formed by two radii is called a __?', choices: ['Inscribed angle', 'Central angle', 'Chord angle', 'Tangent angle'], correct: 1, explanation: 'A central angle has its vertex at the center of the circle and is formed by two radii.' },
      { id: 'geo2_p11', question: 'What is the volume of a rectangular prism with length 4, width 3, height 5?', choices: ['24', '47', '60', '120'], correct: 2, explanation: 'Volume = l × w × h = 4 × 3 × 5 = 60.' },
      { id: 'geo2_p12', question: 'If two parallel lines are cut by a transversal, alternate interior angles are __?', choices: ['Supplementary', 'Complementary', 'Congruent', 'Perpendicular'], correct: 2, explanation: 'Alternate interior angles formed by a transversal cutting parallel lines are always congruent (equal).' },
    ],
    lessons: [
      {
        id: 'geo2_l1_1',
        title: 'Points, Lines, and Angles',
        description: 'Learn the fundamental building blocks of geometry.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'geo2_l1_1_q1', question: 'What is a line segment?', choices: ['A line that goes on forever', 'A part of a line with two endpoints', 'A line with one endpoint', 'A curved path'], correct: 1, explanation: 'A line segment is a part of a line bounded by two distinct endpoints.' },
          { id: 'geo2_l1_1_q2', question: 'Complementary angles add up to __?', choices: ['90°', '180°', '270°', '360°'], correct: 0, explanation: 'Two angles are complementary if their measures add up to 90°.' },
          { id: 'geo2_l1_1_q3', question: 'Supplementary angles add up to __?', choices: ['90°', '180°', '270°', '360°'], correct: 1, explanation: 'Two angles are supplementary if their measures add up to 180°.' },
          { id: 'geo2_l1_1_q4', question: 'Vertical angles are always __?', choices: ['Supplementary', 'Complementary', 'Congruent', 'Adjacent'], correct: 2, explanation: 'Vertical angles are the opposite angles formed when two lines intersect, and they are always equal.' },
          { id: 'geo2_l1_1_q5', question: 'A ray has __?', choices: ['Two endpoints', 'No endpoints', 'One endpoint', 'Infinite length in both directions'], correct: 2, explanation: 'A ray has one endpoint (the origin) and extends infinitely in one direction.' },
        ],
      },
      {
        id: 'geo2_l1_2',
        title: 'Polygons and Area',
        description: 'Calculate area and perimeter of common polygons.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'geo2_l1_2_q1', question: 'What is the area of a triangle with base 10 and height 6?', choices: ['60', '30', '16', '20'], correct: 1, explanation: 'Area of a triangle = ½ × base × height = ½ × 10 × 6 = 30.' },
          { id: 'geo2_l1_2_q2', question: 'A regular polygon has all sides and all angles __?', choices: ['Different', 'Equal', 'Right angles', 'Parallel'], correct: 1, explanation: 'A regular polygon has all sides equal in length and all interior angles equal.' },
          { id: 'geo2_l1_2_q3', question: 'What is the sum of interior angles of a quadrilateral?', choices: ['180°', '270°', '360°', '540°'], correct: 2, explanation: 'The sum of interior angles of any quadrilateral is 360°.' },
          { id: 'geo2_l1_2_q4', question: 'What is the area of a parallelogram with base 9 and height 4?', choices: ['13', '26', '36', '72'], correct: 2, explanation: 'Area of parallelogram = base × height = 9 × 4 = 36.' },
          { id: 'geo2_l1_2_q5', question: 'How many sides does a hexagon have?', choices: ['5', '6', '7', '8'], correct: 1, explanation: 'A hexagon has 6 sides. The prefix "hex-" means six.' },
        ],
      },
      {
        id: 'geo2_l1_3',
        title: 'Circles: Basics',
        description: 'Explore radius, diameter, circumference and area of circles.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'geo2_l1_3_q1', question: 'The diameter of a circle is __?', choices: ['Half the radius', 'Twice the radius', 'Equal to the radius', 'The circumference divided by π'], correct: 1, explanation: 'The diameter passes through the center and equals twice the radius.' },
          { id: 'geo2_l1_3_q2', question: 'What is the area of a circle with radius 5? (π ≈ 3.14)', choices: ['31.4', '78.5', '15.7', '25'], correct: 1, explanation: 'Area = πr² = 3.14 × 25 ≈ 78.5.' },
          { id: 'geo2_l1_3_q3', question: 'A chord is __?', choices: ['A line tangent to a circle', 'A line segment with both endpoints on the circle', 'The longest radius', 'Half the circumference'], correct: 1, explanation: 'A chord is any line segment whose two endpoints both lie on the circle.' },
          { id: 'geo2_l1_3_q4', question: 'What is π (pi) approximately equal to?', choices: ['2.17', '3.14', '4.12', '6.28'], correct: 1, explanation: 'Pi (π) is approximately 3.14159, commonly rounded to 3.14.' },
          { id: 'geo2_l1_3_q5', question: 'The circumference of a circle with diameter 10 is approximately __?', choices: ['31.4', '78.5', '15.7', '20'], correct: 0, explanation: 'Circumference = π × d = 3.14 × 10 ≈ 31.4.' },
        ],
      },
      {
        id: 'geo2_l2_1',
        title: 'Triangle Congruence',
        description: 'Learn SSS, SAS, ASA, and AAS congruence postulates.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'geo2_l2_1_q1', question: 'SSS congruence means all three __ are equal.', choices: ['Angles', 'Sides', 'Medians', 'Altitudes'], correct: 1, explanation: 'SSS (Side-Side-Side) states that if all three sides of one triangle equal all three sides of another, the triangles are congruent.' },
          { id: 'geo2_l2_1_q2', question: 'SAS requires two sides and the __ between them to be congruent.', choices: ['Angle', 'Side', 'Altitude', 'Median'], correct: 0, explanation: 'SAS (Side-Angle-Side) requires the included angle — the angle between the two congruent sides.' },
          { id: 'geo2_l2_1_q3', question: 'ASA requires two angles and the __ side between them.', choices: ['Longest', 'Opposite', 'Included', 'Parallel'], correct: 2, explanation: 'ASA (Angle-Side-Angle) requires the included side between the two congruent angles.' },
          { id: 'geo2_l2_1_q4', question: 'Which is NOT a valid triangle congruence postulate?', choices: ['SSS', 'SAS', 'SSA', 'AAS'], correct: 2, explanation: 'SSA (Side-Side-Angle) is not a valid congruence postulate — it can produce two different triangles.' },
          { id: 'geo2_l2_1_q5', question: 'If triangle ABC ≅ triangle DEF, then angle A corresponds to __?', choices: ['Angle E', 'Angle F', 'Angle D', 'Angle B'], correct: 2, explanation: 'Corresponding parts of congruent triangles are congruent (CPCTC). A↔D, B↔E, C↔F.' },
        ],
      },
      {
        id: 'geo2_l2_2',
        title: 'Similarity and Proportions',
        description: 'Understand similar figures and solve proportional problems.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'geo2_l2_2_q1', question: 'Two figures are similar if they have the same __ but not necessarily the same size.', choices: ['Color', 'Shape', 'Perimeter', 'Area'], correct: 1, explanation: 'Similar figures have the same shape (equal angles, proportional sides) but can differ in size.' },
          { id: 'geo2_l2_2_q2', question: 'If two triangles are similar with a scale factor of 3, the ratio of their areas is __?', choices: ['3', '6', '9', '27'], correct: 2, explanation: 'The ratio of areas of similar figures equals the square of the scale factor: 3² = 9.' },
          { id: 'geo2_l2_2_q3', question: 'AA similarity means if two __ of one triangle equal two of another, they\'re similar.', choices: ['Sides', 'Angles', 'Areas', 'Perimeters'], correct: 1, explanation: 'AA (Angle-Angle) similarity: if two angles of one triangle equal two angles of another, the triangles are similar.' },
          { id: 'geo2_l2_2_q4', question: 'A triangle has sides 3, 4, 5. A similar triangle has shortest side 9. What is its longest side?', choices: ['12', '15', '20', '9'], correct: 1, explanation: 'Scale factor = 9/3 = 3. Longest side = 5 × 3 = 15.' },
          { id: 'geo2_l2_2_q5', question: 'Corresponding angles in similar polygons are __?', choices: ['Supplementary', 'Complementary', 'Equal', 'Proportional'], correct: 2, explanation: 'Corresponding angles in similar polygons are always equal (congruent).' },
        ],
      },
      {
        id: 'geo2_l2_3',
        title: 'The Pythagorean Theorem',
        description: 'Apply the Pythagorean theorem to solve triangle problems.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'geo2_l2_3_q1', question: 'The Pythagorean theorem states a² + b² = c², where c is the __?', choices: ['Shorter leg', 'Longer leg', 'Hypotenuse', 'Altitude'], correct: 2, explanation: 'c is the hypotenuse — the side opposite the right angle, always the longest side.' },
          { id: 'geo2_l2_3_q2', question: 'A right triangle has legs 6 and 8. What is the hypotenuse?', choices: ['10', '14', '100', '12'], correct: 0, explanation: '6² + 8² = 36 + 64 = 100, so hypotenuse = √100 = 10.' },
          { id: 'geo2_l2_3_q3', question: 'Which set of numbers is a Pythagorean triple?', choices: ['2, 3, 4', '5, 12, 13', '6, 7, 8', '3, 5, 7'], correct: 1, explanation: '5² + 12² = 25 + 144 = 169 = 13². So 5, 12, 13 is a Pythagorean triple.' },
          { id: 'geo2_l2_3_q4', question: 'Is a triangle with sides 7, 24, 25 a right triangle?', choices: ['Yes', 'No', 'Only if angles are right', 'Cannot determine'], correct: 0, explanation: '7² + 24² = 49 + 576 = 625 = 25². Yes, it is a right triangle.' },
          { id: 'geo2_l2_3_q5', question: 'A ladder 13 ft long leans against a wall. Its base is 5 ft from the wall. How high does it reach?', choices: ['8 ft', '10 ft', '12 ft', '18 ft'], correct: 2, explanation: '5² + h² = 13² → 25 + h² = 169 → h² = 144 → h = 12 ft.' },
        ],
      },
      {
        id: 'geo2_l3_1',
        title: 'Coordinate Geometry',
        description: 'Apply geometry concepts on the coordinate plane.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'geo2_l3_1_q1', question: 'What is the distance between points (1,2) and (4,6)?', choices: ['3', '5', '7', '25'], correct: 1, explanation: 'Distance = √((4-1)² + (6-2)²) = √(9+16) = √25 = 5.' },
          { id: 'geo2_l3_1_q2', question: 'What is the midpoint of the segment from (2,4) to (8,10)?', choices: ['(5,7)', '(6,6)', '(3,5)', '(10,14)'], correct: 0, explanation: 'Midpoint = ((2+8)/2, (4+10)/2) = (5, 7).' },
          { id: 'geo2_l3_1_q3', question: 'What is the slope of a line perpendicular to y = 3x + 2?', choices: ['3', '-3', '1/3', '-1/3'], correct: 3, explanation: 'Perpendicular slopes are negative reciprocals. The slope of y=3x+2 is 3, so the perpendicular slope is -1/3.' },
          { id: 'geo2_l3_1_q4', question: 'The equation of a circle centered at (h,k) with radius r is __?', choices: ['(x-h)² + (y-k)² = r', '(x+h)² + (y+k)² = r²', '(x-h)² + (y-k)² = r²', 'x² + y² = r²'], correct: 2, explanation: 'The standard equation of a circle is (x-h)² + (y-k)² = r², where (h,k) is the center.' },
          { id: 'geo2_l3_1_q5', question: 'Three vertices of a parallelogram are (0,0), (4,0), (1,3). What is the fourth vertex?', choices: ['(5,3)', '(3,3)', '(4,3)', '(2,3)'], correct: 0, explanation: 'In a parallelogram, opposite sides are parallel and equal. The fourth vertex is (4+1, 0+3) = (5,3).' },
        ],
      },
      {
        id: 'geo2_l3_2',
        title: 'Surface Area and Volume',
        description: 'Calculate surface area and volume of 3D solids.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'geo2_l3_2_q1', question: 'What is the volume of a cylinder with radius 3 and height 10? (π ≈ 3.14)', choices: ['94.2', '188.4', '282.6', '376.8'], correct: 2, explanation: 'Volume = πr²h = 3.14 × 9 × 10 = 282.6.' },
          { id: 'geo2_l3_2_q2', question: 'What is the surface area of a cube with side length 4?', choices: ['16', '64', '96', '24'], correct: 2, explanation: 'Surface area of a cube = 6s² = 6 × 16 = 96.' },
          { id: 'geo2_l3_2_q3', question: 'The volume of a cone is __ the volume of a cylinder with the same base and height.', choices: ['1/2', '1/3', '2/3', '1/4'], correct: 1, explanation: 'Volume of cone = (1/3)πr²h, which is one-third the volume of the corresponding cylinder.' },
          { id: 'geo2_l3_2_q4', question: 'What is the volume of a sphere with radius 3? (π ≈ 3.14)', choices: ['113.04', '28.26', '37.68', '56.52'], correct: 0, explanation: 'Volume = (4/3)πr³ = (4/3) × 3.14 × 27 ≈ 113.04.' },
          { id: 'geo2_l3_2_q5', question: 'A pyramid with a square base (side 6) and height 4 has volume __?', choices: ['144', '48', '96', '72'], correct: 1, explanation: 'Volume of pyramid = (1/3) × base area × height = (1/3) × 36 × 4 = 48.' },
        ],
      },
      {
        id: 'geo2_l3_3',
        title: 'Geometric Proofs',
        description: 'Write and understand formal geometric proofs.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'geo2_l3_3_q1', question: 'In a proof, each statement must be supported by a __?', choices: ['Guess', 'Reason', 'Diagram', 'Theorem only'], correct: 1, explanation: 'Every statement in a geometric proof must be justified by a reason (definition, postulate, or theorem).' },
          { id: 'geo2_l3_3_q2', question: 'The reflexive property states that a segment or angle is congruent to __?', choices: ['Its supplement', 'Itself', 'Its complement', 'Its opposite'], correct: 1, explanation: 'The reflexive property states that any geometric figure is congruent to itself.' },
          { id: 'geo2_l3_3_q3', question: 'CPCTC stands for: Corresponding Parts of Congruent Triangles are __?', choices: ['Congruent', 'Complementary', 'Concurrent', 'Collinear'], correct: 0, explanation: 'CPCTC is used after proving triangles congruent to conclude their corresponding parts are also congruent.' },
          { id: 'geo2_l3_3_q4', question: 'What is a postulate in geometry?', choices: ['A proven theorem', 'A statement assumed true without proof', 'A definition', 'A corollary'], correct: 1, explanation: 'A postulate (or axiom) is a statement accepted as true without proof — the foundation of geometric reasoning.' },
          { id: 'geo2_l3_3_q5', question: 'The transitive property states: if a = b and b = c, then __?', choices: ['a ≠ c', 'a = c', 'a > c', 'b > a'], correct: 1, explanation: 'The transitive property: if two things are each equal to a third thing, they are equal to each other.' },
        ],
      },
    ],
  },
  {
    id: 'algebra2',
    label: 'Algebra 2',
    emoji: '📈',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'alg2_p1', question: 'What is the standard form of a quadratic equation?', choices: ['y = mx + b', 'ax² + bx + c = 0', 'x² = y', 'y = a(x-h)²+k'], correct: 1, explanation: 'The standard form of a quadratic equation is ax² + bx + c = 0, where a ≠ 0.' },
      { id: 'alg2_p2', question: 'Simplify: (3x²)(4x³)', choices: ['7x⁵', '12x⁵', '12x⁶', '7x⁶'], correct: 1, explanation: 'Multiply coefficients (3×4=12) and add exponents (2+3=5): 12x⁵.' },
      { id: 'alg2_p3', question: 'What is i² (the imaginary unit squared)?', choices: ['1', '-1', 'i', '0'], correct: 1, explanation: 'By definition, i = √(-1), so i² = -1.' },
      { id: 'alg2_p4', question: 'Factor: x² - 9', choices: ['(x-3)²', '(x+3)(x-3)', '(x+9)(x-9)', '(x-3)(x+9)'], correct: 1, explanation: 'x² - 9 is a difference of squares: (x+3)(x-3).' },
      { id: 'alg2_p5', question: 'What are the roots of x² - 5x + 6 = 0?', choices: ['2 and 3', '-2 and -3', '1 and 6', '2 and -3'], correct: 0, explanation: 'Factor: (x-2)(x-3) = 0, so x = 2 or x = 3.' },
      { id: 'alg2_p6', question: 'What is the domain of f(x) = 1/(x-3)?', choices: ['All reals', 'x ≠ 0', 'x ≠ 3', 'x > 3'], correct: 2, explanation: 'The denominator cannot be zero, so x - 3 ≠ 0, meaning x ≠ 3.' },
      { id: 'alg2_p7', question: 'Simplify log₂(8)', choices: ['2', '3', '4', '8'], correct: 1, explanation: 'log₂(8) = log₂(2³) = 3, since 2³ = 8.' },
      { id: 'alg2_p8', question: 'What is the vertex of y = (x-2)² + 5?', choices: ['(-2, 5)', '(2, -5)', '(2, 5)', '(-2, -5)'], correct: 2, explanation: 'In vertex form y = a(x-h)² + k, the vertex is (h, k). Here h=2, k=5, so vertex is (2, 5).' },
      { id: 'alg2_p9', question: 'What does the discriminant b²-4ac tell you about a quadratic?', choices: ['Number of terms', 'Nature of roots', 'Vertex location', 'Axis of symmetry'], correct: 1, explanation: 'The discriminant tells you: positive = 2 real roots, zero = 1 repeated root, negative = 2 complex roots.' },
      { id: 'alg2_p10', question: 'Simplify: √(50)', choices: ['5√2', '5√10', '10√5', '25√2'], correct: 0, explanation: '√50 = √(25×2) = 5√2.' },
      { id: 'alg2_p11', question: 'If log(x) = 3, what is x? (base 10)', choices: ['30', '300', '1000', '3'], correct: 2, explanation: 'log₁₀(x) = 3 means 10³ = x = 1000.' },
      { id: 'alg2_p12', question: 'The sum of an infinite geometric series a/(1-r) is valid when __?', choices: ['r > 1', '|r| < 1', 'r = 1', 'r < 0'], correct: 1, explanation: 'The infinite geometric series converges only when |r| < 1 (the common ratio has absolute value less than 1).' },
    ],
    lessons: [
      {
        id: 'alg2_l1_1',
        title: 'Polynomials and Operations',
        description: 'Add, subtract, multiply, and divide polynomial expressions.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'alg2_l1_1_q1', question: 'What is the degree of 4x³ - 2x² + x - 7?', choices: ['1', '2', '3', '4'], correct: 2, explanation: 'The degree of a polynomial is the highest exponent of the variable. Here it is 3.' },
          { id: 'alg2_l1_1_q2', question: 'Add: (3x² + 2x) + (x² - 5x + 1)', choices: ['4x² - 3x + 1', '4x² + 7x + 1', '2x² - 3x', '3x² - 3x + 1'], correct: 0, explanation: 'Combine like terms: (3+1)x² + (2-5)x + 1 = 4x² - 3x + 1.' },
          { id: 'alg2_l1_1_q3', question: 'Multiply: (x+3)(x-2)', choices: ['x²+x-6', 'x²-x-6', 'x²+5x-6', 'x²-5x+6'], correct: 0, explanation: 'FOIL: x²-2x+3x-6 = x²+x-6.' },
          { id: 'alg2_l1_1_q4', question: 'Factor completely: 2x² + 6x', choices: ['2(x²+3)', '2x(x+3)', 'x(2x+6)', '2(x+3)'], correct: 1, explanation: 'The GCF is 2x. Factor out: 2x(x+3).' },
          { id: 'alg2_l1_1_q5', question: 'What is (x+4)²?', choices: ['x²+16', 'x²+4x+16', 'x²+8x+16', 'x²+16x+16'], correct: 2, explanation: '(x+4)² = x² + 2(4)x + 4² = x² + 8x + 16.' },
        ],
      },
      {
        id: 'alg2_l1_2',
        title: 'Complex Numbers',
        description: 'Work with imaginary and complex numbers.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'alg2_l1_2_q1', question: 'What is √(-16)?', choices: ['4', '-4', '4i', '-4i'], correct: 2, explanation: '√(-16) = √(16) × √(-1) = 4i.' },
          { id: 'alg2_l1_2_q2', question: 'Add: (3 + 2i) + (1 - 5i)', choices: ['4 - 3i', '4 + 7i', '2 - 3i', '4 - 7i'], correct: 0, explanation: 'Add real and imaginary parts separately: (3+1) + (2-5)i = 4 - 3i.' },
          { id: 'alg2_l1_2_q3', question: 'What is i⁴?', choices: ['i', '-1', '1', '-i'], correct: 2, explanation: 'i¹=i, i²=-1, i³=-i, i⁴=1. Powers of i cycle with period 4.' },
          { id: 'alg2_l1_2_q4', question: 'Multiply: (2i)(3i)', choices: ['6i', '-6', '6', '-6i'], correct: 1, explanation: '(2i)(3i) = 6i² = 6(-1) = -6.' },
          { id: 'alg2_l1_2_q5', question: 'The conjugate of (3 - 4i) is __?', choices: ['3 + 4i', '-3 + 4i', '3 - 4i', '-3 - 4i'], correct: 0, explanation: 'The complex conjugate changes the sign of the imaginary part: conjugate of (3-4i) is (3+4i).' },
        ],
      },
      {
        id: 'alg2_l1_3',
        title: 'Factoring Advanced',
        description: 'Factor quadratics, difference of squares, and sum/difference of cubes.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'alg2_l1_3_q1', question: 'Factor: x² + 7x + 12', choices: ['(x+3)(x+4)', '(x+6)(x+2)', '(x+1)(x+12)', '(x-3)(x-4)'], correct: 0, explanation: 'Find two numbers that multiply to 12 and add to 7: 3 and 4. So (x+3)(x+4).' },
          { id: 'alg2_l1_3_q2', question: 'Factor: x² - 25', choices: ['(x-5)²', '(x+5)(x-5)', '(x-5)(x+25)', '(x+5)²'], correct: 1, explanation: 'Difference of squares: x² - 25 = (x+5)(x-5).' },
          { id: 'alg2_l1_3_q3', question: 'Factor: x³ - 8', choices: ['(x-2)(x²+2x+4)', '(x-2)³', '(x-2)(x²-2x+4)', '(x+2)(x²-2x+4)'], correct: 0, explanation: 'Difference of cubes: a³-b³=(a-b)(a²+ab+b²). Here a=x, b=2: (x-2)(x²+2x+4).' },
          { id: 'alg2_l1_3_q4', question: 'Factor: 6x² + 11x + 3', choices: ['(2x+3)(3x+1)', '(6x+1)(x+3)', '(3x+3)(2x+1)', '(2x+1)(3x+3)'], correct: 0, explanation: 'Factor by AC method or trial: (2x+3)(3x+1) = 6x²+2x+9x+3 = 6x²+11x+3.' },
          { id: 'alg2_l1_3_q5', question: 'What are the solutions to (x-5)(x+2) = 0?', choices: ['x=5 and x=2', 'x=-5 and x=2', 'x=5 and x=-2', 'x=-5 and x=-2'], correct: 2, explanation: 'By the zero product property: x-5=0 → x=5, or x+2=0 → x=-2.' },
        ],
      },
      {
        id: 'alg2_l2_1',
        title: 'Rational Functions',
        description: 'Analyze rational functions and their asymptotes.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'alg2_l2_1_q1', question: 'A vertical asymptote occurs where the denominator equals __?', choices: ['1', '0', 'The numerator', 'Infinity'], correct: 1, explanation: 'Vertical asymptotes occur where the denominator = 0 (and the numerator ≠ 0).' },
          { id: 'alg2_l2_1_q2', question: 'For f(x) = (x+1)/(x-2), what is the vertical asymptote?', choices: ['x = -1', 'x = 2', 'y = 2', 'x = 1'], correct: 1, explanation: 'Set denominator to zero: x - 2 = 0 → x = 2.' },
          { id: 'alg2_l2_1_q3', question: 'The horizontal asymptote of f(x) = 3x/(x+1) as x→∞ is __?', choices: ['y = 0', 'y = 1', 'y = 3', 'y = -1'], correct: 2, explanation: 'When degrees are equal, the horizontal asymptote is the ratio of leading coefficients: 3/1 = 3.' },
          { id: 'alg2_l2_1_q4', question: 'Simplify: (x²-4)/(x-2)', choices: ['x+2', 'x-2', 'x²+2', '(x+2)(x-2)'], correct: 0, explanation: 'x²-4 = (x+2)(x-2). Dividing by (x-2) gives x+2 (where x≠2).' },
          { id: 'alg2_l2_1_q5', question: 'A hole in a rational function occurs when a factor cancels from __?', choices: ['Only denominator', 'Only numerator', 'Both numerator and denominator', 'Neither'], correct: 2, explanation: 'A hole occurs when the same factor cancels from both the numerator and denominator.' },
        ],
      },
      {
        id: 'alg2_l2_2',
        title: 'Exponential Functions',
        description: 'Explore exponential growth, decay, and their graphs.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'alg2_l2_2_q1', question: 'In f(x) = 2^x, as x increases, f(x) __?', choices: ['Decreases', 'Stays constant', 'Increases', 'Oscillates'], correct: 2, explanation: 'For base > 1, exponential functions grow rapidly as x increases.' },
          { id: 'alg2_l2_2_q2', question: 'Which represents exponential decay?', choices: ['f(x) = 2^x', 'f(x) = (0.5)^x', 'f(x) = x²', 'f(x) = 2x'], correct: 1, explanation: 'A base between 0 and 1 gives exponential decay, as each step multiplies by a fraction.' },
          { id: 'alg2_l2_2_q3', question: 'What is 4^(3/2)?', choices: ['6', '8', '12', '16'], correct: 1, explanation: '4^(3/2) = (4^(1/2))³ = 2³ = 8.' },
          { id: 'alg2_l2_2_q4', question: 'The natural exponential base e is approximately __?', choices: ['2.72', '3.14', '1.41', '1.73'], correct: 0, explanation: 'Euler\'s number e ≈ 2.71828, commonly approximated as 2.72.' },
          { id: 'alg2_l2_2_q5', question: 'A population doubles every 5 years. Starting at 100, after 10 years it is __?', choices: ['200', '300', '400', '500'], correct: 2, explanation: 'After 5 years: 200. After 10 years: 400. It doubles twice.' },
        ],
      },
      {
        id: 'alg2_l2_3',
        title: 'Radical Expressions',
        description: 'Simplify and solve equations with radicals.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'alg2_l2_3_q1', question: 'Simplify: √72', choices: ['6√2', '8√3', '6√3', '9√2'], correct: 0, explanation: '√72 = √(36×2) = 6√2.' },
          { id: 'alg2_l2_3_q2', question: 'Solve: √(x+3) = 5', choices: ['x=22', 'x=28', 'x=22', 'x=2'], correct: 0, explanation: 'Square both sides: x+3 = 25 → x = 22.' },
          { id: 'alg2_l2_3_q3', question: 'What is 27^(1/3)?', choices: ['3', '9', '7', '6'], correct: 0, explanation: '27^(1/3) = ∛27 = 3 because 3³ = 27.' },
          { id: 'alg2_l2_3_q4', question: 'Rationalize the denominator: 5/√3', choices: ['5√3/3', '5/3', '√15/3', '5√3'], correct: 0, explanation: 'Multiply numerator and denominator by √3: (5√3)/(√3×√3) = 5√3/3.' },
          { id: 'alg2_l2_3_q5', question: 'Which is the domain of f(x) = √(x-4)?', choices: ['x > 4', 'x ≥ 4', 'x ≤ 4', 'All reals'], correct: 1, explanation: 'The radicand must be ≥ 0: x-4 ≥ 0 → x ≥ 4.' },
        ],
      },
      {
        id: 'alg2_l3_1',
        title: 'Logarithms',
        description: 'Understand logarithms and solve logarithmic equations.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'alg2_l3_1_q1', question: 'log_b(x) = y means __?', choices: ['b^x = y', 'y^b = x', 'b^y = x', 'x^b = y'], correct: 2, explanation: 'log_b(x) = y is equivalent to b^y = x. The logarithm is the exponent.' },
          { id: 'alg2_l3_1_q2', question: 'log(AB) = __?', choices: ['log A + log B', 'log A × log B', 'log A - log B', 'log A / log B'], correct: 0, explanation: 'Product rule: log(AB) = log A + log B.' },
          { id: 'alg2_l3_1_q3', question: 'Solve: log₃(x) = 4', choices: ['x=12', 'x=64', 'x=81', 'x=34'], correct: 2, explanation: 'log₃(x) = 4 → x = 3⁴ = 81.' },
          { id: 'alg2_l3_1_q4', question: 'ln(e³) = __?', choices: ['e', '3', '3e', 'e³'], correct: 1, explanation: 'ln is log base e. ln(e³) = 3 because e³ = e³.' },
          { id: 'alg2_l3_1_q5', question: 'Solve: 2^x = 32', choices: ['x=4', 'x=5', 'x=6', 'x=16'], correct: 1, explanation: '2^x = 32 = 2⁵, so x = 5.' },
        ],
      },
      {
        id: 'alg2_l3_2',
        title: 'Sequences and Series',
        description: 'Work with arithmetic and geometric sequences and series.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'alg2_l3_2_q1', question: 'An arithmetic sequence has a common __?', choices: ['Ratio', 'Difference', 'Product', 'Exponent'], correct: 1, explanation: 'In an arithmetic sequence, consecutive terms differ by a constant called the common difference.' },
          { id: 'alg2_l3_2_q2', question: 'Find the 10th term of 2, 5, 8, 11, ... (arithmetic)', choices: ['29', '32', '35', '30'], correct: 0, explanation: 'Common difference d=3. a₁₀ = 2 + (10-1)×3 = 2+27 = 29.' },
          { id: 'alg2_l3_2_q3', question: 'A geometric sequence has a common __?', choices: ['Difference', 'Sum', 'Ratio', 'Exponent'], correct: 2, explanation: 'In a geometric sequence, each term is multiplied by a constant called the common ratio.' },
          { id: 'alg2_l3_2_q4', question: 'Sum of first n terms of arithmetic: Sₙ = n(a₁+aₙ)/2. For 1+2+...+100, S₁₀₀ = __?', choices: ['5000', '5050', '10100', '4950'], correct: 1, explanation: 'S₁₀₀ = 100(1+100)/2 = 100×101/2 = 5050.' },
          { id: 'alg2_l3_2_q5', question: 'Infinite geometric series with a=10, r=0.5 sums to __?', choices: ['15', '20', '25', '10'], correct: 1, explanation: 'Sum = a/(1-r) = 10/(1-0.5) = 10/0.5 = 20.' },
        ],
      },
      {
        id: 'alg2_l3_3',
        title: 'Conic Sections',
        description: 'Identify and graph parabolas, circles, ellipses, and hyperbolas.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'alg2_l3_3_q1', question: 'x²/9 + y²/4 = 1 is the equation of a(n) __?', choices: ['Parabola', 'Circle', 'Ellipse', 'Hyperbola'], correct: 2, explanation: 'When two positive squared terms are added and equal 1 with different denominators, it is an ellipse.' },
          { id: 'alg2_l3_3_q2', question: 'x²/9 - y²/4 = 1 is the equation of a(n) __?', choices: ['Ellipse', 'Parabola', 'Circle', 'Hyperbola'], correct: 3, explanation: 'When one squared term is subtracted from another equaling 1, it is a hyperbola.' },
          { id: 'alg2_l3_3_q3', question: 'The focus of a parabola y = x²/(4p) is at __?', choices: ['(p, 0)', '(0, p)', '(0, -p)', '(-p, 0)'], correct: 1, explanation: 'For a vertical parabola y = x²/(4p), the focus is at (0, p).' },
          { id: 'alg2_l3_3_q4', question: 'x² + y² = 25 is a circle with radius __?', choices: ['25', '5', '10', '√25'], correct: 1, explanation: 'x² + y² = r², so r² = 25 → r = 5.' },
          { id: 'alg2_l3_3_q5', question: 'In an ellipse x²/a² + y²/b² = 1, a is the __?', choices: ['Minor radius', 'Major radius', 'Focus distance', 'Center'], correct: 1, explanation: 'When a > b, a is the semi-major axis (half the longer diameter) and b is the semi-minor axis.' },
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
    hasPlacement: true,
    placementQuestions: [
      { id: 'ush-p1', question: 'Which document declared American independence from Britain?', choices: ['The Constitution', 'The Declaration of Independence', 'The Magna Carta', 'The Bill of Rights'], correct: 1, explanation: 'The Declaration of Independence was adopted July 4, 1776.' },
      { id: 'ush-p2', question: 'The first permanent English settlement in America was:', choices: ['Plymouth', 'Boston', 'Jamestown', 'Philadelphia'], correct: 2, explanation: 'Jamestown, Virginia, founded in 1607, was the first permanent English settlement.' },
      { id: 'ush-p3', question: 'What was the main cash crop that drove Virginia\'s early economy?', choices: ['Cotton', 'Tobacco', 'Sugar', 'Rice'], correct: 1, explanation: 'Tobacco became the economic backbone of colonial Virginia.' },
      { id: 'ush-p4', question: 'Who wrote the Declaration of Independence?', choices: ['George Washington', 'Benjamin Franklin', 'John Adams', 'Thomas Jefferson'], correct: 3, explanation: 'Thomas Jefferson was the principal author of the Declaration of Independence.' },
      { id: 'ush-p5', question: 'The Missouri Compromise of 1820 dealt primarily with:', choices: ['Tariffs on imported goods', 'The extension of slavery into new territories', 'Native American land rights', 'Relations with Britain'], correct: 1, explanation: 'It drew a line at 36°30\'N, restricting where slavery could expand.' },
      { id: 'ush-p6', question: 'Which event directly triggered the start of the Civil War?', choices: ['John Brown\'s raid on Harper\'s Ferry', 'Abraham Lincoln\'s election', 'The attack on Fort Sumter', 'The Dred Scott decision'], correct: 2, explanation: 'Confederate forces fired on Fort Sumter, South Carolina, in April 1861.' },
      { id: 'ush-p7', question: 'The Emancipation Proclamation (1863) freed enslaved people in:', choices: ['All US states', 'Confederate states in rebellion', 'Only Washington D.C.', 'Border states loyal to the Union'], correct: 1, explanation: 'It applied only to Confederate states in rebellion, not border states.' },
      { id: 'ush-p8', question: 'What was the purpose of the Sherman Antitrust Act (1890)?', choices: ['To regulate railroad rates', 'To break up monopolies and promote competition', 'To protect workers\' rights', 'To limit immigration'], correct: 1, explanation: 'It targeted business monopolies that stifled competition.' },
      { id: 'ush-p9', question: 'The US entered World War II following the attack on:', choices: ['Midway', 'Guadalcanal', 'Pearl Harbor', 'Wake Island'], correct: 2, explanation: 'Japan attacked Pearl Harbor on December 7, 1941, prompting the US declaration of war.' },
      { id: 'ush-p10', question: 'The 19th Amendment (1920) granted suffrage to:', choices: ['African Americans', 'Native Americans', 'Women', 'Men aged 18–21'], correct: 2, explanation: 'The 19th Amendment gave women the right to vote.' },
      { id: 'ush-p11', question: 'Brown v. Board of Education (1954) ruled that:', choices: ['Segregation in schools was constitutional', 'Separate but equal schools were unconstitutional', 'Busing students was required', 'Prayer in schools was illegal'], correct: 1, explanation: 'The Supreme Court unanimously struck down "separate but equal" in public schools.' },
      { id: 'ush-p12', question: 'The Civil Rights Act of 1964 prohibited discrimination based on:', choices: ['Income and age only', 'Race, color, religion, sex, and national origin', 'Political affiliation', 'Educational background'], correct: 1, explanation: 'It banned discrimination in public accommodations and employment.' },
    ],
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
  hasPlacement: true,
  placementQuestions: [
    { id: 'wh-p1', question: 'Which river was most essential to ancient Egyptian civilization?', choices: ['Tigris', 'Euphrates', 'Nile', 'Indus'], correct: 2, explanation: 'The Nile\'s annual floods deposited rich silt that sustained Egyptian agriculture.' },
    { id: 'wh-p2', question: 'The ancient Greeks developed the earliest form of:', choices: ['Monarchy', 'Democracy', 'Feudalism', 'Communism'], correct: 1, explanation: 'Athens pioneered direct democracy in the 5th century BCE.' },
    { id: 'wh-p3', question: 'The feudal system in medieval Europe was based on:', choices: ['Trade and commerce', 'Exchanges of land for military service', 'Democratic elections', 'Religious authority alone'], correct: 1, explanation: 'Lords granted land (fiefs) to vassals in exchange for military loyalty.' },
    { id: 'wh-p4', question: 'The Black Death of the 14th century was caused by:', choices: ['Cholera', 'Smallpox', 'Bubonic plague', 'Typhus'], correct: 2, explanation: 'Bubonic plague, spread by fleas on rats, killed roughly one-third of Europe.' },
    { id: 'wh-p5', question: 'Columbus reached the Americas in:', choices: ['1492', '1498', '1488', '1502'], correct: 0, explanation: 'Columbus made his first voyage in 1492, landing in the Caribbean.' },
    { id: 'wh-p6', question: 'The French Revolution began in:', choices: ['1776', '1789', '1799', '1804'], correct: 1, explanation: 'The storming of the Bastille on July 14, 1789, marked the revolution\'s start.' },
    { id: 'wh-p7', question: 'Napoleon Bonaparte was finally defeated at the Battle of:', choices: ['Trafalgar', 'Austerlitz', 'Waterloo', 'Leipzig'], correct: 2, explanation: 'Napoleon was defeated at Waterloo in 1815, ending his rule.' },
    { id: 'wh-p8', question: 'The assassination that triggered World War I was the killing of:', choices: ['Kaiser Wilhelm II', 'Archduke Franz Ferdinand', 'Tsar Nicholas II', 'King George V'], correct: 1, explanation: 'Archduke Franz Ferdinand of Austria was assassinated in Sarajevo in 1914.' },
    { id: 'wh-p9', question: 'The Treaty of Versailles (1919) blamed WWI on:', choices: ['Austria-Hungary', 'The Ottoman Empire', 'Germany', 'Russia'], correct: 2, explanation: 'The "war guilt clause" placed full blame on Germany, leading to heavy reparations.' },
    { id: 'wh-p10', question: 'The Soviet Union was formally dissolved in:', choices: ['1989', '1991', '1993', '1985'], correct: 1, explanation: 'The USSR officially dissolved on December 25, 1991.' },
    { id: 'wh-p11', question: 'The Berlin Wall fell in:', choices: ['1987', '1988', '1989', '1991'], correct: 2, explanation: 'The Berlin Wall fell on November 9, 1989, symbolizing the end of the Cold War.' },
    { id: 'wh-p12', question: 'The policy of apartheid was practiced in:', choices: ['Kenya', 'Nigeria', 'South Africa', 'Zimbabwe'], correct: 2, explanation: 'South Africa enforced racial segregation under apartheid from 1948 to 1994.' },
  ],
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
  hasPlacement: true,
  placementQuestions: [
    { id: 'geo-p1', question: 'How many continents are there on Earth?', choices: ['5', '6', '7', '8'], correct: 2, explanation: 'Earth has 7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, South America.' },
    { id: 'geo-p2', question: 'Which is the largest ocean?', choices: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3, explanation: 'The Pacific Ocean is the largest, covering about one-third of Earth\'s surface.' },
    { id: 'geo-p3', question: 'Lines of latitude run:', choices: ['North to south', 'East to west (horizontally)', 'Diagonally', 'Through the poles'], correct: 1, explanation: 'Latitude lines run east-west and measure distance north or south of the equator.' },
    { id: 'geo-p4', question: 'The Prime Meridian passes through:', choices: ['Paris, France', 'Greenwich, England', 'Cairo, Egypt', 'Washington D.C.'], correct: 1, explanation: 'The Prime Meridian (0° longitude) runs through Greenwich, England.' },
    { id: 'geo-p5', question: 'A tropical rainforest biome is characterized by:', choices: ['Cold winters and hot summers', 'High rainfall and consistent warm temperatures year-round', 'Dry conditions with sparse vegetation', 'Seasonal freezing'], correct: 1, explanation: 'Tropical rainforests receive heavy rainfall and stay warm all year.' },
    { id: 'geo-p6', question: 'The process of people moving from rural areas to cities is called:', choices: ['Migration', 'Urbanization', 'Emigration', 'Gentrification'], correct: 1, explanation: 'Urbanization is the increase in the proportion of people living in cities.' },
    { id: 'geo-p7', question: 'Which country has the largest population?', choices: ['United States', 'India', 'China', 'Russia'], correct: 1, explanation: 'India surpassed China in 2023 to become the world\'s most populous country.' },
    { id: 'geo-p8', question: 'The Sahara Desert is located on which continent?', choices: ['Asia', 'South America', 'Australia', 'Africa'], correct: 3, explanation: 'The Sahara, the world\'s largest hot desert, spans northern Africa.' },
    { id: 'geo-p9', question: 'Tectonic plates moving apart create:', choices: ['Subduction zones', 'Mountain ranges from collision', 'Mid-ocean ridges and rift valleys', 'Earthquakes only'], correct: 2, explanation: 'Divergent boundaries produce mid-ocean ridges and rift valleys as plates pull apart.' },
    { id: 'geo-p10', question: 'The Amazon River is located in:', choices: ['Africa', 'Asia', 'South America', 'North America'], correct: 2, explanation: 'The Amazon, the world\'s largest river by discharge, flows through South America.' },
    { id: 'geo-p11', question: 'A country\'s GDP per capita measures:', choices: ['Total population', 'Total military spending', 'Average economic output per person', 'Land area'], correct: 2, explanation: 'GDP per capita divides a country\'s total output by its population.' },
    { id: 'geo-p12', question: 'The Ring of Fire refers to:', choices: ['Volcanic activity around the Pacific Ocean', 'Desert regions in Africa', 'Hurricane paths in the Atlantic', 'Tropical rainforests in Asia'], correct: 0, explanation: 'The Ring of Fire is a zone of intense seismic and volcanic activity surrounding the Pacific.' },
  ],
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
  hasPlacement: true,
  placementQuestions: [
    { id: 'civ-p1', question: 'The U.S. Constitution was ratified in:', choices: ['1776', '1781', '1788', '1800'], correct: 2, explanation: 'The Constitution was ratified in 1788, replacing the Articles of Confederation.' },
    { id: 'civ-p2', question: 'The three branches of the U.S. federal government are:', choices: ['Federal, state, local', 'Legislative, executive, judicial', 'Senate, House, Supreme Court', 'President, Congress, Courts'], correct: 1, explanation: 'The three branches are legislative (Congress), executive (President), and judicial (courts).' },
    { id: 'civ-p3', question: 'How many amendments are in the Bill of Rights?', choices: ['5', '8', '10', '12'], correct: 2, explanation: 'The Bill of Rights consists of the first 10 amendments to the Constitution.' },
    { id: 'civ-p4', question: 'Which amendment abolished slavery?', choices: ['13th', '14th', '15th', '19th'], correct: 0, explanation: 'The 13th Amendment (1865) abolished slavery throughout the United States.' },
    { id: 'civ-p5', question: 'The Senate has how many members?', choices: ['100', '435', '50', '535'], correct: 0, explanation: 'The Senate has 100 members — two from each of the 50 states.' },
    { id: 'civ-p6', question: 'Judicial review — the power to strike down unconstitutional laws — was established by:', choices: ['The Constitution itself', 'Marbury v. Madison (1803)', 'McCulloch v. Maryland', 'Congress in 1789'], correct: 1, explanation: 'Chief Justice John Marshall established judicial review in Marbury v. Madison.' },
    { id: 'civ-p7', question: 'A filibuster in the Senate allows senators to:', choices: ['Speed up a vote', 'Delay or block legislation by prolonged debate', 'Override a presidential veto', 'Propose constitutional amendments'], correct: 1, explanation: 'A filibuster uses extended debate to delay or prevent a vote.' },
    { id: 'civ-p8', question: 'To override a presidential veto, Congress needs:', choices: ['A simple majority', 'Three-fifths of both chambers', 'A two-thirds vote in both chambers', 'A unanimous vote'], correct: 2, explanation: 'A veto override requires two-thirds of both the House and Senate.' },
    { id: 'civ-p9', question: 'The 10th Amendment reserves powers not delegated to the federal government to:', choices: ['The President', 'Congress', 'The states and the people', 'The Supreme Court'], correct: 2, explanation: 'The 10th Amendment is the basis of states\' rights and federalism.' },
    { id: 'civ-p10', question: 'The United Nations was founded primarily to:', choices: ['Manage global trade', 'Promote international peace and security', 'Create a world government', 'Regulate currency exchange'], correct: 1, explanation: 'The UN was established in 1945 to maintain international peace after WWII.' },
    { id: 'civ-p11', question: 'NATO is a:', choices: ['Trade agreement', 'Military alliance', 'Environmental treaty', 'Financial institution'], correct: 1, explanation: 'The North Atlantic Treaty Organization is a mutual defense military alliance.' },
    { id: 'civ-p12', question: 'The concept of "checks and balances" ensures:', choices: ['Equal pay for all citizens', 'No single branch has unchecked power', 'States have more power than the federal government', 'The President can veto anything'], correct: 1, explanation: 'Checks and balances prevent any one branch from becoming too powerful.' },
  ],
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
  hasPlacement: true,
  placementQuestions: [
    { id: 'eco-p1', question: 'If demand for a product increases and supply stays the same, the price will:', choices: ['Fall', 'Stay the same', 'Rise', 'Become zero'], correct: 2, explanation: 'Higher demand with constant supply pushes prices up.' },
    { id: 'eco-p2', question: 'A "market" in economics refers to:', choices: ['A physical store', 'Any place where buyers and sellers exchange goods or services', 'A government program', 'A type of advertisement'], correct: 1, explanation: 'A market is any mechanism where buyers and sellers interact to exchange value.' },
    { id: 'eco-p3', question: 'In a monopoly, there is:', choices: ['Many sellers and one buyer', 'One seller controlling the market', 'Perfect competition', 'Two sellers splitting the market'], correct: 1, explanation: 'A monopoly exists when a single seller dominates a market with no close substitutes.' },
    { id: 'eco-p4', question: 'An oligopoly is characterized by:', choices: ['One dominant firm', 'A few large firms dominating the market', 'Many small competing firms', 'Government ownership'], correct: 1, explanation: 'An oligopoly is a market structure with a small number of dominant firms.' },
    { id: 'eco-p5', question: 'GDP stands for:', choices: ['General Domestic Price', 'Gross Domestic Product', 'Government Deficit Plan', 'Global Development Program'], correct: 1, explanation: 'GDP (Gross Domestic Product) measures the total value of goods and services produced in a country.' },
    { id: 'eco-p6', question: 'Inflation means:', choices: ['A decrease in the money supply', 'A general rise in price levels over time', 'A fall in the unemployment rate', 'An increase in GDP'], correct: 1, explanation: 'Inflation is the rate at which the general level of prices rises, reducing purchasing power.' },
    { id: 'eco-p7', question: 'A credit score measures:', choices: ['Your annual income', 'Your likelihood of repaying debt', 'Your total savings', 'Your spending habits'], correct: 1, explanation: 'A credit score helps lenders assess how likely you are to repay borrowed money.' },
    { id: 'eco-p8', question: 'Compound interest means you earn interest on:', choices: ['Your original principal only', 'Other people\'s accounts', 'Your principal plus previously earned interest', 'The inflation rate'], correct: 2, explanation: 'Compound interest grows exponentially because you earn interest on interest.' },
    { id: 'eco-p9', question: 'Fiscal policy refers to government use of:', choices: ['Interest rate changes', 'Printing money', 'Taxation and spending to influence the economy', 'Trade tariffs'], correct: 2, explanation: 'Fiscal policy uses government spending and taxation to manage economic conditions.' },
    { id: 'eco-p10', question: 'The Federal Reserve controls monetary policy primarily by:', choices: ['Setting income tax rates', 'Adjusting federal interest rates', 'Passing spending bills', 'Regulating international trade'], correct: 1, explanation: 'The Fed uses interest rate changes to control inflation and employment.' },
    { id: 'eco-p11', question: 'A tariff is:', choices: ['A type of subsidy', 'A tax on imported goods', 'A trade agreement', 'A currency exchange fee'], correct: 1, explanation: 'Tariffs are taxes on imports, making foreign goods more expensive to protect domestic industries.' },
    { id: 'eco-p12', question: 'Comparative advantage means a country should produce goods it can make:', choices: ['Faster than anyone else', 'At the lowest opportunity cost', 'Using the most workers', 'Without any imports'], correct: 1, explanation: 'Comparative advantage favors specialization based on relative opportunity costs.' },
  ],
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
  hasPlacement: true,
  placementQuestions: [
    { id: 'car-p1', question: 'A career cluster is:', choices: ['A group of related jobs and industries', 'A type of job interview', 'A professional license', 'A college degree'], correct: 0, explanation: 'Career clusters group related occupations to help students plan education and career paths.' },
    { id: 'car-p2', question: 'Which section of a resume lists your past jobs?', choices: ['Objective', 'Education', 'Work Experience', 'References'], correct: 2, explanation: 'The Work Experience section details previous employment, duties, and dates.' },
    { id: 'car-p3', question: 'A cover letter should:', choices: ['List every job you\'ve ever had', 'Be identical for every application', 'Explain why you\'re a strong fit for that specific job', 'Replace the resume'], correct: 2, explanation: 'A cover letter is tailored to show why your skills match the specific role.' },
    { id: 'car-p4', question: 'A W-2 form shows:', choices: ['Your credit score', 'Total wages earned and taxes withheld for the year', 'Your health insurance plan', 'Your Social Security benefits'], correct: 1, explanation: 'Employers provide W-2 forms annually showing earnings and withheld taxes for filing taxes.' },
    { id: 'car-p5', question: 'In the workplace, "professionalism" includes:', choices: ['Only wearing formal clothes', 'Being reliable, respectful, and meeting deadlines', 'Never disagreeing with a supervisor', 'Working without breaks'], correct: 1, explanation: 'Professionalism covers conduct, communication, reliability, and respect in the workplace.' },
    { id: 'car-p6', question: 'Active listening means:', choices: ['Hearing background noise', 'Fully concentrating on, understanding, and responding to the speaker', 'Waiting for your turn to speak', 'Nodding without processing information'], correct: 1, explanation: 'Active listening involves full engagement — focusing, understanding, and responding thoughtfully.' },
    { id: 'car-p7', question: 'Gross pay is:', choices: ['Pay after taxes are deducted', 'Your total earnings before any deductions', 'Only your hourly wage', 'Bonus income only'], correct: 1, explanation: 'Gross pay is your total earnings before taxes, insurance, or other deductions.' },
    { id: 'car-p8', question: 'An emergency fund should typically cover:', choices: ['One week of expenses', 'One month of bills only', '3–6 months of living expenses', 'Your entire annual salary'], correct: 2, explanation: 'Financial experts recommend saving 3–6 months of expenses for emergencies.' },
    { id: 'car-p9', question: 'A startup is:', choices: ['A large established corporation', 'A newly founded company typically built around an innovative idea', 'A government agency', 'A franchise location'], correct: 1, explanation: 'Startups are new businesses, often tech-focused, aiming for rapid growth.' },
    { id: 'car-p10', question: 'Networking in a career context means:', choices: ['Setting up computer networks', 'Building professional relationships that can lead to opportunities', 'Cold-calling companies for jobs', 'Taking online courses'], correct: 1, explanation: 'Professional networking involves building connections that can help with career advancement.' },
    { id: 'car-p11', question: 'Venture capital is money invested in:', choices: ['Government bonds', 'High-risk startups in exchange for equity', 'Real estate only', 'Established blue-chip stocks'], correct: 1, explanation: 'Venture capitalists invest in early-stage companies with high growth potential in exchange for ownership stakes.' },
    { id: 'car-p12', question: 'A business plan typically includes:', choices: ['Only financial projections', 'Executive summary, market analysis, operations, and financial plan', 'Just the product description', 'A list of employees'], correct: 1, explanation: 'A business plan outlines the company\'s goals, strategies, market, and financial projections.' },
  ],
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
  hasPlacement: true,
  placementQuestions: [
    { id: 'fr-p1', question: 'How do you say "Hello" in French?', choices: ['Salut only', 'Bonjour', 'Bonsoir', 'Au revoir'], correct: 1, explanation: '"Bonjour" is the standard French greeting meaning "Good day/Hello."' },
    { id: 'fr-p2', question: 'What does "Merci" mean?', choices: ['Please', 'Excuse me', 'Thank you', 'You\'re welcome'], correct: 2, explanation: '"Merci" means "Thank you" in French.' },
    { id: 'fr-p3', question: 'The French word for "the" (feminine singular) is:', choices: ['Le', 'Les', 'Un', 'La'], correct: 3, explanation: '"La" is the feminine definite article. "Le" is masculine, "Les" is plural.' },
    { id: 'fr-p4', question: '"Rouge" means:', choices: ['Blue', 'Green', 'Red', 'Yellow'], correct: 2, explanation: '"Rouge" = red in French.' },
    { id: 'fr-p5', question: 'Which is the correct present tense of "parler" (to speak) for "je" (I)?', choices: ['je parles', 'je parle', 'je parlons', 'je parlez'], correct: 1, explanation: '"Je parle" — first person singular of -er verbs drops the final -s.' },
    { id: 'fr-p6', question: '"Nous mangeons" means:', choices: ['You eat', 'They eat', 'We eat', 'I eat'], correct: 2, explanation: '"Nous" = we, "mangeons" = eat. "We eat."' },
    { id: 'fr-p7', question: 'How do you say "It is 3 o\'clock" in French?', choices: ['Il est trois heures', 'Il y a trois heures', 'C\'est trois temps', 'Il fait trois heures'], correct: 0, explanation: '"Il est trois heures" = "It is three o\'clock."' },
    { id: 'fr-p8', question: '"Vingt-cinq" means:', choices: ['15', '20', '24', '25'], correct: 3, explanation: '"Vingt" = 20, "cinq" = 5, so "vingt-cinq" = 25.' },
    { id: 'fr-p9', question: 'The passé composé is formed with:', choices: ['Just the past participle', 'Avoir or être + past participle', 'The imperfect stem + endings', 'The infinitive + a suffix'], correct: 1, explanation: 'Passé composé = auxiliary verb (avoir or être) + past participle.' },
    { id: 'fr-p10', question: 'Which verb takes "être" as its auxiliary in passé composé?', choices: ['Manger (to eat)', 'Parler (to speak)', 'Aller (to go)', 'Finir (to finish)'], correct: 2, explanation: 'Aller (to go) uses être: "Je suis allé(e)" = "I went."' },
    { id: 'fr-p11', question: '"J\'ai mangé" means:', choices: ['I eat', 'I was eating', 'I ate / I have eaten', 'I will eat'], correct: 2, explanation: '"J\'ai mangé" is passé composé: "I ate" or "I have eaten."' },
    { id: 'fr-p12', question: 'The negative in French is formed by placing ___ around the verb:', choices: ['non...pas', 'ne...pas', 'no...pas', 'n\'...rien'], correct: 1, explanation: '"Ne...pas" wraps around the conjugated verb: "Je ne parle pas" = "I don\'t speak."' },
  ],
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
  hasPlacement: true,
  placementQuestions: [
    { id: 'de-p1', question: 'How do you say "Good morning" in German?', choices: ['Guten Abend', 'Guten Tag', 'Guten Morgen', 'Gute Nacht'], correct: 2, explanation: '"Guten Morgen" = "Good morning."' },
    { id: 'de-p2', question: '"Danke" means:', choices: ['Please', 'Thank you', 'Excuse me', 'Hello'], correct: 1, explanation: '"Danke" = "Thank you" in German.' },
    { id: 'de-p3', question: 'Which article is used for masculine nouns in German (nominative)?', choices: ['Die', 'Das', 'Der', 'Den'], correct: 2, explanation: '"Der" is the masculine nominative definite article.' },
    { id: 'de-p4', question: '"Das Buch" means:', choices: ['The car', 'The book', 'The house', 'The table'], correct: 1, explanation: '"Buch" = book; "das" is the neuter article.' },
    { id: 'de-p5', question: 'Which is correct for "I go" in German?', choices: ['Ich gehe', 'Ich gehst', 'Ich geht', 'Ich gehen'], correct: 0, explanation: '"Ich gehe" — first person singular of "gehen" (to go).' },
    { id: 'de-p6', question: '"Wir spielen" means:', choices: ['He plays', 'You play', 'We play', 'They play'], correct: 2, explanation: '"Wir" = we, "spielen" = play. "We play."' },
    { id: 'de-p7', question: 'In German, the accusative case is used for:', choices: ['The subject of the sentence', 'The direct object', 'Indirect objects', 'Possessives'], correct: 1, explanation: 'The accusative case marks the direct object of a verb.' },
    { id: 'de-p8', question: '"Den Mann" (accusative) — which gender is "Mann"?', choices: ['Feminine', 'Neuter', 'Masculine', 'Plural'], correct: 2, explanation: '"Den" is the masculine accusative article, so "Mann" (man) is masculine.' },
    { id: 'de-p9', question: 'The Perfekt tense in German is used for:', choices: ['Future events', 'Completed past actions in speech', 'Ongoing past actions', 'Commands'], correct: 1, explanation: 'Perfekt is the conversational past tense for completed actions.' },
    { id: 'de-p10', question: '"Ich habe gespielt" means:', choices: ['I play', 'I am playing', 'I played / I have played', 'I will play'], correct: 2, explanation: '"Habe gespielt" is Perfekt of "spielen": "I played / I have played."' },
    { id: 'de-p11', question: 'Which auxiliary verb is used with "gehen" (to go) in Perfekt?', choices: ['Haben', 'Sein', 'Werden', 'Können'], correct: 1, explanation: 'Motion verbs like "gehen" use "sein": "Ich bin gegangen" = "I went."' },
    { id: 'de-p12', question: '"Nicht" is used to negate:', choices: ['Only nouns', 'Verbs, adjectives, and adverbs', 'Only adjectives', 'Prepositions only'], correct: 1, explanation: '"Nicht" negates verbs, adjectives, and adverbs: "Ich gehe nicht" = "I don\'t go."' },
  ],
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
  hasPlacement: true,
  placementQuestions: [
    { id: 'lat-p1', question: 'The Latin root "port" means:', choices: ['To write', 'To carry', 'To see', 'To speak'], correct: 1, explanation: '"Portare" = to carry; seen in export, import, transport.' },
    { id: 'lat-p2', question: '"Carpe diem" translates to:', choices: ['Time flies', 'Seize the day', 'In the moment', 'To each their own'], correct: 1, explanation: '"Carpe diem" = "Seize the day," from the poet Horace.' },
    { id: 'lat-p3', question: 'The prefix "bene-" means:', choices: ['Bad', 'Against', 'Well/good', 'Before'], correct: 2, explanation: '"Bene" = well/good: benefit, benevolent, benediction.' },
    { id: 'lat-p4', question: '"Aqua" in Latin means:', choices: ['Fire', 'Earth', 'Air', 'Water'], correct: 3, explanation: '"Aqua" = water; gives us aquarium, aquatic, aqueduct.' },
    { id: 'lat-p5', question: 'In Latin, nouns change endings based on their:', choices: ['Color', 'Size', 'Grammatical function (case)', 'Pronunciation only'], correct: 2, explanation: 'Latin uses declensions — noun endings change to show grammatical role (subject, object, etc.).' },
    { id: 'lat-p6', question: 'The nominative case in Latin marks the noun as:', choices: ['The direct object', 'The subject of the verb', 'A possessive', 'An indirect object'], correct: 1, explanation: 'Nominative = subject case. "Poeta" (the poet) as subject.' },
    { id: 'lat-p7', question: '"Amat" means "he/she ___" in present tense:', choices: ['Loved', 'Loves', 'Will love', 'Was loving'], correct: 1, explanation: '"Amat" is third person singular present of "amare" (to love): "he/she loves."' },
    { id: 'lat-p8', question: 'Which is a correct first declension nominative singular ending?', choices: ['-us', '-um', '-a', '-is'], correct: 2, explanation: 'First declension nouns end in -a in the nominative singular (e.g., "puella" = girl).' },
    { id: 'lat-p9', question: '"Puella poetam amat" translates to:', choices: ['The poet loves the girl', 'The girl loves the poet', 'The girl is a poet', 'The poet loves poetry'], correct: 1, explanation: '"Puella" (nom.) is subject, "poetam" (acc.) is object: "The girl loves the poet."' },
    { id: 'lat-p10', question: '"Veni, vidi, vici" is attributed to:', choices: ['Augustus', 'Cicero', 'Julius Caesar', 'Virgil'], correct: 2, explanation: '"I came, I saw, I conquered" — Julius Caesar\'s famous dispatch after a swift victory.' },
    { id: 'lat-p11', question: 'The genitive case shows:', choices: ['The subject', 'Direct object', 'Possession or description', 'Location'], correct: 2, explanation: 'Genitive = "of" — possession: "puellae" = "of the girl."' },
    { id: 'lat-p12', question: 'Latin word order is most flexible because:', choices: ['Latin has very few words', 'Case endings show grammatical function regardless of position', 'Latin only uses SVO order', 'Romans memorized fixed phrases'], correct: 1, explanation: 'Case endings convey meaning, so word order can vary for emphasis without losing clarity.' },
  ],
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
  ,
  {
    id: 'art',
    label: 'Art',
    emoji: '🎨',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'art_p1', question: 'Which primary colors combine to make orange?', choices: ['Red and blue', 'Red and yellow', 'Blue and yellow', 'Red and green'], correct: 1, explanation: 'Red and yellow are primary colors that mix to create orange, a secondary color.' },
      { id: 'art_p2', question: 'What is the term for the lightness or darkness of a color?', choices: ['Hue', 'Saturation', 'Value', 'Chroma'], correct: 2, explanation: 'Value refers to the lightness or darkness of a color in art and color theory.' },
      { id: 'art_p3', question: 'Which art movement is Pablo Picasso most associated with?', choices: ['Impressionism', 'Surrealism', 'Cubism', 'Realism'], correct: 2, explanation: 'Picasso co-founded Cubism with Georges Braque, a movement that showed subjects from multiple viewpoints simultaneously.' },
      { id: 'art_p4', question: 'What tool do sculptors use to carve stone?', choices: ['Palette knife', 'Chisel', 'Easel', 'Gesso'], correct: 1, explanation: 'A chisel is a tool with a sharp edge used to carve or cut stone, wood, or other hard materials.' },
      { id: 'art_p5', question: 'What technique involves applying thick paint to a canvas with a palette knife?', choices: ['Sfumato', 'Impasto', 'Chiaroscuro', 'Fresco'], correct: 1, explanation: 'Impasto is a technique where paint is laid on thickly, often leaving visible brush or knife marks.' },
      { id: 'art_p6', question: 'What does "perspective" in art refer to?', choices: ['The emotional mood of a painting', 'The technique of representing three-dimensional space on a flat surface', 'The choice of color palette', 'The size of the canvas'], correct: 1, explanation: 'Perspective is the technique used to represent three-dimensional depth and space on a two-dimensional surface.' },
      { id: 'art_p7', question: 'Which Renaissance artist painted the Sistine Chapel ceiling?', choices: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Donatello'], correct: 2, explanation: 'Michelangelo painted the Sistine Chapel ceiling between 1508 and 1512, one of the greatest achievements in Western art.' },
      { id: 'art_p8', question: 'What is the golden ratio approximately equal to?', choices: ['1.414', '1.618', '2.718', '3.14'], correct: 1, explanation: 'The golden ratio is approximately 1.618 and is found in art and nature, often used to create aesthetically pleasing compositions.' },
      { id: 'art_p9', question: 'What artistic movement, led by Marcel Duchamp, challenged traditional definitions of art?', choices: ['Fauvism', 'Dadaism', 'Baroque', 'Minimalism'], correct: 1, explanation: 'Dadaism was an avant-garde movement that rejected conventional aesthetics and challenged traditional art definitions.' },
      { id: 'art_p10', question: 'What is the term for a preparatory sketch or drawing for a painting?', choices: ['Fresco', 'Cartoon', 'Collage', 'Relief'], correct: 1, explanation: 'In art, a "cartoon" is a full-size preparatory drawing made before creating a painting, mosaic, or tapestry.' },
      { id: 'art_p11', question: 'Which post-impressionist artist is known for his use of bold colors and emotional brushwork in works like "The Starry Night"?', choices: ['Paul Gauguin', 'Georges Seurat', 'Vincent van Gogh', 'Paul Cézanne'], correct: 2, explanation: 'Vincent van Gogh\'s "The Starry Night" is celebrated for its swirling brushwork and vivid emotional colors.' },
      { id: 'art_p12', question: 'What is "trompe-l\'oeil" in art?', choices: ['A French term for abstract expressionism', 'A technique creating an optical illusion of three-dimensional reality', 'A method of watercolor painting', 'A style of portrait painting'], correct: 1, explanation: 'Trompe-l\'oeil is a French term meaning "deceive the eye" — a technique creating realistic illusions of three-dimensional space.' },
    ],
    lessons: [
      {
        id: 'art_l1_1',
        title: 'Color Theory Basics',
        description: 'Learn about primary, secondary, and tertiary colors and how they interact.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'art_l1_1_q1', question: 'Which are the three primary colors in traditional painting?', choices: ['Red, yellow, blue', 'Red, green, blue', 'Cyan, magenta, yellow', 'Orange, purple, green'], correct: 0, explanation: 'In traditional color theory, the three primary colors are red, yellow, and blue — they cannot be made by mixing other colors.' },
          { id: 'art_l1_1_q2', question: 'What do you get when you mix red and blue?', choices: ['Orange', 'Green', 'Purple', 'Brown'], correct: 2, explanation: 'Mixing red and blue produces purple (or violet), which is a secondary color.' },
          { id: 'art_l1_1_q3', question: 'Which colors are considered "warm" colors?', choices: ['Blue, green, purple', 'Red, orange, yellow', 'White, gray, black', 'Teal, cyan, indigo'], correct: 1, explanation: 'Warm colors — red, orange, and yellow — evoke warmth and energy, resembling fire and sunlight.' },
          { id: 'art_l1_1_q4', question: 'What is a complementary color pair?', choices: ['Colors next to each other on the color wheel', 'Colors opposite each other on the color wheel', 'Colors of the same hue but different shades', 'Any two colors that look similar'], correct: 1, explanation: 'Complementary colors are directly opposite each other on the color wheel, such as red and green or blue and orange.' },
          { id: 'art_l1_1_q5', question: 'What is created when white is added to a color?', choices: ['Shade', 'Tint', 'Tone', 'Hue'], correct: 1, explanation: 'Adding white to a color creates a tint, making the color lighter (e.g., red + white = pink).' },
        ],
      },
      {
        id: 'art_l1_2',
        title: 'Elements of Art',
        description: 'Discover the fundamental elements that make up all works of art.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'art_l1_2_q1', question: 'Which of the following is NOT one of the seven elements of art?', choices: ['Line', 'Texture', 'Perspective', 'Value'], correct: 2, explanation: 'The seven elements of art are line, shape, form, space, value, color, and texture. Perspective is a principle, not an element.' },
          { id: 'art_l1_2_q2', question: 'What does "texture" refer to in art?', choices: ['The size of the artwork', 'The way a surface feels or appears to feel', 'The arrangement of colors', 'The type of medium used'], correct: 1, explanation: 'Texture describes the surface quality of an artwork — how it actually feels (tactile) or appears to feel (visual).' },
          { id: 'art_l1_2_q3', question: 'What is the difference between "shape" and "form" in art?', choices: ['Shape is 3D; form is 2D', 'Shape is 2D; form is 3D', 'They mean the same thing', 'Shape is color-based; form is line-based'], correct: 1, explanation: 'Shape is flat and two-dimensional (like a circle), while form is three-dimensional and has depth (like a sphere).' },
          { id: 'art_l1_2_q4', question: 'In art, "space" refers to:', choices: ['The theme of a painting', 'The area within and around objects in an artwork', 'The type of canvas used', 'The size of brushstrokes'], correct: 1, explanation: 'Space in art refers to the area within, around, between, above, or below objects — both positive and negative space.' },
          { id: 'art_l1_2_q5', question: 'What type of line creates a sense of movement and energy in art?', choices: ['Horizontal lines', 'Diagonal lines', 'Vertical lines', 'Dotted lines'], correct: 1, explanation: 'Diagonal lines create a sense of movement, tension, and energy in artwork, unlike the stability of horizontal or vertical lines.' },
        ],
      },
      {
        id: 'art_l1_3',
        title: 'Introduction to Drawing',
        description: 'Explore basic drawing techniques including shading and proportion.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'art_l1_3_q1', question: 'What is "hatching" in drawing?', choices: ['A method of erasing marks', 'Drawing parallel lines to create tone and shadow', 'Sketching with watercolors', 'Outlining shapes with thick lines'], correct: 1, explanation: 'Hatching involves drawing parallel lines close together to create the illusion of tone, shadow, and texture.' },
          { id: 'art_l1_3_q2', question: 'What is the purpose of using a grid when drawing?', choices: ['To add color to a drawing', 'To help accurately transfer proportions from a reference image', 'To create abstract patterns', 'To measure the canvas size'], correct: 1, explanation: 'A grid helps artists accurately scale and transfer proportions from a reference image to their drawing surface.' },
          { id: 'art_l1_3_q3', question: 'Which pencil grade produces the darkest marks?', choices: ['2H', 'HB', '4B', '6H'], correct: 2, explanation: 'The "B" grades (soft) produce darker marks; higher numbers like 4B are softer and darker than HB or H grades.' },
          { id: 'art_l1_3_q4', question: 'What is "contour drawing"?', choices: ['Drawing from memory', 'Drawing the outline or edges of a subject', 'Drawing with charcoal only', 'Drawing geometric shapes only'], correct: 1, explanation: 'Contour drawing focuses on capturing the outline and edges of a subject without lifting the pencil from the paper.' },
          { id: 'art_l1_3_q5', question: 'What is "foreshortening" in drawing?', choices: ['Making objects appear smaller than they are', 'Representing an object as shorter than it is to convey depth', 'Drawing in a loose, free style', 'Elongating proportions for stylistic effect'], correct: 1, explanation: 'Foreshortening is a perspective technique that makes objects appear compressed when seen at an angle, conveying depth.' },
        ],
      },
      {
        id: 'art_l2_1',
        title: 'Art History: Ancient to Renaissance',
        description: 'Survey the major art movements from ancient civilizations through the Renaissance.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'art_l2_1_q1', question: 'The ancient Egyptians depicted human figures in art with:', choices: ['Realistic three-dimensional form', 'The head in profile and the body facing front', 'Impressionistic loose brushwork', 'Abstract geometric abstraction'], correct: 1, explanation: 'Egyptian art used a "composite view" — heads in profile but shoulders and eyes shown frontally, for symbolic completeness.' },
          { id: 'art_l2_1_q2', question: 'Greek sculpture evolved from the stiff "Archaic" style to more naturalistic "Classical" style around:', choices: ['3000 BCE', '500 BCE', '100 CE', '1200 CE'], correct: 1, explanation: 'Around 500 BCE, Greek sculpture transitioned from rigid Archaic forms to the naturalistic idealism of the Classical period.' },
          { id: 'art_l2_1_q3', question: 'What characterizes Gothic architecture in medieval Europe?', choices: ['Flat roofs and wide arches', 'Pointed arches, ribbed vaults, and flying buttresses', 'Domed ceilings and marble columns', 'Timber framing and thatched roofs'], correct: 1, explanation: 'Gothic architecture features pointed arches, ribbed vaults, and flying buttresses that allowed for taller, lighter structures.' },
          { id: 'art_l2_1_q4', question: 'The Renaissance began in which country?', choices: ['France', 'Germany', 'Italy', 'Spain'], correct: 2, explanation: 'The Renaissance began in Italy in the 14th century, centered in Florence, and spread throughout Europe.' },
          { id: 'art_l2_1_q5', question: 'Leonardo da Vinci\'s "The Last Supper" is an example of which technique?', choices: ['Oil on canvas', 'Fresco and tempera on plaster', 'Watercolor on paper', 'Mosaic tile'], correct: 1, explanation: 'Leonardo used an experimental technique of tempera and oil on plaster for The Last Supper, which unfortunately caused it to deteriorate.' },
        ],
      },
      {
        id: 'art_l2_2',
        title: 'Painting Techniques',
        description: 'Learn about different painting media and techniques used by master artists.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'art_l2_2_q1', question: 'What is "sfumato" as used by Leonardo da Vinci?', choices: ['A technique of applying gold leaf', 'A technique of blending colors and tones with soft transitions', 'A method of underpainting in grisaille', 'A way of applying texture with a palette knife'], correct: 1, explanation: 'Sfumato (from Italian "smoke") is Leonardo\'s technique of blending colors and tones subtly so there are no harsh outlines.' },
          { id: 'art_l2_2_q2', question: 'Fresco painting involves applying paint to:', choices: ['Dry canvas', 'Wet plaster', 'Wooden panels', 'Metal surfaces'], correct: 1, explanation: 'In fresco painting, pigments are applied to wet plaster (buon fresco), bonding permanently as the plaster dries.' },
          { id: 'art_l2_2_q3', question: 'Which medium dries through oxidation and is known for its rich, deep colors?', choices: ['Watercolor', 'Gouache', 'Oil paint', 'Acrylic paint'], correct: 2, explanation: 'Oil paint dries through oxidation, allowing extended working time, and produces rich, deep colors valued since the 15th century.' },
          { id: 'art_l2_2_q4', question: 'What is "chiaroscuro"?', choices: ['A type of Italian fresco', 'The use of strong contrasts between light and dark in painting', 'A method of printmaking', 'A style of landscape painting'], correct: 1, explanation: 'Chiaroscuro (Italian: "light-dark") is the technique of using strong light-dark contrasts to create volume and drama.' },
          { id: 'art_l2_2_q5', question: 'Pointillism, developed by Georges Seurat, involves:', choices: ['Painting with the fingers', 'Applying pure color in small distinct dots', 'Scraping paint off the canvas', 'Using only black and white'], correct: 1, explanation: 'Pointillism uses tiny dots of pure color that optically blend when viewed from a distance, creating a luminous effect.' },
        ],
      },
      {
        id: 'art_l2_3',
        title: 'Sculpture and Three-Dimensional Art',
        description: 'Explore the history, techniques, and concepts of sculpture and 3D art forms.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'art_l2_3_q1', question: 'What is the difference between "relief" and "in-the-round" sculpture?', choices: ['Relief is painted; in-the-round is not', 'Relief projects from a background; in-the-round is freestanding', 'Relief uses clay; in-the-round uses stone', 'They are the same thing'], correct: 1, explanation: 'Relief sculpture projects from a flat background (like a coin), while sculpture "in the round" is freestanding and viewable from all sides.' },
          { id: 'art_l2_3_q2', question: 'Michelangelo\'s "David" is carved from which material?', choices: ['Bronze', 'Marble', 'Granite', 'Limestone'], correct: 1, explanation: 'Michelangelo\'s David (1501-1504) is carved from a single block of Carrara marble and stands 17 feet tall.' },
          { id: 'art_l2_3_q3', question: 'What is the "lost-wax" (cire perdue) casting process?', choices: ['A method of firing ceramic sculpture', 'A bronze casting technique using a wax model that is melted away', 'A way of carving ice sculptures', 'A modern 3D printing technique'], correct: 1, explanation: 'Lost-wax casting creates a wax model, encases it in mold material, melts out the wax, then fills the cavity with molten metal.' },
          { id: 'art_l2_3_q4', question: 'What is "kinetic sculpture"?', choices: ['Sculpture made of natural materials', 'Sculpture that incorporates movement', 'Sculpture made entirely of light', 'Very small miniature sculpture'], correct: 1, explanation: 'Kinetic sculpture incorporates actual movement as an integral part of the work, moved by wind, motors, or viewer interaction.' },
          { id: 'art_l2_3_q5', question: 'Which artist is known for large-scale steel sculpture installations like "The Weather Project"?', choices: ['Constantin Brancusi', 'Olafur Eliasson', 'Auguste Rodin', 'Jeff Koons'], correct: 1, explanation: 'Olafur Eliasson is known for large-scale environmental installations, including "The Weather Project" at Tate Modern in 2003.' },
        ],
      },
      {
        id: 'art_l3_1',
        title: 'Modern and Contemporary Art',
        description: 'Analyze the revolutionary movements of modern and contemporary art from Impressionism to today.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'art_l3_1_q1', question: 'Which artist\'s "Fountain" (1917) — a porcelain urinal — challenged definitions of art?', choices: ['Salvador Dalí', 'Marcel Duchamp', 'Jackson Pollock', 'Andy Warhol'], correct: 1, explanation: 'Marcel Duchamp\'s "Fountain," a signed urinal submitted to an art exhibition, became a landmark "readymade" and conceptual artwork.' },
          { id: 'art_l3_1_q2', question: 'Abstract Expressionism, developed in New York in the 1940s-50s, emphasized:', choices: ['Precise geometric forms', 'Spontaneous, emotional expression through abstraction', 'Realistic depictions of everyday life', 'Historical and mythological subjects'], correct: 1, explanation: 'Abstract Expressionism prioritized spontaneous, gestural mark-making as a direct expression of the artist\'s inner emotional state.' },
          { id: 'art_l3_1_q3', question: 'Pop Art, as practiced by Andy Warhol and Roy Lichtenstein, drew imagery from:', choices: ['Ancient mythology', 'Mass media, advertising, and consumer culture', 'Abstract mathematical concepts', 'Traditional folk art'], correct: 1, explanation: 'Pop Art appropriated imagery from mass media, advertising, comic books, and consumer products to comment on popular culture.' },
          { id: 'art_l3_1_q4', question: 'What is "installation art"?', choices: ['Art permanently attached to gallery walls', 'Large-scale, site-specific artworks that transform a space', 'Art created using digital software', 'Art made from found industrial materials'], correct: 1, explanation: 'Installation art creates immersive, large-scale artworks that transform a space, often incorporating diverse materials and media.' },
          { id: 'art_l3_1_q5', question: 'The Bauhaus school (1919-1933) in Germany sought to:', choices: ['Revive Gothic art traditions', 'Unite fine art, craft, and industrial design', 'Promote Surrealist principles', 'Create purely abstract painting'], correct: 1, explanation: 'The Bauhaus sought to bridge fine art and functional design, uniting craft and industrial production under one artistic philosophy.' },
        ],
      },
      {
        id: 'art_l3_2',
        title: 'Art Criticism and Aesthetics',
        description: 'Develop frameworks for analyzing, interpreting, and evaluating artworks critically.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'art_l3_2_q1', question: 'The four steps of formal art criticism are:', choices: ['Imagine, create, display, sell', 'Describe, analyze, interpret, judge', 'Research, sketch, paint, exhibit', 'Observe, copy, modify, publish'], correct: 1, explanation: 'Formal art criticism follows four steps: describe (what you see), analyze (how it\'s organized), interpret (what it means), judge (its value).' },
          { id: 'art_l3_2_q2', question: 'What does "iconography" mean in art history?', choices: ['The study of icons used in religion', 'The study of visual symbols and their meanings in art', 'A method of printing images', 'The history of portrait painting'], correct: 1, explanation: 'Iconography is the study and interpretation of visual symbols, motifs, and themes in art and their cultural meanings.' },
          { id: 'art_l3_2_q3', question: 'Immanuel Kant\'s concept of the "sublime" in aesthetics refers to:', choices: ['Perfect, orderly beauty', 'An experience of awe and overwhelming power beyond ordinary beauty', 'The beauty found in everyday objects', 'Abstract mathematical beauty'], correct: 1, explanation: 'Kant\'s sublime describes an experience of awe, terror, and overwhelming power — beauty that exceeds our capacity to comprehend it.' },
          { id: 'art_l3_2_q4', question: 'What is "semiotics" as applied to visual art?', choices: ['A painting technique using signs', 'The study of signs and symbols and how they convey meaning', 'A method of museum curation', 'The history of written language in art'], correct: 1, explanation: 'Semiotics studies how signs and symbols function and produce meaning, applied to art to analyze how visual elements communicate.' },
          { id: 'art_l3_2_q5', question: 'The concept of the "male gaze," introduced by Laura Mulvey, refers to:', choices: ['Men\'s preference for abstract art', 'The tendency in art and media to depict the world from a male perspective, objectifying women', 'The historical exclusion of men from art academies', 'A specific style of portrait painting'], correct: 1, explanation: 'Laura Mulvey\'s "male gaze" (1975) describes how visual art and film often present the world from a heterosexual male viewpoint, objectifying women.' },
        ],
      },
      {
        id: 'art_l3_3',
        title: 'Digital Art and New Media',
        description: 'Examine how technology has transformed artistic practice and opened new creative frontiers.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'art_l3_3_q1', question: 'What is a "NFT" (Non-Fungible Token) in the context of digital art?', choices: ['A type of digital brush used in software', 'A unique digital certificate of ownership for a digital artwork', 'A government grant for digital artists', 'A type of digital art exhibition'], correct: 1, explanation: 'An NFT is a unique digital certificate stored on a blockchain that verifies ownership and authenticity of a digital asset or artwork.' },
          { id: 'art_l3_3_q2', question: 'Generative art refers to:', choices: ['Art that generates income for the artist', 'Art created using autonomous systems, algorithms, or code', 'Art made by multiple artists collaboratively', 'Art that generates emotional responses'], correct: 1, explanation: 'Generative art uses autonomous systems — algorithms, AI, or code — where the system itself makes decisions contributing to the artwork.' },
          { id: 'art_l3_3_q3', question: 'What is "net art" or "internet art"?', choices: ['Art sold through online galleries', 'Art created specifically for and experienced on the internet', 'Photography shared on social media', 'Digital copies of traditional artworks'], correct: 1, explanation: 'Net art is created specifically for the internet as its medium and exhibition space, exploiting the unique properties of online networks.' },
          { id: 'art_l3_3_q4', question: 'Beeple\'s digital artwork "Everydays: The First 5000 Days" sold in 2021 for approximately:', choices: ['$500,000', '$6.9 million', '$69 million', '$690 million'], correct: 2, explanation: 'Beeple\'s collage sold at Christie\'s in March 2021 for $69 million as an NFT, making it one of the most expensive digital artworks ever sold.' },
          { id: 'art_l3_3_q5', question: 'What is "glitch art"?', choices: ['Art depicting broken technology', 'Art that intentionally uses digital errors and artifacts as aesthetic elements', 'Art created using defective software', 'Photography of damaged objects'], correct: 1, explanation: 'Glitch art intentionally exploits digital or analog errors, corruptions, and artifacts, using them as aesthetic and expressive elements.' },
        ],
      },
    ],
  },
  {
    id: 'music',
    label: 'Music',
    emoji: '🎵',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'music_p1', question: 'How many semitones are in an octave?', choices: ['8', '10', '12', '16'], correct: 2, explanation: 'An octave contains 12 semitones (half steps) in Western music, covering the distance from one note to the same note above or below.' },
      { id: 'music_p2', question: 'What does "forte" mean in music?', choices: ['Soft', 'Loud', 'Fast', 'Slow'], correct: 1, explanation: 'Forte (f) is an Italian musical term meaning "loud" or "strong." Its opposite is piano (soft).' },
      { id: 'music_p3', question: 'Which composer wrote the "Moonlight Sonata"?', choices: ['Mozart', 'Bach', 'Beethoven', 'Chopin'], correct: 2, explanation: 'Ludwig van Beethoven composed the Piano Sonata No. 14 in C♯ minor, known as the "Moonlight Sonata," in 1801.' },
      { id: 'music_p4', question: 'What is a time signature of 4/4 also called?', choices: ['Waltz time', 'Common time', 'Cut time', 'Triple meter'], correct: 1, explanation: '4/4 time, with four quarter-note beats per measure, is so common it is called "common time" and symbolized with a "C."' },
      { id: 'music_p5', question: 'What is the term for the speed of music?', choices: ['Timbre', 'Dynamics', 'Tempo', 'Pitch'], correct: 2, explanation: 'Tempo refers to the speed or pace of music, often indicated by Italian terms like allegro (fast) or adagio (slow).' },
      { id: 'music_p6', question: 'Which instrument family does the violin belong to?', choices: ['Woodwind', 'Brass', 'Percussion', 'String'], correct: 3, explanation: 'The violin is a string instrument, producing sound through vibrating strings played with a bow or plucked.' },
      { id: 'music_p7', question: 'What is a "chord" in music?', choices: ['A single sustained note', 'Three or more notes played simultaneously', 'A musical scale', 'A rhythmic pattern'], correct: 1, explanation: 'A chord is three or more notes played simultaneously, creating harmony. The most basic is a triad (three notes).' },
      { id: 'music_p8', question: 'Johann Sebastian Bach was a master of which form of counterpoint?', choices: ['Sonata', 'Fugue', 'Rondo', 'Minuet'], correct: 1, explanation: 'Bach was the supreme master of the fugue, a polyphonic composition where a theme is introduced and developed by multiple voices.' },
      { id: 'music_p9', question: 'What is "syncopation" in music?', choices: ['Playing all notes at equal volume', 'Placing emphasis on normally weak beats or between beats', 'Repeating a musical phrase', 'Playing in a minor key'], correct: 1, explanation: 'Syncopation shifts the accent to normally weak beats or off-beats, creating rhythmic tension and is fundamental to jazz and funk.' },
      { id: 'music_p10', question: 'The 12-bar blues progression typically uses which three chords?', choices: ['I, II, V', 'I, IV, V', 'I, III, VI', 'II, IV, VII'], correct: 1, explanation: 'The 12-bar blues uses the I, IV, and V chords of a key — the foundation of blues, rock and roll, and many popular music genres.' },
      { id: 'music_p11', question: 'What is serialism (twelve-tone technique) in 20th-century music?', choices: ['Music using only 12 instruments', 'A compositional method using all 12 pitches in a fixed sequence', 'Music lasting exactly 12 minutes', 'A style of 12-part harmony'], correct: 1, explanation: 'Serialism, developed by Schoenberg, organizes all 12 pitches of the chromatic scale into a "row" used as the basis for composition.' },
      { id: 'music_p12', question: 'What distinguishes "polyphony" from "homophony" in music?', choices: ['Polyphony uses one melody; homophony uses several', 'Polyphony has multiple independent melodies; homophony has one melody with accompaniment', 'Polyphony is vocal; homophony is instrumental', 'Polyphony is modern; homophony is ancient'], correct: 1, explanation: 'Polyphony features multiple independent melodic lines simultaneously, while homophony has a single main melody supported by harmony.' },
    ],
    lessons: [
      {
        id: 'music_l1_1',
        title: 'Reading Music: Notation Basics',
        description: 'Learn to read musical notation including notes, rests, and time signatures.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'music_l1_1_q1', question: 'What is a "treble clef" used for?', choices: ['Low-pitched instruments', 'High-pitched instruments and voices', 'Percussion notation', 'Guitar tab notation'], correct: 1, explanation: 'The treble clef (G clef) is used for high-pitched instruments and voices, with middle C on the first ledger line below the staff.' },
          { id: 'music_l1_1_q2', question: 'How many beats does a half note receive in 4/4 time?', choices: ['1', '2', '3', '4'], correct: 1, explanation: 'A half note receives 2 beats in 4/4 time. A whole note gets 4 beats, a quarter note gets 1, and an eighth note gets half a beat.' },
          { id: 'music_l1_1_q3', question: 'What does a "rest" symbol indicate in music notation?', choices: ['The end of a piece', 'A period of silence of a specific duration', 'A repeat of the previous measure', 'A change in tempo'], correct: 1, explanation: 'A rest indicates silence for a specific duration — each note value has a corresponding rest (whole rest, half rest, quarter rest, etc.).' },
          { id: 'music_l1_1_q4', question: 'What does a "sharp" symbol (#) do to a note?', choices: ['Lowers the note by a half step', 'Raises the note by a half step', 'Doubles the note\'s duration', 'Indicates the note is played loudly'], correct: 1, explanation: 'A sharp (#) raises a note by one half step (one semitone), while a flat (♭) lowers a note by one half step.' },
          { id: 'music_l1_1_q5', question: 'What are the five lines of a musical staff called from bottom to top in treble clef (the lines)?', choices: ['E G B D F', 'F A C E', 'A C E G B', 'B D F A C'], correct: 0, explanation: 'The five lines of the treble clef from bottom to top are E, G, B, D, F — remembered as "Every Good Boy Does Fine."' },
        ],
      },
      {
        id: 'music_l1_2',
        title: 'Rhythm and Beat',
        description: 'Understand the foundations of rhythm, meter, and how to feel the beat in music.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'music_l1_2_q1', question: 'What is the "downbeat" in music?', choices: ['A type of drum hit', 'The first and strongest beat in a measure', 'The last note of a phrase', 'A sudden decrease in volume'], correct: 1, explanation: 'The downbeat is the first beat of a measure and is typically the strongest, most accented beat in the rhythmic cycle.' },
          { id: 'music_l1_2_q2', question: 'What is "3/4 time" also known as?', choices: ['Common time', 'Waltz time', 'March time', 'Cut time'], correct: 1, explanation: '3/4 time has three quarter-note beats per measure and is associated with the waltz, giving it a flowing, triple-meter feel.' },
          { id: 'music_l1_2_q3', question: 'What does "rubato" mean in music performance?', choices: ['Gradually getting faster', 'Flexible tempo, with slight speeding up or slowing down', 'Playing very quietly', 'Repeating a section'], correct: 1, explanation: 'Rubato (Italian: "robbed") means taking expressive liberties with tempo, slightly speeding up or slowing down for emotional effect.' },
          { id: 'music_l1_2_q4', question: 'A "dotted note" in music is held for:', choices: ['Half its normal value', 'Its normal value plus half again', 'Twice its normal value', 'Its value plus a quarter'], correct: 1, explanation: 'A dotted note is held for its normal value plus half that value again (e.g., a dotted quarter note = 1.5 beats in 4/4 time).' },
          { id: 'music_l1_2_q5', question: 'What is an "ostinato" in music?', choices: ['A type of musical instrument', 'A persistently repeated musical pattern or phrase', 'A sudden change in key', 'The ending of a musical composition'], correct: 1, explanation: 'An ostinato is a repeated rhythmic or melodic pattern that persists throughout a piece, providing a foundation for other elements.' },
        ],
      },
      {
        id: 'music_l1_3',
        title: 'Melody and Harmony',
        description: 'Explore how melodies are constructed and how harmony supports musical expression.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'music_l1_3_q1', question: 'What is the "tonic" in music theory?', choices: ['A type of musical chord', 'The first and most important note of a scale — the home note', 'The highest note in a melody', 'The loudest note in a phrase'], correct: 1, explanation: 'The tonic is the first note of a scale (e.g., C in C major) and serves as the central, most stable "home" pitch.' },
          { id: 'music_l1_3_q2', question: 'A major scale follows which pattern of whole (W) and half (H) steps?', choices: ['W-W-H-W-W-W-H', 'W-H-W-W-H-W-W', 'H-W-W-H-W-W-W', 'W-W-W-H-W-W-H'], correct: 0, explanation: 'The major scale follows the pattern W-W-H-W-W-W-H, giving it its characteristic bright, happy sound.' },
          { id: 'music_l1_3_q3', question: 'What makes a chord "minor" rather than "major"?', choices: ['The minor chord has a flattened fifth', 'The minor chord has a lowered (flattened) third', 'The minor chord uses only two notes', 'The minor chord is always played softly'], correct: 1, explanation: 'A minor chord has a flattened (lowered by one semitone) third compared to a major chord, giving it a darker, sadder quality.' },
          { id: 'music_l1_3_q4', question: 'What is "counterpoint" in music?', choices: ['Playing against the beat', 'The art of combining independent melodic lines simultaneously', 'A technique for playing very quietly', 'The study of musical notation'], correct: 1, explanation: 'Counterpoint is the art of combining two or more independent melodic lines that harmonize with each other, developed by Bach and others.' },
          { id: 'music_l1_3_q5', question: 'The "circle of fifths" is a diagram that shows:', choices: ['The history of music from ancient to modern', 'The relationship between all 12 musical keys arranged in a circle', 'The frequencies of different instruments', 'The structure of a symphony'], correct: 1, explanation: 'The circle of fifths arranges all 12 musical keys in a circle, each key a fifth apart, showing key relationships and signatures.' },
        ],
      },
      {
        id: 'music_l2_1',
        title: 'Musical Forms and Structures',
        description: 'Analyze how composers organize music into recognizable forms and structures.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'music_l2_1_q1', question: 'What is "sonata form" (sonata-allegro form)?', choices: ['A piece written for a solo instrument', 'A three-part structure: exposition, development, and recapitulation', 'A piece in three movements', 'A form with alternating solo and ensemble sections'], correct: 1, explanation: 'Sonata form has three main sections: the exposition (presents themes), development (explores them), and recapitulation (restates them).' },
          { id: 'music_l2_1_q2', question: 'A "rondo" form in music follows which pattern?', choices: ['A-B-A-C-A (a main theme alternating with contrasting episodes)', 'A-B-C-D-E (five different sections)', 'A-A-B-A (theme with variations)', 'A-B-A (simple three-part form)'], correct: 0, explanation: 'Rondo form features a recurring main theme (A) alternating with contrasting episodes (B, C, etc.) in a pattern like A-B-A-C-A.' },
          { id: 'music_l2_1_q3', question: 'How many movements does a Classical symphony typically have?', choices: ['2', '3', '4', '6'], correct: 2, explanation: 'A Classical symphony typically has four movements: fast, slow, dance-like (minuet/scherzo), and fast finale.' },
          { id: 'music_l2_1_q4', question: 'What is a "theme and variations" form?', choices: ['A piece that gradually changes key', 'A musical form where a main theme is repeatedly presented in altered versions', 'A form alternating between two composers', 'A type of improvisation'], correct: 1, explanation: 'Theme and variations presents a main melody, then repeats it multiple times with changes in rhythm, harmony, tempo, or ornamentation.' },
          { id: 'music_l2_1_q5', question: 'What is a "cadenza" in a concerto?', choices: ['A final loud chord', 'A solo passage for the soloist, often improvised, near the end of a movement', 'A duet between soloist and conductor', 'The opening theme of a concerto'], correct: 1, explanation: 'A cadenza is a virtuosic solo passage near the end of a concerto movement where the soloist can display technical brilliance, often improvised.' },
        ],
      },
      {
        id: 'music_l2_2',
        title: 'Music History: Baroque to Romantic',
        description: 'Survey the major periods of Western classical music from Baroque through the Romantic era.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'music_l2_2_q1', question: 'The Baroque period in music is approximately:', choices: ['1100-1400', '1600-1750', '1750-1820', '1820-1900'], correct: 1, explanation: 'The Baroque period spans roughly 1600-1750, featuring composers like Bach, Handel, and Vivaldi, and music of ornate complexity.' },
          { id: 'music_l2_2_q2', question: 'Which composer wrote "The Four Seasons"?', choices: ['Johann Sebastian Bach', 'George Frideric Handel', 'Antonio Vivaldi', 'Henry Purcell'], correct: 2, explanation: 'Antonio Vivaldi composed "The Four Seasons" (1723), four violin concertos depicting the seasons, a landmark of Baroque music.' },
          { id: 'music_l2_2_q3', question: 'Mozart and Haydn are associated with which musical period?', choices: ['Baroque', 'Classical', 'Romantic', 'Modern'], correct: 1, explanation: 'Mozart and Haydn are central figures of the Classical period (c. 1750-1820), known for clarity, balance, and formal elegance.' },
          { id: 'music_l2_2_q4', question: 'Which Romantic composer wrote the opera cycle "The Ring of the Nibelung"?', choices: ['Giuseppe Verdi', 'Richard Wagner', 'Giacomo Puccini', 'Johannes Brahms'], correct: 1, explanation: 'Richard Wagner composed the four-opera cycle "Der Ring des Nibelungen," developing the concept of the "leitmotif" (recurring theme).' },
          { id: 'music_l2_2_q5', question: 'Beethoven\'s Ninth Symphony is significant partly because:', choices: ['It was his first symphony', 'It introduced the electric instrument', 'It included a choir and vocal soloists — unprecedented for a symphony', 'It was written for only five instruments'], correct: 2, explanation: 'Beethoven\'s Ninth (1824) was revolutionary for including choral and vocal soloists in a symphony, with the famous "Ode to Joy" finale.' },
        ],
      },
      {
        id: 'music_l2_3',
        title: 'World Music Traditions',
        description: 'Explore diverse musical traditions from cultures around the world.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'music_l2_3_q1', question: 'Indian classical music is primarily based on which concepts?', choices: ['Scales and chords', 'Raga (melodic framework) and tala (rhythmic cycle)', 'Twelve-tone rows', 'Pentatonic scales only'], correct: 1, explanation: 'Indian classical music is built on ragas (melodic frameworks with specific rules) and talas (rhythmic cycles), improvised within tradition.' },
          { id: 'music_l2_3_q2', question: 'What is "gamelan" music?', choices: ['A West African drumming tradition', 'A Japanese flute tradition', 'A traditional ensemble music of Indonesia featuring metallophones', 'A South American folk music style'], correct: 2, explanation: 'Gamelan is traditional Indonesian ensemble music, primarily from Java and Bali, featuring tuned percussion including metallophones and gongs.' },
          { id: 'music_l2_3_q3', question: 'The blues music genre originated among:', choices: ['European classical composers', 'African American communities in the Deep South of the USA', 'Caribbean island communities', 'Native American tribes'], correct: 1, explanation: 'Blues originated among African American communities in the Deep South in the late 19th century, rooted in work songs and spirituals.' },
          { id: 'music_l2_3_q4', question: 'What is "bossa nova"?', choices: ['A type of Cuban salsa', 'A Brazilian music genre blending samba rhythms with jazz harmony', 'An Argentinian tango style', 'A Colombian folk music tradition'], correct: 1, explanation: 'Bossa nova emerged in Brazil in the late 1950s, combining the rhythms of samba with jazz harmonies and cool, intimate vocal style.' },
          { id: 'music_l2_3_q5', question: 'Pentatonic scales, used worldwide in folk music, contain how many notes per octave?', choices: ['4', '5', '6', '7'], correct: 1, explanation: 'Pentatonic scales have five notes per octave (penta = five) and are found in music from China, West Africa, the Americas, and beyond.' },
        ],
      },
      {
        id: 'music_l3_1',
        title: 'Music Theory: Advanced Harmony',
        description: 'Master advanced harmonic concepts including modulation, borrowed chords, and jazz harmony.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'music_l3_1_q1', question: 'What is "modulation" in music theory?', choices: ['Changing the volume', 'Changing from one key to another within a piece', 'Changing the time signature', 'Changing the instrumentation'], correct: 1, explanation: 'Modulation is the process of transitioning from one musical key to another, creating harmonic variety and emotional change.' },
          { id: 'music_l3_1_q2', question: 'What is a "tritone" and why was it historically called "diabolus in musica"?', choices: ['A chord of three notes, seen as too simple', 'An interval of three whole tones, considered dissonant and unstable', 'A three-part harmonic structure', 'A three-beat rhythmic pattern'], correct: 1, explanation: 'The tritone spans three whole tones (e.g., C to F#), creating extreme dissonance — medieval theorists called it "the devil in music."' },
          { id: 'music_l3_1_q3', question: 'In jazz, what is a "ii-V-I" progression?', choices: ['A series of three random chords', 'A fundamental chord progression using the second, fifth, and first chords of a key', 'A rhythm pattern of two beats, five beats, one beat', 'A modulation sequence across three keys'], correct: 1, explanation: 'The ii-V-I (e.g., Dm7-G7-Cmaj7 in C major) is the most important progression in jazz, creating strong harmonic motion to the tonic.' },
          { id: 'music_l3_1_q4', question: 'What is "enharmonic equivalence" in music?', choices: ['Two notes that sound identical but are written differently (e.g., C# and Db)', 'Two instruments playing the same melody', 'Two keys with the same number of sharps', 'Two rhythms that feel the same but are notated differently'], correct: 0, explanation: 'Enharmonic equivalents are notes that sound the same but have different names (e.g., C# and Db, F# and Gb), depending on context.' },
          { id: 'music_l3_1_q5', question: 'What is a "Neapolitan chord" (♭II)?', choices: ['A chord used only in Neapolitan folk music', 'A major chord built on the flattened second degree, used for dramatic effect', 'A type of Italian operatic cadence', 'A diminished seventh chord'], correct: 1, explanation: 'The Neapolitan chord is a major chord on the flattened second scale degree, used dramatically before a dominant or tonic chord.' },
        ],
      },
      {
        id: 'music_l3_2',
        title: '20th Century and Contemporary Music',
        description: 'Examine the revolutionary developments in music from atonality to electronic music.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'music_l3_2_q1', question: 'Igor Stravinsky\'s "The Rite of Spring" (1913) caused a riot at its premiere partly because of:', choices: ['Its extremely quiet dynamics throughout', 'Its violent, irregular rhythms and dissonant harmonies', 'Its use of electronic instruments', 'Its extremely long duration of five hours'], correct: 1, explanation: 'The Rite of Spring\'s premiere caused a riot due to its radical dissonances, complex irregular rhythms, and shocking choreography.' },
          { id: 'music_l3_2_q2', question: 'Arnold Schoenberg\'s twelve-tone technique was designed to:', choices: ['Simplify music to its essential elements', 'Systematically avoid privileging any one pitch as a tonal center', 'Create music using only 12 instruments', 'Write music in exactly 12 minutes'], correct: 1, explanation: 'Schoenberg\'s twelve-tone technique organized all 12 pitches equally, avoiding tonal hierarchies and the traditional sense of "home key."' },
          { id: 'music_l3_2_q3', question: 'John Cage\'s "4\'33\'" (1952) consists of:', choices: ['Four minutes and 33 seconds of extremely quiet music', 'A performer sitting silently at the piano for the duration', 'A composition for 433 musicians', 'A piece that must be performed exactly 4 times'], correct: 1, explanation: 'Cage\'s "4\'33\'" instructs the performer to sit without playing for exactly 4 minutes and 33 seconds, presenting ambient sounds as music.' },
          { id: 'music_l3_2_q4', question: 'Minimalist music, associated with composers like Philip Glass and Steve Reich, is characterized by:', choices: ['Maximum complexity and dense orchestration', 'Gradual changes over repeated patterns, simple harmonies', 'Complete randomness and chance operations', 'Traditional 19th-century Romantic style'], correct: 1, explanation: 'Musical minimalism uses repetitive patterns that change very slowly and subtly over time, creating hypnotic, meditative effects.' },
          { id: 'music_l3_2_q5', question: 'What is "musique concrète"?', choices: ['Music using concrete (electronic) instruments only', 'Music composed using recorded real-world sounds manipulated electronically', 'A French term for classical orchestral music', 'Music written in a very literal, concrete way'], correct: 1, explanation: 'Musique concrète, developed by Pierre Schaeffer in the 1940s, uses recorded real-world sounds (rain, trains, voices) as musical material.' },
        ],
      },
      {
        id: 'music_l3_3',
        title: 'Music Production and Technology',
        description: 'Understand how modern music is produced, recorded, and distributed using technology.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'music_l3_3_q1', question: 'What is a "DAW" in music production?', choices: ['Digital Audio Workstation — software for recording and producing music', 'Dynamic Audio Wave — a type of sound file', 'Digital Artist Workshop — a music school platform', 'Direct Audio Wire — a type of audio cable'], correct: 0, explanation: 'A Digital Audio Workstation (DAW) is software like Pro Tools, Logic Pro, or Ableton Live used to record, edit, and produce music.' },
          { id: 'music_l3_3_q2', question: 'What is "sampling" in music production?', choices: ['Testing different instruments before buying them', 'Taking a portion of an existing recording and reusing it in a new composition', 'Recording live musicians in a studio', 'Testing the acoustic quality of a venue'], correct: 1, explanation: 'Sampling involves taking a fragment (sample) of a recorded sound and reusing it in a new track, central to hip-hop and electronic music.' },
          { id: 'music_l3_3_q3', question: 'What does "compression" do to audio in music production?', choices: ['Reduces the file size of audio recordings', 'Reduces the dynamic range — making quiet parts louder and loud parts quieter', 'Speeds up the playback of audio', 'Removes background noise from recordings'], correct: 1, explanation: 'Audio compression reduces dynamic range, evening out volume levels to make audio sit better in a mix and sound more polished.' },
          { id: 'music_l3_3_q4', question: 'What is MIDI?', choices: ['A high-quality audio file format', 'Musical Instrument Digital Interface — a protocol allowing instruments and computers to communicate', 'A type of microphone used in studios', 'A music streaming service'], correct: 1, explanation: 'MIDI (Musical Instrument Digital Interface) is a protocol that allows electronic instruments, computers, and software to communicate musical data.' },
          { id: 'music_l3_3_q5', question: 'What is "mastering" in the music production process?', choices: ['Learning to play an instrument professionally', 'The final step of audio post-production that prepares a mix for distribution', 'Recording the lead vocalist\'s final performance', 'Composing the main theme of a piece'], correct: 1, explanation: 'Mastering is the final step in music production — optimizing the overall sound, ensuring consistency, and preparing for distribution across formats.' },
        ],
      },
    ],
  },
  {
    id: 'philosophy',
    label: 'Philosophy',
    emoji: '🤔',
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'philosophy_p1', question: 'Who wrote "The Republic," exploring justice and the ideal state?', choices: ['Aristotle', 'Plato', 'Socrates', 'Epicurus'], correct: 1, explanation: 'Plato wrote "The Republic" (c. 380 BCE), exploring justice, the ideal city-state, and the famous Allegory of the Cave.' },
      { id: 'philosophy_p2', question: 'What is the "Socratic method"?', choices: ['Writing philosophical treatises', 'Conducting philosophical inquiry through questioning and dialogue', 'Memorizing philosophical texts', 'Debating through formal speeches'], correct: 1, explanation: 'The Socratic method uses dialogue and probing questions to stimulate critical thinking and expose contradictions in beliefs.' },
      { id: 'philosophy_p3', question: 'Descartes\' famous phrase "Cogito ergo sum" means:', choices: ['I think, therefore I am', 'I exist, therefore I think', 'God exists, therefore I think', 'Knowledge is power'], correct: 0, explanation: '"Cogito ergo sum" — "I think, therefore I am" — is Descartes\' foundational claim: the act of thinking proves one\'s existence.' },
      { id: 'philosophy_p4', question: 'What is "empiricism" in philosophy?', choices: ['The view that knowledge comes primarily from reason alone', 'The view that knowledge comes primarily from sensory experience', 'The view that all knowledge is uncertain', 'The view that only science produces knowledge'], correct: 1, explanation: 'Empiricism holds that knowledge comes from sensory experience. Key empiricists include Locke, Hume, and Berkeley.' },
      { id: 'philosophy_p5', question: 'Immanuel Kant\'s "categorical imperative" states that one should:', choices: ['Maximize overall happiness for all people', 'Act only according to principles you could will to become universal laws', 'Follow one\'s natural instincts', 'Obey the laws of the state'], correct: 1, explanation: 'Kant\'s categorical imperative: act only on principles you could consistently will everyone to follow — a universal moral law.' },
      { id: 'philosophy_p6', question: 'Utilitarianism, associated with Bentham and Mill, holds that:', choices: ['Actions are right if they follow moral rules', 'Actions are right if they maximize overall happiness or utility', 'Actions are right if they express good character', 'Actions are right if they respect individual rights'], correct: 1, explanation: 'Utilitarianism judges actions by their consequences: the right action produces the greatest happiness for the greatest number.' },
      { id: 'philosophy_p7', question: 'What is "existentialism" primarily concerned with?', choices: ['The nature of mathematical truth', 'Individual human existence, freedom, and responsibility', 'The structure of language', 'The nature of God'], correct: 1, explanation: 'Existentialism focuses on individual existence, freedom, and the human responsibility to create meaning in an indifferent universe.' },
      { id: 'philosophy_p8', question: 'Nietzsche\'s concept of the "Übermensch" (Overman) represents:', choices: ['A Nazi racial ideal', 'An individual who creates their own values beyond conventional morality', 'A superior physical athlete', 'The ideal philosopher-king'], correct: 1, explanation: 'Nietzsche\'s Übermensch is one who transcends conventional morality and creates new values — an aspiration for human self-overcoming.' },
      { id: 'philosophy_p9', question: 'What is "epistemology"?', choices: ['The study of right and wrong', 'The branch of philosophy concerned with the nature and scope of knowledge', 'The study of beauty and art', 'The philosophy of politics and government'], correct: 1, explanation: 'Epistemology studies knowledge: what it is, how we acquire it, and its limits — foundational questions include "what can we know?"' },
      { id: 'philosophy_p10', question: 'Thomas Kuhn\'s concept of a "paradigm shift" refers to:', choices: ['A gradual accumulation of scientific knowledge', 'A revolutionary change in the fundamental assumptions of a scientific field', 'A change in political leadership', 'A shift in popular culture trends'], correct: 1, explanation: 'Kuhn\'s paradigm shift describes revolutionary scientific change when anomalies overthrow the existing framework (e.g., Copernican revolution).' },
      { id: 'philosophy_p11', question: 'What is the "trolley problem" in ethics?', choices: ['A problem about transportation policy', 'A thought experiment exploring whether it is right to sacrifice one person to save five', 'A dilemma about industrial safety regulations', 'A problem about distributing resources fairly'], correct: 1, explanation: 'The trolley problem asks: is it moral to divert a runaway trolley to kill one person instead of five? It tests utilitarian vs. deontological ethics.' },
      { id: 'philosophy_p12', question: 'What does Plato\'s "Allegory of the Cave" illustrate?', choices: ['The importance of scientific observation', 'How most people perceive only shadows of reality and mistake them for truth', 'The dangers of underground living', 'The importance of community and dialogue'], correct: 1, explanation: 'Plato\'s Allegory of the Cave depicts prisoners mistaking shadows for reality, representing how most people perceive only appearances, not true Forms.' },
    ],
    lessons: [
      {
        id: 'philosophy_l1_1',
        title: 'Introduction to Philosophy',
        description: 'Discover what philosophy is and the major questions it asks about existence, knowledge, and ethics.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'philosophy_l1_1_q1', question: 'The word "philosophy" comes from the Greek words meaning:', choices: ['Study of nature', 'Love of wisdom', 'Science of thought', 'Art of argument'], correct: 1, explanation: 'Philosophy comes from the Greek "philo" (love) and "sophia" (wisdom) — literally "love of wisdom."' },
          { id: 'philosophy_l1_1_q2', question: 'Which of the following is a philosophical question?', choices: ['What is the boiling point of water?', 'What is the population of France?', 'What makes an action morally right?', 'How fast does light travel?'], correct: 2, explanation: 'Philosophical questions concern fundamental issues like morality, knowledge, and existence — not empirical facts answerable by science.' },
          { id: 'philosophy_l1_1_q3', question: 'The three main branches of philosophy are:', choices: ['Science, religion, and art', 'Metaphysics, epistemology, and ethics', 'Logic, language, and history', 'Politics, economics, and sociology'], correct: 1, explanation: 'The three core branches are metaphysics (reality), epistemology (knowledge), and ethics (morality), with many sub-branches.' },
          { id: 'philosophy_l1_1_q4', question: 'What is a "thought experiment" in philosophy?', choices: ['An experiment conducted in a laboratory', 'A hypothetical scenario used to explore philosophical ideas', 'A type of meditation practice', 'A debate between two philosophers'], correct: 1, explanation: 'A thought experiment is an imaginary scenario designed to explore and test philosophical concepts and intuitions without physical experimentation.' },
          { id: 'philosophy_l1_1_q5', question: 'Socrates claimed that "the unexamined life is not worth living." This means:', choices: ['Life requires constant physical activity', 'One should reflect on and question one\'s life and beliefs', 'Only educated people live meaningful lives', 'Life requires religious examination'], correct: 1, explanation: 'Socrates believed that a life without self-reflection and critical inquiry is not truly lived — philosophy is essential to human flourishing.' },
        ],
      },
      {
        id: 'philosophy_l1_2',
        title: 'Logic and Critical Thinking',
        description: 'Learn the tools of logical reasoning, argument structure, and how to identify fallacies.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'philosophy_l1_2_q1', question: 'A valid deductive argument guarantees that if the premises are true, the conclusion:', choices: ['Is probably true', 'Must be true', 'Is possibly true', 'Needs further evidence'], correct: 1, explanation: 'In a valid deductive argument, truth of the premises guarantees truth of the conclusion — the conclusion cannot be false if premises are true.' },
          { id: 'philosophy_l1_2_q2', question: 'What is an "ad hominem" fallacy?', choices: ['Attacking the person making an argument rather than the argument itself', 'Using emotional appeals in an argument', 'Assuming what one is trying to prove', 'Applying a general rule to a special case'], correct: 0, explanation: 'Ad hominem (Latin: "to the person") attacks the person making the argument rather than addressing the argument itself.' },
          { id: 'philosophy_l1_2_q3', question: 'The fallacy of "post hoc ergo propter hoc" means:', choices: ['After this, therefore because of this — assuming causation from correlation', 'Appealing to the majority to prove something is true', 'Attacking a misrepresented version of an argument', 'Assuming something is true because it hasn\'t been disproven'], correct: 0, explanation: 'Post hoc fallacy assumes that because B followed A, A caused B — confusing temporal sequence with causation.' },
          { id: 'philosophy_l1_2_q4', question: 'What is "modus ponens"?', choices: ['A fallacy of denying the conclusion', 'A valid argument form: if P then Q; P is true; therefore Q is true', 'A form of circular reasoning', 'An argument from authority'], correct: 1, explanation: 'Modus ponens: If P implies Q, and P is true, then Q must be true. It is one of the most basic valid forms of deductive reasoning.' },
          { id: 'philosophy_l1_2_q5', question: 'What is "Occam\'s Razor"?', choices: ['The principle that more complex explanations are always better', 'The principle that among competing hypotheses, the simplest is preferred', 'A rule against using metaphors in philosophy', 'A method of resolving ethical dilemmas'], correct: 1, explanation: 'Occam\'s Razor (William of Ockham) states that among competing explanations, the one with fewest assumptions should be preferred.' },
        ],
      },
      {
        id: 'philosophy_l1_3',
        title: 'Ancient Greek Philosophy',
        description: 'Explore the foundational ideas of Socrates, Plato, and Aristotle that shaped Western thought.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'philosophy_l1_3_q1', question: 'Plato\'s theory of Forms holds that:', choices: ['Only material things are real', 'Abstract perfect Forms are more real than physical objects', 'Knowledge comes from the senses', 'Mathematics is the highest form of knowledge'], correct: 1, explanation: 'Plato argued that physical objects are imperfect copies of perfect, eternal Forms (e.g., the Form of Beauty, Justice, Circle) that exist beyond the material world.' },
          { id: 'philosophy_l1_3_q2', question: 'Aristotle disagreed with Plato by arguing that universal forms:', choices: ['Are more real than individual things', 'Exist within individual things, not separately', 'Do not exist at all', 'Can only be known through mathematics'], correct: 1, explanation: 'Unlike Plato, Aristotle held that universals exist within individual things (immanent) rather than in a separate realm of Forms.' },
          { id: 'philosophy_l1_3_q3', question: 'What is Aristotle\'s concept of "eudaimonia"?', choices: ['A feeling of intense pleasure', 'Human flourishing or happiness achieved through living virtuously', 'The state of complete rest', 'Divine favor or blessing'], correct: 1, explanation: 'Eudaimonia (often translated as "happiness" or "flourishing") is Aristotle\'s concept of the good life achieved through virtuous activity.' },
          { id: 'philosophy_l1_3_q4', question: 'The pre-Socratic philosopher Heraclitus is famous for arguing that:', choices: ['Reality is ultimately one and unchanging', 'Everything is in constant flux — "you cannot step into the same river twice"', 'All reality is made of water', 'Numbers are the fundamental reality'], correct: 1, explanation: 'Heraclitus argued that change and flux are fundamental: "Everything flows" and "You cannot step into the same river twice."' },
          { id: 'philosophy_l1_3_q5', question: 'Epicurus advocated for which approach to the good life?', choices: ['Pursuing intense pleasures and luxury', 'Simple pleasures, friendship, and freedom from anxiety and pain (ataraxia)', 'Serving the state and civic duty', 'Achieving wealth and public recognition'], correct: 1, explanation: 'Epicurus taught that true happiness lies in simple pleasures, friendship, and philosophical reflection, free from fear and bodily pain.' },
        ],
      },
      {
        id: 'philosophy_l2_1',
        title: 'Ethics: Major Moral Theories',
        description: 'Compare and evaluate the main ethical frameworks used to analyze moral questions.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'philosophy_l2_1_q1', question: 'Deontological ethics (Kant) judges actions based on:', choices: ['Their consequences for overall happiness', 'Whether they conform to moral rules or duties', 'Whether they express good character', 'Whether they are approved by society'], correct: 1, explanation: 'Deontological ethics judges actions by whether they conform to moral duties and rules, regardless of consequences.' },
          { id: 'philosophy_l2_1_q2', question: 'Virtue ethics, originating with Aristotle, focuses on:', choices: ['Following moral rules', 'Maximizing good outcomes', 'Cultivating virtuous character traits', 'Following social contracts'], correct: 2, explanation: 'Virtue ethics asks "what kind of person should I be?" focusing on developing virtues (courage, honesty, justice) rather than rules or outcomes.' },
          { id: 'philosophy_l2_1_q3', question: 'John Rawls\' "veil of ignorance" thought experiment asks us to:', choices: ['Make decisions about society without knowing our own social position or characteristics', 'Ignore the suffering of others when making decisions', 'Hide our real motivations from other people', 'Make decisions based on majority vote'], correct: 0, explanation: 'Rawls asks: what principles would you choose if you didn\'t know whether you\'d be rich or poor, talented or not? This reveals principles of fairness.' },
          { id: 'philosophy_l2_1_q4', question: 'What is "moral relativism"?', choices: ['The view that moral facts are absolute and universal', 'The view that moral truths are relative to cultures or individuals', 'The view that no moral statements are true', 'The view that morality is determined by religion'], correct: 1, explanation: 'Moral relativism holds that moral judgments are true only relative to particular cultural or individual standards, not universally.' },
          { id: 'philosophy_l2_1_q5', question: 'Peter Singer\'s utilitarian argument about global poverty concludes:', choices: ['We have no obligation to help distant strangers', 'If we can prevent suffering without sacrificing anything of comparable importance, we ought to', 'Charity should be voluntary and never obligatory', 'National borders create absolute moral boundaries'], correct: 1, explanation: 'Singer argues that geographic distance is morally irrelevant — if we can prevent great suffering at relatively little cost to ourselves, we are morally obligated to do so.' },
        ],
      },
      {
        id: 'philosophy_l2_2',
        title: 'Philosophy of Mind',
        description: 'Investigate philosophical questions about consciousness, the mind-body problem, and personal identity.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'philosophy_l2_2_q1', question: 'The "mind-body problem" asks:', choices: ['How does the mind control physical exercise?', 'How are the mental and physical related, given they seem so different?', 'Whether the brain is located in the body or separate from it', 'How memories are stored in the brain'], correct: 1, explanation: 'The mind-body problem asks how the immaterial mind (thoughts, feelings) relates to the physical body and brain — a central puzzle since Descartes.' },
          { id: 'philosophy_l2_2_q2', question: 'Physicalism (materialism) in philosophy of mind holds that:', choices: ['The mind is a non-physical substance separate from the body', 'Mental states are identical to or entirely dependent on physical brain states', 'The mind and body are parallel systems that never interact', 'Consciousness exists independently of any physical substrate'], correct: 1, explanation: 'Physicalism holds that the mind is entirely physical — mental states are brain states, and consciousness arises from physical processes.' },
          { id: 'philosophy_l2_2_q3', question: 'What is the "hard problem of consciousness" (David Chalmers)?', choices: ['Explaining how the brain processes sensory information', 'Explaining why and how physical processes give rise to subjective experience', 'Solving problems when in a reduced state of consciousness', 'Explaining how we become conscious after sleeping'], correct: 1, explanation: 'Chalmers\' hard problem asks why physical brain processes are accompanied by subjective experience — why is there "something it is like" to be conscious?' },
          { id: 'philosophy_l2_2_q4', question: 'What is a "philosophical zombie" (p-zombie)?', choices: ['A person with no moral beliefs', 'A hypothetical being physically identical to a human but lacking conscious experience', 'An artificial intelligence that mimics human behavior', 'A person who sleepwalks and acts without awareness'], correct: 1, explanation: 'A p-zombie is a thought experiment: a being physically identical to a human but with no subjective inner experience — used to argue consciousness is non-physical.' },
          { id: 'philosophy_l2_2_q5', question: 'Derek Parfit\'s work on personal identity concluded that:', choices: ['Personal identity persists perfectly through time', 'What matters in survival is psychological continuity, not strict identity', 'The soul ensures personal identity across time', 'Personal identity is defined by bodily continuity'], correct: 1, explanation: 'Parfit argued that personal identity over time is not what matters — what matters is psychological continuity and connectedness, which admits of degrees.' },
        ],
      },
      {
        id: 'philosophy_l2_3',
        title: 'Political Philosophy',
        description: 'Examine foundational questions about justice, rights, power, and the legitimacy of the state.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'philosophy_l2_3_q1', question: 'Thomas Hobbes described life in the "state of nature" (without government) as:', choices: ['Peaceful and free', 'Solitary, poor, nasty, brutish, and short', 'Naturally cooperative and harmonious', 'Governed by natural moral law'], correct: 1, explanation: 'Hobbes argued that without government, life would be a "war of all against all" — dangerous, chaotic, and miserable.' },
          { id: 'philosophy_l2_3_q2', question: 'John Locke\'s theory of natural rights includes the right to:', choices: ['Life, power, and pursuit of happiness', 'Life, liberty, and property', 'Equality, security, and happiness', 'Freedom, democracy, and prosperity'], correct: 1, explanation: 'Locke argued that people have natural rights to life, liberty, and property, and government exists to protect these rights.' },
          { id: 'philosophy_l2_3_q3', question: 'What is the "social contract" theory?', choices: ['A legal document all citizens must sign', 'The idea that political authority rests on an agreement (real or hypothetical) among individuals', 'A contract between a government and corporations', 'An agreement to follow social norms and etiquette'], correct: 1, explanation: 'Social contract theory holds that political authority is justified by a (real or hypothetical) agreement among individuals to create society and government.' },
          { id: 'philosophy_l2_3_q4', question: 'Karl Marx argued that history is driven primarily by:', choices: ['Great leaders and their ideas', 'Random chance and contingency', 'Economic class conflict and material conditions', 'Religious and cultural forces'], correct: 2, explanation: 'Marx\'s historical materialism argues that history is fundamentally shaped by economic conditions and class conflict between those who control production and those who don\'t.' },
          { id: 'philosophy_l2_3_q5', question: 'Isaiah Berlin\'s distinction between "positive" and "negative" liberty is:', choices: ['Positive liberty = freedom from interference; negative liberty = freedom to achieve your goals', 'Negative liberty = freedom from interference; positive liberty = freedom/capacity to achieve your goals', 'Positive liberty applies to politics; negative liberty applies to personal life', 'Negative liberty is bad; positive liberty is good'], correct: 1, explanation: 'Berlin: negative liberty is freedom from external interference; positive liberty is the actual power and capacity to live as you choose.' },
        ],
      },
      {
        id: 'philosophy_l3_1',
        title: 'Metaphysics: Reality and Existence',
        description: 'Explore fundamental questions about the nature of reality, being, time, and causation.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'philosophy_l3_1_q1', question: 'What is "ontology"?', choices: ['The study of knowledge', 'The branch of metaphysics studying the nature of being and existence', 'The philosophy of language', 'The study of values'], correct: 1, explanation: 'Ontology asks fundamental questions about being: what exists? What kinds of things are there? What does it mean to exist?' },
          { id: 'philosophy_l3_1_q2', question: 'The debate between "realism" and "anti-realism" in metaphysics concerns:', choices: ['Whether art should depict reality', 'Whether there is a mind-independent reality vs. whether reality depends on minds or discourse', 'Whether scientific theories are true or useful fictions', 'Whether mathematical objects exist'], correct: 1, explanation: 'Realists hold there is a mind-independent reality; anti-realists (idealists, constructivists) hold reality is mind-dependent or constructed.' },
          { id: 'philosophy_l3_1_q3', question: 'What is "substance dualism" (Descartes)?', choices: ['The view that reality consists of two basic types of substance: mind and matter', 'The view that everything is made of one substance', 'The view that only minds exist', 'The view that only matter exists'], correct: 0, explanation: 'Descartes\' substance dualism holds that mind (res cogitans, thinking thing) and body (res extensa, extended thing) are fundamentally different substances.' },
          { id: 'philosophy_l3_1_q4', question: 'David Hume\'s problem of induction argues that:', choices: ['We can never observe anything directly', 'We have no rational justification for inferring future events from past observations', 'Mathematics is uncertain', 'Causation is a useful concept'], correct: 1, explanation: 'Hume showed that inductive reasoning (past patterns will continue) cannot be logically justified — the sun rising yesterday doesn\'t guarantee it rises tomorrow.' },
          { id: 'philosophy_l3_1_q5', question: 'What is "presentism" about time?', choices: ['Only the present moment exists; past and future are unreal', 'The past, present, and future all equally exist', 'Only the past is real; the future is uncertain', 'Time is an illusion created by the mind'], correct: 0, explanation: 'Presentism holds that only the present moment is real — the past no longer exists and the future doesn\'t yet exist.' },
        ],
      },
      {
        id: 'philosophy_l3_2',
        title: 'Philosophy of Science',
        description: 'Analyze the foundations, methods, and limits of scientific knowledge.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'philosophy_l3_2_q1', question: 'Karl Popper\'s criterion of "falsifiability" holds that a theory is scientific only if:', choices: ['It has been confirmed by many experiments', 'It could in principle be proven wrong by evidence', 'It is accepted by the scientific community', 'It makes precise mathematical predictions'], correct: 1, explanation: 'Popper argued that scientific claims must be falsifiable — capable of being tested and potentially refuted. Unfalsifiable claims are metaphysical, not scientific.' },
          { id: 'philosophy_l3_2_q2', question: 'What is the "problem of demarcation" in philosophy of science?', choices: ['How to measure scientific discoveries', 'How to distinguish science from non-science or pseudoscience', 'How to divide funding between scientific disciplines', 'How to separate facts from theories'], correct: 1, explanation: 'The demarcation problem asks what distinguishes genuine science from pseudoscience, metaphysics, or other non-scientific endeavors.' },
          { id: 'philosophy_l3_2_q3', question: 'Scientific realism holds that:', choices: ['Science produces only useful fictions', 'Successful scientific theories are approximately true descriptions of reality, including unobservable entities', 'Only observable phenomena exist', 'Science is just one of many equally valid ways of knowing'], correct: 1, explanation: 'Scientific realism argues that successful theories genuinely describe reality — that electrons, quarks, etc. really exist even if unobservable.' },
          { id: 'philosophy_l3_2_q4', question: 'What is the "underdetermination of theory by evidence"?', choices: ['The idea that evidence always proves only one theory', 'The idea that multiple incompatible theories can be equally supported by the same evidence', 'The fact that scientists often lack sufficient evidence', 'The problem that experiments cannot be replicated'], correct: 1, explanation: 'Underdetermination argues that any set of evidence is compatible with multiple, mutually incompatible theories — evidence alone can\'t determine which is correct.' },
          { id: 'philosophy_l3_2_q5', question: 'Paul Feyerabend\'s "anarchism" in philosophy of science argues that:', choices: ['Scientists should work without government funding', 'There is no single scientific method — "anything goes" in science', 'Science should be organized democratically', 'Scientific freedom requires no institutional rules'], correct: 1, explanation: 'Feyerabend\'s "Against Method" argues that no single methodological rule has never been violated in successful science — methodological pluralism is needed.' },
        ],
      },
      {
        id: 'philosophy_l3_3',
        title: 'Contemporary Philosophy',
        description: 'Engage with influential ideas from 20th and 21st century philosophy across analytic and continental traditions.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'philosophy_l3_3_q1', question: 'Ludwig Wittgenstein\'s later philosophy argued that:', choices: ['Language has a single logical essence', 'Meaning arises from use within "language games" and forms of life', 'Philosophy should be replaced by science', 'All philosophical problems are illusions'], correct: 1, explanation: 'Late Wittgenstein argued that words mean what they do because of how they\'re used in social practices ("language games"), not by referring to fixed essences.' },
          { id: 'philosophy_l3_3_q2', question: 'Martin Heidegger\'s concept of "Being-in-the-world" (In-der-Welt-sein) emphasizes:', choices: ['That humans are essentially separate from the world', 'That human existence is fundamentally embedded in and engaged with the world from the start', 'The importance of philosophical contemplation', 'The primacy of rational thought over lived experience'], correct: 1, explanation: 'Heidegger argued that humans are not subjects confronting an external world — we are always already engaged with and embedded in the world.' },
          { id: 'philosophy_l3_3_q3', question: 'Simone de Beauvoir\'s "The Second Sex" argued that:', choices: ['Women are naturally different from men in all respects', '"One is not born, but rather becomes, a woman" — femininity is socially constructed', 'Women should focus on domestic roles', 'Equality means ignoring differences between men and women'], correct: 1, explanation: 'De Beauvoir\'s landmark 1949 work argued that "woman" is a social construct imposed by patriarchal society, not a natural essence.' },
          { id: 'philosophy_l3_3_q4', question: 'What is "deconstruction" as developed by Jacques Derrida?', choices: ['Taking apart philosophical arguments to show their flaws', 'A method of reading texts to reveal hidden assumptions, contradictions, and hierarchies of meaning', 'Rejecting all Western philosophy', 'Analyzing language by reducing it to its simplest units'], correct: 1, explanation: 'Derrida\'s deconstruction reveals how texts depend on binary oppositions (presence/absence) that their own logic undermines — showing instability of meaning.' },
          { id: 'philosophy_l3_3_q5', question: 'Nick Bostrom\'s "simulation argument" proposes that:', choices: ['Reality is definitely a computer simulation', 'At least one of three propositions must be true, one of which is that we are likely living in a simulation', 'Computer simulations will never be sophisticated enough to simulate consciousness', 'Simulating reality is morally prohibited'], correct: 1, explanation: 'Bostrom\'s trilemma: either civilizations go extinct before creating simulations, or they choose not to, or we are almost certainly in a simulation.' },
        ],
      },
    ],
  },
  {
    id: 'psychology',
    label: 'Psychology',
    emoji: '🧠',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'psychology_p1', question: 'Who is known as the "father of psychoanalysis"?', choices: ['Carl Jung', 'William James', 'Sigmund Freud', 'B.F. Skinner'], correct: 2, explanation: 'Sigmund Freud founded psychoanalysis, emphasizing the role of the unconscious, dreams, and childhood experiences in shaping behavior.' },
      { id: 'psychology_p2', question: 'Classical conditioning, demonstrated by Pavlov\'s dog experiments, involves:', choices: ['Learning through reward and punishment', 'Learning to associate a neutral stimulus with a meaningful one', 'Learning by observing others', 'Learning through trial and error'], correct: 1, explanation: 'Pavlov showed that dogs could be conditioned to salivate to a bell after pairing it with food — a neutral stimulus becomes a conditioned stimulus.' },
      { id: 'psychology_p3', question: 'Maslow\'s hierarchy of needs places which need at the top?', choices: ['Safety', 'Love and belonging', 'Esteem', 'Self-actualization'], correct: 3, explanation: 'Maslow\'s hierarchy peaks at self-actualization — realizing one\'s full potential — after physiological, safety, social, and esteem needs are met.' },
      { id: 'psychology_p4', question: 'What does "cognitive dissonance" mean?', choices: ['A type of hearing disorder', 'The discomfort of holding contradictory beliefs simultaneously', 'Difficulty concentrating on tasks', 'A disagreement between two people'], correct: 1, explanation: 'Cognitive dissonance (Festinger) is the mental discomfort of holding contradictory beliefs, often motivating people to change beliefs or behavior.' },
      { id: 'psychology_p5', question: 'The Stanford Prison Experiment (Zimbardo) demonstrated the power of:', choices: ['Individual genetics in behavior', 'Situational roles and environment on human behavior', 'Peer pressure among teenagers', 'Authority figures in education'], correct: 1, explanation: 'Zimbardo\'s study showed that randomly assigned roles (guard/prisoner) caused people to adopt those roles deeply, demonstrating situational power over behavior.' },
      { id: 'psychology_p6', question: 'What is "operant conditioning" (B.F. Skinner)?', choices: ['Learning by observing model behavior', 'Learning through associations between stimuli', 'Learning in which behavior is strengthened by reinforcement or weakened by punishment', 'Learning through insight and problem-solving'], correct: 2, explanation: 'Skinner\'s operant conditioning uses reinforcements (increase behavior) and punishments (decrease behavior) to shape voluntary behavior.' },
      { id: 'psychology_p7', question: 'The "bystander effect" refers to:', choices: ['People walking past public art without noticing it', 'The tendency to be less likely to help when others are present', 'Children imitating adults they observe', 'The effect of crowds on individual performance'], correct: 1, explanation: 'The bystander effect (Darley and Latané): the more people present at an emergency, the less likely any individual is to help (diffusion of responsibility).' },
      { id: 'psychology_p8', question: 'What is "confirmation bias"?', choices: ['Remembering positive events more clearly', 'The tendency to search for and favor information that confirms one\'s existing beliefs', 'Being overly confident in one\'s abilities', 'Changing beliefs too frequently'], correct: 1, explanation: 'Confirmation bias leads people to seek, interpret, and remember information in ways that confirm their preexisting beliefs and ignore contradictory evidence.' },
      { id: 'psychology_p9', question: 'Piaget\'s theory of cognitive development suggests children move through stages in what order?', choices: ['Formal, concrete, preoperational, sensorimotor', 'Sensorimotor, preoperational, concrete operational, formal operational', 'Preoperational, sensorimotor, formal, concrete', 'Concrete, preoperational, sensorimotor, formal'], correct: 1, explanation: 'Piaget identified four stages: sensorimotor (0-2), preoperational (2-7), concrete operational (7-11), and formal operational (12+).' },
      { id: 'psychology_p10', question: 'What is "neuroplasticity"?', choices: ['The brain\'s ability to create new neurons after birth', 'The brain\'s ability to change and reorganize by forming new neural connections throughout life', 'The flexibility of behavior in response to stimuli', 'The brain\'s resistance to environmental influences'], correct: 1, explanation: 'Neuroplasticity is the brain\'s lifelong ability to reorganize, form new connections, and adapt to experience, learning, and injury.' },
      { id: 'psychology_p11', question: 'The Milgram experiment (1963) studied:', choices: ['Obedience to authority — how far people would go when ordered by an authority figure', 'The effects of isolation on mental health', 'How children learn language', 'The impact of sleep deprivation on cognition'], correct: 0, explanation: 'Milgram found that most ordinary people would administer seemingly dangerous electric shocks when ordered by an authority figure in a white lab coat.' },
      { id: 'psychology_p12', question: 'What is the DSM-5?', choices: ['A psychological test for measuring intelligence', 'The Diagnostic and Statistical Manual of Mental Disorders — used to classify mental health conditions', 'A scale for measuring stress levels', 'A neuroscience textbook for medical students'], correct: 1, explanation: 'The DSM-5 (2013) is the American Psychiatric Association\'s standard classification system for mental disorders, used for diagnosis and research.' },
    ],
    lessons: [
      {
        id: 'psychology_l1_1',
        title: 'Introduction to Psychology',
        description: 'Discover what psychology is, its major subfields, and the scientific methods it uses.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'psychology_l1_1_q1', question: 'Psychology is defined as the scientific study of:', choices: ['The brain and nervous system only', 'Behavior and mental processes', 'Social groups and culture', 'Philosophy of the mind'], correct: 1, explanation: 'Psychology is the scientific study of behavior (what people do) and mental processes (thoughts, feelings, perceptions, memory).' },
          { id: 'psychology_l1_1_q2', question: 'Which research method measures the relationship between two variables without manipulating either?', choices: ['Experiment', 'Case study', 'Correlational study', 'Clinical trial'], correct: 2, explanation: 'A correlational study examines whether and how strongly two variables are related, but cannot establish causation.' },
          { id: 'psychology_l1_1_q3', question: 'In a psychological experiment, the "independent variable" is:', choices: ['The variable that is measured as an outcome', 'The variable manipulated by the researcher', 'The variable that remains constant throughout', 'The variable that participants control'], correct: 1, explanation: 'The independent variable is what the researcher manipulates to see its effect on the dependent variable (the outcome measured).' },
          { id: 'psychology_l1_1_q4', question: 'What is the "placebo effect"?', choices: ['When participants drop out of a study', 'When a treatment works only because the patient believes it will', 'When an experiment produces unexpected results', 'When participants know what the study is about'], correct: 1, explanation: 'The placebo effect occurs when a person experiences real improvement due to their belief in a treatment, even if it has no active ingredients.' },
          { id: 'psychology_l1_1_q5', question: 'The "nature vs. nurture" debate in psychology concerns:', choices: ['Whether animals can learn as well as humans', 'The relative contributions of genetic inheritance and environment to development', 'Whether therapy or medication is more effective', 'The role of the conscious vs. unconscious mind'], correct: 1, explanation: 'The nature-nurture debate examines how much of human behavior and development is shaped by genetics (nature) vs. environment and experience (nurture).' },
        ],
      },
      {
        id: 'psychology_l1_2',
        title: 'Learning and Behavior',
        description: 'Explore the key theories of how humans and animals learn through conditioning and observation.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'psychology_l1_2_q1', question: 'What is "extinction" in classical conditioning?', choices: ['The organism dies', 'The conditioned response disappears when the conditioned stimulus is repeatedly presented without the unconditioned stimulus', 'A stimulus becomes stronger over time', 'Forgetting how to perform a learned behavior'], correct: 1, explanation: 'Extinction occurs when the conditioned stimulus is repeatedly presented without the unconditioned stimulus, causing the conditioned response to fade.' },
          { id: 'psychology_l1_2_q2', question: 'Albert Bandura\'s Bobo doll experiments demonstrated:', choices: ['That children learn aggression only through direct experience', 'That children learn by observing and imitating the behavior of others (social learning)', 'That punishment is more effective than reward', 'That children have innate aggressive instincts'], correct: 1, explanation: 'Bandura\'s Bobo doll studies showed that children imitate aggressive behavior they observe in adult models, demonstrating observational (social) learning.' },
          { id: 'psychology_l1_2_q3', question: 'What is a "fixed ratio" reinforcement schedule?', choices: ['Reinforcement provided at fixed time intervals', 'Reinforcement provided after a set number of responses', 'Reinforcement provided randomly', 'Reinforcement provided continuously'], correct: 1, explanation: 'A fixed ratio schedule provides reinforcement after a set number of responses (e.g., every 5th response), producing high, steady response rates.' },
          { id: 'psychology_l1_2_q4', question: 'What is "learned helplessness" (Seligman)?', choices: ['The tendency to help others when rewarded', 'Giving up and becoming passive after repeatedly experiencing uncontrollable negative events', 'Learning from watching helpless animals', 'A type of classical conditioning'], correct: 1, explanation: 'Learned helplessness occurs when repeated exposure to uncontrollable situations leads to passivity and belief that one has no control over outcomes.' },
          { id: 'psychology_l1_2_q5', question: 'Habituation in learning refers to:', choices: ['Getting better at a skill through practice', 'Decreased response to a stimulus after repeated exposure', 'Increased sensitivity to a repeated stimulus', 'Learning to associate two stimuli together'], correct: 1, explanation: 'Habituation is the simplest form of learning: decreased response to a stimulus after it has been experienced repeatedly without consequence.' },
        ],
      },
      {
        id: 'psychology_l1_3',
        title: 'Memory and Cognition',
        description: 'Understand how memory works, why we forget, and how cognitive biases affect our thinking.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'psychology_l1_3_q1', question: 'The "three-box" or Atkinson-Shiffrin model of memory includes:', choices: ['Short-term, medium-term, and long-term memory', 'Sensory, short-term (working), and long-term memory', 'Conscious, preconscious, and unconscious memory', 'Episodic, semantic, and procedural memory'], correct: 1, explanation: 'The Atkinson-Shiffrin model proposes three memory stores: sensory register, short-term memory, and long-term memory.' },
          { id: 'psychology_l1_3_q2', question: 'What is the "misinformation effect" (Loftus)?', choices: ['Forgetting information presented last in a list', 'Incorporating misleading post-event information into memory', 'Remembering false memories as true', 'Being unable to recall information under stress'], correct: 1, explanation: 'Loftus showed that memories can be altered by misleading information presented after an event, demonstrating that memory is reconstructive.' },
          { id: 'psychology_l1_3_q3', question: 'What is "chunking" as a memory strategy?', choices: ['Reviewing material in small daily chunks', 'Grouping individual pieces of information into meaningful larger units', 'Repeating information over and over', 'Associating new information with visual images'], correct: 1, explanation: 'Chunking organizes information into meaningful groups (e.g., remembering a phone number as XXX-XXX-XXXX rather than 10 separate digits).' },
          { id: 'psychology_l1_3_q4', question: 'Which part of the brain is most critical for forming new long-term memories?', choices: ['Cerebellum', 'Amygdala', 'Hippocampus', 'Prefrontal cortex'], correct: 2, explanation: 'The hippocampus is essential for consolidating new memories into long-term storage. Damage (as in H.M.\'s case) prevents forming new explicit memories.' },
          { id: 'psychology_l1_3_q5', question: 'What is the "availability heuristic"?', choices: ['Using easily accessible internet resources to make decisions', 'Judging the probability of events based on how easily examples come to mind', 'Choosing the first available option presented', 'Making decisions based on available time'], correct: 1, explanation: 'The availability heuristic judges likelihood by how easily an example comes to mind — we overestimate risks of vivid, memorable events (e.g., plane crashes).' },
        ],
      },
      {
        id: 'psychology_l2_1',
        title: 'Social Psychology',
        description: 'Examine how social situations, groups, and other people influence our thoughts and behavior.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'psychology_l2_1_q1', question: 'What is "social facilitation"?', choices: ['Helping others perform tasks more easily', 'The tendency for people to perform better on simple tasks when observed by others', 'A type of group therapy', 'Teaching social skills to children'], correct: 1, explanation: 'Social facilitation: the presence of others improves performance on well-learned tasks but impairs performance on difficult or novel tasks.' },
          { id: 'psychology_l2_1_q2', question: 'What is "groupthink"?', choices: ['Making decisions as a group is always better', 'The tendency for groups to prioritize harmony and conformity over critical evaluation', 'When group members think alike due to shared background', 'A type of collaborative problem-solving'], correct: 1, explanation: 'Groupthink occurs when the desire for group harmony suppresses dissent and critical thinking, leading to poor collective decisions.' },
          { id: 'psychology_l2_1_q3', question: 'The "fundamental attribution error" is the tendency to:', choices: ['Blame ourselves too much for failures', 'Overestimate situational factors and underestimate personal factors in others\' behavior', 'Overestimate personal/dispositional factors and underestimate situational factors in others\' behavior', 'Make errors when attributing credit for successes'], correct: 2, explanation: 'The fundamental attribution error: we overemphasize personality/character in explaining others\' behavior and underestimate situational factors.' },
          { id: 'psychology_l2_1_q4', question: 'What is "deindividuation"?', choices: ['Losing one\'s sense of self and responsibility in a group or crowd', 'The process of forming one\'s individual identity', 'Being singled out from a group for individual treatment', 'Developing unique personal characteristics'], correct: 0, explanation: 'Deindividuation occurs in crowds or anonymous groups — people lose their sense of individual identity and responsibility, often behaving impulsively.' },
          { id: 'psychology_l2_1_q5', question: 'Solomon Asch\'s conformity experiments showed that:', choices: ['People rarely conform to group pressure', 'Many people will conform to clearly wrong group answers due to social pressure', 'Only people with low intelligence conform to groups', 'Conformity only occurs in authoritarian societies'], correct: 1, explanation: 'Asch\'s line-length studies showed that about 75% of participants conformed to obviously wrong group answers at least once due to social pressure.' },
        ],
      },
      {
        id: 'psychology_l2_2',
        title: 'Developmental Psychology',
        description: 'Trace human psychological development from infancy through adulthood.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'psychology_l2_2_q1', question: 'Erikson\'s theory of psychosocial development proposes how many stages across the lifespan?', choices: ['4', '6', '8', '12'], correct: 2, explanation: 'Erikson proposed 8 psychosocial stages from infancy to old age, each with a central conflict (e.g., trust vs. mistrust, identity vs. role confusion).' },
          { id: 'psychology_l2_2_q2', question: 'What is "attachment theory" (Bowlby)?', choices: ['The theory that children must be physically attached to caregivers', 'The theory that early emotional bonds between infants and caregivers are crucial for development', 'A theory about how children attach meaning to words', 'The study of how children attach to peer groups'], correct: 1, explanation: 'Bowlby\'s attachment theory holds that infants have an innate need to form close emotional bonds with caregivers, affecting later relationships and mental health.' },
          { id: 'psychology_l2_2_q3', question: 'What did Vygotsky\'s concept of the "zone of proximal development" (ZPD) describe?', choices: ['The maximum level a child can achieve alone', 'The gap between what a child can do alone and what they can do with guidance', 'The ideal environment for learning', 'The developmental stage where language acquisition occurs'], correct: 1, explanation: 'The ZPD is the difference between what a learner can do independently and what they can achieve with support from a more knowledgeable person.' },
          { id: 'psychology_l2_2_q4', question: 'What is "object permanence" in Piaget\'s theory?', choices: ['The understanding that objects have physical properties like weight', 'The understanding that objects continue to exist even when they cannot be seen', 'The ability to categorize objects by shape and color', 'The ability to manipulate objects to achieve goals'], correct: 1, explanation: 'Object permanence — typically developing around 8-12 months — is the understanding that objects exist permanently even when out of sight.' },
          { id: 'psychology_l2_2_q5', question: 'What is "adolescent egocentrism" according to Elkind?', choices: ['Selfishness unique to teenagers', 'Teenagers\' belief that others are always observing and judging them (imaginary audience)', 'Inability to consider others\' perspectives', 'Overconfidence in one\'s own intellectual abilities'], correct: 1, explanation: 'Elkind described adolescent egocentrism including the "imaginary audience" (believing others are watching you) and "personal fable" (believing you are unique/invulnerable).' },
        ],
      },
      {
        id: 'psychology_l2_3',
        title: 'Abnormal Psychology and Mental Health',
        description: 'Understand the nature, classification, and treatment of psychological disorders.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'psychology_l2_3_q1', question: 'What four criteria are commonly used to define psychological disorder?', choices: ['Distress, dysfunction, deviance, danger (the "4 Ds")', 'Duration, degree, distress, dysfunction', 'Diagnosis, disorder, distress, disability', 'Deviance, diagnosis, danger, disability'], correct: 0, explanation: 'The 4 Ds framework defines psychological disorders by: Distress (subjective suffering), Dysfunction (impaired functioning), Deviance (from norms), and Danger (to self or others).' },
          { id: 'psychology_l2_3_q2', question: 'What characterizes "Major Depressive Disorder"?', choices: ['Alternating periods of mania and depression', 'Persistent depressed mood and loss of interest lasting at least two weeks, impairing functioning', 'Excessive worry about multiple areas of life', 'Brief periods of intense sadness triggered by specific events'], correct: 1, explanation: 'Major Depressive Disorder involves persistent depressed mood and/or loss of interest for at least two weeks, significantly impairing daily functioning.' },
          { id: 'psychology_l2_3_q3', question: 'What is "Cognitive Behavioral Therapy" (CBT)?', choices: ['Therapy exploring unconscious conflicts from childhood', 'Therapy that identifies and changes maladaptive thought patterns to improve emotional and behavioral wellbeing', 'Therapy using medication to change brain chemistry', 'Therapy focusing exclusively on behavior, not thoughts'], correct: 1, explanation: 'CBT identifies connections between thoughts, feelings, and behaviors, and teaches clients to challenge and modify negative thought patterns.' },
          { id: 'psychology_l2_3_q4', question: 'Post-Traumatic Stress Disorder (PTSD) is characterized by:', choices: ['Excessive worry about future catastrophes', 'Persistent re-experiencing of trauma, avoidance, hyperarousal, and negative cognitions following a traumatic event', 'Brief but intense panic attacks without clear cause', 'Dissociation from reality without prior trauma'], correct: 1, explanation: 'PTSD involves flashbacks, nightmares, avoidance of reminders, hypervigilance, and negative changes in cognition/mood following trauma.' },
          { id: 'psychology_l2_3_q5', question: 'The "biopsychosocial model" of mental illness proposes that disorders result from:', choices: ['Biological factors alone', 'Psychological factors alone', 'Social factors alone', 'The interaction of biological, psychological, and social factors'], correct: 3, explanation: 'The biopsychosocial model holds that mental disorders arise from complex interactions between biological (genes, brain chemistry), psychological, and social factors.' },
        ],
      },
      {
        id: 'psychology_l3_1',
        title: 'Neuroscience and Biopsychology',
        description: 'Explore the biological basis of behavior, including the brain, neurons, and neurotransmitters.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'psychology_l3_1_q1', question: 'What is the role of dopamine in the brain?', choices: ['Regulates sleep and wake cycles', 'Involved in reward, motivation, and pleasure — also in motor control', 'Controls heart rate and breathing', 'Regulates mood and serotonin levels'], correct: 1, explanation: 'Dopamine is a neurotransmitter central to the brain\'s reward system, motivating behavior by signaling reward expectation and pleasure.' },
          { id: 'psychology_l3_1_q2', question: 'What is the function of the prefrontal cortex?', choices: ['Processing visual information', 'Regulating heartbeat and breathing', 'Executive functions: planning, decision-making, impulse control, and personality expression', 'Processing pain signals'], correct: 2, explanation: 'The prefrontal cortex handles higher-order cognitive functions including planning, judgment, impulse control, working memory, and personality.' },
          { id: 'psychology_l3_1_q3', question: 'What does an "action potential" in a neuron represent?', choices: ['The resting state of a neuron', 'The electrical signal that travels down the axon when a neuron fires', 'The chemical signal crossing the synapse', 'The process of neuron development'], correct: 1, explanation: 'An action potential is the rapid electrical impulse that travels down a neuron\'s axon when it is sufficiently stimulated, enabling neural communication.' },
          { id: 'psychology_l3_1_q4', question: 'Split-brain research (Sperry and Gazzaniga) revealed that:', choices: ['The two brain hemispheres are completely identical in function', 'The left hemisphere specializes in language; the right in spatial and holistic processing', 'The brain cannot function if the two hemispheres are separated', 'Both hemispheres process language equally'], correct: 1, explanation: 'Studies of patients with severed corpus callosum revealed hemispheric specialization: left for language/logic, right for spatial/creative processing.' },
          { id: 'psychology_l3_1_q5', question: 'What is the "HPA axis" and its role in stress?', choices: ['Heart-Peripheral-Adrenal axis — controls blood pressure', 'Hypothalamic-Pituitary-Adrenal axis — the primary stress response system releasing cortisol', 'Hippocampal-Prefrontal-Amygdala axis — the memory formation pathway', 'Hypothalamic-Pituitary-Anterior axis — regulating growth hormones'], correct: 1, explanation: 'The HPA axis (Hypothalamic-Pituitary-Adrenal) is the central stress response system: hypothalamus signals pituitary, which signals adrenals to release cortisol.' },
        ],
      },
      {
        id: 'psychology_l3_2',
        title: 'Personality Psychology',
        description: 'Examine major theories of personality and how individual differences are assessed and explained.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'psychology_l3_2_q1', question: 'The "Big Five" personality traits (OCEAN) are:', choices: ['Optimism, curiosity, enthusiasm, adaptability, nurturing', 'Openness, conscientiousness, extraversion, agreeableness, neuroticism', 'Originality, commitment, empathy, assertiveness, negativity', 'Order, creativity, energy, adaptability, novelty'], correct: 1, explanation: 'The Big Five (OCEAN) are Openness to experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism — the dominant personality model.' },
          { id: 'psychology_l3_2_q2', question: 'Freud\'s structural model of the psyche consists of:', choices: ['Conscious, preconscious, and unconscious', 'Id, ego, and superego', 'Sensation, perception, and cognition', 'Instinct, reason, and morality'], correct: 1, explanation: 'Freud\'s structural model: the Id (primitive drives), Ego (rational mediator), and Superego (moral conscience), constantly in dynamic conflict.' },
          { id: 'psychology_l3_2_q3', question: 'What is Carl Jung\'s concept of the "collective unconscious"?', choices: ['Memories shared among people in the same culture', 'A deeper layer of unconscious shared by all humans, containing universal archetypes', 'The combined unconscious minds of a social group', 'Cultural knowledge passed through education'], correct: 1, explanation: 'Jung proposed a collective unconscious below the personal unconscious, containing universal symbols and patterns (archetypes) shared by all of humanity.' },
          { id: 'psychology_l3_2_q4', question: 'What is the "person-situation debate" in personality psychology?', choices: ['Whether personality or situation better predicts behavior', 'Whether personality develops from the person or from social situations', 'Whether personality is inherited or learned', 'Whether personality can change across the lifespan'], correct: 0, explanation: 'The person-situation debate (Mischel vs. trait theorists) asks whether personality traits or situational factors are better predictors of behavior.' },
          { id: 'psychology_l3_2_q5', question: 'What is "self-efficacy" (Bandura)?', choices: ['One\'s overall self-esteem and sense of worth', 'One\'s belief in their capacity to execute behaviors needed to produce specific outcomes', 'The tendency to believe one is better than average', 'One\'s actual ability to perform a given task'], correct: 1, explanation: 'Self-efficacy (Bandura) is the belief in one\'s capability to accomplish specific tasks — it strongly predicts motivation, performance, and persistence.' },
        ],
      },
      {
        id: 'psychology_l3_3',
        title: 'Health Psychology and Well-being',
        description: 'Explore the relationship between psychological factors and physical health, stress, and well-being.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'psychology_l3_3_q1', question: 'What is the "Type A" behavior pattern and its proposed link to health?', choices: ['Relaxed, patient personality linked to depression', 'Competitive, time-pressured, hostile personality associated with increased cardiovascular risk', 'Anxious, avoidant personality linked to immune dysfunction', 'Optimistic, social personality associated with longevity'], correct: 1, explanation: 'Type A personality (Friedman and Rosenman): competitive, impatient, hostile traits were initially linked to increased heart disease risk.' },
          { id: 'psychology_l3_3_q2', question: 'What is the "general adaptation syndrome" (Selye)?', choices: ['The body\'s three-stage response to stress: alarm, resistance, exhaustion', 'A model of how people adapt to new environments', 'The process of adapting cognitively to challenges', 'A therapy for helping people manage general anxiety'], correct: 0, explanation: 'Selye\'s GAS describes three physiological stages of stress response: alarm (fight-or-flight), resistance (adaptation), and exhaustion (if stress continues).' },
          { id: 'psychology_l3_3_q3', question: 'What does research consistently show about social relationships and health?', choices: ['Social relationships have no effect on physical health', 'Strong social connections are associated with better health outcomes and longer life', 'More social connections always lead to more stress', 'Only family relationships (not friendships) affect health'], correct: 1, explanation: 'Extensive research shows that strong social support is a major protective factor for physical and mental health, and social isolation is as harmful as smoking.' },
          { id: 'psychology_l3_3_q4', question: 'Martin Seligman\'s "PERMA" model of well-being includes:', choices: ['Pleasure, effort, reward, meaning, accomplishment', 'Positive emotions, engagement, relationships, meaning, accomplishment', 'Positivity, energy, resilience, mindfulness, ambition', 'Purpose, engagement, reward, mastery, authenticity'], correct: 1, explanation: 'Seligman\'s PERMA model: Positive emotions, Engagement, Relationships, Meaning, and Achievement (Accomplishment) — the pillars of flourishing.' },
          { id: 'psychology_l3_3_q5', question: 'What is the evidence-based technique of "mindfulness-based stress reduction" (MBSR)?', choices: ['Medication combined with therapy for stress disorders', 'Training in paying nonjudgmental attention to present-moment experience to reduce stress', 'A cognitive technique for reframing stressful thoughts', 'A social support program for people with chronic stress'], correct: 1, explanation: 'MBSR (Kabat-Zinn) teaches moment-to-moment, nonjudgmental awareness of thoughts, feelings, and sensations — with strong evidence for reducing stress and depression.' },
        ],
      },
    ],
  },
  {
    id: 'biology',
    label: 'Biology',
    emoji: '🧬',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'biology_p1', question: 'What is the basic unit of life?', choices: ['Atom', 'Molecule', 'Cell', 'Tissue'], correct: 2, explanation: 'The cell is the basic structural and functional unit of all living organisms, from single-celled bacteria to complex multicellular organisms.' },
      { id: 'biology_p2', question: 'What is the function of mitochondria in cells?', choices: ['Protein synthesis', 'Energy production (ATP)', 'DNA storage', 'Cell division'], correct: 1, explanation: 'Mitochondria are the "powerhouses" of the cell, producing ATP through cellular respiration using oxygen and glucose.' },
      { id: 'biology_p3', question: 'What molecule carries genetic information in most living organisms?', choices: ['RNA', 'DNA', 'Protein', 'ATP'], correct: 1, explanation: 'DNA (deoxyribonucleic acid) stores genetic information in the sequence of its four bases and is passed from parents to offspring.' },
      { id: 'biology_p4', question: 'The process by which plants convert sunlight into food is called:', choices: ['Respiration', 'Fermentation', 'Photosynthesis', 'Transpiration'], correct: 2, explanation: 'Photosynthesis converts light energy, water, and CO2 into glucose and oxygen, providing the energy base for most food webs.' },
      { id: 'biology_p5', question: 'Charles Darwin\'s theory of evolution by natural selection proposes that:', choices: ['Organisms change because they need to adapt', 'Individuals with favorable traits reproduce more successfully, passing those traits on', 'Mutations are always beneficial to organisms', 'Evolution is directed toward greater complexity'], correct: 1, explanation: 'Natural selection: heritable traits that improve survival and reproduction become more common in a population over generations.' },
      { id: 'biology_p6', question: 'What does DNA stand for?', choices: ['Deoxyribonucleic acid', 'Dinitrogen nucleic acid', 'Deoxyribose nitrogen acid', 'Dynamic nucleotide acid'], correct: 0, explanation: 'DNA stands for deoxyribonucleic acid — a double-helix polymer of nucleotides that stores genetic information in all cellular life.' },
      { id: 'biology_p7', question: 'Mendel\'s law of segregation states that:', choices: ['All offspring resemble their parents', 'Alleles separate during gamete formation, so each gamete carries one allele', 'Traits from different genes separate independently', 'Dominant traits always overpower recessive traits'], correct: 1, explanation: 'Mendel\'s law of segregation: during reproduction, the two alleles of a gene separate so each gamete (egg or sperm) carries only one allele.' },
      { id: 'biology_p8', question: 'Which domain of life includes bacteria?', choices: ['Eukarya', 'Archaea', 'Bacteria', 'Prokaryota'], correct: 2, explanation: 'The three domains of life are Bacteria, Archaea, and Eukarya. Bacteria are prokaryotes — single-celled organisms without a membrane-bound nucleus.' },
      { id: 'biology_p9', question: 'What is the role of ribosomes in cells?', choices: ['Energy production', 'Protein synthesis', 'DNA replication', 'Waste removal'], correct: 1, explanation: 'Ribosomes are organelles that translate mRNA sequences into proteins — performing the process of translation in protein synthesis.' },
      { id: 'biology_p10', question: 'CRISPR-Cas9 is a technology used for:', choices: ['Producing insulin from bacteria', 'Precise gene editing by cutting and modifying specific DNA sequences', 'Cloning entire organisms', 'Sequencing the human genome'], correct: 1, explanation: 'CRISPR-Cas9 is a revolutionary gene-editing tool that allows precise cuts in DNA at specific sequences, enabling targeted genetic modifications.' },
      { id: 'biology_p11', question: 'What is the difference between mitosis and meiosis?', choices: ['Mitosis produces 4 genetically unique cells; meiosis produces 2 identical cells', 'Mitosis produces 2 identical daughter cells; meiosis produces 4 genetically unique gametes', 'Mitosis occurs in reproductive organs; meiosis occurs in all body cells', 'They are two names for the same process'], correct: 1, explanation: 'Mitosis produces 2 identical diploid cells for growth/repair; meiosis produces 4 haploid gametes with genetic diversity for sexual reproduction.' },
      { id: 'biology_p12', question: 'The Hardy-Weinberg equilibrium describes a population that is:', choices: ['Rapidly evolving due to natural selection', 'In a state where allele frequencies remain constant — not evolving', 'Undergoing rapid genetic drift', 'Being affected by strong selection pressures'], correct: 1, explanation: 'Hardy-Weinberg equilibrium describes a theoretical non-evolving population where allele frequencies remain stable absent selection, mutation, drift, migration, or non-random mating.' },
    ],
    lessons: [
      {
        id: 'biology_l1_1',
        title: 'Cell Structure and Function',
        description: 'Explore the structures of prokaryotic and eukaryotic cells and the functions of key organelles.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'biology_l1_1_q1', question: 'What distinguishes eukaryotic cells from prokaryotic cells?', choices: ['Eukaryotic cells are larger and contain membrane-bound organelles including a nucleus', 'Prokaryotic cells have more DNA than eukaryotic cells', 'Eukaryotic cells lack a cell membrane', 'Prokaryotic cells have a true nucleus'], correct: 0, explanation: 'Eukaryotic cells (animals, plants, fungi, protists) have a membrane-bound nucleus and organelles; prokaryotes (bacteria, archaea) do not.' },
          { id: 'biology_l1_1_q2', question: 'What is the function of the cell membrane?', choices: ['Store genetic information', 'Regulate what enters and exits the cell', 'Produce energy for the cell', 'Synthesize proteins'], correct: 1, explanation: 'The cell membrane (plasma membrane) is a selectively permeable phospholipid bilayer that controls the movement of substances in and out of the cell.' },
          { id: 'biology_l1_1_q3', question: 'What is the role of the endoplasmic reticulum (ER)?', choices: ['Cell division', 'Transport and modification of proteins and lipids', 'DNA replication', 'Energy production'], correct: 1, explanation: 'The rough ER has ribosomes and synthesizes/processes proteins; the smooth ER synthesizes lipids and detoxifies chemicals.' },
          { id: 'biology_l1_1_q4', question: 'Plant cells differ from animal cells by having:', choices: ['Mitochondria but no nucleus', 'A cell wall, chloroplasts, and a large central vacuole', 'No cell membrane', 'DNA only in the cytoplasm'], correct: 1, explanation: 'Plant cells uniquely have a rigid cell wall (cellulose), chloroplasts for photosynthesis, and a large central vacuole for storage and structural support.' },
          { id: 'biology_l1_1_q5', question: 'What do lysosomes do?', choices: ['Synthesize proteins', 'Produce energy', 'Contain digestive enzymes that break down cellular waste and foreign material', 'Transport molecules across the cell'], correct: 2, explanation: 'Lysosomes contain hydrolytic enzymes that break down worn-out organelles, food particles, and foreign invaders — acting as the cell\'s recycling system.' },
        ],
      },
      {
        id: 'biology_l1_2',
        title: 'Genetics and Heredity',
        description: 'Learn the principles of inheritance, genes, and how traits are passed from parents to offspring.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'biology_l1_2_q1', question: 'What is a "gene"?', choices: ['A unit of DNA that codes for a specific protein or functional RNA', 'The complete genetic material of an organism', 'A section of the cell membrane', 'A type of chromosome found only in humans'], correct: 0, explanation: 'A gene is a specific sequence of DNA that encodes instructions for making a protein or functional RNA molecule, influencing traits.' },
          { id: 'biology_l1_2_q2', question: 'In a cross between two heterozygous (Aa) individuals, what ratio of offspring will show the dominant phenotype?', choices: ['1:1', '1:2:1', '3:1', '1:3'], correct: 2, explanation: 'An Aa × Aa cross yields AA:Aa:aa in a 1:2:1 ratio — 3/4 show dominant phenotype (AA + Aa) and 1/4 show recessive (aa), a 3:1 ratio.' },
          { id: 'biology_l1_2_q3', question: 'What is "codominance" in genetics?', choices: ['When one allele completely masks the other', 'When both alleles are fully expressed simultaneously in the phenotype', 'When heterozygotes show an intermediate phenotype', 'When two genes influence the same trait'], correct: 1, explanation: 'In codominance, both alleles are fully expressed simultaneously (e.g., AB blood type, where both A and B antigens are expressed on red blood cells).' },
          { id: 'biology_l1_2_q4', question: 'How many chromosomes do normal human body cells contain?', choices: ['23', '46', '48', '44'], correct: 1, explanation: 'Human somatic (body) cells contain 46 chromosomes arranged in 23 pairs — one chromosome of each pair from each parent.' },
          { id: 'biology_l1_2_q5', question: 'What is a "mutation"?', choices: ['The process of sexual reproduction', 'A change in the DNA sequence of a gene or chromosome', 'The normal process of gene expression', 'The death of a cell due to damage'], correct: 1, explanation: 'A mutation is a change in the nucleotide sequence of DNA. Mutations can be beneficial, harmful, or neutral, and drive genetic variation.' },
        ],
      },
      {
        id: 'biology_l1_3',
        title: 'Ecology and Ecosystems',
        description: 'Understand the relationships between organisms and their environments in ecosystems.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'biology_l1_3_q1', question: 'What is a "food web"?', choices: ['The network of feeding relationships among organisms in an ecosystem', 'A diagram of predator-prey relationships only', 'The set of all plants in an ecosystem', 'The hierarchy of organisms by size'], correct: 0, explanation: 'A food web shows the complex network of overlapping food chains — who eats whom — in an ecosystem, showing energy flow.' },
          { id: 'biology_l1_3_q2', question: 'What is the difference between a "producer" and a "consumer" in ecology?', choices: ['Producers are animals; consumers are plants', 'Producers make food through photosynthesis; consumers eat other organisms for energy', 'Producers live in water; consumers live on land', 'Producers are decomposers; consumers are primary organisms'], correct: 1, explanation: 'Producers (plants, algae) create food via photosynthesis; consumers (animals, fungi) obtain energy by eating other organisms.' },
          { id: 'biology_l1_3_q3', question: 'What is "symbiosis"?', choices: ['Competition between two species for the same resource', 'A close, long-term interaction between two different species', 'The process of one species evolving into two', 'The movement of a species into a new habitat'], correct: 1, explanation: 'Symbiosis is a close, prolonged association between two species. Types include mutualism (+/+), commensalism (+/0), and parasitism (+/-).' },
          { id: 'biology_l1_3_q4', question: 'What is the role of decomposers in an ecosystem?', choices: ['Convert sunlight to food', 'Break down dead organic matter and recycle nutrients back into the ecosystem', 'Control populations of herbivores', 'Provide oxygen for other organisms'], correct: 1, explanation: 'Decomposers (bacteria, fungi) break down dead organisms and waste, releasing nutrients back into the soil and atmosphere for use by producers.' },
          { id: 'biology_l1_3_q5', question: 'What is "carrying capacity" in ecology?', choices: ['The maximum weight a predator can carry', 'The maximum population size an environment can sustainably support', 'The capacity of an organism to carry diseases', 'The amount of food an ecosystem produces annually'], correct: 1, explanation: 'Carrying capacity (K) is the maximum population size that an environment can sustain indefinitely given available resources.' },
        ],
      },
      {
        id: 'biology_l2_1',
        title: 'Evolution and Natural Selection',
        description: 'Explore the mechanisms of evolution, evidence for common descent, and speciation.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'biology_l2_1_q1', question: 'What are the four mechanisms of evolutionary change?', choices: ['Mutation, migration, selection, reproduction', 'Natural selection, genetic drift, gene flow, and mutation', 'Adaptation, speciation, extinction, radiation', 'Selection, recombination, hybridization, isolation'], correct: 1, explanation: 'Evolution occurs through natural selection, genetic drift (random change), gene flow (migration between populations), and mutation.' },
          { id: 'biology_l2_1_q2', question: 'What is "genetic drift"?', choices: ['The movement of genes between populations through migration', 'Random changes in allele frequencies in a population, especially significant in small populations', 'The directed change in alleles due to natural selection', 'The accumulation of mutations over generations'], correct: 1, explanation: 'Genetic drift is random fluctuation in allele frequencies due to chance events — most significant in small populations where it can lead to alleles disappearing.' },
          { id: 'biology_l2_1_q3', question: 'What is "speciation"?', choices: ['The extinction of a species', 'The process by which new distinct species arise through evolution', 'The migration of a species to a new area', 'The adaptation of a species to a new diet'], correct: 1, explanation: 'Speciation is the evolutionary process by which populations become reproductively isolated and diverge into distinct species.' },
          { id: 'biology_l2_1_q4', question: 'Convergent evolution refers to:', choices: ['Two populations of the same species evolving together', 'Unrelated species independently evolving similar traits due to similar environments', 'Related species diverging to fill different ecological niches', 'Horizontal gene transfer between different species'], correct: 1, explanation: 'Convergent evolution: unrelated species develop similar adaptations (e.g., wings in birds and bats, streamlined bodies in dolphins and sharks) due to similar selective pressures.' },
          { id: 'biology_l2_1_q5', question: 'What is the molecular clock in evolutionary biology?', choices: ['The timing of gene expression during cell division', 'Using the rate of genetic mutation to estimate evolutionary divergence times', 'A technique for measuring the age of fossils', 'The circadian rhythms of organisms across evolution'], correct: 1, explanation: 'The molecular clock uses the known rate of genetic mutations to estimate when two lineages diverged, dating evolutionary events without fossils.' },
        ],
      },
      {
        id: 'biology_l2_2',
        title: 'Molecular Biology: DNA, RNA, and Proteins',
        description: 'Understand the central dogma of molecular biology and the processes of gene expression.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'biology_l2_2_q1', question: 'What is the "central dogma" of molecular biology?', choices: ['Cells → Tissues → Organs → Systems', 'DNA → RNA → Protein', 'Nucleus → Ribosomes → Cell membrane', 'Genes → Chromosomes → Genome'], correct: 1, explanation: 'The central dogma describes the flow of genetic information: DNA is transcribed into RNA, which is translated into protein.' },
          { id: 'biology_l2_2_q2', question: 'What occurs during "transcription"?', choices: ['DNA is copied to produce a new DNA strand', 'DNA sequence is used as a template to produce a complementary mRNA strand', 'mRNA is used to assemble a protein at a ribosome', 'DNA is repaired after mutation'], correct: 1, explanation: 'Transcription occurs in the nucleus: RNA polymerase reads a DNA template strand and synthesizes a complementary mRNA strand.' },
          { id: 'biology_l2_2_q3', question: 'During translation, what structure "reads" the mRNA code?', choices: ['DNA polymerase', 'RNA polymerase', 'Ribosome', 'Endoplasmic reticulum'], correct: 2, explanation: 'Ribosomes bind to mRNA during translation, reading codons (3-nucleotide sequences) and linking amino acids to build a protein.' },
          { id: 'biology_l2_2_q4', question: 'What is a "codon"?', choices: ['A sequence of 2 nucleotides specifying an amino acid', 'A sequence of 3 nucleotides in mRNA that specifies an amino acid', 'A specific protein-binding site on DNA', 'A regulatory sequence that controls gene expression'], correct: 1, explanation: 'A codon is a three-nucleotide sequence in mRNA that specifies a particular amino acid (or a stop signal) during translation.' },
          { id: 'biology_l2_2_q5', question: 'What is "epigenetics"?', choices: ['The study of genes inherited from ancestors', 'Changes in gene expression without changes to the DNA sequence, often heritable', 'The study of all genes in an organism\'s genome', 'Genetic changes caused by environmental factors'], correct: 1, explanation: 'Epigenetics studies heritable changes in gene expression caused by factors like DNA methylation and histone modification — not changes to the DNA sequence itself.' },
        ],
      },
      {
        id: 'biology_l2_3',
        title: 'Human Body Systems',
        description: 'Survey the major organ systems of the human body and how they function together.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'biology_l2_3_q1', question: 'What is the primary function of the circulatory system?', choices: ['Digest food and absorb nutrients', 'Transport oxygen, nutrients, hormones, and remove waste throughout the body', 'Filter waste from the blood', 'Control body movements'], correct: 1, explanation: 'The circulatory system (heart, blood vessels, blood) transports oxygen, nutrients, and hormones to cells, and carries waste products to excretory organs.' },
          { id: 'biology_l2_3_q2', question: 'Where does gas exchange occur in the lungs?', choices: ['Bronchi', 'Trachea', 'Alveoli', 'Bronchioles'], correct: 2, explanation: 'Alveoli are tiny air sacs in the lungs with thin walls surrounded by capillaries — where O2 passes into blood and CO2 passes out.' },
          { id: 'biology_l2_3_q3', question: 'What is the role of the pancreas?', choices: ['Produces bile to digest fats', 'Produces insulin and glucagon to regulate blood sugar, and digestive enzymes', 'Filters toxins from the blood', 'Produces red blood cells'], correct: 1, explanation: 'The pancreas has dual functions: endocrine (produces insulin/glucagon to regulate blood sugar) and exocrine (secretes digestive enzymes into the small intestine).' },
          { id: 'biology_l2_3_q4', question: 'What is the function of the immune system\'s T cells?', choices: ['Produce antibodies to neutralize pathogens', 'Directly kill infected cells or coordinate immune responses', 'Transport oxygen throughout the body', 'Remove cellular waste products'], correct: 1, explanation: 'T cells are lymphocytes: cytotoxic T cells kill infected cells; helper T cells coordinate immune responses; regulatory T cells suppress excessive responses.' },
          { id: 'biology_l2_3_q5', question: 'What hormone is primarily responsible for regulating the body\'s metabolism and temperature?', choices: ['Insulin', 'Cortisol', 'Thyroid hormone (thyroxine)', 'Estrogen'], correct: 2, explanation: 'Thyroid hormones (thyroxine/T4 and T3) regulate metabolic rate, energy production, growth, and body temperature.' },
        ],
      },
      {
        id: 'biology_l3_1',
        title: 'Microbiology and Virology',
        description: 'Examine the biology of microorganisms including bacteria, viruses, and their role in health and disease.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'biology_l3_1_q1', question: 'What makes viruses fundamentally different from living cells?', choices: ['Viruses are too small to see', 'Viruses cannot reproduce independently — they require a host cell\'s machinery', 'Viruses do not contain any genetic material', 'Viruses do not cause disease'], correct: 1, explanation: 'Viruses are acellular — they have no metabolism and cannot replicate independently, relying entirely on host cell machinery to reproduce.' },
          { id: 'biology_l3_1_q2', question: 'What is the mechanism of antibiotic resistance?', choices: ['Antibiotics stop working after a fixed number of uses', 'Bacteria evolve through natural selection to survive exposure to antibiotics', 'Humans develop immunity to antibiotics over time', 'Antibiotics are broken down by stomach acid before reaching bacteria'], correct: 1, explanation: 'Resistance evolves through natural selection: bacteria with mutations that allow survival of antibiotic exposure reproduce, spreading resistant genes.' },
          { id: 'biology_l3_1_q3', question: 'What is the lytic cycle in bacteriophage (virus) reproduction?', choices: ['The virus remains dormant in the bacterial chromosome', 'The virus hijacks the bacterium to produce new viruses, then lyses (destroys) the cell', 'The virus gradually weakens the bacterium over time', 'The virus fuses with the bacterium permanently'], correct: 1, explanation: 'In the lytic cycle, a phage injects its DNA, hijacks cell machinery to replicate, and lyses the host cell to release hundreds of new phages.' },
          { id: 'biology_l3_1_q4', question: 'What are "prions"?', choices: ['A type of RNA virus with no protein coat', 'Misfolded proteins that can induce other proteins to misfold, causing fatal neurodegenerative diseases', 'The smallest known bacteria', 'Beneficial proteins in the human gut microbiome'], correct: 1, explanation: 'Prions are abnormal, misfolded proteins that induce normal proteins to misfold. They cause BSE (mad cow disease) and Creutzfeldt-Jakob disease.' },
          { id: 'biology_l3_1_q5', question: 'What does the "R0" (basic reproduction number) measure in epidemiology?', choices: ['The rate at which a pathogen mutates', 'The average number of people an infected person will infect in a fully susceptible population', 'The mortality rate of an infectious disease', 'The time from infection to showing symptoms'], correct: 1, explanation: 'R0 (R-naught) is the average number of secondary infections caused by one infected person in a fully susceptible population — R0 > 1 means an epidemic grows.' },
        ],
      },
      {
        id: 'biology_l3_2',
        title: 'Biotechnology and Genetic Engineering',
        description: 'Explore modern biotechnology including genetic engineering, genomics, and biomedical applications.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'biology_l3_2_q1', question: 'What is "recombinant DNA technology"?', choices: ['Repairing damaged DNA within a cell', 'Combining DNA from different sources to create novel genetic sequences', 'Sequencing the complete DNA of an organism', 'Using radiation to create mutations for crop improvement'], correct: 1, explanation: 'Recombinant DNA technology joins DNA from different organisms to create new combinations, enabling production of proteins like insulin in bacteria.' },
          { id: 'biology_l3_2_q2', question: 'What was the Human Genome Project (1990-2003)?', choices: ['A project to improve human health through better nutrition', 'An international effort to sequence and map all genes in the human genome', 'A project to create genetically modified humans', 'A study of human evolutionary history using fossils'], correct: 1, explanation: 'The HGP sequenced the entire human genome (~3 billion base pairs, ~20,000-25,000 genes), revolutionizing biology and medicine.' },
          { id: 'biology_l3_2_q3', question: 'What is "polymerase chain reaction" (PCR)?', choices: ['A technique for translating DNA into proteins', 'A method for rapidly amplifying specific DNA sequences', 'A method for editing genes in living organisms', 'A technique for separating proteins by size'], correct: 1, explanation: 'PCR amplifies specific DNA sequences exponentially through cycles of heating and cooling, enabling analysis of tiny amounts of DNA — fundamental to forensics, diagnostics, and research.' },
          { id: 'biology_l3_2_q4', question: 'What are "GMOs" (genetically modified organisms)?', choices: ['Organisms that have been selectively bred over many generations', 'Organisms whose genetic material has been deliberately altered using genetic engineering', 'Organisms exposed to natural radiation causing mutations', 'Organisms that produce unusual proteins due to epigenetic changes'], correct: 1, explanation: 'GMOs have specific genes inserted, deleted, or modified using biotechnology — examples include Bt corn (insect resistance) and Golden Rice (vitamin A).' },
          { id: 'biology_l3_2_q5', question: 'What is the significance of telomeres in aging?', choices: ['Telomeres protect chromosomes but shorten with each cell division, limiting cellular lifespan', 'Telomeres carry genes that cause aging', 'Telomeres repair DNA damage and their loss causes cancer', 'Telomeres regulate metabolism and determine lifespan'], correct: 0, explanation: 'Telomeres cap chromosomes and shorten with each cell division. When critically short, cells stop dividing (senescence) — linked to aging and cancer.' },
        ],
      },
      {
        id: 'biology_l3_3',
        title: 'Neuroscience and the Brain',
        description: 'Examine the structure and function of the nervous system and the biology of behavior.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'biology_l3_3_q1', question: 'What is the primary function of myelin in the nervous system?', choices: ['Produce neurotransmitters at the synapse', 'Insulate axons to speed up the transmission of nerve impulses', 'Store energy for neural activity', 'Detect sensory stimuli in the environment'], correct: 1, explanation: 'Myelin is a fatty insulating sheath around axons that allows saltatory conduction, greatly increasing the speed of nerve impulse transmission.' },
          { id: 'biology_l3_3_q2', question: 'How do neurons communicate across a synapse?', choices: ['Through direct electrical connections only', 'By releasing neurotransmitters that bind to receptors on the next neuron', 'Through physical contact between cell membranes', 'By sending electrical currents through gap junctions'], correct: 1, explanation: 'At synapses, action potentials trigger release of neurotransmitters into the synaptic cleft; they bind to receptors on the postsynaptic neuron, triggering or inhibiting a new signal.' },
          { id: 'biology_l3_3_q3', question: 'What is "long-term potentiation" (LTP)?', choices: ['The long-term reduction of synaptic strength after injury', 'A persistent strengthening of synapses based on recent patterns of activity — the cellular basis of learning and memory', 'The natural decline of neural activity during sleep', 'The gradual increase of action potential threshold over time'], correct: 1, explanation: 'LTP is a long-lasting increase in synaptic strength following repeated stimulation, believed to be the primary mechanism underlying learning and memory formation.' },
          { id: 'biology_l3_3_q4', question: 'What is the blood-brain barrier (BBB)?', choices: ['A barrier preventing the brain from affecting blood pressure', 'A selective barrier formed by brain capillaries that protects the brain from potentially harmful substances in the blood', 'A layer of cerebrospinal fluid surrounding the brain', 'The barrier between conscious and unconscious thought'], correct: 1, explanation: 'The BBB is formed by tight junctions between capillary endothelial cells in the brain, strictly regulating what substances pass from blood to brain.' },
          { id: 'biology_l3_3_q5', question: 'What is the role of the glial cells (glia) in the nervous system?', choices: ['Transmit electrical signals between neurons', 'Support neurons by providing nutrients, insulation, and immune defense', 'Process sensory information in the brain', 'Produce hormones that regulate neural activity'], correct: 1, explanation: 'Glia (including astrocytes, oligodendrocytes, microglia) support neurons by providing nutrients, forming myelin, clearing waste, and performing immune functions.' },
        ],
      },
    ],
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    emoji: '⚗️',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'chemistry_p1', question: 'What is the atomic number of an element?', choices: ['The number of neutrons in the nucleus', 'The number of protons in the nucleus', 'The total mass of the atom', 'The number of electrons in the outer shell'], correct: 1, explanation: 'The atomic number is the number of protons in an atom\'s nucleus, which defines the element and determines its place on the periodic table.' },
      { id: 'chemistry_p2', question: 'Which type of bond involves the sharing of electron pairs between atoms?', choices: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'], correct: 1, explanation: 'Covalent bonds form when atoms share electron pairs. They are common in organic molecules and between nonmetal atoms.' },
      { id: 'chemistry_p3', question: 'What is Avogadro\'s number?', choices: ['6.022 × 10²³', '3.14 × 10⁻⁷', '1.602 × 10⁻¹⁹', '9.11 × 10⁻³¹'], correct: 0, explanation: 'Avogadro\'s number (6.022 × 10²³) is the number of particles in one mole of a substance — a fundamental constant in chemistry.' },
      { id: 'chemistry_p4', question: 'pH is a measure of:', choices: ['Temperature in a solution', 'The concentration of hydrogen ions — acidity or basicity of a solution', 'The amount of dissolved oxygen', 'The density of a solution'], correct: 1, explanation: 'pH measures hydrogen ion concentration: pH < 7 is acidic, pH = 7 is neutral, and pH > 7 is basic (alkaline).' },
      { id: 'chemistry_p5', question: 'In a chemical reaction, what is a "catalyst"?', choices: ['A substance consumed in a reaction', 'A substance that speeds up a reaction without being permanently changed', 'A substance that slows down a reaction', 'A substance produced in a reaction'], correct: 1, explanation: 'A catalyst increases reaction rate by lowering activation energy; it is not consumed and can be used repeatedly.' },
      { id: 'chemistry_p6', question: 'What is the law of conservation of mass?', choices: ['Mass increases in all chemical reactions', 'The total mass of reactants equals the total mass of products in a chemical reaction', 'Mass can be destroyed in nuclear reactions', 'Only mass that reacts is conserved'], correct: 1, explanation: 'The law of conservation of mass states that mass is neither created nor destroyed in chemical reactions — total reactant mass equals total product mass.' },
      { id: 'chemistry_p7', question: 'What is the difference between an "element" and a "compound"?', choices: ['Elements are gases; compounds are solids', 'An element is made of one type of atom; a compound contains two or more different elements chemically bonded', 'Elements are natural; compounds are synthetic', 'A compound is a mixture; an element is a pure substance'], correct: 1, explanation: 'An element consists of only one kind of atom (e.g., O2, Fe); a compound has two or more elements chemically bonded in fixed ratios (e.g., H2O, NaCl).' },
      { id: 'chemistry_p8', question: 'The periodic table organizes elements primarily by:', choices: ['Alphabetical order of their names', 'Increasing atomic number, with similar properties in columns (groups)', 'Density from lightest to heaviest', 'Discovery date from oldest to newest'], correct: 1, explanation: 'The periodic table arranges elements by increasing atomic number, with elements in the same column (group) sharing similar chemical properties.' },
      { id: 'chemistry_p9', question: 'What happens in an exothermic reaction?', choices: ['The reaction absorbs energy from the surroundings', 'The reaction releases energy (as heat or light) to the surroundings', 'The temperature of the reaction decreases', 'The products have more energy than the reactants'], correct: 1, explanation: 'Exothermic reactions release energy to the surroundings (products have less energy than reactants). Combustion is a familiar example.' },
      { id: 'chemistry_p10', question: 'What is the molar mass of water (H2O)?', choices: ['10 g/mol', '16 g/mol', '18 g/mol', '20 g/mol'], correct: 2, explanation: 'Molar mass of H2O = 2(1) + 16 = 18 g/mol. One mole of water has a mass of 18 grams and contains 6.022 × 10²³ molecules.' },
      { id: 'chemistry_p11', question: 'What is Le Chatelier\'s principle?', choices: ['A system at equilibrium will shift to oppose changes imposed on it', 'The rate of a reaction increases with temperature', 'Acids and bases neutralize each other to form water', 'The entropy of an isolated system always increases'], correct: 0, explanation: 'Le Chatelier\'s principle: if a stress (change in concentration, temperature, pressure) is applied to a system at equilibrium, it shifts to partially counteract the stress.' },
      { id: 'chemistry_p12', question: 'In electrochemistry, oxidation refers to:', choices: ['Gain of electrons', 'Loss of electrons', 'Gain of protons', 'Loss of neutrons'], correct: 1, explanation: 'Oxidation is loss of electrons (OIL — Oxidation Is Loss); reduction is gain of electrons (RIG — Reduction Is Gain). Remember: OIL RIG.' },
    ],
    lessons: [
      {
        id: 'chemistry_l1_1',
        title: 'Matter and the Periodic Table',
        description: 'Learn about the structure of matter, atoms, and how elements are organized in the periodic table.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'chemistry_l1_1_q1', question: 'What are the three subatomic particles and their charges?', choices: ['Proton (+), neutron (0), electron (-)', 'Proton (-), neutron (+), electron (0)', 'Proton (0), neutron (+), electron (-)', 'Proton (+), neutron (-), electron (0)'], correct: 0, explanation: 'Atoms consist of protons (positive, in nucleus), neutrons (neutral, in nucleus), and electrons (negative, surrounding nucleus).' },
          { id: 'chemistry_l1_1_q2', question: 'What are "isotopes"?', choices: ['Atoms of different elements with the same mass', 'Atoms of the same element with different numbers of neutrons', 'Charged atoms that have gained or lost electrons', 'Different forms of a compound'], correct: 1, explanation: 'Isotopes are atoms of the same element (same atomic number/protons) but different mass numbers due to different numbers of neutrons.' },
          { id: 'chemistry_l1_1_q3', question: 'Elements in the same "group" (column) of the periodic table have similar:', choices: ['Atomic masses', 'Chemical properties, due to similar valence electron configurations', 'Physical states at room temperature', 'Densities and melting points'], correct: 1, explanation: 'Elements in the same group share similar chemical properties because they have the same number of valence (outer shell) electrons.' },
          { id: 'chemistry_l1_1_q4', question: 'What is the difference between "metals" and "nonmetals" on the periodic table?', choices: ['Metals are lighter; nonmetals are heavier', 'Metals conduct electricity and heat, are malleable; nonmetals generally do not conduct and are brittle', 'Metals are gases; nonmetals are solids', 'Metals are on the right side; nonmetals are on the left'], correct: 1, explanation: 'Metals (left/center of table) are conductive, malleable, and shiny; nonmetals (upper right) are generally poor conductors and more electronegative.' },
          { id: 'chemistry_l1_1_q5', question: 'What is "electronegativity"?', choices: ['The total charge of an atom', 'An atom\'s ability to attract electrons when forming chemical bonds', 'The number of electrons an atom can gain or lose', 'The energy released when an electron is added to an atom'], correct: 1, explanation: 'Electronegativity measures how strongly an atom attracts shared electrons in a bond. Fluorine is the most electronegative element.' },
        ],
      },
      {
        id: 'chemistry_l1_2',
        title: 'Chemical Bonding',
        description: 'Explore how atoms form chemical bonds and how bond type determines properties of substances.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'chemistry_l1_2_q1', question: 'What is an "ionic bond"?', choices: ['Sharing of electrons between two nonmetals', 'Transfer of electrons from metal to nonmetal, creating oppositely charged ions that attract', 'Attraction between molecules due to temporary dipoles', 'A bond formed by sharing multiple electron pairs'], correct: 1, explanation: 'Ionic bonds form when electrons transfer from a metal to a nonmetal, creating positive metal ions and negative nonmetal ions that attract each other.' },
          { id: 'chemistry_l1_2_q2', question: 'What is a "polar covalent bond"?', choices: ['A bond with equal sharing of electrons', 'A bond where electrons are shared unequally due to different electronegativities', 'A bond between a metal and nonmetal', 'A bond forming a ring structure'], correct: 1, explanation: 'In polar covalent bonds, electrons are shared unequally — the more electronegative atom attracts the electrons more strongly, creating partial charges.' },
          { id: 'chemistry_l1_2_q3', question: 'Why does water have a bent molecular shape?', choices: ['Because oxygen has 8 protons and 8 neutrons', 'Because the two lone pairs of electrons on oxygen repel the bonding pairs, bending the molecule', 'Because hydrogen bonds are very strong', 'Because water is a liquid at room temperature'], correct: 1, explanation: 'VSEPR theory: the two lone pairs on oxygen repel the H-O-H bonding pairs, resulting in a bent geometry with a ~104.5° bond angle.' },
          { id: 'chemistry_l1_2_q4', question: 'What are "hydrogen bonds"?', choices: ['Covalent bonds between hydrogen atoms', 'Strong dipole-dipole attractions between molecules where hydrogen is bonded to N, O, or F', 'Ionic bonds involving hydrogen ions', 'The bonds within a hydrogen molecule (H2)'], correct: 1, explanation: 'Hydrogen bonds are strong intermolecular attractions between partially positive H (bonded to N, O, or F) and the lone pairs on N, O, or F in another molecule.' },
          { id: 'chemistry_l1_2_q5', question: 'What is the "octet rule" in chemistry?', choices: ['Atoms always have 8 neutrons', 'Atoms tend to form bonds to achieve 8 valence electrons, like noble gases', 'Only 8 elements can form chemical bonds', 'Chemical reactions always involve 8 atoms'], correct: 1, explanation: 'The octet rule: most atoms form bonds to achieve 8 valence electrons (like noble gases), gaining stability through full outer shells.' },
        ],
      },
      {
        id: 'chemistry_l1_3',
        title: 'Chemical Reactions',
        description: 'Understand how to balance chemical equations and classify different types of chemical reactions.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'chemistry_l1_3_q1', question: 'Why must chemical equations be "balanced"?', choices: ['To make them look symmetrical', 'To satisfy the law of conservation of mass — the same number of each atom on both sides', 'Because unbalanced equations produce explosions', 'To satisfy the law of conservation of energy'], correct: 1, explanation: 'Balanced equations have equal numbers of each atom on both sides, satisfying conservation of mass — atoms are rearranged, not created or destroyed.' },
          { id: 'chemistry_l1_3_q2', question: 'In a synthesis reaction:', choices: ['One compound breaks down into simpler substances', 'Two or more substances combine to form one new substance (A + B → AB)', 'Substances exchange partners (AB + CD → AD + CB)', 'One substance replaces another in a compound'], correct: 1, explanation: 'Synthesis reactions combine two or more reactants to form a single product (e.g., 2H2 + O2 → 2H2O).' },
          { id: 'chemistry_l1_3_q3', question: 'What is "activation energy" in a chemical reaction?', choices: ['The energy released when a reaction is complete', 'The minimum energy required for reactants to begin reacting', 'The total energy stored in chemical bonds', 'The energy absorbed by a catalyst'], correct: 1, explanation: 'Activation energy (Ea) is the minimum energy needed to break bonds in reactants and initiate a chemical reaction — the energy barrier to reaction.' },
          { id: 'chemistry_l1_3_q4', question: 'What happens in a combustion reaction?', choices: ['Acid reacts with base to form salt and water', 'A substance burns in oxygen, releasing heat and light and forming oxides', 'Two ionic compounds exchange anions', 'A single compound breaks down into elements'], correct: 1, explanation: 'Combustion: a fuel reacts with O2 to release energy. Complete combustion of hydrocarbons produces CO2 and H2O.' },
          { id: 'chemistry_l1_3_q5', question: 'What is a "precipitate" in chemistry?', choices: ['A gas produced in a chemical reaction', 'An insoluble solid that forms when two solutions are mixed', 'The rate at which a reaction occurs', 'An acid produced from metal dissolution'], correct: 1, explanation: 'A precipitate is an insoluble solid that forms when two solutions containing certain ions are mixed (e.g., mixing AgNO3 and NaCl forms AgCl precipitate).' },
        ],
      },
      {
        id: 'chemistry_l2_1',
        title: 'Thermochemistry',
        description: 'Study the energy changes that accompany chemical reactions and physical transformations.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'chemistry_l2_1_q1', question: 'What is enthalpy (H) in thermochemistry?', choices: ['The randomness or disorder of a system', 'The heat content of a system at constant pressure', 'The total kinetic energy of all molecules', 'The energy stored in chemical bonds'], correct: 1, explanation: 'Enthalpy (H) represents the heat content of a system at constant pressure. ΔH for a reaction indicates heat absorbed (positive) or released (negative).' },
          { id: 'chemistry_l2_1_q2', question: 'What does Hess\'s Law state?', choices: ['The total enthalpy change is the same regardless of the reaction pathway', 'Energy is conserved in all physical processes', 'Reactions always proceed toward lower energy', 'Enthalpy increases with temperature'], correct: 0, explanation: 'Hess\'s Law: the total enthalpy change for a reaction is the same whether it proceeds in one step or multiple steps — ΔH is path-independent.' },
          { id: 'chemistry_l2_1_q3', question: 'What is "entropy" (S) in thermodynamics?', choices: ['The heat released in a reaction', 'A measure of the disorder or randomness of a system', 'The energy available to do work', 'The stability of chemical bonds'], correct: 1, explanation: 'Entropy (S) measures the disorder, randomness, or number of possible arrangements of a system. The second law states total entropy always increases.' },
          { id: 'chemistry_l2_1_q4', question: 'Gibbs free energy (ΔG) predicts that a reaction is spontaneous when:', choices: ['ΔG > 0', 'ΔG = 0', 'ΔG < 0', 'ΔG depends only on temperature'], correct: 2, explanation: 'ΔG < 0 indicates a spontaneous reaction (releases free energy); ΔG > 0 is non-spontaneous; ΔG = 0 means the system is at equilibrium.' },
          { id: 'chemistry_l2_1_q5', question: 'What is "specific heat capacity"?', choices: ['The heat produced per mole of fuel burned', 'The amount of heat needed to raise 1 gram of a substance by 1°C', 'The temperature at which a substance changes state', 'The energy released when bonds form'], correct: 1, explanation: 'Specific heat capacity is the amount of heat energy required to raise the temperature of 1 gram of a substance by 1°C. Water has a high specific heat (4.18 J/g°C).' },
        ],
      },
      {
        id: 'chemistry_l2_2',
        title: 'Acids, Bases, and Equilibrium',
        description: 'Explore acid-base chemistry, the pH scale, and the principles of chemical equilibrium.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'chemistry_l2_2_q1', question: 'The Brønsted-Lowry definition of an acid is:', choices: ['A substance that produces OH⁻ ions in solution', 'A proton (H⁺) donor', 'A substance with pH below 7', 'An electron pair acceptor'], correct: 1, explanation: 'The Brønsted-Lowry definition: an acid is a proton (H⁺) donor; a base is a proton acceptor. This extends the Arrhenius concept to non-aqueous systems.' },
          { id: 'chemistry_l2_2_q2', question: 'What is a "buffer solution"?', choices: ['A solution that conducts electricity', 'A solution that resists changes in pH when small amounts of acid or base are added', 'A very concentrated acid or base solution', 'A solution at exactly pH 7'], correct: 1, explanation: 'A buffer resists pH changes when acid or base is added, usually containing a weak acid and its conjugate base (or weak base and conjugate acid).' },
          { id: 'chemistry_l2_2_q3', question: 'What is the "equilibrium constant" (Keq)?', choices: ['The rate at which a reaction reaches equilibrium', 'A value expressing the ratio of product to reactant concentrations at equilibrium', 'The temperature at which a reaction proceeds fastest', 'The minimum concentration needed to start a reaction'], correct: 1, explanation: 'Keq = [products]/[reactants] at equilibrium. Large Keq means equilibrium favors products; small Keq favors reactants.' },
          { id: 'chemistry_l2_2_q4', question: 'During a neutralization reaction between a strong acid and strong base:', choices: ['A gas is always produced', 'They react to form a salt and water', 'The pH always remains below 7', 'The reaction requires a catalyst'], correct: 1, explanation: 'Neutralization: HCl + NaOH → NaCl + H2O. Strong acid + strong base → neutral salt + water, with the resulting solution at pH 7.' },
          { id: 'chemistry_l2_2_q5', question: 'What is the Ka of a weak acid?', choices: ['The acid dissociation constant — measures how fully an acid ionizes in water', 'The rate constant for neutralization', 'The temperature at which an acid boils', 'The concentration of acid in solution'], correct: 0, explanation: 'Ka is the acid dissociation constant: for HA ⇌ H⁺ + A⁻, Ka = [H⁺][A⁻]/[HA]. Larger Ka means stronger acid (more dissociation).' },
        ],
      },
      {
        id: 'chemistry_l2_3',
        title: 'Organic Chemistry Fundamentals',
        description: 'Learn the basics of carbon-based chemistry, functional groups, and common organic reactions.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'chemistry_l2_3_q1', question: 'Why is carbon so central to organic chemistry?', choices: ['It is the most abundant element on Earth', 'It can form 4 bonds and create stable chains, rings, and complex 3D structures', 'It is the lightest element that forms bonds', 'It is the most reactive element in period 2'], correct: 1, explanation: 'Carbon\'s ability to form 4 stable covalent bonds allows it to create the vast diversity of chain, ring, and branched structures found in organic molecules.' },
          { id: 'chemistry_l2_3_q2', question: 'What is an "isomer" in organic chemistry?', choices: ['Two molecules with the same structure but different formulas', 'Two molecules with the same molecular formula but different structural arrangements', 'Two different forms of the same element', 'Two molecules that react with each other'], correct: 1, explanation: 'Isomers have the same molecular formula (same number and types of atoms) but different structural arrangements, giving them different properties.' },
          { id: 'chemistry_l2_3_q3', question: 'What functional group characterizes alcohols?', choices: ['–COOH (carboxyl)', '–OH (hydroxyl)', '–NH2 (amino)', '–CHO (aldehyde)'], correct: 1, explanation: 'Alcohols contain the hydroxyl group (–OH) bonded to a carbon atom. Examples include ethanol (drinking alcohol) and methanol.' },
          { id: 'chemistry_l2_3_q4', question: 'What is the difference between "saturated" and "unsaturated" fats?', choices: ['Saturated fats have double bonds; unsaturated have only single bonds', 'Saturated fats have only single bonds between carbons; unsaturated have one or more double bonds', 'Saturated fats are from plants; unsaturated are from animals', 'Saturated fats dissolve in water; unsaturated do not'], correct: 1, explanation: 'Saturated fatty acids have only C-C single bonds (solid at room temp); unsaturated have C=C double bonds (liquid at room temp, as in vegetable oils).' },
          { id: 'chemistry_l2_3_q5', question: 'What is "chirality" in organic chemistry?', choices: ['The ability of a molecule to rotate polarized light due to having a non-superimposable mirror image', 'The tendency of molecules to form ring structures', 'The presence of multiple double bonds in a molecule', 'The ability of organic compounds to dissolve in water'], correct: 0, explanation: 'A chiral molecule has a non-superimposable mirror image (like left and right hands) — important in pharmaceuticals where mirror images have different biological effects.' },
        ],
      },
      {
        id: 'chemistry_l3_1',
        title: 'Electrochemistry',
        description: 'Explore the relationship between chemical reactions and electrical energy in galvanic and electrolytic cells.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'chemistry_l3_1_q1', question: 'In a galvanic (voltaic) cell, what happens at the anode?', choices: ['Reduction (gain of electrons)', 'Oxidation (loss of electrons)', 'Hydrogen gas is produced', 'Electrons flow from solution to electrode'], correct: 1, explanation: 'At the anode of a galvanic cell, oxidation occurs — the reducing agent loses electrons to the external circuit. At the cathode, reduction occurs.' },
          { id: 'chemistry_l3_1_q2', question: 'What is the standard cell potential (E°cell) and when is a cell spontaneous?', choices: ['E°cell > 0 means spontaneous; E°cell = E°cathode - E°anode', 'E°cell < 0 means spontaneous; E°cell = E°anode - E°cathode', 'E°cell = 0 means maximum spontaneity', 'Cell potential is always positive for any galvanic cell'], correct: 0, explanation: 'E°cell = E°cathode − E°anode. A positive E°cell means the reaction is spontaneous. This links to ΔG = -nFE°cell.' },
          { id: 'chemistry_l3_1_q3', question: 'What is electrolysis?', choices: ['Using chemical reactions to generate electrical current', 'Using electrical current to drive non-spontaneous chemical reactions', 'The separation of compounds by distillation', 'The generation of ions in solution'], correct: 1, explanation: 'Electrolysis uses external electrical energy to drive non-spontaneous chemical reactions — used to electroplate metals, produce aluminum, and split water.' },
          { id: 'chemistry_l3_1_q4', question: 'The Nernst equation relates cell potential to:', choices: ['Temperature and pressure changes', 'Concentration of reactants and products at non-standard conditions', 'The number of electrons transferred in a reaction', 'The surface area of the electrodes'], correct: 1, explanation: 'The Nernst equation calculates cell potential under non-standard conditions (non-1M concentrations, non-25°C), incorporating the reaction quotient Q.' },
          { id: 'chemistry_l3_1_q5', question: 'What is "corrosion" from an electrochemical perspective?', choices: ['Dissolution of metals in strong acids', 'The spontaneous oxidation of a metal in its environment', 'Reduction of a metal oxide to pure metal', 'The deposition of metals from solution'], correct: 1, explanation: 'Corrosion is the spontaneous electrochemical oxidation of a metal (e.g., iron rusting: Fe → Fe²⁺ + 2e⁻) when exposed to oxygen, water, or electrolytes.' },
        ],
      },
      {
        id: 'chemistry_l3_2',
        title: 'Nuclear Chemistry',
        description: 'Examine nuclear reactions, radioactive decay, and the applications of nuclear chemistry.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'chemistry_l3_2_q1', question: 'What is "radioactive decay"?', choices: ['Chemical decomposition of radioactive compounds', 'Spontaneous emission of radiation from unstable atomic nuclei', 'The absorption of radiation by an atom', 'The gradual loss of chemical reactivity over time'], correct: 1, explanation: 'Radioactive decay is the spontaneous disintegration of an unstable atomic nucleus, emitting alpha, beta, or gamma radiation to reach a more stable state.' },
          { id: 'chemistry_l3_2_q2', question: 'What is the "half-life" of a radioactive isotope?', choices: ['The time for half the atoms to gain electrons', 'The time for half of the radioactive nuclei in a sample to decay', 'Half the energy released in a nuclear reaction', 'The time needed for the isotope to reach room temperature'], correct: 1, explanation: 'Half-life is the time required for half of the radioactive atoms in a sample to undergo decay. Half-lives range from nanoseconds to billions of years.' },
          { id: 'chemistry_l3_2_q3', question: 'What is the difference between fission and fusion?', choices: ['Fission combines nuclei; fusion splits nuclei', 'Fission splits heavy nuclei; fusion combines light nuclei to release energy', 'Fission is chemical; fusion is nuclear', 'Fission requires cooling; fusion requires heating'], correct: 1, explanation: 'Nuclear fission splits heavy nuclei (e.g., uranium) releasing energy; nuclear fusion combines light nuclei (e.g., hydrogen isotopes) releasing even more energy per gram.' },
          { id: 'chemistry_l3_2_q4', question: 'Radiocarbon dating uses which isotope to date organic materials?', choices: ['Carbon-12', 'Carbon-13', 'Carbon-14', 'Carbon-11'], correct: 2, explanation: 'Carbon-14 (half-life ~5,730 years) is incorporated into living organisms. After death, C-14 decays, so the ratio of C-14/C-12 reveals how long ago the organism died.' },
          { id: 'chemistry_l3_2_q5', question: 'Einstein\'s equation E = mc² in nuclear chemistry tells us:', choices: ['Energy and mass travel at the speed of light', 'Mass can be converted to enormous amounts of energy — the basis for nuclear power and weapons', 'The speed of light equals mass times energy squared', 'All chemical reactions convert mass to energy'], correct: 1, explanation: 'E = mc² shows that a tiny amount of mass (m) can be converted to an enormous amount of energy (E) since c² is very large — this powers nuclear reactors and stars.' },
        ],
      },
      {
        id: 'chemistry_l3_3',
        title: 'Biochemistry: Chemistry of Life',
        description: 'Explore the chemistry of biological molecules and their roles in living systems.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'chemistry_l3_3_q1', question: 'What are the four main classes of biological macromolecules?', choices: ['Acids, bases, salts, and oxides', 'Carbohydrates, lipids, proteins, and nucleic acids', 'Sugars, fats, vitamins, and minerals', 'Amino acids, fatty acids, glucose, and DNA'], correct: 1, explanation: 'The four classes of biological macromolecules are carbohydrates (energy/structure), lipids (membranes/energy), proteins (structure/function), and nucleic acids (information).' },
          { id: 'chemistry_l3_3_q2', question: 'What is an "enzyme" biochemically?', choices: ['A type of carbohydrate energy molecule', 'A biological catalyst — usually a protein — that speeds up biochemical reactions', 'A hormone that carries signals between cells', 'A structural component of the cell membrane'], correct: 1, explanation: 'Enzymes are protein catalysts that lower activation energy of biochemical reactions, binding substrates at their active site with high specificity.' },
          { id: 'chemistry_l3_3_q3', question: 'What is the role of ATP (adenosine triphosphate) in cells?', choices: ['Store genetic information', 'The universal energy currency — transfers energy from exergonic to endergonic reactions', 'Build cell membranes', 'Regulate gene expression'], correct: 1, explanation: 'ATP is the cell\'s primary energy carrier. Hydrolysis of ATP → ADP + Pi releases ~30 kJ/mol, powering cellular work including muscle contraction and biosynthesis.' },
          { id: 'chemistry_l3_3_q4', question: 'What is the "lock and key" model of enzyme activity?', choices: ['DNA locks its genetic code, and enzymes are the key that unlocks it', 'Enzymes (locks) have active sites that specifically fit their substrates (keys)', 'Membrane channels lock ions out until enzymes open them', 'Antibodies lock onto antigens like keys'], correct: 1, explanation: 'The lock and key model: enzymes have specifically shaped active sites that only fit complementary-shaped substrates, explaining enzyme specificity.' },
          { id: 'chemistry_l3_3_q5', question: 'What is "denaturation" of a protein?', choices: ['The synthesis of a new protein from amino acids', 'The irreversible unfolding of a protein\'s three-dimensional structure due to heat, pH, or chemicals', 'The breakdown of a protein into individual amino acids', 'The modification of a protein after synthesis'], correct: 1, explanation: 'Denaturation disrupts a protein\'s three-dimensional structure (without breaking peptide bonds) — heat, extreme pH, or chemicals unfold the protein, destroying its function.' },
        ],
      },
    ],
  },
  {
    id: 'physics',
    label: 'Physics',
    emoji: '⚡',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'physics_p1', question: 'What is Newton\'s second law of motion?', choices: ['An object in motion stays in motion', 'Force equals mass times acceleration (F = ma)', 'For every action there is an equal and opposite reaction', 'Energy is conserved in all processes'], correct: 1, explanation: 'Newton\'s second law: F = ma. The net force on an object equals its mass multiplied by its acceleration.' },
      { id: 'physics_p2', question: 'What is the unit of electric current?', choices: ['Volt', 'Ohm', 'Ampere', 'Watt'], correct: 2, explanation: 'Electric current is measured in amperes (A), named after André-Marie Ampère. One ampere equals one coulomb of charge per second.' },
      { id: 'physics_p3', question: 'What is the speed of light in a vacuum?', choices: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'], correct: 1, explanation: 'The speed of light in a vacuum is approximately 3 × 10⁸ m/s (299,792,458 m/s exactly), a fundamental constant of nature.' },
      { id: 'physics_p4', question: 'What does the law of conservation of energy state?', choices: ['Energy can be created from matter', 'Energy cannot be created or destroyed, only converted from one form to another', 'Energy always decreases in mechanical systems', 'Kinetic energy and potential energy are always equal'], correct: 1, explanation: 'The law of conservation of energy: the total energy of an isolated system remains constant — energy changes form but is never created or destroyed.' },
      { id: 'physics_p5', question: 'What is "wavelength" in the context of waves?', choices: ['The height of a wave', 'The distance between two successive crests or troughs of a wave', 'The number of wave cycles per second', 'The speed at which a wave travels'], correct: 1, explanation: 'Wavelength (λ) is the distance between two consecutive crests (or troughs) of a wave, measured in metres.' },
      { id: 'physics_p6', question: 'Ohm\'s Law states that:', choices: ['Current equals voltage times resistance', 'Voltage equals current times resistance (V = IR)', 'Power equals voltage divided by current', 'Resistance increases with current'], correct: 1, explanation: 'Ohm\'s Law: V = IR. Voltage (V) equals current (I) multiplied by resistance (R), the fundamental relationship in electric circuits.' },
      { id: 'physics_p7', question: 'What is "entropy" in thermodynamics?', choices: ['The total energy of a system', 'A measure of disorder or randomness — tends to increase in isolated systems', 'The work done by a system', 'The heat lost to the environment'], correct: 1, explanation: 'Entropy measures disorder/randomness. The second law of thermodynamics states that entropy of an isolated system always increases or stays constant.' },
      { id: 'physics_p8', question: 'Einstein\'s special relativity predicts that as an object approaches the speed of light, its mass:', choices: ['Decreases toward zero', 'Remains constant', 'Increases toward infinity', 'Converts to energy'], correct: 2, explanation: 'Special relativity: as an object approaches c, its relativistic mass increases toward infinity, making it impossible to reach the speed of light.' },
      { id: 'physics_p9', question: 'What is the Heisenberg Uncertainty Principle?', choices: ['We cannot know the exact position and momentum of a particle simultaneously', 'Energy and time cannot both be measured precisely', 'Electrons cannot exist in defined energy levels', 'The speed of light is uncertain at quantum scales'], correct: 0, explanation: 'Heisenberg\'s Uncertainty Principle: the more precisely we know a particle\'s position, the less precisely we can know its momentum, and vice versa.' },
      { id: 'physics_p10', question: 'What is a "black hole" in astrophysics?', choices: ['A region of space with no matter or radiation', 'A region where gravity is so strong that not even light can escape', 'A collapsed star with no gravitational field', 'A gap in the fabric of space-time'], correct: 1, explanation: 'A black hole is a region of spacetime where gravity is so extreme that nothing — including light — can escape once past the event horizon.' },
      { id: 'physics_p11', question: 'In quantum mechanics, what is "wave-particle duality"?', choices: ['Waves and particles are fundamentally different phenomena', 'Quantum objects exhibit both wave-like and particle-like properties depending on how they are observed', 'Particles always travel in wave patterns', 'Light is only a wave, never a particle'], correct: 1, explanation: 'Wave-particle duality: quantum objects (photons, electrons) show wave properties (interference) or particle properties depending on how they are measured.' },
      { id: 'physics_p12', question: 'The Standard Model of particle physics describes:', choices: ['The structure of atoms and their electrons only', 'The fundamental particles and forces of nature (excluding gravity)', 'The theory of general relativity', 'The laws of classical mechanics'], correct: 1, explanation: 'The Standard Model describes the fundamental particles (quarks, leptons) and three of the four fundamental forces (electromagnetic, strong, weak nuclear), excluding gravity.' },
    ],
    lessons: [
      {
        id: 'physics_l1_1',
        title: 'Motion and Forces',
        description: 'Explore the fundamentals of kinematics and Newton\'s laws of motion.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'physics_l1_1_q1', question: 'What is the difference between "speed" and "velocity"?', choices: ['Speed is faster; velocity is slower', 'Speed is a scalar (magnitude only); velocity is a vector (magnitude and direction)', 'Speed includes direction; velocity does not', 'They are identical concepts'], correct: 1, explanation: 'Speed is a scalar quantity (how fast, no direction). Velocity is a vector: it includes both magnitude and direction (e.g., 60 km/h north).' },
          { id: 'physics_l1_1_q2', question: 'Newton\'s first law (law of inertia) states:', choices: ['Force equals mass times acceleration', 'An object at rest stays at rest, and an object in motion stays in motion, unless acted on by a net force', 'Every action has an equal and opposite reaction', 'Gravity acts equally on all objects'], correct: 1, explanation: 'Newton\'s first law: objects maintain their state of motion (rest or constant velocity) unless a net external force acts on them.' },
          { id: 'physics_l1_1_q3', question: 'What is "acceleration"?', choices: ['The distance traveled per unit time', 'The rate of change of velocity over time', 'The total force applied to an object', 'The maximum speed of an object'], correct: 1, explanation: 'Acceleration is the rate at which velocity changes over time (a = Δv/Δt). It can be a change in speed, direction, or both.' },
          { id: 'physics_l1_1_q4', question: 'What is the acceleration due to gravity on Earth\'s surface?', choices: ['1.6 m/s²', '9.8 m/s²', '10.8 m/s²', '6.7 m/s²'], correct: 1, explanation: 'Near Earth\'s surface, gravitational acceleration is approximately 9.8 m/s² (often rounded to 10 m/s²) directed downward.' },
          { id: 'physics_l1_1_q5', question: 'Newton\'s third law states:', choices: ['Force = mass × acceleration', 'Objects accelerate in the direction of the net force', 'For every action, there is an equal and opposite reaction', 'Energy is conserved in all interactions'], correct: 2, explanation: 'Newton\'s third law: for every action force, there is a reaction force equal in magnitude but opposite in direction (e.g., rocket thrust).' },
        ],
      },
      {
        id: 'physics_l1_2',
        title: 'Energy and Work',
        description: 'Understand the concepts of work, kinetic and potential energy, and energy conservation.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'physics_l1_2_q1', question: 'In physics, "work" is defined as:', choices: ['Any physical effort exerted', 'Force applied times displacement in the direction of the force (W = Fd)', 'Energy stored in an object', 'The time taken to move an object'], correct: 1, explanation: 'Work (W) = Force × displacement in the direction of the force. Work is done only when a force causes displacement.' },
          { id: 'physics_l1_2_q2', question: 'What is "kinetic energy"?', choices: ['Energy stored due to position in a gravitational field', 'Energy of motion: KE = ½mv²', 'Energy released in chemical reactions', 'Energy stored in elastic objects'], correct: 1, explanation: 'Kinetic energy (KE = ½mv²) is the energy an object possesses due to its motion. It depends on both mass and the square of velocity.' },
          { id: 'physics_l1_2_q3', question: 'Gravitational potential energy (GPE) depends on:', choices: ['Mass and speed', 'Mass, gravitational field strength, and height (GPE = mgh)', 'Height and velocity only', 'Mass and distance from Earth\'s center squared'], correct: 1, explanation: 'GPE = mgh, where m is mass, g is gravitational field strength (9.8 m/s²), and h is height above a reference point.' },
          { id: 'physics_l1_2_q4', question: 'What is "power" in physics?', choices: ['The total energy of a system', 'The rate at which work is done or energy is transferred (P = W/t)', 'The force applied to move an object', 'The efficiency of an energy conversion'], correct: 1, explanation: 'Power (P = W/t) measures how quickly work is done or energy is transferred. The unit is the watt (W) = joule per second.' },
          { id: 'physics_l1_2_q5', question: 'What is "mechanical advantage"?', choices: ['The ratio of output force to input force in a simple machine', 'The total efficiency of a mechanical system', 'The maximum force a machine can exert', 'The energy saved by using a machine'], correct: 0, explanation: 'Mechanical advantage = output force / input force. Simple machines (levers, pulleys) allow a smaller force to move a larger load by increasing distance.' },
        ],
      },
      {
        id: 'physics_l1_3',
        title: 'Waves and Sound',
        description: 'Explore the properties of waves and the physics of sound.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'physics_l1_3_q1', question: 'What is the relationship between frequency, wavelength, and wave speed?', choices: ['Speed = frequency × wavelength (v = fλ)', 'Speed = frequency / wavelength', 'Frequency = speed × wavelength', 'Wavelength = speed × frequency'], correct: 0, explanation: 'The wave equation: v = fλ, where v is wave speed, f is frequency (Hz), and λ is wavelength (m). All three are linked.' },
          { id: 'physics_l1_3_q2', question: 'What is the Doppler effect?', choices: ['The bending of waves around obstacles', 'The change in observed frequency of a wave when the source and observer are moving relative to each other', 'The reflection of sound off hard surfaces', 'The interference of two sound waves'], correct: 1, explanation: 'The Doppler effect: when a source approaches, observed frequency increases (higher pitch); when it moves away, frequency decreases (lower pitch).' },
          { id: 'physics_l1_3_q3', question: 'What is the difference between a "transverse" and a "longitudinal" wave?', choices: ['Transverse waves are faster; longitudinal are slower', 'In transverse waves particles move perpendicular to wave direction; in longitudinal waves, parallel to it', 'Transverse waves travel in water; longitudinal travel in air', 'They are different names for the same phenomenon'], correct: 1, explanation: 'Transverse waves (light, water) oscillate perpendicular to propagation; longitudinal waves (sound) oscillate parallel — compression and rarefaction.' },
          { id: 'physics_l1_3_q4', question: 'What causes an echo?', choices: ['Refraction of sound waves through the atmosphere', 'Reflection of sound waves off a surface back to the listener', 'Interference of two sound waves', 'The Doppler effect from stationary objects'], correct: 1, explanation: 'An echo is the reflection of sound off a distant surface (e.g., a wall or cliff). The reflected sound reaches the listener after the original sound.' },
          { id: 'physics_l1_3_q5', question: 'Sound cannot travel through:', choices: ['Solid materials like walls', 'Liquid water', 'A complete vacuum', 'Air at low temperatures'], correct: 2, explanation: 'Sound is a mechanical wave requiring a medium (matter) to travel through. It cannot propagate through a vacuum — there are no particles to vibrate.' },
        ],
      },
      {
        id: 'physics_l2_1',
        title: 'Electricity and Magnetism',
        description: 'Understand electric fields, circuits, and the relationship between electricity and magnetism.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'physics_l2_1_q1', question: 'What is Coulomb\'s law?', choices: ['The force between two charges is proportional to the product of the charges and inversely proportional to the square of the distance', 'The voltage in a circuit equals current times resistance', 'Magnetic field strength decreases with distance', 'Electric current flows from negative to positive'], correct: 0, explanation: 'Coulomb\'s law: F = kq₁q₂/r². Electric force is proportional to the product of charges and inversely proportional to the square of the distance between them.' },
          { id: 'physics_l2_1_q2', question: 'What is the difference between series and parallel circuits?', choices: ['Series circuits use AC; parallel use DC', 'In series, components share current; in parallel, they share voltage', 'In series, components share voltage; in parallel, they share current but can fail independently', 'They are identical in terms of current flow'], correct: 2, explanation: 'Series: all components share the same current; if one fails, all fail. Parallel: all components share the same voltage; one failing doesn\'t affect others.' },
          { id: 'physics_l2_1_q3', question: 'What did Faraday\'s law of electromagnetic induction discover?', choices: ['Moving charges create electric fields', 'A changing magnetic field induces an electric current (EMF) in a conductor', 'Opposite magnetic poles attract each other', 'Electric current heats a conductor proportionally to resistance'], correct: 1, explanation: 'Faraday\'s law: a changing magnetic flux through a circuit induces an EMF (and therefore current) in that circuit — the principle behind generators.' },
          { id: 'physics_l2_1_q4', question: 'What is the right-hand rule in electromagnetism?', choices: ['A rule for calculating resistance in circuits', 'A method to determine the direction of the magnetic field around a current-carrying conductor', 'A rule about the direction of electric field lines', 'A way to calculate electric power'], correct: 1, explanation: 'The right-hand rule: point your right thumb in the direction of current flow; your curled fingers show the direction of the magnetic field around the wire.' },
          { id: 'physics_l2_1_q5', question: 'What is electrical resistance and what affects it?', choices: ['Resistance is voltage divided by current; it depends only on material', 'Resistance opposes current flow; it depends on material, length, cross-sectional area, and temperature', 'Resistance is the total voltage in a circuit', 'Resistance only applies to metals'], correct: 1, explanation: 'Resistance (R = V/I) opposes current. It depends on material resistivity, wire length (longer = more), cross-section (wider = less), and temperature.' },
        ],
      },
      {
        id: 'physics_l2_2',
        title: 'Thermodynamics',
        description: 'Explore the laws governing heat, temperature, and energy transfer in physical systems.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'physics_l2_2_q1', question: 'What is the zeroth law of thermodynamics?', choices: ['Energy cannot be created or destroyed', 'If A is in thermal equilibrium with B, and B with C, then A is in thermal equilibrium with C', 'Entropy of the universe always increases', 'It is impossible to reach absolute zero temperature'], correct: 1, explanation: 'The zeroth law establishes the concept of temperature: if two systems are each in thermal equilibrium with a third, they are in equilibrium with each other.' },
          { id: 'physics_l2_2_q2', question: 'What are the three methods of heat transfer?', choices: ['Conduction, convection, and radiation', 'Absorption, emission, and reflection', 'Diffusion, osmosis, and evaporation', 'Compression, expansion, and convection'], correct: 0, explanation: 'Heat transfers by conduction (through contact/solids), convection (through fluid movement), and radiation (through electromagnetic waves, no medium needed).' },
          { id: 'physics_l2_2_q3', question: 'What is absolute zero?', choices: ['0°C — the freezing point of water', '−100°C — the coldest achievable temperature in a lab', '−273.15°C (0 K) — the temperature at which all molecular motion theoretically stops', '−200°C — the temperature of liquid nitrogen'], correct: 2, explanation: 'Absolute zero (0 K = −273.15°C) is the theoretical minimum temperature where all molecular motion ceases. It can be approached but never reached.' },
          { id: 'physics_l2_2_q4', question: 'What does the second law of thermodynamics state about heat engines?', choices: ['A heat engine can convert all heat into work', 'No heat engine can be 100% efficient — some energy is always wasted as heat', 'Heat always flows from cold to hot in a heat engine', 'Work can always be fully converted back to heat'], correct: 1, explanation: 'The second law: no heat engine operating in a cycle can convert all heat to work — some heat must always be rejected to a cold reservoir.' },
          { id: 'physics_l2_2_q5', question: 'What is the "Carnot efficiency" of a heat engine?', choices: ['The maximum possible efficiency: η = 1 − (T_cold/T_hot)', 'The actual efficiency of a typical car engine', 'The efficiency at which all engines naturally operate', 'The efficiency when both temperatures are equal'], correct: 0, explanation: 'Carnot efficiency sets the theoretical maximum for a heat engine: η = 1 − (T_cold/T_hot), where temperatures are in Kelvin.' },
        ],
      },
      {
        id: 'physics_l2_3',
        title: 'Optics and Light',
        description: 'Study the behavior of light including reflection, refraction, and the electromagnetic spectrum.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'physics_l2_3_q1', question: 'What is the law of reflection?', choices: ['The angle of incidence equals the angle of refraction', 'The angle of incidence equals the angle of reflection, both measured from the normal', 'Light reflects at 90° to the surface', 'Reflected light always travels slower than incident light'], correct: 1, explanation: 'Law of reflection: the angle of incidence equals the angle of reflection (both measured from the normal to the surface). Light bounces predictably.' },
          { id: 'physics_l2_3_q2', question: 'What is "refraction" of light?', choices: ['The reflection of light off a mirrored surface', 'The bending of light as it passes from one medium to another due to a change in speed', 'The scattering of light by small particles', 'The absorption of light by dark surfaces'], correct: 1, explanation: 'Refraction is the bending of light when it crosses the boundary between media of different optical densities (speeds) — explains why straws look bent in water.' },
          { id: 'physics_l2_3_q3', question: 'What is "total internal reflection"?', choices: ['When all light is reflected by a black surface', 'When light hits a boundary at or beyond the critical angle and is completely reflected back into the denser medium', 'When a mirror reflects all wavelengths equally', 'When light is absorbed completely by a medium'], correct: 1, explanation: 'Total internal reflection occurs when light in a denser medium hits the boundary at or beyond the critical angle — all light reflects back. This is the principle behind optical fibres.' },
          { id: 'physics_l2_3_q4', question: 'Which part of the electromagnetic spectrum has the highest frequency?', choices: ['Radio waves', 'Visible light', 'X-rays', 'Gamma rays'], correct: 3, explanation: 'The electromagnetic spectrum from lowest to highest frequency: radio → microwave → infrared → visible → UV → X-ray → gamma rays.' },
          { id: 'physics_l2_3_q5', question: 'What causes the sky to appear blue?', choices: ['The sky reflects the color of the ocean', 'Water vapour in the atmosphere absorbs red light', 'Rayleigh scattering — the atmosphere scatters shorter (blue) wavelengths of light more than longer ones', 'The atmosphere emits blue light from solar absorption'], correct: 2, explanation: 'Rayleigh scattering: atmospheric molecules scatter shorter wavelengths (blue) much more than longer ones (red), so scattered blue light reaches our eyes from all directions.' },
        ],
      },
      {
        id: 'physics_l3_1',
        title: 'Special and General Relativity',
        description: 'Explore Einstein\'s revolutionary theories of relativity and their implications for space, time, and gravity.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'physics_l3_1_q1', question: 'What are the two postulates of Einstein\'s special relativity?', choices: ['The laws of physics are the same in all reference frames, and the speed of light is constant for all observers', 'Time is absolute, and space is relative', 'Mass and energy are equivalent, and gravity bends light', 'The universe is expanding, and all motion is relative to the Earth'], correct: 0, explanation: 'Special relativity: (1) laws of physics are identical in all inertial frames; (2) the speed of light is the same for all observers regardless of relative motion.' },
          { id: 'physics_l3_1_q2', question: 'What is "time dilation" in special relativity?', choices: ['Clocks run faster when moving at high velocities', 'Time passes more slowly for an observer moving at high velocity relative to a stationary observer', 'Time stops at the speed of light', 'Time reverses under extreme gravity'], correct: 1, explanation: 'Time dilation: a moving clock runs slower than a stationary one. The faster you travel relative to an observer, the more slowly your clock ticks from their perspective.' },
          { id: 'physics_l3_1_q3', question: 'What does general relativity describe that special relativity does not?', choices: ['The behavior of light', 'Gravity as the curvature of spacetime caused by mass and energy', 'The equivalence of mass and energy', 'The constancy of the speed of light'], correct: 1, explanation: 'General relativity extends special relativity to include gravity, describing it as the curvature of 4-dimensional spacetime caused by mass and energy.' },
          { id: 'physics_l3_1_q4', question: 'What is "gravitational time dilation"?', choices: ['Time passes more slowly near massive objects due to their gravitational field', 'Gravity causes clocks to speed up near massive objects', 'Time dilation only occurs in empty space', 'Gravity has no effect on the passage of time'], correct: 0, explanation: 'General relativity predicts clocks run slower in stronger gravitational fields — GPS satellites must account for this, as their clocks run faster than those on Earth\'s surface.' },
          { id: 'physics_l3_1_q5', question: 'Gravitational waves, detected by LIGO in 2015, are:', choices: ['Radio waves emitted by black holes', 'Ripples in the curvature of spacetime caused by accelerating masses', 'Gravity particles (gravitons) traveling through space', 'Waves of dark matter flowing through the universe'], correct: 1, explanation: 'Gravitational waves are ripples in spacetime fabric caused by accelerating massive objects (e.g., merging black holes or neutron stars), predicted by general relativity and first detected in 2015.' },
        ],
      },
      {
        id: 'physics_l3_2',
        title: 'Quantum Mechanics',
        description: 'Investigate the strange and counterintuitive world of quantum physics at the atomic scale.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'physics_l3_2_q1', question: 'What is the "double-slit experiment" famous for demonstrating?', choices: ['That light travels in straight lines', 'That particles like electrons exhibit wave-like interference when not observed, but behave as particles when measured', 'That light is composed of photons', 'That matter cannot be in two places at once'], correct: 1, explanation: 'The double-slit experiment shows electrons create an interference pattern (wave behavior) when unobserved, but act as particles when measured — the measurement problem.' },
          { id: 'physics_l3_2_q2', question: 'What is "quantum entanglement"?', choices: ['When two particles collide and exchange energy', 'A phenomenon where two particles become correlated such that measuring one instantly affects the state of the other, regardless of distance', 'When an electron is in two energy levels simultaneously', 'The entanglement of wave functions during nuclear decay'], correct: 1, explanation: 'Quantum entanglement: entangled particles share a quantum state — measuring one instantly determines the outcome of measuring the other, regardless of distance.' },
          { id: 'physics_l3_2_q3', question: 'What is "Schrödinger\'s cat" thought experiment designed to illustrate?', choices: ['That cats have quantum properties', 'The paradox of quantum superposition — a system exists in all possible states until observed', 'That quantum mechanics only applies to subatomic particles', 'The uncertainty principle applied to living organisms'], correct: 1, explanation: 'Schrödinger\'s cat illustrates the absurdity of quantum superposition at macroscopic scales: a cat is both alive and dead until the box is opened and it is observed.' },
          { id: 'physics_l3_2_q4', question: 'What is a "quantum number" in atomic physics?', choices: ['The total number of electrons in an atom', 'A value describing a property of a quantum system, such as energy level, angular momentum, or spin', 'The number of protons and neutrons in a nucleus', 'The temperature at which quantum effects become significant'], correct: 1, explanation: 'Quantum numbers (n, l, ml, ms) describe the state of electrons in atoms: principal (energy level), azimuthal (orbital shape), magnetic (orientation), and spin.' },
          { id: 'physics_l3_2_q5', question: 'Planck\'s equation E = hf describes:', choices: ['The energy of a photon in terms of its frequency', 'The relationship between mass and energy', 'The kinetic energy of an electron', 'The binding energy of an atomic nucleus'], correct: 0, explanation: 'E = hf: the energy (E) of a photon equals Planck\'s constant (h = 6.626 × 10⁻³⁴ J·s) multiplied by the frequency (f) of the light.' },
        ],
      },
      {
        id: 'physics_l3_3',
        title: 'Astrophysics and Cosmology',
        description: 'Examine the physics of stars, galaxies, and the origin and fate of the universe.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'physics_l3_3_q1', question: 'What is the Big Bang theory?', choices: ['An explosion in space that created the Earth', 'The prevailing cosmological model describing the origin of the universe from an extremely hot, dense state ~13.8 billion years ago', 'A theory about how stars explode at the end of their lives', 'A theory proposing the universe is infinitely old'], correct: 1, explanation: 'The Big Bang: the universe began ~13.8 billion years ago from an extremely hot, dense state and has been expanding and cooling ever since.' },
          { id: 'physics_l3_3_q2', question: 'What evidence supports the Big Bang theory?', choices: ['Only the existence of galaxies', 'The expansion of the universe (Hubble\'s law), cosmic microwave background radiation, and the abundance of light elements', 'The existence of black holes and neutron stars', 'The spiral shape of most galaxies'], correct: 1, explanation: 'Key evidence: the expansion of the universe (Hubble 1929), cosmic microwave background radiation (CMB, 1964), and the predicted abundances of hydrogen and helium.' },
          { id: 'physics_l3_3_q3', question: 'What is "dark matter"?', choices: ['Matter that absorbs all light and reflects none', 'A hypothetical form of matter that doesn\'t interact electromagnetically but makes up ~27% of the universe\'s mass-energy', 'Black holes and other dark astronomical objects', 'The matter inside black holes beyond the event horizon'], correct: 1, explanation: 'Dark matter is inferred from its gravitational effects (galaxy rotation curves, gravitational lensing) but doesn\'t emit or absorb light — its nature remains unknown.' },
          { id: 'physics_l3_3_q4', question: 'What is the life cycle of a star like our Sun?', choices: ['Nebula → main sequence → red giant → planetary nebula → white dwarf', 'Nebula → red dwarf → supergiant → neutron star', 'Nebula → main sequence → supernova → black hole', 'Protostar → blue supergiant → red giant → supernova'], correct: 0, explanation: 'Sun-like stars: form from nebula, spend billions of years on the main sequence, expand to red giants, shed outer layers as a planetary nebula, leaving a white dwarf.' },
          { id: 'physics_l3_3_q5', question: 'What is "dark energy" in cosmology?', choices: ['The energy inside black holes', 'A mysterious form of energy making up ~68% of the universe, causing the accelerating expansion of the universe', 'The energy released in dark matter annihilation', 'The gravitational potential energy of the observable universe'], correct: 1, explanation: 'Dark energy is an unknown form of energy permeating all space, accounting for ~68% of the universe\'s energy content and driving its accelerating expansion.' },
        ],
      },
    ],
  },
  {
    id: 'computer_science',
    label: 'Computer Science',
    emoji: '💻',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'computer_science_p1', question: 'What is a "variable" in programming?', choices: ['A fixed constant value', 'A named storage location that holds a value which can change', 'A type of loop structure', 'A function that returns different values'], correct: 1, explanation: 'A variable is a named memory location that stores a value. Variables can be reassigned (changed) during program execution.' },
      { id: 'computer_science_p2', question: 'What does "binary" mean in computing?', choices: ['A system using digits 0-9', 'A number system using only two digits: 0 and 1', 'A two-part program structure', 'A type of computer memory'], correct: 1, explanation: 'Binary is a base-2 number system using only 0 and 1. All data in computers is ultimately stored and processed as binary.' },
      { id: 'computer_science_p3', question: 'What is an "algorithm"?', choices: ['A type of computer hardware', 'A step-by-step set of instructions to solve a problem', 'A programming language', 'A method of storing data'], correct: 1, explanation: 'An algorithm is a finite, ordered set of well-defined instructions for solving a problem or performing a computation.' },
      { id: 'computer_science_p4', question: 'What does "CPU" stand for?', choices: ['Computer Processing Unit', 'Central Processing Unit', 'Core Processing Utility', 'Calculated Program Unit'], correct: 1, explanation: 'CPU stands for Central Processing Unit — the main chip that executes instructions, performs calculations, and controls the flow of data in a computer.' },
      { id: 'computer_science_p5', question: 'What is the difference between RAM and storage (like a hard drive)?', choices: ['RAM is slower; hard drives are faster', 'RAM is temporary, fast memory for active tasks; storage is permanent, slower memory', 'RAM stores the operating system; hard drives run programs', 'They are different names for the same thing'], correct: 1, explanation: 'RAM (Random Access Memory) is fast, volatile (temporary) memory for currently running programs. Storage (HDD/SSD) is permanent but slower.' },
      { id: 'computer_science_p6', question: 'What is "object-oriented programming" (OOP)?', choices: ['Programming using only physical objects as input', 'A paradigm organizing code into objects that combine data and behavior', 'Programming for 3D graphics and objects', 'A method of programming without variables'], correct: 1, explanation: 'OOP organizes code into objects — encapsulating data (attributes) and behavior (methods). Key principles: encapsulation, inheritance, polymorphism, abstraction.' },
      { id: 'computer_science_p7', question: 'What is "Big O notation" used for?', choices: ['Naming variables in large programs', 'Describing the time or space complexity of an algorithm as input size grows', 'A type of encryption standard', 'Measuring network bandwidth'], correct: 1, explanation: 'Big O notation describes how an algorithm\'s time or space requirements scale with input size. O(n) is linear, O(n²) is quadratic, O(log n) is logarithmic.' },
      { id: 'computer_science_p8', question: 'What is a "database" in computing?', choices: ['A collection of programs stored on a server', 'An organized collection of structured data, typically managed by a DBMS', 'The main memory of a computer', 'A type of computer network'], correct: 1, explanation: 'A database is an organized collection of structured data. A DBMS (like MySQL, PostgreSQL) manages storage, retrieval, and manipulation of that data.' },
      { id: 'computer_science_p9', question: 'What is "machine learning"?', choices: ['Teaching machines to use tools', 'A subset of AI where systems learn from data to make predictions without being explicitly programmed', 'Programming computers to learn new programming languages', 'The process of optimizing computer hardware'], correct: 1, explanation: 'Machine learning is a subset of AI: algorithms learn patterns from data and improve their performance on tasks without being explicitly programmed with rules.' },
      { id: 'computer_science_p10', question: 'What is "encryption" in cybersecurity?', choices: ['Deleting sensitive data permanently', 'Converting data into a coded form to prevent unauthorized access', 'Compressing data to save storage space', 'Backing up data to a secure server'], correct: 1, explanation: 'Encryption transforms readable data (plaintext) into unreadable form (ciphertext) using a key. Only authorized parties with the key can decrypt it.' },
      { id: 'computer_science_p11', question: 'In networking, what does "HTTP" stand for?', choices: ['HyperText Transfer Protocol', 'High Technology Transfer Program', 'Hybrid Text Transfer Protocol', 'HyperText Technology Platform'], correct: 0, explanation: 'HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web, defining how messages are formatted and transmitted between browsers and servers.' },
      { id: 'computer_science_p12', question: 'What is the difference between a "compiler" and an "interpreter"?', choices: ['Compilers translate high-level code to machine code all at once; interpreters execute code line by line', 'Compilers are slower; interpreters are faster', 'Compilers work with Python; interpreters work with C', 'They are alternative names for the same tool'], correct: 0, explanation: 'A compiler translates the entire source code to machine code before execution (C, C++). An interpreter executes code line by line at runtime (Python, JavaScript).' },
    ],
    lessons: [
      {
        id: 'computer_science_l1_1',
        title: 'Introduction to Programming',
        description: 'Learn the fundamentals of programming including variables, data types, and control flow.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'computer_science_l1_1_q1', question: 'What is a "boolean" data type?', choices: ['A whole number', 'A value that is either true or false', 'A sequence of characters', 'A decimal number'], correct: 1, explanation: 'A boolean stores only two values: true or false (or 1/0). It is fundamental to logical operations and conditional statements.' },
          { id: 'computer_science_l1_1_q2', question: 'What does an "if-else" statement do?', choices: ['Repeats code a fixed number of times', 'Executes different code blocks depending on whether a condition is true or false', 'Defines a reusable block of code', 'Stores a sequence of values'], correct: 1, explanation: 'An if-else statement is a conditional: if the condition is true, run one block of code; otherwise (else), run a different block.' },
          { id: 'computer_science_l1_1_q3', question: 'What is a "loop" in programming?', choices: ['A program that never ends', 'A structure that repeats a block of code while a condition is true or for a set number of times', 'A connection between two functions', 'An error in the code that causes repetition'], correct: 1, explanation: 'Loops (for, while) repeat a code block automatically — essential for tasks like processing each item in a list or repeating an action until a condition is met.' },
          { id: 'computer_science_l1_1_q4', question: 'What is a "function" (or method) in programming?', choices: ['A mathematical formula written in code', 'A reusable, named block of code that performs a specific task', 'A type of variable that stores multiple values', 'A condition that controls program flow'], correct: 1, explanation: 'A function is a named, reusable block of code that can take inputs (parameters) and return an output. Functions promote code reuse and organization.' },
          { id: 'computer_science_l1_1_q5', question: 'What is "debugging" in software development?', choices: ['Adding new features to a program', 'Writing documentation for code', 'The process of finding and fixing errors (bugs) in code', 'Optimizing code to run faster'], correct: 2, explanation: 'Debugging is the process of identifying, isolating, and fixing bugs (errors) in code — a fundamental skill for all programmers.' },
        ],
      },
      {
        id: 'computer_science_l1_2',
        title: 'Data Structures',
        description: 'Explore fundamental data structures including arrays, lists, and dictionaries.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'computer_science_l1_2_q1', question: 'What is an "array" (or list)?', choices: ['A single value stored in memory', 'An ordered collection of elements, each accessible by an index', 'A key-value store for data', 'A hierarchical structure of connected nodes'], correct: 1, explanation: 'An array is an ordered collection of elements stored in consecutive memory locations. Elements are accessed by their index (position, starting at 0).' },
          { id: 'computer_science_l1_2_q2', question: 'What is a "dictionary" (or hash map) in programming?', choices: ['A program that defines technical terms', 'A collection of key-value pairs, allowing fast lookup by key', 'An ordered sequence of numbers', 'A type of loop structure'], correct: 1, explanation: 'A dictionary/hash map stores data as key-value pairs (e.g., {"name": "Alice", "age": 30}), enabling very fast lookup by key.' },
          { id: 'computer_science_l1_2_q3', question: 'What is a "stack" data structure?', choices: ['A structure where elements are added and removed from the same end (LIFO: Last In, First Out)', 'A structure where elements are added to one end and removed from the other (FIFO)', 'A hierarchical structure with parent and child nodes', 'A structure where elements are sorted automatically'], correct: 0, explanation: 'A stack is LIFO (Last In, First Out) — like a stack of plates. push() adds to the top; pop() removes from the top. Used for function call stacks, undo features.' },
          { id: 'computer_science_l1_2_q4', question: 'What is a "linked list"?', choices: ['A list where elements are stored in consecutive memory locations', 'A sequence of nodes, each containing data and a pointer to the next node', 'A list that is linked to a database', 'A type of array with fixed size'], correct: 1, explanation: 'A linked list consists of nodes, each containing data and a pointer to the next node. Unlike arrays, elements are not stored in consecutive memory.' },
          { id: 'computer_science_l1_2_q5', question: 'What is the time complexity of accessing an element in an array by index?', choices: ['O(n) — linear time', 'O(log n) — logarithmic time', 'O(1) — constant time', 'O(n²) — quadratic time'], correct: 2, explanation: 'Array index access is O(1) — constant time — because the memory address is directly calculated from the base address and index, regardless of array size.' },
        ],
      },
      {
        id: 'computer_science_l1_3',
        title: 'The Internet and Networks',
        description: 'Understand how the internet works, including protocols, IP addresses, and the web.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'computer_science_l1_3_q1', question: 'What is an "IP address"?', choices: ['A unique name for a website', 'A numerical label identifying a device on a network', 'A type of internet connection', 'A security certificate for websites'], correct: 1, explanation: 'An IP (Internet Protocol) address is a unique numerical label (e.g., 192.168.1.1) assigned to each device on a network for identification and communication.' },
          { id: 'computer_science_l1_3_q2', question: 'What does "DNS" (Domain Name System) do?', choices: ['Encrypts web traffic for security', 'Translates human-readable domain names (like google.com) to IP addresses', 'Manages network bandwidth allocation', 'Assigns IP addresses to new devices'], correct: 1, explanation: 'DNS is the internet\'s phone book — it translates domain names (google.com) into IP addresses (142.250.80.46) that computers use to connect.' },
          { id: 'computer_science_l1_3_q3', question: 'What is the difference between HTTP and HTTPS?', choices: ['HTTPS is faster than HTTP', 'HTTPS is encrypted (using TLS/SSL); HTTP is not — data is sent in plaintext', 'HTTP is for websites; HTTPS is for email', 'HTTPS is newer and replaces all HTTP functions'], correct: 1, explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts the connection using TLS, protecting data from eavesdropping and tampering. HTTP sends data in plaintext.' },
          { id: 'computer_science_l1_3_q4', question: 'What is a "router" in networking?', choices: ['A device that boosts WiFi signal strength', 'A device that forwards data packets between networks, directing traffic', 'A device that converts analog to digital signals', 'A type of firewall for network security'], correct: 1, explanation: 'A router forwards data packets between computer networks, directing internet traffic by determining the best path for data to travel.' },
          { id: 'computer_science_l1_3_q5', question: 'What is "bandwidth" in networking?', choices: ['The speed at which a single packet travels', 'The maximum rate of data transfer across a network connection, usually in Mbps or Gbps', 'The latency (delay) in a network', 'The number of devices connected to a network'], correct: 1, explanation: 'Bandwidth is the maximum data transfer rate of a network connection, typically measured in megabits per second (Mbps) or gigabits per second (Gbps).' },
        ],
      },
      {
        id: 'computer_science_l2_1',
        title: 'Algorithms and Complexity',
        description: 'Analyze sorting and searching algorithms and understand computational complexity.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'computer_science_l2_1_q1', question: 'What is the time complexity of binary search?', choices: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correct: 2, explanation: 'Binary search has O(log n) complexity — each step halves the search space. It requires a sorted array and is much faster than linear search O(n) for large datasets.' },
          { id: 'computer_science_l2_1_q2', question: 'What is "quicksort" and its average time complexity?', choices: ['A search algorithm with O(n) complexity', 'A sorting algorithm with O(n log n) average complexity using divide-and-conquer', 'A sorting algorithm with O(n²) complexity', 'A graph traversal algorithm'], correct: 1, explanation: 'Quicksort divides the array around a pivot and recursively sorts subarrays. Average O(n log n), worst case O(n²), but very fast in practice.' },
          { id: 'computer_science_l2_1_q3', question: 'What is a "recursive" function?', choices: ['A function that runs indefinitely', 'A function that calls itself to solve smaller instances of the same problem', 'A function that takes another function as input', 'A function that returns multiple values'], correct: 1, explanation: 'A recursive function calls itself with a smaller input until it reaches a base case. Examples: factorial, Fibonacci, tree traversal.' },
          { id: 'computer_science_l2_1_q4', question: 'What is "dynamic programming" in algorithm design?', choices: ['Programming software with dynamic (changing) requirements', 'An optimization technique breaking problems into overlapping subproblems and storing results to avoid redundant computation', 'Programming graphics that move dynamically', 'An approach that randomly tries different solutions'], correct: 1, explanation: 'Dynamic programming solves complex problems by breaking them into simpler overlapping subproblems, caching results (memoization) to avoid recomputation.' },
          { id: 'computer_science_l2_1_q5', question: 'What is the "P vs NP" problem in computer science?', choices: ['A comparison of two programming paradigms', 'One of the most important open questions: whether every problem whose solution can be quickly verified can also be quickly solved', 'A problem about network protocol efficiency', 'The question of whether parallel processing is always faster'], correct: 1, explanation: 'P vs NP asks whether problems whose solutions can be verified in polynomial time (NP) can also be solved in polynomial time (P). Solving it would have profound implications for cryptography and optimization.' },
        ],
      },
      {
        id: 'computer_science_l2_2',
        title: 'Databases and SQL',
        description: 'Learn how relational databases work and how to query them using SQL.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'computer_science_l2_2_q1', question: 'What does SQL stand for?', choices: ['System Query Language', 'Structured Query Language', 'Standard Question Language', 'Structured Question Logic'], correct: 1, explanation: 'SQL (Structured Query Language) is the standard language for managing and querying relational databases.' },
          { id: 'computer_science_l2_2_q2', question: 'What does a SQL "JOIN" do?', choices: ['Combines two tables based on a related column between them', 'Merges all rows from two tables regardless of relationship', 'Splits a table into two parts', 'Creates a copy of a table'], correct: 0, explanation: 'A SQL JOIN combines rows from two or more tables based on a related column. Types include INNER JOIN (matching rows), LEFT JOIN (all from left + matches), etc.' },
          { id: 'computer_science_l2_2_q3', question: 'What is a "primary key" in a relational database?', choices: ['The most important column in a table', 'A unique identifier for each row in a table', 'The first column created in a table', 'A column that stores encrypted data'], correct: 1, explanation: 'A primary key uniquely identifies each record in a database table — it must be unique and not null. Often an auto-incrementing ID.' },
          { id: 'computer_science_l2_2_q4', question: 'What is database "normalization"?', choices: ['Converting all text data to lowercase', 'Organizing a database to reduce data redundancy and improve integrity', 'Making all columns the same data type', 'Compressing data to reduce storage requirements'], correct: 1, explanation: 'Normalization organizes database tables to minimize data redundancy and dependency (1NF, 2NF, 3NF), improving data integrity and reducing update anomalies.' },
          { id: 'computer_science_l2_2_q5', question: 'What is the difference between SQL and NoSQL databases?', choices: ['SQL is newer; NoSQL is older', 'SQL databases use structured tables with fixed schemas; NoSQL databases use flexible formats like documents, key-value pairs, or graphs', 'SQL can only store text; NoSQL stores all data types', 'NoSQL is always faster than SQL'], correct: 1, explanation: 'SQL (relational) databases use tables with fixed schemas and are great for structured data. NoSQL databases (MongoDB, Redis) offer flexible schemas for unstructured or semi-structured data.' },
        ],
      },
      {
        id: 'computer_science_l2_3',
        title: 'Software Development Practices',
        description: 'Explore modern software development methodologies, version control, and testing practices.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'computer_science_l2_3_q1', question: 'What is "version control" (e.g., Git)?', choices: ['A system for numbering software releases', 'A system that tracks changes to code, enabling collaboration and reverting to previous versions', 'A method for testing different software versions', 'A tool for compiling different versions of code'], correct: 1, explanation: 'Version control systems (Git) track all changes to code over time, enable multiple developers to collaborate, and allow reverting to any previous state.' },
          { id: 'computer_science_l2_3_q2', question: 'What is "agile" software development?', choices: ['A method focusing on very fast coding', 'An iterative approach emphasizing collaboration, flexibility, and delivering working software in short cycles (sprints)', 'A methodology requiring complete requirements before coding begins', 'A tool for automated software deployment'], correct: 1, explanation: 'Agile methodology delivers software in iterative sprints (1-4 weeks), emphasizing collaboration, adaptability to change, and continuous delivery of working software.' },
          { id: 'computer_science_l2_3_q3', question: 'What is "unit testing" in software development?', choices: ['Testing the entire application end-to-end', 'Testing individual functions or components in isolation to ensure they work correctly', 'Testing a software unit with real users', 'Measuring the performance of a single server unit'], correct: 1, explanation: 'Unit tests test individual functions or components in isolation, verifying they produce expected outputs for given inputs — the foundation of test-driven development.' },
          { id: 'computer_science_l2_3_q4', question: 'What does "API" stand for and what is its purpose?', choices: ['Application Processing Interface — used to speed up apps', 'Application Programming Interface — defines how software components communicate with each other', 'Automated Program Integration — merges multiple programs', 'Advanced Protocol Interface — for network communication'], correct: 1, explanation: 'An API (Application Programming Interface) defines rules for how software components or systems communicate — like a contract defining requests, responses, and data formats.' },
          { id: 'computer_science_l2_3_q5', question: 'What is "continuous integration/continuous deployment" (CI/CD)?', choices: ['A method for manually testing software before deployment', 'Automatically building, testing, and deploying code changes frequently to catch issues early and speed delivery', 'A strategy for integrating different programming languages', 'A database synchronization technique'], correct: 1, explanation: 'CI/CD automates building, testing, and deploying code changes. CI integrates changes frequently; CD automates deployment to production, reducing manual errors and speeding delivery.' },
        ],
      },
      {
        id: 'computer_science_l3_1',
        title: 'Artificial Intelligence and Machine Learning',
        description: 'Explore the foundations of AI, machine learning algorithms, and their real-world applications.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'computer_science_l3_1_q1', question: 'What is "supervised learning" in machine learning?', choices: ['Training a model using labeled examples — input-output pairs', 'Training a model using only unlabeled data', 'A model that learns from reinforcement and rewards', 'Learning that is supervised by a human teacher at all times'], correct: 0, explanation: 'Supervised learning trains models on labeled datasets (input-output pairs). The model learns to map inputs to outputs and is evaluated on unseen data.' },
          { id: 'computer_science_l3_1_q2', question: 'What is a "neural network"?', choices: ['A biological network of brain cells', 'A computational model inspired by biological neurons, organized in layers that learn to recognize patterns', 'A network of computers working together', 'A mathematical formula for pattern recognition'], correct: 1, explanation: 'Artificial neural networks consist of layers of interconnected nodes (neurons). They learn by adjusting connection weights through training — the basis of deep learning.' },
          { id: 'computer_science_l3_1_q3', question: 'What is "overfitting" in machine learning?', choices: ['When a model is too simple to learn from data', 'When a model learns the training data too specifically, performing poorly on new, unseen data', 'When a model is trained on too much data', 'When a model takes too long to train'], correct: 1, explanation: 'Overfitting: the model memorizes training data (including noise) rather than learning generalizable patterns, leading to poor performance on new data.' },
          { id: 'computer_science_l3_1_q4', question: 'What is "natural language processing" (NLP)?', choices: ['Programming in natural (human) language instead of code', 'A field of AI focused on enabling computers to understand and process human language', 'A technique for translating between programming languages', 'The natural way humans learn programming'], correct: 1, explanation: 'NLP enables computers to understand, interpret, and generate human language — powering applications like machine translation, chatbots, and sentiment analysis.' },
          { id: 'computer_science_l3_1_q5', question: 'What is the "transformer" architecture in AI?', choices: ['A hardware component that transforms electrical signals', 'A neural network architecture using self-attention mechanisms, foundational to modern large language models like GPT', 'A method for transforming data from one format to another', 'An AI architecture based on biological transformations in the brain'], correct: 1, explanation: 'The Transformer (2017, "Attention is All You Need") uses self-attention to process all tokens simultaneously — foundational to BERT, GPT, and modern large language models.' },
        ],
      },
      {
        id: 'computer_science_l3_2',
        title: 'Cybersecurity',
        description: 'Understand the principles of cybersecurity, common threats, and defensive techniques.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'computer_science_l3_2_q1', question: 'What is "public-key cryptography" (asymmetric encryption)?', choices: ['Encryption using a single shared key', 'Encryption using a pair of mathematically related keys: a public key (encrypt) and private key (decrypt)', 'A method for encrypting public Wi-Fi networks', 'Encryption that anyone in the public can break'], correct: 1, explanation: 'Asymmetric cryptography uses key pairs: data encrypted with a public key can only be decrypted with the corresponding private key, enabling secure communication without sharing secrets.' },
          { id: 'computer_science_l3_2_q2', question: 'What is a "SQL injection" attack?', choices: ['Injecting malicious SQL code into a database query through user input to manipulate the database', 'Overloading a server with SQL queries', 'Stealing a database by copying its SQL files', 'Injecting false data into a SQL database through the admin interface'], correct: 0, explanation: 'SQL injection inserts malicious SQL code into input fields to manipulate database queries — one of the most common web vulnerabilities, preventable with parameterized queries.' },
          { id: 'computer_science_l3_2_q3', question: 'What is a "man-in-the-middle" (MITM) attack?', choices: ['An attacker intercepting and potentially altering communication between two parties', 'An attacker accessing a computer physically while the user is away', 'An insider threat from a middle-level employee', 'An attack using multiple computers simultaneously'], correct: 0, explanation: 'In a MITM attack, an attacker secretly intercepts communication between two parties, potentially reading or altering messages without either party knowing.' },
          { id: 'computer_science_l3_2_q4', question: 'What is "two-factor authentication" (2FA)?', choices: ['A system requiring two different passwords', 'A security process requiring two different forms of verification before granting access', 'Encrypting data twice using different algorithms', 'A backup login method if the primary fails'], correct: 1, explanation: '2FA requires two verification methods (something you know + something you have/are) — e.g., password + SMS code — significantly reducing unauthorized access.' },
          { id: 'computer_science_l3_2_q5', question: 'What is a "zero-day" vulnerability?', choices: ['A vulnerability that has been known for zero days since discovery', 'A software flaw unknown to the vendor that attackers can exploit before a patch is available', 'A vulnerability that can only be exploited for zero seconds', 'A flaw in day-zero (initial) software releases'], correct: 1, explanation: 'A zero-day vulnerability is a software flaw unknown to the developer/vendor. Attackers can exploit it before a patch exists — highly valuable in cybercriminal markets.' },
        ],
      },
      {
        id: 'computer_science_l3_3',
        title: 'Operating Systems and Computer Architecture',
        description: 'Explore how operating systems manage resources and how computer hardware is structured.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'computer_science_l3_3_q1', question: 'What is the role of an operating system (OS)?', choices: ['To run only one program at a time', 'To manage hardware resources (CPU, memory, storage) and provide services to applications', 'To provide internet connectivity to the computer', 'To store all user data permanently'], correct: 1, explanation: 'The OS manages hardware resources (CPU scheduling, memory management, I/O), provides a layer of abstraction for applications, and manages processes and file systems.' },
          { id: 'computer_science_l3_3_q2', question: 'What is "virtual memory"?', choices: ['Memory that doesn\'t physically exist', 'A technique using disk space as an extension of RAM, allowing programs larger than physical RAM to run', 'Memory shared between multiple computers', 'A faster type of RAM used for graphics'], correct: 1, explanation: 'Virtual memory extends available memory by using disk space (swap space) as RAM extension. The OS manages mapping between virtual addresses and physical RAM.' },
          { id: 'computer_science_l3_3_q3', question: 'What is a "process" vs a "thread" in operating systems?', choices: ['They are identical — different names for running programs', 'A process is an independent running program with its own memory; a thread is a smaller unit of execution within a process, sharing memory', 'A process uses CPU; a thread uses memory', 'A process is temporary; a thread is permanent'], correct: 1, explanation: 'A process is a program in execution with its own memory space. Threads are lighter units within a process that share memory — enabling concurrent execution.' },
          { id: 'computer_science_l3_3_q4', question: 'What does "Moore\'s Law" state?', choices: ['Computer memory doubles every year', 'The number of transistors on a microchip doubles approximately every two years, roughly doubling processing power', 'The speed of the internet doubles every six months', 'Software complexity doubles with each new programming language'], correct: 1, explanation: 'Gordon Moore (1965) observed that transistor counts on chips doubled roughly every two years — driving exponential growth in computing power for decades, though now slowing.' },
          { id: 'computer_science_l3_3_q5', question: 'What is "cache memory" and why is it used?', choices: ['Storage for deleted files awaiting permanent deletion', 'Very fast, small memory between the CPU and RAM that stores frequently accessed data to reduce latency', 'A backup copy of RAM in case of power failure', 'Memory used specifically for graphics processing'], correct: 1, explanation: 'Cache (L1, L2, L3) is extremely fast memory (closer to CPU than RAM) that stores frequently accessed data and instructions, dramatically reducing time to access data.' },
        ],
      },
    ],
  },
  {
    id: 'health',
    label: 'Health & Physical Education',
    emoji: '🏃',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'health_p1', question: 'What are the three components of the "health triangle"?', choices: ['Diet, exercise, and sleep', 'Physical, mental, and social health', 'Nutrition, fitness, and hygiene', 'Strength, endurance, and flexibility'], correct: 1, explanation: 'The health triangle comprises physical health (body), mental/emotional health (mind), and social health (relationships) — all three interact and affect overall wellbeing.' },
      { id: 'health_p2', question: 'What is the recommended amount of moderate aerobic activity per week for adults?', choices: ['30 minutes per week', '75 minutes per week', '150 minutes per week', '300 minutes per week'], correct: 2, explanation: 'WHO and health organizations recommend at least 150 minutes of moderate-intensity aerobic activity per week (e.g., brisk walking, cycling) for adults.' },
      { id: 'health_p3', question: 'What does "BMI" (Body Mass Index) measure?', choices: ['Body fat percentage directly', 'A ratio of weight to height used to screen for healthy weight categories', 'Muscle mass relative to body weight', 'Cardiovascular fitness level'], correct: 1, explanation: 'BMI = weight (kg) / height² (m²). It screens for underweight, healthy weight, overweight, or obesity, though it doesn\'t directly measure body fat.' },
      { id: 'health_p4', question: 'What is the primary fuel source for high-intensity exercise?', choices: ['Fat', 'Protein', 'Carbohydrates (glucose/glycogen)', 'Vitamins and minerals'], correct: 2, explanation: 'Carbohydrates (stored as glycogen) are the primary fuel for high-intensity exercise. Fat fuels lower-intensity, longer-duration activities.' },
      { id: 'health_p5', question: 'What is "resting heart rate" an indicator of?', choices: ['Blood pressure', 'Cardiovascular fitness — lower resting heart rate generally indicates better fitness', 'Hydration levels', 'Lung capacity'], correct: 1, explanation: 'Resting heart rate (RHR) reflects cardiovascular efficiency. Athletes often have lower RHR (40-60 bpm) because their hearts pump more blood per beat.' },
      { id: 'health_p6', question: 'What does "FITT" stand for in exercise planning?', choices: ['Fitness, Intensity, Training, Timing', 'Frequency, Intensity, Time, Type', 'Flexibility, Interval, Tension, Tempo', 'Force, Impact, Timing, Technique'], correct: 1, explanation: 'FITT: Frequency (how often), Intensity (how hard), Time (how long), Type (what kind of exercise) — a framework for designing balanced exercise programs.' },
      { id: 'health_p7', question: 'What is the difference between aerobic and anaerobic exercise?', choices: ['Aerobic uses oxygen to produce energy; anaerobic does not rely on oxygen', 'Aerobic builds muscle; anaerobic burns fat', 'Aerobic is high-intensity; anaerobic is low-intensity', 'Aerobic is for men; anaerobic is for women'], correct: 0, explanation: 'Aerobic exercise (running, swimming) uses oxygen for sustained energy. Anaerobic exercise (sprinting, weightlifting) produces energy without oxygen for short, intense bursts.' },
      { id: 'health_p8', question: 'What is "muscle hypertrophy"?', choices: ['Muscle fatigue from overtraining', 'The increase in muscle fiber size through resistance training', 'The flexibility gained through stretching', 'A type of muscle injury from overuse'], correct: 1, explanation: 'Hypertrophy is the enlargement of muscle fibers in response to resistance training stress — the basis for strength training and bodybuilding.' },
      { id: 'health_p9', question: 'What are "macronutrients"?', choices: ['Vitamins and minerals needed in small amounts', 'The three main nutrients providing energy: carbohydrates, proteins, and fats', 'Nutrients only needed by athletes', 'Nutrients found only in vegetables and fruits'], correct: 1, explanation: 'Macronutrients are the three main energy-providing nutrients: carbohydrates (4 cal/g), proteins (4 cal/g), and fats (9 cal/g).' },
      { id: 'health_p10', question: 'What is the purpose of "warming up" before exercise?', choices: ['To lose more calories', 'To gradually increase heart rate, blood flow to muscles, and prepare the body for exercise, reducing injury risk', 'To stretch muscles to their maximum length', 'To activate the anaerobic energy system'], correct: 1, explanation: 'Warming up gradually raises heart rate, increases blood flow and muscle temperature, improves flexibility, and prepares the neuromuscular system — reducing injury risk.' },
      { id: 'health_p11', question: 'What is the "overload principle" in exercise science?', choices: ['Exercising to the point of failure', 'Progressively increasing exercise demands over time to continue improving fitness', 'Exercising different muscle groups on different days', 'Avoiding overexertion during training'], correct: 1, explanation: 'The overload principle: to improve fitness, you must progressively increase the exercise load beyond what the body is accustomed to (more weight, frequency, or duration).' },
      { id: 'health_p12', question: 'What is "mental health" and why is it important?', choices: ['The absence of mental illness only', 'Emotional, psychological, and social well-being affecting how we think, feel, act, handle stress, and relate to others', 'Intelligence and cognitive ability', 'The ability to control one\'s emotions perfectly'], correct: 1, explanation: 'Mental health encompasses emotional, psychological, and social well-being — it affects every aspect of life and is as important as physical health.' },
    ],
    lessons: [
      {
        id: 'health_l1_1',
        title: 'Components of Physical Fitness',
        description: 'Discover the five components of physical fitness and why each is important for health.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'health_l1_1_q1', question: 'What are the five components of health-related fitness?', choices: ['Speed, agility, power, balance, coordination', 'Cardiovascular endurance, muscular strength, muscular endurance, flexibility, and body composition', 'Strength, speed, endurance, flexibility, and skill', 'Aerobic fitness, anaerobic fitness, strength, flexibility, and nutrition'], correct: 1, explanation: 'The five health-related fitness components: cardiovascular endurance, muscular strength, muscular endurance, flexibility, and body composition.' },
          { id: 'health_l1_1_q2', question: 'What does "cardiovascular endurance" measure?', choices: ['How much weight you can lift', 'How efficiently the heart, lungs, and circulatory system can supply oxygen during sustained exercise', 'How flexible your joints are', 'How quickly your muscles recover after exercise'], correct: 1, explanation: 'Cardiovascular endurance (also called aerobic fitness) measures the ability of the heart, lungs, and blood vessels to deliver oxygen to working muscles during prolonged activity.' },
          { id: 'health_l1_1_q3', question: 'What is "muscular endurance" different from "muscular strength"?', choices: ['They are identical', 'Muscular endurance is the ability to repeat contractions over time; strength is maximum force in a single effort', 'Muscular endurance is for upper body; strength is for lower body', 'Endurance requires no training; strength requires training'], correct: 1, explanation: 'Muscular strength is maximum force in a single effort (one-rep max). Muscular endurance is the ability to perform repeated contractions against resistance over time.' },
          { id: 'health_l1_1_q4', question: 'What is "flexibility" and how is it typically measured?', choices: ['The ability to run fast and change direction', 'The range of motion available at a joint, often measured with a sit-and-reach test', 'The ability to maintain balance on one foot', 'How quickly muscles contract and relax'], correct: 1, explanation: 'Flexibility is the range of motion at a joint. It is commonly measured with the sit-and-reach test (hamstring/lower back flexibility) and improved through stretching.' },
          { id: 'health_l1_1_q5', question: 'What is "body composition"?', choices: ['The overall shape and appearance of the body', 'The ratio of fat mass to lean mass (muscle, bone, water) in the body', 'The weight-to-height ratio', 'The distribution of muscle groups across the body'], correct: 1, explanation: 'Body composition is the percentage of fat vs. lean mass (muscle, bone, water, organs). Healthy body composition is associated with reduced disease risk.' },
        ],
      },
      {
        id: 'health_l1_2',
        title: 'Nutrition Fundamentals',
        description: 'Learn the basics of nutrition including macronutrients, micronutrients, and a balanced diet.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'health_l1_2_q1', question: 'How many calories (kcal) per gram do carbohydrates and proteins provide?', choices: ['2 kcal/g each', '4 kcal/g each', '7 kcal/g each', '9 kcal/g each'], correct: 1, explanation: 'Both carbohydrates and proteins provide 4 kcal per gram. Fat provides 9 kcal/g, and alcohol provides 7 kcal/g.' },
          { id: 'health_l1_2_q2', question: 'What are "micronutrients"?', choices: ['Nutrients only needed during childhood', 'Vitamins and minerals needed in small amounts for vital body functions', 'A type of protein supplement', 'Nutrients that are very small in physical size'], correct: 1, explanation: 'Micronutrients are vitamins and minerals required in small amounts but essential for growth, immunity, nerve function, and many biochemical processes.' },
          { id: 'health_l1_2_q3', question: 'What is the function of dietary fiber?', choices: ['Provides a direct source of energy like other carbohydrates', 'Supports digestive health, feeds gut bacteria, and helps regulate blood sugar and cholesterol', 'Builds muscle tissue', 'Is the primary source of vitamins A, C, and E'], correct: 1, explanation: 'Dietary fiber (indigestible plant material) promotes digestive health, feeds beneficial gut bacteria, slows sugar absorption, and reduces LDL cholesterol.' },
          { id: 'health_l1_2_q4', question: 'What is "dehydration" and what are early signs?', choices: ['Excess water retention causing swelling', 'Insufficient body water; early signs include thirst, dark urine, headache, and fatigue', 'Low sodium levels causing confusion', 'Excessive sweating after exercise'], correct: 1, explanation: 'Dehydration is insufficient body water. Early signs: thirst, dark yellow urine, headache, fatigue, and decreased performance. Even mild dehydration impairs cognition and exercise.' },
          { id: 'health_l1_2_q5', question: 'What are "essential amino acids"?', choices: ['Amino acids your body can produce on its own', 'Amino acids that must be obtained through diet because the body cannot synthesize them', 'The amino acids found only in animal products', 'Amino acids that are most important for muscle building'], correct: 1, explanation: 'There are 9 essential amino acids the body cannot make — they must come from food. Complete proteins (meat, eggs, dairy, quinoa) contain all 9.' },
        ],
      },
      {
        id: 'health_l1_3',
        title: 'Mental Health and Stress',
        description: 'Understand mental health, stress responses, and effective coping strategies.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'health_l1_3_q1', question: 'What is the "fight-or-flight" response?', choices: ['A decision-making strategy for conflict resolution', 'The body\'s automatic physiological response to perceived threat: increasing heart rate, adrenaline, and readiness for action', 'A type of aggressive behavior disorder', 'A breathing technique for calming anxiety'], correct: 1, explanation: 'The fight-or-flight response is an automatic stress reaction: the body releases adrenaline and cortisol, increasing heart rate and blood flow to muscles for rapid response to danger.' },
          { id: 'health_l1_3_q2', question: 'What is the difference between "acute" and "chronic" stress?', choices: ['Acute stress is mental; chronic stress is physical', 'Acute stress is short-term and often beneficial; chronic stress is prolonged and harmful to health', 'Acute stress is more dangerous than chronic', 'Chronic stress only affects adults'], correct: 1, explanation: 'Acute stress is short-term (e.g., before an exam) and can improve performance. Chronic stress (prolonged) impairs immune function, increases disease risk, and harms mental health.' },
          { id: 'health_l1_3_q3', question: 'Which of the following is an evidence-based stress management technique?', choices: ['Avoiding all stressful situations', 'Mindfulness meditation and deep breathing', 'Ignoring stress until it passes', 'Increasing caffeine consumption'], correct: 1, explanation: 'Mindfulness, deep breathing (diaphragmatic breathing), exercise, adequate sleep, and social support are all evidence-based techniques for managing stress effectively.' },
          { id: 'health_l1_3_q4', question: 'What is "resilience" in mental health?', choices: ['The absence of any mental health challenges', 'The ability to adapt well and recover from adversity, trauma, or significant stress', 'A personality trait that only some people are born with', 'The ability to avoid all negative emotions'], correct: 1, explanation: 'Resilience is the capacity to recover from and adapt to difficult experiences. It can be developed through supportive relationships, positive coping skills, and self-efficacy.' },
          { id: 'health_l1_3_q5', question: 'What role does sleep play in mental health?', choices: ['Sleep has no effect on mental health', 'Adequate sleep is critical for emotional regulation, memory consolidation, and reducing risk of anxiety and depression', 'Sleep only affects physical health, not mental', 'More sleep always improves mental health regardless of quality'], correct: 1, explanation: 'Quality sleep is essential for mental health: it supports emotional regulation, memory, concentration, and is strongly linked to reduced risk of depression and anxiety.' },
        ],
      },
      {
        id: 'health_l2_1',
        title: 'Exercise Physiology',
        description: 'Explore how the body responds to exercise at the physiological level.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'health_l2_1_q1', question: 'What is "VO2 max"?', choices: ['Maximum heart rate during exercise', 'The maximum rate of oxygen consumption during intense exercise — the gold standard measure of aerobic fitness', 'The maximum volume of air the lungs can hold', 'The minimum oxygen needed to sustain rest metabolism'], correct: 1, explanation: 'VO2 max (maximal oxygen uptake) measures the maximum rate the body can use oxygen during exercise, measured in mL/kg/min. Higher VO2 max = better aerobic fitness.' },
          { id: 'health_l2_1_q2', question: 'What is the "lactate threshold"?', choices: ['The point at which muscles begin producing lactic acid', 'The exercise intensity at which lactate accumulates faster than it can be cleared, causing fatigue', 'The maximum amount of lactic acid the blood can contain', 'The threshold below which fat is burned instead of carbohydrate'], correct: 1, explanation: 'The lactate (anaerobic) threshold is the exercise intensity where lactate accumulation begins to exceed clearance — training at this intensity is highly effective for endurance improvement.' },
          { id: 'health_l2_1_q3', question: 'What is "EPOC" (Excess Post-exercise Oxygen Consumption)?', choices: ['The oxygen debt during high-intensity exercise', 'Elevated oxygen consumption after exercise — the "afterburn effect" where the body continues burning extra calories', 'Oxygen supplementation used by elite athletes', 'The excess oxygen in muscles after training stops'], correct: 1, explanation: 'EPOC (afterburn) is elevated oxygen use after exercise to restore the body to resting state (replenish ATP, restore oxygen stores, repair tissue) — continuing calorie burn post-workout.' },
          { id: 'health_l2_1_q4', question: 'What are "fast-twitch" vs "slow-twitch" muscle fibers?', choices: ['Fast-twitch (Type II) are for endurance; slow-twitch (Type I) are for power', 'Slow-twitch (Type I) are fatigue-resistant, for endurance; fast-twitch (Type II) produce power but fatigue quickly', 'They are the same type of fibers with different names', 'Fast-twitch fibers only exist in trained athletes'], correct: 1, explanation: 'Type I (slow-twitch) fibers use oxygen efficiently for sustained endurance activity. Type II (fast-twitch) generate power rapidly but fatigue quickly — suited for sprinting/power.' },
          { id: 'health_l2_1_q5', question: 'What is "periodization" in athletic training?', choices: ['Scheduling rest periods between sets', 'Systematically varying training volume and intensity over time to optimize performance and prevent overtraining', 'Training each body part on a different day of the week', 'The timing of nutrition around exercise'], correct: 1, explanation: 'Periodization systematically varies training load, volume, and intensity over planned time periods (microcycles, mesocycles, macrocycles) to optimize performance and minimize injury.' },
        ],
      },
      {
        id: 'health_l2_2',
        title: 'Chronic Disease Prevention',
        description: 'Understand how lifestyle factors influence the risk of chronic diseases.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'health_l2_2_q1', question: 'What are the major modifiable risk factors for cardiovascular disease?', choices: ['Age, genetics, and gender', 'Smoking, high blood pressure, high cholesterol, physical inactivity, obesity, and diabetes', 'Stress, pollution, and family history only', 'Diet alone is the only modifiable risk factor'], correct: 1, explanation: 'Major modifiable CVD risk factors: smoking, hypertension, dyslipidemia, physical inactivity, obesity, diabetes, and stress — all can be reduced through lifestyle changes.' },
          { id: 'health_l2_2_q2', question: 'What is Type 2 diabetes and how is it linked to lifestyle?', choices: ['An autoimmune disease destroying insulin-producing cells', 'A condition where cells become resistant to insulin, strongly linked to obesity, poor diet, and physical inactivity', 'A genetic condition that cannot be influenced by lifestyle', 'A disease only affecting the elderly'], correct: 1, explanation: 'Type 2 diabetes involves insulin resistance — cells don\'t respond properly to insulin. It\'s strongly associated with obesity and inactivity, and is largely preventable through lifestyle.' },
          { id: 'health_l2_2_q3', question: 'What is "hypertension" and why is it called a "silent killer"?', choices: ['High blood pressure (≥130/80 mmHg) — called silent because it typically has no symptoms but damages organs', 'Irregular heartbeat that is difficult to diagnose', 'A type of diabetes without obvious symptoms', 'Chronic headache caused by silent brain inflammation'], correct: 0, explanation: 'Hypertension (high blood pressure) damages blood vessels and organs silently — often without symptoms — increasing risk of heart attack, stroke, and kidney disease.' },
          { id: 'health_l2_2_q4', question: 'Regular physical activity reduces the risk of which conditions?', choices: ['Only cardiovascular disease', 'Cardiovascular disease, Type 2 diabetes, obesity, certain cancers, depression, and anxiety', 'Only obesity and type 2 diabetes', 'Only mental health conditions'], correct: 1, explanation: 'Regular physical activity reduces risk of cardiovascular disease, Type 2 diabetes, certain cancers (colon, breast), osteoporosis, depression, anxiety, and cognitive decline.' },
          { id: 'health_l2_2_q5', question: 'What is "osteoporosis" and how can it be prevented?', choices: ['Inflammation of joints — prevented by avoiding exercise', 'Reduced bone density making bones fragile — prevented by calcium, vitamin D, and weight-bearing exercise', 'A muscle-wasting disease prevented by protein intake', 'Hardening of arteries prevented by aerobic exercise'], correct: 1, explanation: 'Osteoporosis is low bone density and structural deterioration, increasing fracture risk. Prevention: adequate calcium, vitamin D, weight-bearing exercise, and avoiding smoking.' },
        ],
      },
      {
        id: 'health_l2_3',
        title: 'First Aid and Safety',
        description: 'Learn essential first aid skills and safety principles for emergency situations.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'health_l2_3_q1', question: 'What are the steps of "CPR" (Cardiopulmonary Resuscitation)?', choices: ['Check for safety, call for help, then give 30 chest compressions followed by 2 rescue breaths', 'Give 10 rescue breaths, then check for pulse, then begin compressions', 'Apply AED immediately, then begin chest compressions without rescue breaths', 'Call emergency services and wait for professional help'], correct: 0, explanation: 'Basic CPR: ensure safety, call emergency services, begin 30 chest compressions (hard and fast), then 2 rescue breaths — repeat cycle. Hands-only CPR (compressions only) is also effective.' },
          { id: 'health_l2_3_q2', question: 'What is the "RICE" method for treating soft tissue injuries?', choices: ['Run, Ice, Compress, Elevate', 'Rest, Ice, Compression, Elevation', 'Rest, Immobilize, Cool, Elevate', 'Reduce swelling, Immobilize, Care, Exercise'], correct: 1, explanation: 'RICE: Rest (stop activity), Ice (20 min on/off), Compression (bandage), Elevation (raise above heart) — the standard first-aid treatment for sprains and strains.' },
          { id: 'health_l2_3_q3', question: 'What are signs of a stroke to act on immediately? (FAST)', choices: ['Fever, Anxiety, Sweating, Tiredness', 'Face drooping, Arm weakness, Speech difficulty, Time to call emergency services', 'Fatigue, Arm pain, Shortness of breath, Tightness in chest', 'Fainting, Agitation, Seizure, Temperature change'], correct: 1, explanation: 'FAST: Face drooping (uneven smile), Arm weakness (one arm drops), Speech difficulty (slurred/strange), Time to call emergency services immediately. Rapid treatment is crucial.' },
          { id: 'health_l2_3_q4', question: 'What should you do if someone is choking and cannot cough, speak, or breathe?', choices: ['Give them water to dislodge the obstruction', 'Perform abdominal thrusts (Heimlich maneuver) and call emergency services', 'Lay them flat and perform CPR immediately', 'Pat them firmly on the back only and wait'], correct: 1, explanation: 'For a choking adult who can\'t cough/speak: perform abdominal thrusts (Heimlich maneuver) — quick inward-upward thrusts below the ribcage to expel the obstruction.' },
          { id: 'health_l2_3_q5', question: 'What is an "AED" and how is it used?', choices: ['An Automated Emergency Device — called for professional help only', 'An Automated External Defibrillator — delivers an electric shock to restore normal heart rhythm during cardiac arrest', 'An Airway Emergency Device — used to clear blocked airways', 'An Advanced Emergency Drug — a medication for heart attack'], correct: 1, explanation: 'An AED is a portable device that analyzes heart rhythm and, if needed, delivers a shock to restore normal rhythm in cardiac arrest. It gives step-by-step audio instructions.' },
        ],
      },
      {
        id: 'health_l3_1',
        title: 'Sports Science and Performance',
        description: 'Apply advanced principles of sports science to optimize athletic performance.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'health_l3_1_q1', question: 'What is "sports periodization" and why is it used?', choices: ['Scheduling rest days between training sessions', 'Systematic planning of training phases (preparation, competition, transition) to peak performance at the right time', 'Exercising different sports in rotation to avoid boredom', 'A medical periodical focusing on sports medicine research'], correct: 1, explanation: 'Periodization structures training into phases with varying volume and intensity so athletes peak physically for key competitions, while managing fatigue and adaptation.' },
          { id: 'health_l3_1_q2', question: 'What is "proprioception" in sports science?', choices: ['The ability to generate maximum force rapidly', 'The body\'s sense of its own position, movement, and equilibrium in space', 'The speed of nerve signal transmission during exercise', 'The ability to predict an opponent\'s movements'], correct: 1, explanation: 'Proprioception is the body\'s ability to sense its own position and movement through receptors in muscles, tendons, and joints — crucial for balance, coordination, and injury prevention.' },
          { id: 'health_l3_1_q3', question: 'What is "creatine" and why do some athletes use it?', choices: ['A hormone naturally produced by the pituitary gland during exercise', 'A natural compound that increases phosphocreatine stores, improving high-intensity, short-duration exercise performance', 'An anabolic steroid used to increase muscle size', 'A supplement that improves cardiovascular endurance'], correct: 1, explanation: 'Creatine is a naturally occurring compound that replenishes ATP during high-intensity exercise. Supplementation can increase power output in short, explosive activities.' },
          { id: 'health_l3_1_q4', question: 'What is the "female athlete triad"?', choices: ['Three key performance metrics for female athletes', 'A syndrome of low energy availability, menstrual dysfunction, and low bone density in female athletes', 'Three training principles specific to women in sport', 'The three physiological differences between male and female athletes'], correct: 1, explanation: 'The female athlete triad: interrelated conditions of energy deficiency, menstrual irregularity, and low bone density — a serious health concern in female athletes, especially in aesthetic sports.' },
          { id: 'health_l3_1_q5', question: 'What is "high-intensity interval training" (HIIT) and why is it effective?', choices: ['Training at maximum intensity for one hour continuously', 'Alternating periods of very high intensity effort with brief recovery, improving fitness in less time', 'A type of strength training using heavy weights', 'Low-intensity exercise performed at very high frequency'], correct: 1, explanation: 'HIIT alternates intense bursts (85-95% max heart rate) with brief recovery periods. It improves VO2 max, burns fat, and produces cardiovascular adaptations in less time than steady-state exercise.' },
        ],
      },
      {
        id: 'health_l3_2',
        title: 'Public Health and Epidemiology',
        description: 'Explore population-level health, epidemiology, and global health challenges.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'health_l3_2_q1', question: 'What is "epidemiology"?', choices: ['The study of epidermis and skin diseases', 'The study of the distribution, determinants, and control of diseases in populations', 'The study of epidemic outbreaks only', 'A branch of medicine treating infectious diseases'], correct: 1, explanation: 'Epidemiology studies how diseases are distributed in populations, what factors determine their distribution, and how to control them — the foundational science of public health.' },
          { id: 'health_l3_2_q2', question: 'What is "herd immunity"?', choices: ['Immunity developed by animals exposed to diseases', 'When enough people in a population are immune (through vaccination or infection) that disease spread is effectively stopped', 'The immunity of a herd of livestock to veterinary diseases', 'Immunity that only works when the whole community exercises together'], correct: 1, explanation: 'Herd immunity: when a sufficient proportion of a population is immune, protecting even vulnerable non-immune individuals by breaking chains of transmission.' },
          { id: 'health_l3_2_q3', question: 'What does "incidence" vs "prevalence" mean in epidemiology?', choices: ['They are synonymous terms for disease frequency', 'Incidence = new cases in a time period; prevalence = all existing cases at a given time', 'Incidence measures chronic disease; prevalence measures acute disease', 'Incidence is the death rate; prevalence is the infection rate'], correct: 1, explanation: 'Incidence measures the rate of new cases occurring in a defined period. Prevalence measures all existing cases (new + old) at a specific point in time.' },
          { id: 'health_l3_2_q4', question: 'The "social determinants of health" include:', choices: ['Only genetic and biological factors', 'Socioeconomic status, education, neighborhood, food access, employment, and social support — conditions in which people live and work', 'Only healthcare access and medical treatment quality', 'Individual health behaviors and lifestyle choices only'], correct: 1, explanation: 'Social determinants — income, education, neighborhood, food security, employment, social support — shape health outcomes more powerfully than healthcare itself.' },
          { id: 'health_l3_2_q5', question: 'What is the "Global Burden of Disease" (GBD)?', choices: ['The total cost of healthcare worldwide', 'A comprehensive study measuring the impact of diseases, injuries, and risk factors on health across countries and over time', 'The number of people with chronic diseases globally', 'WHO\'s list of the most dangerous infectious diseases'], correct: 1, explanation: 'The GBD study measures the burden of hundreds of diseases, injuries, and risk factors globally using DALYs (disability-adjusted life years), informing public health priorities.' },
        ],
      },
      {
        id: 'health_l3_3',
        title: 'Health and Technology',
        description: 'Examine how modern technology is transforming health monitoring, medicine, and wellness.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'health_l3_3_q1', question: 'What are "wearable health devices" and what can they monitor?', choices: ['Medical devices requiring a prescription', 'Consumer devices like smartwatches that can monitor heart rate, activity, sleep, blood oxygen, and ECG', 'Devices only used in hospital settings', 'Implantable devices monitoring internal organ function'], correct: 1, explanation: 'Modern wearables (Apple Watch, Fitbit, Oura Ring) monitor heart rate, activity, sleep, blood oxygen (SpO2), heart rhythm (ECG), stress, and more, enabling continuous health monitoring.' },
          { id: 'health_l3_3_q2', question: 'What is "telemedicine"?', choices: ['Broadcasting health information on television', 'Delivering healthcare services remotely using digital technology — video consultations, remote monitoring', 'Using robots to perform surgeries', 'Teaching medicine through online courses'], correct: 1, explanation: 'Telemedicine delivers healthcare via digital technologies — video consultations, remote patient monitoring, digital prescriptions — expanding access especially in underserved areas.' },
          { id: 'health_l3_3_q3', question: 'How is AI being used in medical diagnostics?', choices: ['AI is not yet accurate enough for medical use', 'Analyzing medical images (X-rays, MRIs), detecting patterns in patient data, and assisting diagnosis with high accuracy', 'AI only helps with administrative hospital tasks', 'AI is used only for drug delivery systems'], correct: 1, explanation: 'AI analyzes medical images (detecting cancer in mammograms, diabetic retinopathy in eye scans) often matching or exceeding specialist accuracy, and predicts patient risk from electronic health records.' },
          { id: 'health_l3_3_q4', question: 'What is "precision medicine"?', choices: ['Very accurate measurements in traditional medicine', 'Tailoring medical treatment to individual characteristics including genetics, lifestyle, and environment', 'A surgical technique requiring extreme precision', 'Medicine produced to exact dosage specifications'], correct: 1, explanation: 'Precision medicine (also personalized medicine) customizes treatment based on an individual\'s genetic makeup, biomarkers, lifestyle, and environment, rather than one-size-fits-all approaches.' },
          { id: 'health_l3_3_q5', question: 'What are the ethical concerns around health data and digital health technologies?', choices: ['There are no significant ethical concerns with health data', 'Privacy and data security, consent, algorithmic bias, equitable access, and commercialization of personal health data', 'Only concerns about device accuracy and reliability', 'Ethical concerns exist only for AI in medicine, not wearables'], correct: 1, explanation: 'Key concerns: privacy/security of sensitive health data, informed consent, algorithmic bias (if training data is not representative), equitable access to technologies, and commercial exploitation of data.' },
        ],
      },
    ],
  },
  {
    id: 'environmental_science',
    label: 'Environmental Science',
    emoji: '🌍',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    hasPlacement: true,
    placementQuestions: [
      { id: 'environmental_science_p1', question: 'What is the "greenhouse effect"?', choices: ['The cooling effect of deforestation', 'The trapping of heat by greenhouse gases in Earth\'s atmosphere, warming the planet', 'The warming effect of urban areas compared to rural areas', 'The effect of burning fossil fuels on ocean temperature'], correct: 1, explanation: 'The greenhouse effect: solar radiation warms Earth\'s surface; greenhouse gases (CO2, methane, water vapor) trap outgoing infrared radiation, warming the atmosphere.' },
      { id: 'environmental_science_p2', question: 'Which gas is the primary driver of current climate change from human activities?', choices: ['Oxygen (O2)', 'Nitrogen (N2)', 'Carbon dioxide (CO2)', 'Ozone (O3)'], correct: 2, explanation: 'CO2 from burning fossil fuels, deforestation, and cement production is the primary greenhouse gas driving current human-caused climate change.' },
      { id: 'environmental_science_p3', question: 'What is "biodiversity"?', choices: ['The number of endangered species in an area', 'The variety of life on Earth — species diversity, genetic diversity, and ecosystem diversity', 'The biomass of all organisms in an ecosystem', 'The diversity of habitats on Earth'], correct: 1, explanation: 'Biodiversity encompasses the variety of life including genetic diversity within species, the number of species (species diversity), and the variety of ecosystems.' },
      { id: 'environmental_science_p4', question: 'What is the "carbon cycle"?', choices: ['The recycling of plastic materials containing carbon', 'The biogeochemical cycle by which carbon is exchanged among the biosphere, atmosphere, oceans, and geosphere', 'The industrial process of converting coal to energy', 'The process by which living organisms absorb carbon dioxide'], correct: 1, explanation: 'The carbon cycle describes how carbon moves between the atmosphere, living organisms, soil, ocean, and rocks through processes like photosynthesis, respiration, and combustion.' },
      { id: 'environmental_science_p5', question: 'What is "deforestation" and its primary environmental impact?', choices: ['Selective cutting of dead trees, improving forest health', 'Large-scale removal of forests, releasing stored carbon, destroying habitats, and altering water cycles', 'The natural process of tree death in old-growth forests', 'Planting new forests in previously open areas'], correct: 1, explanation: 'Deforestation removes forests at scale, releasing stored carbon, destroying biodiversity hotspots, disrupting water cycles, causing soil erosion, and affecting climate.' },
      { id: 'environmental_science_p6', question: 'What is "ocean acidification"?', choices: ['The natural aging process of ocean water', 'The decrease in ocean pH caused by absorption of excess atmospheric CO2', 'Pollution making ocean water toxic to marine life', 'Increasing ocean temperature killing marine organisms'], correct: 1, explanation: 'Ocean acidification: CO2 absorbed by seawater forms carbonic acid, lowering ocean pH. This threatens marine organisms like corals and shellfish that build calcium carbonate structures.' },
      { id: 'environmental_science_p7', question: 'What are "renewable energy sources"?', choices: ['Energy sources found in nature but limited in quantity', 'Energy from sources that are replenished naturally on human timescales, like solar, wind, and hydropower', 'Energy sources that produce no pollution whatsoever', 'Energy sources that have been used for at least 100 years'], correct: 1, explanation: 'Renewable energy comes from natural sources replenished continuously: solar, wind, hydropower, geothermal, and biomass — contrasted with finite fossil fuels.' },
      { id: 'environmental_science_p8', question: 'What is the "ozone layer" and why is it important?', choices: ['A layer of oxygen gas protecting Earth from asteroids', 'A layer of ozone (O3) in the stratosphere absorbing most of the Sun\'s harmful UV radiation', 'A layer of smog that traps heat in cities', 'A protective layer of ice around the Earth\'s poles'], correct: 1, explanation: 'The ozone layer (stratosphere, 15-35 km altitude) absorbs 97-99% of the Sun\'s harmful UV-B and UV-C radiation, protecting life from UV damage (skin cancer, ecosystem harm).' },
      { id: 'environmental_science_p9', question: 'What is "eutrophication" in water bodies?', choices: ['The natural aging process of lakes over millions of years', 'Excessive nutrient enrichment (especially nitrogen and phosphorus) causing algae blooms and oxygen depletion', 'The purification of water through natural filtration', 'Increased saltwater intrusion into freshwater ecosystems'], correct: 1, explanation: 'Eutrophication: excess nutrients (from fertilizer runoff) cause algal blooms that block light and consume oxygen when they decompose, creating "dead zones" where aquatic life cannot survive.' },
      { id: 'environmental_science_p10', question: 'What is "sustainable development" according to the Brundtland Report?', choices: ['Development that maximizes economic growth at all costs', 'Development that meets the needs of the present without compromising the ability of future generations to meet their own needs', 'Development focused only on environmental protection', 'Development in environmentally pristine regions'], correct: 1, explanation: 'The 1987 Brundtland Report defined sustainable development as "development that meets the needs of the present without compromising the ability of future generations to meet their own needs."' },
      { id: 'environmental_science_p11', question: 'What is the "sixth mass extinction" referring to?', choices: ['A historical extinction 65 million years ago', 'The ongoing, human-caused rapid decline in global biodiversity — the sixth major extinction event in Earth\'s history', 'A predicted future extinction from climate change', 'The extinction of six keystone species from each continent'], correct: 1, explanation: 'Scientists argue we are in a sixth mass extinction — species are disappearing at 100-1,000 times the natural background rate due to habitat loss, pollution, climate change, and overexploitation.' },
      { id: 'environmental_science_p12', question: 'What is the Paris Agreement (2015) and its primary goal?', choices: ['An agreement to ban all fossil fuels by 2030', 'An international climate accord aiming to limit global warming to well below 2°C (ideally 1.5°C) above pre-industrial levels', 'An agreement to protect 50% of land and ocean by 2025', 'A trade agreement encouraging sustainable product manufacturing'], correct: 1, explanation: 'The Paris Agreement is an international treaty where 196 nations pledged to limit global warming to well below 2°C above pre-industrial levels, with efforts to limit it to 1.5°C.' },
    ],
    lessons: [
      {
        id: 'environmental_science_l1_1',
        title: 'Earth\'s Systems',
        description: 'Explore the four interconnected spheres of Earth: atmosphere, hydrosphere, biosphere, and lithosphere.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'environmental_science_l1_1_q1', question: 'What are Earth\'s four interconnected spheres?', choices: ['Atmosphere, hydrosphere, biosphere, and lithosphere', 'Troposphere, stratosphere, mesosphere, and thermosphere', 'Soil, water, air, and fire', 'Land, sea, sky, and space'], correct: 0, explanation: 'Earth\'s four spheres: atmosphere (air), hydrosphere (water), biosphere (life), and lithosphere (rock/land). They interact constantly and drive Earth\'s systems.' },
          { id: 'environmental_science_l1_1_q2', question: 'What drives the water (hydrological) cycle?', choices: ['Gravity alone', 'Solar energy and gravity together, driving evaporation, condensation, and precipitation', 'Ocean currents and wind only', 'Volcanic activity and geothermal heat'], correct: 1, explanation: 'The water cycle is driven by solar energy (powering evaporation and transpiration) and gravity (pulling precipitation down and driving river flow).' },
          { id: 'environmental_science_l1_1_q3', question: 'What is the "nitrogen cycle"?', choices: ['The cycle by which nitrogen is mined from rocks', 'The biogeochemical cycle by which nitrogen is converted between its various chemical forms through biological, physical, and geological processes', 'The process by which plants absorb nitrogen from the air directly', 'The cycle of nitrogen gas between the ocean and atmosphere only'], correct: 1, explanation: 'The nitrogen cycle converts N2 (atmospheric nitrogen) through fixation, nitrification, assimilation by plants, and denitrification — essential for all living organisms.' },
          { id: 'environmental_science_l1_1_q4', question: 'What is "soil erosion" and why is it a concern?', choices: ['The natural process of soil formation over millennia', 'The removal of topsoil by wind, water, or human activity — reducing agricultural productivity and increasing water pollution', 'The process of soil becoming more acidic over time', 'The mixing of different soil types in an area'], correct: 1, explanation: 'Erosion strips away nutrient-rich topsoil (which takes centuries to form), reducing agricultural productivity, clogging waterways with sediment, and causing habitat loss.' },
          { id: 'environmental_science_l1_1_q5', question: 'What are the main layers of Earth\'s atmosphere from lowest to highest?', choices: ['Troposphere, stratosphere, mesosphere, thermosphere, exosphere', 'Ozone layer, stratosphere, troposphere, ionosphere, exosphere', 'Mesosphere, troposphere, exosphere, stratosphere, thermosphere', 'Ground layer, cloud layer, ozone layer, space layer'], correct: 0, explanation: 'Earth\'s atmospheric layers: troposphere (weather), stratosphere (ozone), mesosphere (meteor burn-up), thermosphere (aurora), exosphere (fades into space).' },
        ],
      },
      {
        id: 'environmental_science_l1_2',
        title: 'Ecosystems and Biomes',
        description: 'Learn about the major biomes of Earth and the factors that define different ecosystems.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'environmental_science_l1_2_q1', question: 'What is a "biome"?', choices: ['A single ecosystem in one geographic location', 'A large geographic region characterized by specific climate, vegetation, and wildlife', 'A collection of all species in a country', 'A marine ecosystem type'], correct: 1, explanation: 'A biome is a large-scale community of plants and animals adapted to the particular climate of their region (e.g., tropical rainforest, tundra, desert).' },
          { id: 'environmental_science_l1_2_q2', question: 'Tropical rainforests are ecologically significant because:', choices: ['They cover most of Earth\'s land area', 'They contain over 50% of the world\'s species and are major carbon stores, despite covering only ~6% of land', 'They produce most of the world\'s food crops', 'They have the most stable climates on Earth'], correct: 1, explanation: 'Tropical rainforests host extraordinary biodiversity (>50% of species), store vast carbon, regulate climate, and produce oxygen — making their protection crucial.' },
          { id: 'environmental_science_l1_2_q3', question: 'What is a "keystone species"?', choices: ['The most numerous species in an ecosystem', 'A species that has a disproportionately large effect on its ecosystem relative to its abundance', 'The largest predator in an ecosystem', 'An invasive species that dominates its new environment'], correct: 1, explanation: 'A keystone species has an outsized ecological impact — removing it dramatically changes the ecosystem. Example: sea otters control sea urchins, protecting kelp forests.' },
          { id: 'environmental_science_l1_2_q4', question: 'What is "trophic level" in ecology?', choices: ['The depth at which organisms live in ocean ecosystems', 'A feeding level in a food chain, based on the number of energy transfer steps from the producer', 'The geographic territory of an animal', 'The temperature range an organism can survive in'], correct: 1, explanation: 'Trophic levels represent feeding positions: producers (level 1), primary consumers/herbivores (level 2), secondary consumers (level 3), tertiary consumers (level 4).' },
          { id: 'environmental_science_l1_2_q5', question: 'What is the "10% rule" in energy transfer between trophic levels?', choices: ['Only 10% of species survive from one generation to the next', 'Only about 10% of energy from one trophic level is available to the next level — the rest is lost as heat', 'Humans should eat 10 times more plants than animals', 'Energy in ecosystems decreases by 10°C each level'], correct: 1, explanation: 'The 10% rule: only ~10% of energy at one trophic level transfers to the next (the rest is lost as heat through metabolism). This limits the length of food chains.' },
        ],
      },
      {
        id: 'environmental_science_l1_3',
        title: 'Environmental Pollution',
        description: 'Understand the major types of environmental pollution and their impacts on ecosystems and human health.',
        level: 1,
        xp: 10,
        rubies: 5,
        questions: [
          { id: 'environmental_science_l1_3_q1', question: 'What is "acid rain" and how does it form?', choices: ['Rain that has absorbed industrial dyes, turning acidic', 'Precipitation made acidic when SO2 and NOx emissions react with water vapor in the atmosphere', 'Naturally occurring acid in rainwater from CO2 absorption', 'Rain that passes through acidic soil before falling'], correct: 1, explanation: 'Acid rain forms when SO2 and NOx (from burning fossil fuels) react with atmospheric water, oxygen, and other chemicals to form sulfuric and nitric acids in precipitation.' },
          { id: 'environmental_science_l1_3_q2', question: 'What is "bioaccumulation" in environmental science?', choices: ['The growth of biodiversity in a recovering ecosystem', 'The build-up of a substance (like a toxin) in an organism\'s tissues at higher concentrations than in the environment', 'The accumulation of organic matter in soil over time', 'The increase in biomass in a growing ecosystem'], correct: 1, explanation: 'Bioaccumulation is the build-up of pollutants (e.g., DDT, mercury) in an organism\'s tissue over time. Biomagnification further concentrates toxins up the food chain.' },
          { id: 'environmental_science_l1_3_q3', question: 'What is "microplastic" pollution?', choices: ['Plastic particles less than 5mm in size that pervade the environment, including oceans, soil, and air', 'A type of plastic that breaks down quickly in the environment', 'Plastic pollution measured on a microscopic scale', 'Tiny plastic beads used in cosmetic products only'], correct: 0, explanation: 'Microplastics are plastic fragments <5mm from degradation of larger plastics or manufactured at small size. They contaminate water, food, air, and even human bodies.' },
          { id: 'environmental_science_l1_3_q4', question: 'What causes "smog" in urban areas?', choices: ['Volcanic ash mixing with city pollution', 'Photochemical reactions between sunlight and air pollutants (NOx, VOCs) or from industrial/coal combustion', 'Excessive humidity trapping dust in city air', 'Ocean fog mixing with urban exhaust'], correct: 1, explanation: 'Photochemical smog forms when sunlight reacts with NOx and volatile organic compounds (from vehicles, industry) to form ground-level ozone and particulate matter.' },
          { id: 'environmental_science_l1_3_q5', question: 'Why is plastic problematic in marine environments?', choices: ['Plastic rapidly biodegrades, releasing toxic chemicals', 'Marine plastic persists for centuries, entangles wildlife, is ingested by animals, fragments into microplastics, and disrupts ecosystems', 'Plastic dissolves in seawater, raising pH and causing acidification', 'Plastic only affects surface-dwelling marine species'], correct: 1, explanation: 'Marine plastic doesn\'t biodegrade — it persists hundreds of years, entangling and killing wildlife, being ingested by fish and birds, fragmenting into microplastics, and entering food chains including humans.' },
        ],
      },
      {
        id: 'environmental_science_l2_1',
        title: 'Climate Change: Science and Evidence',
        description: 'Examine the scientific evidence for climate change and its observed and projected impacts.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'environmental_science_l2_1_q1', question: 'What scientific evidence demonstrates that current climate change is primarily human-caused?', choices: ['Scientific models predict it, but there is no observational evidence', 'Rising CO2 concentrations matching fossil fuel signatures, temperature records, ice core data, and physical understanding of greenhouse gases', 'Only computer climate models support this conclusion', 'Changes in solar output explain the observed warming'], correct: 1, explanation: 'Multiple independent lines of evidence: isotopic signatures of CO2 matching fossil fuels, observed temperature increase, melting ice, sea level rise, and the known physics of greenhouse gases.' },
          { id: 'environmental_science_l2_1_q2', question: 'What are "feedback loops" in climate science?', choices: ['The process of recycling carbon between ecosystems', 'Processes where climate change causes effects that further amplify (positive) or dampen (negative) the original change', 'A cycle of climate policies being reviewed and updated', 'The process of ocean currents feeding back warm water to the atmosphere'], correct: 1, explanation: 'Positive feedback: Arctic warming melts reflective ice, exposing dark ocean (less reflection → more warming). Negative feedback: more CO2 → more plant growth → more CO2 absorbed.' },
          { id: 'environmental_science_l2_1_q3', question: 'What is "sea level rise" and what causes it?', choices: ['Daily tidal changes due to the Moon\'s gravity', 'Long-term rise caused by thermal expansion of warming ocean water and melting land ice (glaciers, ice sheets)', 'Temporary rise during storm surges', 'Rising due to more water from rivers flowing to the sea'], correct: 1, explanation: 'Sea level rises as oceans warm and expand (thermal expansion) and as land ice (glaciers, Greenland/Antarctic ice sheets) melts — threatening coastal communities worldwide.' },
          { id: 'environmental_science_l2_1_q4', question: 'What is the significance of the "1.5°C target" in the Paris Agreement?', choices: ['An average temperature target for all countries\' summers', 'The threshold above which scientists warn of substantially more severe and potentially irreversible climate impacts', 'The maximum temperature increase allowed in any single country', 'The average global temperature in pre-industrial times'], correct: 1, explanation: 'At 1.5°C warming, impacts are serious but manageable. Beyond 2°C, risks increase dramatically — more extreme weather, sea level rise, ecosystem collapse, and potential tipping points.' },
          { id: 'environmental_science_l2_1_q5', question: 'What are "climate tipping points"?', choices: ['The political points where nations agree to climate action', 'Critical thresholds where small changes trigger large, potentially irreversible shifts in Earth\'s climate system', 'The temperature at which climate models become inaccurate', 'Points where emissions stop increasing'], correct: 1, explanation: 'Climate tipping points are thresholds where gradual change triggers abrupt, self-reinforcing, potentially irreversible shifts — e.g., collapse of the West Antarctic Ice Sheet or Amazon dieback.' },
        ],
      },
      {
        id: 'environmental_science_l2_2',
        title: 'Biodiversity and Conservation',
        description: 'Explore the importance of biodiversity, threats to it, and conservation strategies.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'environmental_science_l2_2_q1', question: 'What are "ecosystem services"?', choices: ['Services provided by environmental consulting companies', 'The benefits that ecosystems provide to humans: clean air, water purification, pollination, climate regulation, food', 'Services funded by government environmental agencies', 'The role of human management in maintaining natural ecosystems'], correct: 1, explanation: 'Ecosystem services are the benefits humans receive from nature: provisioning (food, water), regulating (climate, water purification, pollination), cultural, and supporting services.' },
          { id: 'environmental_science_l2_2_q2', question: 'What is the IUCN Red List?', choices: ['A government blacklist of harmful environmental chemicals', 'The world\'s most comprehensive inventory of species\' conservation status, from Least Concern to Extinct', 'A list of the world\'s most biodiverse countries', 'A registry of protected national parks worldwide'], correct: 1, explanation: 'The IUCN Red List is the global standard for assessing species\' extinction risk, categorizing species from Least Concern through Vulnerable, Endangered, Critically Endangered, to Extinct.' },
          { id: 'environmental_science_l2_2_q3', question: 'What is "habitat fragmentation" and why is it a biodiversity threat?', choices: ['The natural division of habitats by mountains and rivers', 'Breaking continuous habitats into smaller, isolated patches, reducing species movement, genetic exchange, and increasing extinction risk', 'The destruction of habitats through logging only', 'The conversion of wild land to agricultural use completely'], correct: 1, explanation: 'Habitat fragmentation isolates populations in small patches, reducing genetic diversity, preventing movement between patches, making populations more vulnerable to local extinction.' },
          { id: 'environmental_science_l2_2_q4', question: 'What is an "invasive species"?', choices: ['A species that has evolved unique adaptations to local conditions', 'A non-native species introduced to a new environment, where it spreads widely and harms native biodiversity', 'An extremely aggressive native predator', 'A species that invades human settlements'], correct: 1, explanation: 'Invasive species are introduced outside their native range and spread aggressively, outcompeting native species, disrupting food webs, and causing significant ecological and economic harm.' },
          { id: 'environmental_science_l2_2_q5', question: 'What is "rewilding" as a conservation strategy?', choices: ['Reintroducing extinct species using DNA from fossils', 'Large-scale restoration of ecosystems to a more natural/wild state, often including reintroduction of lost species like predators', 'Training wild animals to tolerate human presence', 'Returning farmed land to any wild vegetation'], correct: 1, explanation: 'Rewilding restores ecosystems by reintroducing lost species (especially apex predators like wolves), allowing natural processes to resume — triggering trophic cascades and restoring ecological function.' },
        ],
      },
      {
        id: 'environmental_science_l2_3',
        title: 'Energy and Sustainability',
        description: 'Analyze energy sources, their environmental impacts, and pathways to a sustainable energy future.',
        level: 2,
        xp: 15,
        rubies: 8,
        questions: [
          { id: 'environmental_science_l2_3_q1', question: 'What are "fossil fuels" and why do they release CO2?', choices: ['Fuels made from fossilized plastic waste', 'Coal, oil, and natural gas formed from ancient organic matter; combustion releases carbon stored millions of years ago', 'Fuels found near fossil sites and dinosaur remains', 'Any fuel that has been stored underground'], correct: 1, explanation: 'Fossil fuels are ancient organic matter compressed over millions of years. Burning them releases carbon that was locked away, adding "new" CO2 to the active carbon cycle.' },
          { id: 'environmental_science_l2_3_q2', question: 'What is the "energy transition" in the context of sustainability?', choices: ['The transfer of energy between trophic levels in an ecosystem', 'The shift from fossil fuel-based energy systems to renewable energy sources to reduce greenhouse gas emissions', 'The conversion of kinetic energy to electrical energy in generators', 'The process of energy efficiency in modern buildings'], correct: 1, explanation: 'The energy transition is the global shift from carbon-intensive fossil fuels to renewable energy sources (solar, wind, hydro) needed to address climate change.' },
          { id: 'environmental_science_l2_3_q3', question: 'What is the "circular economy" concept?', choices: ['An economic system that grows in circles rather than linearly', 'An economy designed to eliminate waste by keeping materials in use for as long as possible through reuse, repair, and recycling', 'An economic model focused only on environmental sectors', 'A trading system between countries in a geographic circle'], correct: 1, explanation: 'The circular economy eliminates waste by designing products for longevity, repair, reuse, and recycling — contrasted with the linear "take-make-dispose" model.' },
          { id: 'environmental_science_l2_3_q4', question: 'What is "net zero" emissions?', choices: ['Emitting zero greenhouse gases from any source', 'Balancing greenhouse gas emissions with equivalent removals from the atmosphere', 'Reducing emissions to the average across all countries', 'Achieving zero emissions from the energy sector only'], correct: 1, explanation: 'Net zero means balancing greenhouse gas emissions with equivalent amounts removed from the atmosphere (through forests, carbon capture) — so net addition to the atmosphere is zero.' },
          { id: 'environmental_science_l2_3_q5', question: 'What is "life cycle assessment" (LCA)?', choices: ['Assessing the lifespan of wild animal populations', 'A method for evaluating the total environmental impact of a product from raw material extraction through production, use, and disposal', 'A business assessment of product sales over the product\'s lifetime', 'An ecological study of how ecosystems develop over time'], correct: 1, explanation: 'LCA quantifies the environmental impacts of a product throughout its entire life cycle — from raw material extraction ("cradle") to disposal ("grave") — enabling informed sustainability decisions.' },
        ],
      },
      {
        id: 'environmental_science_l3_1',
        title: 'Environmental Policy and Governance',
        description: 'Examine international environmental agreements, policy tools, and governance challenges.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'environmental_science_l3_1_q1', question: 'What was the significance of the Montreal Protocol (1987)?', choices: ['The first international agreement to limit greenhouse gas emissions', 'The international treaty that successfully phased out ozone-depleting substances (CFCs), allowing the ozone layer to recover', 'An agreement to protect international ocean boundaries', 'The first treaty establishing protected marine areas'], correct: 1, explanation: 'The Montreal Protocol phased out CFCs and other ozone-depleting substances. It is considered the most successful international environmental agreement — the ozone layer is now recovering.' },
          { id: 'environmental_science_l3_1_q2', question: 'What is a "carbon tax" and how does it work?', choices: ['A tax on carbon products like pencils and diamonds', 'A policy that puts a direct price on carbon emissions, incentivizing businesses and consumers to reduce fossil fuel use', 'A fee charged to countries that exceed their carbon quotas', 'A tax on imported goods from high-carbon industries'], correct: 1, explanation: 'A carbon tax places a direct fee on greenhouse gas emissions. By making emissions costly, it incentivizes businesses and individuals to reduce emissions and invest in clean alternatives.' },
          { id: 'environmental_science_l3_1_q3', question: 'What is "cap-and-trade" (emissions trading) policy?', choices: ['A trade agreement capping the import of high-carbon goods', 'A system setting a limit on total emissions, issuing tradable permits, and allowing companies to buy/sell permits if they emit more/less than their cap', 'A policy capping the number of new coal plants while allowing existing ones to trade', 'An agreement trading environmental protections for economic development rights'], correct: 1, explanation: 'Cap-and-trade: a government sets a total emission cap, distributes tradable permits. Companies emitting less can sell surplus permits; those emitting more must buy extra. The market finds the cheapest way to reduce emissions.' },
          { id: 'environmental_science_l3_1_q4', question: 'What is the "precautionary principle" in environmental policy?', choices: ['Acting with caution when handling hazardous chemicals in laboratories', 'When scientific evidence is uncertain but there is risk of serious harm, precautionary measures should be taken before full scientific proof', 'A principle requiring proof before any environmental regulations are enacted', 'Always erring on the side of economic development when costs are uncertain'], correct: 1, explanation: 'The precautionary principle: when there is plausible risk of serious harm, lack of complete scientific certainty should not delay protective action — burden of proof falls on those proposing potentially harmful activities.' },
          { id: 'environmental_science_l3_1_q5', question: 'What are the UN\'s Sustainable Development Goals (SDGs)?', choices: ['A list of 10 goals for economic growth of developing nations', '17 global goals adopted in 2015 addressing poverty, inequality, climate, peace, and environmental sustainability by 2030', 'Five environmental targets for greenhouse gas reduction', 'A set of development standards for sustainable construction'], correct: 1, explanation: 'The 17 SDGs (adopted 2015, Agenda 2030) are interconnected goals covering ending poverty, fighting climate change, protecting biodiversity, achieving gender equality, and more.' },
        ],
      },
      {
        id: 'environmental_science_l3_2',
        title: 'Environmental Justice and Ethics',
        description: 'Explore the ethical dimensions of environmental problems and the intersections of environment and social justice.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'environmental_science_l3_2_q1', question: 'What is "environmental justice"?', choices: ['The use of courts to enforce environmental laws', 'The fair treatment and meaningful involvement of all people in environmental decision-making, regardless of race, income, or origin', 'Justice served to those who commit environmental crimes', 'Equal distribution of natural resources between countries'], correct: 1, explanation: 'Environmental justice addresses the disproportionate burden of pollution and environmental degradation on marginalized communities, advocating for fair treatment in environmental decision-making.' },
          { id: 'environmental_science_l3_2_q2', question: 'What is "climate justice"?', choices: ['Legal action against countries causing climate change', 'Recognition that climate change impacts fall most heavily on vulnerable populations least responsible for emissions — and that responses must address this inequity', 'Ensuring all countries have equal carbon emission rights', 'A framework for distributing climate aid to developing nations only'], correct: 1, explanation: 'Climate justice recognizes that the poorest, most vulnerable populations (who emit least) suffer most from climate change impacts, and that responses must address this fundamental inequity.' },
          { id: 'environmental_science_l3_2_q3', question: 'What is the concept of "intergenerational equity" in environmental ethics?', choices: ['Equal rights for all generations currently alive', 'The obligation of the current generation to preserve natural resources and a stable environment for future generations', 'Equal distribution of resources between rich and poor generations', 'Rights of ancient ecosystems to legal protection'], correct: 1, explanation: 'Intergenerational equity holds that the current generation has a responsibility to preserve the environment for future generations — a foundation of sustainable development.' },
          { id: 'environmental_science_l3_2_q4', question: 'What is "deep ecology" as a philosophical movement?', choices: ['The scientific study of deep ocean ecosystems', 'A philosophy arguing that all living beings have inherent value regardless of their utility to humans, advocating for fundamental societal change', 'Ecological studies conducted deep within remote forests', 'A political movement for deep environmental regulations'], correct: 1, explanation: 'Deep ecology (Arne Næss) holds that all life has intrinsic value regardless of human utility, challenging anthropocentric worldviews and advocating for fundamental restructuring of human society.' },
          { id: 'environmental_science_l3_2_q5', question: 'What is the "tragedy of the commons" and how does it relate to environmental problems?', choices: ['Historical tragedies caused by natural disasters on common land', 'The tendency for shared resources to be overexploited when individuals act in self-interest, leading to depletion', 'A story illustrating the importance of private land ownership', 'Common knowledge in environmental science about typical resource depletion'], correct: 1, explanation: 'Garrett Hardin\'s concept: shared resources (oceans, atmosphere) are vulnerable to depletion when individuals exploit them for personal gain without collective management.' },
        ],
      },
      {
        id: 'environmental_science_l3_3',
        title: 'Solutions to Environmental Challenges',
        description: 'Evaluate emerging technologies and strategies for addressing the environmental crisis.',
        level: 3,
        xp: 20,
        rubies: 12,
        questions: [
          { id: 'environmental_science_l3_3_q1', question: 'What is "carbon capture and storage" (CCS)?', choices: ['Capturing CO2 from the air and storing it in forests', 'Technology that captures CO2 at emission sources (power plants) and stores it underground, preventing it from reaching the atmosphere', 'A method of capturing carbon in ocean algae', 'Storing carbon credits in digital ledgers'], correct: 1, explanation: 'CCS captures CO2 at large point sources (power plants, cement factories), compresses it, and injects it into deep geological formations for permanent storage.' },
          { id: 'environmental_science_l3_3_q2', question: 'What is "direct air capture" (DAC)?', choices: ['Using wind turbines to capture CO2 in the air', 'Technology that chemically removes CO2 directly from ambient air, allowing it to be stored or used', 'Capturing methane emissions directly from landfills', 'A method for directly capturing solar energy from the atmosphere'], correct: 1, explanation: 'DAC machines pull CO2 from ambient air (not just point sources) through chemical reactions. The captured CO2 can be stored underground or used to make fuels and materials.' },
          { id: 'environmental_science_l3_3_q3', question: 'What is "nature-based solutions" (NbS) for climate and biodiversity?', choices: ['Using AI to design nature-inspired technologies', 'Actions that protect, sustainably manage, or restore ecosystems to address societal challenges including climate and biodiversity loss', 'Genetic engineering of plants for better carbon absorption', 'Using natural materials in construction instead of synthetic ones'], correct: 1, explanation: 'Nature-based solutions (e.g., reforestation, wetland restoration, mangrove protection) address climate change by sequestering carbon while also delivering biodiversity and community co-benefits.' },
          { id: 'environmental_science_l3_3_q4', question: 'What is the "30x30" conservation initiative?', choices: ['Reducing emissions by 30% by 2030', 'A global initiative to protect 30% of the world\'s land and oceans by 2030 to halt biodiversity loss', 'Achieving 30 GW of renewable energy by 2030', 'Planting 30 billion trees by 2030'], correct: 1, explanation: '30x30 is a global goal to protect at least 30% of Earth\'s land and ocean areas by 2030, endorsed by over 100 countries at COP15 (2022), aimed at halting biodiversity loss.' },
          { id: 'environmental_science_l3_3_q5', question: 'What is "biomimicry" and how can it help solve environmental challenges?', choices: ['Mimicking nature by using organic materials in manufacturing', 'Innovation inspired by nature\'s designs and processes to create sustainable technologies', 'The process of genetically modifying organisms to mimic natural functions', 'Copying the appearance of natural ecosystems in urban areas'], correct: 1, explanation: 'Biomimicry draws inspiration from nature\'s 3.8 billion years of R&D — e.g., Velcro (burrs), wind turbine blades (whale fins), self-cleaning surfaces (lotus leaf) — to design sustainable solutions.' },
        ],
      },
    ],
  }
]

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id)
}

export function getLesson(subjectId: string, lessonId: string): Lesson | undefined {
  return getSubject(subjectId)?.lessons.find((l) => l.id === lessonId)
}

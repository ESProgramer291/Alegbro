/**
 * Core game data structure
 * Define all games, mini-games, and content here
 */

export interface MiniGame {
  id: string;
  gameId: string;
  order: number;
  title: string;
  description: string;
  type: "concept" | "interactive" | "analogy" | "practice";
  content: string;
  xpReward: number;
  interaction?: {
    question: string;
    correctAnswer: string | string[];
    explanation: string;
  };
}

export interface Game {
  id: string;
  title: string;
  description: string;
  order: number;
  miniGames: MiniGame[];
  totalXP: number;
}

// Game 1: Variables - The Building Blocks
export const GAME_1_VARIABLES: Game = {
  id: "game-1",
  title: "Variables — The Building Blocks",
  description:
    "Learn how variables work through interactive analogies and practice problems",
  order: 1,
  totalXP: 500,
  miniGames: [
    {
      id: "1-1",
      gameId: "game-1",
      order: 1,
      title: "What is a Variable?",
      description: "Understand the concept of variables",
      type: "concept",
      xpReward: 50,
      content: `
        A variable is a named container that holds a value.
        
        Think of it like a labeled box:
        - The label is the variable name (like "age")
        - The box holds the value (like 25)
        
        Why use variables?
        • Makes code readable
        • Lets you reuse values
        • Lets you change values easily
      `,
    },
    {
      id: "1-2",
      gameId: "game-1",
      order: 2,
      title: "Analogy: Variables are Cups",
      description: "Understand variables through an analogy",
      type: "analogy",
      xpReward: 50,
      content: `
        Imagine you have a cup with a label on it.
        
        🥤 CUPS ANALOGY
        
        - The cup label = variable name
        - What's inside = the value
        - You can pour out what's inside and refill it
        
        The cup stays the same (same name)
        But what's inside can change!
        
        Just like in code:
        let score = 0;     // Empty cup
        score = 10;        // Filled with 10
        score = 15;        // Refilled with 15
      `,
    },
    {
      id: "1-3",
      gameId: "game-1",
      order: 3,
      title: "Naming Variables",
      description: "Learn how to name variables correctly",
      type: "interactive",
      xpReward: 75,
      content: "Which of these are valid variable names?",
      interaction: {
        question:
          "Pick the BEST variable name for storing a person's age:\nA) x\nB) age\nC) person_age\nD) theNumberThatRepresentsHowOldSomeoneIs",
        correctAnswer: ["B", "C"],
        explanation:
          "✓ 'age' or 'person_age' are clear and descriptive\n✗ 'x' is too vague\n✗ The last one is too long\n\nVariables should be clear enough that anyone can understand what they store!",
      },
    },
    {
      id: "1-4",
      gameId: "game-1",
      order: 4,
      title: "Assigning Values",
      description: "Learn how to assign values to variables",
      type: "interactive",
      xpReward: 75,
      content: "Understand variable assignment",
      interaction: {
        question:
          "What does this code do?\nlet temperature = 72;\n\nA) Creates a variable named 'temperature' with value 72\nB) Creates a number called 72\nC) Stores the word 'temperature' somewhere\nD) Does nothing",
        correctAnswer: "A",
        explanation:
          "✓ Correct! The = sign ASSIGNS the value 72 to the variable named 'temperature'\n\nThink of it as putting 72 into a box labeled 'temperature'",
      },
    },
    {
      id: "1-5",
      gameId: "game-1",
      order: 5,
      title: "Changing Values",
      description: "Learn how to update variable values",
      type: "interactive",
      xpReward: 75,
      content: "Variables can change!",
      interaction: {
        question:
          "What is the value of 'score' after this code?\nlet score = 10;\nscore = 20;\nscore = 30;\n\nA) 10\nB) 20\nC) 30\nD) 10 + 20 + 30",
        correctAnswer: "C",
        explanation:
          "✓ Correct! When you assign a new value, it REPLACES the old one\n\nEach time we use =, we're putting a new value in the box",
      },
    },
    {
      id: "1-6",
      gameId: "game-1",
      order: 6,
      title: "Variables with Decimals",
      description: "Working with decimal/float values",
      type: "interactive",
      xpReward: 75,
      content: "Numbers can have decimal points",
      interaction: {
        question:
          "What's the value of price after this?\nlet price = 5.99;\nprice = 3.50;\n\nA) 5.99\nB) 3.50\nC) 9.49\nD) Error",
        correctAnswer: "B",
        explanation:
          "✓ Correct! Variables can store decimal numbers just like whole numbers\n\nBoth integers and decimals work the same way!",
      },
    },
    {
      id: "1-7",
      gameId: "game-1",
      order: 7,
      title: "Analogy: Smoothie Mix",
      description: "Learn about different types with an analogy",
      type: "analogy",
      xpReward: 50,
      content: `
        Different variables can hold different types of things!
        
        🥤 SMOOTHIE MIX ANALOGY
        
        Numbers (integers):
        let strawberries = 5;      // Whole strawberries
        
        Decimals:
        let honeyAmount = 2.5;     // 2.5 tablespoons
        
        Text (strings - coming later):
        let flavor = "strawberry"; // The flavor name
        
        Each ingredient type is handled differently,
        just like different variable types!
      `,
    },
    {
      id: "1-8",
      gameId: "game-1",
      order: 8,
      title: "Practice: Build Your Variables",
      description: "Create variables for a scenario",
      type: "practice",
      xpReward: 100,
      content:
        "You're creating a game character. What variables would you need?",
      interaction: {
        question:
          "Which of these would be good variables for a game character? (Select all that apply)\nA) characterName\nB) characterLevel\nC) characterHealth\nD) myStuff",
        correctAnswer: ["A", "B", "C"],
        explanation:
          "✓ A, B, C are clear and specific\n✗ D is too vague\n\nGood variable names tell you exactly what data they store!",
      },
    },
  ],
};

// Future games placeholder
export const ALL_GAMES: Game[] = [
  GAME_1_VARIABLES,
  // TODO: Add more games here
  // Game 2: Data Types
  // Game 3: Arrays
  // Game 4: Functions
  // etc.
];

export const getGameById = (gameId: string): Game | undefined => {
  return ALL_GAMES.find((game) => game.id === gameId);
};

export const getMiniGameById = (miniGameId: string): MiniGame | undefined => {
  for (const game of ALL_GAMES) {
    const miniGame = game.miniGames.find((mg) => mg.id === miniGameId);
    if (miniGame) return miniGame;
  }
  return undefined;
};

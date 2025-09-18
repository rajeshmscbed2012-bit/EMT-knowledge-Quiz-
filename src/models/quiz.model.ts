export interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export type QuizState = 'configuring' | 'loading' | 'active' | 'review';

export type QuestionType = 'Knowledge' | 'Scenario';

export type Difficulty = 'Easy' | 'Hard';

export interface QuizOptions {
  topic: string;
  type: QuestionType;
  difficulty: Difficulty;
  numQuestions: number;
}
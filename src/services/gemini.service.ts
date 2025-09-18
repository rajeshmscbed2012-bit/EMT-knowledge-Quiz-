import { Injectable, inject } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';
import { Question, QuizOptions } from '../models/quiz.model';
import { EmtDataService } from './emt-data.service';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private readonly ai: GoogleGenAI;
  private emtDataService = inject(EmtDataService);

  constructor() {
    // Fix: Retrieve API key from environment variables as required.
    // IMPORTANT: The API key must be available as an environment variable `process.env.API_KEY`.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error('API_KEY environment variable is not configured.');
      throw new Error('API_KEY environment variable is not configured.');
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateQuestions(options: QuizOptions): Promise<Question[]> {
    const context = this.emtDataService.getContextForTopic(options.topic);
    if (!context) {
      throw new Error(`No context found for topic: ${options.topic}`);
    }

    const prompt = `
      Based on the following EMT knowledge context, generate ${options.numQuestions} unique multiple-choice questions.

      Context for topic "${options.topic}":
      ---
      ${context}
      ---

      Requirements for the questions:
      1. Difficulty: ${options.difficulty}.
      2. Type: ${options.type}. 'Knowledge' questions should test direct recall of facts from the text. 'Scenario' questions should present a brief clinical situation where the user must apply the knowledge.
      3. Each question must have exactly 4 possible answer options.
      4. One answer must be clearly correct based on the context.
      5. The other three answers must be plausible but incorrect distractors.
      6. Do not generate questions that cannot be answered from the provided context.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                description: `An array of ${options.numQuestions} quiz questions.`,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    questionText: {
                      type: Type.STRING,
                      description: 'The text of the quiz question.',
                    },
                    options: {
                      type: Type.ARRAY,
                      description: 'An array of 4 possible answers.',
                      items: {
                        type: Type.STRING,
                      },
                    },
                    correctAnswerIndex: {
                      type: Type.INTEGER,
                      description: 'The 0-based index of the correct answer in the options array.',
                    },
                  },
                  required: ['questionText', 'options', 'correctAnswerIndex'],
                },
              },
            },
            required: ['questions'],
          },
        },
      });

      const jsonString = response.text.trim();
      const result = JSON.parse(jsonString);
      
      if (!result.questions || result.questions.length === 0) {
        throw new Error('AI returned no questions.');
      }

      return result.questions as Question[];

    } catch (error) {
      console.error('Error generating questions with Gemini:', error);
      // Provide a more user-friendly error message
      if (error instanceof Error && error.message.includes('API key')) {
         throw new Error('There was an issue with the AI service API key. Please contact support.');
      }
      throw new Error('Failed to generate quiz questions. The AI service may be temporarily unavailable.');
    }
  }
}

import { Component, ChangeDetectionStrategy, signal, computed, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';
import { EmtDataService } from '../../services/emt-data.service';
import { Question, QuizState, QuestionType, Difficulty } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styles: [`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes progress-animation {
      from { stroke-dashoffset: 440; }
      to { stroke-dashoffset: var(--progress-value); }
    }
    
    .progress-ring__circle--animation {
      animation: progress-animation 1.5s ease-out forwards;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent {
  private geminiService = inject(GeminiService);
  private emtDataService = inject(EmtDataService);

  // Component State
  quizState: WritableSignal<QuizState> = signal('configuring');
  questions: WritableSignal<Question[]> = signal([]);
  userAnswers: WritableSignal<{ [key: number]: number }> = signal({});
  error: WritableSignal<string | null> = signal(null);
  timer: WritableSignal<number> = signal(0);
  private timerInterval: any;

  // Quiz Options
  topics = this.emtDataService.getTopics();
  questionTypes: QuestionType[] = ['Knowledge', 'Scenario'];
  difficulties: Difficulty[] = ['Easy', 'Hard'];
  numQuestionsOptions: number[] = [5, 10, 15];
  
  selectedTopic: WritableSignal<string> = signal(this.topics[0]);
  selectedType: WritableSignal<QuestionType> = signal('Knowledge');
  selectedDifficulty: WritableSignal<Difficulty> = signal('Easy');
  selectedNumQuestions: WritableSignal<number> = signal(this.numQuestionsOptions[0]);

  // Computed State
  selectedTopicDescription = computed(() => {
    return this.emtDataService.getDescriptionForTopic(this.selectedTopic());
  });
  
  formattedTime = computed(() => {
    const minutes = Math.floor(this.timer() / 60);
    const seconds = this.timer() % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  score = computed(() => {
    if (this.quizState() !== 'review') return 0;
    if (this.questions().length === 0) return 0;
    const correctAnswers = this.questions().reduce((count, question, index) => {
      return this.userAnswers()[index] === question.correctAnswerIndex ? count + 1 : count;
    }, 0);
    return Math.round((correctAnswers / this.questions().length) * 100);
  });

  allQuestionsAnswered = computed(() => {
    return Object.keys(this.userAnswers()).length === this.questions().length;
  });

  async startQuiz() {
    this.quizState.set('loading');
    this.error.set(null);
    this.questions.set([]);
    this.userAnswers.set({});
    this.stopTimer();

    try {
      const generatedQuestions = await this.geminiService.generateQuestions({
        topic: this.selectedTopic(),
        type: this.selectedType(),
        difficulty: this.selectedDifficulty(),
        numQuestions: this.selectedNumQuestions()
      });
      this.questions.set(generatedQuestions);
      this.quizState.set('active');
      this.startTimer();
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      this.error.set(errorMessage);
      this.quizState.set('configuring');
    }
  }

  startTimer() {
    const timePerQuestion = 60; // 60 seconds per question
    this.timer.set(this.questions().length * timePerQuestion);
    this.timerInterval = setInterval(() => {
      this.timer.update(t => {
        if (t <= 1) {
          this.stopTimer();
          this.submitQuiz();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  selectAnswer(questionIndex: number, answerIndex: number) {
    this.userAnswers.update(answers => ({
      ...answers,
      [questionIndex]: answerIndex
    }));
  }

  submitQuiz() {
    if (this.quizState() === 'active') {
      this.stopTimer();
      this.quizState.set('review');
    }
  }

  startNewQuiz() {
    this.stopTimer();
    this.quizState.set('configuring');
  }

  onTopicChange(event: Event) {
    this.selectedTopic.set((event.target as HTMLSelectElement).value);
  }

  onTypeChange(event: Event) {
    this.selectedType.set((event.target as HTMLSelectElement).value as QuestionType);
  }

  onDifficultyChange(event: Event) {
    this.selectedDifficulty.set((event.target as HTMLSelectElement).value as Difficulty);
  }

  onNumQuestionsChange(event: Event) {
    this.selectedNumQuestions.set(Number((event.target as HTMLSelectElement).value));
  }

  getAnswerClass(questionIndex: number, optionIndex: number): string {
    if (this.quizState() !== 'review') {
      return this.userAnswers()[questionIndex] === optionIndex ? 'ring-2 ring-blue-500 bg-blue-100' : 'bg-white hover:bg-gray-50';
    }

    const question = this.questions()[questionIndex];
    const userAnswer = this.userAnswers()[questionIndex];
    const isCorrect = question.correctAnswerIndex === optionIndex;
    const isSelected = userAnswer === optionIndex;

    if (isCorrect) {
      return 'bg-green-100 ring-2 ring-green-500 text-green-800';
    }
    if (isSelected && !isCorrect) {
      return 'bg-red-100 ring-2 ring-red-500 text-red-800';
    }
    return 'bg-white';
  }
}
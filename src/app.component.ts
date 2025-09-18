
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { QuizComponent } from './components/quiz/quiz.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuizComponent]
})
export class AppComponent {
  title = 'EMT Genius Quiz';
}

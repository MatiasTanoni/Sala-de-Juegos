import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PreguntadosService extends Game {
  private name: string = "preguntados";
  private questions: any[] = [];
  private currentQuestionIndex: number = 0;

  constructor(private http: HttpClient) {
    super();
  }

  async newGame() {

    this.questions = [];
    this.currentQuestionIndex = 0;
    await this.loadQuestions();
    this.setLives(5);
    this.setScore(0);
    this.setTotalSeconds(180);
    this.setFinished(false);
    this.setVictory(false);
    this.setPause(false);
    this.startTimer(() => {
      this.endGame(this.victory, this.name);
    });
  }
  async loadQuestions(): Promise<void> {
    try {
      this.setLoading(true);

      const data = await firstValueFrom(
        this.http.get<any[]>('https://the-trivia-api.com/v2/questions')
      );

      this.questions = data.map((item: any) => {
        // Elegir una incorrecta aleatoria
        const randomIncorrect = item.incorrectAnswers[
          Math.floor(Math.random() * item.incorrectAnswers.length)
        ];

        return {
          question: item.question.text,
          options: this.shuffleArray([randomIncorrect, item.correctAnswer]), // solo dos opciones
          correctAnswer: item.correctAnswer
        };
      });

      this.setLoading(false);
    } catch (error) {
      console.error('Error cargando preguntas desde la API:', error);
      this.setLoading(false);
    }
  }


  checkAnswer(option: string): void {
    const current = this.getCurrentQuestion();
    if (!current) return;

    if (option === current.correctAnswer) {
      this.setScore(this.getScore() + 1000);
      this.setRoundVictory(true);
      setTimeout(() => this.nextQuestion(), 1500);
    } else {
      this.loseLife();
      if (this.getLives() <= 0) {
        this.endGame(false, this.name);
      } else {
        this.nextQuestion();
      }
    }
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  isRoundWon(): boolean {
    return this.getRoundVictory();
  }

  getCurrentQuestion(): any | null {
    return this.questions[this.currentQuestionIndex] || null;
  }

  getCurrentOptions(): string[] {
    const question = this.getCurrentQuestion();
    return question ? question.options : [];
  }

  nextQuestion(): void {
    this.setRoundVictory(false);
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.setVictory(true);
      this.endGame(true, this.name);
    }
  }
}

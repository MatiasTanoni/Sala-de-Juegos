import { Databases } from "../../services/databases/databases";
import { Auth } from "../../services/auth/auth";
import { signal } from "@angular/core";

export class Game {
  protected supabase: Databases = new Databases();
  protected authService: Auth = new Auth(this.supabase);

  time = signal('02:00');
  protected totalSeconds: number = 120;
  finished = signal(false);
  protected victory: boolean = false;
  protected timerInterval: any;
  protected isPause: boolean = false;
  protected score: number = 0;
  protected lives: number = 3;
  protected roundVictory: boolean = false;
  protected user: any | boolean = this.authService.getUser();
  protected userId = typeof this.user === 'object' && this.user !== null ? this.user.id : null;
  protected loading: boolean = false;

  startTimer(callback?: () => void) {
    this.totalSeconds = 120;
    this.finished.set(false);
    this.victory = false;
    this.updateTimeString();

    this.timerInterval = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        this.updateTimeString();
      } else {
        this.stopTimer();
        if (callback) callback();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resumeTimer(callback?: () => void) {
    if (this.timerInterval || this.totalSeconds <= 0) return;

    this.timerInterval = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        this.updateTimeString();
      } else {
        this.stopTimer();
        if (callback) callback();
      }
    }, 1000);
  }

  // --- Getters ---
  getScore(): number { return this.score; }
  getPause(): boolean { return this.isPause; }
  getTime(): string { return this.time(); }
  getFinished(): boolean { return this.finished(); }
  getLives(): number { return this.lives; }
  getRoundVictory(): boolean { return this.roundVictory; }
  getVictory(): boolean { return this.victory; }
  getLoading(): boolean { return this.loading; } // preguntados

  // --- Setters ---
  setPause(isPause: boolean) { this.isPause = isPause; }
  setScore(score: number) { this.score = score; }
  setLives(lives: number) { this.lives = lives; }
  setRoundVictory(roundVictory: boolean) { this.roundVictory = roundVictory; }
  setVictory(victory: boolean) { this.victory = victory; }
  setTotalSeconds(totalSeconds: number) { this.totalSeconds = totalSeconds; }
  setFinished(finished: boolean) { this.finished.set(finished); }
  setLoading(loading: boolean) { this.loading = loading; } // preguntados

  protected updateTimeString() {
    const minutes = Math.floor(this.totalSeconds / 60);
    const seconds = this.totalSeconds % 60;
    this.time.set(`${this.padZero(minutes)}:${this.padZero(seconds)}`);
  }

  loseLife() {
    this.lives = Math.max(0, this.lives - 1);
  }

  protected padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  pause() {
    this.setPause(true);
    this.stopTimer();
  }

  resume() {
    this.setPause(false);
    this.resumeTimer();
  }

  resumeNewGame() {
    this.setPause(false);
  }

  private async saveResult(data: { id_user: string | null; id_game: string; firstname: string | null; lastname: string | null; score: number; victory: boolean }) {
    if (!this.supabase) throw new Error('Supabase client not initialized');

    const { error } = await this.supabase.client.from('results').insert({
      id_user: data.id_user,
      id_game: data.id_game,
      firstname: data.firstname,
      lastname: data.lastname,
      score: data.score,
      victory: data.victory
    });

    if (error) throw error;
  }

  calculateFinalScore(): void {
    if (!this.victory) return;
    const bonusFromTime = this.totalSeconds * 100;
    this.score += bonusFromTime;
  }

  async endGame(won: boolean, gameName: string): Promise<void> {
    this.stopTimer();
    this.finished.set(true);
    this.victory = won;

    if (this.victory) {
      this.calculateFinalScore();
    }

    try {
      const idGame = await this.supabase.getGameIdByName(gameName);
      const user = await this.supabase.getUserById(this.userId);
      console.log("user: " + this.userId);

      if (!user) {
        console.error('No se encontró el usuario con ese id');
        return;
      }

      if (idGame === null) {
        console.error('No se encontró el juego con ese nombre');
        return;
      }

      const { name, apellido } = user;
      console.log("Nombre: " + name + ", apellido: " + apellido);
      await this.saveResult({
        id_user: this.userId,
        id_game: idGame,
        firstname: localStorage.getItem('name'),
        lastname: localStorage.getItem('apellido'),
        score: this.score,
        victory: this.victory
      });
    } catch (error) {
      console.error('Error al guardar resultado:', error);
    }
  }
}
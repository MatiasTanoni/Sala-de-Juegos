
export class Game {
  protected time: string = '03:00';
  protected totalSeconds: number = 180;
  protected finished: boolean = false;
  protected victory: boolean = false;
  protected timerInterval: any;
  protected isPause: boolean = false;
  protected score: number = 0;
  protected lives: number = 3;
  protected roundVictory: boolean = false;

  startTimer(callback?: () => void) {
    this.totalSeconds = 180;
    this.finished = false;
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
  //get
  getScore(): number { return this.score; }
  getPause(): boolean { return this.isPause; }
  getTime(): string { return this.time; }
  getFinished(): boolean { return this.finished; }
  getLives(): number { return this.lives; }
  getRoundVictory(): boolean { return this.roundVictory; }
  getVictory(): boolean { return this.victory; }
  //set
  setPause(isPause: boolean) { this.isPause = isPause; }
  setScore(score: number) { this.score = score; }
  setLives(lives: number) { this.lives = lives; }
  setRoundVictory(roundVictory: boolean) { this.roundVictory = roundVictory; }
  setVictory(victory: boolean) { this.victory = victory; }
  setFinished(finished: boolean) { this.finished = finished; }

  loseLife() {
    this.lives = Math.max(0, this.lives - 1);
  }

  protected updateTimeString() {
    const minutes = Math.floor(this.totalSeconds / 60);
    const seconds = this.totalSeconds % 60;
    this.time = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
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

  async endGame(won: boolean, gameName: string): Promise<void> {
    this.stopTimer();
    this.finished = true;
    this.victory = won;

    if (this.victory) {
      //CALCULAR EL SCORE FINAL
    }

    try {
      // GUARDAR EL NOMNRE Y ID DEL USUARI
    }
    catch (error) {
      console.error('Error al guardar resultado:',);
    }
  }


}


export class Game {
  protected time: string = '03:00';
  protected totalSeconds: number = 180;
  protected finished: boolean = false;
  protected victory: boolean = false;
  protected timerInterval: any;

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

  protected updateTimeString() {
    const minutes = Math.floor(this.totalSeconds / 60);
    const seconds = this.totalSeconds % 60;
    this.time = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  protected padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
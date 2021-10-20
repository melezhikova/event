export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.catches = 0;
    this.misses = 0;
    this.noClick = 0;
    this.charIndex = -1;
    this.id = null;
  }

  init() {
    this.gamePlay.draw();
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    this.updateScores();

    this.id = setInterval(() => {
      this.misses += this.noClick;
      this.updateScores();
      const lose = this.checkLose();
      if (lose === false) {
        this.findChar();
        let number = Math.floor(Math.random() * this.gamePlay.cells.length);
        if (number === this.charIndex && this.charIndex >= 2) {
          number = this.charIndex / 2;
        } else if (number === this.charIndex && this.charIndex < 2) {
          number = this.charIndex + 2;
        }
        this.figaro(number);
      }
    },
    1000);
  }

  onCellClick(index) {
    this.noClick = 0;
    if (index === this.charIndex) {
      this.catches += 1;
    } else {
      this.misses += 1;
    }
    this.checkLose();
    this.updateScores();
  }

  updateScores() {
    const catches = document.querySelector('.catches');
    const misses = document.querySelector('.misses');
    catches.innerText = `Поймал: ${this.catches} раз`;
    misses.innerText = `Промазал: ${this.misses} раз`;
  }

  checkLose() {
    if (this.misses === 5) {
      clearInterval(this.id);
      alert('Вы проиграли :(');
      this.gamePlay.cellClickListeners = [];
      return true;
    }
    return false;
  }

  onNewGameClick() {
    clearInterval(this.id);
    this.gamePlay.cellClickListeners = [];
    this.catches = 0;
    this.misses = 0;
    this.noClick = 0;
    this.init();
  }

  findChar() {
    this.charIndex = this.gamePlay.cells.findIndex((item) => item.className.includes('character'));
  }

  figaro(number) {
    if (this.charIndex !== -1) {
      this.gamePlay.cells[this.charIndex].classList.remove('character');
    }
    const figaroCell = this.gamePlay.cells[number];
    figaroCell.classList.add('character');
    this.charIndex = number;
    this.noClick = 1;
  }
}

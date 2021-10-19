export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.newGameListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  draw() {
    this.checkBinding();
    this.container.innerHTML = `
            <div class="controls">
                <button data-id="action-restart" class="btn">Заново</button>
            </div>
            <div class="scoresbox">
                <div class="catches"></div>
                <div class="misses"></div>
            </div>
            <div class="board-container">
            </div>
        `;
    this.newGameEl = this.container.querySelector('[data-id=action-restart]');
    this.newGameEl.addEventListener('click', (event) => this.onNewGameClick(event));
    this.boardEl = this.container.querySelector('.board-container');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }

  addNewGameListener(callback) {
    this.newGameListeners.push(callback);
  }

  onNewGameClick(event) {
    event.preventDefault();
    this.newGameListeners.forEach((o) => o.call(null));
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}

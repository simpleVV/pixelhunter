import HeaderView from '../header/header.js';
import GameView from './game-view.js';
import StatsBarView from '../stats/stats-bar.js';
import Router from '../../router.js';
import {GAME_SETTING} from '../../data/data.js';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.content = new GameView(this.model.getCurrentLevel());
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.content.element.appendChild(new StatsBarView(this.model.state).element);
    this._timer = null;
  }

  startGame() {
    this.content.onAnswer = (evt) => {
      this.answer(this.model.getCurrentLevel(), evt);
      this.changeLevel();
    };
    this._tick();
  }

  _tick() {
    this.model.tick();
    this.updateHeader();
    this._timer = setTimeout(() => {
      this._tick();
      this._abortLevel();
    }, GAME_SETTING.second);
  }

  _abortLevel() {
    if (this.model.state.time === GAME_SETTING.endTime) {
      this.model.updateScore(false);
      this.model.looseLife();
      this.stopGame();
      this.continueGame();
    }
  }

  stopGame() {
    clearInterval(this._timer);
    this.model.resetTimer();
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    header.onBackButtonClick = () => Router.showGreeting();
    this.header = header;
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  changeLevel() {
    this.updateHeader();
    this.model.nextLevel();
    this._tick();

    const content = new GameView(this.model.getCurrentLevel());
    this.changeContentView(content);
    this.content.element.appendChild(new StatsBarView(this.model.state).element);
    this.content.onAnswer = (evt) => {
      this.answer(this.model.getCurrentLevel(), evt);
      this.continueGame();
    };
  }

  continueGame() {
    return (this.model.hasNextLevel() || this.model.isGameOver()) ? this.endGame() :
      this.changeLevel();
  }

  answer(level, evt) {

    let answerType = null;

    switch (level.type) {
      case `game-1`:
        const [firstInput, secondInput] = this.content.element.querySelectorAll(`input:checked`);
        const [firstAnswer, secondAnswer] = this.model.getCurrentLevel().answers;

        answerType = firstInput.value === firstAnswer.type &&
        secondInput.value === secondAnswer.type;
        break;
      case `game-2`:
        answerType = evt.target.value === level.answer.type;
        break;
      case `game-3`:
        const gameOptions = this.content.element.querySelector(`.game__content`);
        const answerIndex = [...gameOptions.children].indexOf(evt.target.closest(`.game__option`));

        answerType = level.answers[answerIndex].type === `paint`;
        break;
    }

    if (!answerType) {
      this.model.looseLife();
    }
    this.model.updateScore(answerType);
    this.stopGame();
  }

  endGame() {
    Router.showStats(this.model);
  }
}
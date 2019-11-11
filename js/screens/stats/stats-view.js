import AbstractView from '../../abstract-view.js';
import {GAME_SETTING} from '../../data/data.js';

export default class StatsView extends AbstractView {
  constructor(data, result) {
    super();
    this.data = data;
    this.result = result;
  }

  get template() {
    const speedBonusTemplate = (data, filterSetting) => `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${data.filter(filterSetting).length}<span
      class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${data.filter(filterSetting).length *
        GAME_SETTING.bonusPoint}</td>
    </tr>`;

    const liveBonusTemplate = (data) => `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${data.lives} <span class="stats__result
        stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${data.lives * GAME_SETTING.bonusPoint}</td>
      </tr>`;

    const slowFineTemplate = (data, filterSetting) => `<tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${data.filter(filterSetting).length}<span
      class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${data.filter(filterSetting).length *
        -GAME_SETTING.bonusPoint}</td>
    </tr>`;

    const resultTemplate = (data) => {
      const speedBonusFilter = (value) => value.time > GAME_SETTING.maxTime && value.result;
      const slowFineFilter = (value) => value.time < GAME_SETTING.minTime && value.result;
      const correctAnswerFilter = (value) => value.result === true;

      return `<td class="result__points">× 100</td>
      <td class="result__total">${data.answers.filter(correctAnswerFilter).length *
        GAME_SETTING.pointPerAnswer}</td>
      </tr>
        ${data.answers.some(speedBonusFilter) ? speedBonusTemplate(data.answers, speedBonusFilter) : ``}
        ${liveBonusTemplate(data)}
        ${data.answers.some(slowFineFilter) ? slowFineTemplate(data.answers, slowFineFilter) : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this.result}</td>
      </tr>`;
    };

    const statsBarTemplate = (data) => `<li class="stats__result stats__result--${data.type}"></li>`;

    return `<section class="result">
      <h2 class="result__title">Победа!</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            <ul class="stats">
            ${[...this.data.answers.map(statsBarTemplate), ...new Array(GAME_SETTING.maxLevel -
              this.data.answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`)].join(``)}
            </ul>
          </td>
          ${(this.result === GAME_SETTING.fail) ? `<td class="result__total"></td>
          <td colspan="5" class="result__total  result__total--final">fail</td>` : resultTemplate(this.data)}
      </table>
    </section>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = StatsView.render(this.template);
    return this._element;
  }
}
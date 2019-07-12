import {getElementFromTemplate, changeScreen} from '../js/util.js';
import greetingScreen from '../js/greeting.js';

const headerTemplate = (state) => `<header class="header">
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
  ${state ? stateTemplate(state) : ``}
</header>`;

const stateTemplate = (state) => `
<div class="game__timer">${(state) ? state.time : ``}</div>
<div class="game__lives">
  ${(state) ? (new Array(3 - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)) : ``}
  ${(state) ? new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``) : ``}
</div>`;

const header = (state) => {
  const hederContent = getElementFromTemplate(headerTemplate(state));

  // Switch the rules screen to the greeting screen by pressing the arrow-button
  const backButton = hederContent.querySelector(`.back`);

  backButton.addEventListener(`click`, () => {
    changeScreen(greetingScreen);
  });
  return hederContent;
};


export default header;

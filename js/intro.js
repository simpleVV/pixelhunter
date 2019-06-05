import {getElementFromTemplate, changeScreen} from './js/util.js';

const introTemplete = `<section id="intro" class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  <button class="intro__top top" type="button">
    <img src="img/icon-top.svg" width="71" height="79" alt="Топ игроков">
  </button>
</section>`;

const introScreen = getElementFromTemplate(introTemplete);

export default introScreen;

import Prism from 'prismjs';
import { tween } from './utils';

const content = require('./content/*.md');
const guide = require('./guide/*.md');

const contentDivs = document.querySelectorAll('[data-content]');
contentDivs.forEach(el => {
  el.innerHTML = content[el.dataset.content];
});

const guideToggleDiv = document.querySelector('[data-guide-toggles]');
const guideItemDiv = document.querySelector('[data-guide-items]');
let first = true;

for (let k in guide) {
  const v = guide[k];

  const btn = document.createElement('button');
  btn.dataset.guideToggle = k;
  btn.type = 'button';
  btn.className = 'btn border-x1';

  if (first) {
    btn.classList.add('active');
    first = false;
  } else {
    btn.classList.add('ml-2');
  }

  btn.innerHTML = 'Temporary';
  guideToggleDiv.append(btn);

  const div = document.createElement('div');
  div.dataset.guideItem = k;
  div.innerHTML = v;
  guideItemDiv.append(div);
}

let currentGuide = document.querySelector('[data-guide-toggle].active').dataset
  .guideToggle;

const guideToggles = document.querySelectorAll('[data-guide-toggle]');
const guideItems = document.querySelectorAll('[data-guide-item]');

guideItems.forEach(div => {
  if (div.dataset.guideItem !== currentGuide) div.style.display = 'none';
});

guideToggles.forEach(btn => {
  btn.onclick = () => {
    const currentGuideItem = document.querySelector(
      `[data-guide-item="${currentGuide}"]`
    );

    currentGuideItem.style.display = 'none';

    const currentGuideButton = document.querySelector(
      `[data-guide-toggle="${currentGuide}"]`
    );

    currentGuideButton.classList.remove('active');

    const newGuideItem = document.querySelector(
      `[data-guide-item="${btn.dataset.guideToggle}"]`
    );

    newGuideItem.style.display = 'block';

    currentGuide = btn.dataset.guideToggle;

    btn.classList.add('active');
  };
});

const gotoBtns = document.querySelectorAll('[data-goto]');
gotoBtns.forEach(btn => {
  btn.onclick = () => {
    const targetDiv = document.getElementById(btn.dataset.goto);
    const targetY = targetDiv.offsetTop;

    tween(window.scrollY, targetY, 300, v => {
      window.scrollTo(0, v);
    });
  };
});

Prism.highlightAll();

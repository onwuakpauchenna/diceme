'use strict';

// selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnmove = document.querySelector('.btn--move');

const HTP = document.querySelector('.howToPlay');
const btnPlay = document.querySelector('.button-HTP');
const btnBack = document.querySelector('.button-back');
const Overlay = document.querySelector('.overlay');
const audioplay = document.querySelector('.audioplay');

let scores, currentScore, activePlayer, playing;
HTP.classList.add('hidden');
audioplay.play();

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = `$${0}`;
  score1.textContent = `$${0}`;
  current0.textContent = `$${0}`;
  current1.textContent = `$${0}`;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  btnNew.style.top = '27%';
  btnRoll.style.top = '37%';
  btnHold.style.top = '47%';
  audioplay.play();
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = `$${0}`;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// rolling dice functionality
const Rolldice = function () {
  // 1, Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  // 2. display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  btnNew.style.top = '16%';
  btnRoll.style.top = '50%';
  btnHold.style.top = '60%';
  // 3. check for rolled
  if (dice !== 1) {
    // add cide to curreCt score
    currentScore += dice;
    //current1El.textContent = currentscore; // CHANGE LATER
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = `$${currentScore}`;
  } else {
    // switch to next player
    switchPlayer();
  }
};

const Hold = function () {
  // 1. add current score to active player'score
  scores[activePlayer] += currentScore;
  // score[1] = score[1] + currentscore
  document.getElementById(
    `score--${activePlayer}`
  ).textContent = `$${scores[activePlayer]}`;

  // 2. check if player,s score is >= 100
  if (scores[activePlayer] >= 100) {
    // finish the game
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document.querySelector(`#name--${activePlayer}`).textContent = 'winner🎉';
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
    btnNew.style.top = '27%';
    btnRoll.style.top = '37%';
    btnHold.style.top = '47%';
  }
  // switch to the next player
  switchPlayer();
};

const Play = function () {
  HTP.classList.remove('hidden');
  Overlay.classList.remove('hidden');
  document.querySelector('.player--0').classList.add('hidden');
  document.querySelector('.player--1').classList.add('hidden');
  document.querySelector('.dice').classList.add('hidden');
  document.querySelector('.btn').classList.add('hidden');

  // document.querySelector('.player').classList.add('hidden');
};

const back = function () {
  HTP.classList.add('hidden');
  Overlay.classList.add('hidden');
  document.querySelector('.player--0').classList.remove('hidden');
  document.querySelector('.player--1').classList.remove('hidden');
  document.querySelector('.dice').classList.remove('hidden');
  document.querySelector('.btn').classList.remove('hidden');
  init();
};

//audio functions
const playAudio = function () {
  audioplay.play();
};
const pauseAudio = function () {
  audioplay.pause();
};
// audio icon and switch
document.querySelector('.non-audio').addEventListener('click', function () {
  pauseAudio();
});
document.querySelector('.audio').addEventListener('click', function () {
  playAudio();
});

// DICE ROLL
btnRoll.addEventListener('click', function () {
  if (playing) {
    Rolldice();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    Hold();
  }
});

btnNew.addEventListener('click', function () {
  init();
  document.querySelector(`#name--0`).textContent = `player 1`;

  document.querySelector(`#name--1`).textContent = `player 2`;
});

// HOW TO PLAY
btnPlay.addEventListener('click', function () {
  Play();
});
// back
btnBack.addEventListener('click', function () {
  back();
});

// Keyboard event
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.key === 'i') {
    back();
  }
  if (e.key === 'r' || e.key === 'd') {
    Rolldice();
  }
  if (e.key === 'h' || e.key === 'b') {
    Hold();
  }
  if (e.key === 'z' || e.key === 'n') {
    init();
  }
  if (e.key === 's') {
    playAudio();
  }
  if (e.key === 'p') {
    pauseAudio();
  }
});

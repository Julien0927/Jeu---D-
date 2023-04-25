  
// Selection des éléments
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
  
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
  
let scores, currentScore, activePlayer, playing;

// Fonction de lancement du dé
btnRoll.addEventListener('click', function () {
    if (playing) {
      
      // 1. Générer un nombre au hasard
      const dice = Math.trunc(Math.random() * 6) + 1;
    
      // 2. Display du dé
      diceEl.classList.remove('hidden');
      diceEl.src = `./images/dice-${dice}.png`;
    
      // 3. Vérification du nombre du dé
      if (dice !== 1) {
        
        // Ajout du nombre au current score
        currentScore += dice;
        document.getElementById(
          `current--${activePlayer}`
        ).textContent = currentScore;
      } else {
        
        // Joueur suivant
        switchPlayer();
      }
    }
  });
  const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  };

  btnHold.addEventListener('click', function () {
    if (playing) {
      
      // 1. Ajout du score courant au joueur actif
      scores[activePlayer] += currentScore;
    
      document.getElementById(`score--${activePlayer}`)
        .textContent = scores[activePlayer];
    
      // 2. Vérification si le score du joueur >= 100
      if (scores[activePlayer] >= 100) {
        
        // Fin du jeu
        playing = false;
        diceEl.classList.add('hidden');
    
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      } else {
        
        // Au tour de l'autre joueur
        switchPlayer();
      }
    }
  });

  // Début des conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  };
  init();
  btnNew.addEventListener('click', init)
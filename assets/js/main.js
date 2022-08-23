import counter from "./counter.mjs"

counter();

const cardContainer = document.querySelector('.card-container')
const pointsGame = document.querySelector('.points')
const btnReset = document.querySelector('.btn-reset')
btnReset.classList.add('off-button')

const card = [
  'mars',
  'saturn',
  'world',
  'moon',
  'saturn',
  'venus'
]

let cardOne = '';
let twoCard = '';
let points = 0;

function verifyCards() {

  const onePlanet = cardOne.getAttribute('data-planets');
  const twoPlanet = twoCard.getAttribute('data-planets');

  if (onePlanet === twoPlanet) {
    metchSound();
    points++;
    pointsGame.innerHTML = ' Pontos ' + ' ' + points;
    cardOne.classList.add('point');
    twoCard.classList.add('point');
    cardOne = '';
    twoCard = '';
  } else {

    setTimeout(() => {
      cardOne.classList.remove('reveled-card');
      cardOne = ''

      if (twoCard) {
        twoCard.classList.remove('reveled-card');
        twoCard = ''
      }
    }, 800)
  }

  pointsG();
}


function pointsG() {

  if (points >= 12) {
    pointsGame.classList.add('winner')
    btnReset.classList.remove('off-button')
    btnReset.classList.add('style-button')
  }
}

function reveledCard({ target }) {

  if (target.parentNode.className.includes('reveled-card')) {
    return;
  }

  if (cardOne === '') {
    target.parentNode.classList.add('reveled-card');
    cardOne = target.parentNode;
  } else if (twoCard === '') {
    target.parentNode.classList.add('reveled-card');
    twoCard = target.parentNode;
  }

  if (twoCard === '') {
    return;
  }

  verifyCards();

}

function createCard(planet) {


  const divCard = createElementsCard('div', 'card');
  const divFrontCard = createElementsCard('div', 'front face');
  const divBackCard = createElementsCard('div', 'back face');

  divFrontCard.style.backgroundImage = `url('assets/img/${planet}.png')`
  divCard.addEventListener('click', reveledCard)

  divCard.appendChild(divFrontCard)
  divCard.appendChild(divBackCard)

  divCard.setAttribute('data-planets', planet)

  return divCard;
}

function createElementsCard(tag, classN) {
  const element = document.createElement(tag);
  element.className = classN;
  return element;
}

function gameLoad() {

  const newCardsGame = [...card, ...card, ...card, ...card]

  const sortCardsGames = newCardsGame.sort(() => Math.random() - 0.5)

  sortCardsGames.forEach(c => {

    const cardsGames = createCard(c);
    cardContainer.appendChild(cardsGames)

  })
}

function reloadGame() {
  btnReset.addEventListener('click', function () {

    setTimeout(() => {
      location.reload()
    }, 2000)
    
  })
}

function metchSound() {
  let context = new AudioContext(),
  oscillator = context.createOscillator(),
  contextGain = context.createGain();

  oscillator.connect(contextGain);
  contextGain.connect(context.destination);
  oscillator.start(0);
    const C4 = 261.6,
    D4 = 293.7,
    E4 = 329.6,
    F4 = 349.2,
    G4 = 392.0,
    A4 = 440.0,
    B4 = 493.9;

  oscillator.frequency.value = C4;
  contextGain.gain.exponentialRampToValueAtTime(
    0.00001, context.currentTime + 6.04
  )
}

gameLoad();
reloadGame()

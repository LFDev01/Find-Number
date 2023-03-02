let minNum = 1;
let maxNum = 100;
const randNum = Math.ceil(Math.random() * 100);
const Errors = [];

function checkNumberInput() {

  if (numEvent.value.length > 1 && (isNaN(numEvent.value.charAt(0) || numEvent.value.charAt(0) == ''))) {
    numEvent.value = numEvent.value.charAt(1);
  }

  if (numEvent.value.length > 3) {
    let removeLastDigit = numEvent.value.split('');
    removeLastDigit[removeLastDigit.length - 1] = '';
    removeLastDigit = removeLastDigit.join('');
    numEvent.value = removeLastDigit;
  }

  if (Number(numEvent.value) > 100) {
    numEvent.value = '100';
  }
}

function disableInputs() {
  const numberInput = document.querySelector('#num');
  const clickInput = document.querySelector('#play');
  numberInput.disabled = true;
  clickInput.disabled = true;
}

function reloadGame(outputType) {
  const reloadBtn = document.createElement('input');
  const mainDiv = document.querySelector('.main');
  const updateTip = document.querySelector('#tip');
  disableInputs();
  reloadBtn.type = 'button';
  reloadBtn.value = 'Reiniciar';
  reloadBtn.className = 'reload-button';
  updateTip.style.fontWeight = 'bolder';

  if (outputType == 1) {
    updateTip.innerHTML = `Número sorteado: ${randNum}<br>Você venceu o jogo!`;
    updateTip.style.color = 'seagreen';
    reloadBtn.style.backgroundColor = 'seagreen';
  } else {
    updateTip.innerHTML = `Número sorteado: ${randNum}<br>Suas chances acabaram.`;
    updateTip.style.color = 'red';
    reloadBtn.style.backgroundColor = 'red';
  }

  mainDiv.appendChild(reloadBtn);
  reloadBtn.addEventListener('click', () => {
    location.reload();
  })
}

function updateHTML(guessNum) {
  Errors.push(guessNum);
  const updateTip = document.querySelector('#tip');
  const updateUsedNumbers = document.querySelector('#errors');
  const updateChances = document.querySelector('#chance');
  let chanceNum = document.querySelector('#chance').textContent.split(' ');
  chanceNum = parseInt(chanceNum[chanceNum.length - 1]) - 1;

  updateTip.textContent = `É um número entre ${minNum} e ${maxNum}`;
  updateChances.textContent = `Chances: ${chanceNum.toString()}`;
  updateUsedNumbers.textContent = `Erros: [${Errors.join(' ')}]`;

  updateTip.style.animationName = 'text-output-animation';
  updateUsedNumbers.style.animationName = 'text-output-animation';
  updateChances.style.animationName = 'text-output-animation';
  setTimeout(() => {
    updateTip.style.animationName = '';
    updateUsedNumbers.style.animationName = '';
    updateChances.style.animationName = '';
  }, 1100);

}

function guessNumber() {
  const getNumber = parseInt(document.querySelector('#num').value);
  document.querySelector('#num').value = '';

  if (getNumber == 0 || Number.isNaN(getNumber)) {
    window.alert('Você deve digitar um número.');
    return;
  }

  if (Errors.indexOf(getNumber) != -1) {
    window.alert('Você já usou este número. Tente novamente.');
    return;
  }

  if (getNumber > maxNum || getNumber < minNum) {
    window.alert(`Você deve digitar um número entre ${minNum} e ${maxNum}`);
    return;
  }

  if (getNumber > randNum || getNumber < randNum) {
    maxNum = getNumber > randNum ? getNumber - 1 : maxNum;
    minNum = getNumber < randNum ? getNumber + 1 : minNum;
    updateHTML(getNumber);
  } else {
    reloadGame(1);
  }
}

function checkChances() {
  let validateChances = document.querySelector('#chance').textContent.split(' ');
  validateChances = parseInt(validateChances[validateChances.length - 1]);
  if (validateChances < 1) {
    reloadGame(0);
  } else {
    guessNumber();
  }
}

const buttonEvent = document.querySelector('#play');
buttonEvent.addEventListener('click', checkChances);

const numEvent = document.querySelector('#num');
numEvent.addEventListener('input', checkNumberInput);

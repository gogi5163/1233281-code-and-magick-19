'use strict';
// 1. Создаем массив с объектами, которые описывают магов.
// 1.1 Задаем константы для генерации случайных магов
var COUNT_OF_WIZARDS = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
// 1.2 Функция для выбора случайного элемента из массива
var chooseRandomProperty = function (array) {
  return array[Math.floor(Math.random() * (array.length))];
};
// 1.3 Функция для создания случайного мага
var createRandomWizard = function (names, lastNames, coatColors, eyesColors) {
  var name = chooseRandomProperty(names) + ' ' + chooseRandomProperty(lastNames);
  var coatColor = chooseRandomProperty(coatColors);
  var eyesColor = chooseRandomProperty(eyesColors);
  return {name: name, coatColor: coatColor, eyesColor: eyesColor};
};
// 1.4 Создаем массив из четырех случайных магов
var randomWizards = [];
for (var i = 0; i < COUNT_OF_WIZARDS; i++) {
  randomWizards[i] = createRandomWizard(NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS);
}

// 2.1 Находим блок, который мы будем наполнять случайными сгенерированными магами
var similarListElement = document.querySelector('.setup-similar-list');
// 2.2 Находим шаблон мага
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
// 2.3 Функция для создания DOM элемента, который соответсвует случайно сгенерированному волшебнику с данными из массива
var renderWizard = function (wizard) {
// 2.4 Клонируем шаблон с содержимым
  var wizardElement = similarWizardTemplate.cloneNode(true);
  // 2.5 Заполняем клонированный шаблон данными
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  return wizardElement;
};

// 3.1 Создаем пустой объект документа, который мы будем наполнять, перед добавлением в DOM
var fragment = document.createDocumentFragment();
for (i = 0; i < randomWizards.length; i++) {
  fragment.appendChild(renderWizard(randomWizards[i]));
}
// 3.2 Добавляем наполненный фрагмент в DOM
similarListElement.appendChild(fragment);

// 4 Покажем блок .setup-similar, удалив у него CSS-класс hidden
document.querySelector('.setup-similar').classList.remove('hidden');

// 5 Открытие/закрытие окна настройки персонажа:
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var setupPopup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var playerName = document.querySelector('.setup-user-name');
// Обработчики
var onEscKeyPress = function (evt) {
  if (evt.key === ESC_KEY) {
    // Если активный элемент инпут, то при нажатии ESC отменим фокус, в противном случае закроем окно.
    if (document.activeElement !== playerName) {
      closePopup();
    } else {
      inputBlur();
    }
  }
};
var onSetupOpenPressEnter = function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
};
var onSetupClosePressEnter = function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
};
var onInputPressEnter = function (evt) {
  if (evt.key === ENTER_KEY) {
    inputBlur();
  }
};
var onSaveButtonClick = function () {
  setupWizardForm.submit();
};
var onSaveButtonPressEnter = function (evt) {
  if (evt.key === ENTER_KEY) {
    setupWizardForm.submit();
  }
};
// Логика работы высплывающего окна
var inputBlur = function () {
  playerName.blur();
};
var openPopup = function () {
  setupPopup.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeyPress);
};
var closePopup = function () {
  setupPopup.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeyPress);
};
// Сценарии клика на аватарку и крестик
setupOpen.addEventListener('click', function () {
  openPopup();
});
setupClose.addEventListener('click', function () {
  closePopup();
});
// Сценарии при активной аватарке и крестике
setupOpen.addEventListener('keydown', onSetupOpenPressEnter);
setupClose.addEventListener('keydown', onSetupClosePressEnter);
var setupSubmitButton = document.querySelector('.setup-submit');
// Присвоим кнопке тип button, чтобы при активном импуте по нажатию на enter не происходило submit
setupSubmitButton.setAttribute('type', 'button');
var setupWizardForm = document.querySelector('.setup-wizard-form');
// Отправка формы по клику или нажатию enter при активной кнопке "Сохранить"
setupSubmitButton.addEventListener('click', onSaveButtonClick);
setupSubmitButton.addEventListener('keydown', onSaveButtonPressEnter);
// Сценарий нажатия Enter при активном инпуте
playerName.addEventListener('keydown', onInputPressEnter);

// 6 Изменение цвета мантии персонажа по нажатию
// Функция для получения следующего элемента массива после указанного.
var getNextProperty = function (array, value) {
  if (value === '') {
    value = array[0];
  }
  var currentIndex;
  var nextValue;
  // Поиск индекса текущего значения
  for (i = 0; i < array.length; i++) {
    if (array[i] === value) {
      currentIndex = i;
      break;
    }
  }
  // Поиск следующего значения в массиве
  nextValue = (currentIndex === array.length - 1) ? array[0] : array[currentIndex + 1];
  return nextValue;
};
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat ');
var wizardCoatData = document.querySelector('input[name=coat-color]');
var onCoatClick = function () {
  var nextColor = getNextProperty(COAT_COLORS, wizardCoatData.value);
  wizardCoat.setAttribute('style', 'fill: ' + nextColor);
  wizardCoatData.setAttribute('value', nextColor);
};
wizardCoat.addEventListener('click', onCoatClick);

// 7 Изменение цвета глаз персонажа по нажатию
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes ');
var wizardEyesData = document.querySelector('input[name=eyes-color]');
var onEyesClick = function () {
  var nextColor = getNextProperty(EYES_COLORS, wizardEyesData.value);
  wizardEyes.setAttribute('style', 'fill: ' + nextColor);
  wizardEyesData.setAttribute('value', nextColor);

};
wizardEyes.addEventListener('click', onEyesClick);

// 8 Изменение цвета фаербола по нажатию
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardFireballData = wizardFireball.querySelector('input');
var onFireballClick = function () {
  wizardFireballData.setAttribute('value', getNextProperty(FIREBALL_COLORS, wizardFireballData.value));
  wizardFireball.setAttribute('style', 'background-color:' + wizardFireballData.value);
};
wizardFireball.addEventListener('click', onFireballClick);


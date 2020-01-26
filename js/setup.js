'use strict';
// 1. Убираем класс hidden у окна setup
document.querySelector('.setup').classList.remove('hidden');
// 2. Создаем массив с объектами, которые описывают магов.
// 2.1 Задаем константы для генерации случайных магов
var COUNT_OF_WIZARDS = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
// 2.2 Функция для выбора случайного элемента из массива
var chooseRandomProperty = function (array) {
  return array[Math.floor(Math.random() * (array.length))];
};
// 2.3 Функция для создания случайного мага
var createRandomWizard = function (names, lastNames, coatColors, eyesColors) {
  var name = chooseRandomProperty(names) + ' ' + chooseRandomProperty(lastNames);
  var coatColor = chooseRandomProperty(coatColors);
  var eyesColor = chooseRandomProperty(eyesColors);
  return {name: name, coatColor: coatColor, eyesColor: eyesColor};
};
// 2.4 Создаем массив из четырех случайных магов
var randomWizards = [];
for (var i = 0; i < COUNT_OF_WIZARDS; i++) {
  randomWizards[i] = createRandomWizard(NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS);
}
// 3.1 Находим блок, который мы будем наполнять случайными сгенерированными магами
var similarListElement = document.querySelector('.setup-similar-list');
// 3.2 Находим шаблон мага
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
// 3.3 Функция для создания DOM элемента, который соответсвует случайно сгенерированному волшебнику с данными из массива
var renderWizard = function (wizard) {
// 3.4 Клонируем шаблон с содержимым
  var wizardElement = similarWizardTemplate.cloneNode(true);
  // 3.5 Заполняем клонированный шаблон данными
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  return wizardElement;
};
// 4.1 Создаем пустой объект документа, который мы будем наполнять, перед добавлением в DOM
var fragment = document.createDocumentFragment();
for (i = 0; i < randomWizards.length; i++) {
  fragment.appendChild(renderWizard(randomWizards[i]));
}
// 4.2 Добавляем наполненный фрагмент в DOM
similarListElement.appendChild(fragment);
// 5 Покажем блок .setup-similar, удалив у него CSS-класс hidden
document.querySelector('.setup-similar').classList.remove('hidden');

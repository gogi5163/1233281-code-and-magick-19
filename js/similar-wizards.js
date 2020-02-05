'use strict';
(function () {
// Создаем массив с объектами, которые описывают магов.
// Задаем константы для генерации случайных магов
  var COUNT_OF_WIZARDS = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  // Функция для создания случайного мага
  var createRandomWizard = function (names, lastNames, coatColors, eyesColors) {
    var name = window.util.getRandomElement(names) + ' ' + window.util.getRandomElement(lastNames);
    var coatColor = window.util.getRandomElement(coatColors);
    var eyesColor = window.util.getRandomElement(eyesColors);
    return {name: name, coatColor: coatColor, eyesColor: eyesColor};
  };
  // Создаем массив из четырех случайных магов
  var randomWizards = [];
  for (var i = 0; i < COUNT_OF_WIZARDS; i++) {
    randomWizards[i] = createRandomWizard(NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS);
  }
  // Находим блок, который мы будем наполнять случайными сгенерированными магами
  var similarListElement = document.querySelector('.setup-similar-list');
  // Находим шаблон мага
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  // Функция для создания DOM элемента, который соответсвует случайно сгенерированному волшебнику с данными из массива
  var renderWizard = function (wizard) {
    // Клонируем шаблон с содержимым
    var wizardElement = similarWizardTemplate.cloneNode(true);
    // Заполняем клонированный шаблон данными
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    return wizardElement;
  };

  // Создаем пустой объект документа, который мы будем наполнять, перед добавлением в DOM
  var fragment = document.createDocumentFragment();
  for (i = 0; i < randomWizards.length; i++) {
    fragment.appendChild(renderWizard(randomWizards[i]));
  }
  // Добавляем наполненный фрагмент в DOM
  similarListElement.appendChild(fragment);

  // Покажем блок .setup-similar, удалив у него CSS-класс hidden
  document.querySelector('.setup-similar').classList.remove('hidden');
})();

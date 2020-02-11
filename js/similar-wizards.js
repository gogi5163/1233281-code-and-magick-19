'use strict';
(function () {
// Создаем массив с объектами, которые описывают магов.
// Задаем константы для генерации случайных магов
  var COUNT_OF_WIZARDS = 4;

  var onError = function (errorString) {
    var errorElement = document.createElement('div');
    errorElement.setAttribute('style', 'background-color: red; text-align: center; color: white; font-size: 30px;');
    var text = document.createElement('span');
    text.textContent = errorString;
    errorElement.appendChild(text);
    document.querySelector('.setup-wizard-form').appendChild(errorElement);

  };

  var onSuccess = function (data) {
    var similarListElement = document.querySelector('.setup-similar-list');
    // Находим шаблон мага
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    // Перемешаем полученный массив data
    var randomDataWizards = window.util.shuffleArray(data);
    // Функция для создания DOM элемента, который соответсвует случайно сгенерированному волшебнику с данными из массива
    var renderWizard = function (index) {
    // Клонируем шаблон с содержимым
      var wizardElement = similarWizardTemplate.cloneNode(true);
      // Заполняем клонированный шаблон данными
      wizardElement.querySelector('.setup-similar-label').textContent = randomDataWizards[index].name;
      wizardElement.querySelector('.wizard-eyes').style.fill = randomDataWizards[index].colorEyes;
      wizardElement.querySelector('.wizard-coat').style.fill = randomDataWizards[index].colorCoat;
      return wizardElement;
    };
    // Создаем пустой объект документа, который мы будем наполнять, перед добавлением в DOM
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_OF_WIZARDS; i++) {
      fragment.appendChild(renderWizard(i));
    }
    // Добавляем наполненный фрагмент в DOM
    similarListElement.appendChild(fragment);

    // Покажем блок .setup-similar, удалив у него CSS-класс hidden
    document.querySelector('.setup-similar').classList.remove('hidden');
  };
  window.backend.load('https://js.dump.academy/code-and-magick/data', onSuccess, onError);

})();

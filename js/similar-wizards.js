'use strict';
(function () {
// Создаем массив с объектами, которые описывают магов.
// Задаем константы для генерации случайных магов
  var COUNT_OF_WIZARDS = 4;
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  // Функция для создания DOM элемента, который соответсвует случайно сгенерированному волшебнику с данными из массива
  var renderWizards = function (data) {
    var wizardElements = [];
    // Находим шаблон мага
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    for (var i = 0; i < data.length; i++) {
    // Клонируем шаблон с содержимым
      var wizardElement = similarWizardTemplate.cloneNode(true);
      // Заполняем клонированный шаблон данными
      wizardElement.querySelector('.setup-similar-label').textContent = data[i].name;
      wizardElement.querySelector('.wizard-eyes').style.fill = data[i].colorEyes;
      wizardElement.querySelector('.wizard-coat').style.fill = data[i].colorCoat;
      wizardElements[i] = wizardElement;
    }
    return wizardElements;
  };
  var searchSimilarWizards = function (data) {

    var currentCoatColor = document.querySelector('input[name=coat-color]').getAttribute('value');
    var currentEyesColor = document.querySelector('input[name=eyes-color]').getAttribute('value');
    var maxSimilarWizards = data.filter(function (it) {
      return (it.colorCoat === currentCoatColor && it.colorEyes === currentEyesColor);
    });
    var middleSimilarWizards = data.filter(function (it) {
      return (it.colorCoat === currentCoatColor && it.colorEyes !== currentEyesColor);
    });
    var minSimilarWizards = data.filter(function (it) {
      return (it.colorCoat !== currentCoatColor && it.colorEyes === currentEyesColor);
    });
    var otherWizards = data.filter(function (it) {
      return (it.colorCoat !== currentCoatColor && it.colorEyes !== currentEyesColor);
    });

    return maxSimilarWizards.concat(middleSimilarWizards, minSimilarWizards, otherWizards);

  };

  var onError = function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.setAttribute('style', 'background-color: red; text-align: center; color: white; font-size: 30px;');
    var text = document.createElement('span');
    text.textContent = errorMessage;
    errorElement.appendChild(text);
    document.querySelector('.setup-wizard-form').appendChild(errorElement);

  };

  var onSuccess = function (data) {
    window.similarWizards.data = data;
    var similarListElement = document.querySelector('.setup-similar-list');
    // Очищаем список
    while (similarListElement.firstChild) {
      similarListElement.firstChild.remove();

    }
    // Создаем пустой объект документа, который мы будем наполнять, перед добавлением в DOM
    var fragment = document.createDocumentFragment();
    var wizardsElements = renderWizards(searchSimilarWizards(data));

    for (var i = 0; i < COUNT_OF_WIZARDS; i++) {
      fragment.appendChild(wizardsElements[i]);
    }
    // Добавляем наполненный фрагмент в DOM
    similarListElement.appendChild(fragment);

    // Покажем блок .setup-similar, удалив у него CSS-класс hidden
    document.querySelector('.setup-similar').classList.remove('hidden');
  };
  window.backend.load(LOAD_URL, onSuccess, onError);

  window.similarWizards = {
    refresh: function () {
      if (window.similarWizards.data) {
        onSuccess(window.similarWizards.data);
      }
    }
  };

})();

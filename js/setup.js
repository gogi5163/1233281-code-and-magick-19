'use strict';
(function () {
// Открытие/закрытие окна настройки персонажа:
  var setupPopup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var playerName = document.querySelector('.setup-user-name');
  var setupStyle = setupPopup.getAttribute('style');
  var doDefaultSetup = function () {
    setupPopup.setAttribute('style', setupStyle);
  };
  var inputBlurOrClosePopup = function () {
    // Если активный элемент инпут, то при нажатии ESC отменим фокус, в противном случае закроем окно.
    if (document.activeElement !== playerName) {
      closePopup();
    } else {
      inputBlur();
    }
  };
  // Обработчики
  var onEscKeyPress = function (evt) {
    window.util.isEscEvent(evt, inputBlurOrClosePopup);
  };
  var onSetupOpenPressEnter = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };
  var onSetupClosePressEnter = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };
  var onInputPressEnter = function (evt) {
    window.util.isEnterEvent(evt, inputBlur);
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
    doDefaultSetup();
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
  // Сценарий нажатия Enter при активном инпуте
  playerName.addEventListener('keydown', onInputPressEnter);
  // Cценарий отправки формы
  var form = document.querySelector('.setup-wizard-form');

  var onSuccess = function () {
    form.setAttribute('style', '');
    closePopup();

  };
  var onError = function (stringError) {
    var errorElement = document.createElement('div');
    errorElement.setAttribute('style', 'position: absolute; top: 0; width: 100%; background-color: red; text-align: center; color: white; font-size: 30px;');
    var text = document.createElement('span');
    text.textContent = 'Ошибка отправки формы (' + stringError + ')';
    errorElement.appendChild(text);
    document.querySelector('body').appendChild(errorElement);

  };
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.backend.save(formData, onSuccess, onError);
  });
})();

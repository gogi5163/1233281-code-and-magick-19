'use strict';
(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var closeButton = document.querySelector('.setup-close');
  var setupStyle = setupDialogElement.getAttribute('style');
  var doDefaultSetup = function () {
    setupDialogElement.setAttribute('style', setupStyle);
  };
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var isDragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var top = 'top: ' + (setupDialogElement.offsetTop - shift.y) + 'px; ';
      var left = 'left: ' + (setupDialogElement.offsetLeft - shift.x) + 'px; ';
      setupDialogElement.setAttribute('style', top + left);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };
    var onSetupCloseClick = function () {
      doDefaultSetup();
      closeButton.removeEventListener('click', onSetupCloseClick);
    };
    var onSetupClosePressEnter = function (keyEnterEvt) {
      window.util.isEnterEvent(keyEnterEvt, doDefaultSetup);
      closeButton.removeEventListener('keydown', onSetupClosePressEnter);
    };
    var onEscapePress = function (keyEscEvt) {
      window.util.isEscEvent(keyEscEvt, doDefaultSetup);
      document.removeEventListener('keydown', onEscapePress);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', onMouseUp);
    // Возврат окна в первоначальное положение
    closeButton.addEventListener('click', onSetupCloseClick);
    closeButton.addEventListener('keydown', onSetupClosePressEnter);
    document.addEventListener('keydown', onEscapePress);
  });
})();


'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Изменение цвета мантии персонажа по нажатию
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardCoatData = document.querySelector('input[name=coat-color]');
  var onCoatClick = function () {
    window.util.colorize(wizardCoat, wizardCoatData, COAT_COLORS);
    window.debounce(window.similarWizards.refresh);
  };
  wizardCoat.addEventListener('click', onCoatClick);

  // Изменение цвета глаз персонажа по нажатию
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesData = document.querySelector('input[name=eyes-color]');
  var onEyesClick = function () {
    window.util.colorize(wizardEyes, wizardEyesData, EYES_COLORS);
    window.debounce(window.similarWizards.refresh);
  };
  wizardEyes.addEventListener('click', onEyesClick);

  // Изменение цвета фаербола по нажатию
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardFireballData = wizardFireball.querySelector('input');
  var onFireballClick = function () {
    window.util.colorize(wizardFireball, wizardFireballData, FIREBALL_COLORS);
    window.similarWizards.refresh();
  };
  wizardFireball.addEventListener('click', onFireballClick);

})();

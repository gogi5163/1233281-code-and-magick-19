'use strict';
(function () {
  window.util = (function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    return {
      isEscEvent: function (evt, action) {
        if (evt.keyCode === ESC_KEYCODE) {
          action();
        }
      },
      isEnterEvent: function (evt, action) {
        if (evt.keyCode === ENTER_KEYCODE) {
          action();
        }
      },
      getNextProperty: function (array, value) {
        if (value === '') {
          value = array[0];
        }
        var currentIndex;
        var nextValue;
        // Поиск индекса текущего значения
        for (var i = 0; i < array.length; i++) {
          if (array[i] === value) {
            currentIndex = i;
            break;
          }
        }
        // Поиск следующего значения в массиве
        nextValue = (currentIndex === array.length - 1) ? array[0] : array[currentIndex + 1];
        return nextValue;
      },
      getRandomElement: function (array) {
        return array[Math.floor(Math.random() * (array.length))];
      },
      colorize: function (element, dataElement, colors) {
        var currentColor = dataElement.getAttribute('value');
        var color = this.getNextProperty(colors, currentColor);
        dataElement.setAttribute('value', color);
        if (element.tagName.toLowerCase() === 'div') {
          element.setAttribute('style', 'background-color: ' + color);
        } else {
          element.setAttribute('style', 'fill:' + color);
        }
      },
      makeRandomBlueColor: function () {
        return 'hsl(240 , ' + Math.floor(Math.random() * 100) + '% , 50%)';
      },
      getRandomNumber: function (minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      },
      shuffleArray: function (array) {
        // Случайно перемешаем массив
        var changeValue;
        for (var i = 0; i < array.length; i++) {
          var randomKey = this.getRandomNumber(0, array.length - 1);
          changeValue = array[i];
          array[i] = array[randomKey];
          array[randomKey] = changeValue;
        }
        return array;
      }
    };
  })();


})();

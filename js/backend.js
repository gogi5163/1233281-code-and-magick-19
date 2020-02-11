'use strict';
(function () {

  window.backend = {
    saveUrl: 'https://js.dump.academy/code-and-magick',

    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('error', function () {
        try {
          throw new Error('Произошла ошибка соединения');
        } catch (errorMessage) {
          onError(errorMessage);
        }
      });
      xhr.timeout = 10000; // 10s

      xhr.addEventListener('timeout', function () {
        try {
          throw new Error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        } catch (errorMessage) {
          onError(errorMessage);
        }
      });
      xhr.addEventListener('load', function () {
        try {
          switch (xhr.status) {
            case 200:
              onLoad(xhr.response);
              break;
            case 400:
              throw new Error('Неверный запрос');
            case 401:
              throw new Error('Пользователь не авторизован');
            case 404:
              throw new Error('Ничего не найдено');
            default:
              throw new Error('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
          }
        } catch (errorMessage) {
          onError(errorMessage);
        }
      });
      xhr.open('GET', url);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('error', function () {
        try {
          throw new Error('Произошла ошибка соединения');
        } catch (errorMessage) {
          onError(errorMessage);
        }
      });
      xhr.timeout = 10000; // 10s
      xhr.addEventListener('timeout', function () {
        try {
          throw new Error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        } catch (errorMessage) {
          onError(errorMessage);
        }
      });
      xhr.addEventListener('load', function () {
        try {
          switch (xhr.status) {
            case 200:
              onLoad();
              break;
            case 500:
              throw new Error('Ошибка сервера');
            case 503:
              throw new Error('Сервер временно не работает');
            default:
              throw new Error('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
          }
        } catch (errorMessage) {
          onError(errorMessage);
        }
      });
      xhr.open('POST', this.saveUrl);
      xhr.send(data);
    }
  };

})();


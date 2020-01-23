'use strict';
window.renderStatistics = function (ctx, names, times) {
  // 1. Задаем значения констант'
  var WIDTH_CLOUD = 420;
  var HEIGHT_CLOUD = 270;
  var START_X = 100;
  var START_Y = 10;
  var CLOUD_COLOR = '#fff';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var COLUMN_WIDTH = 40;
  var BAR_CHART_HEIGHT = 150;
  var SPACE_BETWEEN_COLUMNS = 50;
  var MAIN_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
  // 2. Функция для создания облака и его тени
  var createCloud = function (color, startX, startY, width, height) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(startX, startY, startX + (width / 2), startY + 10, startX + width, startY);
    ctx.lineTo(startX + width, startY + height);
    ctx.bezierCurveTo(startX + width, startY + height, startX + (width / 2) + 10, startY + height + 10, startX, startY + height);
    ctx.closePath();
    ctx.fill();
  };
  // 2.1 Создание облака и тени
  createCloud(CLOUD_SHADOW_COLOR, START_X + 10, START_Y + 10, WIDTH_CLOUD, HEIGHT_CLOUD);
  createCloud(CLOUD_COLOR, START_X, START_Y, WIDTH_CLOUD, HEIGHT_CLOUD);
  // 3. Рисуем текст
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.fillText('Ура вы победили!', 115, 45);
  ctx.fillText('Список результатов:', 115, 65);
  // 4. Функция для опредения высоты столбца
  var calculateHeightColumn = function (arr, barChartHeight, index) {
    var maxResult = 0;
    for (var i = 0; i < arr.length; i++) {
      if (maxResult < arr[i]) {
        maxResult = arr[i];
      }
    }
    var AspectRatio = barChartHeight / maxResult;
    return Math.ceil(arr[index] * AspectRatio);
  };
  var makeRandomBlueColor = function () {
    return 'hsl(240 , ' + Math.floor(Math.random() * 100) + '% , 50%)';
  };
  // 4.1  Рисуем каждый столбец гистограммы с именем игрока и его результатом
  for (var i = 0; i < times.length; i++) {
    // 4.2 Находим высоту столбца
    var heightResult = calculateHeightColumn(times, BAR_CHART_HEIGHT, i);
    // 4.3.2 Находим цвет столбца
    ctx.fillStyle = (names[i] === 'Вы') ? MAIN_COLUMN_COLOR : makeRandomBlueColor();
    // 4.3.3 Рисуем столбец, учитывая заданные размеры и изменение положения в зависимости от итерации.
    ctx.fillRect(200 + i * (COLUMN_WIDTH + SPACE_BETWEEN_COLUMNS), 250, -COLUMN_WIDTH, -heightResult);
    // 4.3.4 Изменяем цвет заливки для текста
    ctx.fillStyle = '#000000';
    // 4.3.5 Рисуем имена игроков под столбцами
    ctx.fillText(names[i], 160 + i * (COLUMN_WIDTH + SPACE_BETWEEN_COLUMNS), 270);
    // 4.3.6 Рисуем результат игроков над столбцами
    ctx.fillText(Math.ceil(times[i]), 160 + i * (COLUMN_WIDTH + SPACE_BETWEEN_COLUMNS), 240 - heightResult);
  }
};

'use strict'
window.renderStatistics = function (ctx, names, times) {
  // Задаем значения ширины колонок, высоты гистограммы, расстояния между колонками, цвет столбца 'Вы'
  var columnWidth = 40;
  var barChartHeight = 150;
  var spaceBetweenColumns = 50;
  var mainColumnColor = 'rgba(255, 0, 0, 1)';
  // 1. Рисуем тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(110, 20);
  ctx.bezierCurveTo(110, 20, 320, 30, 530, 20);
  ctx.lineTo(530, 290);
  ctx.bezierCurveTo(530, 290, 320, 300, 110, 290);
  ctx.closePath();
  ctx.fill();
  // 2. Рисуем облако
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(100, 10);
  ctx.bezierCurveTo(100, 10, 310, 20, 520, 10);
  ctx.lineTo(520, 280);
  ctx.bezierCurveTo(520, 280, 310, 290, 100, 280);
  ctx.closePath();
  ctx.fill();
  // 3. Рисуем текст
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.fillText('Ура вы победили!', 115, 45);
  ctx.fillText('Список результатов:', 115, 65);
  // 4. Рисуем гистограмму
  // 4.1 Поиск максимального значения в массиве times
  var maxValueOfTimes = 0;
  for (var i = 0; i < times.length; i++) {
	    if (maxValueOfTimes < times[i]) {
	      	maxValueOfTimes = times[i];
	    }
 }
  // 4.2 Поиск значения коээфициента пропорции т.е. ищем число, на которое нужно умножить время игрока, чтобы получить высоту столбца
  var aspectRatio = barChartHeight / maxValueOfTimes;
  // 4.3  Рисуем каждый столбец гистограммы с именем игрока и его результатом
  for (var i = 0; i < times.length; i++) {
    // 4.3.1 Находим высоту столбца
    var heightResult = (Math.ceil(times[i] * aspectRatio))
	    // 4.3.2 Находим цвет столбца
	  	if (names[i] == 'Вы') {
	 		ctx.fillStyle = 'rgba(255, 0, 0, 1)';
	 	} else {
	  		ctx.fillStyle = 'hsl(240 , ' + Math.floor(Math.random() * 100) + '% , 50%)';
	  	}
	  	// 4.3.3 Рисуем столбец, учитывая заданные размеры и изменение положения в зависимости от итерации.
	    ctx.fillRect(200 + i * (columnWidth + spaceBetweenColumns), 250, -columnWidth, -heightResult)
	    // 4.3.4 Изменяем цвет заливки для текста
	    ctx.fillStyle = '#000000';
	    // 4.3.5 Рисуем имена игроков под столбцами
	    ctx.fillText(names[i], 160 + i * (columnWidth + spaceBetweenColumns), 270);
	    // 4.3.6 Рисуем результат игроков над столбцами
	    ctx.fillText(Math.ceil(times[i]), 160 + i * (columnWidth + spaceBetweenColumns), 240 - heightResult);
	  }
}

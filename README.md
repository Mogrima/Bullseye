# Bullseye
<img src="https://img.shields.io/badge/JavaScript-004524?style=for-the-badge&logo=javascript&logoColor=yellow" alt="JavaScript"> <img src="https://img.shields.io/badge/Canvas-6495ed?style=for-the-badge&logo=html5&logoColor=#E34F26" alt="Canvas">
<img src="https://img.shields.io/badge/HTML5-004524?style=for-the-badge&logo=html5&logoColor=#E34F26" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-004524?style=for-the-badge&logo=css3&logoColor=#E34F26" alt="css3">

## About
Быку необходимо озаботиться о безопасном перемещении вылупившихся детёнышей в лес и минимизировать их исчезновение в ртах голодных жаб. Большое число погибших детёнышей нанесёт
непоправимый вред магическому лесу, поэтому постарайтесь сделать все возможное для того, чтобы личинки смогли благополучно скрыться в лесной чаще. Как только это будет сделано
вы увидите встрепенувшихся светлячков, которые сидели на ветках кустов.

## Demo

![Изображение][1]

## Game mechanics
В игре 1 тип врагов - жабы. Они появляются с правой стороны леса и пересекают опушку. Для игрока не предоставляют опасностей, Бык может отодвигать жаб в сторону, чтобы
изменять их траекторию движения. Растения и грибы являются препятствием для всех живых существ игры.

![Изображение][2]

Личинки перемещаются по игровому полю вверх, для того, чтобы скрыться в безопасности лесной чащи. Бык может подталкивать к безопасной зоне, как самих личинок, так и яйца.
Или же использовать яйца для построения стратегии, например, преграждать путь жабам, чтобы защитить личинки. Для яиц враги не представляют опасности. Они, оказавшись на пути жаб, будут просто оттолкнуты ими в сторону.

![Изображение][3]

Игра завершится при достижении количества очков равных 30. Победа или проигрыш будет зависеть от количества потерянных (съеденных жабами) личинок.

## Control
Игровой персонаж перемещается по игровому полю при помощи левой кнопки мыши. На кнопку 'R' осуществляется перезагрузка игры.

## How to play
1. Открыть игру в браузере можно по [ссылке](https://mogrima.github.io/Bullseye/)
2. Или скачать архив с игрой из репозитория. Для того, чтобы запустить игру локально:
   * Убедиться, что на ПК установлена node.js
   * Открыть консоль в корне проекта и набрать команду:
   ```node server.js ```
   * Если страница браузера не откроется автоматически, это можно сделать самостоятельно, просто указав в адресной строке: ```http://127.0.0.1:8125/```

## Acknowledgments
Lessons and support:

<img src="https://img.shields.io/badge/Franks laboratory -ffd700?style=for-the-badge&logo=youtube&logoColor=#FF0000" alt="Franks laboratory ">

Sprites and background:

<img src="https://img.shields.io/badge/Franks laboratory -ffd700?style=for-the-badge&logo=youtube&logoColor=#FF0000" alt="Franks laboratory ">

Font

<img src="https://img.shields.io/badge/Bangers -ffd700?style=for-the-badge&logo=googlefonts&logoColor=#4285F4" alt="Bangers ">

## License

Unlicense

[1]:https://github.com/Mogrima/Bullseye/blob/master/Assets/prewiev.png
[2]:Assets/enemy1.png
[3]:https://github.com/Mogrima/Bullseye/blob/master/Assets/larva_crawl.png

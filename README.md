![Demonstration GIF](./present.gif)

# Файлы
- index.php - содержит верстку, подключает в себе инструменты для работы с ajax, скрипты и стили.
- Style.css - стили для index.php.
- script.js - Содержит в себе функции: добавление контакта, получения всех контактов в список, удаление контакта по id. В функциях используются ajax запросы что позволяет обмениваться данными без обновления страницы.
- routerContacts.php - принимает запросы и в зависимости от переданного action использует класс для работы с данными.
- ContactOperator.php - содержит в себе класс для работы с файлом json который хранит данные. Класс имеет три метода: создание новой записи, чтение всех записей, удаление записи.
- contacts.json - выступает в роли хранилища данных.
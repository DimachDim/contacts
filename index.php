<!DOCTYPE html>
<html>
<head>
    <title>Телефонный справочник</title>

    <!-- Подключение стилей -->
    <link rel="stylesheet" type="text/css" href="./Style.css">
</head>

<body onload="getContacts()">
    

    <h1>Телефонный справочник</h1>
    
    <!-- Форма добавления нового контакта -->
    <form method="post" action="">

        <label for="name">Имя</label><br>
        <input type="text" id="name" name="name"><br>
        
        <label for="phone">Телефон</label><br>
        <input type="number" id="phone" name="phone"><br>
        
        <input type="submit" value="Добавить" class="btn-add">
    </form>
    

    <!-- Список контактов -->
    <h2>Список контактов:</h2>
    
    <ul id='contact-list'>
        
    </ul>
        
    <!--AJAX-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <!--Файл с скриптами-->
    <script src="./script.js"></script>
</body>
</html>
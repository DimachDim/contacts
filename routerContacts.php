<?php

// Используем специальный класс для работы с контактами
include 'ContactOperator.php';


$ContactsOperator = new ContactOperator;    // Экземпляр класса
$action = $_GET['action'];                  // action
$response = null;                           // Хранит ответ

// Смотрим экшен
switch($action)
{
    // СОЗДАНИЕ
    case 'createContact':
        // Достаем данные
        $name = $action = $_GET['name'];
        $phone = $action = $_GET['phone'];  
        // Отдаем методу
        $response = $ContactsOperator->createContact($name, $phone);
        break;

    // ЧТЕНИЕ
    case 'getContacts':
        $response = $ContactsOperator->getContacts();
        break;

    // УДАЛЕНИЕ
    case 'deleteContact':
        // Достаем id
        $id = $_GET['id'];
        // Передаем методу класса и сохраняем ответ
        $response = $ContactsOperator->deleteContact($id);
        break;
}

// Кодируем ответ в json
$jsonData = json_encode($response);
// Передаем
echo $jsonData;
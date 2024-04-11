<?php


class ContactOperator{
    
    public $file = "./contacts.json";   // Путь до файла json  с данными
    public $data;                       // Будет хранить декодированные данные из файла

    public function __construct()
    {
        // Получаем содержимое файла
        $json = file_get_contents($this->file);
        // Декодируем и записываем в глоб. переменную. true = асоц. массив
        $this->data = json_decode($json, true);
    }

    // Создать контакт
    public function createContact($name, $phone){
        try 
        {
            // Проверяем заполеннность полей
            if($name == '' or $phone == '')
            {
                return ['errorText' => 'Заполнены не все поля!'];
            }

            // Если поля заполненны создаем запись
            $contacts = &$this->data['contacts'];           // Весь файл
            $id = $contacts[count($contacts)-1]['id']+1;    // id нового контакта

            // Добавляем новую запись в массив
            $contacts[] = array('id'=>$id ,'name' => $name, 'phone'=>$phone);
            // Преобразуем в JSON формат
            $jsonData = json_encode($this->data, JSON_PRETTY_PRINT);
            // Записываем в файл
            file_put_contents($this->file, $jsonData);

            return true;
         
        } catch (\Exception $e) {
            return ['errorText' => $e->getMessage()];
        }
    }

    // Получить все контакты
    public function getContacts()
    {
        return $this->data["contacts"];
    }

    // Удаление контакта
    public function deleteContact($id){
        try 
        {
            // Получаю массив контактов
            $contacts = &$this->data["contacts"];

            // Перебираем массив. key = индекс, contact = содержимое
            foreach($contacts as $key => $contact)
            {
                if($contact['id'] == $id)
                {
                    // Удаляем контакт
                    unset($contacts[$key]); 
                    break;
                }
            }

            // Переиндексация массива контактов
            $contacts = array_values($contacts);

            // Сохранение изменений в файл
            file_put_contents($this->file, json_encode($this->data));

            // Возвращаем истину
            return  true;
         
        } catch (\Exception $e) {
            return ['errorText' => $e->getMessage()];
        }
    }
}
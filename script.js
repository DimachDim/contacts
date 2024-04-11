 
 // Обработка добавления
 document.querySelector('form').addEventListener('submit', function(event) {
    // Отмена отправки формы
    event.preventDefault();

    // Получение данных из полей формы
    let name = document.querySelector('#name').value;
    let phone = document.querySelector('#phone').value;

    // Отправка данных на сервер
    $.ajax({
        url: './routerContacts.php',    // путь к роутеру
        type: 'GET',
        data:{
            action: 'createContact',
            name: name,
            phone: phone
        },
        success: function(response) {
            // Распарс данных
            response = JSON.parse(response)
            
            // Если пришел текст ошибки
            if(response.errorText != undefined || response.errorText != null){
                alert(response.errorText);

            // Если текста ошибки не пришло
            }else{
                // Запрашиваем список контактов и обнавляем список
                getContacts();
                // Очищаем поля
                document.querySelector('#name').value = '';
                document.querySelector('#phone').value = '';
            }
        }
    });
});


// Получение всех контактов
function getContacts(){
    $.ajax({
        url: './routerContacts.php',    // путь к роутеру
        type: 'GET',
        data:{
            action: 'getContacts',
        },
        // Ответ сервера
        success: function(response) {

            let data = JSON.parse(response);                    // Распарс ответа
            let ul = document.getElementById('contact-list');   // Ссылка на список контактов
            
            // Очищаем содержимое списка
            ul.innerHTML = '';                                  
            
            // Перебираем данные
            data.forEach(element => {
                // Создаем элемент списка
                let li = document.createElement('li');
                // Создаем кнопку удаления элемента
                let btnDelete = document.createElement('button');
                // Устанавливаем текст кнопки
                btnDelete.innerHTML = 'X';
                // Устанавливаем функцию клика по кнопке
                btnDelete.onclick = ()=>{
                    deleteContact(element.id)   // Отправляет на сервер id элемента который надо удалить
                }

                // Формируем эелемент списка
                li.innerHTML  = `<p>${element.name}</p> <p>${element.phone}</p>`;
                // Добавляем в элемент кнопку
                li.appendChild(btnDelete);
                // Помещаем в список
                ul.appendChild(li);
            });
        }
    });
}


// Обработка удаления
function deleteContact(id){
    $.ajax({
        url: './routerContacts.php',    // путь к роутеру
        type: 'GET',
        data:{
            action: 'deleteContact',
            id: id
        },
        success: function(response) {
            // Запрашиваем список контактов и обнавляем список
            getContacts()
        }
    });
}



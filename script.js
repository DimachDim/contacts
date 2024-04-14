 


class ContactsOperator{
    constructor(){
        this.url = './routerContacts.php'      // Место роутера
    }

    // Делает запросы на сервер. data - данные для сервера, callback - функция обрабатывающая ответ сервера
    ajax(data, callback){
        $.ajax({
            url: this.url,    // путь к роутеру
            type: 'GET',
            data: data,
            success: function(response){
                callback(response)
            }
        });
    }

    // Создает новый контакт. idFotm - id формы создающей контакт
    createContact(idForm){

        const form = document.getElementById(idForm);    // Получаем форму

        // Слушаем отправку формы
        form.addEventListener('submit',(event)=>{
            // Отменяем отправку для исключения обнавления страницы
            event.preventDefault();

            // Получение данных из полей формы
            let name = form.querySelector('#name').value;
            let phone = form.querySelector('#phone').value;
            
            // Формируем данные для отправки на сервер
            const data={
                action: 'createContact',
                name: name,
                phone: phone
            }

            // Создаем функцию которая выполнится после ответа сервера
            let responseProcssing = (response)=>{
                // Распарс данных
                response = JSON.parse(response)
                
                // Если пришел текст ошибки
                if(response.errorText != undefined || response.errorText != null){
                    alert(response.errorText);

                // Если текста ошибки не пришло
                }else{
                    // Запрашиваем список контактов и обнавляем список
                    this.getContacts('contact-list');
                    // Очищаем поля
                    form.querySelector('#name').value = '';
                    form.querySelector('#phone').value = '';
                }
            }

            // Делаем ajax запрос
            this.ajax(data,responseProcssing);
        })
        
    }

    // Получает все контакты. idlist - id ul куда надо поместить данные
    getContacts(idList){
        
        // Формируем данные для запроса
        let data = {
            action: 'getContacts'
        }
        
        // Создаем функцию обрабатывающую ответ сервера
        let responseProcssing = (response)=>{

            let data = JSON.parse(response);                    // Распарс ответа
            let ul = document.getElementById(idList);           // Ссылка на список контактов
            
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
                    this.deleteContact(element.id)   // Отправляет на сервер id элемента который надо удалить
                }

                // Формируем эелемент списка
                li.innerHTML  = `<p>${element.name}</p> <p>${element.phone}</p>`;
                // Добавляем в элемент кнопку
                li.appendChild(btnDelete);
                // Помещаем в список
                ul.appendChild(li);
            });
        }

        // Делаем ajax запрос
        this.ajax(data, responseProcssing);
    }

    // Удаляет запись. id - id контакта который надо удалить
    deleteContact(id){
        
        // Формируем данные для передачи в jax
        let data = {
            action: 'deleteContact',
            id: id
        }
        
        this.ajax(data, ()=>this.getContacts('contact-list'))
    }
}

// Создаем экземпляр
let contacts = new ContactsOperator;
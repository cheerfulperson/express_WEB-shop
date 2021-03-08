function ready() {

    const modalWindow = document.getElementById('modalWindow');
    const modalBody = document.querySelector('.modal-body');
    const btnEvent = document.getElementById('myBtn-event');
    const btnChangePhone = document.getElementById("changePhoneNumber");
    const title = document.querySelector('.modal-header h2');
    const span = document.getElementsByClassName("close")[0];
    const btnDeleteAcc = document.getElementById('deleteAccount');


    // Модальное окно
    if (btnChangePhone != undefined && btnDeleteAcc != undefined || modalWindow != undefined) {
        btnChangePhone.onclick = function () {
            modalWindow.style.display = "block";
            title.innerHTML = "Поменять номер мобильного телефона";
            btnEvent.style.background = 'green';
            btnEvent.value = "Далее";
            modalBody.innerHTML = ` 
            <div class="modal-body" >
                <label class="form_tag settings_phone" for="phone">Мобильный телефон<span class="form_required" style="color: red;">*</span>:</label>
                <input class="form_text form_text_type_phone" type="text" value="" id="phone"> 
            </div>`
        }
        // Помещает в боди окна нужные элементы
        btnDeleteAcc.onclick = function () {
            modalWindow.style.display = "block";
            title.innerHTML = "Удаление аккаунта";
            btnEvent.value = "Удалить";
            btnEvent.style.background = 'red';
            // btnEvent.id = "btnDeleteUser";
            modalBody.innerHTML = ` 
            <label class="form_tag settings_phone" for="phone">Пароль<span class="form_required" style="color: red;">*</span>:</label>
            <input class="form_text form_text_type_password" type="password" placeholder="Введите пароль" id="checkPasswordOnDelete"> 
            <p id="invalidPassword" style="color:red"></p>`
                const passwordOnDelete = document.getElementById('checkPasswordOnDelete');
                
                function deleteUser(psw) {
                    
                    let password = JSON.stringify({
                        password: psw
                    });
                    let xhr = new XMLHttpRequest();

                    xhr.open('DELETE', '/settings/registration-data/delete-account');

                    xhr.setRequestHeader('Content-Type', 'application/json');

                    xhr.send(password);

                    xhr.onload = function () {
                        let res = JSON.parse(xhr.responseText);
                        let invalidPassword = document.getElementById('invalidPassword');
                
                        if(res.isInvalidPassword){
                            invalidPassword.innerHTML = `Неправильный пароль`;
                        }else{
                            window.location.href = '/';
                        }
                    }

                    xhr.onerror = (err) => {
                        console.error(err);
                    }

                }
                btnEvent.addEventListener('click', (e) => {
                    deleteUser(passwordOnDelete.value);
                })


        }
        const otmena = document.getElementById('myBtn-cancel');
        otmena.onclick = function () {
            modalWindow.style.display = "none";
            modalBody.innerHTML = "";
        }
        span.onclick = function () {
            modalWindow.style.display = "none";
            modalBody.innerHTML = "";
        }


        window.onclick = function (event) {
            if (event.target == modalWindow) {
                modalWindow.style.display = "none";
                modalBody.innerHTML = "";
            }
        }
    }

}
document.addEventListener("DOMContentLoaded", ready);
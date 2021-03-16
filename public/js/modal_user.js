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
            modalBody.innerHTML = 
            `
                <label class="form_tag settings_phone" for="phone">Мобильный телефон<span class="form_required" style="color: red;">*</span>:</label>
                <input class="form_text form_text_type_phone" type="text" value="" id="phone"> `
        }
        // Помещает в боди окна нужные элементы
        let isShowdPsw = false;
        function showPassword(input, button) {
            if (!isShowdPsw) {
                button.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>`;
                input.type = 'text';
                isShowdPsw = true;
            } else {
                button.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z"/>
                </svg>`
                input.type = 'password';
                isShowdPsw = false;
            }

        }
        btnDeleteAcc.onclick = function () {
            modalWindow.style.display = "block";
            title.innerHTML = "Удаление аккаунта";
            btnEvent.value = "Удалить";
            btnEvent.style.background = 'red';
            // btnEvent.id = "btnDeleteUser";
            modalBody.innerHTML = ` 
            <label class="form_tag settings_phone" for="phone">Пароль<span class="form_required" style="color: red;">*</span>:</label>
            <div class="password">
                <input class="form_text form_text_type_password" type="password" placeholder="Введите пароль" id="checkPasswordOnDelete"> 
                <div id="showPasswordBtn"></div>             
            </div>
            <p id="invalidPassword" style="color:red"></p>`
            const passwordOnDelete = document.getElementById('checkPasswordOnDelete');
            document.getElementById('showPasswordBtn').innerHTML = 
                
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z"/>
                </svg>`;
            document.querySelector('.password').children[1].addEventListener('click', (e) => {
                showPassword(passwordOnDelete, e.target);
            });

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

                    if (res.isInvalidPassword) {
                        invalidPassword.innerHTML = `Неправильный пароль`;
                    } else {
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
function ready() {
    const password = document.getElementById('password'); // Пароль
    const passwordRepeat = document.getElementById('passwordRepeat');
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const showPasswordBtn = document.querySelectorAll('.password');
    const registerBtn = document.getElementById('regBtn');
    const btnMenu = document.getElementById('getUserMenu');
    const helperMenu = document.getElementById('addHelperMenu');
    const textCheckPsw = document.getElementById('checkPsw');
    // Настройки пользователя
    const blockUserImages = document.querySelector('.choose_image');
    const deleteUserImg = document.getElementById('delete_profile_image');
    // Настройки регистрацинные данные
    const inputOldPassword = document.getElementById('oldPassword');
    const inputNewPassword = document.getElementById('newPassword');
    const inputNewRptPassword = document.getElementById('newRptPassword');
    const btnChangePassword = document.getElementById('changePassword');
    const incorrectMessage = document.getElementById('incorrectMessage');

    // Выпадающее меню
    if (btnMenu != undefined && helperMenu != undefined) {
        function getMenu() {
            if (helperMenu.className != 'dropdown-wrapper') helperMenu.className = 'dropdown-wrapper';
            else helperMenu.className = 'visible-none';
        }
        btnMenu.addEventListener('click', getMenu);
    }
    // Отвечает за пароли при регестрации
    if (password != undefined && passwordRepeat != undefined && textCheckPsw != undefined) {
        // Есть баг если удалить значения value
        function getReapetsPSW() {
            if (password.value != '' && passwordRepeat.value != '') {
                if (password.value == passwordRepeat.value && password.value.length >= 6 && passwordRepeat.value.length >= 6) 
                    registerBtn.innerHTML = '<input type="submit" class="registerbtn" value="Register">';
                else
                    registerBtn.innerHTML = '<div class="none-registerbtn">Register</div>';
            }
        }

        passwordRepeat.addEventListener('keyup', getReapetsPSW);
        password.addEventListener('keyup', getReapetsPSW);

        getReapetsPSW();
    }
    // Отвечает за скрытие и показ паролей
    if (showPasswordBtn != undefined) {
        let isShowdPsw = false;

        function showPassword(input, button) {
            if (!isShowdPsw) {
                button.innerHTML =
                    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                </svg>`;
                input.type = 'text';
                isShowdPsw = true;
            } else {
                button.innerHTML =
                    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock"viewBox="0 0 16 16">
                    <path
                        d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                </svg>`
                input.type = 'password';
                isShowdPsw = false;
            }

        }
        for (let i = 0; i < showPasswordBtn.length; i++) {
            showPasswordBtn[i].children[1].addEventListener('click', (e) => {
                showPassword(showPasswordBtn[i].children[0], showPasswordBtn[i].children[1]);
            });
        }
    }
    // Регистрационные данные -> меняем пароль
    if(inputOldPassword != undefined && inputNewPassword != undefined){
        function checkPsw(psw, rptPsw){
            if(psw.value == ''){
                psw.style.background = "";
                rptPsw.style.background = "";
                incorrectMessage.innerHTML = '';
            }
            else if (psw.value.length < 6) {
                incorrectMessage.innerHTML = 'Пароль должен быть не менее 6 символов';
                psw.style.background = "#ffaca6";
            }else{
                psw.style.background = "#aaffa6";
                if(psw.value == rptPsw.value){
                    rptPsw.style.background = "#aaffa6";
                    incorrectMessage.innerHTML = '';
                }else if(psw.value != rptPsw.value){
                    rptPsw.style.background = "#ffaca6";
                    incorrectMessage.innerHTML = 'Пароли не совпадают!!!'
                }
            }

        }
        function checkOldPsw(oldPsw, newPsw, newRptPsw){
            
            let password = JSON.stringify({
                oldPassword: oldPsw.value,
                newPassword: newPsw.value,
                newRptPassword: newRptPsw.value
            });

            let xhr = new XMLHttpRequest();

            xhr.open('PUT', '/settings/registration-data/change-account-password'); //Установка типа запроса и адрес

            xhr.setRequestHeader('Content-Type', 'application/json'); //Установка формы отправки

            xhr.send(password); // Отправка на сервер

            xhr.onload = function () { // Когда пришел ответ с сервера, то выполняется это
                let res = JSON.parse(xhr.responseText);

                if(res.isInvalidPassword != undefined){
                    if(res.isInvalidPassword){
                        oldPsw.style.background = "#ffaca6";
                        incorrectMessage.innerHTML = `Неправильный пароль`;
                    }else{
                        newRptPsw.style.background = "";
                        newPsw.style.background = "";
                        oldPsw.style.background = "";
                        newPsw.value = "";
                        newRptPsw.value = "";
                        oldPsw.value = "";
                        incorrectMessage.style.color = "#0bff00";   
                        incorrectMessage.innerHTML = `Пароль успешно изменен`;
                        setTimeout(()=>{
                            incorrectMessage.style.color = "red";
                            incorrectMessage.innerHTML = "";
                        }, 5000)                    
                    }
                }else if(res.errorMessage != undefined){
                    incorrectMessage.style.color = "red";
                    if(res.errorMessage == 0){
                        incorrectMessage.innerHTML = "Пароли не совпадают!!!";
                    }else if(res.errorMessage == 1){
                        incorrectMessage.innerHTML = "Длина пароля менее 6 символов";
                    }
                }
                
            }
        }
        inputNewPassword.addEventListener('keyup', ()=>{checkPsw(inputNewPassword, inputNewRptPassword)});
        inputNewRptPassword.addEventListener('keyup', ()=>{checkPsw(inputNewPassword, inputNewRptPassword)});
        btnChangePassword.addEventListener('click', ()=>{checkOldPsw(inputOldPassword, inputNewPassword, inputNewRptPassword)})
    }
    // POST TO SERVER
    const btnLogOut = document.querySelector('.btn_log-out');

    if (btnLogOut != undefined || btnLogOut != null) {
        function deleteSession() {
            let xhr = new XMLHttpRequest();

            xhr.open('POST', '/logout');
            xhr.send();
            xhr.onload = () => {
                document.location = '/';
            }
        }

        btnLogOut.addEventListener('click', deleteSession)
    }
    // Отправляет картинку на сервер
    if (blockUserImages != undefined) {
        const image = document.querySelector('.form_settings__image');

        function uploadImage(e) {
            let src = JSON.stringify({
                src: e.firstChild.src
            });
            let xhr = new XMLHttpRequest();

            xhr.open('PUT', '/settings/upluad-user-image');

            xhr.setRequestHeader('Content-Type', 'application/json');//установка формы заброса

            xhr.send(src);

            xhr.onerror = (err) => {
                console.error(err);
            }

            //
            image.animate([{opacity:0}, {opacity:1}], {duration: 1000, iterations: 1})
            image.src = e.firstChild.src;
        }
        deleteUserImg.addEventListener('click', (e) => {
            uploadImage({
                firstChild: {
                    src: "https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"
                }//установка картинки по дефолду
            })
        })
        for (let i = 0; i < blockUserImages.children.length; i++) {
            let element = blockUserImages.children[i];
            element.addEventListener('click', (e) => {
                uploadImage(element); //Отправка ссылки на картинку на сервер
            })
        }
    }
}


document.addEventListener("DOMContentLoaded", ready);
// Настройки пользователя
const blockUserImages = document.querySelector('.choose_image');
const deleteUserImg = document.getElementById('delete_profile_image');
let preloadAvatar = document.getElementById('profileImageWindow');
// Настройки регистрацинные данные
const inputOldPassword = document.getElementById('oldPassword');
const inputNewPassword = document.getElementById('newPassword');
const inputNewRptPassword = document.getElementById('newRptPassword');
const btnChangePassword = document.getElementById('changePassword');
const incorrectMessage = document.getElementById('incorrectMessage');

let dropArea = document.querySelector('#dropArea'),
 inputFile = document.getElementById('avatar'),
 events = ['dragstart', 'dragenter', 'dragover' ,'dragleave', 'dragend', 'drop'];

function creatWindow(err, time = 5 * 1000){
    let div = document.createElement('div');
    div.className = 'err_window';
    div.innerHTML = `
        <h2>Что-то не так</h2>
        <hr>
        <div style="height:100px"><span>${err ? err : "Ничего"}</span></div>
        <hr>
        <button id="closeErrWindow" class="btnOk">ок</button>
        `

    document.body.append(div);

    document.querySelector(' #closeErrWindow').onclick = () => {
        close(div);
    }
    setTimeout(()=>{
        close(div);
    }, time)
}
function close(el){
    if(el)el.remove()
}
function readFile(input) {
    let file = input.files[0];
    console.log(inputFile.files)
    if(!file) return;
    if(input.files.length != 1)inputFile.files = {0:file, length: 1};
    let type = file.type.split('/')[1];
    
    if(file.size > 3 * 1024 * 1024) {
        creatWindow(`Размер вашего файла(${(file.size / 1024 / 1024).toFixed(2)} мб) превышает допустимый!!!`, 8 * 1000);
        inputFile.value = '';
        return;
    }else if(file.type !== "image/png" &&
            file.type !== "image/jpg" &&
            file.type !== "image/jpeg"){
        creatWindow(`Ваш файл имеет не допустимое расширение(${type})`, 8 * 1000);
        inputFile.value = '';
        return;
    }

    let reader = new FileReader();

    reader.readAsDataURL(file);
    console.log(file)
    reader.onload = function () {
        preloadAvatar.src = reader.result
        console.log(reader);
    };

    reader.onerror = function () {
        console.error(reader.error);
    };


}
// Регистрационные данные -> меняем пароль
if (inputOldPassword != undefined && inputNewPassword != undefined) {
    function checkPsw(psw, rptPsw) {
        if (psw.value == '') {
            psw.style.background = "";
            rptPsw.style.background = "";
            incorrectMessage.innerHTML = '';
        } else if (psw.value.length < 6) {
            incorrectMessage.innerHTML = 'Пароль должен быть не менее 6 символов';
            psw.style.background = "#ffaca6";
        } else {
            psw.style.background = "#aaffa6";
            if (psw.value == rptPsw.value) {
                rptPsw.style.background = "#aaffa6";
                incorrectMessage.innerHTML = '';
            } else if (psw.value != rptPsw.value) {
                rptPsw.style.background = "#ffaca6";
                incorrectMessage.innerHTML = 'Пароли не совпадают!!!'
            }
        }

    }

    function checkOldPsw(oldPsw, newPsw, newRptPsw) {

        let password = JSON.stringify({
            oldPassword: oldPsw.value,
            newPassword: newPsw.value,
            newRptPassword: newRptPsw.value
        });

        if (oldPsw.value == "" && newPsw.value == "" && newRptPsw.value == "") { // Если ничего не введено
            oldPsw.style.background = "#ffaca6";
            newPsw.style.background = "#ffaca6";
            newRptPsw.style.background = "#ffaca6";
            incorrectMessage.innerHTML = "Ничего не введено";
            setTimeout(() => {
                oldPsw.style.background = "";
                newPsw.style.background = "";
                newRptPsw.style.background = "";
                incorrectMessage.innerHTML = "";
            }, 5000)
            return;
        }
        let xhr = new XMLHttpRequest();

        xhr.open('PUT', '/settings/registration-data/change-account-password'); //Установка типа запроса и адрес

        xhr.setRequestHeader('Content-Type', 'application/json'); //Установка формы отправки

        xhr.send(password); // Отправка на сервер

        xhr.onload = function () { // Когда пришел ответ с сервера, то выполняется это
            let res = JSON.parse(xhr.responseText);

            if (res.isInvalidPassword != undefined) {
                if (res.isInvalidPassword) {
                    oldPsw.style.background = "#ffaca6";
                    incorrectMessage.innerHTML = `Неправильный пароль`;
                } else {
                    newRptPsw.style.background = "";
                    newPsw.style.background = "";
                    oldPsw.style.background = "";
                    newPsw.value = "";
                    newRptPsw.value = "";
                    oldPsw.value = "";
                    incorrectMessage.style.color = "#0bff00";
                    incorrectMessage.innerHTML = `Пароль успешно изменен`;
                    setTimeout(() => {
                        incorrectMessage.style.color = "red";
                        incorrectMessage.innerHTML = "";
                    }, 5000)
                }
            } else if (res.errorMessage != undefined) {
                incorrectMessage.style.color = "red";
                if (res.errorMessage == 0) {
                    incorrectMessage.innerHTML = "Пароли не совпадают!!!";
                } else if (res.errorMessage == 1) {
                    incorrectMessage.innerHTML = "Длина пароля менее 6 символов";
                }
            }

        }
    }
    inputOldPassword.addEventListener('keyup', () => {
        checkPsw(inputOldPassword, "")
    });
    inputNewPassword.addEventListener('keyup', () => {
        checkPsw(inputNewPassword, inputNewRptPassword)
    });
    inputNewRptPassword.addEventListener('keyup', () => {
        checkPsw(inputNewPassword, inputNewRptPassword)
    });
    btnChangePassword.addEventListener('click', () => {
        checkOldPsw(inputOldPassword, inputNewPassword, inputNewRptPassword)
    })
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
    let image = document.querySelector('#profileImageWindow');

    function uploadImage(url) {
        let src = JSON.stringify({
            src: url
        });
        let xhr = new XMLHttpRequest();

        xhr.open('POST', '/settings/upload');

        xhr.setRequestHeader('Content-Type', 'application/json'); //установка формы заброса

        xhr.send(src);

        xhr.onerror = (err) => {
            console.error(err);
        }


    }
    deleteUserImg.addEventListener('click', (e) => {
        image.src = "https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"; //установка картинки по дефолду)
    })
    for (let i = 0; i < blockUserImages.children.length; i++) {
        let element = blockUserImages.children[i];
        element.addEventListener('click', (e) => {
            image.animate([{
                opacity: 0
            }, {
                opacity: 1
            }], {
                duration: 1000,
                iterations: 1
            })
            image.src = e.target.src;
        })
    }
    document.getElementById('pullImage').addEventListener('click', (e) => {
        uploadImage(image.src); //Отправка ссылки на картинку на сервер

    })
}


events.forEach(eventName => {
    dropArea.addEventListener(eventName, (e)=>{
        if(eventName == 'dragover' || eventName == 'drop') preventDefaults(e);
        if(eventName == 'dragstart' || eventName == 'dragenter') highlight(e);
        else if(eventName != 'dragover') unhighlight(e);
    }, false)
})

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.toggle('highlight');
    document.querySelector('#description').style.display = 'none';
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
    document.querySelector('#description').style.display = 'block';
}

dropArea.addEventListener('drop', (e) => {
    inputFile.files = e.dataTransfer.files
    readFile(inputFile)
})
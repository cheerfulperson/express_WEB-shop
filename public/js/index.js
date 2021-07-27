const password = document.getElementById('password');
const passwordRepeat = document.getElementById('passwordRepeat');
const showPasswordBtn = document.querySelectorAll('.password');
const registerBtn = document.getElementById('regBtn');
const btnMenu = document.getElementById('getUserMenu');
const helperMenu = document.getElementById('addHelperMenu');
const textCheckPsw = document.getElementById('checkPsw');

// Главная страница
const subMenu = document.getElementById('submenu');
const menuOfCategories = document.querySelectorAll('.categories ul li');
const blockOfMenu = document.querySelector('.categories');

// Функция отправки запроса:
async function getDataFromServer(url = '', method, block) {
    try {
        // Default options are marked with *
        await new Promise((resolve, reject) => setTimeout(resolve, 100));
        const res = await fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await res.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
async function pullDataToServer(url = '', method, block){

}
if (subMenu != undefined) {
    function createContent(arr) {
        for (let n in arr) {
            subMenu.innerHTML += `<li class="ratio_image submenu-element"><img src="${arr[n].image}" alt=""><a href="${arr[n].href}">${arr[n].title}</a></li>`;
        }
        const btnCloseSubmenu = document.getElementById('btnCloseSubmenu');

        btnCloseSubmenu.addEventListener('click', () => { //Конопочка зайкрыть срабатывает
            subMenu.style.display = 'none';
            blockOfMenu.style.paddingBottom = paddingBottom;
        })
    }

    function getSubMenu(element) {
        subMenu.innerHTML = ` <button class="submenu-button btn-close" id="btnCloseSubmenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-x"
                viewBox="0 0 16 16">
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </button>`;
        blockOfMenu.style.paddingBottom = 0;
        subMenu.style.display = 'inline-block';

        getDataFromServer('/categories', 'POST')
            .then((data) => {
                for (let n in data) {
                    if (data[n].identNumber == Number(element.id)) {
                        createContent(data[n].submenuContent);
                    }
                }
                // JSON data parsed by `response.json()` call
            });
    }
    let paddingBottom = blockOfMenu != undefined ? getComputedStyle(blockOfMenu).paddingBottom : null; // Собрал стили у меню категорий

    for (let i = 0; i < menuOfCategories.length; i++) {
        menuOfCategories[i].addEventListener('click', (e) => {
            getSubMenu(e.target);
        });

    }


}

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
if (showPasswordBtn != undefined) {
    for (let i = 0; i < showPasswordBtn.length; i++) {
        showPasswordBtn[i].children[1].innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z"/>
            </svg>`;
        showPasswordBtn[i].children[1].addEventListener('click', (e) => {
            showPassword(showPasswordBtn[i].children[0], showPasswordBtn[i].children[1]);
        });
    }
}
// Кнопка выйти
document.querySelector('.btn_log-out').addEventListener('click', (e)=>{
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", '/logout', true);
    xhr.send();
    location.reload();
})
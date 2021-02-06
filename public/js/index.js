
function ready() {
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('passwordRepeat');
    const showPasswordBtn = document.querySelectorAll('.password');
    const registerBtn = document.getElementById('regBtn')

    if(password != undefined && passwordRepeat != undefined){
        function getReapetsPSW() {
            if(password.value != '' && passwordRepeat.value != ''){
                if (password.value == passwordRepeat.value && password.value.length >= 6 && passwordRepeat.value.length >= 6) {
                    registerBtn.innerHTML = '<input type="submit" class="registerbtn" value="Register">'
                }else{
                    registerBtn.innerHTML = '<div class="none-registerbtn">Register</div>'
                }
            }
        }

        passwordRepeat.addEventListener('keyup', getReapetsPSW);
        password.addEventListener('keyup', getReapetsPSW);

        getReapetsPSW();
    }

    if(showPasswordBtn != undefined){
        let isShowdPsw = false;
        function showPassword(input, button) {
            if (!isShowdPsw) {
                button.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                </svg>`;
                input.type = 'text';
                isShowdPsw = true;
            }else{
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

    // POST TO SERVER
    const btnLogOut = document.querySelector('.btn_log-out');

    if(btnLogOut != undefined || btnLogOut != null){
        function deleteSession() {
            let xhr = new XMLHttpRequest();
    
            xhr.open('POST', '/logout');
            xhr.send();
            xhr.onload = () => {
                document.location.reload();
            }
        }
    
        btnLogOut.addEventListener('click', deleteSession)
    }
   
}

document.addEventListener("DOMContentLoaded", ready);

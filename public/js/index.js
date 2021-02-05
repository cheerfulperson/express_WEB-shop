
function ready() {
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('passwordRepeat');
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

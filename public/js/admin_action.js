function ready() {
    const content = document.querySelectorAll(".dropdown-content");
    const btn = document.querySelectorAll(".dropbtn")
    // Кнопки
    const edit_acc = document.querySelectorAll(".edit-acc")
    const view_acc = document.querySelectorAll(".view-acc")
    const delete_acc = document.querySelectorAll(".delete-acc")


    if (btn != undefined) {
        window.onclick = function (e) {
            for (let i = 0; i < btn.length; i++) {
                // Клик по кнопке
                btn[i].addEventListener('click', () => {
                    content[i].style.display = "block";
                })

                // Изменить данные аккаунта
                edit_acc[i].onclick = function () {
                    console.log('Изменить?')
                }

                // Посмотеть данные аккаунта

                view_acc[i].onclick = function () {
                    
                }

                // Удалить аккаунт
                delete_acc[i].onclick = function () {
                    console.log('Удалить?')
                }

                // Клик по пустому окну
                if (e.target != btn[i]) {
                    content[i].style.display = "none";
                }
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", ready);
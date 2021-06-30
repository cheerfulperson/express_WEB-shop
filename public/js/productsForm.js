// var a = {a:'foo',b:[1,2,3],g: {q:"8798"}};

// var b = window.btoa(JSON.stringify(a)); 

// console.log(b) // output eyJhIjoiZm9vIiwiYiI6WzEsMiwzXSwiZyI6eyJxIjoiODc5OCJ9fQ

// // restore b again 
// console.log(JSON.parse(window.atob(b))); // output : {a:'foo',b:[1,2,3],g: {q:"8798"}}

// let url = new URL(location.href);

// url.searchParams.set('form', window.btoa(JSON.stringify(a)))

// window.history.pushState("string", "", url);
// console.log(window.atob(url.searchParams.get("form")))

const selectForm = document.getElementById('selection_form').children[0]; // Форма запросы
const dropBtn = document.querySelectorAll('#dropBtn'); // Id кнопки для выпадающего меню

let url = new URL(location.href); // Принимаем текущий url
let pat = new Object(); // Создание глабального объекта для создания заполнения формы

// ---------------> Отвечает за прием запроса с сервера и вывод этой информации(Элементы товара)
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

let scrollMenu = document.querySelector('.scrollmenu'),
    blockOfproducts = document.getElementById('block_with_products'),
    blockCompareProduct = document.getElementById('compareProduct'),
    div;

function loadData() {
    getDataFromServer(window.location.href, 'PUT')
        .then((data) => {
            try {
                products = data.products;
                if (Object.keys(products).length != 0) {
                    if(scrollMenu.children.length != Math.ceil(data.amount / 30)) scrollMenu.innerHTML = "";
                    if (data.amount != 0 && data.amount != undefined && scrollMenu.children.length == 0) {
                        console.log("ffff")
                        for (let i = 1; i <= Math.ceil(data.amount / 30); i++) {
                            scrollMenu.innerHTML += `<button id ="${i}">${i}</button>`;
                        }

                    }
                    if(typeof products[0] == 'object')constructBlockProduct(div, products);
                    else blockOfproducts.innerHTML = `<p>Упс, ничего не нашло</p>`;
                } else {
                    scrollMenu.innerHTML = "";
                    blockOfproducts.innerHTML = `<p>Упс, ничего не нашло</p>`;
                }
            } catch (error) {
                blockOfproducts.innerHTML = `<p>Упс, ничего не нашло</p>`;
                console.error(error);

            }
            // console.log(data, "usagedata: " + (data.dataUsage / 1024).toFixed(1) + " Кбайт");

            // JSON data parsed by `response.json()` call
        });
}
loadData();

function constructBlockProduct(div, products) {
    let shortDescription = "",
        availability = "";
    blockOfproducts.innerHTML = "";
    blockOfproducts.style.filter = "blur(5px)";
    console.log(products)
    for (let index = 0; index < products.length; index++) {
        shortDescription = `<table class="short_product_info_table">`;
        for (let n in products[index].generalInformation) {
            console.log( products[index].generalInformation)
            shortDescription += "<tr>" + "<td>" + products[index].generalInformation[n].name + "</td>" + "<td>" + products[index].generalInformation[n].data + "</td>" + "</tr>";
        }
        if (products[index].availability == "true") availability = `<p style="font-size: small;color:#14ff24">Есть в наличии <i class="bi bi-check"></i></p>`;
        else availability = `<p style="font-size: small;color:red">Нет в наличии <i class="bi bi-x"></i></p>`;
        shortDescription += `</table>`
        div = document.createElement('div');
        div.className = 'product_block';
        div.innerHTML = `
                                <div class="first_block image_container">
                                    <img src="${products[index].photos != undefined ? products[index].photos : 'https://avatanplus.ru/files/resources/original/5968a2c8f2ed115d40bbe123.png'}" alt="" width="50px" height="50px">
                                </div>
                                <div class="middle_block"> 
                                    <div class="product_full_name" style="padding-bottom:5%;">
                                        <a href="/categories/smartphones-and-accessories/mobile-phones/${products[index].prodKey}">
                                            ${products[index].type.split("").map((el, num) => {if(num == 0)return el.toUpperCase();else return el}).join("")} 
                                            ${products[index].brand.split("").map((el, num) => {if(num == 0)return el.toUpperCase();else return el}).join("")} 
                                            ${products[index].prodName}(${products[index].generalInformation.color.data})
                                         </a>
                                    </div>
                                    ${shortDescription}
                                </div>
                                <div class="last_block">
                                    <p>Рейтинг: ${products[index].rating} / 5</p>
                                    <p>Цена: ${products[index].price} Br.</p>
                                    ${availability}
                                    <div class="btn-group">
                                        <button><span><a class="a"
                                                href="/categories/smartphones-and-accessories/mobile-phones/${products[index].prodKey}">Подробнее</a>
                                                </span>
                                        </button>
                                        <button><span>В корзину</span></button>
                                        <button><span>Добавить в сравнение</span></button>
                                    </div>
                                    
                                </div>        `
        blockOfproducts.append(div);
    }
    blockOfproducts.style.filter = "none";
}

function newPage(el) {
    el.style.background = '#18aaaa';
    let url = new URL(window.location.href);
    url.searchParams.set("page", el.id);
    window.history.pushState("string", "", url);
    loadData();
}
scrollMenu.addEventListener('click', (e) => {
    for (let n in scrollMenu.childNodes)
        if (typeof scrollMenu.childNodes[n] == 'object') scrollMenu.childNodes[n].style.background = "";
    if (e.target != scrollMenu) newPage(e.target)
})
// ------------------------------------------------------> конец <---------------------------------------------------------    

for (let n in dropBtn) { // Автоматический поиск элементов которые для которого надо выпадающее меню
    dropBtn[n].onclick = function (e) {
        let dropDown = dropBtn[n].parentElement.childNodes; // Находим у этой кнопки родителя и работаем с ним
        for (let k in dropDown) {
            if (dropDown[k] != undefined && dropDown[k].id == "myDropdown") dropDown = dropDown[k] // Нахождение элемента который надо показать и скрыть
        }
        if (dropDown.classList.contains('show')) dropDown.classList.remove('show'); // contains - поиск подкласса, remove - удаление подкласса, toggle - добавление в класс нового подкласса
        else dropDown.classList.toggle('show');
    }
}

function fillEmptyInputs(el, form) {
    let inputs = el.querySelectorAll('input'),
        input;
    for (let n in form) {
        for (let i = 0; i < inputs.length; i++) {
            input = inputs[i];
            if (input.getAttribute('type') == "checkbox") {
                if (input.value == form[n]) input.checked = true;
            } else if (input.getAttribute('type') == "number") {
                if (input.id == "to") {
                    if (form[n].max != null) input.value = form[n].max;
                } else if (form[n].min != null) input.value = form[n].min;
            }
        }
    }
}

function fillObjectForm(el, form) {
    let element, attribute;
    if (typeof el == 'object') {

        if (hadObjectVeribles(el)) {
            for (let i = 0; i < el.children.length; i++) {
                element = el.children[i];
                attribute = element.getAttribute('objectVariable');
                if (attribute != undefined) {
                    for (let n in form) {
                        if (n == attribute) fillObjectForm(element, form[n]);
                    }
                }
            }
        } else {

            fillEmptyInputs(el, form);
        }
    }
}

function fillForm(url) {
    try {
        let fromObj = JSON.parse(decodeURIComponent(url.searchParams.get('form'))),
            el;
        for (let i = 0; i < selectForm.children.length; i++) {
            el = selectForm.children[i];
            if (el.getAttribute('objectVariable') != undefined) {
                let objectVariable = el.getAttribute('objectVariable');
                for (let n in fromObj) {
                    if (n == objectVariable) {
                        if (!hadObjectVeribles(el)) {
                            fillEmptyInputs(el, fromObj[n]);
                        } else {
                            fillObjectForm(el, fromObj[n]);
                        }
                    }
                }
            }
        }
        console.log(fromObj)
    } catch (err) {
        url.searchParams.delete('form');
        alert("Ошибка: " + err + "\nНажмите на ок, чтобы перезагрузить страницу!!!");
        window.history.pushState("string", "", url);
        location.reload();
    }


}
fillForm(new URL(location.href));

function hadObjectVeribles(el, depth) { // Реккурсивная функция для определения в элементе есть ли элементы с objectVariable, если да - это Object
    if (typeof el == 'object') {
        if (el.children.length != 0) {
            if (el.getAttribute('objectVariable') == undefined || !depth)
                for (let n in el.children)
                    return hadObjectVeribles(el.children[n], 1);
            else return true;
        }
    }
    return false;
}

function hadSeveralInputs(el) { // Нахждение нескольких видов input
    let inputs = el.querySelectorAll('input'),
        isCheckbox = false,
        isNumber = false;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('type') == "checkbox") isCheckbox = true;
        else if (inputs[i].getAttribute('type') == "number") isNumber = true;
    }
    return isCheckbox == isNumber && isCheckbox == true ? true : false;
}

function leadToNum(el) { // Для изменения строки в числа
    return isNaN(el) ? el : Number(el);
}

function createInvalidData(inputs, isInvalid) {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('type') == "number") {
            if (isInvalid) inputs[i].style.background = "yellow";
            else inputs[i].style.background = "";
        }
    }
}

function fillArray(el, depth = 0) { // Заполнение массива данными из формы
    let value = [],
        range = {
            min: null,
            max: null
        },
        inputs = el.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('type') == "checkbox") {
            if (inputs[i].checked) value.push(leadToNum(inputs[i].value))
        } else if (inputs[i].getAttribute('type') == "number") {

                if (inputs[i].id == "to") range.max = inputs[i].value != "" || inputs[i].value != 0 ? leadToNum(inputs[i].value) : null;
                else range.min = inputs[i].value != "" || inputs[i].value != 0 ? leadToNum(inputs[i].value) : null;
        }
    }
    
    if (range.min > range.max && range.max != undefined) {
        createInvalidData(inputs, true);
    } else if (range.min != null || range.max != null) {
        createInvalidData(inputs, false);
        value.push(range);
    }if (range.min == null && range.max == null) {
        createInvalidData(inputs, false);
        value = value.map(el =>{ if(el != range) return el;});
    }
    return value.sort();
}

function fillObject(el, depth = 0) {
    let value = {};
    let element, attribute;
    if (typeof el == 'object') {

        if (hadObjectVeribles(el)) {
            for (let i = 0; i < el.children.length; i++) {
                element = el.children[i];
                attribute = element.getAttribute('objectVariable');
                if (attribute != undefined) {
                    value[attribute] = fillObject(element);
                }
            }
        } else {

            return fillArray(el);
        }
    }
    return value;
}
function clearEmpties(obj) {
    for (var k in obj) {
      if (!obj[k] || typeof obj[k] !== "object") {
        continue // If null or not an object, skip to the next iteration
      }
      // The property is an object
      clearEmpties(obj[k]); // <-- Make a recursive call on the nested object
      if (Object.keys(obj[k]).length === 0) {
        delete obj[k]; // The object had no properties, so delete that property
      }
    }
  }
function fillPat() {
    let el;
    for (let i = 0; i < selectForm.children.length; i++) {
        el = selectForm.children[i];
        if (el.getAttribute('objectVariable') != undefined) {
            let objectVariable = el.getAttribute('objectVariable');
            if (!hadObjectVeribles(el)) pat[objectVariable] = fillArray(el);
            else pat[objectVariable] = fillObject(el);          
        }
    }
    clearEmpties(pat);
    if (Object.keys(pat).length != 0) {
        url = new URL(location.href);
        url.searchParams.forEach((value, key, obj) => {
            if (key != "form" && key != "page") url.searchParams.delete(key);
        }) // Удаление шлака, если пользователь захотел побаловаться
        url.searchParams.set('form', encodeURIComponent(JSON.stringify(pat)));
        // fillForm(new URL(location.href));
    } else url.searchParams.delete('form');
    window.history.pushState("string", "", url);
    loadData();
    console.log(pat)
}
document.getElementById('compareProduct').addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.submitter.id == "send") fillPat();
});
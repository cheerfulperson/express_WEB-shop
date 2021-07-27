const db = require('../modules/DB-config');
const hbs = require('handlebars');

function gethelperMenu(req, res) {
  hbs.registerHelper('getMainMenu', (s) => {
    let user = req.session.user;
    let typeUser = '';

    // Категории в спомогательном меню
    let arrayOfuserLocks = [
      [{
        href: '/',
        name: 'Мои объявления',
        typeUser: 1
      }, {
        href: '/',
        name: 'Добавить товар',
        typeUser: 1
      }, {
        href: '/',
        name: 'Все товары',
        typeUser: 2
      }, {
        href: '/',
        name: 'Избранные товары',
        typeUser: 0
      }, {
        href: '/',
        name: 'Избранные продавцы',
        typeUser: 0
      }],
      [{
        href: '/',
        name: 'Управление акциями',
        typeUser: 1
      }, {
        href: '/',
        name: 'Добавить акцию',
        typeUser: 1
      }, {
        href: '/',
        name: 'Управление новостями',
        typeUser: 2
      }],
      [{
        href: '/member',
        name: 'Участники',
        typeUser: 2
      }, {
        href: '/',
        name: 'Все комментарии',
        typeUser: 2
      }, {
        href: '/',
        name: 'Мои комментарии',
        typeUser: 0
      }, {
        href: '/',
        name: 'Мои сообщения',
        typeUser: 0
      }, {
        href: '/site-settings',
        name: 'Настройки сайта',
        typeUser: 2
      }],
      [{
        href: '/',
        name: 'Журнал действий',
        typeUser: 2
      }, {
        href: '/',
        name: 'Обратная связь',
        typeUser: 0
      }, {
        href: '/settings',
        name: 'Настройки',
        typeUser: 0
      }]
    ];

    // Проверка на тип пользователя
    if (user.role_user == "USER") typeUser = 'Пользователь';
    else if (user.role_user == "SELLER") typeUser = 'Продавец';
    else if (user.role_user == "ADMIN") typeUser = 'Админ';

    // Создание блока
    let block = '<p>Вы вошли как ' + typeUser + ' <b>' + user.name + '</b></p><hr>';

    // Заполнение блока относительно типа пользователя
    for (let i = 0; i < arrayOfuserLocks.length; i++) {
      let arr = arrayOfuserLocks[i];
      for (let j = 0; j < arr.length; j++) {
        let el = arr[j];
        if (typeUser == 'Пользователь') {
          if (el.typeUser == 0) block += `<a href=${el.href}><span>${el.name}</span></a>`
        } else if (typeUser == 'Продавец') {
          if (el.typeUser == 0 || el.typeUser == 1) block += `<a href=${el.href}><span>${el.name}</span></a>`
        } else if (typeUser == 'Админ') {
          block += `<a href=${el.href}><span>${el.name}</span></a>`
        }
      }
      if (i != arrayOfuserLocks.length - 1) block += '<hr>'
    }
    return new hbs.SafeString(block);
  })
}
// Функция для образования профиля, зашедшего пользователя
function getLoginUserProfil(req, res) {
  hbs.registerHelper('getLoginUserProfil', (block) => {
    if (req.session.user != undefined && req.session.user.status == "login") {
      if (block.data.root.isUser == undefined) {
        block.data.root.isUser = true;
      }
    } else {
      block.data.root.isUser = false;
    }
  })
}

function getProfileImage(req, res) {
  if (req.session.user) {
    db.query(`SELECT photo FROM mytable WHERE email=?`, [req.session.user.email], (err, result) => {
      try {
        if (result[0].photo != req.session.user.profileImage && req.session.user.profileImage) {
          req.session.user.profileImage = result[0].photo;
        }
        hbs.registerHelper('profileImage', () => {
          let stackUrl = "https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png";
          return req.session.user.profileImage != '' ? req.session.user.profileImage : stackUrl;
        })
      } catch (error) {
        console.error(err, error)
      }
    })
  }
}

function viewModuls() {
  function getInputesElement(el, units) {
    let str = '',
      data;
    for (let i = 0; i < el.view.length; i++) {
      let viewElement = el.view[i];
      if (viewElement == "checkBox") {
        if (el.content.length > 5) {
          str += '<div class="custom-select" style="width:200px;"><input type="button" id="dropBtn" class="dropbtn" value="Выбор элементов >"><div id="myDropdown" class="dropdown-content">';
          for (let j = 0; j < el.content.length; j++) {
            data = el.content[j];
            str += `
            <label title="${el.content[i]}">
              <span><input type="checkbox" value="${data}"></span>
              <span>${data}${units}</span>
            </label>`;
          }
          str += '</div></div>';
        } else {
          str += '<ul>';
          for (let j = 0; j < el.content.length; j++) {
            data = el.content[j];
            str += `
            <li>
              <label title="${data}">
                <span><input type="checkbox" value="${data}"></span>
                <span>${data}${units}</span>
              </label>
            </li>`;
          }
          str += '</ul>';
        }

      } else if (viewElement[0] != undefined && viewElement[0] == "inputs") {
        str += '<div class="filter_group" style="display: flex;justify-content: center;align-items: center;">';
        let sorted = typeof el.content == 'object' ? el.content.map(el => {
          return Number(el)
        }).sort() : el.content;

        for (let key = 0; key < viewElement[1]; key++) {
          str += `
          <div class="filter_group_element">
              <span><input type="number" style="width:50px" min="0" id="${key == 0 ? "from" : "to"}" placeholder="${typeof el.content == 'object' ? key == 0 ? "От" : "До" : el.content}"></span>
          </div>`;
        }
        str += '</div>';
      }
    }
    return str;
  }
  hbs.registerHelper("ViewModuls", (data) => {
    let block = "",
      el, units = "";
    for (let key in data) {
      el = data[key];
      if (el.data != undefined) {
        units = "";
        if (el.data.units != undefined) units = el.data.units;
        block += `
        <div id="${key}" objectVariable="${key}">
          <h3>${el.name}</h3>        
          ${getInputesElement(el.data, units)}
        </div>`;
      }
    }

    return new hbs.SafeString(block);
  })
}
module.exports = {
  createHelpMenu: gethelperMenu,
  getIsUser: getLoginUserProfil,
  getAvatar: getProfileImage,
  viewModuls: viewModuls
}
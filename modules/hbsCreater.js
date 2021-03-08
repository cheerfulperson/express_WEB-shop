const hbs = require('handlebars');

function gethelperMenu(req, res) {
    hbs.registerHelper('getMainMenu', (s)=>{
        let user = req.session.user;
        let typeUser = '';
        
        // Категории в спомогательном меню
        let arrayOfuserLocks = [
          [
            {
              href: '/',
              name: 'Мои объявления',
              typeUser: 1
            },{
              href: '/',
              name: 'Добавить товар',
              typeUser: 1
            },{
              href: '/',
              name: 'Все товары',
              typeUser: 2
            },{
              href: '/',
              name: 'Избранные товары',
              typeUser: 0
            },{
              href: '/',
              name: 'Избранные продавцы',
              typeUser: 0
            }],[
              {
                href: '/',
                name: 'Управление акциями',
                typeUser: 1
              },{
                href: '/',
                name: 'Добавить акцию',
                typeUser: 1
              },{
                href:'/',
                name:'Управление новостями',
                typeUser: 2
              }
            ],[
            {
              href:'/member',
              name:'Участники',
              typeUser: 2
            },{
              href:'/',
              name:'Все комментарии',
              typeUser: 2
            },{
              href:'/',
              name:'Мои комментарии',
              typeUser: 0
            },{
              href:'/',
              name:'Мои сообщения',
              typeUser: 0
            },{
              href:'/stats',
              name:'Статистика сайта',
              typeUser: 2
            }
          ],[
            {
              href:'/',
              name:'Журнал действий',
              typeUser: 2
            },{
              href:'/',
              name:'Обратная связь',
              typeUser: 0
            },{
              href:'/settings',
              name:'Настройки',
              typeUser: 0
            }
          ]]; 
        
        // Проверка на тип пользователя
        if(user.role_user == "USER") typeUser = 'Пользователь';
        else if(user.role_user == "SELLER") typeUser = 'Продавец';
        else if(user.role_user == "ADMIN") typeUser = 'Админ';
        
        // Создание блока
        let block = '<p>Вы вошли как ' + typeUser + ' <b>' + user.name + '</b></p><hr>';

        // Заполнение блока относительно типа пользователя
        for (let i = 0; i < arrayOfuserLocks.length; i++) {
          let arr = arrayOfuserLocks[i];
            for (let j = 0; j < arr.length; j++) {
              let el = arr[j];
              if(typeUser == 'Пользователь'){
                if(el.typeUser == 0) block += `<a href=${el.href}><span>${el.name}</span></a>`
              }else if (typeUser == 'Продавец'){
                if(el.typeUser == 0 || el.typeUser == 1) block += `<a href=${el.href}><span>${el.name}</span></a>`
              }else if (typeUser == 'Админ'){
                  block += `<a href=${el.href}><span>${el.name}</span></a>`
              }
            }
          if(i != arrayOfuserLocks.length - 1)block += '<hr>'
        }
        return new hbs.SafeString(block);
      })
}
// Функция для образования профиля, зашедшего пользователя
function getLoginUserProfil(req, res){
  hbs.registerHelper('getLoginUserProfil', (block) => {
    if(req.session.user != undefined && req.session.user.status == "login"){
      if( block.data.root.isUser == undefined){
        block.data.root.isUser = true;
      }  
    }else{
      block.data.root.isUser = false;
    }
  })
}
function getProfileImage(req, res) {
  // console.log(req.session.user)
  hbs.registerHelper('profileImage', () => {
    let stackUrl = "https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png";
    return req.session.user.profileImage != '' ? req.session.user.profileImage : stackUrl;
  })
}
module.exports = {
  createHelpMenu: gethelperMenu,
  getIsUser: getLoginUserProfil,
  getAvatar: getProfileImage
}
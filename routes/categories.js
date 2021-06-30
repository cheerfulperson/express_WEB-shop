const express = require('express');
const hbs = require('handlebars');
const fs = require('fs');
const createError = require('http-errors');

// Модули
const db = require('../modules/DB-products');
const Patterns = require('../modules/productsPatterns');
const hbsCreater = require('../modules/hbsCreater');



const router = express.Router();

function getDataUsage(str) { // Обьем буфера с базы данных
  return Buffer.byteLength(JSON.stringify(str), 'utf-8');
}

// Используется для всего адреса /categories
router.use('/', (req, res, next) => {
  hbsCreater.viewModuls();
  // Читаю файл с категориями
  let categories = fs.readFileSync('./jsonPatterns/categories.json', "utf-8");
  categories = JSON.parse(categories);
  // Создаю хэлпер
  hbs.registerHelper('categories', (block) => {
    // Загружаю в корень с данными, передаваемых в hbs категории
    block.data.root.categories = categories;
  })
  next();
})
router.get('/insert', (req, res, next) => {
  for (let i = 0; i < 276; i++) {
    //
    db.query(`INSERT INTO products_and_description (id, category, prodKey, type, brand, prodName, rating, price, discount, photos, availability, generalInformation, description) VALUES (NULL, 'mobile-phones', '212134100${i}', 'cмартфон', 'huawei', 'PP455A-LX4', '${Number((Math.random() * 5.1).toFixed(1))}', '${Math.round((Math.random() * 0.9) * 1000)}', NULL, '[\"https://www.lg.com/ru/images/plp-b2c/b2c-3/ru-smartphones-categoryselctor-1.jpg\"]', 'true', '{\r\n \"marketLaunchDate\": \"2020\",\r\n \"OS\": \"Android\",\r\n \"OSversion\": \"Android 10.0\",\r\n \"brandedGraphicalInterface\": \"EMUI (10.1)\",\r\n \"rule\": \"P Smart 2021 (Huawei)\",\r\n \"screenSize\": \"6.67\",\r\n \"screenResolution\": \"1080x2400\",\r\n \"numOfmainCamera\": 4,\r\n \"mainCamera\": \"48 Мп + 8 Мп + 2 Мп + 2 Мп\",\r\n \"frontCamera\": \"8 Мп\",\r\n \"RAM\": 4,\r\n \"fashMemory\": 128,\r\n \"supportForMemoryCards\": \"microSD (до 512 ГБ)\",\r\n \"numOfSIMcards\": 2,\r\n \"SIMCardFormat\": \"nano-SIM\",\r\n\"color\": \"черный\"\r\n }', '\r\n{ \r\n\r\n    \"CPU\": {\r\n   \r\n    \"platform\": \"HiSilicon\",\r\n   \r\n    \"processorType\": \"HiSilicon Kirin 710A\",\r\n   \r\n    \"CPUclockSpeed\": \"2000 MHz\",\r\n   \r\n    \"numberOfCores\": 8,\r\n   \r\n    \"CPUmicroarchitecture\": \"4 x Cortex-A73 2.0 GHz + 4 x Cortex-A53 1.7 GHz\",\r\n   \r\n    \"processorSize\": \"64 bits\",\r\n   \r\n    \"technicalProcess\": \"12 nm\",\r\n   \r\n    \"GraphicsAccelerator\": \"Mali-G51 MP4\"\r\n   \r\n    },\r\n   \r\n    \"design\": {\r\n   \r\n    \"design\": \"моноблок\",\r\n   \r\n    \"bodyMaterial\": \"пластик\",\r\n   \r\n    \"glassConstruction\": \"2.5D\",\r\n   \r\n    \"shockproofHousing\": \"нет\",\r\n   \r\n    \"color\": \"черный\",\r\n   \r\n    \"separateSlots\": \"нет\",\r\n   \r\n    \"dustAndMoistureProtection\": null\r\n   \r\n    },\r\n   \r\n    \"screen\": {\r\n   \r\n    \"screenResolution\": \"1080x2400\",\r\n   \r\n    \"screenSize\": \"6.67",\r\n   \r\n    \"screenTechnology\": \"IPS\",\r\n   \r\n    \"pixelDensity\": \"395 ppi\",\r\n   \r\n    \"touchScreen\": \"да\",\r\n   \r\n    \"frequency\": \"60 Гц\"\r\n   \r\n    },\r\n   \r\n    \"mainCamera\": {\r\n   \r\n    \"resolution\": \"48 Мп\",\r\n   \r\n    \"diaphragm\": \"ƒ/1.8\",\r\n   \r\n    \"optionalCameraModule\": \"есть, датчик глубины, широкоугольный, макрообъектив\",\r\n   \r\n    \"resolutionOfTheOptionalCameraModule\": \"8 Мп (широкоугольный), 2 Мп (датчик глубины и макрообъектив)\",\r\n   \r\n    \"apertureOfAdditionalModule\": \" ƒ / 2.4 (x3)\",\r\n   \r\n    \"focusing\": \"автоматическая\",\r\n   \r\n    \"flash\": \"LED\",\r\n   \r\n    \"imageStabilization\": \"цифровая\",\r\n   \r\n    \"maximumPhotoPesolution\": \"8000 × 6000\",\r\n   \r\n    \"maximumVideoResolution\": \"1920 × 1080 (FullHD)\",\r\n   \r\n    \"maxVideoFrameRate\": \"30fps\"\r\n   \r\n    },\r\n   \r\n    \"frontCamera\": {\r\n   \r\n    \"resolution\": \"8 Мп\",\r\n   \r\n    \"diaphragm\": \"ƒ/2.0\",\r\n   \r\n    \"maximumPhotoPesolution\": \"3264×2448\",\r\n   \r\n    \"maximumVideoResolution\": \"1920 × 1080 (FullHD)\"\r\n   \r\n    },\r\n   \r\n    \"functions\": {\r\n   \r\n    \"stereoSpeakers\": \"нет\",\r\n   \r\n    \"registeringTheForceOfPressing\": \"нет\",\r\n   \r\n    \"vibratingAlert\": \"есть\",\r\n   \r\n    \"formatSupport\": \"MP3, AAC, WAV, MP4, FLAC, AMR, 3GP, OGG, Midi\",\r\n   \r\n    \"dataTransfer\": \"LTE (стандарт сетей 4G), UMTS (стандарт сетей 3G), GSM (стандарт сетей 2G)\",\r\n   \r\n    \"GSMstandard2G\": \"900, 1800, 1900, 850\",\r\n   \r\n    \"securityAndUnlocking\": \"сканер отпечатка пальца, разблокировка по лицу\",\r\n   \r\n    \"FMreceiver\": \"есть\",\r\n   \r\n    \"navigation\": \"GPS, GLONASS, A-GPS, Beidou\"\r\n   \r\n    },\r\n   \r\n    \"sensors\": {\r\n   \r\n    \"accelerometer\": \"есть\",\r\n   \r\n    \"lightSensor\": \"есть\",\r\n   \r\n    \"proximitySensor\": \"есть\",\r\n   \r\n    \"compass\": \"есть\",\r\n   \r\n    \"gyroscope\": \"есть\"\r\n   \r\n    },\r\n   \r\n    \"interfaces\": {\r\n   \r\n    \"WiFi\": \"802.11 n\",\r\n   \r\n    \"bluetooth\": \"есть\",\r\n   \r\n    \"bluetoothVersion\": \"5.1\",\r\n   \r\n    \"NFC\": \"есть\",\r\n   \r\n    \"connectionSocket\": \"USB Type-C\",\r\n   \r\n    \"audioOutput\": \"3.5mm jack\"\r\n   \r\n    },\r\n   \r\n    \"battery\": {\r\n   \r\n    \"type\": \"Li-ion\",\r\n   \r\n    \"capacity\": \"5000 мАч\",\r\n   \r\n    \"USBcharging\": \"есть\",\r\n   \r\n    \"chargingProcess\": \"быстрая зарядка, стандартная зарядка\",\r\n   \r\n    \"nonRemovable\": \"есть\"\r\n   \r\n    },\r\n   \r\n    \"equipment\": {\"equipment\": \"руководство пользователя, зарядное устройство, скрепка для извлечения SIM-карты, наушники, кабель USB Type-C\"}\r\n   \r\n    }');`)
  }
  res.send('hi')
})
router.route('/smartphones-and-accessories/:category')
  .get((req, res, next) => {
    let category = req.params['category']; // Название категории
    let pats = category.split('-').join(''); // Расшифровка из названия категории название шаблона(делаем сплошное слово)
    let productPattern = new Patterns(pats); // Это собственный модуль

    if (productPattern.patterns.patternForCompare != undefined) {
      productPattern.description = productPattern.patterns.patternForCompare;
      res.render('layouts/categories-listWithProducts', {
        title: "Мобильные телефоны",
        isVisibleCategories: true,
        isVisibleCatalog: true,
        section: productPattern.join() // 0 - Шаблон продукта, 1 - Шаблон для сравнения
      });
    } else {
      next(createError(404));
    }
  })
  .put(async (req, res, next) => {
    let patt,
      category = req.params['category'], // Название категории
      pats = category.split('-').join(''), // Расшифровка из названия категории название шаблона(делаем сплошное слово)
      amount = 0,
      form = req.query.form != undefined ? JSON.parse(decodeURIComponent(req.query.form)) : null,
      sql = `SELECT COUNT(*) as amount FROM products_and_description WHERE category = '${category}'`,
      page = req.query.page != undefined ? (req.query.page - 1) * 30 : 0; // Если НАчальная страница, то вывод элементов с 0, а если нет, то с определенного числа!!! page - страничка

    if (form != undefined || Object.keys(form == undefined ? {} : form).length != 0) {
      let productsArray = [];
      sql = `SELECT * FROM products_and_description WHERE category = '${category}' LIMIT 0, 100`;
      db.query(sql, (err, results) => {
        if (err) throw new Error(err);
        try {
          productsArray = [];
          for (let i = 0; i < results.length; i++) {
            results[i].generalInformation = JSON.parse(results[i].generalInformation); // Парсим в объект
            results[i].photos = JSON.parse(results[i].photos)[0]; //Получаем ссылки на фотографии
            results[i].description = null // JSON.parse(results[i].description)
            patt = new Patterns(pats); // Для каждого продукта создаем собственный класс
            if (patt.patterns.defoldPattern != undefined) {
              if (patt.compare(results[i], form)) { // Отбираем товар относительно формы запроса
                patt.description = results[i]; // Работа с классом, получаем шаблон и передаем данные в этот класс для их обработки
                results[i] = patt.join() //Соединение шаблона продукта и сырого описания из бд    
                productsArray.push(results[i]); //Собираем массив товара
                amount++; // Подсчет
              }
            } else {
              next(createError(404));
            }
          }
        } catch (error) {
          console.error(error)
        }
        res.send({
          amount: amount,
          products: productsArray.slice(page, page + 30),
          dataUsage: getDataUsage(productsArray)
        })
      })
    } else {
      db.query(sql, (err, results) => {
        if (err) throw new Error(err);

        amount = results[0].amount; // Колличество товаров с такой категорией
        sql = `SELECT id,category,prodKey,type,brand,prodName,rating,price,photos,availability,generalInformation FROM products_and_description WHERE category = '${category}' LIMIT ${page}, 30 `;
        db.query(sql, (err, results) => {
          try {
            if (err) console.error(err);
            for (let n = 0; n < results.length; n++) { // Обработка полученной информации     
              results[n].generalInformation = JSON.parse(results[n].generalInformation); // Парсим в объект
              results[n].photos = JSON.parse(results[n].photos)[0]; //Получаем ссылки на фотографии
              patt = new Patterns(pats); // Для каждого продукта создаем собственный класс
              if (patt.patterns.defoldPattern != undefined) {

                patt.description = results[n]; // Работа с классом, получаем шаблон и передаем данные в этот класс для их обработки
                results[n] = patt.join() //Соединение шаблона продукта и сырого описания из бд        
              } else {
                next(createError(404));
              }
            }
            res.send({
              amount: amount,
              products: results,
              dataUsage: getDataUsage(results)
            })
          } catch (error) {
            console.error(error);
          }

        })

      })
    }
  })

router.get('/smartphones-and-accessories/:category/:productID', (req, res, next) => {

  let category = req.params['category']; // Название категории
  let key = req.params['productID']; // Номер товара
  let pats = category.split('-').join(''); // Расшифровка из названия категории название шаблона(делаем сплошное слово)
  let productPattern = new Patterns(pats); // Это собственный модуль
  if (productPattern.patterns.patternForCompare != undefined) {
    let sql = `SELECT * FROM products_and_description WHERE category = '${category}' AND prodKey = ${key}`;
    db.query(sql, (err, results) => { // Получение данных о товаре по пределеннной категории и номеру
      if (err) throw new Error(err);
      try { // Обработчик ошибок связанных с неккоректным вводом и обработкой запроса к БД
        results[0].generalInformation = JSON.parse(results[0].generalInformation);
        results[0].photos = JSON.parse(results[0].photos);
        results[0].description = JSON.parse(results[0].description);
        productPattern.description = results[0];
        res.render('layouts/pattern-products', {
          title: "Мобильные телефоны",
          isVisibleCategories: true,
          pat: productPattern.join(),
          way: "/mobile-phones"
        }); // pat - это шаблон описания товара; 
      } catch (e) {
        console.error(e);
        res.render('layouts/unAvailbleProduct', { // Если такого товара нет, то рендерится ошибка
          title: "Not found",
          isVisibleCategories: true,
          way: "/mobile-phones"
        });
      }

    })
  } else {
    next(createError(404));
  }
})

module.exports = router;



// router.get('/insert', (req, res, next) => {
//   for(let i = 0; i < 276; i++){
//     db.query("INSERT INTO `products_and_description` (`id`, `category`, `individualNumber`, `type`, `brand`, `prodName`, `rating`, `price`, `photos`, `availability`, `generalInformation`, `description`) VALUES (NULL, 'mobile-phones', '212134100"+ i +"', 'Смартфон', 'huawei', 'PP455A-LX4', '4.9', '400', '[\"https://www.lg.com/ru/images/plp-b2c/b2c-3/ru-smartphones-categoryselctor-1.jpg\"]', 'true', '{\r\n \"marketLaunchDate\": \"2020\",\r\n \"OS\": \"Android\",\r\n \"OSversion\": \"Android 10.0\",\r\n \"brandedGraphicalInterface\": \"EMUI (10.1)\",\r\n \"rule\": \"P Smart 2021 (Huawei)\",\r\n \"screenSize\": \"6.67\",\r\n \"screenResolution\": \"1080x2400\",\r\n \"numOfmainCamera\": 4,\r\n \"mainCamera\": \"48 Мп + 8 Мп + 2 Мп + 2 Мп\",\r\n \"frontCamera\": \"8 Мп\",\r\n \"RAM\": 4,\r\n \"fashMemory\": 128,\r\n \"supportForMemoryCards\": \"microSD (до 512 ГБ)\",\r\n \"numOfSIMcards\": 2,\r\n \"SIMCardFormat\": \"nano-SIM\"\r\n }', '{ \r\n \"CPU\": {\r\n \"platform\": \"HiSilicon\",\r\n \"processorType\": \"HiSilicon Kirin 710A\",\r\n \"CPUclockSpeed\": \"2000 MHz\",\r\n \"numberOfCores\": 8,\r\n \"CPUmicroarchitecture\": \"4 x Cortex-A73 2.0 GHz + 4 x Cortex-A53 1.7 GHz\",\r\n \"processorSize\": \"64 bits\",\r\n \"technicalProcess\": \"12 nm\",\r\n \"GraphicsAccelerator\": \"Mali-G51 MP4\"\r\n },\r\n \"design\": {\r\n \"design\": \"моноблок\",\r\n \"bodyMaterial\": \"пластик\",\r\n \"glassConstruction\": \"2.5D\",\r\n \"shockproofHousing\": \"нет\",\r\n \"color\": \"черный\",\r\n \"separateSlots\": \"нет\",\r\n \"dustAndMoistureProtection\": null\r\n },\r\n \"screen\": {\r\n \"screenResolution\": \"1080x2400\",\r\n \"screenSize\": \"6.67\\\"\",\r\n \"screenTechnology\": \"IPS\",\r\n \"pixelDensity\": \"395 ppi\",\r\n \"touchScreen\": \"да\",\r\n \"frequency\": \"60 Гц\"\r\n },\r\n \"mainCamera\": {\r\n \"resolution\": \"48 Мп\",\r\n \"diaphragm\": \"ƒ/1.8\",\r\n \"optionalCameraModule\": \"есть, датчик глубины, широкоугольный, макрообъектив\",\r\n \"resolutionOfTheOptionalCameraModule\": \"8 Мп (широкоугольный), 2 Мп (датчик глубины и макрообъектив)\",\r\n \"apertureOfAdditionalModule\": \" ƒ / 2.4 (x3)\",\r\n \"focusing\": \"автоматическая\",\r\n \"flash\": \"LED\",\r\n \"imageStabilization\": \"цифровая\",\r\n \"maximumPhotoPesolution\": \"8000 × 6000\",\r\n \"maximumVideoResolution\": \"1920 × 1080 (FullHD)\",\r\n \"maxVideoFrameRate\": \"30fps\"\r\n },\r\n \"frontCamera\": {\r\n \"resolution\": \"8 Мп\",\r\n \"diaphragm\": \"ƒ/2.0\",\r\n \"maximumPhotoPesolution\": \"3264×2448\",\r\n \"maximumVideoResolution\": \"1920 × 1080 (FullHD)\"\r\n },\r\n \"functions\": {\r\n \"stereoSpeakers\": \"нет\",\r\n \"registeringTheForceOfPressing\": \"нет\",\r\n \"vibratingAlert\": \"есть\",\r\n \"formatSupport\": \"MP3, AAC, WAV, MP4, FLAC, AMR, 3GP, OGG, Midi\",\r\n \"dataTransfer\": \"LTE (стандарт сетей 4G), UMTS (стандарт сетей 3G), GSM (стандарт сетей 2G)\",\r\n \"GSMstandard2G\": \"900, 1800, 1900, 850\",\r\n \"securityAndUnlocking\": \"сканер отпечатка пальца, разблокировка по лицу\",\r\n \"FMreceiver\": \"есть\",\r\n \"navigation\": \"GPS, GLONASS, A-GPS, Beidou\"\r\n },\r\n \"sensors\": {\r\n \"accelerometer\": \"есть\",\r\n \"lightSensor\": \"есть\",\r\n \"proximitySensor\": \"есть\",\r\n \"compass\": \"есть\",\r\n \"gyroscope\": \"есть\"\r\n },\r\n \"interfaces\": {\r\n \"WiFi\": \"802.11 n\",\r\n \"bluetooth\": \"есть\",\r\n \"bluetoothVersion\": \"5.1\",\r\n \"NFC\": \"есть\",\r\n \"connectionSocket\": \"USB Type-C\",\r\n \"audioOutput\": \"3.5mm jack\"\r\n },\r\n \"battery\": {\r\n \"type\": \"Li-ion\",\r\n \"capacity\": \"5000 мАч\",\r\n \"USBcharging\": \"есть\",\r\n \"chargingProcess\": \"быстрая зарядка, стандартная зарядка\",\r\n \"nonRemovable\": \"есть\"\r\n },\r\n \"equipment\": {\"equipment\": \"руководство пользователя, зарядное устройство, скрепка для извлечения SIM-карты, наушники, кабель USB Type-C\"}\r\n }')")
//   }
//   res.send('hi')
// })
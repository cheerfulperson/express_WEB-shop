const express = require('express');
const hbs = require('handlebars');
const fs = require('fs');

// Модули
const db = require('../modules/DB-products');
const patterns = require('../modules/productsPatterns');

const router = express.Router();

// Используется для всего адреса /categories
router.use('/', (req, res, next) => {
  // Читаю файл с категориями
  let categories = fs.readFileSync('./categories.json', "utf-8");
  categories = JSON.parse(categories);

  // Создаю хэлпер
  hbs.registerHelper('categories', (block) => {
    // Загружаю в корень с данными, передаваемых в hbs категории
    block.data.root.categories = categories;
  })
  next();
})
// router.get('/insert', (req, res, next) => {
//   for(let i = 0; i < 276; i++){
//     db.query("INSERT INTO `products_and_description` (`id`, `category`, `individualNumber`, `type`, `brand`, `prodName`, `rating`, `price`, `photos`, `availability`, `generalInformation`, `description`) VALUES (NULL, 'mobile-phones', '212134100"+ i +"', 'Смартфон', 'huawei', 'PP455A-LX4', '4.9', '400', '[\"https://www.lg.com/ru/images/plp-b2c/b2c-3/ru-smartphones-categoryselctor-1.jpg\"]', 'true', '{\r\n \"marketLaunchDate\": \"2020\",\r\n \"OS\": \"Android\",\r\n \"OSversion\": \"Android 10.0\",\r\n \"brandedGraphicalInterface\": \"EMUI (10.1)\",\r\n \"rule\": \"P Smart 2021 (Huawei)\",\r\n \"screenSize\": \"6.67\",\r\n \"screenResolution\": \"1080x2400\",\r\n \"numOfmainCamera\": 4,\r\n \"mainCamera\": \"48 Мп + 8 Мп + 2 Мп + 2 Мп\",\r\n \"frontCamera\": \"8 Мп\",\r\n \"RAM\": 4,\r\n \"fashMemory\": 128,\r\n \"supportForMemoryCards\": \"microSD (до 512 ГБ)\",\r\n \"numOfSIMcards\": 2,\r\n \"SIMCardFormat\": \"nano-SIM\"\r\n }', '{ \r\n \"CPU\": {\r\n \"platform\": \"HiSilicon\",\r\n \"processorType\": \"HiSilicon Kirin 710A\",\r\n \"CPUclockSpeed\": \"2000 MHz\",\r\n \"numberOfCores\": 8,\r\n \"CPUmicroarchitecture\": \"4 x Cortex-A73 2.0 GHz + 4 x Cortex-A53 1.7 GHz\",\r\n \"processorSize\": \"64 bits\",\r\n \"technicalProcess\": \"12 nm\",\r\n \"GraphicsAccelerator\": \"Mali-G51 MP4\"\r\n },\r\n \"design\": {\r\n \"design\": \"моноблок\",\r\n \"bodyMaterial\": \"пластик\",\r\n \"glassConstruction\": \"2.5D\",\r\n \"shockproofHousing\": \"нет\",\r\n \"color\": \"черный\",\r\n \"separateSlots\": \"нет\",\r\n \"dustAndMoistureProtection\": null\r\n },\r\n \"screen\": {\r\n \"screenResolution\": \"1080x2400\",\r\n \"screenSize\": \"6.67\\\"\",\r\n \"screenTechnology\": \"IPS\",\r\n \"pixelDensity\": \"395 ppi\",\r\n \"touchScreen\": \"да\",\r\n \"frequency\": \"60 Гц\"\r\n },\r\n \"mainCamera\": {\r\n \"resolution\": \"48 Мп\",\r\n \"diaphragm\": \"ƒ/1.8\",\r\n \"optionalCameraModule\": \"есть, датчик глубины, широкоугольный, макрообъектив\",\r\n \"resolutionOfTheOptionalCameraModule\": \"8 Мп (широкоугольный), 2 Мп (датчик глубины и макрообъектив)\",\r\n \"apertureOfAdditionalModule\": \" ƒ / 2.4 (x3)\",\r\n \"focusing\": \"автоматическая\",\r\n \"flash\": \"LED\",\r\n \"imageStabilization\": \"цифровая\",\r\n \"maximumPhotoPesolution\": \"8000 × 6000\",\r\n \"maximumVideoResolution\": \"1920 × 1080 (FullHD)\",\r\n \"maxVideoFrameRate\": \"30fps\"\r\n },\r\n \"frontCamera\": {\r\n \"resolution\": \"8 Мп\",\r\n \"diaphragm\": \"ƒ/2.0\",\r\n \"maximumPhotoPesolution\": \"3264×2448\",\r\n \"maximumVideoResolution\": \"1920 × 1080 (FullHD)\"\r\n },\r\n \"functions\": {\r\n \"stereoSpeakers\": \"нет\",\r\n \"registeringTheForceOfPressing\": \"нет\",\r\n \"vibratingAlert\": \"есть\",\r\n \"formatSupport\": \"MP3, AAC, WAV, MP4, FLAC, AMR, 3GP, OGG, Midi\",\r\n \"dataTransfer\": \"LTE (стандарт сетей 4G), UMTS (стандарт сетей 3G), GSM (стандарт сетей 2G)\",\r\n \"GSMstandard2G\": \"900, 1800, 1900, 850\",\r\n \"securityAndUnlocking\": \"сканер отпечатка пальца, разблокировка по лицу\",\r\n \"FMreceiver\": \"есть\",\r\n \"navigation\": \"GPS, GLONASS, A-GPS, Beidou\"\r\n },\r\n \"sensors\": {\r\n \"accelerometer\": \"есть\",\r\n \"lightSensor\": \"есть\",\r\n \"proximitySensor\": \"есть\",\r\n \"compass\": \"есть\",\r\n \"gyroscope\": \"есть\"\r\n },\r\n \"interfaces\": {\r\n \"WiFi\": \"802.11 n\",\r\n \"bluetooth\": \"есть\",\r\n \"bluetoothVersion\": \"5.1\",\r\n \"NFC\": \"есть\",\r\n \"connectionSocket\": \"USB Type-C\",\r\n \"audioOutput\": \"3.5mm jack\"\r\n },\r\n \"battery\": {\r\n \"type\": \"Li-ion\",\r\n \"capacity\": \"5000 мАч\",\r\n \"USBcharging\": \"есть\",\r\n \"chargingProcess\": \"быстрая зарядка, стандартная зарядка\",\r\n \"nonRemovable\": \"есть\"\r\n },\r\n \"equipment\": {\"equipment\": \"руководство пользователя, зарядное устройство, скрепка для извлечения SIM-карты, наушники, кабель USB Type-C\"}\r\n }')")
//   }
//   res.send('hi')
// })
router.get('/smartphones-and-accessories/:category', (req, res, next) => {
  let category = req.params['category']; // Название категории
  let pats = category.split('-').join(''); // Расшифровка из названия категории название шаблона(делаем сплошное слово)
  res.render('layouts/categories-listWithProducts', {
    title: "Мобильные телефоны",
    isVisibleCategories: true,
    section: patterns[pats]
  });
})
router.put("/smartphones-and-accessories/:category", async (req, res, next) => {
  let category = req.params['category'], // Название категории
    amount = 0,
    sql = `SELECT COUNT(*) as amount FROM products_and_description WHERE category = '${category}'`,
    page = req.query.page != undefined ? (req.query.page - 1) * 30 : 0; // Если НАчальная страница, то вывод элементов с 0, а если нет, то с определенного числа!!! page - страничка
  console.log(req.query)
  db.query(sql, (err, results) => {
    if (err) throw new Error(err);
    try {
      amount = results[0].amount; // Колличество товаров с такой категорией
      sql = `SELECT * FROM products_and_description WHERE category = '${category}' LIMIT ${page}, 30 `;
      db.query(sql, (err, results) => {
        if (err) console.error(err);
        try {
          for (let n in results) { // Обработка полученной информации
            results[n].generalInformation = JSON.parse(results[n].generalInformation);
            results[n].photos = JSON.parse(results[n].photos)[0];
            results[n].description = null;
          }
        } catch (e) {
          console.error(e);
        }
        // setTimeout(()=>{
          console.log(page)
          res.send({
            amount: amount,
            products: results,
            dataUsage: getDataUsage(results)
          })
        // }, 5000)

      })
    } catch (e) {
      console.error(e);
    }
  })
})

router.get('/smartphones-and-accessories/:category/:productID', (req, res, next) => {

  let category = req.params['category']; // Название категории
  let productNumber = req.params['productID']; // Номер товара
  let pats = category.split('-').join(''); // Расшифровка из названия категории название шаблона(делаем сплошное слово)
  let phonePattern = patterns[pats]; // Не доделал как получать шаблон

  let sql = `SELECT * FROM products_and_description WHERE category = '${category}' AND individualNumber = ${productNumber}`;
  db.query(sql, (err, results) => { // Получение данных о товаре по пределеннной категории и номеру
    if (err) {
      throw new Error(err)
    }
    try { // Обработчик ошибок связанных с неккоректным вводом и обработкой запроса к БД
      results[0].generalInformation = JSON.parse(results[0].generalInformation);
      results[0].photos = JSON.parse(results[0].photos);
      results[0].description = JSON.parse(results[0].description);
    } catch (e) {
      console.error(e)
    }
    res.render('layouts/pattern-products', {
      title: "Мобильные телефоны",
      isVisibleCategories: true,
      pat: patterns.join(phonePattern, results[0]),
      way: "/mobile-phones"
    }); // pat - это шаблон описания товара; 
  })

})

function getDataUsage(str){ // Обьем буфера с базы данных
  return Buffer.byteLength(JSON.stringify(str), 'utf-8');
}

module.exports = router;



// router.get('/insert', (req, res, next) => {
//   for(let i = 0; i < 276; i++){
//     db.query("INSERT INTO `products_and_description` (`id`, `category`, `individualNumber`, `type`, `brand`, `prodName`, `rating`, `price`, `photos`, `availability`, `generalInformation`, `description`) VALUES (NULL, 'mobile-phones', '212134100"+ i +"', 'Смартфон', 'huawei', 'PP455A-LX4', '4.9', '400', '[\"https://www.lg.com/ru/images/plp-b2c/b2c-3/ru-smartphones-categoryselctor-1.jpg\"]', 'true', '{\r\n \"marketLaunchDate\": \"2020\",\r\n \"OS\": \"Android\",\r\n \"OSversion\": \"Android 10.0\",\r\n \"brandedGraphicalInterface\": \"EMUI (10.1)\",\r\n \"rule\": \"P Smart 2021 (Huawei)\",\r\n \"screenSize\": \"6.67\",\r\n \"screenResolution\": \"1080x2400\",\r\n \"numOfmainCamera\": 4,\r\n \"mainCamera\": \"48 Мп + 8 Мп + 2 Мп + 2 Мп\",\r\n \"frontCamera\": \"8 Мп\",\r\n \"RAM\": 4,\r\n \"fashMemory\": 128,\r\n \"supportForMemoryCards\": \"microSD (до 512 ГБ)\",\r\n \"numOfSIMcards\": 2,\r\n \"SIMCardFormat\": \"nano-SIM\"\r\n }', '{ \r\n \"CPU\": {\r\n \"platform\": \"HiSilicon\",\r\n \"processorType\": \"HiSilicon Kirin 710A\",\r\n \"CPUclockSpeed\": \"2000 MHz\",\r\n \"numberOfCores\": 8,\r\n \"CPUmicroarchitecture\": \"4 x Cortex-A73 2.0 GHz + 4 x Cortex-A53 1.7 GHz\",\r\n \"processorSize\": \"64 bits\",\r\n \"technicalProcess\": \"12 nm\",\r\n \"GraphicsAccelerator\": \"Mali-G51 MP4\"\r\n },\r\n \"design\": {\r\n \"design\": \"моноблок\",\r\n \"bodyMaterial\": \"пластик\",\r\n \"glassConstruction\": \"2.5D\",\r\n \"shockproofHousing\": \"нет\",\r\n \"color\": \"черный\",\r\n \"separateSlots\": \"нет\",\r\n \"dustAndMoistureProtection\": null\r\n },\r\n \"screen\": {\r\n \"screenResolution\": \"1080x2400\",\r\n \"screenSize\": \"6.67\\\"\",\r\n \"screenTechnology\": \"IPS\",\r\n \"pixelDensity\": \"395 ppi\",\r\n \"touchScreen\": \"да\",\r\n \"frequency\": \"60 Гц\"\r\n },\r\n \"mainCamera\": {\r\n \"resolution\": \"48 Мп\",\r\n \"diaphragm\": \"ƒ/1.8\",\r\n \"optionalCameraModule\": \"есть, датчик глубины, широкоугольный, макрообъектив\",\r\n \"resolutionOfTheOptionalCameraModule\": \"8 Мп (широкоугольный), 2 Мп (датчик глубины и макрообъектив)\",\r\n \"apertureOfAdditionalModule\": \" ƒ / 2.4 (x3)\",\r\n \"focusing\": \"автоматическая\",\r\n \"flash\": \"LED\",\r\n \"imageStabilization\": \"цифровая\",\r\n \"maximumPhotoPesolution\": \"8000 × 6000\",\r\n \"maximumVideoResolution\": \"1920 × 1080 (FullHD)\",\r\n \"maxVideoFrameRate\": \"30fps\"\r\n },\r\n \"frontCamera\": {\r\n \"resolution\": \"8 Мп\",\r\n \"diaphragm\": \"ƒ/2.0\",\r\n \"maximumPhotoPesolution\": \"3264×2448\",\r\n \"maximumVideoResolution\": \"1920 × 1080 (FullHD)\"\r\n },\r\n \"functions\": {\r\n \"stereoSpeakers\": \"нет\",\r\n \"registeringTheForceOfPressing\": \"нет\",\r\n \"vibratingAlert\": \"есть\",\r\n \"formatSupport\": \"MP3, AAC, WAV, MP4, FLAC, AMR, 3GP, OGG, Midi\",\r\n \"dataTransfer\": \"LTE (стандарт сетей 4G), UMTS (стандарт сетей 3G), GSM (стандарт сетей 2G)\",\r\n \"GSMstandard2G\": \"900, 1800, 1900, 850\",\r\n \"securityAndUnlocking\": \"сканер отпечатка пальца, разблокировка по лицу\",\r\n \"FMreceiver\": \"есть\",\r\n \"navigation\": \"GPS, GLONASS, A-GPS, Beidou\"\r\n },\r\n \"sensors\": {\r\n \"accelerometer\": \"есть\",\r\n \"lightSensor\": \"есть\",\r\n \"proximitySensor\": \"есть\",\r\n \"compass\": \"есть\",\r\n \"gyroscope\": \"есть\"\r\n },\r\n \"interfaces\": {\r\n \"WiFi\": \"802.11 n\",\r\n \"bluetooth\": \"есть\",\r\n \"bluetoothVersion\": \"5.1\",\r\n \"NFC\": \"есть\",\r\n \"connectionSocket\": \"USB Type-C\",\r\n \"audioOutput\": \"3.5mm jack\"\r\n },\r\n \"battery\": {\r\n \"type\": \"Li-ion\",\r\n \"capacity\": \"5000 мАч\",\r\n \"USBcharging\": \"есть\",\r\n \"chargingProcess\": \"быстрая зарядка, стандартная зарядка\",\r\n \"nonRemovable\": \"есть\"\r\n },\r\n \"equipment\": {\"equipment\": \"руководство пользователя, зарядное устройство, скрепка для извлечения SIM-карты, наушники, кабель USB Type-C\"}\r\n }')")
//   }
//   res.send('hi')
// })

//   router.get('/smartphones-and-accessories/:category', (req, res, next) => {
//     let query = req.query.page;

//     console.log(query)
//     let category = req.params['category'], // Название категории
//       amount = 0,
//       sql = `SELECT COUNT(*) as amount FROM products_and_description WHERE category = '${category}'`;
//     console.log(category)
//     db.query(sql, (err, results) => {
//       if (err) throw new Error(err);
//       try {
//         amount = results[0].amount;
//         sql = `SELECT * FROM products_and_description WHERE category = '${category}' LIMIT 20 `;
//         db.query(sql, (err, results) => {
//           if (err) console.error(err);
//           try {
//             for (let n in results) { // Обработка полученной информации
//               results[n].generalInformation = JSON.parse(results[n].generalInformation);
//               results[n].photos = JSON.parse(results[n].photos)[0];
//               results[n].description = null;
//             }

//           } catch (e) {
//             console.error(e)
//           }       
//           res.render('layouts/categories-listWithProducts', {
//             title: "Мобильные телефоны",
//             isVisibleCategories: true,
//             products: results,
//             amount: amount
//           });
//         })
//       } catch (e) {
//         console.error(e);
//       }

//     })
//   })
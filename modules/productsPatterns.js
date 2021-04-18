// let join = function(pattern, description, depth){
//     // console.log(pattern)
//     for(let key in pattern){
//         if(description[key] != undefined){
//             if(key != "description" && depth == undefined){        
//                 pattern[key] = description[key];              
//             }else if(typeof pattern[key] == 'object'){                 
//                 join(pattern[key], description[key], depth = 1);
//                 if(pattern[key].data == null && typeof pattern[key].data == 'object') pattern[key].data = description[key];
//             }
//         }
        
                  
//     }
//     return pattern;
// }
let patterns = {
    join: function(pattern, description, depth){ // Функция соеденения шаблна и данных из базы данных
        for(let key in pattern){ // Проход по свойствам обЪекта
            if(description[key] != undefined){
                if(key != "description" && key != "generalInformation" && depth == undefined){ // Заполнение основной информации   
                        pattern[key] = description[key];            
                }else if(typeof pattern[key] == 'object'){               
                    if(pattern[key].data == null && typeof pattern[key].data == 'object') pattern[key].data = description[key];
                    this.join(pattern[key], description[key], depth = 1); // Рекурсивный вызов по прохождения каждого значения в обЪекте
                }
            }                    
        }
        return pattern;
    },
    mobilephones: {
        individualNumber: null, // `21${Math.round(Math.random() * 1000)}${Math.round(Math.random() * 1000)}01`
        photos: [null], 
        type: null,
        brand: ['huawai', 'xiaomi', 'apple', 'sumsung'],
        prodName: null,
        rating: null,
        price: null,
        availability: null,
        generalInformation: {
            marketLaunchDate: { 
                name: 'Дата выхода на рынок',
                data: null    
            },
            OS: { 
                name: 'Операционная система',
                data: null    
            },
            OSversion: { 
                name: 'Версия ОС',
                data: null    
            },
            brandedGraphicalInterface: { 
                name: 'Фирменный графический интерфейс',
                data: null    
            },
            rule: { 
                name: 'Линейка',
                data: null    
            },
            screenSize: { 
                name: 'Размер экрана',
                data: null    
            },
            screenResolution: { 
                name: 'Разрешение экрана',
                data: null    
            },
            numOfmainCamera: { 
                name: 'Колличество основных камер',
                data: null    
            },
            mainCamera: { 
                name: 'Основная камера',
                data: null    
            },
            frontCamera: { 
                name: 'Фронтальная камера',
                data: null    
            },
            RAM: { 
                name: 'Оперативная память',
                data: null    
            },
            fashMemory: { 
                name: 'Флэш память',
                data: null    
            },
            supportForMemoryCards: { 
                name: 'Поддержка sd карты',
                data: null    
            },
            numOfSIMcards: { 
                name: 'Количество SIM-карт',
                data: null    
            },
            SIMCardFormat: { 
                name: 'Формат SIM-карты',
                data: null    
            },
        },
        description: {
           
            CPU: {
                name: 'Процессор',
                platform: { 
                    name: 'Платформа',
                    data: null    
                },
                processorType: { 
                    name: 'Тип процессора',
                    data: null    
                },
                CPUclockSpeed: { 
                    name: 'Тактовая частота процессора',
                    data: null    
                },
                numberOfCores: { 
                    name: 'Количество ядер',
                    data: null    
                },
                CPUmicroarchitecture: { 
                    name: 'Микроархитектура ЦПУ',
                    data: null    
                },
                processorSize: { 
                    name: 'Разрядность процессора',
                    data: null    
                },
                technicalProcess: { 
                    name: 'Техпроцесс',
                    data: null    
                },
                GraphicsAccelerator: { 
                    name: 'Графический ускоритель',
                    data: null    
                }
            },
            design: {
                name: 'Корпус',
                design: { 
                    name: 'Моноблок',
                    data: null    
                },
                bodyMaterial: { 
                    name: 'Материал корпуса',
                    data: null    
                },
                glassConstruction: { 
                    name: 'Конструкция стекла',
                    data: null    
                },
                shockProofHousing: { 
                    name: 'Ударопрочный корпус',
                    data: null    
                },
                color: { 
                    name: 'Цвет',
                    data: null    
                },
                separateSlots: { 
                    name: 'Раздельные слоты 2-й SIM и карты памяти',
                    data: null    
                },
                dustAndMoistureProtection: { 
                    name: 'Пыле- и влагозащита ',
                    data: null    
                },
            },
            screen: {
                name: 'Экран',
                screenResolution: { 
                    name: 'Разрешение экрана',
                    data: null    
                },    
                screenTechnology: { 
                    name: 'Технология экрана',
                    data: null    
                },
                pixelDensity: { 
                    name: 'Плотность пикселей',
                    data: null    
                },
                touchScreen: { 
                    name: 'Сенсорный экран',
                    data: null    
                },
                frequency: { 
                    name: 'Частота экрана',
                    data: null    
                }
            },
            mainCamera: {
                name: 'Основная камера',
                resolution: { 
                    name: 'Разрешение камеры',
                    data: null    
                },
                diaphragm: { 
                    name: 'Диафрагма',
                    data: null    
                },
                optionalCameraModule: { 
                    name: 'Дополнительный модуль камеры',
                    data: null    
                },
                resolutionOfTheOptionalCameraModule: { 
                    name: 'Разрешение дополнительного модуля камеры',
                    data: null    
                },
                apertureOfAdditionalModule: { 
                    name: 'Диафрагма дополнительного модуля',
                    data: null    
                },
                focusing: { 
                    name: 'Фокусировка',
                    data: null    
                },
                flash: { 
                    name: 'Встроенная вспышка',
                    data: null    
                },
                imageStabilization: { 
                    name: 'Стабилизация изображения',
                    data: null    
                },
                maximumPhotoPesolution: { 
                    name: 'Максимальное разрешение фото',
                    data: null    
                },
                maximumVideoResolution: { 
                    name: 'Максимальное разрешение видео',
                    data: null    
                },
                maxVideoFrameRate: { 
                    name: 'Максимальная частота кадров видео',
                    data: null    
                }
            },
            frontCamera: {
                name: 'Фронтальная камера',
                resolution: { 
                    name: 'Разрешение фронтальной камеры',
                    data: null    
                },
                diaphragm: { 
                    name: 'Диафрагма',
                    data: null    
                },
                maximumPhotoPesolution: { 
                    name: 'Максимальное разрешение фото',
                    data: null    
                },
                maximumVideoResolution: { 
                    name: 'Максимальное разрешение видео',
                    data: null    
                },
            },
            functions: {
                name: 'Основные функции',
                stereoSpeakers: { 
                    name: 'Стереодинамики',
                    data: null    
                },
                registeringTheForceOfPressing: { 
                    name: 'Регистрация силы нажатий',
                    data: null    
                },
                vibratingAlert: { 
                    name: 'Вибровызов',
                    data: null    
                },
                formatSupport: { 
                    name: 'Поддержка форматов',
                    data: null    
                },
                dataTransfer: { 
                    name: 'Передача данных',
                    data: null    
                },
                GSMstandard2G: { 
                    name: 'Стандарт GSM (2G)',
                    data: null    
                },
                securityAndUnlocking: { 
                    name: 'Безопасность и разблокировка',
                    data: null    
                },
                FMreceiver: { 
                    name: 'FM-приемник',
                    data: null    
                },
                navigation: { 
                    name: 'Навигация',
                    data: null    
                }
            },
            sensors: {
                name: 'Датчики',
                accelerometer: { 
                    name: 'Акселерометр',
                    data: null    
                },
                lightSensor: { 
                    name: 'Световой датчик',
                    data: null    
                },
                proximitySensor: { 
                    name: 'Датчик приближения',
                    data: null    
                },
                compass: { 
                    name: 'Компас',
                    data: null    
                },
                gyroscope: { 
                    name: 'Гироскоп',
                    data: null    
                }
            },
            interfaces: {
                name: 'Интерфейсы',
                WiFi: { 
                    name: 'Wi-Fi',
                    data: null    
                },
                bluetooth: { 
                    name: 'Bluetooth',
                    data: null    
                },
                bluetoothVersion: { 
                    name: 'Версия Bluetooth',
                    data: null    
                },
                NFC: { 
                    name: 'NFC',
                    data: null    
                },
                connectionSocket: { 
                    name: 'Разъем подключения',
                    data: null    
                },
                audioOutput: { 
                    name: 'Аудиовыход',
                    data: null    
                },
            },
            battery: {
                name: 'Питание',
                type: {
                    name: 'Тип аккумулятора',
                    data: null
                },
                capacity: {
                    name: 'Емкость аккумулятора',
                    data: null
                },
                USBcharging: {
                    name: 'Зарядка от USB',
                    data: null
                },
                chargingProcess: {
                    name: 'Процесс зарядки',
                    data: null
                },
                nonRemovable: {
                    name: 'Несъёмный аккумулятор',
                    data: null
                }
            },
            equipment: {
                name: 'Комплектация, размеры и вес',
                equipment: {
                    name: 'В комплекте',
                    data: null
                }
            } 
        }
    }
};

module.exports = patterns;
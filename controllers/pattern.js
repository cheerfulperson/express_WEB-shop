let pattern = {
    individualNumber: `21${Math.round(Math.random() * 1000)}${Math.round(Math.random() * 1000)}01`,
    type: 'smartphone',
    brand: 'huawei',
    name : 'PPA-LX1',
    rating: 4.9,
    price: 400,
    photos: ['dasdasdasd', 'asdasdadsads'],
    availability: true,
    generalInformation: {       
      marketLaunchDate: '2020',
      OS: 'Android',
      OSversion: 'Android 10.0',
      brandedGraphicalInterface: 'EMUI (10.1)',
      rule: 'P Smart 2021 (Huawei)',
      screenSize: '',
      screenResolution: '',
      numOfmainCamera: 4,
      mainCamera: '48 Мп + 8 Мп + 2 Мп + 2 Мп',
      frontCamera: '8 Мп',
      RAM: 4,
      fashMemory: 128,
      supportForMemoryCards: 'microSD (до 512 ГБ)',
      numOfSIMcards: 2,
      SIMCardFormat: 'nano-SIM'
    },
    CPU: {
      platform: 'HiSilicon',
      processorType: 'HiSilicon Kirin 710A',
      CPUclockSpeed: '2000 MHz',
      numberOfCores: 8,
      CPUmicroarchitecture: '4 x Cortex-A73 2.0 GHz + 4 x Cortex-A53 1.7 GHz',
      processorSize: '64 bits',
      technicalProcess: '12 nm',
      GraphicsAccelerator: 'Mali-G51 MP4'
    },
    design: {
      design: 'моноблок',
      bodyMaterial: 'пластик',
      glassConstruction: '2.5D',
      shockproofHousing: 'нет',
      color: 'черный',
      separateSlots: 'нет',      
      dustAndMoistureProtection: null,
    },
    screen: {
      screenResolution: '1080x2400',
      screenSize: '6.67"',
      screenTechnology: 'IPS',
      pixelDensity: '395 ppi',
      touchScreen: 'да',
      frequency: '60 Гц'
    },
    mainCamera: {
      resolution: '48 Мп',
      diaphragm: 'ƒ/1.8',
      optionalCameraModule: 'есть, датчик глубины, широкоугольный, макрообъектив',
      resolutionOfTheOptionalCameraModule: '8 Мп (широкоугольный), 2 Мп (датчик глубины и макрообъектив)',
      apertureOfAdditionalModule: ' ƒ / 2.4 (x3)',       
      focusing: 'автоматическая',
      flash: 'LED',
      imageStabilization: 'цифровая',
      maximumPhotoPesolution: '8000 × 6000',
      maximumVideoResolution: '1920 × 1080 (FullHD)',        
      maxVideoFrameRate: '30fps'
    },
    frontCamera: {
      resolution: '8 Мп',
      diaphragm: 'ƒ/2.0',
      maximumPhotoPesolution: '3264×2448',
      maximumVideoResolution: '1920 × 1080 (FullHD)',    
    },
    functions: {
      stereoSpeakers: 'нет',
      registeringTheForceOfPressing: 'нет',
      vibratingAlert: 'есть',
      formatSupport: 'MP3, AAC, WAV, MP4, FLAC, AMR, 3GP, OGG, Midi',
      dataTransfer: 'LTE (стандарт сетей 4G), UMTS (стандарт сетей 3G), GSM (стандарт сетей 2G)',
      GSMstandard2G: '900, 1800, 1900, 850',
      securityAndUnlocking: 'сканер отпечатка пальца, разблокировка по лицу',
      FMreceiver: 'есть',
      navigation: 'GPS, GLONASS, A-GPS, Beidou'
    },
    sensors: {
      accelerometer: 'есть',
      lightSensor: 'есть',
      proximitySensor: 'есть',
      compass: 'есть',
      gyroscope: 'есть'
    },
    interfaces: {
      WiFi: '802.11 n',
      bluetooth: 'есть',
      bluetoothVersion: '5.1',
      NFC: 'есть',
      connectionSocket: 'USB Type-C',
      audioOutput: '3.5mm jack',
    },
    battery:{
      type: 'Li-ion',
      capacity: '5000 мАч',
      USBcharging: 'есть',
      chargingProcess: 'быстрая зарядка, стандартная зарядка',
      nonRemovable: 'есть'
    },
    equipment: `руководство пользователя, зарядное устройство, скрепка для извлечения SIM-карты, наушники, кабель USB Type-C`
  };
  pattern.generalInformation.screenSize = pattern.screen.screenSize;
  pattern.generalInformation.screenResolution = pattern.screen.screenResolution;
  pattern = JSON.stringify(pattern);
  fs.writeFileSync('./patterns.json', pattern);
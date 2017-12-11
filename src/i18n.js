import _ from 'lodash'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'
import * as commonActions from './actions/common'
import { getLanguage, setLanguage, getTemperature, setTemperature } from './actions'

let language = getLanguage()
if (!language) {
  language = navigator.language
  setLanguage(language)
  commonActions.setHTMLLang(language)

  let temperature = getTemperature()
  if (!temperature) {
    if (_.includes(language, 'en')) {
      setTemperature('F')
    } else {
      setTemperature('C')
    }
  }
} else {
  commonActions.setHTMLLang(language)
}

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    lng: language,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true
    },
    resources: {
      "ko": {
        dayOfWeek: {
          'tomorrow': '내일',
          '0': '일요일',
          '1': '월요일',
          '2': '화요일',
          '3': '수요일',
          '4': '목요일',
          '5': '금요일',
          '6': '토요일'
        },
        translation: {
          "notFoundPage": "페이지를 찾을 수 없습니다.",
          "appTellMeLocation": "위치를 알려주세요",

          "locationFirstTitle": "처음 오셨네요!",
          "locationSecondTitle": "안녕하세요 :)",
          "locationDescription": "어떤 곳의 날씨를 불러올까요?",
          "locationButton": "현재 내가 있는 곳",
          "locationLink": "직접 입력할께요",
          "locationPlaceNotFound": "현재 위치에 맞는 지역을 찾을 수 없습니다.\n위치 이동 후 다시 이용해주세요.",
          "locationWeatherNotFound": "현재 위치에 맞는 날씨를 찾을 수 없습니다.\n위치 이동 후 다시 이용해주세요.",
          "locationPositionNotFound": "현재 위치를 불러 올 수 없습니다.\n잠시 후 다시 이용해주세요.",

          "searchTitle": "도시의 이름을 적어주세요",
          "searchEmptyItem": "일치하는 곳이 없어요. 정확히 입력해주세요!",

          "settingsLocation": "위치",
          "settingsCelsius": "섭씨",
          "settingsFahrenheit": "화씨",
          "settingsLanguage": "언어",
          "settingsCancel": "취소",
          "settingsChange": "변경",
          "settingsKorean": "한국어",
          "settingsEnglish": "영어",
          "settingsJapanese": "일본어"
        },
        self: {
          "0": "아주 강한 회오리 바람이 불고 있어요! 🌪",
          "1": "열대성 폭풍우가 한바탕 휘몰아치고 있어요 🌪",
          "2": "허리케인이에요. 부디 살아서 만나요..! 🌪",
          "3": "우르릉 꽝꽝 천둥번개가 치고 있어요 ⚡️",
          "4": "우르릉 꽝꽝 천둥번개가 치고 있어요 ⚡️",
          "5": "눈과 빗물이 섞인 진눈깨비가 내려요! 우산 준비 ❄️",
          "6": "눈과 빗물이 섞인 진눈깨비가 내려요! 우산 준비 ❄️",
          "7": "눈과 빗물이 섞인 진눈깨비가 내려요! 우산 준비 ❄️",
          "8": "살짝 얼어붙은 진눈깨비가 내리고 있어요. 감기 조심해요 🤧",
          "9": "잔잔한 이슬비가 내리고 있어요. ☂️  우산은 챙겼어요?",
          "10": "눈과 빗물이 섞인 진눈깨비가 내려요! 우산 준비 ☂️",
          "11": "☔️  우산 챙겼어요? 밖에 소낙비가 오고 있어요..!",
          "12": "☔️  우산 챙겼어요? 밖에 소낙비가 오고 있어요..!",
          "13": "지금 가볍게 눈이 흩뿌리고 있어요 ❄️ ",
          "14": "❄️  렛잇고~ 렛잇고~ 온세상이 하얗게 물들고 있어요 *.*",
          "15": "❄️  렛잇고~ 렛잇고~ 온세상이 하얗게 물들고 있어요 *.*",
          "16": "❄️  렛잇고~ 렛잇고~ 온세상이 하얗게 물들고 있어요 *.*",
          "17": "톡톡 우박이 떨어지고 있어요. 맞으면 꽤 아파요!",
          "18": "❄️  살짝 얼어붙은 진눈깨비가 내리고 있어요. 감기 조심해요!",
          "19": "😷  숨쉬기 힘들어요. 마스크 꼭 챙겨서 나가요 :( ",
          "20": "🌫  안개가 잔뜩 꼈어요. 운전 조심해요!",
          "21": "🌫  실안개가 스르륵 꼈어요. 운전 조심해요!",
          "22": "😷  숨쉬기 힘들어요. 마스크 꼭 챙겨서 나가요 :( ",
          "23": "🌬  바람이 많이 불어요~ 옷 단단히 여미세요! ",
          "24": "🌬  바람이 많이 불어요~ 옷 단단히 여미세요! ",
          "25": "오들오들..모든 것이 얼어붙을 것 같은 차가운 날씨예요 🤧",
          "26": "구름이 많고 흐려요. 이런날에는 실내가 최고!",
          "27": "구름이 많고 흐려서 달이 잘 안보일 거에요 :(",
          "28": "구름이 많고 흐려요. 날이 맑으면 좋을텐데..! ",
          "29": "구름이 조금 있지만 달은 밝을 거에요 🌙",
          "30": "구름이 조금 있고 흐려요 ☁️",
          "31": "청명하고 맑아요. 산책하기 딱 좋은 날씨 🌙",
          "32": "화창하고 눈이 부실 정도로 좋은 날씨에요 ☀️",
          "33": "청명하고 맑아요. 산책하기 딱 좋은 날씨!",
          "34": "행복할 정도로 맑고 밝은 날씨에요 ☀️",
          "35": "눈과 빗물이 섞인 진눈깨비가 내려요! 우산 준비 ☔️",
          "36": "으아~ 몸이 녹아내릴 것 같아요..더위 조심해요! 😵",
          "37": "우르릉 꽝꽝 천둥번개가 치고 있어요 ⚡️",
          "38": "간헐적으로 번개가 치고 있어요..! 뾰족한 우산 금지🙅",
          "39": "간헐적으로 번개가 치고 있어요..! 뾰족한 우산 금지🙅",
          "40": "소나기가 내리고 있어요. 우산 챙겼어요? ☔️",
          "41": "하늘에 구멍났나봐요! 눈이 펑펑펑 쏟아져요! ❄️❄️❄️",
          "42": "때때로 눈이 올 수 있어요! 옷 따뜻하게 여며요 :)",
          "43": "펄펄~ 눈이 옵니다~ 하늘에서 눈이 옵니다 ❄️",
          "44": "구름이 조금 있고 흐려요 ☁️",
          "45": "우르릉 꽝꽝 천둥번개가 치고 소나기가 내려요..! ⚡️",
          "46": "하늘에 구멍났나봐요! 눈이 펑펑펑 쏟아져요! ❄️❄️❄️",
          "47": "우르릉 꽝꽝 천둥번개가 치고 소나기가 내려요..! ⚡️",
          "3200": "뭔가 잘못됐어요..기상청 나와라 오바 🔍",
        },
        forecast: {
          "0": "강한 회오리바람이 불어올 거에요",
          "1": "열대성 폭풍우가 있을 거에요",
          "2": "허리케인이 다가와요...!",
          "3": "맹렬하게 천둥번개가 칠 거에요",
          "4": "맹렬하게 천둥번개가 칠 거에요",
          "5": "눈과 비가 섞인 진눈깨비가 내릴 거예요",
          "6": "눈과 비가 섞인 진눈깨비가 내릴 거예요",
          "7": "눈과 비가 섞인 진눈깨비가 내릴 거예요",
          "8": "살짝 얼어붙은 진눈깨비가 내릴 거에요",
          "9": "잔잔하게 이슬비가 내릴 거에요",
          "10": "진눈깨비가 내릴 거에요~ 우산 챙기기!",
          "11": "소나기 소식이 있어요. 우산 챙기세요~",
          "12": "소나기 소식이 있어요. 우산 챙기세요~",
          "13": "눈이 흩날리듯이 올 예정이에요. 우산 챙기기!",
          "14": "가벼운 눈보라가 날릴 거에요. 날아가지 않게 조심!",
          "15": "가벼운 눈보라가 날릴 거에요. 날아가지 않게 조심!",
          "16": "눈이 내려요. 옷 따뜻하게 입으세요 :)",
          "17": "싸락눈이 내릴 거에요. 우산 챙기세요~",
          "18": "진눈깨비가 내려요~ 우산 챙기기!",
          "19": "먼지가 많아요:( 마스크 하나씩 챙기세요",
          "20": "안개가 잔뜩 낄 거에요. 운전보다는 대중교통 이용하기!",
          "21": "실안개가 스르륵 낄 거에요",
          "22": "숨막히는 매연과 연기로 가득할거에요",
          "23": "바람이 많이 불어요. 옷 따뜻하게 입어요!",
          "24": "바람이 많이 불어요. 옷 따뜻하게 입어요!",
          "25": "모든 것이 얼어붙을 것 같은 차가운 온도예요",
          "26": "구름이 잔뜩 끼고 흐릴 거에요",
          "27": "구름이 끼고 흐릴 거에요",
          "28": "구름이 끼고 흐릴 거에요",
          "29": "구름이 있지만 맑을 수도 있어요!",
          "30": "구름이 있지만 맑을 수도 있어요!",
          "31": "청명하고 맑은 날이에요",
          "32": "화창하고 눈이 부실 정도로 좋은 날씨에요",
          "33": "산책하기 딱 좋은 청명한 밤이에요",
          "34": "행복할 정도로 맑고 밝은 날씨에요",
          "35": "진눈깨비가 내려요~ 우산 챙기기!",
          "36": "무지하게 더워요..더위 먹지 않게 조심해요!",
          "37": "번개가 칠 거에요. 우르릉 꽝꽝!",
          "38": "가끔씩 번개가 칠 수 있어요",
          "39": "가끔씩 번개가 칠 수 있어요",
          "40": "가끔씩 소나기가 올 거에요. 우산 챙겨요~",
          "41": "하늘에서 눈이 펑펑 올거에요",
          "42": "소나기처럼 갑자기 눈이 내릴 거에요",
          "43": "하늘에서 눈이 펑펑 올거에요! 감기 조심해요 :)",
          "44": "구름이 있지만 맑을 수도 있어요!",
          "45": "소나기와 함께 번개도 칠 거에요",
          "46": "하늘에서 눈이 펑펑 올거에요",
          "47": "소나기와 함께 번개도 칠 거에요",
          "3200": "뭔가 잘못됐어요..기상청 나와라 오바"
        }
      },
      "en": {
        dayOfWeek: {
          'tomorrow': 'Tomorrow',
          '0': 'Sun',
          '1': 'Mon',
          '2': 'Tue',
          '3': 'Wed',
          '4': 'Thu',
          '5': 'Fri',
          '6': 'Sat'
        },
        translation: {
          "notFoundPage": "Not found page.",
          "appTellMeLocation": "Tell us your location",

          "locationFirstTitle": "Welcome!",
          "locationSecondTitle": "Hello :)",
          "locationDescription": "Where are you now?",
          "locationButton": "Find my location",
          "locationLink": "Type yourself",
          "locationPlaceNotFound": "Could not find the correct location for your location.\nPlease move back to location.",
          "locationWeatherNotFound": "Could not find the correct weather for your location.\nPlease move back to location.",
          "locationPositionNotFound": "You can not retrieve your current location.\nPlease try again later.",

          "searchTitle": "Please type the name of city",
          "searchEmptyItem": "There is no place to match. Please enter it correctly!",

          "settingsLocation": "Location",
          "settingsCelsius": "Celsius",
          "settingsFahrenheit": "Fahrenheit",
          "settingsLanguage": "Language",
          "settingsCancel": "Cancel",
          "settingsChange": "Change",
          "settingsKorean": "Korean",
          "settingsEnglish": "English",
          "settingsJapanese": "Japanese"
        },
        self: {
          "0": "A very strong whirlwind is blowing! 🌪",
          "1": "A tropical storm is racing hard. 🌪",
          "2": "It's a hurricane. Please come and live! 🌪",
          "3": "Lightning-thunderstorm! Lightning is hitting me ⚡️",
          "4": "Lightning-thunderstorm! Lightning is hitting me ⚡️",
          "5": "The sleet with snow and rain drops down! Don't foget umbrella ❄️",
          "6": "The sleet with snow and rain drops down! Don't foget umbrella ❄️",
          "7": "The sleet with snow and rain drops down! Don't foget umbrella ❄️",
          "8": "The frozen sleet is falling. Take care of the cold 🤧",
          "9": "The drizzle is falling. Did you get your umbrella? ☂️",
          "10": "The sleet with snow and rain drops down! ☂️",
          "11": "☔️  Do you have an umbrellas? There is a shower outside ...!",
          "12": "☔️  Do you have an umbrellas? There is a shower outside ...!",
          "13": "The snow is scattering lightly now ❄️ ",
          "14": "The whole world is dyed white ❄️ ",
          "15": "The whole world is dyed white ❄️ ",
          "16": "The whole world is dyed white ❄️ ",
          "17": "The hail is falling. It hurts pretty!",
          "18": "The frozen sleet is falling. Take care of the cold 🤧",
          "19": "😷  It's hard to breathe. Take a mask :(",
          "20": "🌫   A lot of fog. Be careful driving!",
          "21": "🌫   Foggy. Be careful driving!",
          "22": "😷  It's hard to breathe. Take a mask :(",
          "23": "🌬 The wind is blowing a lot. Please tighten your clothes!",
          "24": "🌬 The wind is blowing a lot. Please tighten your clothes!",
          "25": "It's cold weather where everything seems to freeze 🤧",
          "26": "Cloudy and cloudy. Indoors are the best on this day!",
          "27": "It's cloudy and cloudy so you can not see the moon :(",
          "28": "Cloudy and cloudy. It would be nice if the day is clear ..!",
          "29": "There is a little cloud, but the moon is bright 🌙",
          "30": "Clouds are a little cloudy ☁️",
          "31": "It's a clear night just for a walk 🌙",
          "32": "Sunny and dazzling. Too gooood :)",
          "33": "It's a clear night just for a walk.",
          "34": "It's sunny and bright enough to be happy ☀️",
          "35": "The sleet with snow and rain drops down! ☂️",
          "36": "Oh, I think my body will melt .. Watch the heat! 😵",
          "37": "Lightning-thunderstorm! Lightning is hitting me ⚡️",
          "38": "Lightning is intermittent ...! No pointy umbrellas 🙅",
          "39": "Lightning is intermittent ...! No pointy umbrellas 🙅",
          "40": "The showers are coming down. Have you got an umbrella? ☔️",
          "41": "It looks like a hole in the sky! Snow are bursting! ❄️❄️❄️",
          "42": "Sometimes it can snow! Please tighten your clothes :)",
          "43": "The snow is coming from the sky ❄️",
          "44": "Clouds are a little cloudy ☁️",
          "45": "Lightning thunderstorms and showers! ⚡️",
          "46": "It looks like a hole in the sky! Snow are bursting! ❄️❄️❄️",
          "47": "Lightning thunderstorms and showers! ⚡️",
          "3200": "Something's wrong. Come on 🔍",
        },
        forecast: {
          "0": "A strong whirlwind will blow.",
          "1": "There will be a tropical storm.",
          "2": "The hurricane is approaching...!",
          "3": "Thunderstorms will be fierce.",
          "4": "Thunderstorms will be fierce.",
          "5": "The sleet with snow and rain will come down.",
          "6": "The sleet with snow and rain will come down.",
          "7": "The sleet with snow and rain will come down.",
          "8": "The frozen sleet will fall.",
          "9": "The drizzle will come down.",
          "10": "The sleet will fall. Take your umbrella!",
          "11": "I'll shower. Take your umbrella!",
          "12": "I'll shower. Take your umbrella!",
          "13": "The snow will scatter. Take an umbrella!",
          "14": "A light snowstorm will blow. Be careful not to fly!",
          "15": "A light snowstorm will blow. Be careful not to fly!",
          "16": "The snow will be fall. Please wear warm clothes :)",
          "17": "The snow will be fall. Please wear warm clothes :)",
          "18": "The sleet will fall. Take your umbrella!",
          "19": "There's a lot of dust :( Take a mask.",
          "20": "A lot of fog. Use public transportation instead of driving!",
          "21": "Foggy, but not too much.",
          "22": "Full of breathtaking smoke and smoke.",
          "23": "A lot of wind. Wear clothes warm!",
          "24": "A lot of wind. Wear clothes warm!",
          "25": "It's a cold temperature where everything seems to freeze!",
          "26": "The cloud will be cloudy and cloudy.",
          "27": "It's cloudy and cloudy so you can not see the moon :(",
          "28": "Cloudy and cloudy. It would be nice if the day is clear ..!",
          "29": "Partly cloudy but it can be clear!",
          "30": "Partly cloudy but it can be sunny!",
          "31": "It's cleary clear.",
          "32": "Sunny and dazzling. Too gooood :)",
          "33": "It's a clear night just for a walk.",
          "34": "It's sunny and bright enough to be happy",
          "35": "The sleet will fall. Take your umbrella!",
          "36": "Hot...! Hot and hot and hot and hot @.@",
          "37": "It'll be lightning...wooo....",
          "38": "Sometimes lightning..wooo....",
          "39": "Sometimes lightning..wooo....",
          "40": "Sometimes the showers will come. Take your umbrella.",
          "41": "The sky will be snowy. Elsa? Is that you?",
          "42": "It will suddenly snow like a shower.",
          "43": "The sky will be snowy. Elsa? Is that you?",
          "44": "There is a cloud but it can be sunny!",
          "45": "It will be lightning with a shower.",
          "46": "The sky will be snowy. Elsa? Is that you?",
          "47": "It will be lightning with a shower.",
          "3200": "Something's wrong. Come on."
        }
      },
      "ja": {
        dayOfWeek: {
          'tomorrow': '明日',
          '0': '日曜日',
          '1': '月曜日',
          '2': '火曜日',
          '3': '水曜日',
          '4': '木曜日',
          '5': '金曜日',
          '6': '土曜日'
        },
        translation: {
          "notFoundPage": "ページが見つかりませんでした。",
          "appTellMeLocation": "位置を教えてください",

          "locationFirstTitle": "ようこそ :)",
          "locationSecondTitle": "こんにちは :)",
          "locationDescription": "今どこにいますか?",
          "locationButton": "現在私のところ",
          "locationLink": "直接入力しますよ",
          "locationPlaceNotFound": "現在の位置に合わせて地域を見つけることができません。\n位置に移動した後、再利用してください。",
          "locationWeatherNotFound": "現在の位置に合わせて天気を見つけることができません。\n位置に移動した後、再利用してください。",
          "locationPositionNotFound": "現在の位置を呼んで来ることができません。\nしばらくして再度ご利用ください。",

          "searchTitle": "都市の名前を入力してください",
          "searchEmptyItem": "一致するところがありません。正確に入力してください！",

          "settingsLocation": "位置",
          "settingsCelsius": "摂氏",
          "settingsFahrenheit": "華氏",
          "settingsLanguage": "言語",
          "settingsCancel": "キャンセル",
          "settingsChange": "変更",
          "settingsKorean": "韓国語",
          "settingsEnglish": "英語",
          "settingsJapanese": "日本"
        },
        self: {
          "0": "非常に強い旋風が吹いています！ 🌪",
          "1": "熱帯暴風雨がひとしきり吹き荒れています🌪",
          "2": "ハリケーンです。是非生き会いましょう...！ 🌪",
          "3": "ゴロゴロヒイラギ雷が打っています⚡️",
          "4": "ゴロゴロヒイラギ雷が打っています⚡️",
          "5": "目と雨水が混じったみぞれが降っ！傘の準備❄️",
          "6": "目と雨水が混じったみぞれが降っ！傘の準備❄️",
          "7": "目と雨水が混じったみぞれが降っ！傘の準備❄️",
          "8": "軽く凍りついたみぞれが降っています。風邪気をつけて🤧",
          "9": "穏やかな小雨が降っています。 ☂️傘は取りまとめましたか？",
          "10": "目と雨水が混じったみぞれが降っ！傘の準備☂️",
          "11": "☔️傘取りまとめましたか？外大粒が来ている...！",
          "12": "☔️傘取りまとめましたか？外大粒が来ている...！",
          "13": "今軽く目がまき散らしています❄️",
          "14": "❄️レット続い〜レッド続い〜全世界が白く染まっています*。*",
          "15": "❄️レット続い〜レッド続い〜全世界が白く染まっています*。*",
          "16": "❄️レット続い〜レッド続い〜全世界が白く染まっています*。*",
          "17": "ぱんぱんあらが落ちています。当たればかなり痛い！",
          "18": "❄️軽く凍りついたみぞれが降っています。風邪気をつけて！",
          "19": "😷息大変です。マスク必ず取りまとめカミン:(",
          "20": "🌫霧がいっぱいキョトた。運転注意して！",
          "21": "🌫シルアンゲがとろりキョトた。運転注意して！",
          "22": "😷息大変です。マスク必ず取りまとめカミン:(",
          "23": "🌬風が吹いてよ〜服しっかり合わせれください！",
          "24": "🌬風が吹いてよ〜服しっかり合わせれください！",
          "25": "オドゥルオドゥル。すべてが凍りつくような寒さです🤧",
          "26": "雲が多くぼやけた。このような日には、室内が最高！",
          "27": "雲が多く、フリョソ月がよく見えないんですよ:(",
          "28": "雲が多くぼやけた。日が晴れいいのに...！",
          "29": "雲が少しありますが、月は明るいよ🌙",
          "30": "雲が少しありぼやけよ☁️",
          "31": "平静て澄んた。散歩するちょうどいい天気🌙",
          "32": "日当たりの良い、雪が不良ほど良い天気です☀️",
          "33": "平静て澄んた。散歩するちょうどいい天気！",
          "34": "幸せなほど澄んだ明るい天気です☀️",
          "35": "目と雨水が混じったみぞれが降っ！傘の準備☔️",
          "36": "うわ〜体が溶けるようです。暑さ気をつけて！ 😵",
          "37": "ゴロゴロヒイラギ雷が打っています⚡️",
          "38": "断続的に雷が打っています。！先のとがった傘禁止🙅",
          "39": "断続的に雷が打っています。！先のとがった傘禁止🙅",
          "40": "にわか雨が降っています。傘取りまとめましたか？ ☔️",
          "41": "空の穴出たか見て！目がパッこんこんあふれよ！ ❄️❄️❄️",
          "42": "時折雪が降ることができます！服暖かくてミョヨ:)",
          "43": "ぐらぐら〜雪がします〜空から雪がします❄️",
          "44": "雲が少しありぼやけよ☁️",
          "45": "ゴロゴロヒイラギ雷がヒットシャワーが離陸...！ ⚡️",
          "46": "空の穴出たか見て！目がパッこんこんあふれよ！ ❄️❄️❄️",
          "47": "ゴロゴロヒイラギ雷がヒットシャワーが離陸...！ ⚡️",
          "3200": "何かが間違ってい...気象庁出ろオーバー🔍"
        },
        forecast: {
          "0": "強い旋風が吹いてくるよ",
          "1": "熱帯暴風雨があるんですよ",
          "2": "ハリケーンが近づいて来て...！",
          "3": "猛烈に雷よ",
          "4": "猛烈に雷よ",
          "5": "雨や雪が混ざったみぞれが降るでしょう",
          "6": "雨や雪が混ざったみぞれが降るでしょう",
          "7": "雨や雪が混ざったみぞれが降るでしょう",
          "8": "軽く凍りついたみぞれが降るよ",
          "9": "穏かに小雨が降るよ",
          "10": "みぞれが降るんですよ〜傘取りまとめる！",
          "11": "にわか雨ニュースがあります。傘ギアアップ〜",
          "12": "にわか雨ニュースがあります。傘ギアアップ〜",
          "13": "目が飛び散るリドゥトが来る予定です。傘取りまとめる！",
          "14": "軽い吹雪が飛ばすんです。飛ばされないように注意！",
          "15": "軽い吹雪が飛ばすんです。飛ばされないように注意！",
          "16": "目が離陸。服暖かく着る:)",
          "17": "粉雪が降るんです。傘ギアアップ〜",
          "18": "みぞれが降っ〜傘取りまとめる！",
          "19": "ほこりが多い:(マスクずつ集める",
          "20": "霧がいっぱいはめんです。運転より公共交通機関を利用する！",
          "21": "シルアンゲがとろり挟まよ",
          "22": "息をのむよう煤煙と演技でいっぱいですよ",
          "23": "風がたくさん吹いた。服暖かく着ている！",
          "24": "風がたくさん吹いた。服暖かく着ている！",
          "25": "すべてが凍りつくような寒さです",
          "26": "雲がいっぱいはめ曇っよ",
          "27": "雲がはめ曇っよ",
          "28": "雲がはめ曇っよ",
          "29": "雲があるが晴れることもあります！",
          "30": "雲があるが晴れることもあります！",
          "31": "平静て晴れた日です",
          "32": "日当たりの良い、雪が不良ほど良い天気です",
          "33": "散歩するちょうど良い快晴の夜だ",
          "34": "幸せなほど澄んだ明るい天気です",
          "35": "みぞれが降っ〜傘取りまとめる！",
          "36": "知らずに暑い。暑さに食べないように注意してください！",
          "37": "雷雨ですよ。ゴロゴロヒイラギ！",
          "38": "時々雷雨ことができます",
          "39": "時々雷雨ことができます",
          "40": "時々にわか雨が来るんです。傘スモック〜",
          "41": "空から雪がこんこんとくるよ",
          "42": "シャワーのように急に雪が降るよ",
          "43": "空から雪がこんこんになります！風邪気をつけて:)",
          "44": "雲があるが晴れることもあります！",
          "45": "シャワーと一緒に雷も塗りよ",
          "46": "空から雪がこんこんとくるよ",
          "47": "シャワーと一緒に雷も塗りよ",
          "3200": "何かが間違ってい...気象庁出ろオーバー"
        }
      }
    }
  })


export default i18n
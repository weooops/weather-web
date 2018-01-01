const flagCases = {
  'AF': 'afghanistan',
  'AL': 'albania',
  'DZ': 'algeria',
  'AS': 'american_samoa',
  'AD': 'andorra',
  'AO': 'angola',
  'AI': 'anguilla',
  'AG': 'antigua_and_barbuda',
  'AR': 'argentina',
  'AM': 'armenia',
  'AW': 'aruba',
  'AU': 'australia',
  'AT': 'austria',
  'AZ': 'azerbaijan',
  'BS': 'bahamas',
  'BH': 'bahrain',
  'BD': 'bangladesh',
  'BB': 'barbados',
  'BY': 'belarus',
  'BE': 'belgium',
  'BZ': 'belize',
  'BJ': 'benin',
  'BM': 'bermuda',
  'BT': 'bhutan',
  'BO': 'bolivia',
  'BA': 'bosnia_and_herzegovina',
  'BW': 'botswana',
  'BR': 'brazil',
  'VG': 'british_virgin_islands',
  'BN': 'brunei',
  'BG': 'bulgaria',
  'BF': 'burkina_faso',
  'BI': 'burundi',
  'KH': 'cambodia',
  'CM': 'cameroon',
  'CA': 'canada',
  'CV': 'cape_verde',
  'KY': 'cayman_islands',
  'CF': 'central_african_republic',
  'TD': 'chad',
  'CL': 'chile',
  'CN': 'china',
  'CX': 'christmas_island',
  'CC': 'cocos_islands',
  'CO': 'colombia',
  'KM': 'comoros',
  'CR': 'costa_rica',
  'cote': 'cote_d_ivoire',
  'HR': 'croatia',
  'CU': 'cuba',
  'CW': 'curacao',
  'CY': 'cyprus',
  'CZ': 'czech_republic',
  'DK': 'denmark',
  'DJ': 'djibouti',
  'DM': 'dominica',
  'DO': 'dominican_republic',
  'TL': 'east_timor',
  'EC': 'ecuador',
  'EG': 'egypt',
  'SV': 'el_salvador',
  'GQ': 'equatorial_guinea',
  'ER': 'eritrea',
  'EE': 'estonia',
  'ET': 'ethiopia',
  'EU': 'europe',
  'FK': 'falkland_islands',
  'FJ': 'fiji',
  'FI': 'finland',
  'FR': 'france',
  'PF': 'french_polynesia',
  'GA': 'gabon',
  'GM': 'gambia',
  'GE': 'georgia',
  'DE': 'germany',
  'GH': 'ghana',
  'GI': 'gibraltar',
  'GR': 'greece',
  'GL': 'greenland',
  'GD': 'grenada',
  'GU': 'guam',
  'GT': 'guatemala',
  'GG': 'guernsey',
  'GN': 'guinea_bissau',
  'GW': 'guinea',
  'GY': 'guyana',
  'HT': 'haiti',
  'HN': 'honduras',
  'HK': 'hongkong',
  'HU': 'hungary',
  'IS': 'iceland',
  'IN': 'india',
  'ID': 'indonesia',
  'IR': 'iran',
  'IQ': 'iraq',
  'IE': 'ireland',
  'IM': 'isle_of_man',
  'IL': 'israel',
  'IT': 'italy',
  'JM': 'jamaica',
  'JP': 'japan',
  'JE': 'jersey',
  'JO': 'jordan',
  'KZ': 'kazakhstan',
  'KE': 'kenya',
  'KI': 'kiribati',
  'XK': 'kosovo',
  'KW': 'kuwait',
  'KG': 'kyrgyzstan',
  'LA': 'laos',
  'LV': 'latvia',
  'LB': 'lebanon',
  'LS': 'lesotho',
  'LR': 'liberia',
  'LY': 'libya',
  'LI': 'liechtenstein',
  'LT': 'lithuania',
  'LU': 'luxembourg',
  'MO': 'macau',
  'MK': 'macedonia',
  'MG': 'madagascar',
  'MW': 'malawi',
  'MY': 'malaysia',
  'MV': 'maldives',
  'ML': 'mali',
  'MT': 'malta',
  'MH': 'marshall_islands',
  'MR': 'mauritania',
  'MU': 'mauritius',
  'MX': 'mexico',
  'FM': 'micronesia',
  'MD': 'moldova',
  'MC': 'monaco',
  'MN': 'mongolia',
  'ME': 'montenegro',
  'MS': 'montserrat',
  'MA': 'morocco',
  'MZ': 'mozambique',
  'MM': 'myanmar_burma',
  'NA': 'namibia',
  'NR': 'nauru',
  'NP': 'nepal',
  'NL': 'netherlands_antilles',
  'AN': 'netherlands',
  'NC': 'new_caledonia',
  'NZ': 'new_zealand',
  'NI': 'nicaragua',
  'NE': 'niger',
  'NG': 'nigeria',
  'NU': 'niue',
  'KP': 'north_korea',
  'NO': 'norway',
  'OM': 'oman',
  'PK': 'pakistan',
  'PW': 'palau',
  'PS': 'palestine',
  'PA': 'panama',
  'PG': 'papua_new_guinea',
  'PY': 'paraguay',
  'PE': 'peru',
  'PH': 'philippines',
  'PN': 'pitcairn_islands',
  'PL': 'poland',
  'PT': 'portugal',
  'PR': 'puerto_rico',
  'QA': 'qatar',
  'RO': 'romania',
  'RU': 'russia',
  'RW': 'rwanda',
  'KN': 'saint_kitts_and_nevis',
  'LC': 'saint_lucia',
  'VC': 'saint_vincent_and_grenadines',
  'WS': 'samoa',
  'SM': 'san_marino',
  'ST': 'sao_tome_principe',
  'SA': 'saudi_arabia',
  'SN': 'senegal',
  'RS': 'serbia',
  'SC': 'seychelles',
  'SL': 'sierra_leone',
  'SG': 'singapore',
  'SX': 'sint_maarten',
  'SK': 'slovakia',
  'SI': 'slovenia',
  'SB': 'solomon_islands',
  'SO': 'somalia',
  'ZA': 'south_africa',
  'KR': 'south_korea',
  'SS': 'south_sudan',
  'ES': 'spain',
  'LK': 'sri_lanka',
  'SD': 'sudan',
  'SR': 'suriname',
  'SZ': 'swaziland',
  'SE': 'sweden',
  'CH': 'switzeland',
  'SY': 'syria',
  'TW': 'taiwan',
  'TJ': 'tajikistan',
  'TZ': 'tanzania',
  'TH': 'thailand',
  'TG': 'togo',
  'TK': 'tokelau',
  'TO': 'tonga',
  'TT': 'trinidad_and_tobago',
  'TN': 'tunisia',
  'TR': 'turkey',
  'TM': 'turkmenistan',
  'TV': 'tuvalu',
  'UG': 'uganda',
  'UA': 'ukraine',
  'AE': 'united_arab_emirates_uae',
  'GB': 'united_kingdom',
  'US': 'united_states',
  'UY': 'uruguay',
  'UZ': 'uzbekistan',
  'VU': 'vanuatu',
  'VA': 'vatican',
  'VE': 'venezuela',
  'VN': 'vietnam',
  'WF': 'wallis_and_futuna',
  'YE': 'yemen',
  'ZM': 'zambia',
  'ZW': 'zimbabwe',
};

export default flagCases;
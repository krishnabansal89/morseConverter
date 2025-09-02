"use client"

import { useState, useEffect, useRef } from "react"
import {
  Copy, Download, Trash2, HelpCircle, Volume2, Pause, Play, Square,
  Settings, ArrowLeftRight, ArrowUpDown, Lightbulb, Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const translations = {
  en: {
    morseToTextPlaceholder: "Enter Morse code (use dots and dashes, space between characters, and three spaces between words)",
    textToMorsePlaceholder: "Enter text to convert to Morse code",
    onlyDotsAndDashesAllowed: "In Morse code mode, only dots (.), dashes (-), and spaces are allowed",
    play: "Play",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    copy: "Copy",
    copied: "Copied!",
    download: "Download",
    clear: "Clear",
    settings: "Settings",
    help: "Help",
    audio: "Audio",
    visual: "Visual",
    swap: "Swap",
    convertedTextWillAppearHere: "Converted text will appear here",
    morseCodeWillAppearHere: "Morse code will appear here",
    debugPlayingMorseAudio: "Playing Morse audio:",
    debugInputLabel: "Input",
    debugOutputLabel: "Output",
    debugStartIndex: "Start index:",
    errorFailedToInitAudio: "Failed to initialize AudioContext:",
    headingMorseCode: "Morse Code",
    headingText: "Text"
  },
  de: {
    morseToTextPlaceholder: "Geben Sie den Morsecode ein (verwenden Sie Punkte und Striche, Leerzeichen zwischen Zeichen und drei Leerzeichen zwischen Wörtern)",
    textToMorsePlaceholder: "Geben Sie Text ein, um ihn in Morsecode umzuwandeln",
    onlyDotsAndDashesAllowed: "Im Morsecode-Modus sind nur Punkte (.), Striche (-) und Leerzeichen erlaubt",
    play: "Abspielen",
    pause: "Pause",
    resume: "Fortsetzen",
    stop: "Stopp",
    copy: "Kopieren",
    copied: "Kopiert!",
    download: "Herunterladen",
    clear: "Löschen",
    settings: "Einstellungen",
    help: "Hilfe",
    audio: "Audio",
    visual: "Visuell",
    swap: "Tauschen",
    convertedTextWillAppearHere: "Konvertierter Text erscheint hier",
    morseCodeWillAppearHere: "Morsecode erscheint hier",
    debugPlayingMorseAudio: "Playing Morse audio:", // Placeholder - Bitte übersetzen
    debugInputLabel: "Input", // Placeholder - Bitte übersetzen
    debugOutputLabel: "Output", // Placeholder - Bitte übersetzen
    debugStartIndex: "Start index:", // Placeholder - Bitte übersetzen
    errorFailedToInitAudio: "Failed to initialize AudioContext:", // Placeholder - Bitte übersetzen
    headingMorseCode: "Morsecode", // Placeholder - Bitte übersetzen
    headingText: "Text"            // Placeholder - Bitte übersetzen
  },
  it: {
    morseToTextPlaceholder: "Inserisci il codice Morse qui (usa punti e linee, spazio tra i caratteri e tre spazi tra le parole)",
    textToMorsePlaceholder: "Inserisci il testo da convertire in codice Morse",
    onlyDotsAndDashesAllowed: "In modalità codice Morse sono ammessi solo punti (.), linee (-) e spazi",
    play: "Riproduci",
    pause: "Pausa",
    resume: "Riprendi",
    stop: "Stop",
    copy: "Copia",
    copied: "Copiato!",
    download: "Scarica",
    clear: "Cancella",
    settings: "Impostazioni",
    help: "Aiuto",
    audio: "Audio",
    visual: "Visivo",
    swap: "Scambia",
    convertedTextWillAppearHere: "Il testo convertito apparirà qui",
    morseCodeWillAppearHere: "Il codice Morse apparirà qui",
    debugPlayingMorseAudio: "Playing Morse audio:", // Placeholder - Si prega di tradurre
    debugInputLabel: "Input", // Placeholder - Si prega di tradurre
    debugOutputLabel: "Output", // Placeholder - Si prega di tradurre
    debugStartIndex: "Start index:", // Placeholder - Si prega di tradurre
    errorFailedToInitAudio: "Failed to initialize AudioContext:", // Placeholder - Si prega di tradurre
    headingMorseCode: "Codice Morse", // Placeholder - Si prega di tradurre
    headingText: "Testo"            // Placeholder - Si prega di tradurre
  },
  tr: {
    morseToTextPlaceholder: "Morse kodunu buraya girin (nokta ve çizgileri kullanın, karakterler arasında boşluk ve kelimeler arasında üç boşluk bırakın)",
    textToMorsePlaceholder: "Morse koduna dönüştürmek için metin girin",
    onlyDotsAndDashesAllowed: "Morse kodu modunda yalnızca nokta (.), çizgi (-) ve boşluklara izin verilir",
    play: "Çal",
    pause: "Duraklat",
    resume: "Devam et",
    stop: "Durdur",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    download: "İndir",
    clear: "Temizle",
    settings: "Ayarlar",
    help: "Yardım",
    audio: "Ses",
    visual: "Görsel",
    swap: "Değiştir",
    convertedTextWillAppearHere: "Dönüştürülmüş metin burada görünecek",
    morseCodeWillAppearHere: "Morse kodu burada görünecek",
    debugPlayingMorseAudio: "Playing Morse audio:", // Placeholder - Lütfen çevirin
    debugInputLabel: "Input", // Placeholder - Lütfen çevirin
    debugOutputLabel: "Output", // Placeholder - Lütfen çevirin
    debugStartIndex: "Start index:", // Placeholder - Lütfen çevirin
    errorFailedToInitAudio: "Failed to initialize AudioContext:", // Placeholder - Lütfen çevirin
    headingMorseCode: "Mors Kodu", // Placeholder - Lütfen çevirin
    headingText: "Metin"            // Placeholder - Lütfen çevirin
  },
  es: {
    morseToTextPlaceholder: "Ingrese el código Morse aquí (use puntos y rayas, espacio entre caracteres y tres espacios entre palabras)",
    textToMorsePlaceholder: "Ingrese el texto para convertirlo a código Morse",
    onlyDotsAndDashesAllowed: "En el modo de código Morse, solo se permiten puntos (.), rayas (-) y espacios",
    play: "Reproducir",
    pause: "Pausa",
    resume: "Reanudar",
    stop: "Detener",
    copy: "Copiar",
    copied: "¡Copiado!",
    download: "Descargar",
    clear: "Borrar",
    settings: "Ajustes",
    help: "Ayuda",
    audio: "Audio",
    visual: "Visual",
    swap: "Intercambiar",
    convertedTextWillAppearHere: "El texto convertido aparecerá aquí",
    morseCodeWillAppearHere: "El código Morse aparecerá aquí",
    debugPlayingMorseAudio: "Playing Morse audio:", // Placeholder - Por favor, traducir
    debugInputLabel: "Input", // Placeholder - Por favor, traducir
    debugOutputLabel: "Output", // Placeholder - Por favor, traducir
    debugStartIndex: "Start index:", // Placeholder - Por favor, traducir
    errorFailedToInitAudio: "Failed to initialize AudioContext:", // Placeholder - Por favor, traducir
    headingMorseCode: "Código morse", // Placeholder - Por favor, traducir
    headingText: "Texto"            // Placeholder - Por favor, traducir
  },
  fr: {
    morseToTextPlaceholder: "Entrez le code Morse ici (utilisez des points et des traits, un espace entre les caractères et trois espaces entre les mots)",
    textToMorsePlaceholder: "Entrez le texte à convertir en code Morse",
    onlyDotsAndDashesAllowed: "En mode code Morse, seuls les points (.), les traits (-) et les espaces sont autorisés",
    play: "Lire",
    pause: "Pause",
    resume: "Reprendre",
    stop: "Arrêter",
    copy: "Copier",
    copied: "Copié !",
    download: "Télécharger",
    clear: "Effacer",
    settings: "Paramètres",
    help: "Aide",
    audio: "Audio",
    visual: "Visuel",
    swap: "Échanger",
    convertedTextWillAppearHere: "Le texte converti apparaîtra ici",
    morseCodeWillAppearHere: "Le code Morse apparaîtra ici",
    debugPlayingMorseAudio: "Playing Morse audio:", // Placeholder - Veuillez traduire
    debugInputLabel: "Input", // Placeholder - Veuillez traduire
    debugOutputLabel: "Output", // Placeholder - Veuillez traduire
    debugStartIndex: "Start index:", // Placeholder - Veuillez traduire
    errorFailedToInitAudio: "Failed to initialize AudioContext:", // Placeholder - Veuillez traduire
    headingMorseCode: "Code Morse", // Fixed from "Texte"
    headingText: "Texte"            // Fixed from "Code Morse"
  },
  pt: {
    morseToTextPlaceholder: "Insira o código Morse aqui (use pontos e traços, espaço entre caracteres e três espaços entre palavras)",
    textToMorsePlaceholder: "Insira o texto para converter em código Morse",
    onlyDotsAndDashesAllowed: "No modo código Morse, apenas pontos (.), traços (-) e espaços são permitidos",
    play: "Reproduzir",
    pause: "Pausar",
    resume: "Continuar",
    stop: "Parar",
    copy: "Copiar",
    copied: "Copiado!",
    download: "Baixar",
    clear: "Limpar",
    settings: "Configurações",
    help: "Ajuda",
    audio: "Áudio",
    visual: "Visual",
    swap: "Alternar",
    convertedTextWillAppearHere: "O texto convertido aparecerá aqui",
    morseCodeWillAppearHere: "O código Morse aparecerá aqui",
    debugPlayingMorseAudio: "Reproduzindo áudio Morse:",
    debugInputLabel: "Entrada",
    debugOutputLabel: "Saída",
    debugStartIndex: "Índice inicial:",
    errorFailedToInitAudio: "Falha ao inicializar AudioContext:",
    headingMorseCode: "Código Morse",
    headingText: "Texto"
  },
  vi: {
    morseToTextPlaceholder: "Nhập mã Morse ở đây (sử dụng dấu chấm và gạch ngang, khoảng trắng giữa các ký tự và ba khoảng trắng giữa các từ)",
    textToMorsePlaceholder: "Nhập văn bản để chuyển đổi thành mã Morse",
    onlyDotsAndDashesAllowed: "Trong chế độ mã Morse, chỉ cho phép dấu chấm (.), gạch ngang (-) và khoảng trắng",
    play: "Phát",
    pause: "Tạm dừng",
    resume: "Tiếp tục",
    stop: "Dừng",
    copy: "Sao chép",
    copied: "Đã sao chép!",
    download: "Tải xuống",
    clear: "Xóa",
    settings: "Cài đặt",
    help: "Trợ giúp",
    audio: "Âm thanh",
    visual: "Hình ảnh",
    swap: "Hoán đổi",
    convertedTextWillAppearHere: "Văn bản đã chuyển đổi sẽ xuất hiện ở đây",
    morseCodeWillAppearHere: "Mã Morse sẽ xuất hiện ở đây",
    debugPlayingMorseAudio: "Đang phát âm thanh Morse:",
    debugInputLabel: "Đầu vào",
    debugOutputLabel: "Đầu ra",
    debugStartIndex: "Chỉ số bắt đầu:",
    errorFailedToInitAudio: "Không thể khởi tạo AudioContext:",
    headingMorseCode: "Mã Morse",
    headingText: "Văn bản"
  },
  ru: {
    morseToTextPlaceholder: "Введите азбуку Морзе (используйте точки и тире, пробел между символами и три пробела между словами)",
    textToMorsePlaceholder: "Введите текст для перевода в азбуку Морзе",
    onlyDotsAndDashesAllowed: "В режиме азбуки Морзе разрешены только точки (.), тире (-) и пробелы",
    play: "Воспроизвести",
    pause: "Пауза",
    resume: "Продолжить",
    stop: "Стоп",
    copy: "Копировать",
    copied: "Скопировано!",
    download: "Скачать",
    clear: "Очистить",
    settings: "Настройки",
    help: "Помощь",
    audio: "Аудио",
    visual: "Визуально",
    swap: "Поменять",
    convertedTextWillAppearHere: "Переведенный текст появится здесь",
    morseCodeWillAppearHere: "Азбука Морзе появится здесь",
    debugPlayingMorseAudio: "Воспроизведение аудио Морзе:",
    debugInputLabel: "Ввод",
    debugOutputLabel: "Вывод",
    debugStartIndex: "Начальный индекс:",
    errorFailedToInitAudio: "Не удалось инициализировать AudioContext:",
    headingMorseCode: "Азбука Морзе",
    headingText: "Текст"
  }
  // Add more languages as needed
}



// International Morse Code Map
export const internationalMorseCodeMap: Record<string, string> = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
  "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
  "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
  ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
  "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
  "--..": "Z", ".----": "1", "..---": "2", "...--": "3", "....-": "4",
  ".....": "5", "-....": "6", "--...": "7", "---..": "8", "----.": "9",
  "-----": "0", ".-.-.-": ".", "--..--": ",", "..--..": "?", ".----.": "'",
  "-.-.--": "!", "-..-.": "/", "-.--.": "(", "-.--.-": ")", ".-...": "&",
  "---...": ":", "-.-.-.": ";", "-...-": "=", ".-.-.": "+", "-....-": "-",
  "..--.-": "_", ".-..-.": '"', "...-..-": "$", ".--.-.": "@", "": " ",
}
export const russianMorseCodeMap = {
  ".-": "А",      // A
  "-...": "Б",    // B
  ".--": "В",     // W
  "--.": "Г",     // G
  "-..": "Д",     // D
  ".": "Е",       // E
  "...-": "Ж",    // V
  "--..": "З",    // Z
  "..": "И",      // I
  ".---": "Й",    // J
  "-.-": "К",     // K
  ".-..": "Л",    // L
  "--": "М",      // M
  "-.": "Н",      // N
  "---": "О",     // O
  ".--.": "П",    // P
  ".-.": "Р",     // R
  "...": "С",     // S
  "-": "Т",       // T
  "..-": "У",     // U
  "..-.": "Ф",    // F
  "....": "Х",    // H
  "-.-.": "Ц",    // C
  "---.": "Ч",    // Special
  "----": "Ш",    // Special  
  "--.-": "Щ",    // Q
  ".--.-": "Ъ",   // No Latin equivalent
  "-.--": "Ы",    // Y
  "-..-": "Ь",    // X
  "..-..": "Э",   // Special
  "..--": "Ю",    // Special
  ".-.-": "Я",    // Special
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0"
}

// American Morse Code Map
// American Morse code uses different patterns than International Morse
export const americanMorseCodeMap: Record<string, string> = {
  // Letters
  ".-": "A",
  "-...": "B",
  ".. .": "C",
  "-..": "D",
  ".": "E",
  ".-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  "-.-.": "J",
  "-.-": "K",
  "----": "L",
  "--": "M",
  "-.": "N",
  ". .": "O",
  ".....": "P",
  "..-.": "Q",
  ". ..": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  ".-..": "X",
  ".. ..": "Y",
  "... .": "Z",
  // Numbers
  ".---.": "1",
  "..--..": "2",
  "...-.": "3",
  "....-": "4",
  "---": "5",
  "......": "6",
  "--...": "7",
  "-....": "8",
  "--.-": "9",
  "------": "0"
};

export const germanMorseCodeMap = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  ".-.-": "Ä",
  "---.": "Ö",
  "..--": "Ü",
  "...--..": "ß",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
  ".-.-.-": ".",
  "--..--": ",",
  "..--..": "?",
  ".----.": "'",
  "-.-.--": "!",
  "-..-.": "/",
  "-.--.": "(",
  "-.--.-": ")",
  ".-...": "&",
  "---...": ":",
  "-.-.-.": ";",
  "-...-": "=",
  ".-.-.": "+",
  "-....-": "-",
  "..--.-": "_",
  ".-..-.": "\"",
  "...-..-": "$",
  ".--.-.": "@",
  "": " "
}
// French Morse code map (extending International with French-specific characters)
export const frenchMorseCodeMap = {
  ...internationalMorseCodeMap,
  "..-..": "é",
  ".-..-": "è",
  "-.-.--": "ç",
  ".--.-": "à",
  ".-.-": "â",
  "..-.": "ê",
  "--..-.": "ù",
}

// Italian Morse code map
export const italianMorseCodeMap = {
  ...internationalMorseCodeMap,
  ".--.-": "à",
  ".-.-": "è",
  ".-..-": "é",
  "----.": "ì",
  "--.--": "ò",
  "..--": "ù",
}

// Spanish Morse code map
// Spanish Morse code map
export const spanishMorseCodeMap = {
  ...internationalMorseCodeMap,
  "--.--": "ñ",
  ".--.-": "á",
  ".-.-": "é",
  "..-.": "í",
  "---.": "ó",  // Fixed: changed from "--.--" to "---."
  "..--": "ú",
  "...-...": "ü",
}

// Turkish Morse code map
export const turkishMorseCodeMap = {
  ...internationalMorseCodeMap,
  "-.-.--": "ç",
  "--.-.": "ğ",  // Fixed: changed from "..--" to "--.-."
  "..-.-": "ı",
  "--.--": "ö",
  ".--.": "ş",
  "..--": "ü",
}


// Portuguese Morse code map
export const portugueseMorseCodeMap = {
  ...internationalMorseCodeMap,
  ".--.-": "á",
  ".-.-": "â",
  ".--.-.": "ã",
  "-.-.--": "ç",
  "..-..": "é",
  ".-..-": "ê",
  "----.": "í",
  "--.--": "ó",
  "--.-.-": "õ",
  "..--": "ú",
}

// Turkish Morse code map

// Vietnamese Morse code map
export const vietnameseMorseCodeMap = {
  ...internationalMorseCodeMap,
  ".--.-": "ă",
  ".-.-": "â",
  "..-.": "ê",
  "--.--": "ô",
  "--.-": "ơ",
  "--..-.": "ư",
  "-..-.": "đ",
}

// For backward compatibility
export const morseCodeMap = internationalMorseCodeMap;

// Function to build text-to-morse map from a morse-to-text map
const buildTextToMorseMap = (morseToTextMap: Record<string, string>): Record<string, string> => {
  return Object.entries(morseToTextMap).reduce(
    (acc, [morse, text]) => {
      if (text !== " ") {
        // Normalize the character before using it as a key
        const normalizedChar = text.normalize('NFC').toLowerCase();
        acc[normalizedChar] = morse;
      }
      return acc
    },
    {} as Record<string, string>
  );
}


// Create the international text-to-morse map
const textToInternationalMorseMap = buildTextToMorseMap(internationalMorseCodeMap);

// Create the American text-to-morse map
const textToAmericanMorseMap = buildTextToMorseMap(americanMorseCodeMap);

const textToRussianMorseMap = buildTextToMorseMap(russianMorseCodeMap);

const textToGermanMorseMap = buildTextToMorseMap(germanMorseCodeMap);
// Create text-to-morse maps for each language
const textToFrenchMorseMap = buildTextToMorseMap(frenchMorseCodeMap);
const textToItalianMorseMap = buildTextToMorseMap(italianMorseCodeMap);
const textToSpanishMorseMap = buildTextToMorseMap(spanishMorseCodeMap);
const textToPortugueseMorseMap = buildTextToMorseMap(portugueseMorseCodeMap);
const textToTurkishMorseMap = buildTextToMorseMap(turkishMorseCodeMap);
const textToVietnameseMorseMap = buildTextToMorseMap(vietnameseMorseCodeMap);

// Function to select the appropriate Morse code map based on language
const getMorseToTextMap = (language, isAmericanMorseCode) => {
  if (isAmericanMorseCode) {
    return americanMorseCodeMap;
  }

  switch (language) {
    case "ru": return russianMorseCodeMap;
    case "de": return germanMorseCodeMap;
    case "fr": return frenchMorseCodeMap;
    case "it": return italianMorseCodeMap;
    case "es": return spanishMorseCodeMap;
    case "pt": return portugueseMorseCodeMap;
    case "tr": return turkishMorseCodeMap;
    case "vi": return vietnameseMorseCodeMap;
    default: return internationalMorseCodeMap;
  }
};

// Function to select the appropriate text-to-morse map based on language
const getTextToMorseMap = (language, isAmericanMorseCode) => {
  if (isAmericanMorseCode) {
    return textToAmericanMorseMap;
  }

  switch (language) {
    case "ru": return textToRussianMorseMap;
    case "de": return textToGermanMorseMap;
    case "fr": return textToFrenchMorseMap;
    case "it": return textToItalianMorseMap;
    case "es": return textToSpanishMorseMap;
    case "pt": return textToPortugueseMorseMap;
    case "tr": return textToTurkishMorseMap;
    case "vi": return textToVietnameseMorseMap;
    default: return textToInternationalMorseMap;
  }
};

// For backward compatibility

export default function MorseConverter({
  initialText = "",
  textToMorse = false,
  isAmericanMorseCode = false,
  language = "en"
}: {
  initialText?: string,
  textToMorse?: boolean,
  isAmericanMorseCode?: boolean,
  language?: "en" | "de" | "it" | "tr" | "es" | "fr" | "pt" | "vi" | "ru"
}) {
  // Get the language strings, default to English if the specified language is not available
  const strings = translations[language] || translations.en;
  const [isVisualPlaying, setIsVisualPlaying] = useState(false)
  const [inputText, setInputText] = useState(initialText || "")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"morse-to-text" | "text-to-morse">(textToMorse ? "text-to-morse" : "morse-to-text")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInputPlaying, setIsInputPlaying] = useState(false)
  const [isInputVisualPlaying, setIsInputVisualPlaying] = useState(false)
  const [audioSettings, setAudioSettings] = useState({
    wpm: 15,
    frequency: 700,
    volume: 0.5,
    soundType: 'cw' // Default to CW radio tone
  })
  const [flashText, setFlashText] = useState<{
    button: string;
    text: string;
    active: boolean;
  }>({
    button: "",
    text: "",
    active: false
  });
  const showFlashText = (button: string, text: string, duration: number = 1500) => {
    setFlashText({
      button,
      text,
      active: true
    });

    setTimeout(() => {
      setFlashText(prev => ({
        ...prev,
        active: false
      }));
    }, duration);
  };

  // Alert message state
  const [alertMessage, setAlertMessage] = useState<{ text: string, type: 'info' | 'success' | 'error' | 'warning' } | null>(null)

  // New state for pause/resume and progress tracking
  const [isInputAudioPaused, setIsInputAudioPaused] = useState(false)
  const [isOutputAudioPaused, setIsOutputAudioPaused] = useState(false)
  const [isInputVisualPaused, setIsInputVisualPaused] = useState(false)
  const [isOutputVisualPaused, setIsOutputVisualPaused] = useState(false)


  // New state for effect selection
  const [audioEffectSelected, setAudioEffectSelected] = useState(true)
  const [visualEffectSelected, setVisualEffectSelected] = useState(false)

  // Track current position for pause/resume
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)
  const [currentVisualIndex, setCurrentVisualIndex] = useState(0)

  const [typingPlaceholder, setTypingPlaceholder] = useState("")
  const [inputError, setInputError] = useState<string | null>(null)
  const [visualEffect, setVisualEffect] = useState({
    active: false,
    isDash: false
  })

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const converterRef = useRef<HTMLDivElement>(null)

  // Refs for managing timeouts and playback timing
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const visualTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const activeVisualTimeoutsRef = useRef<NodeJS.Timeout[]>([])

  // Check if it's a single letter display mode
  const isSingleLetterMode = initialText.length === 1

  // Handle typing effect for placeholders
  useEffect(() => {
    const placeholder = mode === "morse-to-text"
      ? strings.morseToTextPlaceholder
      : strings.textToMorsePlaceholder

    let currentIndex = 0
    let typingInterval: NodeJS.Timeout

    const typeChar = () => {
      if (currentIndex <= placeholder.length) {
        setTypingPlaceholder(placeholder.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        // Reset to start typing again after a pause
        setTimeout(() => {
          currentIndex = 0
          typingInterval = setInterval(typeChar, 70)
        }, 3000)
      }
    }

    typingInterval = setInterval(typeChar, 70)

    return () => clearInterval(typingInterval)
  }, [mode, language, strings])

  // Set initial text and conversion
  useEffect(() => {
    if (initialText) {
      setInputText(initialText)
      // Perform the appropriate conversion based on mode
      if (mode === "morse-to-text") {
        convertMorseToText(initialText)
      } else {
        convertTextToMorse(initialText)
      }
    }
  }, [initialText])

  // Convert input based on selected mode whenever it changes
  useEffect(() => {
    if (mode === "morse-to-text") {
      convertMorseToText(inputText)
    } else {
      convertTextToMorse(inputText)
    }
  }, [inputText, mode])

  // Initialize audio context
  useEffect(() => {
    return () => {
      // Cleanup audio context when component unmounts
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])
  // Function to show alert message and auto-hide after a duration with smooth transition
  const showAlert = (text: string, type: 'info' | 'success' | 'error' | 'warning' = 'info', duration: number = 3000) => {
    // Set the new alert message
    setAlertMessage({ text, type });

    // If duration is provided, auto-hide after that duration
    if (duration > 0) {
      const timer = setTimeout(() => {
        // Add fadeOut class and then remove the alert after animation completes
        const alertElement = document.querySelector('[role="alert"]');
        if (alertElement) {
          alertElement.classList.add('animate-fadeOut');
          alertElement.classList.remove('animate-fadeIn');

          // Wait for animation to complete before removing the alert
          setTimeout(() => {
            setAlertMessage(null);
          }, 300); // Match the animation duration
        } else {
          // Fallback if element not found
          setAlertMessage(null);
        }
      }, duration - 300); // Adjust timing to account for animation

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  };

  // Convert morse code to text
  // Convert morse code to text
  // Convert morse code to text
  const convertMorseToText = (morse: string) => {
    if (!morse.trim()) {
      setOutputText("")
      return
    }

    // Select the correct map based on the language and mode
    const morseToTextMap = getMorseToTextMap(language, isAmericanMorseCode);

    const morseWords = morse.trim().split("   ") // Split input into words based on 3 spaces

    const textWords = morseWords.map((word) => {
      // --- Logic Branching ---
      if (!isAmericanMorseCode) {
        // --- International or language-specific Morse Code Logic ---
        // Standard split by single space works here
        const morseChars = word.split(" ")
        return morseChars.map((char) => morseToTextMap[char] || "").join("")
      } else {
        // --- American Morse Code Logic (NEW) ---
        let decodedWord = ""
        let currentIndex = 0
        // Get map keys and sort them by length DESCENDING to prioritize longer matches
        const sortedKeys = Object.keys(morseToTextMap).sort((a, b) => b.length - a.length)

        while (currentIndex < word.length) {
          let matchedKey = null;
          // Find the longest key from the map that matches the current position in the word
          for (const key of sortedKeys) {
            // Check if the word starts with the key at the current index
            if (word.startsWith(key, currentIndex)) {
              matchedKey = key;
              break; // Found the longest possible match, stop searching
            }
          }

          if (matchedKey) {
            // Found a valid American Morse character
            decodedWord += morseToTextMap[matchedKey]; // Append the corresponding text character
            currentIndex += matchedKey.length; // Move the index past the matched Morse code

            // IMPORTANT: After a character, check if the next character is a single space
            // This space acts as the separator between characters. Consume it.
            if (currentIndex < word.length && word[currentIndex] === ' ') {
              currentIndex++; // Move index past the inter-character space
            }
          } else {
            // No valid Morse character found at the current position.
            currentIndex++;
          }
        }
        return decodedWord; // Return the fully decoded word
      }
      // --- End Logic Branching ---
    })

    setOutputText(textWords.join(" ")) // Join decoded words with spaces
  }



  // Convert text to morse code
  // Convert text to morse code
  const convertTextToMorse = (text: string) => {
    if (!text.trim()) {
      setOutputText("")
      return
    }

    // Use the appropriate map based on the language and current mode
    const currentTextToMorseMap = getTextToMorseMap(language, isAmericanMorseCode);

    // Normalize text to ensure consistent Unicode representation
    // This is especially important for non-Latin characters
    const normalizedText = text.normalize('NFC').toLowerCase();

    const words = normalizedText.split(" ")
    const morseWords = words.map((word) => {
      return Array.from(word)
        .map((char) => {
          // Add debug logging to see character codes
          return currentTextToMorseMap[char] || ""
        })
        .filter((morse) => morse !== "")
        .join(" ")
    })
    setOutputText(morseWords.join("   "))
  }

  // Toggle conversion mode
  const toggleMode = () => {
    // Save current values before changing
    const currentInput = inputText
    const currentOutput = outputText

    // Clear any existing error message
    setInputError(null)

    // Update mode
    const newMode = mode === "morse-to-text" ? "text-to-morse" : "morse-to-text"
    setMode(newMode)

    // Show appropriate message based on the new mode


    // Swap input and output (only if there is actual output to swap)
    if (currentOutput) {
      setInputText(currentOutput)
      setOutputText(currentInput)
    }
  }// Handle input change with validation for Morse code mode
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Clear the initial alert message when user starts typing
    if (alertMessage && alertMessage.text === "Enter text or morse code to enable audio/visual") {
      setAlertMessage(null);
    }

    if (mode === "morse-to-text") {
      // Only allow valid Morse code characters (dots, dashes, spaces)
      const sanitizedValue = value.replace(/[^.\- ]/g, "");

      if (sanitizedValue !== value) {
        // Show error message if invalid characters were removed
        showAlert(strings.onlyDotsAndDashesAllowed, 'error', 3000);
      }

      setInputText(sanitizedValue);
    } else {
      // No restrictions in text-to-morse mode
      setInputText(value);
    }
  }

  // Initialize Audio Context
  const setupAudio = () => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        oscillatorRef.current = audioContextRef.current.createOscillator();
        gainNodeRef.current = audioContextRef.current.createGain();

        oscillatorRef.current.frequency.value = audioSettings.frequency;
        gainNodeRef.current.gain.value = 0; // Start silent

        oscillatorRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);

        oscillatorRef.current.start();
      } catch (error) {
        console.error(strings.errorFailedToInitAudio, error);
        // Handle the error appropriately, maybe disable audio features
      }
    }
  }

  // --- Playback Stop Functions ---
  const stopAudio = (isInput = false) => {
    const ac = audioContextRef.current;
    const gain = gainNodeRef.current;

    // Clear the recursive scheduling timeout
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    // Stop audio context processing if it exists
    if (ac && gain) {
      gain.gain.cancelScheduledValues(ac.currentTime);
      gain.gain.setValueAtTime(0, ac.currentTime); // Ensure silence immediately
    }

    // Reset state
    if (isInput) {
      setIsInputPlaying(false);
    } else {
      setIsPlaying(false);
    }

    if (isInput) {
      setIsInputAudioPaused(false);
    } else {
      setIsOutputAudioPaused(false);
    }

    setCurrentAudioIndex(0); // Reset position
  }

  const stopVisual = (isInput = false) => {
    // Clear all scheduled visual timeouts (start/end effects and next step)
    activeVisualTimeoutsRef.current.forEach(clearTimeout);
    activeVisualTimeoutsRef.current = [];
    if (visualTimeoutRef.current) {
      clearTimeout(visualTimeoutRef.current);
      visualTimeoutRef.current = null;
    }

    // Reset state
    if (isInput) {
      setIsInputVisualPlaying(false);
    } else {
      setIsVisualPlaying(false);
    }
    if (isInput) {
      setIsInputVisualPaused(false);
    } else {
      setIsOutputVisualPaused(false);
    }

    setCurrentVisualIndex(0); // Reset position
    setVisualEffect({ active: false, isDash: false }); // Turn off visual effect
  }  // Stop both audio and visual effects


  // --- Updated Visual Playback with Pause/Resume ---
  const playVisualMorse = (morseText: string, isInput = false, startIndex = 0) => {
    if (!morseText) return;

    stopVisual(!isInput); // Stop the *other* visual playback if running

    // Clear only the main scheduling timeout if it exists from a previous run
    if (visualTimeoutRef.current) {
      clearTimeout(visualTimeoutRef.current);
      visualTimeoutRef.current = null;
    }
    // Clear effect timeouts from previous run for this type (input/output)
    activeVisualTimeoutsRef.current.forEach(clearTimeout);
    activeVisualTimeoutsRef.current = [];

    if (isInput) setIsInputVisualPlaying(true); else setIsVisualPlaying(true);
    if (isInput) {
      setIsInputVisualPaused(false);
    } else {
      setIsOutputVisualPaused(false);
    } // Ensure not paused when starting

    const dotDuration = 1.2 / audioSettings.wpm * 1000; // ms
    const dashDuration = dotDuration * 3;
    const symbolSpaceDuration = dotDuration;
    const letterSpaceDuration = dotDuration * 3;
    const wordSpaceDuration = dotDuration * 7;

    const symbols = morseText.split('');
    let currentIndex = startIndex;
    setCurrentVisualIndex(currentIndex); // Track current position

    const scheduleNextVisual = (delayOffset = 0) => {
      // Base case: End of playback
      if (currentIndex >= symbols.length) {
        visualTimeoutRef.current = setTimeout(() => {
          stopVisual(isInput); // Use stop function for cleanup
        }, delayOffset);
        // Don't add this final stop timeout to activeVisualTimeoutsRef
        return;
      }

      // Pause check: If paused, just stop scheduling. Index is already saved.
      if ((isInput ? isInputAudioPaused : isOutputAudioPaused)) {
        return;
      }

      const symbol = symbols[currentIndex];
      let symbolDuration = 0;
      let spaceDuration = symbolSpaceDuration; // Default space after symbol
      const currentSymbolDelay = delayOffset; // Use the offset passed in

      if (symbol === '.' || symbol === '•') {
        symbolDuration = dotDuration;
        const startTimeout = setTimeout(() => {
          setVisualEffect({ active: true, isDash: false });
        }, currentSymbolDelay);
        const endTimeout = setTimeout(() => {
          setVisualEffect({ active: false, isDash: false });
        }, currentSymbolDelay + symbolDuration);
        activeVisualTimeoutsRef.current.push(startTimeout, endTimeout);
      } else if (symbol === '-' || symbol === '–' || symbol === '—') {
        symbolDuration = dashDuration;
        const startTimeout = setTimeout(() => {
          setVisualEffect({ active: true, isDash: true });
        }, currentSymbolDelay);
        const endTimeout = setTimeout(() => {
          setVisualEffect({ active: false, isDash: false });
        }, currentSymbolDelay + symbolDuration);
        activeVisualTimeoutsRef.current.push(startTimeout, endTimeout);
      } else if (symbol === ' ') {
        // Check for word space (3 spaces) vs letter space (1 space)
        if (currentIndex + 2 < symbols.length && symbols[currentIndex + 1] === ' ' && symbols[currentIndex + 2] === ' ') {
          spaceDuration = wordSpaceDuration;
          currentIndex += 2; // Skip the next two spaces
        } else {
          spaceDuration = letterSpaceDuration;
        }
        symbolDuration = 0; // No visual for space itself
      } else {
        // Ignore invalid characters
        symbolDuration = 0;
        spaceDuration = 0;
      }

      const totalTimeForThisStep = symbolDuration + spaceDuration;
      currentIndex++;
      setCurrentVisualIndex(currentIndex); // Update progress *before* scheduling next

      // Schedule the next recursive call
      if (totalTimeForThisStep > 0) {
        // Schedule the next call relative to the *start* of the current step
        visualTimeoutRef.current = setTimeout(() => scheduleNextVisual(0), currentSymbolDelay + totalTimeForThisStep);
      } else {
        // If duration is 0, schedule immediately relative to current step start
        visualTimeoutRef.current = setTimeout(() => scheduleNextVisual(0), currentSymbolDelay);
      }
    };

    // Start the scheduling process
    scheduleNextVisual(0); // Start with zero offset
  };

  // Pause visual playback
  const pauseVisual = (isInput = false) => {
    // Set paused state first
    if (isInput) {
      setIsInputVisualPaused(true);
    } else {
      setIsOutputVisualPaused(true);
    }

    // Clear the main timeout that schedules the *next* symbol
    if (visualTimeoutRef.current) {
      clearTimeout(visualTimeoutRef.current);
      visualTimeoutRef.current = null;
    }

    // Clear any *pending* visual effect timeouts (start/end)
    activeVisualTimeoutsRef.current.forEach(clearTimeout);
    activeVisualTimeoutsRef.current = [];
  };

  useEffect(() => {
    if (!isInputVisualPaused && isInputVisualPlaying) {
      // Resume visual playback from currentVisualIndex
      const text = inputText;
      playVisualMorse(text, true, currentVisualIndex);
    }
  }, [isInputVisualPaused]);

  useEffect(() => {
    if (!isOutputVisualPaused && isVisualPlaying) {
      // Resume visual playback from currentVisualIndex
      const text = mode === 'text-to-morse' ? outputText : inputText;
      playVisualMorse(text, false, currentVisualIndex);
    }
  }, [isOutputVisualPaused]);

  // Resume visual playback
  const resumeVisual = (isInput = false) => {
    if (!(isInput ? isInputVisualPaused : isOutputVisualPaused)) return;
    if (isInput) {
      setIsInputVisualPlaying(true);
      setIsInputVisualPaused(false);
    } else {
      setIsVisualPlaying(true);
      setIsOutputVisualPaused(false);
    }
    // Do not call playVisualMorse here!
  };

  // --- Updated Audio Playback with Pause/Resume ---
  const playMorseAudio = (morseText: string, isInput = false, startIndex = 0) => {
    if (!morseText) return;
    setupAudio(); const ac = audioContextRef.current;
    const gain = gainNodeRef.current;
    const osc = oscillatorRef.current;
    if (!ac || !gain || !osc) {
      console.error("AudioContext not available or initialized.");
      stopAudio(isInput); // Ensure state is reset
      return;
    }

    stopAudio(!isInput); // Stop the *other* audio playback if running

    // Clear any scheduled audio timeouts/events before starting/resuming
    gain.gain.cancelScheduledValues(ac.currentTime);
    gain.gain.setValueAtTime(0, ac.currentTime); // Ensure silence initially
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    if (isInput) setIsInputPlaying(true); else setIsPlaying(true);
    if (isInput) {
      setIsInputAudioPaused(false);
    } else {
      setIsOutputAudioPaused(false);
    }

    const dotDuration = 1.2 / audioSettings.wpm;
    const dashDuration = dotDuration * 3;
    const symbolSpaceDuration = dotDuration;
    const letterSpaceDuration = dotDuration * 3;
    const wordSpaceDuration = dotDuration * 7;

    osc.frequency.setValueAtTime(audioSettings.frequency, ac.currentTime);
    osc.type = audioSettings.soundType === 'telegraph' ? 'square' : 'sine';

    const symbols = morseText.split('');
    let currentIndex = startIndex;
    setCurrentAudioIndex(currentIndex); // Track current position
    let scheduleTime = ac.currentTime; // Start scheduling from now

    const scheduleNextAudio = () => {
      // Base case: End of playback
      if (currentIndex >= symbols.length) {
        const delayUntilEnd = (scheduleTime - ac.currentTime) * 1000;
        audioTimeoutRef.current = setTimeout(() => {
          stopAudio(isInput);
        }, Math.max(0, delayUntilEnd + 50));
        return;
      }

      // Pause check: If paused, stop scheduling. Index is saved.
      if ((isInput ? isInputAudioPaused : isOutputAudioPaused)) {
        return;
      }

      const symbol = symbols[currentIndex];
      let symbolDuration = 0;
      let spaceDuration = symbolSpaceDuration;

      // Schedule gain changes for the current symbol
      if (symbol === '.' || symbol === '•') {
        symbolDuration = dotDuration;
        gain.gain.setValueAtTime(audioSettings.volume, scheduleTime);
        gain.gain.setValueAtTime(0, scheduleTime + symbolDuration);
      } else if (symbol === '-' || symbol === '–' || symbol === '—') {
        symbolDuration = dashDuration;
        gain.gain.setValueAtTime(audioSettings.volume, scheduleTime);
        gain.gain.setValueAtTime(0, scheduleTime + symbolDuration);
      } else if (symbol === ' ') {
        if (currentIndex + 2 < symbols.length && symbols[currentIndex + 1] === ' ' && symbols[currentIndex + 2] === ' ') {
          spaceDuration = wordSpaceDuration;
          currentIndex += 2;
        } else {
          spaceDuration = letterSpaceDuration;
        }
        symbolDuration = 0;
      } else {
        symbolDuration = 0;
        spaceDuration = 0; // No sound, no extra space
      }

      // Advance the time for the next schedule
      const timeForCurrentStep = symbolDuration + spaceDuration;
      scheduleTime += timeForCurrentStep;
      currentIndex++;
      setCurrentAudioIndex(currentIndex); // Update progress

      // Schedule the call for the *next* symbol using setTimeout
      // Calculate delay from *now* until the current step finishes
      const delayUntilNextCall = (scheduleTime - ac.currentTime) * 1000;

      if (timeForCurrentStep > 0) {
        // Schedule the next check slightly *before* the current step ends
        // to ensure smooth transition if possible, or right after.
        audioTimeoutRef.current = setTimeout(scheduleNextAudio, Math.max(0, delayUntilNextCall - 10)); // Small buffer
      } else {
        // If duration is 0, schedule next check immediately
        scheduleNextAudio(); // Direct call might be too fast, use timeout 0
        // audioTimeoutRef.current = setTimeout(scheduleNextAudio, 0);
      }
    };

    // Start scheduling
    scheduleNextAudio();
  };

  // Pause audio playback
  const pauseAudio = (isInput = false) => {
    const ac = audioContextRef.current;
    const gain = gainNodeRef.current;
    const currentlyPlaying = isInput ? isInputPlaying : isPlaying;
    // Only pause if playing and not already paused
    if (!ac || !gain || !currentlyPlaying || (isInput ? isInputAudioPaused : isOutputAudioPaused)) return;

    // Set paused state first
    if (isInput) {
      setIsInputAudioPaused(true);
    } else {
      setIsOutputAudioPaused(true);
    }

    // Clear the recursive scheduling timeout
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    // Cancel future scheduled gain changes and force silence now
    gain.gain.cancelScheduledValues(ac.currentTime);
    gain.gain.setValueAtTime(0, ac.currentTime);
  };
  // Resume audio playback

  useEffect(() => {
    if (!isInputAudioPaused && isInputPlaying) {
      // Resume playback from currentAudioIndex
      const ac = audioContextRef.current;
      if (ac) {
        ac.resume().then(() => {
          playMorseAudio(inputText, true, currentAudioIndex);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputAudioPaused]);
  useEffect(() => {
    if (!isOutputAudioPaused && isPlaying) {
      // Resume output audio playback from currentAudioIndex
      const ac = audioContextRef.current;
      if (ac) {
        ac.resume().then(() => {
          playMorseAudio(outputText, false, currentAudioIndex);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOutputAudioPaused]);


  const resumeAudio = (isInput = false) => {
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    if (isInput) {
      setIsInputPlaying(true);
      setIsInputAudioPaused(false);
    } else {
      setIsPlaying(true);
      setIsOutputAudioPaused(false);
    }
    // Do not call playMorseAudio here!
  };



  // Text-to-speech for regular text (basic implementation - no pause/resume)
  // Enhanced text-to-speech with multi-language support
  const speakText = (text: string) => {
    if (!text || !window.speechSynthesis) return;

    // Cancel any previous utterances
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Map language codes to BCP-47 language tags
    const languageMappings: Record<string, string> = {
      "en": "en-US",
      "de": "de-DE",
      "it": "it-IT",
      "tr": "tr-TR",
      "es": "es-ES",
      "fr": "fr-FR",
      "pt": "pt-BR",
      "vi": "vi-VN",
      "ru": "ru-RU"
    };

    // Set the language based on the current application language
    utterance.lang = languageMappings[language] || "en-US";

    // Set rate and volume from audioSettings
    utterance.rate = audioSettings.wpm / 15; // Normalize WPM to a reasonable rate
    utterance.volume = audioSettings.volume;

    // Try to find a voice matching the language
    const voices = window.speechSynthesis.getVoices();
    const matchingVoices = voices.filter(voice => voice.lang.startsWith(utterance.lang.split('-')[0]));

    if (matchingVoices.length > 0) {
      utterance.voice = matchingVoices[0]; // Use the first matching voice
    }

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  }


  // --- Updated Control Functions ---  // Play both audio and visual effects simultaneously based on selection
  // Update playSelectedEffects function to use flash text
  const playSelectedEffects = (text: string, isInput = false) => {
    // Check whether the content is Morse code based on the current mode and which side we're playing
    const isMorseContent = isInput ? isInputMorse : isOutputMorse;

    // Stop any currently playing effects
    stopAllEffects(isInput);

    // Stop TTS if it's running
    window.speechSynthesis?.cancel();

    if (!isMorseContent) {
      // For non-Morse text, use TTS if audio is selected
      if (audioEffectSelected) {
        showFlashText(`play-${isInput ? "input" : "output"}`, "Playing speech", 1500);
        speakText(text);
      }
      return;
    }

    // Show flash text on the play button
    if (audioEffectSelected && visualEffectSelected) {
      showFlashText(`play-${isInput ? "input" : "output"}`, "Playing audio + visual", 1500);
    } else if (audioEffectSelected) {
      showFlashText(`play-${isInput ? "input" : "output"}`, "Playing audio", 1500);
    } else if (visualEffectSelected) {
      showFlashText(`play-${isInput ? "input" : "output"}`, "Playing visual", 1500);
    }

    // Play selected effects for Morse code
    if (audioEffectSelected) {
      playMorseAudio(text, isInput, 0);
    }
    if (visualEffectSelected) {
      playVisualMorse(text, isInput, 0);
    }
  };

  // Update pauseSelectedEffects function
  const pauseSelectedEffects = (isInput = false) => {
    const isMorseContent = isInput ? isInputMorse : isOutputMorse;
    let isPausing = false;

    if (audioEffectSelected && (isInput ? isInputPlaying : isPlaying) && !(isInput ? isInputAudioPaused : isOutputAudioPaused)) {
      pauseAudio(isInput);
      isPausing = true;
    }

    if (visualEffectSelected && (isInput ? isInputVisualPlaying : isVisualPlaying) && !(isInput ? isInputVisualPaused : isOutputVisualPaused) && isMorseContent) {
      pauseVisual(isInput);
      isPausing = true;
    }

    if (isPausing) {
      showFlashText(`pause-${isInput ? "input" : "output"}`, "Paused", 1500);
    }
  };

  // Update resumeSelectedEffects function
  const resumeSelectedEffects = (isInput = false) => {
    const isMorseContent = isInput ? isInputMorse : isOutputMorse;
    let isResuming = false;

    if (audioEffectSelected && (isInput ? isInputAudioPaused : isOutputAudioPaused)) {
      resumeAudio(isInput);
      isResuming = true;
    }

    if (visualEffectSelected && (isInput ? isInputVisualPaused : isOutputVisualPaused) && isMorseContent) {
      resumeVisual(isInput);
      isResuming = true;
    }

    if (isResuming) {
      showFlashText(`pause-${isInput ? "input" : "output"}`, "Resuming", 1500);
    }
  };

  // Update stopAllEffects function
  const stopAllEffects = (isInput = false) => {
    const wasPlaying = isInput
      ? (isInputPlaying || isInputVisualPlaying || isInputAudioPaused || isInputVisualPaused)
      : (isPlaying || isVisualPlaying || isOutputAudioPaused || isOutputVisualPaused);

    stopAudio(isInput);
    stopVisual(isInput);

    window.speechSynthesis?.cancel();

    if (wasPlaying) {
      showFlashText(`stop-${isInput ? "input" : "output"}`, "Stopped", 1500);
    }
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText)
      showFlashText("copy", strings.copied)
    } else {
      showAlert("Nothing to copy", 'warning', 2000)
    }
  }

  // Update handleDownload function
  const handleDownload = () => {
    if (outputText) {
      const element = document.createElement("a")
      const file = new Blob([outputText], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `morse-conversion-${Date.now()}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      showFlashText("download", "Downloaded!")
    } else {
      showAlert("Nothing to download", 'warning', 2000)
    }
  }



  // Handle clear input
  const handleClear = () => {
    stopAllEffects(true);
    stopAllEffects(false);

    setInputText("")
    setOutputText("")
    setInputError(null)
    if (inputRef.current) {
      inputRef.current.focus()
    }
    showAlert("Cleared all text", 'info', 2000)
  }
  // Handle help button click
  // Update handleHelp function
  // Update handleHelp function
  const handleHelp = () => {
    let helpMessage = "";

    // Keep the context-sensitive logic but create shorter messages for flash text
    if (isPlaying || isInputPlaying || isVisualPlaying || isInputVisualPlaying) {
      helpMessage = "Use pause or stop to control playback";
    } else if (isAnyPaused) {
      helpMessage = "Resume or stop paused playback";
    } else if (!inputText && !outputText) {
      helpMessage = "Enter text/morse to begin";
    } else if (mode === "morse-to-text") {
      helpMessage = "Use dots, dashes & spaces for Morse";
    } else {
      helpMessage = "Enter text to convert to Morse";
    }

    // Show flash text instead of alert
    showFlashText("help", helpMessage, 2500);
  }


  const toggleAudioEffect = () => {
    const newValue = !audioEffectSelected;
    setAudioEffectSelected(newValue);

    if (!newValue && !visualEffectSelected) {
      setVisualEffectSelected(true);
      showFlashText("visualeffect", "Visual effect enabled");
    } else if (newValue) {
      showFlashText("audioeffect", "Audio effect enabled");
    } else {
      showFlashText("audioeffect", "Audio effect disabled");
    }
  };

  const toggleVisualEffect = () => {
    const hasMorseContent = isInputMorse || isOutputMorse;

    if (!hasMorseContent && !visualEffectSelected) {
      showAlert("Visual effect requires Morse code content", 'warning', 2500)
      return;
    }

    const newValue = !visualEffectSelected;
    setVisualEffectSelected(newValue);

    if (!newValue && !audioEffectSelected) {
      setAudioEffectSelected(true);
      showFlashText("audioeffect", "Audio effect enabled");
    } else if (newValue) {
      showFlashText("visualeffect", "Visual effect enabled");
    } else {
      showFlashText("visualeffect", "Visual effect disabled");
    }
  };

  // Helper functions to determine whether input or output is valid Morse
  const isMorseFormat = (text: string): boolean => {
    return /^[.\- ]+$/.test(text.replace(/\s+/g, ' '));
  };

  // Check if the input side has Morse content based on the current mode
  const isInputMorse = mode === 'morse-to-text' ? isMorseFormat(inputText) : false;

  // Check if the output side has Morse content based on the current mode
  const isOutputMorse = mode === 'text-to-morse' ? isMorseFormat(outputText) : false;

  // Determine if any playback is active for either input or output
  const isAnyPlaying = isPlaying || isInputPlaying || isVisualPlaying || isInputVisualPlaying;
  const isInputPaused = isInputAudioPaused || isInputVisualPaused;
  const isOutputPaused = isOutputAudioPaused || isOutputVisualPaused;

  const isAnyPaused = isInputPaused || isOutputPaused;

  return (<div
    ref={converterRef}
    className={`
          flex flex-col font-lexend rounded-lg text-[#372824] transition-colors duration-500 ease-in-out
          ${visualEffect.active ? (visualEffect.isDash ? 'bg-[#456359] text-white pulse-dash' : 'bg-[#456359] text-white pulse-dot') : ''}
        `}
  >{/* Alert Message Component */}
    {alertMessage && (
      <div
        className={`
              mx-4 mt-4 p-3 rounded-md shadow-sm border text-sm flex items-center justify-between 
              animate-fadeIn transition-all duration-300 ease-in-out
              ${alertMessage.type === 'info' ? 'bg-green-50 border-green-200 text-green-700' : ''}
              ${alertMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : ''}
              ${alertMessage.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : ''}
              ${alertMessage.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700' : ''}
            `}
        role="alert"
      >            <div className="flex items-center">
          <span className="mr-2">
            {alertMessage.type === 'info' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
            {alertMessage.type === 'success' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
            {alertMessage.type === 'error' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>}
            {alertMessage.type === 'warning' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>}
          </span>
          <span className="text-sm font-medium">{alertMessage.text}</span>
        </div><button
          onClick={() => {
            // Add fadeOut class and then remove the alert after animation completes
            const alertElement = document.querySelector('[role="alert"]');
            if (alertElement) {
              alertElement.classList.add('animate-fadeOut');
              alertElement.classList.remove('animate-fadeIn');

              // Wait for animation to complete before removing the alert
              setTimeout(() => {
                setAlertMessage(null);
              }, 300); // Match the animation duration
            } else {
              // Fallback if element not found
              setAlertMessage(null);
            }
          }}
          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    )}

    <div className="w-full mx-auto rounded-lg overflow-hidden border border-gray-200">
      <div className="grid md:grid-cols-2 relative">
        {/* Swap button in center */}          <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10 md:block hidden">
          <div className="flex flex-col items-center">
            <Button
              onClick={toggleMode}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-[#456359] bg-white  shadow-md overflow-hidden "
            >
              <div className="swap-arrow-container">
                <ArrowLeftRight className="h-6 w-6 text-[#456359]" />
              </div>
            </Button>
            <span className="text-xs mt-1 text-[#456359]">{strings.swap}</span>
          </div>
        </div>

        {/* Input section */}
        <div className="border-r border-gray-200">
          <div className="flex md:justify-between justify-around items-center p-4 border-b border-gray-200  md:w-full md:flex-row flex-col gap-y-2">
            <div className="flex items-center">
              <span className="md:text-lg text-2xl font-bold text-[#456359]">
                {mode === "morse-to-text" ? strings.headingMorseCode : strings.headingText}
              </span>
            </div>

            {/* Action buttons for input */}
            <div className="flex  items-center  gap-1">                {/* Playback control buttons */}

              <Button
                onClick={() => playSelectedEffects(inputText, true)}
                variant="ghost"
                size="sm"
                className={`relative text-[#456359] ${isInputPlaying || isInputVisualPlaying ? 'bg-gray-100' : ''} flex items-center md:flex-row  gap-1`}
                disabled={
                  !inputText ||
                  (!audioEffectSelected && !visualEffectSelected) ||
                  isAnyPlaying ||
                  (visualEffectSelected && !audioEffectSelected && !isInputMorse)
                }
                title="Play Input"
              >
                {flashText.button === "play-input" && flashText.active && (
                  <span className="flash-text-secondary">{flashText.text}</span>
                )}
                <Play size={18} />
                {strings.play}
              </Button>

              {/* Pause/Resume Button for Input */}
              <Button
                onClick={() => isAnyPaused ? resumeSelectedEffects(true) : pauseSelectedEffects(true)}
                variant="ghost"
                size="sm"
                className={`relative text-[#456359] ${isAnyPaused ? 'bg-gray-100' : ''} flex items-center gap-1 md:flex-row `}
                disabled={
                  !((isInputPlaying || isInputVisualPlaying) || isAnyPaused) ||
                  (visualEffectSelected && !audioEffectSelected && !isInputMorse)
                }
                title={isAnyPaused ? `${strings.resume}` : `${strings.pause}`}
              >
                {flashText.button === "pause-input" && flashText.active && (
                  <span className="flash-text-secondary" style={{ backgroundColor: 'rgba(255, 191, 0, 1)', border: '#f5c749 2px solid' }}>{flashText.text}</span>
                )}
                <Pause size={18} />
                {isAnyPaused ? `${strings.resume}` : `${strings.pause}`}
              </Button>

              {/* Stop Button for Input */}
              <Button
                onClick={() => stopAllEffects(true)}
                variant="ghost"
                size="sm"
                className="relative text-[#456359] flex items-center gap-1 md:flex-row "
                disabled={!(isInputPlaying || isInputVisualPlaying || isAnyPaused)}
                title="Stop Input"
              >
                {flashText.button === "stop-input" && flashText.active && (
                  <span className="flash-text-secondary" style={{ backgroundColor: 'rgba(255, 191, 0, 1)', border: '#f5c749 2px solid' }}>{flashText.text} </span>
                )}
                <Square size={18} />
                {strings.stop}
              </Button>


              {/* Show swap button on mobile */}

                            <Button
            onClick={handleClear}
            disabled={!inputText}
            variant="ghost"
            size="sm"
            className="text-[#372824] hover:text-black flex flex-col md:hidden"
            title="Clear Input"
          >                <Trash2 className="h-5 w-5 p-0 m-0 -mb-2" />
            {strings.clear}
          </Button>
            </div>
          </div>            <div className="relative">
            <Textarea
              ref={inputRef}
              value={inputText}
              onChange={handleInputChange}
              onClick={() => {
                if (!inputText) {
                  showAlert("Enter text or morse code to enable audio/visual", 'warning', 3000);
                }
              }}
              placeholder={typingPlaceholder}
              className={`
                  p-4 border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0
                  ${initialText.length === 0
                  ? "min-h-[200px] md:min-h-[300px]"
                  : "min-h-[100px] md:min-h-[200px]"}
                  ${isSingleLetterMode && inputText === initialText
                  ? "text-center pt-14 text-4xl md:text-6xl"
                  : initialText.length > 1 ? "text-3xl/relaxed" : "text-xl/relaxed"}
                `}
            />

            {/* Error message */}
            {inputError && (
              <div className="absolute bottom-2 left-0 right-0 mx-4 p-2 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                {inputError}
              </div>
            )}
          </div>

          <div className="p-3 md:border-t md:border-0 border-b flex md:justify-between md:w-full  justify-center border-gray-200 my-3 md:my-0">
            <Button
              onClick={handleClear}
              variant="ghost"
              size="sm"
              className="text-[#372824] hover:text-black md:flex flex-col hidden"
              title="Clear Input"
            >
              <Trash2 className="h-5 w-5 p-0 m-0 -mb-2" />
              {strings.clear}
            </Button>
            <Button
              onClick={toggleMode}
                variant="ghost"
                size="sm"
                className="md:hidden bg-[#456359] hover:bg-[#456359] text-white hover:text-white flex -mb-7 "
                title="Swap Modes"
              >                  <ArrowUpDown className="h-5 w-5 p-0 m-0 " />
                {strings.swap}
              </Button>
          </div>
        </div>

        {/* Output section */}
        <div>
          <div className="flex md:justify-between justify-around items-center p-4 border-b border-gray-200 text-[#372824] 200 md:w-full   md:flex-row flex-col gap-y-2 " >
            <div className="flex items-center">
              <span className="md:text-lg text-2xl text-[#456359] font-bold">
                {mode === "morse-to-text" ? strings.headingText : strings.headingMorseCode}
              </span>
            </div>                {/* Playback control buttons */}
            <div className="flex items-center gap-1">         {/* Play Button for Output */}
              <Button
                onClick={() => playSelectedEffects(outputText, false)}
                variant="ghost"
                size="sm"
                className={`relative text-[#456359] ${isPlaying || isVisualPlaying ? 'bg-gray-100' : ''} flex items-center gap-1 md:flex-row `}
                disabled={
                  !outputText ||
                  (!audioEffectSelected && !visualEffectSelected) ||
                  (isInputPlaying || isInputVisualPlaying) ||
                  (visualEffectSelected && !audioEffectSelected && !isOutputMorse)
                }
                title="Play Output"
              >
                {flashText.button === "play-output" && flashText.active && (
                  <span className="flash-text-secondary">{flashText.text}</span>
                )}
                <Play size={18} />
                {strings.play}
              </Button>

              {/* Pause/Resume Button for Output */}
              <Button
                onClick={() => isAnyPaused ? resumeSelectedEffects(false) : pauseSelectedEffects(false)}
                variant="ghost"
                size="sm"
                className={`relative text-[#456359] ${isAnyPaused ? 'bg-gray-100' : ''} flex items-center gap-1 md:flex-row `}
                disabled={
                  !((isPlaying || isVisualPlaying) || isAnyPaused) ||
                  (visualEffectSelected && !audioEffectSelected && !isOutputMorse)
                }
                title={isAnyPaused ? `${strings.resume} Output` : `${strings.pause} Output`}
              >
                {flashText.button === "pause-output" && flashText.active && (
                  <span className="flash-text-secondary">{flashText.text}</span>
                )}
                <Pause size={18} />
                {isAnyPaused ? strings.resume : strings.pause}
              </Button>

              {/* Stop Button for Output */}
              <Button
                onClick={() => stopAllEffects(false)}
                variant="ghost"
                size="sm"
                className="relative text-[#456359] flex items-center gap-1 md:flex-row "
                disabled={!(isPlaying || isVisualPlaying || isAnyPaused)}
                title="Stop Output"
              >
                {flashText.button === "stop-output" && flashText.active && (
                  <span className="flash-text-secondary">{flashText.text}</span>
                )}
                <Square size={18} />
                {strings.stop}
              </Button>
            </div>
          </div>

          <div className={`
              p-4 text-gray-800 whitespace-pre-wrap pl-8
              ${initialText.length === 0
              ? "min-h-[200px] md:min-h-[300px]"
              : "min-h-[100px] md:min-h-[200px]"}
              ${isSingleLetterMode
              ? "text-center text-4xl md:text-6xl"
              : initialText.length > 1 ? "text-3xl/relaxed" : "text-xl/relaxed"}
            `}>
            {outputText || (<span className="text-gray-400 text-md">
              {mode === "morse-to-text"
                ? strings.convertedTextWillAppearHere
                : strings.morseCodeWillAppearHere
              }
            </span>
            )}
          </div>

          <div className="p-3 border-t border-gray-200 flex flex-col md:flex-row md:justify-between space-x-2 md:w-full  items-center gap-y-6 justify-center">              {/* Effect selection buttons */}              <div className="flex items-center space-x-2"><Button
            onClick={toggleAudioEffect}
            variant="ghost"
            size="sm"
            className={`relative ${audioEffectSelected ? 'bg-[#456359] hover:bg-[#456359] text-white hover:text-white' : 'text-[#456359] hover:bg-white '} flex items-center gap-1 md:flex-row flex-col py-10 md:py-0`}
            title={audioEffectSelected ? "Audio Effect Selected" : "Select Audio Effect"}
            disabled={isAnyPlaying || isAnyPaused || (audioEffectSelected && !visualEffectSelected)}
          >
            {flashText.button === "audioeffect" && flashText.active && (
              <span className={`${audioEffectSelected ? 'flash-text' : 'flash-text-inactive'}`}>{flashText.text}</span>
            )}
            <Volume2 className="h-5 w-5" />
            {strings.audio}
            <Check className={`h-5 w-5 ${audioEffectSelected ? 'text-white' : 'hidden'}`} />
          </Button>
            <Button
              onClick={toggleVisualEffect}
              variant="ghost"
              size="sm"
              className={`relative ${visualEffectSelected ? 'bg-[#456359] hover:bg-[#456359] text-white hover:text-white' : 'text-[#456359] hover:bg-white '} flex items-center gap-1 md:flex-row flex-col py-10 md:py-0`}
              title={visualEffectSelected ? "Visual Effect Selected" : "Select Visual Effect"}
              disabled={isAnyPlaying || isAnyPaused || (!isInputMorse && !isOutputMorse) || (!audioEffectSelected && visualEffectSelected)}
            >
              {flashText.button === "visualeffect" && flashText.active && (
                <span className={`${visualEffectSelected ? 'flash-text' : 'flash-text-inactive'}`}>{flashText.text}</span>
              )}
              <Lightbulb className="h-5 w-5" />
              {strings.visual}
              <Check className={`h-5 w-5 ${visualEffectSelected ? 'text-white' : 'hidden'}`} />
            </Button>

          </div>

            {/* Utility buttons */}
            <div className="flex items-center md:justify-end justify-around md:w-fit w-full md:mx-0 mx-auto">
              {/* Copy Button */}
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="relative text-gray-500 hover:text-gray-700 flex flex-col"
                disabled={!outputText}
                title={`${strings.copy} Output`}
              >
                {flashText.button === "copy" && flashText.active && (
                  <span className="flash-text">{flashText.text}</span>
                )}
                <Copy className="h-5 w-5 p-0 m-0 -mb-2" />
                {strings.copy}
              </Button>

              <Button
                onClick={handleDownload}
                variant="ghost"
                size="sm"
                className="relative text-gray-500 hover:text-gray-700 flex flex-col"
                disabled={!outputText}
                title="Download Output"
              >
                {flashText.button === "download" && flashText.active && (
                  <span className="flash-text">Downloaded!</span>
                )}
                <Download className="h-5 w-5 p-0 m-0 -mb-2" />
                {strings.download}
              </Button>


              {/* Help Button */}
              {/* Help Button with flash text */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-gray-500 hover:text-gray-700 flex flex-col"
                title="Help"
                onClick={handleHelp}
              >
                {flashText.button === "help" && flashText.active && (
                  <span className="flash-text help-flash-text">{flashText.text}</span>
                )}
                <HelpCircle className="h-5 w-5 p-0 m-0 -mb-2" />
                {strings.help}
              </Button>

            </div>
          </div>
        </div>
      </div>

      {/* Audio Settings at the bottom */}
      <Collapsible className="border-t border-gray-200">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-sm font-medium text-[#456359]">{strings.settings}</span>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#456359]"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Toggle {strings.settings.toLowerCase()}</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="p-4 border-t border-gray-100 grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-sm text-right col-span-1">
                WPM:
              </label>
              <div className="col-span-2">
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={audioSettings.wpm}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setAudioSettings({
                      ...audioSettings,
                      wpm: newValue
                    });
                    showAlert(`Playback speed set to ${newValue} WPM`, 'info', 1500);
                  }}
                  className="w-full accent-[#456359]"
                />
              </div>
              <span className="col-span-1 text-sm">{audioSettings.wpm}</span>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-sm text-right col-span-1">
                Frequency:
              </label>
              <div className="col-span-2">                  <input
                type="range"
                min="400"
                max="1000"
                step="50"
                value={audioSettings.frequency}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  setAudioSettings({
                    ...audioSettings,
                    frequency: newValue
                  });
                  showAlert(`Tone frequency set to ${newValue} Hz`, 'info', 1500);
                }}
                className="w-full accent-[#456359]"
              />
              </div>
              <span className="col-span-1 text-sm">{audioSettings.frequency} Hz</span>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-sm text-right col-span-1">
                Volume:
              </label>
              <div className="col-span-2">                  <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={audioSettings.volume}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  setAudioSettings({
                    ...audioSettings,
                    volume: newValue
                  });
                  showAlert(`Volume set to ${Math.round(newValue * 100)}%`, 'info', 1500);
                }}
                className="w-full accent-[#456359]"
              />
              </div>
              <span className="col-span-1 text-sm">{Math.round(audioSettings.volume * 100)}%</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-sm text-right col-span-1">
                Sound Type:
              </label>
              <div className="col-span-3">
                <div className="flex gap-2">
                  <label className="flex items-center">                      <input
                    type="radio"
                    name="soundType"
                    value="cw"
                    checked={audioSettings.soundType === 'cw'}
                    onChange={() => {
                      setAudioSettings({
                        ...audioSettings,
                        soundType: 'cw'
                      });
                      showAlert('Sound type set to CW Radio Tone', 'info', 2000);
                    }}
                    className="mr-1 accent-[#456359]"
                  />
                    CW Radio Tone
                  </label>
                  <label className="flex items-center">                      <input
                    type="radio"
                    name="soundType"
                    value="telegraph"
                    checked={audioSettings.soundType === 'telegraph'}
                    onChange={() => {
                      setAudioSettings({
                        ...audioSettings,
                        soundType: 'telegraph'
                      });
                      showAlert('Sound type set to Telegraph Sounder', 'info', 2000);
                    }}
                    className="mr-1 accent-[#456359]"
                  />
                    Telegraph Sounder
                  </label>
                </div>
              </div>
            </div>

          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>

    {/* Add custom animation keyframes */}      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        @keyframes pulse-dot {
          0%, 100% { background-color: #456359; }
          50% { background-color: #5a7d73; }
        }
        
        @keyframes pulse-dash {
          0%, 100% { background-color: #456359; }
          50% { background-color: #3a534a; }
        }
          .pulse-dot {
          animation: pulse-dot 0.15s ease-in-out;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        }
        
        .pulse-dash {
          animation: pulse-dash 0.5s ease-in-out;
          transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.3s ease-in-out forwards;
        }
      `}</style>
  </div>
  )
}
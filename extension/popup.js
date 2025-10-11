// Morse Code Maps
const internationalMorseCodeMap = {
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
};

// Build text-to-morse map
const textToMorseMap = Object.entries(internationalMorseCodeMap).reduce(
  (acc, [morse, text]) => {
    if (text !== " ") {
      acc[text.toLowerCase()] = morse;
    }
    return acc;
  },
  {}
);

// State
let mode = "text-to-morse"; // "text-to-morse" or "morse-to-text"
let audioContext = null;
let oscillator = null;
let gainNode = null;
let isPlaying = false;
let isPaused = false;
let audioTimeoutId = null;
let currentAudioIndex = 0;

// Settings
let settings = {
  wpm: 15,
  frequency: 700,
  volume: 0.5
};

// DOM Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const inputLabel = document.getElementById('inputLabel');
const outputLabel = document.getElementById('outputLabel');
const swapBtn = document.getElementById('swapBtn');
const clearBtn = document.getElementById('clearBtn');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const copyBtn = document.getElementById('copyBtn');
const visualIndicator = document.getElementById('visualIndicator');
const wpmSlider = document.getElementById('wpmSlider');
const freqSlider = document.getElementById('freqSlider');
const volumeSlider = document.getElementById('volumeSlider');
const wpmValue = document.getElementById('wpmValue');
const freqValue = document.getElementById('freqValue');
const volumeValue = document.getElementById('volumeValue');
const toast = document.getElementById('toast');

// Initialize
function init() {
  loadSettings();
  updatePlaceholders();
  setupEventListeners();
}

// Load settings from storage
function loadSettings() {
  chrome.storage.sync.get(['wpm', 'frequency', 'volume'], (result) => {
    if (result.wpm) settings.wpm = result.wpm;
    if (result.frequency) settings.frequency = result.frequency;
    if (result.volume) settings.volume = result.volume;
    
    wpmSlider.value = settings.wpm;
    freqSlider.value = settings.frequency;
    volumeSlider.value = Math.round(settings.volume * 100);
    
    updateSettingsDisplay();
  });
}

// Save settings to storage
function saveSettings() {
  chrome.storage.sync.set(settings);
}

// Update settings display
function updateSettingsDisplay() {
  wpmValue.textContent = settings.wpm;
  freqValue.textContent = settings.frequency;
  volumeValue.textContent = Math.round(settings.volume * 100);
}

// Setup event listeners
function setupEventListeners() {
  inputText.addEventListener('input', handleInputChange);
  swapBtn.addEventListener('click', swapMode);
  clearBtn.addEventListener('click', clearAll);
  playBtn.addEventListener('click', playAudio);
  pauseBtn.addEventListener('click', pauseAudio);
  stopBtn.addEventListener('click', stopAudio);
  copyBtn.addEventListener('click', copyOutput);
  
  wpmSlider.addEventListener('input', (e) => {
    settings.wpm = parseInt(e.target.value);
    updateSettingsDisplay();
    saveSettings();
  });
  
  freqSlider.addEventListener('input', (e) => {
    settings.frequency = parseInt(e.target.value);
    updateSettingsDisplay();
    saveSettings();
  });
  
  volumeSlider.addEventListener('input', (e) => {
    settings.volume = parseInt(e.target.value) / 100;
    updateSettingsDisplay();
    saveSettings();
  });
}

// Update placeholders based on mode
function updatePlaceholders() {
  if (mode === "text-to-morse") {
    inputLabel.textContent = "Text";
    outputLabel.textContent = "Morse Code";
    inputText.placeholder = "Enter text to convert to Morse code";
  } else {
    inputLabel.textContent = "Morse Code";
    outputLabel.textContent = "Text";
    inputText.placeholder = "Enter Morse code (dots and dashes, space between characters)";
  }
}

// Handle input change
function handleInputChange() {
  const value = inputText.value;
  
  if (mode === "morse-to-text") {
    // Validate morse code input
    const sanitized = value.replace(/[^.\- ]/g, "");
    if (sanitized !== value) {
      inputText.value = sanitized;
      showToast("Only dots (.), dashes (-), and spaces are allowed");
    }
    convertMorseToText(sanitized);
  } else {
    convertTextToMorse(value);
  }
  
  updateButtonStates();
}

// Convert text to morse code
function convertTextToMorse(text) {
  if (!text.trim()) {
    outputText.textContent = "Morse code will appear here";
    outputText.classList.add('placeholder');
    return;
  }
  
  const normalized = text.normalize('NFC').toLowerCase();
  const words = normalized.split(" ");
  
  const morseWords = words.map((word) => {
    return Array.from(word)
      .map((char) => textToMorseMap[char] || "")
      .filter((morse) => morse !== "")
      .join(" ");
  });
  
  const result = morseWords.join("   ");
  outputText.textContent = result;
  outputText.classList.remove('placeholder');
}

// Convert morse code to text
function convertMorseToText(morse) {
  if (!morse.trim()) {
    outputText.textContent = "Converted text will appear here";
    outputText.classList.add('placeholder');
    return;
  }
  
  const morseWords = morse.trim().split("   ");
  
  const textWords = morseWords.map((word) => {
    const morseChars = word.split(" ");
    return morseChars.map((char) => internationalMorseCodeMap[char] || "").join("");
  });
  
  const result = textWords.join(" ");
  outputText.textContent = result;
  outputText.classList.remove('placeholder');
}

// Swap mode
function swapMode() {
  stopAudio();
  
  const currentInput = inputText.value;
  const currentOutput = outputText.textContent;
  
  mode = mode === "text-to-morse" ? "morse-to-text" : "text-to-morse";
  updatePlaceholders();
  
  // Swap values if there's output
  if (!outputText.classList.contains('placeholder')) {
    inputText.value = currentOutput;
    handleInputChange();
  } else {
    inputText.value = "";
    handleInputChange();
  }
  
  showToast(`Switched to ${mode === 'text-to-morse' ? 'Text → Morse' : 'Morse → Text'} mode`);
}

// Clear all
function clearAll() {
  stopAudio();
  inputText.value = "";
  outputText.textContent = mode === "text-to-morse" ? "Morse code will appear here" : "Converted text will appear here";
  outputText.classList.add('placeholder');
  updateButtonStates();
  showToast("Cleared");
}

// Copy output
function copyOutput() {
  const text = outputText.textContent;
  if (outputText.classList.contains('placeholder')) {
    showToast("Nothing to copy");
    return;
  }
  
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied to clipboard!");
  }).catch(() => {
    showToast("Failed to copy");
  });
}

// Initialize audio context
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    
    oscillator.frequency.value = settings.frequency;
    gainNode.gain.value = 0;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
  }
}

// Play audio
function playAudio() {
  const morseText = mode === "text-to-morse" ? outputText.textContent : inputText.value;
  
  if (outputText.classList.contains('placeholder') || !morseText.trim()) {
    showToast("Nothing to play");
    return;
  }
  
  initAudioContext();
  
  if (isPaused) {
    resumeAudio();
    return;
  }
  
  stopAudio();
  isPlaying = true;
  isPaused = false;
  currentAudioIndex = 0;
  
  updateButtonStates();
  playMorseAudio(morseText, 0);
}

// Play morse audio
function playMorseAudio(morseText, startIndex) {
  const dotDuration = 1.2 / settings.wpm;
  const dashDuration = dotDuration * 3;
  const symbolSpaceDuration = dotDuration;
  const letterSpaceDuration = dotDuration * 3;
  const wordSpaceDuration = dotDuration * 7;
  
  oscillator.frequency.setValueAtTime(settings.frequency, audioContext.currentTime);
  
  const symbols = morseText.split('');
  let scheduleTime = audioContext.currentTime;
  let currentIndex = startIndex;
  
  const scheduleNextAudio = () => {
    if (currentIndex >= symbols.length || !isPlaying) {
      stopAudio();
      return;
    }
    
    if (isPaused) {
      currentAudioIndex = currentIndex;
      return;
    }
    
    const symbol = symbols[currentIndex];
    let symbolDuration = 0;
    let spaceDuration = symbolSpaceDuration;
    
    if (symbol === '.' || symbol === '•') {
      symbolDuration = dotDuration;
      gainNode.gain.setValueAtTime(settings.volume, scheduleTime);
      gainNode.gain.setValueAtTime(0, scheduleTime + symbolDuration);
      showVisualEffect(false, symbolDuration * 1000);
    } else if (symbol === '-' || symbol === '–' || symbol === '—') {
      symbolDuration = dashDuration;
      gainNode.gain.setValueAtTime(settings.volume, scheduleTime);
      gainNode.gain.setValueAtTime(0, scheduleTime + symbolDuration);
      showVisualEffect(true, symbolDuration * 1000);
    } else if (symbol === ' ') {
      if (currentIndex + 2 < symbols.length && symbols[currentIndex + 1] === ' ' && symbols[currentIndex + 2] === ' ') {
        spaceDuration = wordSpaceDuration;
        currentIndex += 2;
      } else {
        spaceDuration = letterSpaceDuration;
      }
      symbolDuration = 0;
    }
    
    scheduleTime += symbolDuration + spaceDuration;
    currentIndex++;
    currentAudioIndex = currentIndex;
    
    const delay = (scheduleTime - audioContext.currentTime) * 1000;
    audioTimeoutId = setTimeout(scheduleNextAudio, Math.max(0, delay));
  };
  
  scheduleNextAudio();
}

// Pause audio
function pauseAudio() {
  if (!isPlaying || isPaused) return;
  
  isPaused = true;
  
  if (audioTimeoutId) {
    clearTimeout(audioTimeoutId);
    audioTimeoutId = null;
  }
  
  gainNode.gain.cancelScheduledValues(audioContext.currentTime);
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  
  updateButtonStates();
  showToast("Paused");
}

// Resume audio
function resumeAudio() {
  if (!isPlaying || !isPaused) return;
  
  isPaused = false;
  const morseText = mode === "text-to-morse" ? outputText.textContent : inputText.value;
  
  updateButtonStates();
  playMorseAudio(morseText, currentAudioIndex);
  showToast("Resumed");
}

// Stop audio
function stopAudio() {
  if (audioTimeoutId) {
    clearTimeout(audioTimeoutId);
    audioTimeoutId = null;
  }
  
  if (gainNode && audioContext) {
    gainNode.gain.cancelScheduledValues(audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  }
  
  isPlaying = false;
  isPaused = false;
  currentAudioIndex = 0;
  
  updateButtonStates();
  visualIndicator.classList.remove('active', 'dash');
}

// Show visual effect
function showVisualEffect(isDash, duration) {
  visualIndicator.classList.add('active');
  if (isDash) {
    visualIndicator.classList.add('dash');
  } else {
    visualIndicator.classList.remove('dash');
  }
  
  setTimeout(() => {
    visualIndicator.classList.remove('active', 'dash');
  }, duration);
}

// Update button states
function updateButtonStates() {
  const hasOutput = !outputText.classList.contains('placeholder');
  const hasInput = inputText.value.trim().length > 0;
  
  clearBtn.disabled = !hasInput;
  copyBtn.disabled = !hasOutput;
  playBtn.disabled = !hasOutput || isPlaying;
  pauseBtn.disabled = !isPlaying || isPaused;
  stopBtn.disabled = !isPlaying;
  
  // Toggle pause/play button visibility
  if (isPaused) {
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
  } else if (isPlaying) {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
  } else {
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
  }
  
  if (isPlaying) {
    playBtn.classList.add('active');
  } else {
    playBtn.classList.remove('active');
  }
}

// Show toast notification
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);



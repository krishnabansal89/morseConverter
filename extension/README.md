# Morse Code Translator - Browser Extension

A beautiful and functional browser extension for converting text to Morse code and vice versa, with audio playback capabilities.

## Features

- 🔄 **Bidirectional Translation**: Convert text to Morse code and Morse code to text
- 🔊 **Audio Playback**: Listen to Morse code with customizable settings
- 🎨 **Beautiful UI**: Clean, modern interface matching your website's design theme
- ⚙️ **Customizable Settings**: Adjust WPM (Words Per Minute), frequency, and volume
- 📋 **Copy to Clipboard**: Easy one-click copying of translated text
- 💾 **Persistent Settings**: Your audio settings are saved across sessions
- 🎯 **Visual Feedback**: See visual indicators during audio playback

## Installation

### For Development/Testing

1. **Open Chrome/Edge** (or any Chromium-based browser)
2. Navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked**
5. Select the `extension` folder from this project
6. The extension icon should now appear in your browser toolbar!

### Creating Icons

The extension currently uses a placeholder SVG icon. To create proper PNG icons:

1. **Option 1: Convert the SVG**
   - Open `icons/icon.svg` in a graphics editor (e.g., Inkscape, Figma, or online tools)
   - Export as PNG with these sizes:
     - `icon16.png` - 16x16 pixels
     - `icon48.png` - 48x48 pixels
     - `icon128.png` - 128x128 pixels

2. **Option 2: Use an Online Icon Generator**
   - Use tools like [favicon.io](https://favicon.io) or [realfavicongenerator.net](https://realfavicongenerator.net)
   - Upload the SVG or create custom icons
   - Generate all required sizes

3. Save the PNG files in the `extension/icons/` directory

## Usage

### Text to Morse Code
1. Click the extension icon in your browser toolbar
2. Enter text in the input field
3. Morse code appears automatically in the output section
4. Click the **Play** button to hear the Morse code
5. Use **Copy** to copy the Morse code to clipboard

### Morse Code to Text
1. Click the **Swap** button to switch modes
2. Enter Morse code (use dots `.` and dashes `-`)
   - Single space between letters
   - Three spaces between words
3. The translated text appears automatically
4. Click **Play** to hear the Morse code

### Audio Settings
1. Click **Audio Settings** to expand the settings panel
2. Adjust:
   - **WPM**: Speed of Morse code playback (5-30 words per minute)
   - **Frequency**: Tone pitch (400-1000 Hz)
   - **Volume**: Playback volume (0-100%)
3. Settings are automatically saved

## Keyboard Shortcuts

- **Tab**: Navigate between input and buttons
- **Enter** (in settings): Apply changes
- **Escape**: Close the extension popup

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: Storage (for saving settings)
- **Morse Code Standard**: International Morse Code
- **Audio**: Web Audio API for precise timing
- **Storage**: Chrome Storage API for persistent settings

## Customization

### Changing Colors
Edit `styles.css` and update these CSS variables:
- Primary color: `#456359` (brand green)
- Secondary color: `#5a7d73` (lighter green)
- Background: `#ece8e4` (light beige)

### Adding More Features
The codebase is structured for easy extension:
- `popup.js`: Main logic and Morse code maps
- `popup.html`: UI structure
- `styles.css`: All styling

## Browser Compatibility

- ✅ Google Chrome (88+)
- ✅ Microsoft Edge (88+)
- ✅ Brave Browser
- ✅ Opera (74+)
- ⚠️ Firefox (requires minor manifest adjustments for v2)
- ❌ Safari (different extension format)

## Publishing to Chrome Web Store

1. Create a developer account at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Prepare your extension:
   - Create high-quality icons (replace the placeholder icons)
   - Add screenshots (1280x800 or 640x400)
   - Write a detailed description
3. Zip the entire `extension` folder
4. Upload to the Chrome Web Store
5. Pay the one-time $5 developer fee
6. Submit for review

## Troubleshooting

### Extension doesn't load
- Make sure you selected the `extension` folder, not a parent folder
- Check that all files are present: `manifest.json`, `popup.html`, `popup.js`, `styles.css`

### Audio doesn't play
- Check your browser's audio settings
- Ensure the extension has permission to play audio
- Try adjusting the volume in settings

### Icons not showing
- Create PNG icons from the SVG template (see "Creating Icons" section)
- Ensure icons are named correctly: `icon16.png`, `icon48.png`, `icon128.png`

## Support

For issues related to:
- **Extension**: Check the browser console (F12 → Console)
- **Audio problems**: Verify Web Audio API support in your browser
- **General questions**: Refer to the main website documentation

## License

This extension is part of the Morse Code Translator project.

## Credits

- International Morse Code standard
- Design inspired by the main Morse Code Translator website
- Built with vanilla JavaScript for optimal performance



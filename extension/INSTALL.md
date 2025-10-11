# Quick Installation Guide

## Step 1: Generate Icons (Required)

You need to create PNG icons before installing the extension. Choose one method:

### Method A: Using Online Tool (Easiest)
1. Go to https://cloudconvert.com/svg-to-png
2. Upload `extension/icons/icon.svg`
3. Convert to PNG three times with these sizes:
   - 16x16 → Save as `icon16.png`
   - 48x48 → Save as `icon48.png`
   - 128x128 → Save as `icon128.png`
4. Save all three files in the `extension/icons/` folder

### Method B: Using Inkscape (Free Desktop App)
1. Download Inkscape: https://inkscape.org/
2. Open `icon.svg`
3. File → Export PNG Image
4. Set width/height to 16, export as `icon16.png`
5. Repeat for 48px and 128px
6. Save all files in `extension/icons/` folder

### Method C: Using the Icon Generator (Included)
1. Open `extension/generate-icons.html` in your browser
2. Click the download buttons to save each size
3. Save all three PNG files in `extension/icons/` folder

## Step 2: Install Extension

### For Chrome/Edge/Brave:
1. Open your browser
2. Go to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`
3. Enable **Developer mode** (toggle switch in top-right)
4. Click **Load unpacked**
5. Navigate to and select the `extension` folder
6. Done! The extension icon should appear in your toolbar

### For Opera:
1. Go to `opera://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `extension` folder

## Step 3: Test the Extension

1. Click the extension icon in your toolbar
2. Type some text in the input field
3. You should see Morse code appear automatically
4. Try the Play button to hear the Morse code!

## Troubleshooting

**"Extension failed to load"**
- Make sure you selected the `extension` folder (not the parent folder)
- Check that icon files exist in `extension/icons/`

**"Icons not showing"**
- Complete Step 1 to generate the PNG icons
- Refresh the extension after adding icons

**"Audio doesn't work"**
- Check browser audio settings
- Try adjusting volume in the extension settings

## Next Steps

- Customize the colors in `styles.css`
- Add more features in `popup.js`
- Share with friends!

---

**Need Help?** Check the full `README.md` for detailed documentation.



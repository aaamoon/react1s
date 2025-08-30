# Internationalization Guide for React1s Chrome Extension

## Overview
This Chrome extension now supports multiple languages through Chrome's built-in internationalization (i18n) API.

## Supported Languages
- Chinese (zh) - Default
- English (en)
- Japanese (ja)
- Korean (ko)
- Spanish (es)
- French (fr)
- German (de)

## How it Works
The extension automatically detects the user's browser language and displays the appropriate text. If the user's language is not supported, it falls back to Chinese (the default locale).

## File Structure
```
_locales/
├── zh/
│   └── messages.json
├── en/
│   └── messages.json
├── ja/
│   └── messages.json
├── ko/
│   └── messages.json
├── es/
│   └── messages.json
├── fr/
│   └── messages.json
└── de/
    └── messages.json
```

## Message Keys
- `appName`: Extension name
- `appDescription`: Extension description
- `instructions`: Instruction text before the key combination
- `instructionsKey`: The key combination text
- `instructionsAction`: Instruction text after the key combination
- `selectEditor`: "Please select code editor" text
- `customPath`: "Custom Path" option text
- `update`: "Update" button text
- `selectMaxDepth`: "Please select max depth" text

## Adding New Languages
1. Create a new directory under `_locales/` with the language code (e.g., `pt` for Portuguese)
2. Create a `messages.json` file with all the required message keys
3. Translate all the messages appropriately
4. The extension will automatically support the new language

## Testing
To test different languages:
1. Change your Chrome browser language settings
2. Restart Chrome
3. Load the extension and check if the text appears in the correct language

## Development
When adding new text to the extension:
1. Add the text key to all locale files in `_locales/*/messages.json`
2. Use `chrome.i18n.getMessage("messageKey")` in the code instead of hardcoded text
3. For complex UI elements (like the Kbd component), split the message into parts:
   ```typescript
   // Instead of hardcoding:
   // "按住 <Kbd>⌥ Option(Alt)</Kbd> 同时鼠标左键点击页面元素"
   
   // Use split messages:
   {chrome.i18n.getMessage("instructions")} <Kbd>{chrome.i18n.getMessage("instructionsKey")}</Kbd> {chrome.i18n.getMessage("instructionsAction")}
   ```

## Build Process
1. Update source files with `chrome.i18n.getMessage()` calls
2. Run `npm run build` or `yarn build` to generate the extension
3. The `_locales` directory will be automatically included in the build
4. Test with different browser language settings
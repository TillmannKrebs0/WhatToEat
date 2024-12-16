# WhatToEat (whattoeatapp)

A mobile app, that helps you decide whats on the plate today!

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Doployment on Mobile
1. Build the Project
``` bash
npm run build
```

2. add android dependencies (first time only)
```bash
npx cap add android
```

3. Update android files
```bash
npx cap sync
```  

4. Open the android folder in Android Studio and run on emulator or connect a device
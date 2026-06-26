import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.studyhub.app',
  appName: 'Study Hub',
  // For production: point to your Vercel deployment URL
  // For local dev with `next dev`: use your local IP, e.g. http://192.168.1.x:3000
  server: {
    url: process.env.CAPACITOR_SERVER_URL ?? 'https://study-hub-2.vercel.app',
    cleartext: false,
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
    backgroundColor: '#F8FBFF',
    preferredContentMode: 'mobile',
    // Splash screen config handled by @capacitor/splash-screen
    limitsNavigationsToAppBoundDomains: true,
    allowsLinkPreview: false,
  },
  android: {
    backgroundColor: '#F8FBFF',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      backgroundColor: '#F8FBFF',
      iosSpinnerStyle: 'small',
      spinnerColor: '#0066FF',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: false,
    },
    StatusBar: {
      style: 'Default',
      backgroundColor: '#F8FBFF',
    },
    Keyboard: {
      resize: 'body',
      style: 'light',
      resizeOnFullScreen: true,
    },
  },
}

export default config

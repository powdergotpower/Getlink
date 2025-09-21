import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.75f292897b0642e19d5e8d592fa8c32c',
  appName: 'GetLink',
  webDir: 'dist',
  server: {
    url: 'https://75f29289-7b06-42e1-9d5e-8d592fa8c32c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f0f23',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#7c3aed',
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
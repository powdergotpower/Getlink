import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.powdergotpower.getlink',
  appName: 'GetLink',
  webDir: 'dist', // Make sure npm run build outputs here
  server: {
    androidScheme: 'https', // For Android HTTPS hosting
  },
  android: {
    buildOptions: {
      releaseType: 'APK', // Optional; default is APK
      // Optional: set extra flags for Gradle if needed
      // gradleCommand: 'assembleDebug' or 'assembleRelease'
    },
  },
};

export default config;

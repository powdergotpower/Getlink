# GetLink - Instant File Sharing

Upload any file and get a universal web link to share or download. Perfect for quick file sharing across devices and platforms.

## 🚀 Features

- **Universal Upload**: Support for all file types - images, videos, documents, audio, and more
- **Instant Links**: Get shareable URLs immediately after upload
- **Mobile Optimized**: Perfect experience on mobile devices with touch-friendly interface
- **Secure Sharing**: Files hosted securely with unique URLs

## 📱 Mobile App (APK)

This project automatically builds Android APKs using GitHub Actions.

### Download APK
- Check the [Releases](../../releases) section for the latest APK
- Or download from [Actions](../../actions) artifacts after each build

### Building APK Locally in Termux

1. **Setup Termux environment:**
```bash
# Update packages
pkg update && pkg upgrade

# Install required packages
pkg install nodejs git openjdk-17 android-tools

# Install Android SDK (if not already installed)
pkg install android-sdk
```

2. **Clone and setup:**
```bash
# Clone your repository
git clone <YOUR_REPO_URL>
cd getlink

# Install dependencies
npm install

# Build web app
npm run build
```

3. **Setup Capacitor:**
```bash
# Add Android platform
npx cap add android

# Sync project
npx cap sync android
```

4. **Build APK:**
```bash
# Navigate to android folder
cd android

# Make gradlew executable
chmod +x ./gradlew

# Build debug APK
./gradlew assembleDebug

# APK will be generated at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## 🌐 Web Deployment

### Option 1: GitHub Pages
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. The web app will be available at `https://yourusername.github.io/getlink`

### Option 2: Termux Local Server
```bash
# In project root
npm run dev

# Or build and serve
npm run build
npx serve dist
```

## 🔧 Development

### Prerequisites
- Node.js 18+
- For mobile: Android SDK, Java 17+

### Local Development
```bash
npm install
npm run dev
```

### Mobile Development
```bash
# After making changes
npm run build
npx cap sync
npx cap run android  # Opens in Android Studio/emulator
```

## 📋 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Mobile**: Capacitor
- **UI Components**: shadcn/ui
- **Build**: GitHub Actions

## 🎯 GitHub Actions Workflow

The repository includes automated workflows for:
- **APK Building**: Automatically builds Android APK on every push
- **Release Creation**: Creates releases with downloadable APKs
- **Artifact Storage**: Stores APKs for 30 days

## 📖 Usage

1. **Web**: Visit the deployed URL and start uploading files
2. **Mobile**: Install the APK and use the native app experience
3. **Development**: Clone, install dependencies, and start coding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push and create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: For production use, you'll need to implement a proper backend for file storage and URL generation. The current version demonstrates the UI/UX concept.
# Saigon Kitchen - Setup Guide

## 🚀 Quick Start

This guide will help you set up the Vietnamese restaurant website locally and deploy it to Firebase.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** and npm
- **Git**
- **Firebase CLI** (`npm install -g firebase-tools`)

## 🔧 Installation Steps

### 1. Install Dependencies

```bash
cd vietnamese-restaurant-nextjs
npm install
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it "saigon-kitchen" (or your preferred name)
4. Enable Google Analytics (optional)

#### Enable Authentication
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable "Google" provider
3. Add your domain to authorized domains

#### Create Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in test mode (we'll update rules later)
4. Choose your preferred location

#### Get Firebase Configuration
1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click "Web app" icon
4. Register your app
5. Copy the configuration object

### 3. Environment Configuration

```bash
cp .env.local.example .env.local
```

Fill in your Firebase configuration in `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (for server-side operations)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Google OAuth (same as Firebase)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gemini AI (optional - for recommendations)
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Firebase Admin Setup (Optional)

For server-side operations, you'll need a service account:

1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the `private_key` and `client_email` for your `.env.local`

### 5. Initialize Firebase in Project

```bash
firebase login
firebase init
```

Select:
- ✅ Firestore
- ✅ Hosting
- ✅ Storage (optional)

Choose your existing project and accept defaults.

### 6. Update Firestore Rules

The `firestore.rules` file is already configured. Deploy it:

```bash
firebase deploy --only firestore:rules
```

### 7. Seed Database (Optional)

To populate with sample Vietnamese menu data:

```bash
# First, make sure you have the service account JSON file
# Then run the seeding script
node scripts/seedDatabase.js
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 🚀 Deployment

### Deploy to Firebase Hosting

```bash
# Build the application
npm run build

# Deploy to Firebase
firebase deploy
```

Or use the deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔧 Configuration Details

### Tailwind CSS Custom Colors

The application uses a Vietnamese-inspired color palette:

```javascript
// tailwind.config.ts
colors: {
  primary: {
    50: '#f0f9f0',
    500: '#3a9a3a',  // Natural green
    600: '#2d7d2d',
  },
  secondary: {
    500: '#dc8b2a',  // Warm earth tone
  },
  accent: {
    500: '#ed7328',  // Vietnamese orange
  }
}
```

### Font Configuration

- **Headings**: Playfair Display (serif)
- **Body**: PT Sans (sans-serif)
- **Vietnamese**: Custom font support

### Multilingual Support

The app supports:
- 🇺🇸 English (default)
- 🇫🇷 French
- 🇻🇳 Vietnamese

## 📱 Features Included

### ✅ Completed Features
- Multilingual support (EN/FR/VI)
- Responsive design
- Firebase authentication with Google
- Firestore database integration
- Shopping cart functionality
- Menu browsing with categories
- Vietnamese-inspired design
- TypeScript support
- Tailwind CSS styling

### 🚧 To Be Implemented
- Payment processing
- Order management system
- AI recommendations with Gemini
- Push notifications
- Admin dashboard
- Real-time order tracking

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript Errors**: The current setup has some TypeScript configuration issues. To resolve:
   ```bash
   npm install --save-dev @types/react @types/react-dom @types/node
   ```

2. **Firebase Connection Issues**: 
   - Verify your `.env.local` file has correct values
   - Check Firebase project settings
   - Ensure Firestore is initialized

3. **Build Errors**:
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

### Development Tips

1. **Hot Reload**: The development server supports hot reload for instant updates
2. **Database Viewer**: Use Firebase Console to view/edit Firestore data
3. **Debugging**: Check browser console and terminal for error messages

## 📚 Project Structure

```
vietnamese-restaurant-nextjs/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── contexts/           # React contexts
│   ├── lib/                # Utilities and configs
│   └── types/              # TypeScript definitions
├── public/                 # Static assets
├── scripts/               # Database seeding
└── firebase.json          # Firebase configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review Firebase documentation
- Create an issue on GitHub

---

🍜 **Happy coding with Saigon Kitchen!** 🥢

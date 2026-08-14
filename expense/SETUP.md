# Firebase Setup Guide

This guide will help you set up Firebase for the Expense Tracker app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Enter a project name (e.g., "expense-tracker")
4. Click **"Continue"**
5. Choose settings (you can skip Google Analytics for now)
6. Click **"Create project"**
7. Wait for the project to be created, then click **"Continue"**

## Step 2: Create a Firestore Database

1. In the Firebase Console, click on your project
2. In the left sidebar, go to **"Build"** → **"Firestore Database"**
3. Click **"Create database"**
4. Select **"Start in test mode"** (for development only)
   - **⚠️ Warning:** Test mode allows anyone to read/write. For production, use security rules
5. Click **"Next"**
6. Select a location (e.g., "us-central1")
7. Click **"Enable"**

Your Firestore database is now ready!

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon in top-left)
2. Scroll down to find your project's config
3. You'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "expense-tracker-xxx.firebaseapp.com",
  projectId: "expense-tracker-xxx",
  storageBucket: "expense-tracker-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

Copy these values.

## Step 4: Configure Environment Variables

1. In the `expense` directory, copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Open `.env.local` in your editor

3. Update with your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_api_key_from_step_3
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_from_step_3
VITE_FIREBASE_PROJECT_ID=your_project_id_from_step_3
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_from_step_3
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_from_step_3
VITE_FIREBASE_APP_ID=your_app_id_from_step_3
```

4. Save the file

## Step 5: Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Step 6: (Optional) Secure Your Database

For production, set up Firestore Security Rules:

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace the rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write only if authenticated
    match /expenses/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

Then, implement user authentication in the app:
- Add Firebase Authentication to `src/firebase.ts`
- Require login before accessing expenses
- Associate expenses with user ID

## Troubleshooting

### "Module not found: firebase"
Run: `npm install firebase recharts`

### Firebase connection errors
- Check `.env.local` values are correct
- Copy the exact strings from Firebase Console
- Make sure Firestore database is created

### CORS or permission errors
- Check Firestore Security Rules
- If using test mode, rules should allow all reads/writes
- In production, add authentication

### Port already in use
Edit `vite.config.ts` to change the port:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

## Firebase Pricing

- **Firestore Database:** Free tier includes 1GB storage, 50K reads/day, 20K writes/day
- **Perfect for personal expense tracking!**

Learn more: [Firebase Pricing](https://firebase.google.com/pricing)

## Next Steps

1. ✅ Set up Firebase
2. ✅ Configure environment variables
3. ✅ Run `npm run dev`
4. 📝 Add your first expense!
5. 🔒 (Optional) Set up authentication for production

Enjoy tracking your expenses! 💰


-------------------------------------------------------------------
-------------------------------------------------------------------
-------------------------------------------------------------------
from firebase
-------------
step1


step2
npm install firebase

--------------------------------------------------------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
--------------------------------------------------------------------

step3
npm install -g firebase-tools

step4
firebase login
firebase init
firebase deploy
-------------------------------------------------------------------
-------------------------------------------------------------------
-------------------------------------------------------------------
Project Console: https://console.firebase.google.com/project/expense-e8998/overview
Hosting URL: https://expense-e8998.web.app
rifatjahanzim007@gmail.com
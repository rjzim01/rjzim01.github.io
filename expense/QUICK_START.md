# 🚀 Quick Start Guide

Get your expense tracker running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- Firebase account (free tier available)

## Step 1: Firebase Setup (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project (or use existing)
3. Create Firestore database in test mode
4. Get your config from Project Settings

See detailed steps in [SETUP.md](SETUP.md)

## Step 2: Environment Configuration (1 minute)

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your Firebase credentials
```

Your `.env.local` should look like:
```env
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=myapp.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-project
VITE_FIREBASE_STORAGE_BUCKET=my-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
```

## Step 3: Start the App (2 minutes)

```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

## Step 4: Use the App

Open http://localhost:5173 and:

1. **Add expense:** Fill form → Click "Add Expense"
2. **View dashboard:** See stats and charts
3. **Edit expense:** Click ✏️ button
4. **Delete expense:** Click 🗑️ button (confirm deletion)
5. **Filter:** Use category/date filters

## Common Tasks

### Change port
Edit `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 }
})
```

### View Firestore data
1. Firebase Console → Firestore Database
2. Collection: `expenses`
3. View all documents

### Build for production
```bash
npm run build
```
Output: `dist/` folder

### Debug
```bash
# Check TypeScript
npx tsc --noEmit

# Run linter
npm run lint
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Firebase errors | Check `.env.local` values match Firebase Console |
| Port 5173 in use | Kill process or change port in `vite.config.ts` |
| Charts not showing | Add at least 2 expenses in different categories |
| Blank page | Check browser console (F12) for errors |
| Can't add expenses | Verify Firestore database exists and is in test mode |

## Features Available

✅ Add, edit, delete expenses
✅ Filter by category & date
✅ View spending dashboard
✅ See pie chart by category
✅ Track monthly trends
✅ Cloud storage (Firebase)
✅ Responsive design
✅ No login required (test mode)

## Next Steps

1. **Customize:** Edit categories in `src/components/ExpenseForm.tsx`
2. **Style:** Modify colors in component CSS files
3. **Deploy:** Use Vercel, Netlify, or Firebase Hosting
4. **Secure:** Add authentication and security rules (see DESIGN.md)

## Video Walkthrough

1. Open app → See empty state
2. Add 3-4 expenses with different categories
3. Watch dashboard update with stats
4. Toggle filters to see filtering in action
5. Click edit/delete to test those features

## File Quick Reference

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main logic & state management |
| `src/components/Dashboard.tsx` | Stats & charts |
| `src/components/ExpenseForm.tsx` | Add/edit form |
| `src/components/ExpenseList.tsx` | Expense list |
| `src/firebase.ts` | Firebase config |
| `src/types.ts` | TypeScript interfaces |

## Resources

- 📖 [Full README](README.md) - Complete documentation
- 🏗️ [Design Overview](DESIGN.md) - Architecture & design
- 🔧 [Setup Guide](SETUP.md) - Detailed Firebase setup
- 💬 [Firebase Docs](https://firebase.google.com/docs)
- ⚛️ [React Docs](https://react.dev)

## Support

If you run into issues:
1. Check the troubleshooting section above
2. Read SETUP.md for Firebase configuration help
3. Check browser console (F12) for error messages
4. Verify `.env.local` has correct credentials

---

**You're all set!** 🎉 Enjoy tracking your expenses! 💰

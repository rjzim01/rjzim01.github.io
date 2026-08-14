# 💰 Expense Tracker App

A modern, feature-rich expense tracking application built with React, TypeScript, and Firebase. Track your spending, categorize expenses, and visualize your financial data with beautiful charts and analytics.

## Features

✨ **Core Features:**
- 📝 Add, edit, and delete expenses
- 🏷️ Categorize expenses (Food, Transport, Entertainment, Utilities, Shopping, Health, Education, Other)
- 📅 Track expenses by date
- 🔍 Filter expenses by category and date range
- 💾 Cloud storage with Firebase Firestore

📊 **Analytics & Dashboard:**
- 📈 Real-time dashboard with spending summary
- 📊 Pie charts showing spending by category
- 📉 Monthly spending trends
- 💯 Category breakdown with transaction count
- 🎯 Top spending category highlight

🎨 **Design:**
- Beautiful gradient UI with modern styling
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Dark mode ready

## Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** CSS3 with flexbox/grid
- **Charts:** Recharts
- **Backend:** Firebase Firestore
- **Linting:** Oxlint

## Getting Started

### Prerequisites
- Node.js (v18+)
- Firebase account (create one at [firebase.google.com](https://firebase.google.com))

### Installation

1. **Clone and navigate to the project:**
```bash
cd expense
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup Firebase:**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Create a Firestore database
   - Get your Firebase config from Project Settings
   - Copy `.env.example` to `.env.local`
   - Update `.env.local` with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start development server:**
```bash
npm run dev
```

5. **Open in browser:**
Visit `http://localhost:5173`

## Usage

### Adding an Expense
1. Fill in the form with:
   - Amount (in dollars)
   - Category
   - Description
   - Date
2. Click "Add Expense"

### Editing an Expense
1. Click the ✏️ button on any expense
2. Update the form fields
3. Click "Update Expense"

### Deleting an Expense
1. Click the 🗑️ button on any expense
2. Confirm the deletion

### Filtering Expenses
- Use the Category filter to view expenses from a specific category
- Use the Date range filters to view expenses within a date range
- Click "Clear Filters" to reset all filters

### Dashboard
- View total spending and average expense
- See spending breakdown by category
- Analyze monthly spending trends
- Identify your top spending category

## Project Structure

```
expense/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx       # Dashboard with stats and charts
│   │   ├── Dashboard.css
│   │   ├── ExpenseForm.tsx     # Form for adding/editing expenses
│   │   ├── ExpenseForm.css
│   │   ├── ExpenseList.tsx     # List of expenses
│   │   └── ExpenseList.css
│   ├── App.tsx                 # Main app component
│   ├── App.css
│   ├── firebase.ts             # Firebase configuration
│   ├── types.ts                # TypeScript types
│   ├── main.tsx
│   ├── index.css
│   └── assets/
├── .env.example                # Environment variables template
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Firestore Database Schema

```
expenses (collection)
├── {expense_id}
│   ├── amount: number
│   ├── category: string
│   ├── description: string
│   ├── date: string (ISO format: YYYY-MM-DD)
│   └── createdAt: number (timestamp)
```

## Security Considerations

**Important:** The current Firebase setup uses public API keys. For production:

1. Set up Firestore Security Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

2. Enable Firebase Authentication
3. Implement user authentication
4. Associate expenses with user IDs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- 👤 User authentication and profiles
- 📱 Mobile app with React Native
- 💳 Budget planning and alerts
- 📤 Export to CSV/PDF
- 🔔 Spending notifications
- 🌍 Multi-currency support
- 📊 Advanced analytics and reports

## Troubleshooting

**Firebase errors?**
- Check that your Firebase config in `.env.local` is correct
- Ensure Firestore database is created in Firebase console
- Check Firebase Security Rules allow your requests

**Charts not showing?**
- Make sure you have at least one expense
- Check browser console for any errors
- Ensure Recharts is installed: `npm install recharts`

**Port already in use?**
- Change port in `vite.config.ts`
- Or kill the process using the port

## License

MIT

## Author

Created with ❤️ for better expense tracking

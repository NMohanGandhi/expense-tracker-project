# 📊 Expense Tracker - GitHub Pages Deployment

A **client-side Expense Management System** built with HTML, CSS, and JavaScript for deployment on GitHub Pages. This static web application provides all the core functionality of expense tracking without requiring server-side infrastructure.

## 🌐 Live Demo

**Access the live application here:** [https://nmohandgandhi.github.io/expense-tracker-project/](https://nmohandgandhi.github.io/expense-tracker-project/)

## ✨ Features

### 💰 Expense Management
- **Add/Update Expenses**: Easy form interface to add daily expenses
- **Multiple Categories**: Rent, Food, Entertainment, Shopping, Bills, Other
- **Date-based Organization**: Organize expenses by date
- **Real-time Calculations**: Automatic daily total calculations
- **Data Persistence**: All data stored locally in browser storage

### 📊 Analytics Dashboard
- **Category Analytics**: Visual breakdown of expenses by category
- **Monthly Analytics**: Track spending patterns over months  
- **Interactive Charts**: Responsive bar charts with hover effects
- **Percentage Breakdown**: See spending distribution with percentages
- **Date Range Filtering**: Analyze expenses for custom date ranges

### 🔄 Data Management
- **Export Data**: Download your expense data as JSON
- **Import Data**: Upload previously exported data
- **Clear Data**: Reset all data with confirmation
- **Sample Data**: Optional demo data to explore features

### 📱 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Professional dark gradient background
- **Smooth Animations**: Engaging transitions and hover effects
- **Intuitive Navigation**: Tab-based interface for easy access
- **Real-time Feedback**: Toast notifications for user actions

## 🚀 Technology Stack

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox/Grid, animations, and responsive design
- **Vanilla JavaScript**: Pure JavaScript with ES6+ features
- **LocalStorage API**: Client-side data persistence
- **GitHub Pages**: Static hosting platform

## 📖 How to Use

### Adding Expenses
1. Click on the **Add/Update** tab
2. Select a date using the date picker
3. Fill in expense details:
   - **Amount**: Enter the expense amount
   - **Category**: Select from predefined categories
   - **Notes**: Add optional description
4. Click **💾 Save Expenses** to store the data

### Viewing Analytics
1. **By Category**: 
   - Go to **Analytics By Category** tab
   - Select start and end dates
   - Click **📊 Get Analytics** to see breakdown

2. **By Month**:
   - Go to **Analytics By Months** tab
   - Click **📈 Generate Monthly Analytics** to view monthly trends

### Managing Data
1. **Export**: Click **📤 Export Data** to download your data
2. **Import**: Click **📥 Import Data** to upload previously saved data
3. **Clear**: Click **🗑️ Clear All Data** to reset (with confirmation)

## 🔧 Development Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Git (for version control)

### Local Development
```bash
# Clone the repository
git clone https://github.com/NMohanGandhi/expense-tracker-project.git
cd expense-tracker-project/docs

# Open with live server (if using VS Code Live Server extension)
# Or simply open index.html in your browser

# For Python simple server
python -m http.server 8000
# Then visit http://localhost:8000

# For Node.js http-server
npx http-server
```

### File Structure
```
docs/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## 🎨 Customization

### Adding New Categories
Edit the `CATEGORIES` array in `script.js`:
```javascript
const CATEGORIES = ['Rent', 'Food', 'Entertainment', 'Shopping', 'Bills', 'Other', 'Your Category'];
```

### Changing Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2a5298;
    --gradient-start: #1e3c72;
    --gradient-end: #2a5298;
}
```

### Adding Features
The code is modular and well-commented for easy extension:
- Add new tabs in HTML
- Create corresponding functions in JavaScript
- Style with CSS classes

## 📊 Data Format

The application stores data in localStorage with this structure:
```json
{
  "2024-08-01": [
    {
      "amount": 1227,
      "category": "Rent",
      "notes": "Monthly rent payment"
    }
  ]
}
```

## 🔒 Privacy & Security

- **No Server Required**: All data stays on your device
- **Local Storage**: Data persists between browser sessions
- **No Tracking**: No analytics or tracking scripts
- **Open Source**: Full transparency of code

## 🌟 Comparison with Original

| Feature | Original (Streamlit + FastAPI) | GitHub Pages Version |
|---------|--------------------------------|---------------------|
| **Hosting** | Requires server infrastructure | Static hosting (free) |
| **Database** | MySQL database required | Browser localStorage |
| **Backend** | FastAPI with Python | Pure JavaScript |
| **Frontend** | Streamlit framework | Custom HTML/CSS/JS |
| **Deployment** | Complex server setup | Simple file upload |
| **Scalability** | Supports multiple users | Single-user per browser |
| **Performance** | Server-dependent | Instant loading |

## 🚀 Deployment to GitHub Pages

### Automatic Deployment
1. Push code to `docs/` folder in main branch
2. Go to repository **Settings** → **Pages**
3. Select **Deploy from a branch**
4. Choose **main** branch and **docs** folder
5. Your site will be available at: `https://username.github.io/repository-name/`

### Manual Deployment
1. Create a new repository on GitHub
2. Upload the files from `docs/` folder
3. Enable GitHub Pages in repository settings
4. Access your live application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](../LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check browser console for errors
2. Ensure JavaScript is enabled
3. Try clearing localStorage and refreshing
4. Create an issue on GitHub with details

## ✨ Acknowledgments

- Original Streamlit/FastAPI version inspiration
- Modern web development best practices
- GitHub Pages hosting platform
- CSS Grid and Flexbox for responsive design

---

**Made with ❤️ for personal finance management**

🔗 **Live Application**: [https://nmohandgandhi.github.io/expense-tracker-project/](https://nmohandgandhi.github.io/expense-tracker-project/)
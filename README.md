# 📊 Expense Tracker Project

This repository contains two versions of an **Expense Management System**:

1. **[Original Full-Stack Version](./Expense_Tracking_System/)** - Python, FastAPI, Streamlit, and MySQL
2. **[GitHub Pages Static Version](./docs/)** - HTML, CSS, and JavaScript

## 🌐 Live Demo

**Access the live GitHub Pages application here:** [https://nmohandgandhi.github.io/expense-tracker-project/](https://nmohandgandhi.github.io/expense-tracker-project/)

![Expense Tracker Main Interface](https://github.com/user-attachments/assets/d7dd26e8-fc8d-4e10-ae51-b027e5426bc4)

## 🚀 GitHub Pages Deployment

The static version has been successfully deployed to GitHub Pages with the following features:

### ✨ Key Features
- **💰 Expense Management**: Add, update, and track daily expenses
- **📊 Analytics Dashboard**: Category and monthly expense breakdowns
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🔄 Data Management**: Export, import, and clear data functionality
- **🎨 Modern UI**: Professional design with smooth animations

![Analytics Dashboard](https://github.com/user-attachments/assets/7abc12e3-cfd4-4cbc-a87e-bd8b38c5addb)

### 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser LocalStorage API
- **Hosting**: GitHub Pages
- **Deployment**: GitHub Actions (automated)

## 📂 Project Structure

```
├── Expense_Tracking_System/          # Original Python/FastAPI version
│   ├── backend/                      # FastAPI server code
│   ├── frontend/                     # Streamlit application
│   ├── tests/                        # Test cases
│   └── requirements.txt              # Python dependencies
├── docs/                             # GitHub Pages static version
│   ├── index.html                    # Main application
│   ├── styles.css                    # Styling
│   ├── script.js                     # JavaScript functionality
│   └── README.md                     # Deployment documentation
├── .github/workflows/                # GitHub Actions
│   └── deploy-pages.yml              # Auto-deployment workflow
└── README.md                         # This file
```

## 🔄 Version Comparison

| Feature | Original Version | GitHub Pages Version |
|---------|------------------|----------------------|
| **Backend** | FastAPI + Python | Pure JavaScript |
| **Database** | MySQL | Browser LocalStorage |
| **Frontend** | Streamlit | Custom HTML/CSS/JS |
| **Hosting** | Server required | Static hosting (free) |
| **Multi-user** | ✅ Supported | ❌ Single-user per browser |
| **Deployment** | Complex setup | Simple file upload |
| **Performance** | Server-dependent | Instant loading |
| **Cost** | Server hosting required | Free on GitHub Pages |

## 🚀 Quick Start

### For GitHub Pages Version (Recommended for demos)
1. Visit: [https://nmohandgandhi.github.io/expense-tracker-project/](https://nmohandgandhi.github.io/expense-tracker-project/)
2. Click "Load sample data" when prompted
3. Start tracking your expenses!

### For Original Full-Stack Version
```bash
# Clone repository
git clone https://github.com/NMohanGandhi/expense-tracker-project.git
cd expense-tracker-project/Expense_Tracking_System

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn backend.server:app --reload

# In another terminal, start Streamlit
streamlit run frontend/app.py
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both versions if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Support

- **GitHub Pages Version Issues**: Check [docs/README.md](./docs/README.md)
- **Original Version Issues**: Check [Expense_Tracking_System/README.md](./Expense_Tracking_System/README.md)
- **General Issues**: Create an issue on GitHub

---

**🌟 Star this repository if you find it helpful!**

**Live Demo**: [https://nmohandgandhi.github.io/expense-tracker-project/](https://nmohandgandhi.github.io/expense-tracker-project/)
// Expense Management System - Client-side JavaScript
// Data storage key for localStorage
const STORAGE_KEY = 'expense_tracker_data';

// Categories for expenses
const CATEGORIES = ['Rent', 'Food', 'Entertainment', 'Shopping', 'Bills', 'Other'];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('expense-date').value = today;
    
    // Set default date range for analytics
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    document.getElementById('start-date').value = firstDayOfMonth;
    document.getElementById('end-date').value = today;
    
    // Load expenses for today
    loadExpensesForDate();
    
    // Add form submit handler
    document.getElementById('expense-form').addEventListener('submit', handleExpenseSubmit);
    
    // Add initial expense rows
    for (let i = 0; i < 5; i++) {
        addExpenseRow();
    }
}

// Tab Management
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Generate analytics if switching to analytics tabs
    if (tabName === 'analytics-monthly') {
        generateMonthlyAnalytics();
    }
}

// Local Storage Management
function getStoredData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

function setStoredData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getExpensesForDate(date) {
    const data = getStoredData();
    return data[date] || [];
}

function saveExpensesForDate(date, expenses) {
    const data = getStoredData();
    data[date] = expenses;
    setStoredData(data);
}

// Expense Row Management
function addExpenseRow(expense = null) {
    const container = document.getElementById('expense-rows');
    const rowIndex = container.children.length;
    
    const row = document.createElement('div');
    row.className = 'expense-row';
    row.innerHTML = `
        <input type="number" 
               name="amount_${rowIndex}" 
               placeholder="0.00" 
               step="0.01" 
               min="0"
               value="${expense ? expense.amount : ''}"
               onchange="updateDailyTotal()">
        
        <select name="category_${rowIndex}" onchange="updateDailyTotal()">
            ${CATEGORIES.map(cat => 
                `<option value="${cat}" ${expense && expense.category === cat ? 'selected' : ''}>${cat}</option>`
            ).join('')}
        </select>
        
        <input type="text" 
               name="notes_${rowIndex}" 
               placeholder="Add notes..." 
               value="${expense ? expense.notes : ''}">
        
        <button type="button" class="remove-btn" onclick="removeExpenseRow(this)">🗑️</button>
    `;
    
    container.appendChild(row);
    updateDailyTotal();
}

function removeExpenseRow(button) {
    button.closest('.expense-row').remove();
    updateDailyTotal();
}

function loadExpensesForDate() {
    const date = document.getElementById('expense-date').value;
    const expenses = getExpensesForDate(date);
    
    // Clear existing rows
    document.getElementById('expense-rows').innerHTML = '';
    
    // Add rows for existing expenses
    expenses.forEach(expense => addExpenseRow(expense));
    
    // Add empty rows to make total 5 rows
    const currentRows = document.getElementById('expense-rows').children.length;
    for (let i = currentRows; i < 5; i++) {
        addExpenseRow();
    }
    
    updateDailyTotal();
}

function updateDailyTotal() {
    const rows = document.querySelectorAll('.expense-row');
    let total = 0;
    
    rows.forEach(row => {
        const amountInput = row.querySelector('input[type="number"]');
        const amount = parseFloat(amountInput.value) || 0;
        total += amount;
    });
    
    document.getElementById('daily-total').textContent = total.toFixed(2);
}

// Form Submission
function handleExpenseSubmit(event) {
    event.preventDefault();
    
    const date = document.getElementById('expense-date').value;
    const rows = document.querySelectorAll('.expense-row');
    const expenses = [];
    
    rows.forEach(row => {
        const amount = parseFloat(row.querySelector('input[type="number"]').value) || 0;
        const category = row.querySelector('select').value;
        const notes = row.querySelector('input[type="text"]').value;
        
        if (amount > 0) {
            expenses.push({
                amount: amount,
                category: category,
                notes: notes
            });
        }
    });
    
    saveExpensesForDate(date, expenses);
    showNotification('✅ Expenses saved successfully!', 'success');
}

// Analytics Functions
function generateCategoryAnalytics() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    if (!startDate || !endDate) {
        showNotification('⚠️ Please select both start and end dates', 'warning');
        return;
    }
    
    const data = getStoredData();
    const categoryTotals = {};
    let grandTotal = 0;
    
    // Process expenses within date range
    Object.keys(data).forEach(date => {
        if (date >= startDate && date <= endDate) {
            data[date].forEach(expense => {
                if (!categoryTotals[expense.category]) {
                    categoryTotals[expense.category] = 0;
                }
                categoryTotals[expense.category] += expense.amount;
                grandTotal += expense.amount;
            });
        }
    });
    
    // Calculate percentages
    const categoryData = Object.keys(categoryTotals).map(category => ({
        category: category,
        total: categoryTotals[category],
        percentage: grandTotal > 0 ? (categoryTotals[category] / grandTotal) * 100 : 0
    }));
    
    // Sort by percentage (descending)
    categoryData.sort((a, b) => b.percentage - a.percentage);
    
    // Display results
    displayCategoryChart(categoryData);
    displayCategoryTable(categoryData);
}

function displayCategoryChart(data) {
    const chartContainer = document.getElementById('category-chart');
    
    if (data.length === 0) {
        chartContainer.innerHTML = '<p style="text-align: center; color: #666;">No data available for the selected date range.</p>';
        return;
    }
    
    const maxValue = Math.max(...data.map(item => item.percentage));
    
    chartContainer.innerHTML = `
        <div class="bar-chart">
            ${data.map(item => `
                <div class="bar" style="height: ${(item.percentage / maxValue) * 200}px;">
                    <div class="bar-value">${item.percentage.toFixed(1)}%</div>
                    <div class="bar-label">${item.category}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function displayCategoryTable(data) {
    const tableContainer = document.getElementById('category-table');
    
    if (data.length === 0) {
        tableContainer.innerHTML = '<p style="text-align: center; color: #666;">No data available for the selected date range.</p>';
        return;
    }
    
    tableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Total ($)</th>
                    <th>Percentage (%)</th>
                </tr>
            </thead>
            <tbody>
                ${data.map((item, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.category}</td>
                        <td>$${item.total.toFixed(2)}</td>
                        <td>${item.percentage.toFixed(2)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function generateMonthlyAnalytics() {
    const data = getStoredData();
    const monthlyTotals = {};
    
    // Process all expenses by month
    Object.keys(data).forEach(date => {
        const dateObj = new Date(date);
        const monthKey = `${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getFullYear()}`;
        
        if (!monthlyTotals[monthKey]) {
            monthlyTotals[monthKey] = 0;
        }
        
        data[date].forEach(expense => {
            monthlyTotals[monthKey] += expense.amount;
        });
    });
    
    // Convert to array and sort by date
    const monthlyData = Object.keys(monthlyTotals).map(month => ({
        month: month,
        total: monthlyTotals[month]
    })).sort((a, b) => {
        // Simple sort by year and month name
        return new Date(a.month) - new Date(b.month);
    });
    
    // Display results
    displayMonthlyChart(monthlyData);
    displayMonthlyTable(monthlyData);
}

function displayMonthlyChart(data) {
    const chartContainer = document.getElementById('monthly-chart');
    
    if (data.length === 0) {
        chartContainer.innerHTML = '<p style="text-align: center; color: #666;">No expense data available.</p>';
        return;
    }
    
    const maxValue = Math.max(...data.map(item => item.total));
    
    chartContainer.innerHTML = `
        <div class="bar-chart">
            ${data.map(item => `
                <div class="bar" style="height: ${(item.total / maxValue) * 200}px;">
                    <div class="bar-value">$${item.total.toFixed(0)}</div>
                    <div class="bar-label">${item.month}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function displayMonthlyTable(data) {
    const tableContainer = document.getElementById('monthly-table');
    
    if (data.length === 0) {
        tableContainer.innerHTML = '<p style="text-align: center; color: #666;">No expense data available.</p>';
        return;
    }
    
    tableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Month</th>
                    <th>Total ($)</th>
                </tr>
            </thead>
            <tbody>
                ${data.map((item, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.month}</td>
                        <td>$${item.total.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Data Management Functions
function exportData() {
    const data = getStoredData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `expense-tracker-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('📤 Data exported successfully!', 'success');
}

function importData() {
    document.getElementById('import-file').click();
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate data structure
            if (typeof importedData === 'object') {
                setStoredData(importedData);
                loadExpensesForDate(); // Refresh current view
                showNotification('📥 Data imported successfully!', 'success');
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            showNotification('❌ Failed to import data. Please check the file format.', 'error');
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

function clearAllData() {
    if (confirm('⚠️ Are you sure you want to delete all expense data? This action cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        loadExpensesForDate(); // Refresh current view
        
        // Clear analytics
        document.getElementById('category-chart').innerHTML = '';
        document.getElementById('category-table').innerHTML = '';
        document.getElementById('monthly-chart').innerHTML = '';
        document.getElementById('monthly-table').innerHTML = '';
        
        showNotification('🗑️ All data cleared successfully!', 'success');
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545',
        info: '#17a2b8'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add some sample data for demonstration
function addSampleData() {
    const sampleData = {
        '2024-08-01': [
            { amount: 1227, category: 'Rent', notes: 'Monthly rent payment' },
            { amount: 300, category: 'Food', notes: 'Groceries for the week' },
            { amount: 1200, category: 'Rent', notes: 'Monthly rent payment' },
            { amount: 300, category: 'Food', notes: 'Groceries for the week' }
        ],
        '2024-08-02': [
            { amount: 150, category: 'Entertainment', notes: 'Movie tickets' },
            { amount: 80, category: 'Food', notes: 'Dinner out' }
        ],
        '2024-08-03': [
            { amount: 500, category: 'Shopping', notes: 'Clothing' },
            { amount: 45, category: 'Other', notes: 'Gas' }
        ],
        '2024-09-01': [
            { amount: 1200, category: 'Rent', notes: 'Monthly rent payment' },
            { amount: 400, category: 'Food', notes: 'Monthly groceries' }
        ],
        '2024-09-15': [
            { amount: 200, category: 'Entertainment', notes: 'Concert tickets' },
            { amount: 150, category: 'Shopping', notes: 'Books' }
        ]
    };
    
    // Only add sample data if no data exists
    const existingData = getStoredData();
    if (Object.keys(existingData).length === 0) {
        setStoredData(sampleData);
        loadExpensesForDate();
        showNotification('📊 Sample data loaded for demonstration', 'info');
    }
}

// Load sample data if no data exists
setTimeout(() => {
    const existingData = getStoredData();
    if (Object.keys(existingData).length === 0) {
        if (confirm('Would you like to load some sample data to see how the application works?')) {
            addSampleData();
        }
    }
}, 1000);
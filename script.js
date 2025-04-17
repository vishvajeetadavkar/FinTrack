
const transactionList = document.getElementById('transactionList');
const totalSpentEl = document.getElementById('totalSpent');
const dateInput = document.getElementById('date');
const themeToggle = document.getElementById('themeToggle');
const monthlyBudgetInput = document.getElementById('monthlyBudget');
const budgetDisplay = document.getElementById('budgetDisplay');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let monthlyBudget = localStorage.getItem('monthlyBudget') || 0;

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme across all pages
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Run only on dashboard
  if (transactionList && totalSpentEl) {
    renderTransactions();
    displayTotal();
    updateBudgetDisplay();

    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.value = today;
    }
  }
});

function addTransaction() {
  const title = document.getElementById('title').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;

  if (title && amount && date) {
    transactions.push({ title, amount, date });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    displayTotal();
  }
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
  displayTotal();
}

function renderTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach((tx, index) => {
    const li = document.createElement('li');
    li.textContent = `${tx.date} - ${tx.title}: ₹${tx.amount}`;
    const btn = document.createElement('button');
    btn.textContent = "❌";
    btn.onclick = () => removeTransaction(index);
    li.appendChild(btn);
    transactionList.appendChild(li);
  });
}

function displayTotal() {
  const total = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  totalSpentEl.textContent = total.toFixed(2);
}

function setBudget() {
  monthlyBudget = parseFloat(monthlyBudgetInput.value);
  localStorage.setItem('monthlyBudget', monthlyBudget);
  updateBudgetDisplay();
}

function updateBudgetDisplay() {
  if (budgetDisplay) {
    budgetDisplay.textContent = `You have ₹${monthlyBudget} set as your monthly budget.`;
  }
}

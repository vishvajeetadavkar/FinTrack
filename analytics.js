const pieCtx = document.getElementById('pieChart').getContext('2d');
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const monthSelect = document.getElementById('monthSelect');

const months = [...new Set(transactions.map(tx => tx.date.split('-')[1]))];
months.sort((a, b) => parseInt(a) - parseInt(b));

months.forEach(month => {
  const option = document.createElement('option');
  option.value = month;
  option.textContent = new Date(2000, month - 1).toLocaleString('default', { month: 'long' });
  monthSelect.appendChild(option);
});

let pieChart;

function updatePieChart() {
  const selectedMonth = monthSelect.value;
  const filtered = transactions.filter(tx => tx.date.split('-')[1] === selectedMonth);

  const categoryMap = {};
  filtered.forEach(tx => {
    categoryMap[tx.title] = (categoryMap[tx.title] || 0) + parseFloat(tx.amount);
  });

  const labels = Object.keys(categoryMap);
  const data = Object.values(categoryMap);

  if (pieChart) pieChart.destroy();

  pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: "Expenses",
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: 'Monthly Expense Distribution'
        }
      }
    }
  });
}

monthSelect.addEventListener('change', updatePieChart);
updatePieChart();

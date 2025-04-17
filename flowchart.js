const barCtx = document.getElementById('barChart').getContext('2d');
const flowTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

const monthTotals = {};

flowTransactions.forEach(tx => {
  const month = tx.date.split('-')[1];
  monthTotals[month] = (monthTotals[month] || 0) + parseFloat(tx.amount);
});

const monthLabels = Object.keys(monthTotals).map(m => new Date(2000, m - 1).toLocaleString('default', { month: 'long' }));
const monthData = Object.values(monthTotals);

new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: monthLabels,
    datasets: [{
      label: 'Monthly Spending',
      data: monthData,
      backgroundColor: '#42A5F5'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Spending Per Month'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `₹${value}`
        }
      }
    }
  }
});

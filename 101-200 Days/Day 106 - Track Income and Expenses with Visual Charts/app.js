document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');
    const expenseList = document.getElementById('expense-list');
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpensesEl = document.getElementById('total-expenses');
    const balanceEl = document.getElementById('balance');
    const expenseChartCtx = document.getElementById('expense-chart').getContext('2d');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    let chart;

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.className = expense.type;
            li.innerHTML = `
                <span>${expense.description} (${expense.type})</span>
                <span>$${expense.amount}</span>
                <button data-index="${index}">&times;</button>
            `;
            expenseList.appendChild(li);
        });
    }

    function updateSummary() {
        const income = expenses
            .filter(exp => exp.type === 'income')
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        const expensesTotal = expenses
            .filter(exp => exp.type === 'expense')
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        const balance = income - expensesTotal;

        totalIncomeEl.textContent = income.toFixed(2);
        totalExpensesEl.textContent = expensesTotal.toFixed(2);
        balanceEl.textContent = balance.toFixed(2);
    }

    function updateChart() {
        const income = expenses
            .filter(exp => exp.type === 'income')
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        const expensesTotal = expenses
            .filter(exp => exp.type === 'expense')
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(expenseChartCtx, {
            type: 'pie',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    data: [income, expensesTotal],
                    backgroundColor: ['#28a745', '#dc3545']
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());
        const type = typeSelect.value;

        if (description && !isNaN(amount)) {
            expenses.push({ description, amount, type });
            saveExpenses();
            renderExpenses();
            updateSummary();
            updateChart();
            expenseForm.reset();
        }
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.getAttribute('data-index');
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
            updateSummary();
            updateChart();
        }
    });

    // Initial Render
    renderExpenses();
    updateSummary();
    updateChart();
});

document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habit-form');
    const habitInput = document.getElementById('habit-input');
    const habitList = document.getElementById('habit-list');
    const habitChartCtx = document.getElementById('habit-chart').getContext('2d');

    let habits = JSON.parse(localStorage.getItem('habits')) || [];
    let today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    function renderHabits() {
        habitList.innerHTML = '';
        habits.forEach((habit, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${habit.name}</span>
                <div>
                    <button class="complete" data-index="${index}">${habit.completions[today] ? '✔️' : '⭕'}</button>
                    <button class="delete" data-index="${index}">🗑️</button>
                </div>
            `;
            habitList.appendChild(li);
        });
    }

    function addHabit(name) {
        habits.push({ name, completions: { [today]: false } });
        saveHabits();
        renderHabits();
        updateChart();
    }

    function deleteHabit(index) {
        habits.splice(index, 1);
        saveHabits();
        renderHabits();
        updateChart();
    }

    function toggleCompletion(index) {
        const habit = habits[index];
        habit.completions[today] = !habit.completions[today];
        saveHabits();
        renderHabits();
        updateChart();
    }

    function saveHabits() {
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    habitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = habitInput.value.trim();
        if (name !== '') {
            addHabit(name);
            habitForm.reset();
        }
    });

    habitList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.getAttribute('data-index');
            if (e.target.classList.contains('delete')) {
                deleteHabit(index);
            } else if (e.target.classList.contains('complete')) {
                toggleCompletion(index);
            }
        }
    });

    // Initialize Chart
    let chart;
    function updateChart() {
        const labels = habits.map(habit => habit.name);
        const data = habits.map(habit => habit.completions[today] ? 1 : 0);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(habitChartCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Today\'s Completion',
                    data: data,
                    backgroundColor: '#007bff'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        });
    }

    // Daily Reset (Optional)
    function resetDailyCompletions() {
        habits.forEach(habit => {
            habit.completions = { [today]: false };
        });
        saveHabits();
        renderHabits();
        updateChart();
    }

    // Initialize
    renderHabits();
    updateChart();

    // Uncomment the line below to reset completions every day (requires server-side scheduling)
    // resetDailyCompletions();
});

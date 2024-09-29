document.addEventListener('DOMContentLoaded', () => {
    // Function to format numbers as currency
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    // Update budgets based on total budget input
    function updateBudgets() {
        const totalBudget = parseFloat(document.getElementById('total-budget').value) || 0;
        const budget1 = (totalBudget * 0.2542).toFixed(2); // 25.42% of total
        const budget2 = (totalBudget * 0.0847).toFixed(2); // 8.47% of total
        const budget3 = (totalBudget * 0.2542).toFixed(2); // 25.42% of total
        const budget4 = (totalBudget * 0.4069).toFixed(2); // 40.69% of total

        document.getElementById('budget1').textContent = formatCurrency(budget1);
        document.getElementById('budget2').textContent = formatCurrency(budget2);
        document.getElementById('budget3').textContent = formatCurrency(budget3);
        document.getElementById('budget4').textContent = formatCurrency(budget4);
    }

    function toggleDetails(id) {
        const row = document.getElementById(id);
        const allRows = document.querySelectorAll('.expandable-row');
        allRows.forEach((r) => {
            if (r.id !== id) r.style.display = 'none';
        });
        row.style.display = row.style.display === 'table-row' ? 'none' : 'table-row';
        const allClickable = document.querySelectorAll('.clickable');
        allClickable.forEach((c) => c.classList.remove('selected'));
        if (row.style.display === 'table-row') {
            row.previousElementSibling.classList.add('selected');
        }
    }

    function updateProgress(progressId, checklistId, miniProgressId) {
        const checklist = document.getElementById(checklistId);
        const tasks = checklist.querySelectorAll('input[type="checkbox"]');
        const completedTasks = Array.from(tasks).filter(task => task.checked).length;
        const progressBar = document.getElementById(progressId).querySelector('.progress-bar');
        const miniProgressBar = document.getElementById(miniProgressId);
        const progressPercent = (completedTasks / tasks.length) * 100;
        progressBar.style.width = progressPercent + '%';
        miniProgressBar.style.width = progressPercent + '%';
        updateMainProgress();
    }

    function updateMainProgress() {
        const allMiniBars = document.querySelectorAll('.progress-bar');
        let totalProgress = 0;
        let count = 0;
        allMiniBars.forEach(bar => {
            if (bar.id.startsWith('mini-progress')) {
                totalProgress += parseFloat(bar.style.width);
                count++;
            }
        });
        const mainProgress = document.getElementById('main-progress-bar');
        const mainProgressPercent = totalProgress / count;
        mainProgress.style.width = mainProgressPercent + '%';
    }

    // Initialize tooltips for icons
    tippy('.tooltip-icon', {
        content: 'More information',
        placement: 'top',
        arrow: true,
    });

    // Initial budget update
    updateBudgets();
});

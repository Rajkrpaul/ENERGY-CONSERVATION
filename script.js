document.addEventListener('DOMContentLoaded', () => {
    // Animate statistics
    const statistics = document.querySelectorAll('.statistic');
    statistics.forEach(statistic => {
        const value = statistic.querySelector('.value');
        const targetValue = parseInt(statistic.dataset.value);
        animateValue(value, 0, targetValue, 2000);
    });

    // Create flowchart
    const ctx = document.getElementById('impactChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Energy Conservation', 'Green Energy', 'Renewable Energy'],
            datasets: [{
                label: 'IT Impact (%)',
                data: [75, 85, 90],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
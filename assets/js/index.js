// Ensure all buttons with the quiz categories have the event listener attached
document.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        const username = document.getElementById('username').value;

        if (!username) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please enter your name to start the quiz.',
                customClass: {
                    popup: 'swal-popup',
                    title: 'swal-title',
                    content: 'swal-content',
                    confirmButton: 'swal-confirm-btn',
                }
            });
            return;
        }

        localStorage.setItem('quizUsername', username);
        localStorage.setItem('quizCategory', category);
        window.location.href = 'quiz.html';
    });
});

// Remove spaces from username input
document.getElementById('username').addEventListener('input', function (e) {
    this.value = this.value.replace(/\s/g, ''); // Remove any spaces
});

// Load high scores when the page loads
window.onload = function () {
    document.getElementById('english-highscore').textContent = localStorage.getItem('English Football Highscore') || 0;
    document.getElementById('english-highscore-name').textContent = localStorage.getItem('English Football HighscoreName') || 'N/A';

    document.getElementById('spanish-highscore').textContent = localStorage.getItem('Spanish Football Highscore') || 0;
    document.getElementById('spanish-highscore-name').textContent = localStorage.getItem('Spanish Football HighscoreName') || 'N/A';

    document.getElementById('italian-highscore').textContent = localStorage.getItem('Italian Football Highscore') || 0;
    document.getElementById('italian-highscore-name').textContent = localStorage.getItem('Italian Football HighscoreName') || 'N/A';

    document.getElementById('continental-highscore').textContent = localStorage.getItem('Continental Football Highscore') || 0;
    document.getElementById('continental-highscore-name').textContent = localStorage.getItem('Continental Football HighscoreName') || 'N/A';
};

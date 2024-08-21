function startQuiz(category) {
    const username = document.getElementById('username').value;
    if (!username) {
        // Replace the alert with SweetAlert2
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
    // Store username in localStorage
    localStorage.setItem('quizUsername', username);
    // Store category in localStorage
    localStorage.setItem('quizCategory', category);
    // Redirect to quiz page
    window.location.href = 'quiz.html';
}


//Function to load high scores when the page loads

function loadHighScores() {
    document.getElementById('english-highscore').textContent = localStorage.getItem(
        'English Football Highscore') || 0;
    document.getElementById('english-highscore-name').textContent = localStorage.getItem(
        'English Football HighscoreName') || 'N/A';

    document.getElementById('spanish-highscore').textContent = localStorage.getItem(
        'Spanish Football Highscore') || 0;
    document.getElementById('spanish-highscore-name').textContent = localStorage.getItem(
        'Spanish Football HighscoreName') || 'N/A';

    document.getElementById('italian-highscore').textContent = localStorage.getItem(
        'Italian Football Highscore') || 0;
    document.getElementById('italian-highscore-name').textContent = localStorage.getItem(
        'Italian Football HighscoreName') || 'N/A';

    document.getElementById('continental-highscore').textContent = localStorage.getItem(
        'Continental Football Highscore') || 0;
    document.getElementById('continental-highscore-name').textContent = localStorage.getItem(
        'Continental Football HighscoreName') || 'N/A';
}

document.getElementById('username').addEventListener('input', function (e) {
    this.value = this.value.replace(/\s/g, ''); // Remove any spaces
});

// Load high scores when the page loads
window.onload = loadHighScores;
// Global Variables for quiz


/**
 * Function to start the quiz from index.html 
 */
function startQuiz(category) {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter your name to start the quiz.');
        return;
    }
    localStorage.setItem('quizUsername', username); // Store username in localStorage
    localStorage.setItem('quizCategory', category); // Store category in localStorage
    window.location.href = 'quiz.html'; // Redirect to quiz page
}

/**
 * Function to load questions and start the quix in quiz.html
 */
function loadQuestions() {

}

/**
 * Function to load next question
 */
function loadNextQuestion() {

}

/**
 * Function to check the user's answer and update the score
 */
function checkAnswer() {

}

/**
 * Function to end the quiz and display the final score
 */
function endQuiz() {

}

/**
 * Function to start the quiz timer
 */
function startTimer() {

}

/**
 * Function to display the remaining time
 */
function displayTimer() {

}

/**
 * Function to return to the main menu from quiz.html
 */
function returnToMainMenu() {

}
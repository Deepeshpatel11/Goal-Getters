// Global Variables for quiz
let questions = []; // Will hold the quiz questions
let currentQuestionIndex = 0; // Tracks the current question number
let score = 0; // Tracks the user's score
let timeLeft = 15 * 60; // 15 minutes in seconds
let timerInterval; // Will hold the timer interval ID

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
    const category = localStorage.getItem('quizCategory');
    const username = localStorage.getItem('quizUsername');
    document.getElementById('category-title').textContent = `${category} - Player: ${username}`;


    fetch('assets/data/questions.json')
        .then(response => response.json())
        .then(data => {
            const selectedCategory = data.find(q => q.category === category);
            if (selectedCategory) {
                questions = selectedCategory.questions;
                loadNextQuestion(); // Load the first question initially
                startTimer(); // Start the quiz timer
            }
        })
        .catch(error => {
            console.error('Error loading questions:', error);
            window.location.href = '404.html'; // Redirect to the 404 page if there's an error loading questions
        });
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
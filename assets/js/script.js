// Global Variables for quiz
let questions = []; // Will hold the quiz questions
let currentQuestionIndex = 0; // Tracks the current question number
let score = 0; // Tracks the user's score
let timeLeft = 3 * 60; // 15 minutes in seconds
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
 * Function to load questions and start the quiz in quiz.html
 */
function loadQuestions() {
    const category = localStorage.getItem('quizCategory');
    const username = localStorage.getItem('quizUsername');
    document.getElementById('category-title').textContent = `${category} - Player: ${username}`;

    applyTheme(category); // Apply the corresponding theme

    fetch('assets/data/questions.json')
        .then(response => response.json())
        .then(data => {
            const selectedCategory = data.find(q => q.category === category);
            if (selectedCategory) {
                questions = shuffleArray(selectedCategory.questions); // Shuffle the questions
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
 * Function to apply the theme based on the quiz category
 */
function applyTheme(category) {
    const body = document.body;
    console.log("Applying theme for category:", category); // Debugging line

    // Clear any existing theme classes
    body.classList.remove('theme-english', 'theme-spanish', 'theme-italian', 'theme-continental');

    // Apply the appropriate theme class
    if (category === 'English Football') {
        body.classList.add('theme-english');
    } else if (category === 'Spanish Football') {
        body.classList.add('theme-spanish');
    } else if (category === 'Italian Football') {
        body.classList.add('theme-italian');
    } else if (category === 'Continental Football') {
        body.classList.add('theme-continental');
    }
}

/**
 * Function to load next question
 */
function loadNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        document.getElementById('question-text').textContent = questionData.question;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = ''; // Clear previous options

        // Shuffle options before displaying them
        const shuffledOptions = shuffleArray(questionData.options);
        
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option === questionData.answer);
            optionsContainer.appendChild(button);
        });

        currentQuestionIndex++;
    } else {
        endQuiz(); // End the quiz if no more questions are left
    }
}

/**
 * Function to check the user's answer and update the score
 */
function checkAnswer(isCorrect) {
    if (isCorrect) {
        score++;
    }
    document.getElementById('score').textContent = score;
    loadNextQuestion();
}

/**
 * Function to end the quiz and display the final score
 */
function endQuiz() {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('final-score').textContent = score;

    // Save the high score to localStorage
    const category = localStorage.getItem('quizCategory');
    const username = localStorage.getItem('quizUsername');
    const highScoreKey = `${category} Highscore`;
    const highScoreNameKey = `${category} HighscoreName`;
    const highScore = parseInt(localStorage.getItem(highScoreKey)) || 0;

    if (score > highScore) {
        localStorage.setItem(highScoreKey, score);
        localStorage.setItem(highScoreNameKey, username);
    }
}

/**
 * Function to quit the quiz and return to the main menu
 */
function quitGame() {
    if (confirm("Are you sure you want to quit the game?")) {
        clearInterval(timerInterval);
        returnToMainMenu();
    }
}

/**
 * Function to start the quiz timer
 */
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        displayTime();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz(); // End the quiz when time runs out
        }
    }, 1000); // Update every second
}

/**
 * Function to display the remaining time
 */
function displayTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

/**
 * Function to return to the main menu from quiz.html
 */
function returnToMainMenu() {
    window.location.href = 'index.html';
}

/**
 * Utility function to shuffle an array
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/** 
 * Initialize the quiz on page load
 */
window.onload = loadQuestions;

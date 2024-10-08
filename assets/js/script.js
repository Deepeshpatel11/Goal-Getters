// Global Variables for quiz
let questions = []; // Will hold the quiz questions
let score = 0; // Tracks the user's score
let timeLeft = 3 * 60; // 3 minutes in seconds
let timerInterval; // Will hold the timer interval ID
let answeredQuestions = []; // Will store the user's answers and correct answers

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
            if (selectedCategory && selectedCategory.questions.length) {
                questions = shuffleArray(selectedCategory.questions); // Shuffle the questions initially
                loadNextQuestion(); // Load the first question initially
                startTimer(); // Start the quiz timer
            } else {
                console.error('No questions found for the selected category.');
                window.location.href = '404.html'; // Redirect to the 404 page if no questions are found
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
    const themes = ['theme-english', 'theme-spanish', 'theme-italian', 'theme-continental'];
    body.classList.remove(...themes);

    const themeMap = {
        'English Football': 'theme-english',
        'Spanish Football': 'theme-spanish',
        'Italian Football': 'theme-italian',
        'Continental Football': 'theme-continental'
    };

    body.classList.add(themeMap[category] || '');
}

/**
 * Function to load the next question
 */
function loadNextQuestion() {
    if (questions.length > 0) { // Check if there are questions left
        const randomIndex = Math.floor(Math.random() * questions.length);
        const questionData = questions.splice(randomIndex, 1)[0]; // Remove and get a random question

        document.getElementById('question-text').textContent = questionData.question;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = ''; // Clear previous options

        // Shuffle options before displaying them
        const shuffledOptions = shuffleArray(questionData.options);

        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = (event) => checkAnswer(event, option, questionData.answer, questionData.question);
            optionsContainer.appendChild(button);
        });
    } else {
        endQuiz(); // End the quiz if no more questions are left
    }
}

/**
 * Function to check the user's answer, provide feedback, and store the result
 */
function checkAnswer(event, selectedOption, correctAnswer, questionText) {
    const isCorrect = selectedOption === correctAnswer;

    // Store the user's answer and the correct answer
    answeredQuestions.push({
        question: questionText,
        selectedAnswer: selectedOption,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
    });

    if (isCorrect) {
        score++;
        event.target.style.backgroundColor = "green"; // Correct answer feedback
    } else {
        event.target.style.backgroundColor = "grey"; // Incorrect answer feedback
    }
    document.getElementById('score').textContent = score;

    // Disable all buttons to prevent multiple clicks during feedback delay
    const buttons = document.querySelectorAll('#options-container button');
    buttons.forEach(btn => btn.disabled = true);

    // Delay before loading the next question to show feedback
    setTimeout(loadNextQuestion, 1000);
}

/**
 * Function to end the quiz and display the final score and summary
 */
function endQuiz() {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('final-score').textContent = score;

    // Display the summary of questions answered
    const summaryContainer = document.getElementById('summary-container');
    summaryContainer.innerHTML = ''; // Clear previous summary if any

    answeredQuestions.forEach((item, index) => {
        const questionSummary = document.createElement('div');
        questionSummary.className = 'question-summary';
        questionSummary.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${item.question}</p>
            <p><strong>Your Answer:</strong> ${item.selectedAnswer}</p>
            <p><strong>Correct Answer:</strong> ${item.correctAnswer}</p>
            <p style="color: ${item.isCorrect ? 'green' : 'red'};">${item.isCorrect ? 'Correct' : 'Incorrect'}</p>
            <hr>
        `;
        summaryContainer.appendChild(questionSummary);
    });

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
document.getElementById('quit-btn').addEventListener('click', function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to quit the game?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, quit!',
        cancelButtonText: 'No, continue',
        customClass: {
            popup: 'swal-popup',
            title: 'swal-title',
            content: 'swal-content',
            confirmButton: 'swal-confirm-btn',
            cancelButton: 'swal-cancel-btn'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            clearInterval(timerInterval);
            window.location.href = 'index.html';
        }
    });
});

/**
 * Event listener to return to the main menu from quiz.html
 */
document.getElementById('return-main-btn').addEventListener('click', function () {
    window.location.href = 'index.html';
});

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

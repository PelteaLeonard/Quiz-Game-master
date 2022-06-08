const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const playBtn = document.getElementById('play-btn');
const scoresBtn = document.getElementById('scores-btn');
const nextBtn = document.getElementById('next-btn');
const homeBtn = document.getElementById('home-btn');
const scoresHomeBtn = document.getElementById('scores-home-btn');
const resultsHomeBtn = document.getElementById('results-home-btn');
const homeSection = document.getElementById('home');
const quizSection = document.getElementById('quiz');
const resultsSection = document.getElementById('results');
const scoresSection = document.getElementById('scores');
const highScores = [];
const scoresContainer = document.querySelector('#scores div')
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarrFull = document.querySelector('#progressBarrFull');
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const highScoresList = document.querySelector('#highScoresList');

const showHome = () => {
    homeSection.classList.remove('hidden');
    quizSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    scoresSection.classList.add('hidden');
};

const showQuiz = () => {
    quizSection.classList.remove('hidden');
    homeSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    scoresSection.classList.add('hidden');
};

const showResults = () => {
    finalScore.innerText = score;
    resultsSection.classList.remove('hidden');
    homeSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    scoresSection.classList.add('hidden');
};

const showScores = () => {
    scoresSection.classList.remove('hidden');
    homeSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
};

playBtn.addEventListener('click', () =>{
    showQuiz();
    startGame();
});
scoresBtn.addEventListener('click', showScores);
nextBtn.addEventListener('click', showResults);
homeBtn.addEventListener('click', showHome);
scoresHomeBtn.addEventListener('click', showHome);
resultsHomeBtn.addEventListener('click', showHome);

const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    overlay.classList.add('active');
};

const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
};


openModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

overlay .addEventListener('click', () =>{
    const modals = document.querySelectorAll('.modal.active');
    modals. forEach(modal =>{
        closeModal(modal);

    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});


let currentQuestion ={};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const questions = [
    {
        question: 'Which is the capital of Germany?',
            choice1: 'Berlin', 
            choice2: 'Paris', 
            choice3: 'Stuttgart', 
            choice4: 'Leipzig', 
            answer: 1,
    },
    {
        question: 'Which is the capital of Romania?', 
            choice1: 'Braila',
            choice2: 'Bucharest', 
            choice3: 'Iasi', 
            choice4: 'Constanta',
            answer: 2,
        
    },
    {
        question: 'Which is the capital of France?',
            choice1: 'Toulouse', 
            choice2: 'Lyon', 
            choice3: 'Bordeaux', 
            choice4: 'Paris',
            answer: 4,
    },
    {
        question: 'Which is the capital of United Kingdom?', 
            choice1: 'Manchester',
            choice2: 'Liverpool', 
            choice3: 'London', 
            choice4: 'Brighton',
            answer: 3,
    },
    {
        question: 'Which is the capital of Norway?', 
            choice1: 'Oslo', 
            choice2: 'Trondheim', 
            choice3: 'Stavanger', 
            choice4: 'Bergen',
            answer: 1,

    },
    {
        question: 'Which is the capital of Albania?', 
            choice1: 'Elbasan',
            choice2: 'Vlora', 
            choice3: 'Tirana', 
            choice4: 'Durrës', 
            answer: 3,
    },
    {
        question: 'Which is the capital of Denmark?',
            choice1: 'Aalborg', 
            choice2: 'Copenhagen',
            choice3: 'Odense', 
            choice4: 'Aarhus', 
            answer: 2,
    },
    {
        question: 'Which is the capital of Bulgaria?',
            choice1: 'Sofia', 
            choice2: 'Plovdiv',
            choice3: 'Varna',
            choice4: 'Ruse',
            answer: 1,
    },
    {
        question: 'Which is the capital of Russia?',
            choice1: 'Kazan',
            choice2: 'Vladivostok',
            choice3: 'Saint Petersburg',
            choice4: 'Moscow',
            answer: 4,
    },
    {
        question: 'Which is the capital of Poland?',
            choice1: 'Krakow',
            choice2: 'Warsaw',
            choice3: 'Poznan', 
            choice4: 'Gdansk', 
            answer: 2,
    },
    {
        question: 'Which is the capital of Hungary?',
            choice1: 'Debrecen', 
            choice2: 'Budapest', 
            choice3: 'Miskolc', 
            choice4: 'Szeged',
            answer: 2,
    },
    {
        question: 'Which is the capital of Turkey?',
            choice1: 'Istanbul', 
            choice2: 'Antalya',
            choice3: 'Izmir', 
            choice4: 'Ankara', 
            answer:4,
    },
    {
        question: 'Which is the capital of Switzerland?',
            choice1: 'Bern', 
            choice2: 'Basel', 
            choice3: 'Geneva', 
            choice4: 'Lucerne', 
            answer: 1,
    },
    {
        question: 'Which is the capital of Ukraine?',
            choice1: 'Odesa',
            choice2: 'Dnipro',
            choice3: 'Kyiv', 
            choice4: 'Lviv', 
            answer: 3,
    },
    {
        question: 'Which is the capital of Spain?', 
            choice1: 'Alicante', 
            choice2: 'Madrid', 
            choice3: 'Barcelona', 
            choice4: 'Valencia', 
            answer: 2,
    },
    {
        question: 'Which is the capital of Portugal?',
            choice1: 'Lisbon', 
            choice2: 'Porto', 
            choice3: 'Braga',
            choice4: 'Amadora', 
            answer: 1,
    },
    {
        question: 'Which is the capital of Italy?',
            choice1: 'Milan',
            choice2: 'Naples', 
            choice3: 'Rome', 
            choice4: 'Genoa',
            answer: 3,
    },
    {
        question: 'Which is the capital of Netherlands?', 
            choice1: 'Rotterdam', 
            choice2: 'Amsterdam', 
            choice3: 'Berlin', 
            choice4: 'Utrecht',
            answer: 2,
    },
    {
        question: 'Which is the capital of Ireland?',
            choice1: 'Cork', 
            choice2: 'Galway', 
            choice3: 'Limerick', 
            choice4: 'Dublin', 
            answer: 4,
    },
    {
        question: 'Which is the capital of Greece?',
            choice1: 'Athens',
            choice2: 'Thessaloniki', 
            choice3: 'Piraeus',
            choice4: 'Patra',
            answer: 1,
    }
]



const SCORE_POINTS = 100;
const MAX_QUESTIONS = 20;

const startGame =() => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    scoreText.innerText = score;
    finalscore.innerText = score;
    getNewQuestion();
};


const getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        return showResults();
    };

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarrFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        };

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
           getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};



const MAX_HIGH_SCORES = 5;

username.addEventListener('keyup', () =>{
    saveScoreBtn.disabled = !username.value;
});

const submitScores = () => {
    if(!saveScoreBtn.disabled){
        const userScore = {
            score : score,
            name: username.value
        };
        highScores.push(userScore);
        highScores.sort((a,b) =>{
            return b.score - a.score;
        });
        highScores.splice(5);
        let highScoresListData = '';
        highScores.forEach(highScore => {
            const listItem = `<li>${highScore.name}: ${highScore.score}</li>`;
            highScoresListData = highScoresListData + listItem;
        });
        highScoresList.innerHTML = highScoresListData;
        showHome();
    }
}

saveScoreBtn.addEventListener('click', submitScores);
    







const questions = [
    {
        question : "Inside which HTML element do we put JavaScript?",
        answers : [
                { text: "script", correct: true},
                { text: "javascript", correct: false},
                { text: "scripting", correct: false},
                { text: "js", correct: false},
        ]
    },
    {
        question : "Which one is loop structure in JavaScript?",
        answers : [
                { text: "const", correct: false},
                { text: "interval", correct: false},
                { text: "for", correct: true},
                { text: "JSON", correct: false},
        ]
    },
    {
        question : "Which one is a function?",
        answers: [
                { text: "let", correct: false},
                { text: "function", correct: true},
                { text: "=>", correct: false},
                { text: "f", correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let counter = 0;
let score = 0;

function startQuiz(){
    counter = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
};

function showQuestion(){
    resetQuestions();
    let currentQuestion = questions[counter];
    let questionNo = counter + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){ 
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};


function selectAnswer(e){
    const selectedBtn = e.target;
    if(selectedBtn.dataset.correct === "true"){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(x =>{
        if(x.dataset.correct === "true"){
            x.classList.add("correct");
        }
        x.disabled = true;
    })
    nextButton.style.display = "block"
}

function showScore(){
    resetQuestions();
    questionElement.innerHTML = `Your Score is : ${score}`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block"
}

function nextQuestion(){
    counter++
    if(counter < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(counter < questions.length){
        nextQuestion();
    }
    else{
        startQuiz();
    }
})

function resetQuestions(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

startQuiz();

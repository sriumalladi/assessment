let xmlhttp = new XMLHttpRequest();
let myObj;
let levels;
let totalQuestions;
let y;
let z;
let level1;
let level2;
let level3;
let level1Questions;
let level2Questions;
let level3Questions;
let attrId;
let qPath;
let qType;
let inputType;
let isCorrect;
let options;
let optionList = '';
let score = 0;
let points = 10;
let correct = 0;
let questionCount = -1;
let displayQuestions;
let passPercent;
let totalScore;
let percent = 0;
let canvas = document.querySelector("canvas");
let qnum = [];


xmlhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        levels = Object.keys(myObj).length;
        totalQuestions = myObj.Level1.Question.length; // Total Questions
        level1 = document.getElementById('questionDisplay');
        level1Opt = document.getElementById('optionsDisplay');
        displayQuestions = myObj.Level1.DisplayQuestions;
        totalScore = displayQuestions * 10;
        passPercent = myObj.Level1.PassingThreshold;
        level1Questions = myObj.Level1;
        level1.innerHTML = '';
        level1Opt.innerHTML = '';
        // console.log(displayQuestions);
        for (let i = 0; i < totalQuestions; i++) {
            qnum.push([i])
        }
    }
};

xmlhttp.open("GET", "scripts/assessment.json", true);
xmlhttp.send();

//Randomize
const randomBtn = document.getElementById("randomQuetions");


let myNum = 1;
let visitedQue = [];

// $("#randomQuetions").click(function () {

//     myNum++;
//     let viewQuestion = Math.floor(Math.random() * qnum.length)
//     //console.log(viewQuestion, qnum.length)
//     let newQ = qnum.splice(viewQuestion, 1);

//     visitedQue.push(myNum);

//     if (visitedQue.length <= totalQuestions) {
//         console.log(newQ.toString(), visitedQue.length, totalQuestions, myNum);
//         questionCount = newQ.toString();
//         updateQuestions(questionCount)
//     }

// })

async function showQuestions() {
    myNum++;
    let viewQuestion = Math.floor(Math.random() * qnum.length)
    let newQ = qnum.splice(viewQuestion, 1);
    visitedQue.push(myNum);
    questionCount = newQ.toString();
    console.log(questionCount)
    if (visitedQue.length <= totalQuestions) {
        //console.log(newQ.toString(), visitedQue.length, totalQuestions, myNum);

        await setTimeout(() => {
            questionSlide.classList.remove("fadeIn");
            questionSlide.classList.add("fadeOut");
        }, 500);

        await setTimeout(() => {
            mask.style.display = "flex"
            questionSlide.classList.remove("fadeOut");
            questionSlide.classList.add("fadeIn");
            updateQuestions(questionCount);
        }, 1000);

        $("#sumbitBtn").css("display", "flex");
        $("#nextBtn").css("display", "flex");
        $("#closeBtn2").css("display", "none");
    } else {
        console.log("Finish");
        finishAssessment()
    }
}

function finishAssessment() {
    console.log(percent, passPercent)
    if (percent >= passPercent) {
        $("#sumbitBtn").css("display", "none");
        $("#nextBtn").css("display", "none");
        $("#closeBtn2").css("display", "flex");
        level1.innerHTML = '';
        level1Opt.innerHTML = `<h2>Congratulations <br/> You have Passed the Assessment.</h2><br/><br/> <h3>Your Score</h3> <br/> Score: ${score}<br/>Correct: ${correct}`;
        //mask.style.display = "flex"
    } else {
        $("#sumbitBtn").css("display", "none");
        $("#nextBtn").css("display", "none");
        $("#closeBtn2").css("display", "flex");
        level1.innerHTML = '';
        level1Opt.innerHTML = `<h2>You have Failed the Assessment.</h2><br/><br/> <h3>Your Score</h3> <br/> Score: ${score}<br/>Correct Answers: ${correct} `;
        //mask.style.display = "flex"
    }
}



var updateQuestions = function (questionCount) {
    level1Opt.innerHTML = ''
    //console.log(myObj.Level1.Question[questionCount].Option)
    options = myObj.Level1.Question[questionCount].Option.length;
    optionList = myObj.Level1.Question[questionCount].Option;
    level1.innerHTML = level1Questions.Question[questionCount].Text;
    qType = myObj.Level1.Question[questionCount].Type;
    let domEl = '';
    let dnd1 = '';
    let dnd2 = '';
    let dnd3 = '';
    dnd1 = "<div class='dnd_left'><h4>Country</h4><ul>";
    dnd2 = "</ul></div><div class='dnd_right'><h4>Country Flag</h4><ul id='dragMe'>";
    dnd3 = "</ul></div>";

    for (var j = 0; j < options; j++) {
        if (qType === "SINGLE_SELECT") {
            domEl += "<div class='options'><input type='radio' name='answers' id='option" + j + "' class='radio' /><label for='option" + j + "'> " + optionList[j].Text + "</label></div>";
            level1Opt.innerHTML = domEl;
        } else if (qType === "MULTI_SELECT") {
            domEl += "<div class='options'><input type='checkbox' name='answers' id='option" + j + "' class='checkbox'/><label for='option" + j + "'> " + optionList[j].Text + "</label></div>";
            level1Opt.innerHTML = domEl;
        } else {
            let result = ''
            let countrys = []
            countrys[j] = optionList[j].Text;
            result += countrys[Math.floor(Math.random() * options)];
            //console.log(result)
            dnd1 += "<li id='drag" + [j] + "' ondrop='drop(event)' ondragover='allowDrop(event)'><img id='" + optionList[j].Text + "' src='./images/" + optionList[j].Text + ".png' draggable='true' ondragstart='drag(event)' /></li>";
            dnd2 += "<li data-draggable-id='" + optionList[j].isCorrect + "' ondragover='allowDrop(event)' ondrop='drop(event)'></li><label> " + optionList[j].isCorrect + "</label>";
            level1Opt.innerHTML = dnd1;
            level1Opt.innerHTML += dnd2;
            level1Opt.innerHTML += dnd3;
        }
    }



    //level1Opt.innerHTML = domEl;

    return;

}

let mask = document.getElementById("mask");
let questionSlide = document.getElementById("quizPage");
let feedback = document.getElementById("feedbackMessage");

// async function showQuestions() {
//     if (totalQuestions > questionCount) {
//         await setTimeout(() => {
//             questionSlide.classList.remove("fadeIn");
//             questionSlide.classList.add("fadeOut");
//         }, 500);

//         await setTimeout(() => {
//             mask.style.display = "flex"
//             questionSlide.classList.remove("fadeOut");
//             questionSlide.classList.add("fadeIn");
//             if (questionCount <= displayQuestions) {
//                 questionCount++;
//             }
//             updateQuestions(questionCount);
//         }, 1000);
//         $("#sumbitBtn").css("display", "flex");
//         $("#nextBtn").css("display", "flex");
//         $("#closeBtn2").css("display", "none");
//     } else {
//         questionCount = -1
//         mask.style.display = "flex"
//         questionSlide.classList.remove("fadeOut");
//         questionSlide.classList.add("fadeIn");
//         if (questionCount <= displayQuestions) {
//             questionCount++;
//         }
//         updateQuestions(questionCount);
//     }
// }

$("#addQuestion").click(function () {
    showQuestions();
});

function resetData() {
    for (let i = 0; i < totalQuestions; i++) {
        qnum.push([i])
    }
    score = 0;
    correct = 0;
    questionCount = 0;
    mask.style.display = "none";
    validate = [];
    correctDrop = false;
    myNum = 1;
    visitedQue = [];

    console.log("reset")
}


async function correctAnswer() {
    //document.getElementById("mask").style.display = "none";
    score += points;
    correct++;
    feedback.innerHTML = "Correct"
    feedback.style.background = "#6fb415"
    await showMessage();

    await setTimeout(function () {
        percent = (score / totalScore) * 100;
    }, 1000);
    //console.log(score)

    await setTimeout(() => {
        showNextQuestion()
    }, 1500);

    console.log(percent)

}

function wrongAnswer() {
    feedback.style.background = "#c8650d"
    feedback.innerHTML = "Incorrect"
    showMessage();

    setTimeout(() => {
        showNextQuestion()
    }, 1500);
    console.log(percent)
}

$("#closeBtn, #closeBtn2").click(function () {
    resetData()
})

function showNextQuestion() {
    if (totalQuestions > questionCount) {
        showQuestions()
    } else {
        finishAssessment()
    }

}

$("#nextBtn").click(function () {
    showNextQuestion()
});

function showMessage() {
    feedback.style.display = 'flex';
    feedback.classList.add('zoomIn')
    setTimeout(() => {
        feedback.classList.remove('zoomIn')
        feedback.classList.add('zoomOut')
    }, 2000);
    setTimeout(() => {
        feedback.style.display = 'none'
    }, 2500);
}

$("#sumbitBtn").click(function () {
    var checkedOptions = $("#optionsDisplay input:checked").length;
    var getIndex = $("#optionsDisplay input:checked");
    var radioButtons = $("#optionsDisplay input");
    if (qType === 'DRAG_DROP') {
        console.log(validate.length)
        if (validate.length >= 5) {
            if (correctDrop !== false) {
                correctAnswer();
            } else {
                wrongAnswer();
            }
        } else {
            alert("Drag all elements to Continue.")
        }

    } else {
        if (checkedOptions > 0) {
            if (qType === 'SINGLE_SELECT') {
                for (var i = 0; i < checkedOptions; i++) {
                    if ($("#optionsDisplay input:checked")) {
                        var selectedIndex = radioButtons.index(getIndex[i]);
                    }
                    var n = [];
                    n.push(myObj.Level1.Question[questionCount].Option[selectedIndex].isCorrect);
                }

                if (n.includes(1) === true) {
                    correctAnswer();
                    //console.log("Correct" + "<>" + percent);
                } else {
                    wrongAnswer();
                    //console.log("Wrong 1");
                }

            } else {

                if (checkedOptions >= 2) {
                    var correctOptions = [];
                    for (var i = 0; i < options; i++) {
                        correctOptions[i] = myObj.Level1.Question[questionCount].Option[i].isCorrect;

                    }

                    function getOccurrence(array, value) {
                        var count = 0;
                        array.forEach((v) => (v === value && count++));
                        return count;
                    }

                    if (getOccurrence(correctOptions, 1) === $("#optionsDisplay input:checked").length) {

                        for (var i = 0; i < checkedOptions; i++) {
                            if ($("#optionsDisplay input:checked")) {
                                var selectedIndex = radioButtons.index(getIndex[i]);
                            }
                            var n = [];
                            n.push(myObj.Level1.Question[questionCount].Option[selectedIndex].isCorrect);
                        }

                        if (n.includes(1) === true) {
                            correctAnswer();
                            //console.log("Correct" + "<>" + percent);
                        } else {
                            wrongAnswer();
                            //console.log("Wrong2");
                        }
                    } else {
                        wrongAnswer();
                        //console.log("Wrong3");
                    }


                } else {
                    wrongAnswer();
                    //console.log("Wrong4");
                }
            }

        } else {
            alert("Please select at least one Option!");
        }
    }

});




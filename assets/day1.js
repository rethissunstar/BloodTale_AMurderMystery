//selecting all required elements
const warning_box = document.querySelector(".warning_box");
const quiz_box = document.querySelector(".quiz_box");
const mobile_box = document.querySelector(".mobile_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
let dayAnswers = [];
const today = "04/23/2023";
let qAnswer = "";
let dALenght = 0;
let lDStoraged = "";
let d = 1;


window.onload = function () {
    adayTest();
}

const exit_btn_Warning = document.querySelector("footer .exit_btn_Warning");
const clear_btn_Warning = document.querySelector("footer .clear_btn_Warning");


function adayTest() {
    dayAnswers = JSON.parse(localStorage.getItem("dAnsFile")); //check if there is a file named cName on the local drive, if yes is going to load on the variable cityList

    if (dayAnswers !== null) {
        dALenght = dayAnswers.length;
        lDStoraged = dayAnswers[dALenght - 2];
        if (dALenght > 4) {
            warning_box.classList.add("activeWarning"); //show warning box
            let demo1 = "You've had your chance for three days.";
            let demo2 = "Thank you for participating in the Bloody Tale game.";
            let demo3 = dayAnswers;
            document.getElementById("demo1").innerHTML = demo1;
            document.getElementById("demo2").innerHTML = demo2;
            

        } else if (lDStoraged == today) {
            warning_box.classList.add("activeWarning"); //show warning box
            let demo1 = "You've had your chance today.";
            let demo2 = "Please try again tomorrow.";
            let demo3 = dayAnswers;
            document.getElementById("demo1").innerHTML = demo1;
            document.getElementById("demo2").innerHTML = demo2;
         
            
        } else {
            d = (dALenght / 2) + 1
            quiz_box.classList.add("activeQuiz"); //show quiz box
            showQuetions(); //calling showQestions function
            queCounter(1); //passing 1 parameter to queCounter
            startTimer(74); //calling startTimer function
            startTimerLine(0); //calling startTimerLine function
        }
        
    } else {
        dayAnswers = [];
        quiz_box.classList.add("activeQuiz"); //show quiz box
        showQuetions(); //calling showQestions function
        queCounter(1); //passing 1 parameter to queCounter
        startTimer(74); //calling startTimer function
        startTimerLine(0); //calling startTimerLine function
    }
}





// if Next Que button clicked
exit_btn_Warning.onclick = () => {
    self.close();
}


clear_btn_Warning.onclick = () => {
    localStorage.removeItem("dAnsFile");
    window.location.assign("../index.html")
}



// if startQuiz button clicked

// if exitQuiz button clicked

// if continueQuiz button clicked

let timeValue = 74;
let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let widthValue = 0;

const next_btn_Quiz = document.querySelector("footer .next_btn_Quiz");
const bottom_ques_counter = document.querySelector("footer .total_que");

// getting questions and options from array
function showQuetions() {
    const que_text = document.querySelector(".que_text");
    let index = d - 1;

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[d-1].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
        qAnswer = "C";
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
    } else {
        qAnswer = "W";
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }

    dayAnswers.push(today,qAnswer);
    localStorage.setItem("dAnsFile", JSON.stringify(dayAnswers));
    next_btn_Quiz.classList.add("show"); //show the next button if user selected any option
}


function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            qAnswer = "W";
            dayAnswers.push(today, qAnswer);
            localStorage.setItem("dAnsFile", JSON.stringify(dayAnswers));
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn_Quiz.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 115);
    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > 648) { //if time value is greater than 847
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    // bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}


// if Next Que button clicked
next_btn_Quiz.onclick = () => {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine    
    if (d==3){ 
        quiz_box.classList.remove("activeQuiz"); //show warning box      
        warning_box.classList.add("activeWarning");
        let demo1 = "You've had your chance for three days.";
        let demo2 = "Thank you for participating in the Bloody Tale game.";
        let demo3 = dayAnswers;
        document.getElementById("demo1").innerHTML = demo1;
        document.getElementById("demo2").innerHTML = demo2;        
        clear_btn_Warning.classList.add("show"); //show exit button box

    }else{
        showMobile(); //calling showResult function
    }
    
}


var messages1 = ['Hi, I committed murders in the 70s, when Gerald Ford and Jimmy Carter used to be the president.', 'I was often regarded as charismatic.', ' Used to love bringing victims in my car.', ' Guess who I am otherwise I will kill you', "Do you know who I am?",];
var messages2 = ['Hi, people lost he number of muderes that I committed', 'My first murderer was a student from the University of Washington ', 'I used to spend the night with the dead bodies most of the time', "Do you know who I am?",];
var messages3 = ['Hi, I attended law school in Utah.', 'Most of my crimes were commited on a classic 1968 Volkswagen Beetle.', 'The vehicle nowadays is on display at a museum. ', "Who am I?",];
var messagesd = [];



function showMobile() {
    if (d == 1) {
        messagesd = messages1;
    }

    if (d == 2) {
        messagesd = messages2;
    }

    if (d == 3) {
        messagesd = messages3;
    }

    quiz_box.classList.remove("activeQuiz"); //remove quiz box
    mobile_box.classList.add("activeMobile"); //show mobile box

    $('#messages').chatBubble({
        messages: messagesd,
        typingSpeed: 4000
    });
    setTimeout(show_btn_Mobile, 10000);
}

function show_btn_Mobile() {
    next_btn_Mobile.classList.add("show"); //show the next button if user selected any option
}

const next_btn_Mobile = document.querySelector("footer .next_btn_Mobile");

// if Next Que button clicked
next_btn_Mobile.onclick = () => {
    mobile_box.classList.remove("activeMobile"); //show mobile box
    warning_box.classList.add("activeWarning"); //show warning box
    let demo1 = "You've had your chance today.";
    let demo2 = "Please try again tomorrow.";
    let demo3 = dayAnswers;
    document.getElementById("demo1").innerHTML = demo1;
    document.getElementById("demo2").innerHTML = demo2;
   
    
}

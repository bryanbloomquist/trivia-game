var questionArray = [
    question = {
        question: 'What year was the original Fallout released?', 
        answer: [{
            value: true, answer: '1997', 
        },{ value: false, answer: '1999', 
        },{ value: false, answer: '1995', 
        },{ value: false, answer: '1993'
        }]
    },
    question = {
        question: "Despite the 1950's asthetic of Fallout, what year did the Great War end civilization?",
        answer: [{
            value: true, answer: '2077',
        },{ value: false, answer: '2020',
        },{ value: false, answer: '1959',
        },{ value: false, answer: '2059'
        }]
    },
    question = {
        question: 'In the first Fallout game you play the Vault Dweller; what vault are you from?',
        answer: [{
            value: true, answer: 'Vault 13',
        },{ value: false, answer: 'Vault 101',
        },{ value: false, answer: 'Vault 76',
        },{ value: false, answer: 'Vault 42'
        }]
    },
    question = {
        question: 'What is your primary mission in Fallout?',
        answer: [{
            value: true, answer: 'Find a replacement waterchip.',
        },{ value: false, answer: 'Find a non-mutant companion.',
        },{ value: false, answer: 'Find a new settlement for your people.',
        },{ value: false, answer: 'Try not to die.'
        }]
    },
    question = {
        question: 'What year does your quest begin in Fallout?',
        answer: [{
            value: true, answer: '2161',
        },{ value: false, answer: '2077',
        },{ value: false, answer: '1999',
        },{ value: false, answer: '2113'
        }]
    },
    question = {
        question: 'The first Fallout has a time limit to prevent experience grinding; how much in-game time do you initially have to complete your mission?',
        answer: [{
            value: true, answer: '150 days',
        },{ value: false, answer: '48 hours',
        },{ value: false, answer: '1 year',
        },{ value: false, answer: '3 months'
        }]
    },
    question = {
        question: "The Vault-Tec Assisted Targeting System (VATS) let you target certain body parts in Fallout 1 and 2 that you couldn't in later games, which body parts are they?",
        answer: [{
            value: true, answer: 'Eyes and Groin',
        },{ value: false, answer: 'Neck and Eyes',
        },{ value: false, answer: 'Groin and Knees',
        },{ value: false, answer: 'Ass and Knees'
        }]
    },
    question = {
        question: 'What does the acronym S.P.E.C.I.A.L. mean?',
        answer: [{
            value: true, answer: 'Strength, Perception, Endurance, Charisma, Intelligence, Agility, Luck',
        },{ value: false, answer: 'Strength, Perseverance, Endurance, Character, Investigation, Ability, Looks',
        },{ value: false, answer: 'Style, Probability, Elevation, Charm, Interpersonal Relationships, Acrimony, Lying',
        },{ value: false, answer: 'Stealth, Probability, Enchantment, Chemistry, Investigation, Alchemy, Law'
        }]
    },
    question = {
        question: 'What is the Forced Evolutionary Virus (F.E.V.) responsible for?',
        answer: [{
            value: true, answer: 'Creating the super mutants.',
        },{ value: false, answer: 'Destroying civilization.',
        },{ value: false, answer: '"Evolving" humanity into ghouls.',
        },{ value: false, answer: 'Manifesting super hero powers.'
        }]
    },
    question = {
        question: 'In Fallout 2 you meet King Arthurs knights; what mission do they ask of you?',
        answer: [{
            value: true, answer: 'Find the Holy Hand Grenade of Antioch.',
        },{ value: false, answer: 'Bring back a shrubbery.',
        },{ value: false, answer: 'Retrieve the Holy Grail at Castle Aaargh.',
        },{ value: false, answer: 'Build a giant wooden rabbit.'
        }]
    },
    question = {
        question: 'Which creature can you not have as a companion in Fallout 2?',
        answer: [{
            value: true, answer: 'Mr. Handy.',
        },{ value: false, answer: 'Deathclaw.',
        },{ value: false, answer: 'Super Mutant.',
        },{ value: false, answer: 'Cyber-dog.'
        }]
    },
    question = {
        question: 'What is the name of the car you can fix up and drive in Fallout 2?',
        answer: [{
            value: true, answer: 'Highwayman',
        },{ value: false, answer: 'Journeyman',
        },{ value: false, answer: 'Traveling Wilbury',
        },{ value: false, answer: 'Nucleon'
        }]
    },
    question = {
        question: 'Fallout 2 breaks the fourth wall many times; which one of these is "not" in the game?',
        answer: [{
            value: true, answer: 'PC: "Are you sure you should still be playing, its getting really late?',
        },{ value: false, answer: 'NPC: "You look like you belong in a battle mech computer game. This is Fallout 2"',
        },{ value: false, answer: 'PC: "I am the player character of this game."',
        },{ value: false, answer: 'An NPC gives your character the Fallout 2 Hintbook.'
        }]
    }
];

var number = 30;
var correctGuess = 0;
var wrongGuess = 0;
var intervalId = 0;
var currentQ = [];
var answerArray = [];
var isCorrect = "";
var theRightOne = "";

$(document).ready(function(){

    // Start the countdown
    function timer(){
        stop();
        intervalId=setInterval(decrement, 1000);
    }

    // Run the countdown
    function decrement(){
        number--;
        $("#countdownTimer").html("<h1>"+number+"</h2>");
        if (number===0){
            stop();
            incorrectAnswer();
        }
    }

    // Stop the timer
    function stop(){
        clearInterval(intervalId);
        number = 30;
    }

    // Initial Game Load
    function loadGame(){
        $("#playZone").empty();
        $("#playZone").html("<img src='assets/images/logo.png' alt='game logo'>")
        $("#playZone").append(
            $('<button/>',{
                text: "Begin",
                class: "btn btn-success btn-lg mt-5",
                id: "gameButton",
                click: function(){
                    loadQ();}
            })
        );
    }

    // Shuffle answer array
    function shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
        while(0 !== currentIndex){
            randomIndex = Math.floor(Math.random()*currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    // Prepare the question format
    function prepQ(){
        currentQ = questionArray[0].question;
        answerArray = questionArray[0].answer;
        theRightOne = answerArray[0].answer;
        console.log(theRightOne);
        questionArray.shift();
        answerArray =  shuffle(answerArray);
    }

    // Load the question
    function loadQ(){
        $("#playZone").empty();
        prepQ();
        timer();
        $("#playZone").html(
            "<form id= 'quiz'>"+
            "<h4>"+currentQ+"</h4><br>"+
            "<input type='radio' name='answer' value='"+answerArray[0].value+"'>"+answerArray[0].answer+"<br>"+
            "<input type='radio' name='answer' value='"+answerArray[1].value+"'>"+answerArray[1].answer+"<br>"+
            "<input type='radio' name='answer' value='"+answerArray[2].value+"'>"+answerArray[2].answer+"<br>"+
            "<input type='radio' name='answer' value='"+answerArray[3].value+"'>"+answerArray[3].answer+"<br>"+
            "<input type='button' class='btn btn-success mt-3' id='submit' value='submit'>"+
            "</form>"
        )
    }

    // Check to see if answer is correct
    $(document).on("click","#submit", function checkAnswer(){
        stop();
        isCorrect = $('input[name=answer]:checked').val()
        console.log(isCorrect);
            if (isCorrect === "true") {
                correctGuess++;
                loadQ();
            } else {
                wrongGuess++;
                incorrectAnswer();
            }
            console.log(correctGuess);
            console.log(wrongGuess);
        })

    //if the answer is incorrect or the timer runs out
    function incorrectAnswer () {
        $("#playZone").empty().html(
            "<h4>The correct answer was: "+theRightOne+"</h4>"
        );
        setTimeout(loadQ, 3000);
    }
        
        
loadGame();


})
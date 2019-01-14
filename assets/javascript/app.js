var questionArray = [
    {
        question: 'What year was the original Fallout released?', 
        answers: ['1997', '1999', '1995', '1993'],
        correct: '1997',
        image: 'assets/images/question1.jpg'
    },{
        question: "Despite the 1950's asthetic of Fallout, what year did the Great War end civilization?",
        answers: ['2077', '2020', '1959', '2059'],
        correct: '2077',
        image: 'assets/images/question2.jpg'
    },{
        question: 'In the first Fallout game you play the Vault Dweller; what vault are you from?',
        answers: ['Vault 13', 'Vault 101', 'Vault 76', 'Vault 42'],
        correct: 'Vault 13',
        image: 'assets/images/question3.jpg'
    },{
        question: 'What is your primary mission in Fallout?',
        answers: ['Find a replacement waterchip.', 
            'Find a non-mutant companion.', 
            'Find a new settlement for your people.',
            'Try not to die.'],
        correct: 'Find a replacement waterchip.',
        image: 'assets/images/question4.jpg'
    },{
        question: 'What year does your quest begin in Fallout?',
        answers: ['2161', '2077', '1999', '2113'],
        correct: '2161',
        image: 'assets/images/question5.jpg'
    },{
        question: 'The first Fallout has a time limit to prevent experience grinding; how much in-game time do you initially have to complete your mission?',
        answers: ['150 days', '48 hours', '1 year', '3 months'],
        correct: '150 days',
        image: 'assets/images/question6.jpg'
    },{
        question: "The Vault-Tec Assisted Targeting System (VATS) let you target certain body parts in Fallout 1 and 2 that you couldn't in later games, which body parts are they?",
        answers: ['Eyes and Groin', 'Neck and Eyes', 'Groin and Knees', 'Ass and Knees'],
        correct: 'Eyes and Groin',
        image: 'assets/images/question7.jpg'
    },{
        question: 'What does the acronym S.P.E.C.I.A.L. mean?',
        answers: [
            'Strength, Perception, Endurance, Charisma, Intelligence, Agility, Luck',
            'Strength, Perseverance, Endurance, Character, Investigation, Ability, Looks',
            'Style, Probability, Elevation, Charm, Interpersonal Relationships, Acrimony, Lying',
            'Stealth, Probability, Enchantment, Chemistry, Investigation, Alchemy, Law'],
        correct: 'Strength, Perception, Endurance, Charisma, Intelligence, Agility, Luck',
        image: 'assets/images/question8.jpg'
    },{
        question: 'What is the Forced Evolutionary Virus (F.E.V.) responsible for?',
        answers: [
            'Creating the super mutants.',
            'Destroying civilization.',
            '"Evolving" humanity into ghouls.',
            'Manifesting super hero powers.'],
        correct: 'Creating the super mutants.',
        image: 'assets/images/question9.jpg'
    },{
        question: 'In Fallout 2 you meet King Arthur; what mission does he ask of you?',
        answers: [
            'Find the Holy Hand Grenade of Antioch.',
            'Bring back a shrubbery.',
            'Retrieve the Holy Grail at Castle Aaargh.',
            'Build a giant wooden rabbit.'],
        correct: 'Find the Holy Hand Grenade of Antioch.',
        image: 'assets/images/question10.jpg'
    },{
        question: 'Which creature can you not have as a companion in Fallout 2?',
        answers: ['Mr. Handy.', 'Deathclaw.', 'Super Mutant.', 'Cyber-dog.'],
        correct: 'Mr. Handy.',
        image: 'assets/images/question11.jpg'
    },{
        question: 'What is the name of the car you can fix up and drive in Fallout 2?',
        answers: ['Highwayman', 'Journeyman', 'Traveling Wilbury', 'Nucleon'],
        correct: 'Highwayman',
        image: 'assets/images/question12.jpg'
    },{
        question: 'Fallout 2 breaks the fourth wall many times; which one of these is "not" in the game?',
        answers: [
            'NPC: "Your nocturnal perseverance has earned you a hidden gaming tip. GO TO BED!"',
            'NPC: "You look like you belong in a battle mech computer game. This is Fallout 2"',
            'PC: "I am the player character of this game."',
            'An NPC gives your character the Fallout 2 Hintbook.'],
        correct: 'NPC: "Your nocturnal perseverance has earned you a hidden gaming tip. GO TO BED!"',
        image: 'assets/images/question13.jpg'
    }
];

var number = 30;
var correctGuess = 0;
var wrongGuess = 0;
var intervalId = 0;
var questionNum = 0;
var rounds = questionArray.length;
var currentQuestion = [];
var currentImage = "";
var answerArray = [];
var userGuess = "";
var theRightOne = "";

$(document).ready(function(){

    // Start the countdown
    function startTimer(){
        stopTimer();
        intervalId=setInterval(decrement, 1000);
    }

    // Run the countdown
    function decrement(){
        number--;
        $("#countdownTimer").html("<h1>"+number+"</h2>");
        if (number===0 && questionNum < rounds){
            stopTimer();
            wrongGuess++;
            questionNum++;
            $("#playZone").empty().html("<h4>The correct answer is: "+theRightOne+"</h4>");
            setTimeout(loadQuestion, 3000);
        }
        else if (number===0 && questionNum === rounds){
            stopTimer();
            wrongGuess++;
            $("#playZone").empty().html("<h4>The correct answer is: "+theRightOne+"</h4>");
            setTimeout(gameOver, 3000);
        }
    }

    // Stop the timer
    function stopTimer(){
        clearInterval(intervalId);
        number = 30;
    }

    // Initial Game Load
    function loadGame(){
        $("#playZone").empty();
        $("#playZone").html("<img id='logo' src='assets/images/logo.png' alt='game logo'>")
        $("#playZone").append(
            $('<button/>',{
                text: "Begin",
                class: "btn btn-success btn-lg ml-3 mt-5",
                id: "gameButton",
                click: function(){
                    loadQuestion();}
            })
        );
    }

    // Set the shuffle function
    function shuffle(array){
        var currentIndex = array.length;
        var temporaryValue, randomIndex;
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
    function prepQuestion(){
        currentQuestion = questionArray[questionNum].question;
        currentImage = questionArray[questionNum].image;
        answerArray = questionArray[questionNum].answers;
        theRightOne = questionArray[questionNum].correct;
        answerArray = shuffle(answerArray);
    }

    // Load the question
    function loadQuestion(){
        $("#playZone").empty();
        $("#countdownTimer").html("<h1>"+number+"</h1>");
        prepQuestion();
        startTimer();
        $("#playZone").html(
            "<form id='quiz'>"+
            currentQuestion+"<br>"+
            "<input type='radio' name='answer' class='options' value='"+answerArray[0]+"'>"+answerArray[0]+"<br>"+
            "<input type='radio' name='answer' class='options' value='"+answerArray[1]+"'>"+answerArray[1]+"<br>"+
            "<input type='radio' name='answer' class='options' value='"+answerArray[2]+"'>"+answerArray[2]+"<br>"+
            "<input type='radio' name='answer' class='options' value='"+answerArray[3]+"'>"+answerArray[3]+"<br>"+
            "<input type='button' class='btn btn-success mt-1' id='submit' value='submit'>"+
            "</form>"
        )
    }

    // Check to see if answer is correct
    $(document).on("click","#submit", function checkAnswer(){
        stopTimer();
        questionNum++;
        $("#countdownTimer").empty();
        userGuess = $('input[name=answer]:checked').val()
            if (userGuess === theRightOne && questionNum < rounds){
                correctGuess++;
                $("#playZone").empty().html("<h4>Correct</h4><br>").append("<img src="+currentImage+" style='width:100%'>");
                setTimeout(loadQuestion, 2000);
            } else if (userGuess === theRightOne && questionNum === rounds) {
                correctGuess++;
                $("#playZone").empty().html("<h4>Correct</h4>");
                setTimeout(gameOver, 1000);
            } else if (userGuess !== theRightOne && questionNum < rounds) {
                wrongGuess++;
                $("#playZone").empty().html("<h4>The correct answer is: "+theRightOne+"</h4>");
                setTimeout(loadQuestion, 3000);
            } else {
                wrongGuess++;
                $("#playZone").empty().html("<h4>The correct answer is: "+theRightOne+"</h4>");
                setTimeout(gameOver, 3000);
            }
        })

    // End of game function
    function gameOver() {
        $("#playZone").empty().html(
            "<h4>Great Game!</h4>"+
            "<h4>You Got "+correctGuess+" Correct.</h4>"+
            "<h4>You Got "+wrongGuess+" Wrong.</h4>"
        );
        $("#playZone").append(
            $('<button/>',{
                text: "Play Again",
                class: "btn btn-success btn-lg mt-3",
                id: "gameButton",
                click: function(){
                    reset();}
            })
        );
    }

    // Restart Game
    function reset() {
        number = 30;
        questionNum = 0;
        correctGuess = 0;
        wrongGuess = 0;
        intervalId = 0;
        loadGame();
    }
        
loadGame();

})
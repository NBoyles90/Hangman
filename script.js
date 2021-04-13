// Author: Nikki Collins
//     Date: 04/10/2021

// NEEDS: 
    // skeleton picture of hangman
    // array of guess words
    // random generator to pick from the array
    // area for guesses
    // array to hold alphabet
    // ability to click on alphabet
    // test condition 
        // if letter clicked is in the word to be guessed then add to guess area
        // else remove a try (7 tries) and add an image to the hangman

//creates the arrays
var guessArray = ["happy", "abstract", "halfpint", "yonder", "snollygoster", "piffle", "celebrate", "onslaught", "debonair", "trouser", "pennyworth", "cookie"];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var letterGuessed = [];
var oldLetterGuessed = [];
var correctLetters = [];

//global variables
var theLetter = '';
var tries = 7; 
var test = false;
var timeswon = 0;
var timeslost = 0;

//get variables
getAlphabetSpot = document.getElementById('alphabetSpot')
getLetterSpot = document.getElementById("letterSpot")
getUsedLetterSpot = document.getElementById("usedLetterSpot")
getTrySpot = document.getElementById("trySpot")
getImagePlace = document.getElementById("imagePlace")
getWinSpot = document.getElementById("winSpot")
getLoseSpot = document.getElementById("loseSpot")
getHintTextSpot = document.getElementById("hintText")
getHintBtnSpot = document.getElementById("hintSpot")

// populates the screen upon loading the page
var strAlpha = "<div class='row'> <hr>"
for(var i = 0; i < alphabet.length; i++){
    strAlpha += `<div class='col- center'><button value=${i} type='button' class='btn btn-info'>${alphabet[i]}</button></div> <hr>`
    //console.log(alphabet[i])
}
strAlpha += "</div>"
getAlphabetSpot.innerHTML = strAlpha

start()
//starts the game and drives the word generater and the place holders
function start(){
    var randWord = randWordGen();
    theWord = randWord
    //generates the ‘getTrySpot’ so the user has 7 tries to start with
    getTrySpot.innerHTML = `${tries}`
    // Generates the initial image in ‘getImagePlace’ 
    getImagePlace.innerHTML = `<img src='hangman${tries}.png' alt'hangman' style="max-width: 35%;">`
    placeHolder()
}
        // generates the random word 
        function randWordGen(){
            // 	array length stars at 1 while the array starts at 0 so it is -1
            var random = Math.ceil((Math.random() * guessArray.length)-1);
            //console.log(random, guessArray[random])
            // sends the corresponding word from the array with the number randomly generated 
            return guessArray[random]
        }

        // creates the 'blanks' for the random word spot
        function placeHolder(){
            //placer holds a string that is outputted at the bottom of the function
            placer = "<div class='row'>"
            //output the under line and hold a “place” for each letter in the randomly generated word, ‘theWord’ 
            for (var i = 0; i < theWord.length; i++){
                placer += `<option class='col-' id=${i}>&nbsp &nbsp_____ &nbsp &nbsp</option>`
            }
            placer += "</div>"
            //display the completed variable placer
            getLetterSpot.innerHTML = placer
        }

//listens for a letter to be clicked
getAlphabetSpot.addEventListener('click', function(e){
    //targets the value of the letter clicked and passes the letter(or value) to the global variable theLetter (made global because anonymous functions can’t pass data directly) 
    theLetter = alphabet[e.target.value]
    compare()
})
        // compares the letter chosen and the length of the word split into an array
        function compare(){
            // splits ‘theWord’ into an array of it’s own, where ‘arrayOfTheWord’ holds each letter of ‘theWord’
            var arrayOfTheWord = theWord.split('');
            // generate an index value to assign to the newly created ‘arrayOfTheWord’ to test against ‘theLetter’
            for(var a = 0; a <= theWord.length; a++){
                //	If ‘theLetter’ matches a value of the arrayOfTheWord then it calls the replacer()
                if(theLetter == arrayOfTheWord[a]){
                    replacer(a)     //is the index value
                }

            }
            // if it does or doesn’t match values then it still calls the letterbox() function.
            letterBox()
        }
                // replaces the "blank" spot with the letter the user picked
                function replacer(a){
                    var arrayOfTheWord = theWord.split('');
                    //grabs the ID of one of the placeholder options using the number (a) it is passed from the compare() 
                    var replaced = document.getElementById(a)
                    //pushes the letter that matches the index value of the ‘arrayOfTheWord’ into the global array of ‘letterGuessed’
                    letterGuessed.push(arrayOfTheWord[a]);
                    // a new placeholder that includes the letter in the index value of the ‘arrayOfTheWord’
                    replaced.innerHTML = `&nbsp &nbsp__${arrayOfTheWord[a]}__ &nbsp &nbsp`   
                }
                // generates the used letters box with letters the player has previously picked
                function letterBox(){
                    for(var l = 0; l < theWord.length; l++){
                        //compares ‘theLetter’ to the global array ‘oldLetterGuessed’ (which has none at the beginning and fills as the user picks new letters) index value.
                        if(theLetter == oldLetterGuessed[l]){
                            // If it matches then it alerts the user that they have already used that letter
                            alert("you already picked that one")
                        }
                    }
                    // pushes ‘theLetter’ into the array ‘oldLetterGuessed’ to be compared again on the next round.
                    oldLetterGuessed.push(theLetter)
                    //‘getUsedLetterSpot’ is filled with the array ‘oldLetterGuessed’
                    getUsedLetterSpot.innerHTML = oldLetterGuessed
                    tryCounter()
                    
                }  
                // tests to see if the letter was in the word to only have 1 outcome
                    //and it can break out of the loop and into the next if statement where tries increases
                function tryCounter(){
                    var arrayOfTheWord = theWord.split('');
                    for(var a = 0; a <= theWord.length; a++){
                        //	If the ‘test’ = true then ‘theLetter’ is pushed to the ‘correctLetter’s array (which will be used to determine if they won or not)
                        if(arrayOfTheWord[a] == theLetter){
                            test = true;
                            correctLetters.push(theLetter)
                            break
                        }
                        else{
                            test = false;
                        }
                    }
                    if (test == false){
                        // Then inital ‘tries’ is minused by 1
                        tries--
                        // The ‘getImagePlace’ is updated with the image that matches the number value of ‘tries’
                        getImagePlace.innerHTML = `<img src='hangman${tries}.png' alt'hangman' style="max-width: 35%;">`
                    }
                    displayCounter()
                }
                // displays the number of lives they have left
                function displayCounter(){
                    counter = (tries-1)
                    // the counter (which sounds off but) removes another 1 from ‘tries’ and holds that number in the global variable ‘counter’
                    getTrySpot.innerHTML = counter
                    winnerLoser(counter)
                }
                // test if the user has used up all their “lives” 
                function winnerLoser(counter){
                    var arrayOfTheWord = theWord.split('');
                    //	if ‘counter’ = 0 the user loses and is alerted of such and ‘theWord’ is displayed
                    if(counter == 0){
                        alert(`You've lost :( The Word was ${theWord}`)
                        //user’s ‘timeslost’ number is increased by 1 and displayed
                        timeslost++
                        getLoseSpot.innerHTML = `<h4>You've lost: ${timeslost}</h4>`
                        reset()
                    }
                    //	if the user’s ‘correctLetter’ array length matches ‘arrayOfTheWord’ length then the player wins (unfortunately if the word has 5 letters and the user presses e 5 times they still win) 
                    if (correctLetters.length == arrayOfTheWord.length){
                        alert(`You've Won!! The Word was ${theWord}`)
                        //‘timeswon’ number is increased by 1 and is displayed
                        timeswon++
                        getWinSpot.innerHTML = `<h4>You've Won: ${timeswon}</h4>`
                        reset()
                    }
                }
                function reset(){
                    // deletes all the screen data to start a new game, leaves the wins/losses numbers alone
                    letterGuessed = [];
                    oldLetterGuessed = [];
                    correctLetters = [];
                    theLetter = '';
                    tries = 7; 
                    test = false;
                    getUsedLetterSpot.innerHTML = ""
                    getHintTextSpot.innerHTML = ""
                    //recalls start to start the game again
                    start()

                }
// Creates an array of hints
var hintArray = [
    "feeling or showing pleasure or contentment.", 
    "existing in thought or as an idea but not having a physical or concrete existence", 
    "half of a pint", 
    "at some distance in the direction indicated; over there", 
    "a shrewd, unprincipled person", 
    "nonsense", 
    "acknowledge (a significant or happy day or event) with a social gathering or enjoyable activity", 
    "a fierce or destructive attack", 
    "confident, stylish, and charming (typically used of a man)", 
    "relating to trousers", 
    "an amount of something that may be bought for a penny", 
    "a small sweet cake, typically round and flat and having a crisp or chewy texture"]
    // Uses an event listener to activate the hint() function
    getHintBtnSpot.addEventListener("click", hint)
    function hint(){
        var h= 0;
        // Uses the local variable h to count the index of ‘guessArray’ until it equals ‘theWord’ 
        for(h; h < hintArray.length; h++){
            if (guessArray[h] == theWord){
                break
            }
        }
        // ‘hintArray’ uses the index from the variable h to print out the corresponding hint.
        getHintTextSpot.innerHTML = hintArray[h]
    }

                





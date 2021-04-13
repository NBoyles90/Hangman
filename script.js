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
        // else remove a try (6 tries) and add an image to the hangman

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
    getTrySpot.innerHTML = `${tries}`
    getImagePlace.innerHTML = `<img src='hangman${tries}.png' alt'hangman' style="max-width: 35%;">`
    placeHolder()
}
        // generates the random word 
        function randWordGen(){
            var random = Math.ceil((Math.random() * guessArray.length)-1);
            //console.log(random, guessArray[random])
            // sends the corresponding word from the array with the number randomly generated 
            return guessArray[random]
        }

        // creates the 'blanks' for the random word spot
        function placeHolder(){
            placer = "<div class='row'>"
            for (var i = 0; i < theWord.length; i++){
                placer += `<option class='col-' id=${i}>&nbsp &nbsp_____ &nbsp &nbsp</option>`
            }
            placer += "</div>"
            getLetterSpot.innerHTML = placer
        }

//listens for a letter to be clicked
getAlphabetSpot.addEventListener('click', function(e){
    var pickedLetter = alphabet[e.target.value]
    theLetter = pickedLetter
    compare()
})
        // compares the letter chosen and the length of the word split into an array
        function compare(){
            var arrayOfTheWord = theWord.split('');
            for(var a = 0; a <= theWord.length; a++){
                if(theLetter == arrayOfTheWord[a]){
                    replacer(a)     //is the index value
                }

            }
            letterBox()
        }
                // replaces the "blank" spot with the letter the user picked
                function replacer(a){
                    var arrayOfTheWord = theWord.split('');
                    var replaced = document.getElementById(a)
                    letterGuessed.push(arrayOfTheWord[a]);
                    replaced.innerHTML = `&nbsp &nbsp__${arrayOfTheWord[a]}__ &nbsp &nbsp`
                    console.log(theWord)    
                }
                // generates the used letters box with letters the player has previously picked
                function letterBox(){
                    for(var l = 0; l < theWord.length; l++){
                        if(theLetter == oldLetterGuessed[l]){
                            alert("you already picked that one")
                        }
                    }
                    var inbox = "";
                    oldLetterGuessed.push(theLetter)
                    getUsedLetterSpot.innerHTML = oldLetterGuessed
                    tryCounter()
                    
                }  
                // tests to see if the letter was in the word to only have 1 outcome
                    //and it can break out of the loop and into the next if statement where tries increases
                function tryCounter(){
                    var arrayOfTheWord = theWord.split('');
                    for(var a = 0; a <= theWord.length; a++){
                        if(arrayOfTheWord[a] == theLetter){
                            test = true;
                            correctLetters.push(theLetter)
                            console.log(correctLetters)
                            break
                        }
                        else{
                            test = false;
                        }
                    }
                    if (test == false){
                        tries--
                        getImagePlace.innerHTML = `<img src='hangman${tries}.png' alt'hangman' style="max-width: 35%;">`
                    }
                    DisplayCounter()
                }
                // displays the number of lives they have left
                function DisplayCounter(){
                    counter = (tries-1)
                    getTrySpot.innerHTML = `${counter}`
                    winnerLoser(counter)
                }
                function winnerLoser(counter){
                    var arrayOfTheWord = theWord.split('');
                    if(counter == 0){
                        alert(`You've lost :( The Word was ${theWord}`)
                        timeslost++

                        getLoseSpot.innerHTML = `<h4>You've lost: ${timeslost}</h4>`
                        reset()
                    }
                    if (correctLetters.length == arrayOfTheWord.length){
                        alert(`You've Won!! The Word was ${theWord}`)
                        timeswon++
                        getWinSpot.innerHTML = `<h4>You've Won: ${timeswon}</h4>`
                        reset()
                    }
                }
                function reset(){
                    letterGuessed = [];
                    oldLetterGuessed = [];
                    correctLetters = [];

                    //global variables
                    theLetter = '';
                    tries = 7; 
                    test = false;

                    getUsedLetterSpot.innerHTML = ""
                    getHintTextSpot.innerHTML = ""

                    start()

                }
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
    getHintBtnSpot.addEventListener("click", hint)
    function hint(){
        var h= 0;
        for(h; h < hintArray.length; h++){
            if (guessArray[h] == theWord){
                console.log(guessArray[h])
                break
            }
        }
        getHintTextSpot.innerHTML = hintArray[h]
    }

                





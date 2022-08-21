const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#solve-button');
const solutionDisplay = document.querySelector('#solution');
const squares = 81;
let submission = [];

/*
CREATING THE GRID
for loop, i is equal to 0 and aslong as there are less that 81 squares
I want to keep looping, increment by 1. For every instance of looping
I want to add an input Element, I want the input type to be a number
but I would like the numbers inputted to be between 1-9.
I want this for loop to be appended to the puzzleboard. */
for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement("input")
    inputElement.setAttribute("type", "number")
    inputElement.setAttribute("min", 1)
    inputElement.setAttribute("max", 9)
        if(
            ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
            ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
            ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
            ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
            ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
        ){
            inputElement.classList.add("odd-section")
        }
    puzzleBoard.appendChild(inputElement)
}


/*
FUNCTION TO SET UP VALUES TO BE SOLVED

I want to, grab all the values from the input, so that we can send it of to be solved.
Once these inputs have been selected I want to transform them into an array.

This funtions grabs all inputs, then for each input if their is a values
(true), then put it in an array, by grabbing the submission and push the input
value into it.
Else push a . to symbolise an empty square.
console log this at each instance for testing purposes.
*/
const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input =>{
        if(input.value){
            submission.push(input.value)
        }else {
            submission.push(".")
        }
    })
    console.log(submission)
}

/*
FUNCTION TO CALL ON THE API

I want to also call the function, joinValues whenever
the solve button is pressed. 
Aswell and getting the submissions using the javascript join method.
I also want to populate the values, 


 */

const populateValues = (isSolvable, solution) => {
    const inputs = document. querySelectorAll('input')
    if (isSolvable && solution) {
        inputs.forEach ((input, i) => {
        input. value = solution[i]
        })
    solutionDisplay.innerHTML = 'Sodoku Solved!!'
    } else {
        solutionDisplay.innerHTML= "This is not solvable"
    }
}

const solve = () => {

    joinValues()
    const data = { numbers:submission.join('')}
    console.log("data", data)

    fetch('http://localhost:8000/solve',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })  .then(response => response.json())
        .then(data => { 
            console.log(data)
            populateValues(data.solvable, data.solution)
            submission = []
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}




//if I click the button, then I want to call the function 'solve'
solveButton.addEventListener('click', solve)

/* to hide my API key i put it in a .env, then refered to it within the function.
I then installed npm (npm init) to be able to build up the backend so I could get the key to
work.
My other intsalls are: npm i axios express cors dotenv nodemon gitignore

npm run start:backend in terminal to run the back end after adding-
 "start:backend": "nodemon server.js", too scripts in the back end*/
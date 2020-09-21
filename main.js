function main(){
	
	// Global Variables 
	let selectedCategory = "Linux";
	let selectedLimit = 10;
	let selectedDifficulty = "easy";
	// Variables
	const quizContainer = document.getElementById('quiz');
	const quizConfigurationContainer = document.getElementById('quiz-configuration');
	const resultsContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');
	const submitQuizConfiguration = document.getElementById('submit-configuration');

	// Pagination
	const previousButton = document.getElementById("previous");
	const nextButton = document.getElementById("next");
	
	// Hide Buttons before Quiz starts
	submitButton.style.visibility = 'hidden';
    previousButton.style.visibility = 'hidden';
    nextButton.style.visibility = 'hidden';

	// keep track of user's answers
	let numCorrect = 0;
	let currentSlide = 0;
  
	// Event listeners
	submitButton.addEventListener('click', showResults);
	submitQuizConfiguration.addEventListener('click', reactOnSubmitQuizConfiguration);
	previousButton.addEventListener("click", showPreviousSlide);
	nextButton.addEventListener("click", showNextSlide);
	let myQuestions = null;
	const myQuestionsStatic = [
	{
	  question: "Who invented JavaScript?",
	  answers: {
		a: "Douglas Crockford",
		b: "Sheryl Sandberg",
		c: "Brendan Eich"
	  },
	  correctAnswer: "c"
	},
	{
	  question: "Which one of these is a JavaScript package manager?",
	  answers: {
		a: "Node.js",
		b: "TypeScript",
		c: "npm"
	  },
	  correctAnswer: "c"
	},
	{
	  question: "Which tool can you use to ensure code quality?",
	  answers: {
		a: "Angular",
		b: "jQuery",
		c: "RequireJS",
		d: "ESLint"
	  },
	  correctAnswer: "d"
	}
	];

	
	let slides = null;
	// gather answer containers from our quiz
	let answerContainers = null;
  
  // Functions
  // 2.0 Create a web application that lets user answer questions (requested from QuizAPI, 7 pts)
  // Implement basic functionality where users can answer questions upon page reloads (Fetch API, XMLHttpRequest)
  // Let the user request new questions without page reloads (3 pt)
  function buildQuiz(){
	
	// Create a new XMLHttpRequest object
	let xhr = new XMLHttpRequest()
	
	// Configure it: GET-request for the URL /article/.../load
	xhr.open('GET', ' https://quizapi.io/api/v1/questions?category=' + selectedCategory + '&difficulty=' + selectedDifficulty + '&limit=' + selectedLimit);
	
	// Set Request Headers
	xhr.setRequestHeader("X-Api-Key","2DJPTeJMUrX3taAcep7V2339niDaSMpxLIRm9hbn");

	// 3. Send the request over the network
	xhr.send();

	// 4. This will be called after the response is received
	xhr.onload = function() {
	  if (xhr.status != 200) { // analyze HTTP status of the response
		// alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
	  } else { // show the result
		
		// console.log(xhr.response);
		// console.log(xhr.response.data);
		myQuestions = JSON.parse(xhr.responseText);
		
		// variable to store the HTML output
		const output = [];
		// for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
		  
		  // variable to store the list of possible answers
        const answers = [];
		
		  
		  console.log("currentQuestion", currentQuestion);
		  console.log("questionNumber", questionNumber);

        

        // and for each available answer...
        for(letter in currentQuestion.answers){
			if(currentQuestion.answers[letter] === null) {
			  continue;
			}
			console.log("letter", letter);

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
		quizContainer.innerHTML = output.join('');
      }
    );
	// finally combine our output list into one string of HTML and put it on the page
    
	
	slides = document.querySelectorAll(".slide");
	// gather answer containers from our quiz
	answerContainers = quizContainer.querySelectorAll('.answers');
	// Show the first slide
	showSlide(currentSlide);
		
	  }
	};

	xhr.onprogress = function(event) {
	  if (event.lengthComputable) {
		// alert(`Received ${event.loaded} of ${event.total} bytes`);
	  } else {
		// alert(`Received ${event.loaded} bytes`); // no Content-Length
	  }

	};

	xhr.onerror = function() {
	  // alert("Request failed");
	};
	  
  }

  function showResults(){

    // gather answer containers from our quiz
	/** 
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
	  console.log("Useranswer", userAnswer);

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
	*/
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
	  console.log("Click");
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  
  function reactOnSubmitQuizConfiguration() {
	  
    submitButton.style.visibility = 'visible';
    previousButton.style.visibility = 'visible';
    nextButton.style.visibility = 'visible';
	
	quizConfigurationContainer.style.display = 'none';
	
	// Category Input from User
	var e = document.getElementById("quizCategory");
	selectedCategory = e.options[e.selectedIndex].value;
	
	// Difficulty input from User
	var ee = document.getElementById("difficultyLevel");
	selectedDifficulty = ee.options[ee.selectedIndex].value;
	
	// Question Limit input from User
	var eee = document.getElementById("questionLimit");
	selectedLimit = eee.options[eee.selectedIndex].value;
	// Kick things off
	buildQuiz();

	
	
	
  }
  
  function saveResultIntoStorage() {
    localStorage.setItem('resultInPercent', 20);
	var resultInPercent = localStorage.getItem('resultInPercent');
  }

}
  


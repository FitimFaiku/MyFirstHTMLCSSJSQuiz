function main(){
	// Variables
	const quizContainer = document.getElementById('quiz');
	const resultsContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');

	// Pagination
	const previousButton = document.getElementById("previous");
	const nextButton = document.getElementById("next");
	

	// keep track of user's answers
	let numCorrect = 0;
	let currentSlide = 0;
  
	// Event listeners
	submitButton.addEventListener('click', showResults);
	previousButton.addEventListener("click", showPreviousSlide);
	nextButton.addEventListener("click", showNextSlide);
	const myQuestions = [
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

	// Kick things off
	buildQuiz();
	
	const slides = document.querySelectorAll(".slide");
	// gather answer containers from our quiz
	const answerContainers = quizContainer.querySelectorAll('.answers');

	// Show the first slide
	showSlide(currentSlide);

	
  
  
  // Functions
  // 2.0 Create a web application that lets user answer questions (requested from QuizAPI, 7 pts)
  // Implement basic functionality where users can answer questions upon page reloads (Fetch API, XMLHttpRequest)
  // Let the user request new questions without page reloads (3 pt)
  function buildQuiz(){
	// 1. Create a new XMLHttpRequest object
	let xhr = new XMLHttpRequest()

	// Configure it: GET-request for the URL /article/.../load
	xhr.open('GET', ' https://quizapi.io/api/v1/questions');
	
	// Set Request Headers
	xhr.setRequestHeader("X-Api-Key","2DJPTeJMUrX3taAcep7V2339niDaSMpxLIRm9hbn");

	// 3. Send the request over the network
	xhr.send();

	// 4. This will be called after the response is received
	xhr.onload = function() {
	  if (xhr.status != 200) { // analyze HTTP status of the response
		alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
	  } else { // show the result
		alert(`Done, got ${xhr.response.data} bytes`); // response is the server
	  }
	};

	xhr.onprogress = function(event) {
	  if (event.lengthComputable) {
		alert(`Received ${event.loaded} of ${event.total} bytes`);
	  } else {
		alert(`Received ${event.loaded} bytes`); // no Content-Length
	  }

	};

	xhr.onerror = function() {
	  alert("Request failed");
	};
	  
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

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
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

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
  
  function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

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
}

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
	alert("Hello");
    showSlide(currentSlide - 1);
  }

  }
  


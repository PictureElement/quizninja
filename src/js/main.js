// Global variables
var quiz;
var points;
var maxPoints;
var questionIndex;
var secondsLeft;
var previousTimestamp;
var timeID;
var numQuestions;
var progress;
var sfxKatana;
var sfxInvalid;
var sfxValid;
var soundtrackMain;
var soundtrackEnd;
var result;

function countdown() {
  // Get current timestamp
  var CurrentTimestamp = (new Date()).getTime();

  // Update DOM, if the progress is greater or equal to 1 second
  if (CurrentTimestamp - previousTimestamp >= 1000) {
    secondsLeft--;
    // Play 3-second countdown sfx
    if (secondsLeft === 3) {
      sfxCountdown.play();
    }
    previousTimestamp = CurrentTimestamp;
    $("#countdown").empty();
    $("#countdown").append(secondsLeft+"&quot;");
  }
  if (secondsLeft === 0) {
    submitCallback();
  }
  else {
    timeID = requestAnimationFrame(countdown);
  }
}

// Populate play area
function populate() {

  // Reset timer
  secondsLeft = 15;

  // Update timer 
  $("#countdown").empty();
  $("#countdown").append(secondsLeft+"&quot;");
  
  // Update progress bar 
  progress = (questionIndex / numQuestions) * 100;
  $("#progress-bar").css("width", progress + "%");
  $("#progress-bar").attr("aria-valuenow", progress);

  // Get question type
  var questionType = quiz.questions[questionIndex].question_type;

  // Show image  
  var formattedImage = HTMLimage.replace("%data%", quiz.questions[questionIndex].img); // Replace the %data% placeholder text
  $("#card-image").append(formattedImage); // Append image

  // Show question
  var formattedQuestion = HTMLquestion.replace("%data%", quiz.questions[questionIndex].title); 
  $("#card-title").append(formattedQuestion);

  // Show possible answers
  if (questionType === "mutiplechoice-single") { // For multiple choice (single) use radio buttons
    var formattedRadio;
    // Show possible answers
    for (var i = 0; i < quiz.questions[questionIndex].possible_answers.length; i++) {
      formattedRadio = HTMLradio.replace("%data1%", quiz.questions[questionIndex].possible_answers[i].a_id);
      formattedRadio = formattedRadio.replace("%data2%", quiz.questions[questionIndex].possible_answers[i].caption);
      $("#card-answers").append(formattedRadio);
    }
  }
  else if (questionType === "mutiplechoice-multiple") { // For multiple choice (multiple) use checkbox buttons
    var formattedCheckbox;
    // Show possible answers
    for (var i = 0; i < quiz.questions[questionIndex].possible_answers.length; i++) {
      formattedCheckbox = HTMLcheckbox.replace("%data1%", quiz.questions[questionIndex].possible_answers[i].a_id);
      formattedCheckbox = formattedCheckbox.replace("%data2%", quiz.questions[questionIndex].possible_answers[i].caption);
      $("#card-answers").append(formattedCheckbox);
    }
  }
  else { // For true-false use radio buttons as well
    $("#card-answers").append(HTMLfalse);
    $("#card-answers").append(HTMLtrue);
  }

  // Get timestamp
  previousTimestamp = (new Date()).getTime();
  // Start countdown
  countdown();
}

// Empty card area
function emptyCard() {
  $("#card-image").empty();
  $("#card-title").empty();
  $("#card-answers").empty();
}

function init() {
  
  // Initialize variables
  points = 0;
  maxPoints = 0;
  questionIndex = 0;
  secondsLeft = 15;
  progress = 0;
  sfxKatana = new Audio('../media/sfx-katana.mp3');
  sfxInvalid = new Audio('../media/sfx-invalid-tone.mp3');
  sfxValid = new Audio('../media/sfx-valid-tone.mp3');
  soundtrackMain = new Audio('../media/soundtrack-main.mp3');
  soundtrackEnd = new Audio('../media/soundtrack-end.mp3');
  sfxCountdown = new Audio('../media/sfx-countdown.mp3');

  // Play sfx
  sfxKatana.play();
  // Play main soundtrack
  soundtrackMain.loop = true;
  soundtrackMain.play();

  // Requests data from the server with an HTTP GET request
  $.getJSON("https://proto.io/en/jobs/candidate-questions/quiz.json", function(response) {
    // Get response
    quiz = response;
    // Get number of questions
    numQuestions = quiz.questions.length;
    // Populate play area (show first question)
    populate();
  });
}

function arraysEqual(arr1, arr2) {
  if(arr1.length !== arr2.length)
    return false;
  for(var i = arr1.length; i--;) {
    if(arr1[i] !== arr2[i])
      return false;
  }
  return true;
}

// Validate answer
function validate() {

  var type = quiz.questions[questionIndex].question_type;
  var questionPoints = quiz.questions[questionIndex].points;
  var answer = quiz.questions[questionIndex].correct_answer;
  maxPoints += questionPoints;
  
  if (type === "mutiplechoice-single") {
    if ( $("#option" + answer).hasClass("active") ) {
      sfxValid.play();
      points += questionPoints;
    }
    else {
      sfxInvalid.play();
      // Highlight wrong answer
      $(".active").removeClass("btn-light");
      $(".active").addClass("btn-danger");
    }
    // Highlight correct answer
    $("#option" + answer).removeClass("btn-light");
    $("#option" + answer).addClass("btn-success");
  }
  else if (type === "mutiplechoice-multiple") {
    
    var ids = [];
    var answerBitVector = [];
    var choiceBitVector = [];
    var firstAnswerId = quiz.questions[questionIndex].possible_answers[0].a_id; 
    var numAnswers = quiz.questions[questionIndex].possible_answers.length;

    var flag;
    for (var  i = firstAnswerId; i < firstAnswerId + numAnswers; i++) {
      
      ids.push(i);

      // Build answer bit vector
      if ( answer.includes(i) ) {
        answerBitVector.push(1);
        // Indicate that the current answer is correct
        flag = true;
        $("#option" + i).removeClass("btn-light");
        $("#option" + i).addClass("btn-success");
      }
      else {
        // Indicate that the current answer is incorrect
        flag = false;
        answerBitVector.push(0);
      }

      // Build choice bit vector
      if ( $("#option" + i).hasClass("active") ) {
        choiceBitVector.push(1);
        // Indicate wrong choice
        if (flag === false) {
          $("#option" + i).removeClass("btn-light");
          $("#option" + i).addClass("btn-danger");
        }
      }
      else {
        choiceBitVector.push(0);
      }
    }

    // Validate 
    var isCorrect;
    if (arraysEqual(answerBitVector, choiceBitVector)) {
      sfxValid.play();
      isCorrect = true;
      points += questionPoints;
    }
    else {
      sfxInvalid.play();
      isCorrect = false;
    }
  }
  else { // True-false 
    var choice;
    if ( $("#true").hasClass("active") ) {
      choice = true;
    }
    else {
      choice = false;
    }
    if (choice === answer) {
      sfxValid.play();
      points += questionPoints;
    }
    else {
      sfxInvalid.play();
      // Highlight wrong answer
      $(".active").removeClass("btn-light");
      $(".active").addClass("btn-danger");
    }
    // Highlight correct answer
    $("#" + answer).removeClass("btn-light");
    $("#" + answer).addClass("btn-success");
  }
};

function showResult(response) {
  // Calculate score as a percentage
  var score = (points / maxPoints) * 100;

  // Choose appropriate message
  var resultID;
  for (var  i = 0; i < response.results.length; i++) {
    if ( score >= response.results[i].minpoints && score <= response.results[i].maxpoints ) {
      resultID = i;
      break;
    }
  }

  // Update DOM
  $(".container").css("background", "#f2b632");
  
  emptyCard();
  $("#card-header").remove();
  $("#card-footer").remove();

  // Show image  
  var formattedImage = HTMLimage.replace("%data%", response.results[resultID].img); // Replace the %data% placeholder text
  $("#card-image").append(formattedImage); // Append image

  // Show score
  console.log(score);
  var formattedScore = HTMLscore.replace(/%data%/g, score);
  $("#card-title").append(formattedScore);

  // Show title
  var formattedTitle = HTMLtitle.replace("%data%", response.results[resultID].title); 
  $("#card-title").append(formattedTitle);

  // Show message
  var formattedMessage = HTMLmessage.replace("%data%", response.results[resultID].message); 
  $("#card-title").append(formattedMessage);
}

function gameover() {

  // Stop main soundtrack
  soundtrackMain.pause();
  soundtrackMain.currentTime = 0;
  // Play gameover soundtrack
  soundtrackEnd.play();

  // Requests data from the server with an HTTP GET request
  $.getJSON("https://proto.io/en/jobs/candidate-questions/result.json", function(response) {
    showResult(response);
  });
}

// Submit & Timeout callback
function submitCallback() {
  
  // Cancel animation frame previously scheduled in populate()
  window.cancelAnimationFrame(timeID);

  // Validate answer
  validate();
  
  // Update points
  $("#points").empty();
  $("#points").append(points);
  
  // Next question
  questionIndex++;

  // Show next question
  if (questionIndex < numQuestions) {
    setTimeout(emptyCard, 3000);
    setTimeout(populate, 3000);
  }
  // Game over
  else {
    gameover();
  }
}

// Attach click event to the submit button.
$("#submit-btn").click(submitCallback);

// Initialize game
init();
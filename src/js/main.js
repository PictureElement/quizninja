var quiz;
var points;
var maxPoints;
var questionIndex;
var secondsLeft;
var previousTimestamp;
var timeID;
var numQuestions;
var progress;
var sfxNinjaStar;
var sfxInvalid;
var sfxValid;
var soundtrackMain;
var soundtrackEnd;

function countdown() {
  // Get timestamp
  var CurrentTimestamp = (new Date()).getTime();

  // Update DOM, if the progress is greater or equal to 1 second
  if (CurrentTimestamp - previousTimestamp >= 1000) {
    secondsLeft--;
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

  // Reset timer
  secondsLeft = 10;
  // Get timestamp
  previousTimestamp = (new Date()).getTime();
  // Start countdown
  countdown();
}

// Empty play area
function emptyPlayArea() {
  $("#card-image").empty();
  $("#card-title").empty();
  $("#card-answers").empty();
}

function init() {
  
  // Initialize variables
  points = 0;
  maxPoints = 0;
  questionIndex = 0;
  secondsLeft = 10;
  progress = 0;
  sfxNinjaStar = new Audio('media/sfx-ninja-star.mp3');
  sfxInvalid = new Audio('media/sfx-invalid-tone.mp3');
  sfxValid = new Audio('media/sfx-valid-tone.mp3');
  soundtrackMain = new Audio('media/soundtrack-main.mp3');
  soundtrackEnd = new Audio('media/soundtrack-end.mp3');

  // Play sfx and main soundtrack
  sfxNinjaStar.play();
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

// Validate submission
function validate() {
  var type = quiz.questions[questionIndex].question_type;
  var questionPoints = quiz.questions[questionIndex].points;
  maxPoints += questionPoints;
  var answer = quiz.questions[questionIndex].correct_answer;
  
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
  console.log(questionIndex);
  // Show next question
  if (questionIndex < numQuestions) {
    setTimeout(emptyPlayArea, 3000);
    setTimeout(populate, 3000);
  }
  // Show results
  else {
    soundtrackMain.pause();
    soundtrackEnd.play();
    $(".container").empty();
    var score = (points / maxPoints) * 100;
    if (score <= 33) {
      $(".container").append("Not good. You are lucky we don't feed your score to the hounds!");
    }
    else if (score <= 66) {
      $(".container").append("An average attempt. Sansa isn't very impressed by your lack of Season 6 knowledge.");
    }
    else {
      $(".container").append("Dragonfire! Daenerys likes your score. You may live.");
    }
  }
}

// Attach click event to the submit button.
$("#submit-btn").click(submitCallback);


init();
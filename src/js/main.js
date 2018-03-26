var quiz;
var score = 0;
var questionIndex = 0;
var secondsLeft = 10;
var previousTimestamp;
var myReq;
var numQuestions;
var progress = 0;
var sfxNinjaStar = new Audio('media/sfx-ninja-star.mp3');
var sfxInvalid = new Audio('media/sfx-invalid-tone.mp3');
var sfxValid = new Audio('media/sfx-valid-tone.mp3');
var soundtrackMain = new Audio('media/soundtrack-main.mp3');

function timer() {
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
    console.log("Timeout!")
    return;
  }
  window.requestAnimationFrame(timer);
}

// Populate play area
function populate() {
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
  myReq = window.requestAnimationFrame(timer);
}

// Empty play area
function empty() {
  $("#card-image").empty();
  $("#card-title").empty();
  $("#card-answers").empty();
}

// Requests data from the server with an HTTP GET request
$.getJSON("https://proto.io/en/jobs/candidate-questions/quiz.json", function(response) {
  sfxNinjaStar.play();
  soundtrackMain.loop = true;
  soundtrackMain.play();
  quiz = response;
  // Get the number of questions
  numQuestions = quiz.questions.length;
  populate();
});

// Validate submission
function validate() {
  var type = quiz.questions[questionIndex].question_type;
  var points = quiz.questions[questionIndex].correct_points;
  var answer = quiz.questions[questionIndex].correct_answer;
  
  if (type === "mutiplechoice-single") {
    if ( $("#option" + answer).hasClass("active") ) {
      //alert("Correct answer");
      sfxValid.play();
      score += points;
    }
    else {
      sfxInvalid.play();
      //alert("Wrong answer");
      // Highlight wrong answer
      $(".active").removeClass("btn-light");
      $(".active").addClass("btn-danger");

    }
    // Highlight correct answer
    $("#option" + answer).removeClass("btn-light");
    $("#option" + answer).addClass("btn-success");
  }
  else if (type === "mutiplechoice-multiple") {
    
    var isCorrect = true;
    
    firstAnswerID = quiz.questions[questionIndex].possible_answers[0].a_id; 
    numAnswers = quiz.questions[questionIndex].possible_answers.length;
    highlightColor = [];

    for (var  i = firstAnswerID; i < firstAnswerID + numAnswers; i++) {
      if ( answer.includes(i) ) {
        highlightColor.push("success");
      }
      else if ( $("#option" + i).hasClass("active") ) {
        isCorrect = false;
        highlightColor.push("danger");
      }
      else {
        highlightColor.push("neutral");
      }
    }

    // Update score
    if (isCorrect) {
      sfxValid.play();
      //alert("Correct answer");
      score += points;
    }
    else {
      sfxInvalid.play();
    }

    // Highlight correct and wrong answers
    var counter = 0;
    for (var  i = firstAnswerID; i < firstAnswerID + numAnswers; i++) {
      switch (highlightColor[counter]) {
        case "success":
          $("#option" + i).removeClass("btn-light");
          $("#option" + i).addClass("btn-success");
          break;
        case "danger":
          $("#option" + i).removeClass("btn-light");
          $("#option" + i).addClass("btn-danger");
      }
      counter++;
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
      //alert("Correct answer");
      sfxValid.play();
      score += points;
    }
    else {
      //alert("Wrong answer");
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
  validate();
  
  // Update progress bar 
  progress = ((questionIndex + 1) / numQuestions) * 100;
  console.log(progress);
  $("#progress-bar").css("width", progress + "%");
  $("#progress-bar").attr("aria-valuenow", progress);

  // Cancel animation frame previously scheduled in populate()
  window.cancelAnimationFrame(myReq);
  
  // Next question
  if (progress !== 100) {
    questionIndex++;
    setTimeout(empty, 3000);
    setTimeout(populate, 3000);
    // Reset countdown
    secondsLeft = 10;
    $("#countdown").empty();
    $("#countdown").append(secondsLeft + "&quot;");
  }
}

// Attach click event to the submit button.
$("#submit-btn").click(submitCallback);

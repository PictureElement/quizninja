var quiz;
var score = 0;
var questionIndex = 0;
var secondsLeft = 10;
var previousTimestamp;
var myReq;
var numQuestions;
var progress = 0;

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
  quiz = response;
  // Get the number of questions
  numQuestions = quiz.questions.length;
  populate();
});


var option1 = $("#option1").hasClass("active");
console.log(option1);

function validate() {

  var type = quiz.questions[questionIndex].question_type;
  var answer = quiz.questions[questionIndex].correct_answer;
  var points = quiz.questions[questionIndex].correct_points;
  
  if (type === "mutiplechoice-single") {
    if ( $("#option" + answer).hasClass("active") ) {
      alert("Correct answer");
      score += points;
    }
    else {
      alert("Wrong answer");
    }
  }
  else if (type === "mutiplechoice-multiple") {
    var isCorrect = true;
    for (var  i = 0; i < answer.length; i++) {
      if ( $("#option" + answer[i]).hasClass("active") ) {
        continue;
      }
      else {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      alert("Correct answer");
      score += points;
    }
    else {
      alert("Wrong answer");
    }
  }
  else {
    var choice;
    if ( $("#true").hasClass("active") ) {
      choice = true;
    }
    else {
      choice = false;
    }
    if (choice === answer) {
      alert("Correct answer");
      score += points;
    }
    else {
      alert("Wrong answer");
    }
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
  // Reset countdown
  secondsLeft = 10;
  $("#countdown").empty();
  $("#countdown").append(secondsLeft + "&quot;");

  // Next question
  if (progress !== 100) {
    empty();
    questionIndex++;
    populate();
  }
}

// Attach click event to the submit button.
$("#submit-btn").click(submitCallback);

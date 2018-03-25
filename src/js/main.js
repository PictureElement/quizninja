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
    alert("Timeout!");
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
      formattedRadio = HTMLradio.replace("%data1%", i+1);
      formattedRadio = formattedRadio.replace("%data2%", quiz.questions[questionIndex].possible_answers[i].caption);
      $("#card-answers").append(formattedRadio);
    }
  }
  else if (questionType === "mutiplechoice-multiple") { // For multiple choice (multiple) use checkbox buttons
    var formattedCheckbox;
    // Show possible answers
    for (var i = 0; i < quiz.questions[questionIndex].possible_answers.length; i++) {
      formattedCheckbox = HTMLcheckbox.replace("%data1%", i+1);
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

// Attach click event to the submit button.
$("#submit-btn").click(function() {
  questionIndex++;

  // Update progress bar
  progress = (questionIndex / numQuestions) * 100;
  $("#progress-bar").css("width", progress + "%");
  $("#progress-bar").attr("aria-valuenow", progress);

  // Cancel animation frame previously scheduled in populate()
  window.cancelAnimationFrame(myReq);
  // Reset countdown
  secondsLeft = 10;
  $("#countdown").empty();
  $("#countdown").append(secondsLeft + "&quot;");

  var option1 = $("#option1").hasClass("active");
  console.log(option1);

  // Next question
  if (progress !== 100) {
    empty();
    populate();
  }
});

//The .hasClass() method will return true if the class is assigned to an element,
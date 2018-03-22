// Populate play area
function populate(quiz) {
  
  var score = 0;
  var currentQuestionIndex = 0;
  
  // Get question type
  var questionType = quiz.questions[currentQuestionIndex].question_type;

  // Show image  
  var formattedImage = HTMLimage.replace("%data%", quiz.questions[currentQuestionIndex].img); // Replace the %data% placeholder text
  $("#card-image").append(formattedImage); // Append image

  // Show question
  var formattedQuestion = HTMLquestion.replace("%data%", quiz.questions[currentQuestionIndex].title); 
  $("#card-body").prepend(formattedQuestion);

  // Show possible answers
  if (questionType === "mutiplechoice-single") { // For multiple choice (single) use radio buttons
    var formattedRadio;
    // Show possible answers
    for (var i = 0; i < quiz.questions[currentQuestionIndex].possible_answers.length; i++) {
      formattedRadio = HTMLradio.replace("%data1%", i+1);
      formattedRadio = formattedRadio.replace("%data2%", quiz.questions[currentQuestionIndex].possible_answers[i].caption);
      $("#card-answers").append(formattedRadio);
    }
  }
  else if (questionType === "mutiplechoice-multiple") { // For multiple choice (multiple) use checkbox buttons
    var formattedCheckbox;
    // Show possible answers
    for (var i = 0; i < quiz.questions[currentQuestionIndex].possible_answers.length; i++) {
      formattedCheckbox = HTMLcheckbox.replace("%data1%", i+1);
      formattedCheckbox = formattedCheckbox.replace("%data2%", quiz.questions[currentQuestionIndex].possible_answers[i].caption);
      $("#card-answers").append(formattedCheckbox);
    }
  }
  else { // For true-false use radio buttons as well
    $("#card-answers").append(HTMLfalse);
    $("#card-answers").append(HTMLtrue);
  }


}

// Quiz object
var quiz;

// Requests data from the server with an HTTP GET request
$.getJSON("https://proto.io/en/jobs/candidate-questions/quiz.json", function(response) {
  populate(response);
});
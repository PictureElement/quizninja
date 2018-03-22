// Populate play area
function populate(quiz) {
  var score = 0;
  var currentQuestionIndex = 0;

  // Replace the %data% placeholder text
  var formattedCardImage = HTMLcardImage.replace("%data%", quiz.questions[currentQuestionIndex].img);
  // Append image
  $("#card-image").append(formattedCardImage);
}

// Quiz object
var quiz;

// Requests data from the server with an HTTP GET request
$.getJSON("https://proto.io/en/jobs/candidate-questions/quiz.json", function(response) {
  populate(response);
});
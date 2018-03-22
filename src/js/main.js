// Populate play area
function populate(quiz) {
  
  var score = 0;
  var currentQuestionIndex = 0;
  
  // Show image  
  var formattedImage = HTMLimage.replace("%data%", quiz.questions[currentQuestionIndex].img); // Replace the %data% placeholder text
  $("#card-image").append(formattedImage); // Append image

  // Show question
  var formattedQuestion = HTMLquestion.replace("%data%", quiz.questions[currentQuestionIndex].title); 
  $("#card-body").append(formattedQuestion);

  
}

// Quiz object
var quiz;

// Requests data from the server with an HTTP GET request
$.getJSON("https://proto.io/en/jobs/candidate-questions/quiz.json", function(response) {
  populate(response);
});
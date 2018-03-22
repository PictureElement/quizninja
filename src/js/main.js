// Populate play area
function populate(quiz) {
  
  var score = 0;
  var currentQuestionIndex = 0;
  var 
  
  // Show image  
  var formattedImage = HTMLimage.replace("%data%", quiz.questions[currentQuestionIndex].img); // Replace the %data% placeholder text
  $("#card-image").append(formattedImage); // Append image

  // Show question
  var formattedQuestion = HTMLquestion.replace("%data%", quiz.questions[currentQuestionIndex].title); 
  $("#card-body").prepend(formattedQuestion);

  // Show possible answers
  for (var i = 0; i < quiz.questions[currentQuestionIndex].possible_answers.length; i++) {
    
  }



}

// Quiz object
var quiz;

// Requests data from the server with an HTTP GET request
$.getJSON("https://proto.io/en/jobs/candidate-questions/quiz.json", function(response) {
  populate(response);
});
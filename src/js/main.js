// Quiz ctor
function Quiz(questions, id, title, description) {
  this.questions = questions;
  this.id = id;
  this.title = title;
  this.description = description;
  this.currentQuestionIndex = 0;
  this.score = 0;
}

// Quiz object
var quiz;

// Requests data from the server with an HTTP GET request when the 'Play Now' button is clikced
$("#play-btn").click(function() {
  $.getJSON("https://proto.io/en/jobs/candidate-questions/quiz.json", function(response) {
    var questions = new Array();
    $(response.questions).each(function(index, value) {
      questions.push(value);
    });
    // Initialize the quiz object
    quiz = new Quiz(questions, response.quiz_id, response.title, response.description);
  });
});






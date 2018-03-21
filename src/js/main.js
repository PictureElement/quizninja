// Quiz ctor
function Quiz(questions, id, title, description) {
  this.questions = questions;
  this.id = id;
  this.title = title;
  this.description = description;
  this.currentQuestionIndex = 0;
  this.score = 0;
}

function populate() {
  var 
}

$(document).ready(function() {
    $("#play-btn").click(function() {
      $.ajax({
        method: "GET",
        url: "https://proto.io/en/jobs/candidate-questions/quiz.json",
        dataType: "json",
        // Disallow use of cached results
        cache: "false",
        // Callback option is invoked, if the request fails.
        //error
        // Callback option is invoked, if the request succeeds.
        success: function(data) {
          quizData = data;    
        }
      });
    });
});

var id = quizData.quiz_id;
var title = quizData.title;
var description = quizData.description;
var questions = new Array();
// Initialize 'questions' array
$(quizData.questions).each(function(index, value) {
  questions.push(value);
});

// Create quiz
var quiz = new Quiz(questions, id, title, description);


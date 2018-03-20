// Object
var quiz = new Object();
// Array of objects
var questions = new Array();

// Run once the DOM is ready
$(document).ready(function() {
  // Perform an AJAX (asynchronous HTTP) request
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
      // Initialize 'quiz' object
      quiz.id = data.quiz_id;
      quiz.title = data.title;
      quiz.description = data.description;
      // Initialize 'questions' array
      $(data.questions).each(function(index, value) {
        questions.push(value);
      });
    }
  });
});

console.log(quiz);
console.log(questions);
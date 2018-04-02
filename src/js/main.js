// Global variables
var quizUrl = "https://proto.io/en/jobs/candidate-questions/quiz.json";
var quiz;
var points;
var maxPoints;
var questionIndex;
var secondsLeft;
var previousTimestamp;
var requestID;
var timeoutID1;
var timeoutID2;
var timeoutID3;
var numQuestions;
var progress;
var questionImages = [];
var score;
var resultID;

// Audio variables
var sfxCountdown = new Audio('media/sfx-countdown.mp3');
var sfxInvalid = new Audio('media/sfx-invalid-tone.mp3');
var sfxValid = new Audio('media/sfx-valid-tone.mp3');
var sfxPlay = new Audio('media/sfx-katana.mp3');
var soundtrackMain = new Audio('media/soundtrack-main.mp3');
soundtrackMain.loop = true;
soundtrackMain.volume = 0.5;
var soundtrackEnd = new Audio('media/soundtrack-end.mp3');

function countdown() {
  // Get current timestamp
  var currentTimestamp = (new Date()).getTime();

  // Update DOM, if the progress is greater or equal to 1 second
  if (currentTimestamp - previousTimestamp >= 1000) {
    secondsLeft--;
    // Play 3-second countdown sfx
    if (secondsLeft === 3) {
      sfxCountdown.play();
    }
    previousTimestamp = currentTimestamp;
    $("#countdown").empty();
    $("#countdown").append(secondsLeft+"&quot;");
  }
  if (secondsLeft === 0) {
    submitCallback();
  }
  else {
    requestID = requestAnimationFrame(countdown);
  }
}

function showQuestion() {
  // Reset timer
  secondsLeft = 10;

  // Update timer 
  $("#countdown").empty();
  $("#countdown").append(secondsLeft+"&quot;");
  
  // Update progress bar 
  progress = (questionIndex / numQuestions) * 100;
  $("#play-progress-bar").css("width", progress + "%");
  $("#play-progress-bar").attr("aria-valuenow", progress);

  // Get question type
  var questionType = quiz.questions[questionIndex].question_type;

  // Show image
  $("#play-image").append(questionImages[questionIndex]); // Append image

  // Show question
  var formattedPlayQuestion = HTMLplayQuestion.replace("%data%", quiz.questions[questionIndex].title); 
  $("#play-title").append(formattedPlayQuestion);

  if (questionType === "mutiplechoice-single") { // For multiple choice (single) use radio buttons
    var formattedPlayRadio;
    // Show possible answers
    for (var i = 0; i < quiz.questions[questionIndex].possible_answers.length; i++) {
      formattedPlayRadio = HTMLplayRadio.replace("%data1%", quiz.questions[questionIndex].possible_answers[i].a_id);
      formattedPlayRadio = formattedPlayRadio.replace("%data2%", quiz.questions[questionIndex].possible_answers[i].caption);
      $("#play-answers").append(formattedPlayRadio);
    }
  }
  else if (questionType === "mutiplechoice-multiple") { // For multiple choice (multiple) use checkbox buttons
    var formattedPlayCheckbox;
    // Show possible answers
    for (var i = 0; i < quiz.questions[questionIndex].possible_answers.length; i++) {
      formattedPlayCheckbox = HTMLplayCheckbox.replace("%data1%", quiz.questions[questionIndex].possible_answers[i].a_id);
      formattedPlayCheckbox = formattedPlayCheckbox.replace("%data2%", quiz.questions[questionIndex].possible_answers[i].caption);
      $("#play-answers").append(formattedPlayCheckbox);
    }
  }
  else { // For true-false use radio buttons as well
    // Show possible answers
    $("#play-answers").append(HTMLplayRadioFalse);
    $("#play-answers").append(HTMLplayRadioTrue);
  }

  // Get timestamp
  previousTimestamp = (new Date()).getTime();
  // Start countdown
  countdown();
}

// Clear current question 
function clearQuestion() {
  $("#play-image").empty();
  $("#play-title").empty();
  $("#play-answers").empty();
}

function createHomepage() {
  if (window.confirm("Return to homepage?")) {
    // Cancel timeouts previously established in submitCallback()
    window.clearTimeout(timeoutID1);
    window.clearTimeout(timeoutID2);
    window.clearTimeout(timeoutID3);
    // Cancel animation frame previously scheduled in showQuestion()
    window.cancelAnimationFrame(requestID);
    // Stop and reset possible running soundtracks
    soundtrackMain.pause();
    soundtrackMain.currentTime = 0;
    soundtrackEnd.pause();
    soundtrackEnd.currentTime = 0;
    sfxCountdown.pause();
    sfxCountdown.currentTime = 0;

    $(".container").empty();
    $(".container").removeClass("border border-dark rounded p-4");
    $(".jumbotron").css("background", "linear-gradient(to right, rgba(242,182,50,0.95), rgba(242,145,49,0.95))");
    $(".jumbotron").removeClass("text-white");
    $(".container").append(HTMLhomeHeader);
    $(".container").append(HTMLhomeFooter);
  }
}

function createPlayPage() {
  // Play sfx
  sfxPlay.play();
  // Play main soundtrack
  soundtrackMain.play();

  $(".container").empty();
  $(".jumbotron").css("background", "#343a40");
  $(".jumbotron").addClass("text-white");
  $(".container").append(HTMLplayHeader);
  $(".container").append(HTMLplayImageWrapper);
  $(".container").append(HTMLplayTitleWrapper);
  $(".container").append(HTMLplayAnswersWrapper);
  $(".container").append(HTMLplayButtons);
  $(".container").append(HTMLplayProgressBar);
}

function init(quizUrl) {
  // Initialize variables
  points = 0;
  maxPoints = 0;
  questionIndex = 0;
  progress = 0;
  score = 0;
  
  // Requests data from the server with an HTTP GET request
  $.getJSON(quizUrl, function(response) {
    // Get response
    quiz = response;
    // Get number of questions
    numQuestions = quiz.questions.length;

    // Load images
    var img, imgUrl;
    for (var i = 0; i < numQuestions; i++) {
      img = $('<img class="img-fluid img-thumbnail" alt="placeholder">');
      // Serve over https (GitHub pages)
      imgUrl = quiz.questions[i].img.replace("http", "https");
      img.attr('src', imgUrl);
      questionImages.push(img);
    }

    /* 
      The following execution order is supposed to be guaranteed. Under section
      6.3 (Timers), the setTimeout() method must wait until any invocations of 
      this algorithm started before this one whose timeout is equal to or less 
      than this one's have completed.
    */
    // Create play area
    setTimeout(createPlayPage, 3000);
    // Populate play area (show first question)
    setTimeout(showQuestion, 3000);
  });
}

function arraysEqual(arr1, arr2) {
  if(arr1.length !== arr2.length)
    return false;
  for(var i = arr1.length; i--;) {
    if(arr1[i] !== arr2[i])
      return false;
  }
  return true;
}

// Validate answer
function validate() {
  var type = quiz.questions[questionIndex].question_type;
  var questionPoints = quiz.questions[questionIndex].points;
  var answer = quiz.questions[questionIndex].correct_answer;
  maxPoints += questionPoints;
  
  // Type: multiplechoice single
  if (type === "mutiplechoice-single") {
    if ( $("#option" + answer).hasClass("active") ) {
      sfxValid.play();
      points += questionPoints;
    }
    else {
      sfxInvalid.play();
      // Highlight wrong answer
      $(".active").removeClass("btn-light");
      $(".active").addClass("btn-danger");
    }
    // Highlight correct answer
    $("#option" + answer).removeClass("btn-light");
    $("#option" + answer).addClass("btn-success");
  }
  // Type: multiplechoice multiple
  else if (type === "mutiplechoice-multiple") {
    var ids = [];
    var answerBitVector = [];
    var choiceBitVector = [];
    var firstAnswerId = quiz.questions[questionIndex].possible_answers[0].a_id; 
    var numAnswers = quiz.questions[questionIndex].possible_answers.length;

    var flag;
    for (var  i = firstAnswerId; i < firstAnswerId + numAnswers; i++) {
      
      ids.push(i);

      // Build answer bit vector
      if ( answer.includes(i) ) {
        answerBitVector.push(1);
        // Indicate that the current answer is correct
        flag = true;
        $("#option" + i).removeClass("btn-light");
        $("#option" + i).addClass("btn-success");
      }
      else {
        // Indicate that the current answer is incorrect
        flag = false;
        answerBitVector.push(0);
      }

      // Build choice bit vector
      if ( $("#option" + i).hasClass("active") ) {
        choiceBitVector.push(1);
        // Indicate wrong choice
        if (flag === false) {
          $("#option" + i).removeClass("btn-light");
          $("#option" + i).addClass("btn-danger");
        }
      }
      else {
        choiceBitVector.push(0);
      }
    }
    // Validate 
    var isCorrect;
    if (arraysEqual(answerBitVector, choiceBitVector)) {
      sfxValid.play();
      isCorrect = true;
      points += questionPoints;
    }
    else {
      sfxInvalid.play();
      isCorrect = false;
    }
  }
  // Type: true-false
  else {
    var choice;
    if ( $("#true").hasClass("active") ) {
      choice = true;
    }
    else {
      choice = false;
    }
    if (choice === answer) {
      sfxValid.play();
      points += questionPoints;
    }
    else {
      sfxInvalid.play();
      // Highlight wrong answer
      $(".active").removeClass("btn-light");
      $(".active").addClass("btn-danger");
    }
    // Highlight correct answer
    $("#" + answer).removeClass("btn-light");
    $("#" + answer).addClass("btn-success");
  }
}

function createGameOverPage(response, gameOverImage) {
  // Stop main soundtrack
  soundtrackMain.pause();
  soundtrackMain.currentTime = 0;
  // Play gameover soundtrack
  soundtrackEnd.play();

  // Update DOM
  $(".jumbotron").css("background", "linear-gradient(to right, rgba(242,182,50,0.95), rgba(242,145,49,0.95))");
  $(".jumbotron").removeClass("text-white");
  $(".container").empty();
  $(".container").addClass("border border-dark rounded p-4");
  $(".container").append("<header></header>");
  $(".container").append("<footer></footer>");

  // Show score
  var formattedGameOverProgressBar = HTMLgameOverProgressBar.replace(/%data%/g, score.toFixed(2));
  $("header").append(formattedGameOverProgressBar);

  // Show image
  $("header").append(gameOverImage);

  // Show title
  var formattedGameOverTitle = HTMLgameOverTitle.replace("%data%", response.results[resultID].title); 
  $("header").append(formattedGameOverTitle);

  // Show message
  var formattedGameOverMessage = HTMLgameOverMessage.replace("%data%", response.results[resultID].message); 
  $("header").append(formattedGameOverMessage);

  // Show RTH button
  $("footer").append(HTMLgameOverRthButton);
}

// Submit & Timeout callback
function submitCallback() {
  // Cancel animation frame previously scheduled in showQuestion()
  window.cancelAnimationFrame(requestID);

  // Validate answer
  validate();
  
  // Update points
  $("#points").empty();
  $("#points").append(points);
  
  // Next question
  questionIndex++;

  // Show next question
  if (questionIndex < numQuestions) {
    timeoutID1 = setTimeout(clearQuestion, 3000);
    timeoutID2 = setTimeout(showQuestion, 3000);
  }
  // Game over
  else {
    // Requests data from the server with an HTTP GET request
    $.getJSON("https://proto.io/en/jobs/candidate-questions/result.json", function(response) {
      
      // Calculate score as a percentage
      score = (points / maxPoints) * 100;

      // Choose appropriate result message
      resultID;
      for (var  i = 0; i < response.results.length; i++) {
        if ( score >= response.results[i].minpoints && score <= response.results[i].maxpoints ) {
          resultID = i;
          break;
        }
      }

      // Load appropriate game over image
      var gameOverImage = $(HTMLgameOverImage);
      gameOverImage.attr('src', response.results[resultID].img);
      
      timeoutID3 = setTimeout(function() {
        createGameOverPage(response, gameOverImage);
      }, 3000);
    });
  }
}

// Attach click event to the submit button (event delegation)
$('.container').on("click", "#submit-btn", submitCallback);

// Attach click event to the home button (event delegation)
$('.container').on("click", "#home-btn", createHomepage);

// Attach click event to the play button (event delegation)
$(".container").on("click", "#play-btn", function() {
  init(quizUrl);
});
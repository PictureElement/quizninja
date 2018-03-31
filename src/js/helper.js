// These are HTML strings. I'll be using JavaScript to replace the %data% 
// placeholder text you see in them.

// PLAY PAGE
var HTMLplayHeader = '<div class="play-header rounded px-3 py-2 mb-2 bg-secondary"><span class="badge badge-dark px-3 py-2"><i class="fa fa-film" aria-hidden="true"></i> MOVIES</span><span id="countdown" class="countdown badge badge-warning">0</span></div>';
var HTMLplayImageWrapper = '<div id="play-image"></div>';
var HTMLplayTitleWrapper = '<div id="play-title" class="bg-primary px-4 py-3 my-2 rounded"></div>';
var HTMLplayAnswersWrapper = '<div id="play-answers" class="btn-group-toggle" data-toggle="buttons"></div>';
var HTMLplayButtons = '<div class="play-buttons"><div><button id="home-btn" type="button" class="btn btn-danger"><i class="fa fa-home" aria-hidden="true"></i> Home</button><button id="submit-btn" type="button" class="btn btn-success ml-2"><i class="fa fa-check" aria-hidden="true"></i> Submit</button></div><span id="points" class="points badge badge-info">0</span></div>';
var HTMLplayProgressBar = '<div class="progress mt-2" style="height: 5px;"><div id="play-progress-bar" class="progress-bar bg-primary" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>';
var HTMLplayQuestion = '<p class="p-0 m-0 text-center">%data%</p>';
var HTMLplayRadio = '<label id="option%data1%" class="mb-2 btn btn-block btn-light"><input type="radio" autocomplete="off" name="options"> %data2%</label>';
var HTMLplayCheckbox = '<label id="option%data1%" class="mb-2 btn btn-block btn-light"><input type="checkbox" autocomplete="off" name="options"> %data2%</label>';
var HTMLplayRadioFalse = '<label id="false" class="mb-2 btn btn-block btn-light"><input type="radio" autocomplete="off" name="options"> False</label>';
var HTMLplayRadioTrue = '<label id="true" class="mb-2 btn btn-block btn-light"><input type="radio" autocomplete="off" name="options"> True</label>';

// GAMEOVER PAGE
var HTMLgameOverProgressBar = '<div class="progress mb-3"><div class="progress-bar bg-dark" role="progressbar" style="width: %data%%;" aria-valuenow="%data%" aria-valuemin="0" aria-valuemax="100">%data%%</div></div>';
var HTMLgameOverTitle = '<h1 class="gameover-title mt-2">%data%</h1>';
var HTMLgameOverMessage = '<p>%data%</p>';
var HTMLgameOverRthButton = '<button id="home-btn" type="button" class="btn btn-dark"><i class="fa fa-home" aria-hidden="true"></i> Home</button>';
var HTMLgameOverImage = '<img class="img-fluid rounded" src="%data%" alt="placeholder">';

// HOME PAGE
var HTMLhomeHeader = '<header><img src="media/logo.svg" width="100" alt="app logo"><h1 class="display-4 app-title">QuizNinja</h1><p>Test your knowledge on various topics in this traditional style trivia game. Challenge friends and family to fun questions. Find out if you got the skills to be a quizninja!</p><a href="https://github.com/PictureElement" class="badge badge-dark px-3 py-2"><i class="fa fa-github" aria-hidden="true"></i> Follow @PictureElement</a><a href="https://github.com/PictureElement/quizninja" class="badge badge-dark px-3 py-2 ml-2"><i class="fa fa-star" aria-hidden="true"></i> Star</a><hr class="my-4 mx-3"><button aria-label="play" id="play-btn" type="button" class="play-btn btn btn-dark mb-4 mx-auto"><i class="fa fa-play" aria-hidden="true"></i></button></header>';
var HTMLhomeFooter = '<footer><a href="https://pictureelement.github.io/portfolio-2/"><i class="fa fa-code" style="font-size:20px;font-weight:bold;" aria-hidden="true"></i> with <i class="fa fa-heart" style="font-size:16px;font-weight:bold;" aria-hidden="true"></i> by <span style="font-weight:bold;">PictureElement</span></a></footer>';

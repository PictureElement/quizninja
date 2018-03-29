// These are HTML strings. I'll be using JavaScript to replace the %data% 
// placeholder text you see in them.

// PLAY PAGE
var HTMLcardHeader = '<div id="card-header" class="card-header rounded px-3 py-2 mb-2 bg-secondary"><span class="badge badge-dark px-3 py-2"><i class="fa fa-film" aria-hidden="true"></i> MOVIES</span><span id="countdown" class="countdown badge badge-warning">0</span></div>';
var HTMLcardImageWrapper = '<div id="card-image" class="card-image"></div>';
var HTMLcardTitleWrapper = '<div id="card-title" class="bg-primary px-4 py-3 my-2 rounded"></div>';
var HTMLanswersWrapper = '<div id="card-answers" class="btn-group-toggle" data-toggle="buttons"></div>';
var HTMLcardButtons = '<div class="card-buttons"><div><button id="home-btn" type="button" class="btn btn-danger"><i class="fa fa-home" aria-hidden="true"></i> Home</button><button id="submit-btn" type="button" class="btn btn-success ml-2"><i class="fa fa-check" aria-hidden="true"></i> Submit</button></div><span id="points" class="points badge badge-info">0</span></div>';
var HTMLcardProgressBar = '<div class="progress mt-2" style="height: 5px;"><div id="progress-bar" class="progress-bar bg-primary" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>';
var HTMLimage = '<img class="img-fluid img-thumbnail" src="%data%" alt="placeholder">';
var HTMLquestion = '<p class="p-0 m-0 text-center">%data%</p>';
// Multiple choice (single)
var HTMLradio = '<label id="option%data1%" class="mb-2 btn btn-block btn-light"><input type="radio" autocomplete="off" name="options"> %data2%</label>';
// Multiple choice (multiple)
var HTMLcheckbox = '<label id="option%data1%" class="mb-2 btn btn-block btn-light"><input type="checkbox" autocomplete="off" name="options"> %data2%</label>';
// True-false
var HTMLfalse = '<label id="false" class="mb-2 btn btn-block btn-light"><input type="radio" autocomplete="off" name="options"> False</label>';
var HTMLtrue = '<label id="true" class="mb-2 btn btn-block btn-light"><input type="radio" autocomplete="off" name="options"> True</label>';

// GAMEOVER PAGE
var HTMLscore = '<div class="progress"><div class="progress-bar" role="progressbar" style="width: %data%%;" aria-valuenow="%data%" aria-valuemin="0" aria-valuemax="100">%data%%</div></div>';
var HTMLtitle = '<h5 class="bg-success text-center text-uppercase">%data%</h5>';
var HTMLmessage = '<p class="p-3 m-0 text-center">%data%</p>';

// HOME PAGE
var HTMLhomeHeader = '<header id="home-header"><img src="media/logo.svg" width="100" alt="app logo"><h1 class="display-4 app-title">QuizNinja</h1><p>Test your knowledge on various topics in this traditional style trivia game. Challenge friends and family to fun questions. Find out if you got the skills to be a quizninja!</p><a href="https://github.com/PictureElement" class="badge badge-dark px-3 py-2"><i class="fa fa-github" aria-hidden="true"></i> Follow @PictureElement</a><a href="https://github.com/PictureElement/quizninja" class="badge badge-dark px-3 py-2 ml-2"><i class="fa fa-star" aria-hidden="true"></i> Star</a><hr class="my-4 mx-3"><button aria-label="play" id="play-btn" type="button" class="play-btn btn btn-dark mb-4 mx-auto"><i class="fa fa-play" aria-hidden="true"></i></button></header>';
var HTMLhomeFooter = '<footer id="home-footer"><a href="https://pictureelement.github.io/portfolio-2/"><i class="fa fa-code" style="font-size:20px;font-weight:bold;" aria-hidden="true"></i> with <i class="fa fa-heart" style="font-size:16px;font-weight:bold;" aria-hidden="true"></i> by <span style="font-weight:bold;">PictureElement</span></a></footer>';

// These are HTML strings. I'll be using JavaScript to replace the %data% 
// placeholder text you see in them.

// Common
var HTMLimage = '<img class="img-fluid rounded" src="%data%" alt="placeholder">';
var HTMLquestion = '<p class="p-3 m-0 text-center">%data%</p>';

// Multiple choice (single)
var HTMLradio = '<label id="option%data1%" class="mb-2 btn btn-block btn-light"><input type="radio" autocomplete="off" name="options"> %data2%</label>';

// Multiple choice (multiple)
var HTMLcheckbox = '<label id="option%data1%" class="mb-2 btn btn-block btn-light"><input type="checkbox" autocomplete="off" name="options"> %data2%</label>';

// True-false
var HTMLfalse = '<label id="false" class="mb-2 btn btn-block btn-light"><input type="radio" autocomplete="off" name="options"> False</label>';
var HTMLtrue = '<label id="true" class="mb-2 btn btn-block btn-light"><input type="radio" autocomplete="off" name="options"> True</label>';

// Gameover
var HTMLscore = '<div class="progress"><div class="progress-bar" role="progressbar" style="width: %data%%;" aria-valuenow="%data%" aria-valuemin="0" aria-valuemax="100">%data%%</div></div>';
var HTMLtitle = '<h5 class="bg-success text-center text-uppercase">%data%</h5>';
var HTMLmessage = '<p class="p-3 m-0 text-center">%data%</p>';

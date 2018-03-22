// These are HTML strings. I'll be using JavaScript to replace the %data% 
// placeholder text you see in them.

// Common
var HTMLcardImage = '<img class="img-fluid rounded" src="%data%" alt="placeholder">';
var HTMLquestion = '<p class="p-3 m-0 text-center">%data%</p>';

// Multiple choice (single)
var HTMLmultipleChoiceSingleButton1 = '<input type="radio" autocomplete="off" name="options" id="option1" value="1"> %data%';
var HTMLmultipleChoiceSingleButton2 = '<input type="radio" autocomplete="off" name="options" id="option2" value="2"> %data%';
var HTMLmultipleChoiceSingleButton3 = '<input type="radio" autocomplete="off" name="options" id="option3" value="3"> %data%';
var HTMLmultipleChoiceSingleButton4 = '<input type="radio" autocomplete="off" name="options" id="option4" value="4"> %data%';

// Multiple choice (multiple)

// True-false
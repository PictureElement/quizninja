// These are HTML strings. I'll be using JavaScript to replace the %data% 
// placeholder text you see in them.

// Common
var HTMLimage = '<img class="img-fluid rounded" src="%data%" alt="placeholder">';
var HTMLquestion = '<p class="p-3 m-0 text-center">%data%</p>';

// Multiple choice (single)
var HTMLradio1 = '<input type="radio" autocomplete="off" name="options" id="option1" value="1"> %data%';
var HTMLradio2 = '<input type="radio" autocomplete="off" name="options" id="option2" value="2"> %data%';
var HTMLradio3 = '<input type="radio" autocomplete="off" name="options" id="option3" value="3"> %data%';
var HTMLradio4 = '<input type="radio" autocomplete="off" name="options" id="option4" value="4"> %data%';

// Multiple choice (multiple)
var HTMLcheckbox1 = '<input type="checkbox" autocomplete="off" name="options" id="option1" value="1"> %data%';
var HTMLcheckbox2 = '<input type="checkbox" autocomplete="off" name="options" id="option2" value="2"> %data%';
var HTMLcheckbox3 = '<input type="checkbox" autocomplete="off" name="options" id="option3" value="3"> %data%';
var HTMLcheckbox4 = '<input type="checkbox" autocomplete="off" name="options" id="option4" value="4"> %data%';

// True-false
var HTMLradioTrue = '<input type="radio" autocomplete="off" name="options" id="option1" value="1"> True';
var HTMLradioFalse = '<input type="radio" autocomplete="off" name="options" id="option2" value="2"> False';
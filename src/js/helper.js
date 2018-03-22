// These are HTML strings. I'll be using JavaScript to replace the %data% 
// placeholder text you see in them.

// Common
var HTMLimage = '<img class="img-fluid rounded" src="%data%" alt="placeholder">';
var HTMLquestion = '<p class="p-3 m-0 text-center">%data%</p>';

// Multiple choice (single)
var HTMLradio1 = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="radio" autocomplete="off" name="options" id="option1" value="1"> %data%</label>';
var HTMLradio2 = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="radio" autocomplete="off" name="options" id="option2" value="2"> %data%</label>';
var HTMLradio3 = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="radio" autocomplete="off" name="options" id="option3" value="3"> %data%</label>';
var HTMLradio4 = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="radio" autocomplete="off" name="options" id="option4" value="4"> %data%</label>';

// Multiple choice (multiple)
var HTMLcheckbox1 = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="checkbox" autocomplete="off" name="options" id="option1" value="1"> %data%</label>';
var HTMLcheckbox2 = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="checkbox" autocomplete="off" name="options" id="option2" value="2"> %data%</label>';
var HTMLcheckbox3 = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="checkbox" autocomplete="off" name="options" id="option3" value="3"> %data%</label>';
var HTMLcheckbox4 = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="checkbox" autocomplete="off" name="options" id="option4" value="4"> %data%</label>';

// True-false
var HTMLfalse = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="radio" autocomplete="off" name="options" id="false" value="0"> %data%</label>';
var HTMLtrue = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="radio" autocomplete="off" name="options" id="true" value="1"> %data%</label>';
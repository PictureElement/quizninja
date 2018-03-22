// These are HTML strings. I'll be using JavaScript to replace the %data% 
// placeholder text you see in them.

// Common
var HTMLimage = '<img class="img-fluid rounded" src="%data%" alt="placeholder">';
var HTMLquestion = '<p class="p-3 m-0 text-center">%data%</p>';

// Multiple choice (single)
var HTMLradio = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="radio" autocomplete="off" name="options" id="option%data1%" value="%data1%"> %data2%</label>';

// Multiple choice (multiple)
var HTMLcheckbox = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="checkbox" autocomplete="off" name="options" id="option%data1%" value="%data1%"> %data2%</label>';

// True-false
var HTMLfalse = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="radio" autocomplete="off" name="options" id="false" value="0"> False</label>';
var HTMLtrue = '<label class="mb-2 btn btn-sm btn-block btn-primary"><input type="radio" autocomplete="off" name="options" id="true" value="1"> True</label>';
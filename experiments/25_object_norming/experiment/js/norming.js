// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function make_slides(f) {
  var   slides = {};
// 	preload(
// ["images/bathrobe.png","images/belt.jpg"],
// {after: function() { console.log("everything's loaded now") }}
// )  

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.objecttrial = slide({
    name : "objecttrial",
    present : exp.all_stims,
    start : function() {
	$(".err").hide();
    },
      present_handle : function(stim) {
    	this.trial_start = Date.now();
    	this.init_sliders();
      exp.sliderPost = {};
	//$("#objectlabel").val("");	
	  this.stim = stim;
    stim.item = _.shuffle(stim.item);
	  console.log(this.stim);
   //  console.log(stim.item);
   //  console.log(stim.label);
	var contextsentence = "How typical is this object for "+stim.item[0]+"?";
	//var contextsentence = "How typical is this for "+stim.basiclevel+"?";
	//var objimagehtml = '<img src="images/'+stim.basiclevel+'/'+stim.item+'.jpg" style="height:190px;">';
	var objimagehtml = '<img src="images/'+stim.label+'.png" style="height:190px;">';

	$("#contextsentence").html(contextsentence);
	$("#objectimage").html(objimagehtml);
	  console.log(this);
	},
	button : function() {
	  if (exp.sliderPost > -1 && exp.sliderPost < 16) {
        $(".err").hide();
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
        //$("#number_guess").html(Math.round(ui.value*N));
      });
    },
    log_responses : function() {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "utterance": this.stim.item[0],
          "object": this.stim.label,
          "rt" : Date.now() - _s.trial_start,
	      "response" : exp.sliderPost
        });
    }
 //     $(".contbutton").click(function() {
	//   var ok_to_go_on = true;
	//   console.log($("#objectlabel").val());
	//   if ($("#objectlabel").val().length < 2) {
	//   	ok_to_go_on = false;
	//   }
 //      if (ok_to_go_on) {
	// $(".contbutton").unbind("click");      	
	// stim.objectlabel = $("#objectlabel").val();         	
 //        exp.data_trials.push({
     //      "basiclevel" : stim.basiclevel,
     //      "slide_number_in_experiment" : exp.phase,
     //      "item": stim.item,
     //        "rt" : Date.now() - _s.trial_start,
	    // "response" : stim.objectlabel
 //        });
 //          $(".err").hide();
 //          _stream.apply(_s); 
 //      } else {
 //        $(".err").show();
 //      }
	// });
	  
    //  },
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

	var items_target = _.shuffle([

{
"label": "avocado_black",
"item": ["avocado"]
},
{
"label": "avocado_green",
"item": ["avocado"]
},
{
"label": "avocado_red",
"item": ["avocado"]
},
{
"label": "apple_blue",
"item": ["apple"]
},
{
"label": "apple_red",
"item": ["apple"]
},
{
"label": "apple_green",
"item": ["apple"]
},
{
"label": "banana_blue",
"item": ["banana"]
},
{
"label": "banana_brown",
"item": ["banana"]
},
{
"label": "banana_yellow",
"item": ["banana"]
},
{
"label": "carrot_orange",
"item": ["carrot"]
},
{
"label": "carrot_pink",
"item": ["carrot"]
},
{
"label": "carrot_purple",
"item": ["carrot"]
},
{
"label": "pear_green",
"item": ["pear"]
},
{
"label": "pear_orange",
"item": ["pear"]
},
{
"label": "pear_yellow",
"item": ["pear"]
},
{
"label": "pepper_green",
"item": ["pepper"]
},
{
"label": "pepper_orange",
"item": ["pepper"]
},
{
"label": "pepper_red",
"item": ["pepper"]
},
{
"label": "tomato_green",
"item": ["tomato"]
},
{
"label": "tomato_pink",
"item": ["tomato"]
},
{
"label": "tomato_red",
"item": ["tomato"]
},


{
"label": "avocado_black",
"item": ["apple", "banana"]
},
{
"label": "avocado_green",
"item": ["apple", "banana"]
},
{
"label": "avocado_red",
"item": ["apple", "banana"]
},
{
"label": "apple_blue",
"item": ["avocado", "banana"]
},
{
"label": "apple_red",
"item": ["avocado", "banana"]
},
{
"label": "apple_green",
"item": ["avocado", "banana"]
},
{
"label": "banana_blue",
"item": ["avocado", "apple"]
},
{
"label": "banana_brown",
"item": ["avocado", "apple"]
},
{
"label": "banana_yellow",
"item": ["avocado", "apple"]
},
{
"label": "carrot_orange",
"item": ["avocado", "apple"]
},
{
"label": "carrot_pink",
"item": ["avocado", "apple"]
},
{
"label": "carrot_purple",
"item": ["avocado", "apple"]
},
{
"label": "pear_green",
"item": ["avocado", "apple"]
},
{
"label": "pear_orange",
"item": ["avocado", "apple"]
},
{
"label": "pear_yellow",
"item": ["avocado", "apple"]
},
{
"label": "pepper_green",
"item": ["avocado", "apple"]
},
{
"label": "pepper_orange",
"item": ["avocado", "apple"]
},
{
"label": "pepper_red",
"item": ["avocado", "apple"]
},
{
"label": "tomato_green",
"item": ["avocado", "apple"]
},
{
"label": "tomato_pink",
"item": ["avocado", "apple"]
},
{
"label": "tomato_red",
"item": ["avocado", "apple"]
},


{
"label": "avocado_black",
"item": ["carrot", "pear"]
},
{
"label": "avocado_green",
"item": ["carrot", "pear"]
},
{
"label": "avocado_red",
"item": ["carrot", "pear"]
},
{
"label": "apple_blue",
"item": ["carrot", "pear"]
},
{
"label": "apple_red",
"item": ["carrot", "pear"]
},
{
"label": "apple_green",
"item": ["carrot", "pear"]
},
{
"label": "banana_blue",
"item": ["carrot", "pear"]
},
{
"label": "banana_brown",
"item": ["carrot", "pear"]
},
{
"label": "banana_yellow",
"item": ["carrot", "pear"]
},
{
"label": "carrot_orange",
"item": ["banana", "pear"]
},
{
"label": "carrot_pink",
"item": ["banana", "pear"]
},
{
"label": "carrot_purple",
"item": ["banana", "pear"]
},
{
"label": "pear_green",
"item": ["banana", "carrot"]
},
{
"label": "pear_orange",
"item": ["banana", "carrot"]
},
{
"label": "pear_yellow",
"item": ["banana", "carrot"]
},
{
"label": "pepper_green",
"item": ["banana", "carrot"]
},
{
"label": "pepper_orange",
"item": ["banana", "carrot"]
},
{
"label": "pepper_red",
"item": ["banana", "carrot"]
},
{
"label": "tomato_green",
"item": ["banana", "carrot"]
},
{
"label": "tomato_pink",
"item": ["banana", "carrot"]
},
{
"label": "tomato_red",
"item": ["banana", "carrot"]
},


{
"label": "avocado_black",
"item": ["pepper", "tomato"]
},
{
"label": "avocado_green",
"item": ["pepper", "tomato"]
},
{
"label": "avocado_red",
"item": ["pepper", "tomato"]
},
{
"label": "apple_blue",
"item": ["pepper", "tomato"]
},
{
"label": "apple_red",
"item": ["pepper", "tomato"]
},
{
"label": "apple_green",
"item": ["pepper", "tomato"]
},
{
"label": "banana_blue",
"item": ["pepper", "tomato"]
},
{
"label": "banana_brown",
"item": ["pepper", "tomato"]
},
{
"label": "banana_yellow",
"item": ["pepper", "tomato"]
},
{
"label": "carrot_orange",
"item": ["pepper", "tomato"]
},
{
"label": "carrot_pink",
"item": ["pepper", "tomato"]
},
{
"label": "carrot_purple",
"item": ["pepper", "tomato"]
},
{
"label": "pear_green",
"item": ["pepper", "tomato"]
},
{
"label": "pear_orange",
"item": ["pepper", "tomato"]
},
{
"label": "pear_yellow",
"item": ["pepper", "tomato"]
},
{
"label": "pepper_green",
"item": ["pear", "tomato"]
},
{
"label": "pepper_orange",
"item": ["pear", "tomato"]
},
{
"label": "pepper_red",
"item": ["pear", "tomato"]
},
{
"label": "tomato_green",
"item": ["pear", "pepper"]
},
{
"label": "tomato_pink",
"item": ["pear", "pepper"]
},
{
"label": "tomato_red",
"item": ["pear", "pepper"]
}
	]).slice(0,100)
	


  function makeTargetStim(i) {
    //get item
    var item = items_target[i];
    var item_id = item.item;
    var object_label = item.label;
      
      return {
	  "item": item_id,
    "label": object_label
    }
  }
  

  exp.all_stims = [];
  for (var i=0; i<items_target.length; i++) {
    exp.all_stims.push(makeTargetStim(i));
  }

  exp.all_stims = _.shuffle(exp.all_stims);

  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "objecttrial", 'subj_info', 'thanks'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined
  $(".nQs").html(exp.nQs);

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}

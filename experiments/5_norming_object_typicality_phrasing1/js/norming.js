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
	  console.log(this.stim);
	var contextsentence = "How typical is this for "+stim.label+"?";
	//var contextsentence = "How typical is this for "+stim.basiclevel+"?";
	//var objimagehtml = '<img src="images/'+stim.basiclevel+'/'+stim.item+'.jpg" style="height:190px;">';
	var objimagehtml = '<img src="images/'+stim.item+'.jpg" style="height:190px;">';

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
          "label" : this.stim.label,
          "slide_number_in_experiment" : exp.phase,
          "item": this.stim.item,
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

  var items = _.shuffle([
  	//dog1s typeLabel 36
	{
	"item": "blackBear",
	"label": "a black bear"
	},
	{
	"item": "grizzlyBear",
	"label": "a grizzly bear"
	},
	{
	"item": "pandaBear",
	"label": "a panda bear"
	},
	{
	"item": "polarBear",
	"label": "a polar bear"
	},
	{
	"item": "eagle",
	"label": "an eagle"
	},
	{
	"item": "hummingBird",
	"label": "a hummingbird"
	},
	{
	"item": "parrot",
	"label": "a parrot"
	},
	{
	"item": "pigeon",
	"label": "a pigeon"
	},
	{
	"item": "dalmatian",
	"label": "a Dalmatian"
	},
	{
	"item": "germanShepherd",
	"label": "a German Shepherd"
	},
	{
	"item": "husky",
	"label": "a Husky"
	},
	{
	"item": "pug",
	"label": "a Pug"
	},
	{
	"item": "gummyBears",
	"label": "gummy bears"
	},
	{
	"item": "jellyBeans",
	"label": "jelly beans"
	},
	{
	"item": "mnMs",
	"label": "M&M's"
	},
	{
	"item": "skittles",
	"label": "Skittles"
	},
	{
	"item": "daisy",
	"label": "a daisy"
	},
	{
	"item": "rose",
	"label": "a rose"
	},
	{
	"item": "sunflower",
	"label": "a sunflower"
	},
	{
	"item": "tulip",
	"label": "a tulip"
	},
	{
	"item": "convertible",
	"label": "a convertible"
	},
	{
	"item": "minivan",
	"label": "a minivan"
	},
	{
	"item": "sportsCar",
	"label": "a sports car"
	},
	{
	"item": "suv",
	"label": "an SUV"
	},
	{
	"item": "catfish",
	"label": "a catfish"
	},
	{
	"item": "clownFish",
	"label": "a clownfish"
	},
	{
	"item": "goldFish",
	"label": "a goldfish"
	},
	{
	"item": "swordFish",
	"label": "a swordfish"
	},
	{
	"item": "dressShirt",
	"label": "a dress shirt"
	},
	{
	"item": "hawaiiShirt",
	"label": "a Hawaii shirt"
	},
	{
	"item": "poloShirt",
	"label": "a polo shirt"
	},
	{
	"item": "tShirt",
	"label": "a T-Shirt"
	},
	{
	"item": "bedsideTable",
	"label": "a bedside table"
	},
	{
	"item": "coffeeTable",
	"label": "a coffee table"
	},
	{
	"item": "diningTable",
	"label": "a dining table"
	},
	{
	"item": "picnicTable",
	"label": "a picnic table"
	},
	//dog1s BasiclevelLabel 36
	{
	"item": "blackBear",
	"label": "a bear"
	},
	{
	"item": "grizzlyBear",
	"label": "a bear"
	},
	{
	"item": "pandaBear",
	"label": "a bear"
	},
	{
	"item": "polarBear",
	"label": "a bear"
	},
	{
	"item": "eagle",
	"label": "a bird"
	},
	{
	"item": "hummingBird",
	"label": "a bird"
	},
	{
	"item": "parrot",
	"label": "a bird"
	},
	{
	"item": "pigeon",
	"label": "a bird"
	},
	{
	"item": "dalmatian",
	"label": "a dog"
	},
	{
	"item": "germanShepherd",
	"label": "a dog"
	},
	{
	"item": "husky",
	"label": "a dog"
	},
	{
	"item": "pug",
	"label": "a dog"
	},
	{
	"item": "gummyBears",
	"label": "candy"
	},
	{
	"item": "jellyBeans",
	"label": "candy"
	},
	{
	"item": "mnMs",
	"label": "candy"
	},
	{
	"item": "skittles",
	"label": "candy"
	},
	{
	"item": "daisy",
	"label": "a flower"
	},
	{
	"item": "rose",
	"label": "a flower",
	},
	{
	"item": "sunflower",
	"label": "a flower"
	},
	{
	"item": "tulip",
	"label": "a flower"
	},
	{
	"item": "convertible",
	"label": "a car"
	},
	{
	"item": "minivan",
	"label": "a car"
	},
	{
	"item": "sportsCar",
	"label": "a car"
	},
	{
	"item": "suv",
	"label": "a car"
	},
	{
	"item": "catfish",
	"label": "a fish"
	},
	{
	"item": "clownFish",
	"label": "a fish"
	},
	{
	"item": "goldFish",
	"label": "a fish"
	},
	{
	"item": "swordFish",
	"label": "a fish"
	},
	{
	"item": "dressShirt",
	"label": "a shirt"
	},
	{
	"item": "hawaiiShirt",
	"label": "a shirt"
	},
	{
	"item": "poloShirt",
	"label": "a shirt"
	},
	{
	"item": "tShirt",
	"label": "a shirt"
	},
	{
	"item": "bedsideTable",
	"label": "a table"
	},
	{
	"item": "coffeeTable",
	"label": "a table"
	},
	{
	"item": "diningTable",
	"label": "a table"
	},
	{
	"item": "picnicTable",
	"label": "a table"
	},


	//dog1s domainLabel 36
	{
	"item": "blackBear",
	"label": "an animal"
	},
	{
	"item": "grizzlyBear",
	"label": "an animal"
	},
	{
	"item": "pandaBear",
	"label": "an animal"
	},
	{
	"item": "polarBear",
	"label": "an animal"
	},
	{
	"item": "eagle",
	"label": "an animal"
	},
	{
	"item": "hummingBird",
	"label": "an animal"
	},
	{
	"item": "parrot",
	"label": "an animal"
	},
	{
	"item": "pigeon",
	"label": "an animal"
	},
	{
	"item": "dalmatian",
	"label": "an animal"
	},
	{
	"item": "germanShepherd",
	"label": "an animal"
	},
	{
	"item": "husky",
	"label": "an animal"
	},
	{
	"item": "pug",
	"label": "an animal"
	},
	{
	"item": "gummyBears",
	"label": "a snack"
	},
	{
	"item": "jellyBeans",
	"label": "a snack"
	},
	{
	"item": "mnMs",
	"label": "a snack"
	},
	{
	"item": "skittles",
	"label": "a snack"
	},
	{
	"item": "daisy",
	"label": "a plant"
	},
	{
	"item": "rose",
	"label": "a plant"
	},
	{
	"item": "sunflower",
	"label": "a plant"
	},
	{
	"item": "tulip",
	"label": "a plant"
	},
	{
	"item": "convertible",
	"label": "a vehicle"
	},
	{
	"item": "minivan",
	"label": "a vehicle"
	},
	{
	"item": "sportsCar",
	"label": "a vehicle"
	},
	{
	"item": "suv",
	"label": "a vehicle"
	},
	{
	"item": "catfish",
	"label": "an animal"
	},
	{
	"item": "clownFish",
	"label": "an animal"
	},
	{
	"item": "goldFish",
	"label": "an animal"
	},
	{
	"item": "swordFish",
	"label": "an animal"
	},
	{
	"item": "dressShirt",
	"label": "clothing"
	},
	{
	"item": "hawaiiShirt",
	"label": "clothing"
	},
	{
	"item": "poloShirt",
	"label": "clothing"
	},
	{
	"item": "tShirt",
	"label": "clothing"
	},
	{
	"item": "bedsideTable",
	"label": "furniture"
	},
	{
	"item": "coffeeTable",
	"label": "furniture"
	},
	{
	"item": "diningTable",
	"label": "furniture"
	},
	{
	"item": "picnicTable",
	"label": "furniture"
	},


	//dog2s typeLabel 36
	{
	"item": "koalaBear",
	"label": "a black bear"
	},
	{
	"item": "koalaBear",
	"label": "a grizzly bear"
	},
	{
	"item": "koalaBear",
	"label": "a panda bear"
	},
	{
	"item": "koalaBear",
	"label": "a polar bear"
	},

	{
	"item": "sparrow",
	"label": "an eagle"
	},
	{
	"item": "sparrow",
	"label": "a hummingbird"
	},
	{
	"item": "sparrow",
	"label": "a parrot"
	},
	{
	"item": "sparrow",
	"label": "a pigeon"
	},

	{
	"item": "greyhound",
	"label": "a Dalmatian"
	},
	{
	"item": "greyhound",
	"label": "a German Shepherd"
	},
	{
	"item": "greyhound",
	"label": "a Husky"
	},
	{
	"item": "greyhound",
	"label": "a Pug"
	},

	{
	"item": "candyCorn",
	"label": "gummy bears"
	},
	{
	"item": "candyCorn",
	"label": "jelly beans"
	},
	{
	"item": "candyCorn",
	"label": "M&M's"
	},
	{
	"item": "candyCorn",
	"label": "Skittles"
	},

	{
	"item": "lily",
	"label": "a daisy"
	},
	{
	"item": "lily",
	"label": "a rose"
	},
	{
	"item": "lily",
	"label": "a sunflower"
	},
	{
	"item": "lily",
	"label": "a tulip"
	},

	{
	"item": "sedan",
	"label": "a convertible"
	},
	{
	"item": "sedan",
	"label": "a minivan"
	},
	{
	"item": "sedan",
	"label": "a sports car"
	},
	{
	"item": "sedan",
	"label": "an SUV"
	},

	{
	"item": "discusFish",
	"label": "a catfish"
	},
	{
	"item": "discusFish",
	"label": "a clownfish"
	},
	{
	"item": "discusFish",
	"label": "a goldfish"
	},
	{
	"item": "discusFish",
	"label": "a swordfish"
	},

	{
	"item": "campShirt",
	"label": "a dress shirt"
	},
	{
	"item": "campShirt",
	"label": "a Hawaii shirt"
	},
	{
	"item": "campShirt",
	"label": "a polo shirt"
	},
	{
	"item": "campShirt",
	"label": "a T-Shirt"
	},

	{
	"item": "sideTable",
	"label": "a bedside table"
	},
	{
	"item": "sideTable",
	"label": "a coffee table"
	},
	{
	"item": "sideTable",
	"label": "a dining table"
	},
	{
	"item": "sideTable",
	"label": "a picnic table"
	},

	//dog2s BLLabel 9
	{
	"item": "koalaBear",
	"label": "a bear"
	},
	{
	"item": "greyhound",
	"label": "a dog"
	},
	{
	"item": "candyCorn",
	"label": "candy"
	},
	{
	"item": "sideTable",
	"label": "a table"
	},
	{
	"item": "campShirt",
	"label": "a shirt"
	},
	{
	"item": "discusFish",
	"label": "a fish"
	},
	{
	"item": "sparrow",
	"label": "a bird"
	},
	{
	"item": "lily",
	"label": "a flower"
	},
	{
	"item": "sedan",
	"label": "a car"
	},

	//dog2s DomainLabel 9
	{
	"item": "koalaBear",
	"label": "an animal"
	},
	{
	"item": "greyhound",
	"label": "an animal"
	},
	{
	"item": "candyCorn",
	"label": "a snack"
	},
	{
	"item": "sideTable",
	"label": "furniture"
	},
	{
	"item": "campShirt",
	"label": "clothing"
	},
	{
	"item": "discusFish",
	"label": "an animal"
	},
	{
	"item": "sparrow",
	"label": "an animal"
	},
	{
	"item": "lily",
	"label": "a plant"
	},
	{
	"item": "sedan",
	"label": "a vehicle"
	},

	// Everything else:
	// ambulance
	{
	"item": "ambulance",
	"label": "a sports car"
	},
	{
	"item": "ambulance",
	"label": "a convertible"
	},
	{
	"item": "ambulance",
	"label": "an SUV"
	},
{
	"item": "ambulance",
	"label": "a minivan"
	},
{
	"item": "ambulance",
	"label": "a dress shirt"
	},
{
	"item": "ambulance",
	"label": "a bedside table"
	},
{
	"item": "ambulance",
	"label": "gummy bears"
	},
{
	"item": "ambulance",
	"label": "a parrot"
	},
{
	"item": "ambulance",
	"label": "a polar bear"
	},
{
	"item": "ambulance",
	"label": "a catfish"
	},
{
	"item": "ambulance",
	"label": "jelly beans"
	},
{
	"item": "ambulance",
	"label": "a clownfish"
	},
{
	"item": "ambulance",
	"label": "a black bear"
	},
{
	"item": "ambulance",
	"label": "a goldfish"
	},
{
	"item": "ambulance",
	"label": "a Dalmatian"
	},
{
	"item": "ambulance",
	"label": "Skittles"
	},
{
	"item": "ambulance",
	"label": "a car"
	},
{
	"item": "ambulance",
	"label": "a shirt"
	},
{
	"item": "ambulance",
	"label": "a table"
	},
{
	"item": "ambulance",
	"label": "candy"
	},
{
	"item": "ambulance",
	"label": "a bird"
	},
{
	"item": "ambulance",
	"label": "a bear"
	},
{
	"item": "ambulance",
	"label": "a fish"
	},
{
	"item": "ambulance",
	"label": "a dog"
	},
{
	"item": "ambulance",
	"label": "a vehicle"
	},
{
	"item": "ambulance",
	"label": "clothing"
	},
{
	"item": "ambulance",
	"label": "furniture"
	},
{
	"item": "ambulance",
	"label": "a snack"
	},
{
	"item": "ambulance",
	"label": "an animal"
	},
{
	"item": "ambulance",
	"label": "a German Shepherd"
	},
{
	"item": "ambulance",
	"label": "a grizzly bear"
	},
{
	"item": "ambulance",
	"label": "a swordfish"
	},
{
	"item": "ambulance",
	"label": "a Husky"
	},
{
	"item": "ambulance",
	"label": "a T-Shirt"
	},
{
	"item": "ambulance",
	"label": "a pigeon"
	},
	// bathrobe
{
	"item": "bathrobe",
	"label": "a T-Shirt"
	},
{
	"item": "bathrobe",
	"label": "a dress shirt"
	},
	{
	"item": "bathrobe",
	"label": "a Hawaii shirt"
	},
	{
	"item": "bathrobe",
	"label": "a polo shirt"
	},
{
	"item": "bathrobe",
	"label": "a rose"
	},
	{
	"item": "bathrobe",
	"label": "a polar bear"
	},
{
	"item": "bathrobe",
	"label": "a swordfish"
	},
{
	"item": "bathrobe",
	"label": "a tulip"
	},
{
	"item": "bathrobe",
	"label": "a coffee table"
	},
{
	"item": "bathrobe",
	"label": "a black bear"
	},
{
	"item": "bathrobe",
	"label": "a grizzly bear"
	},
{
	"item": "bathrobe",
	"label": "a parrot"
	},
{
	"item": "bathrobe",
	"label": "Skittles"
	},
{
	"item": "bathrobe",
	"label": "a minivan"
	},
{
	"item": "bathrobe",
	"label": "an eagle"
	},
{
	"item": "bathrobe",
	"label": "a clownfish"
	},
{
	"item": "bathrobe",
	"label": "an SUV"
	},
{
	"item": "bathrobe",
	"label": "a shirt"
	},
{
	"item": "bathrobe",
	"label": "a flower"
	},
{
	"item": "bathrobe",
	"label": "a bear"
	},
{
	"item": "bathrobe",
	"label": "a fish"
	},
{
	"item": "bathrobe",
	"label": "a table"
	},
{
	"item": "bathrobe",
	"label": "a bird"
	},
{
	"item": "bathrobe",
	"label": "candy"
	},
{
	"item": "bathrobe",
	"label": "a car"
	},
{
	"item": "bathrobe",
	"label": "clothing"
	},
{
	"item": "bathrobe",
	"label": "a plant"
	},
{
	"item": "bathrobe",
	"label": "an animal"
	},
{
	"item": "bathrobe",
	"label": "furniture"
	},
{
	"item": "bathrobe",
	"label": "a snack"
	},
{
	"item": "bathrobe",
	"label": "a vehicle"
	},
{
	"item": "bathrobe",
	"label": "a goldfish"
	},
{
	"item": "bathrobe",
	"label": "a pug"
	},
{
	"item": "bathrobe",
	"label": "a convertible"
	},
{
	"item": "bathrobe",
	"label": "a dining table"
	},
{
	"item": "bathrobe",
	"label": "a picnic table"
	},
{
	"item": "bathrobe",
	"label": "a Husky"
	},
{
	"item": "bathrobe",
	"label": "a catfish"
	},
{
	"item": "bathrobe",
	"label": "a dog"
	},
	// bed
{
	"item": "bed",
	"label": "a coffee table"
	},
	{
	"item": "bed",
	"label": "a picnic table"
	},
{
	"item": "bed",
	"label": "a dining table"
	},
{
	"item": "bed",
	"label": "jelly beans"
	},
{
	"item": "bed",
	"label": "a clownfish"
	},
{
	"item": "bed",
	"label": "a Hawaii shirt"
	},
{
	"item": "bed",
	"label": "a Dalmatian"
	},
{
	"item": "bed",
	"label": "a parrot"
	},
{
	"item": "bed",
	"label": "a tulip"
	},
{
	"item": "bed",
	"label": "a goldfish"
	},
{
	"item": "bed",
	"label": "a panda bear"
	},
{
	"item": "bed",
	"label": "a pigeon"
	},
{
	"item": "bed",
	"label": "a Husky"
	},
{
	"item": "bed",
	"label": "a table"
	},
{
	"item": "bed",
	"label": "candy"
	},
{
	"item": "bed",
	"label": "a fish"
	},
{
	"item": "bed",
	"label": "a shirt"
	},
{
	"item": "bed",
	"label": "a dog"
	},
{
	"item": "bed",
	"label": "a bird"
	},
{
	"item": "bed",
	"label": "a flower"
	},
{
	"item": "bed",
	"label": "a bear"
	},
{
	"item": "bed",
	"label": "furniture"
	},
{
	"item": "bed",
	"label": "a snack"
	},
{
	"item": "bed",
	"label": "an animal"
	},
{
	"item": "bed",
	"label": "clothing"
	},
{
	"item": "bed",
	"label": "a plant"
	},
{
	"item": "bed",
	"label": "a bedside table"
	},
{
	"item": "bed",
	"label": "an SUV"
	},
{
	"item": "bed",
	"label": "a hummingbird"
	},
{
	"item": "bed",
	"label": "a German Shepherd"
	},
{
	"item": "bed",
	"label": "a grizzly bear"
	},
{
	"item": "bed",
	"label": "a black bear"
	},
{
	"item": "bed",
	"label": "a catfish"
	},
{
	"item": "bed",
	"label": "a car"
	},
{
	"item": "bed",
	"label": "a vehicle"
	},
	// bison
{
	"item": "bison",
	"label": "a panda bear"
	},
{
	"item": "bison",
	"label": "a hummingbird"
	},
{
	"item": "bison",
	"label": "a polar bear"
	},
{
	"item": "bison",
	"label": "a goldfish"
	},
{
	"item": "bison",
	"label": "a pug"
	},
{
	"item": "bison",
	"label": "a parrot"
	},
{
	"item": "bison",
	"label": "a swordfish"
	},
{
	"item": "bison",
	"label": "a black bear"
	},
{
	"item": "bison",
	"label": "an eagle"
	},
{
	"item": "bison",
	"label": "a catfish"
	},
{
	"item": "bison",
	"label": "a clownfish"
	},
{
	"item": "bison",
	"label": "a Dalmatian"
	},
{
	"item": "bison",
	"label": "a German Shepherd"
	},
{
	"item": "bison",
	"label": "a Hawaii shirt"
	},
{
	"item": "bison",
	"label": "Skittles"
	},
{
	"item": "bison",
	"label": "a bedside table"
	},
{
	"item": "bison",
	"label": "an SUV"
	},
{
	"item": "bison",
	"label": "a rose"
	},
{
	"item": "bison",
	"label": "a coffee table"
	},
{
	"item": "bison",
	"label": "a minivan"
	},
{
	"item": "bison",
	"label": "a daisy"
	},
{
	"item": "bison",
	"label": "a bear"
	},
{
	"item": "bison",
	"label": "a bird"
	},
{
	"item": "bison",
	"label": "a fish"
	},
{
	"item": "bison",
	"label": "a dog"
	},
{
	"item": "bison",
	"label": "a shirt"
	},
{
	"item": "bison",
	"label": "candy"
	},
{
	"item": "bison",
	"label": "a table"
	},
{
	"item": "bison",
	"label": "a car"
	},
{
	"item": "bison",
	"label": "a flower"
	},
{
	"item": "bison",
	"label": "an animal"
	},
{
	"item": "bison",
	"label": "clothing"
	},
{
	"item": "bison",
	"label": "a snack"
	},
{
	"item": "bison",
	"label": "furniture"
	},
{
	"item": "bison",
	"label": "a vehicle"
	},
{
	"item": "bison",
	"label": "a plant"
	},
{
	"item": "bison",
	"label": "a grizzly bear"
	},
{
	"item": "bison",
	"label": "a convertible"
	},
{
	"item": "bison",
	"label": "a polo shirt"
	},
{
	"item": "bison",
	"label": "M&M's"
	},
{
	"item": "bison",
	"label": "a tulip"
	},
	// bookcase
{
	"item": "bookcase",
	"label": "a coffee table"
	},
{
	"item": "bookcase",
	"label": "a picnic table"
	},
{
	"item": "bookcase",
	"label": "a dining table"
	},
{
	"item": "bookcase",
	"label": "a bedside table"
	},
{
	"item": "bookcase",
	"label": "a hummingbird"
	},
{
	"item": "bookcase",
	"label": "a panda bear"
	},
{
	"item": "bookcase",
	"label": "a grizzly bear"
	},
{
	"item": "bookcase",
	"label": "a swordfish"
	},
{
	"item": "bookcase",
	"label": "a black bear"
	},
{
	"item": "bookcase",
	"label": "a pug"
	},
{
	"item": "bookcase",
	"label": "a pigeon"
	},
{
	"item": "bookcase",
	"label": "Skittles"
	},
{
	"item": "bookcase",
	"label": "a table"
	},
{
	"item": "bookcase",
	"label": "a bird"
	},
{
	"item": "bookcase",
	"label": "a bear"
	},
{
	"item": "bookcase",
	"label": "a fish"
	},
{
	"item": "bookcase",
	"label": "a dog"
	},
{
	"item": "bookcase",
	"label": "candy"
	},
{
	"item": "bookcase",
	"label": "furniture"
	},
{
	"item": "bookcase",
	"label": "an animal"
	},
{
	"item": "bookcase",
	"label": "a snack"
	},
{
	"item": "bookcase",
	"label": "a rose"
	},
{
	"item": "bookcase",
	"label": "a polo shirt"
	},
{
	"item": "bookcase",
	"label": "a clownfish"
	},
{
	"item": "bookcase",
	"label": "a tulip"
	},
{
	"item": "bookcase",
	"label": "a Husky"
	},
{
	"item": "bookcase",
	"label": "a flower"
	},
{
	"item": "bookcase",
	"label": "a shirt"
	},
{
	"item": "bookcase",
	"label": "a plant"
	},
{
	"item": "bookcase",
	"label": "clothing"
	},
	// chick
	{
	"item": "chick",
	"label": "a parrot"
	},
{
	"item": "chick",
	"label": "a Husky"
	},
{
	"item": "chick",
	"label": "a polar bear"
	},
{
	"item": "chick",
	"label": "a pigeon"
	},
{
	"item": "chick",
	"label": "a catfish"
	},
{
	"item": "chick",
	"label": "a German Shepherd"
	},
{
	"item": "chick",
	"label": "a panda bear"
	},
{
	"item": "chick",
	"label": "a Pug"
	},
{
	"item": "chick",
	"label": "a hummingbird"
	},
{
	"item": "chick",
	"label": "a goldfish"
	},
{
	"item": "chick",
	"label": "a swordfish"
	},
{
	"item": "chick",
	"label": "a dress shirt"
	},
{
	"item": "chick",
	"label": "a rose"
	},
{
	"item": "chick",
	"label": "M&M's"
	},
{
	"item": "chick",
	"label": "a picnic table"
	},
{
	"item": "chick",
	"label": "a Hawaii shirt"
	},
{
	"item": "chick",
	"label": "a convertible"
	},
{
	"item": "chick",
	"label": "a dog"
	},
{
	"item": "chick",
	"label": "a bird"
	},
{
	"item": "chick",
	"label": "a bear"
	},
{
	"item": "chick",
	"label": "a fish"
	},
{
	"item": "chick",
	"label": "a shirt"
	},
{
	"item": "chick",
	"label": "a flower"
	},
{
	"item": "chick",
	"label": "candy"
	},
{
	"item": "chick",
	"label": "a table"
	},
{
	"item": "chick",
	"label": "a car"
	},
{
	"item": "chick",
	"label": "an animal"
	},
{
	"item": "chick",
	"label": "clothing"
	},
{
	"item": "chick",
	"label": "a plant"
	},
{
	"item": "chick",
	"label": "a snack"
	},
{
	"item": "chick",
	"label": "furniture"
	},
{
	"item": "chick",
	"label": "a vehicle"
	},
{
	"item": "chick",
	"label": "a black bear"
	},
{
	"item": "chick",
	"label": "a Dalmatian"
	},
{
	"item": "chick",
	"label": "a coffee table"
	},
{
	"item": "chick",
	"label": "gummy bears"
	},

	//chips
{
	"item": "chips",
	"label": "M&M's"
	},
{
	"item": "chips",
	"label": "gummy bears"
	},
{
	"item": "chips",
	"label": "Skittles"
	},
{
	"item": "chips",
	"label": "jelly beans"
	},
{
	"item": "chips",
	"label": "a hummingbird"
	},
{
	"item": "chips",
	"label": "a tulip"
	},
{
	"item": "chips",
	"label": "a polar bear"
	},
{
	"item": "chips",
	"label": "a pigeon"
	},
{
	"item": "chips",
	"label": "a dress shirt"
	},
{
	"item": "chips",
	"label": "an eagle"
	},
{
	"item": "chips",
	"label": "a Husky"
	},
{
	"item": "chips",
	"label": "a grizzly bear"
	},
{
	"item": "chips",
	"label": "a Dalmatian"
	},
{
	"item": "chips",
	"label": "a sports car"
	},
{
	"item": "chips",
	"label": "candy"
	},
{
	"item": "chips",
	"label": "a bird"
	},
{
	"item": "chips",
	"label": "a flower"
	},
{
	"item": "chips",
	"label": "a bear"
	},
{
	"item": "chips",
	"label": "a shirt"
	},
{
	"item": "chips",
	"label": "a dog"
	},
{
	"item": "chips",
	"label": "a car"
	},
{
	"item": "chips",
	"label": "a snack"
	},
{
	"item": "chips",
	"label": "an animal"
	},
{
	"item": "chips",
	"label": "a plant"
	},
{
	"item": "chips",
	"label": "clothing"
	},
{
	"item": "chips",
	"label": "a vehicle"
	},
{
	"item": "chips",
	"label": "a dining table"
	},
{
	"item": "chips",
	"label": "a black bear"
	},
{
	"item": "chips",
	"label": "an SUV"
	},
{
	"item": "chips",
	"label": "a table"
	},
{
	"item": "chips",
	"label": "furniture"
	},
	// cookies
	{
	"item": "cookies",
	"label": "Skittles"
	},
	{
	"item": "cookies",
	"label": "jelly beans"
	},
	{
	"item": "cookies",
	"label": "M&M's"
	},
	{
	"item": "cookies",
	"label": "gummy bears"
	},
	{
	"item": "cookies",
	"label": "a polo shirt"
	},
{
	"item": "cookies",
	"label": "a sports car"
	},
{
	"item": "cookies",
	"label": "a Husky"
	},
{
	"item": "cookies",
	"label": "a swordfish"
	},
{
	"item": "cookies",
	"label": "a picnic table"
	},
{
	"item": "cookies",
	"label": "a pigeon"
	},
{
	"item": "cookies",
	"label": "a Dalmatian"
	},
{
	"item": "cookies",
	"label": "a tulip"
	},
{
	"item": "cookies",
	"label": "a bedside table"
	},
{
	"item": "cookies",
	"label": "a sunflower"
	},
{
	"item": "cookies",
	"label": "candy"
	},
{
	"item": "cookies",
	"label": "a shirt"
	},
{
	"item": "cookies",
	"label": "a car"
	},
{
	"item": "cookies",
	"label": "a dog"
	},
{
	"item": "cookies",
	"label": "a fish"
	},
{
	"item": "cookies",
	"label": "a table"
	},
{
	"item": "cookies",
	"label": "a bird"
	},
{
	"item": "cookies",
	"label": "a flower"
	},
{
	"item": "cookies",
	"label": "a snack"
	},
{
	"item": "cookies",
	"label": "clothing"
	},
{
	"item": "cookies",
	"label": "a vehicle"
	},
{
	"item": "cookies",
	"label": "an animal"
	},
{
	"item": "cookies",
	"label": "furniture"
	},
{
	"item": "cookies",
	"label": "a plant"
	},
{
	"item": "cookies",
	"label": "a dress shirt"
	},
{
	"item": "cookies",
	"label": "an eagle"
	},
{
	"item": "cookies",
	"label": "a convertible"
	},
{
	"item": "cookies",
	"label": "a Pug"
	},
{
	"item": "cookies",
	"label": "an SUV"
	},
{
	"item": "cookies",
	"label": "a black bear"
	},
{
	"item": "cookies",
	"label": "a catfish"
	},
{
	"item": "cookies",
	"label": "a parrot"
	},
{
	"item": "cookies",
	"label": "a rose"
	},
{
	"item": "cookies",
	"label": "a polar bear"
	},
{
	"item": "cookies",
	"label": "a grizzly bear"
	},
{
	"item": "cookies",
	"label": "a bear"
	},
	//cow
{
	"item": "cow",
	"label": "a catfish"
	},
{
	"item": "cow",
	"label": "a polar bear"
	},
{
	"item": "cow",
	"label": "a grizzly bear"
	},
{
	"item": "cow",
	"label": "a black bear"
	},
{
	"item": "cow",
	"label": "a German Shepherd"
	},
{
	"item": "cow",
	"label": "a goldfish"
	},
{
	"item": "cow",
	"label": "a panda bear"
	},
{
	"item": "cow",
	"label": "a swordfish"
	},
{
	"item": "cow",
	"label": "a Husky"
	},
{
	"item": "cow",
	"label": "an eagle"
	},
{
	"item": "cow",
	"label": "a clownfish"
	},
{
	"item": "cow",
	"label": "a Dalmatian"
	},
{
	"item": "cow",
	"label": "a parrot"
	},
{
	"item": "cow",
	"label": "gummy bears"
	},
{
	"item": "cow",
	"label": "an SUV"
	},
{
	"item": "cow",
	"label": "a sunflower"
	},
{
	"item": "cow",
	"label": "a minivan"
	},
{
	"item": "cow",
	"label": "a fish"
	},
{
	"item": "cow",
	"label": "a bear"
	},
{
	"item": "cow",
	"label": "a dog"
	},
{
	"item": "cow",
	"label": "a bird"
	},
{
	"item": "cow",
	"label": "candy"
	},
{
	"item": "cow",
	"label": "a car"
	},
{
	"item": "cow",
	"label": "a flower"
	},
{
	"item": "cow",
	"label": "an animal"
	},
{
	"item": "cow",
	"label": "a snack"
	},
{
	"item": "cow",
	"label": "a vehicle"
	},
{
	"item": "cow",
	"label": "a plant"
	},
{
	"item": "cow",
	"label": "a pigeon"
	},
{
	"item": "cow",
	"label": "a rose"
	},
{
	"item": "cow",
	"label": "a dress shirt"
	},
{
	"item": "cow",
	"label": "a dining table"
	},
{
	"item": "cow",
	"label": "a tulip"
	},
{
	"item": "cow",
	"label": "a T-Shirt"
	},
{
	"item": "cow",
	"label": "a shirt"
	},
{
	"item": "cow",
	"label": "a table"
	},
{
	"item": "cow",
	"label": "clothing"
	},
{
	"item": "cow",
	"label": "furniture"
	},
	//crocodile
	{
	"item": "crocodile",
	"label": "a pigeon"
	},
{
	"item": "crocodile",
	"label": "a grizzly bear"
	},
{
	"item": "crocodile",
	"label": "a German Shepherd"
	},
{
	"item": "crocodile",
	"label": "a Husky"
	},
{
	"item": "crocodile",
	"label": "a Pug"
	},
{
	"item": "crocodile",
	"label": "a polar bear"
	},
{
	"item": "crocodile",
	"label": "a panda bear"
	},
{
	"item": "crocodile",
	"label": "a Dalmatian"
	},
{
	"item": "crocodile",
	"label": "a picnic table"
	},
{
	"item": "crocodile",
	"label": "a coffee table"
	},
{
	"item": "crocodile",
	"label": "a minivan"
	},
{
	"item": "crocodile",
	"label": "a tulip"
	},
{
	"item": "crocodile",
	"label": "a bedside table"
	},
{
	"item": "crocodile",
	"label": "a convertible"
	},
{
	"item": "crocodile",
	"label": "M&M's"
	},
{
	"item": "crocodile",
	"label": "a polo shirt"
	},
{
	"item": "crocodile",
	"label": "a bird"
	},
{
	"item": "crocodile",
	"label": "a bear"
	},
{
	"item": "crocodile",
	"label": "a dog"
	},
{
	"item": "crocodile",
	"label": "a table"
	},
{
	"item": "crocodile",
	"label": "a car"
	},
{
	"item": "crocodile",
	"label": "a flower"
	},
{
	"item": "crocodile",
	"label": "candy"
	},
{
	"item": "crocodile",
	"label": "a shirt"
	},
{
	"item": "crocodile",
	"label": "an animal"
	},
{
	"item": "crocodile",
	"label": "furniture"
	},
{
	"item": "crocodile",
	"label": "a vehicle"
	},
{
	"item": "crocodile",
	"label": "a plant"
	},
{
	"item": "crocodile",
	"label": "a snack"
	},
{
	"item": "crocodile",
	"label": "clothing"
	},
{
	"item": "crocodile",
	"label": "a parrot"
	},
{
	"item": "crocodile",
	"label": "a hummingbird"
	},
{
	"item": "crocodile",
	"label": "an SUV"
	},
{
	"item": "crocodile",
	"label": "a clownfish"
	},
{
	"item": "crocodile",
	"label": "a dining table"
	},
{
	"item": "crocodile",
	"label": "jelly beans"
	},
{
	"item": "crocodile",
	"label": "a fish"
	},
	//dress
	{
	"item": "dress",
	"label": "a Hawaii shirt"
	},
{
	"item": "dress",
	"label": "a polo shirt"
	},
{
	"item": "dress",
	"label": "a T-Shirt"
	},
{
	"item": "dress",
	"label": "a dress shirt"
	},
{
	"item": "dress",
	"label": "a bedside table"
	},
{
	"item": "dress",
	"label": "a Dalmatian"
	},
{
	"item": "dress",
	"label": "a panda bear"
	},
{
	"item": "dress",
	"label": "a sunflower"
	},
{
	"item": "dress",
	"label": "a sports car"
	},
{
	"item": "dress",
	"label": "a picnic table"
	},
{
	"item": "dress",
	"label": "a catfish"
	},
{
	"item": "dress",
	"label": "a minivan"
	},
{
	"item": "dress",
	"label": "M&M's"
	},
{
	"item": "dress",
	"label": "a convertible"
	},
{
	"item": "dress",
	"label": "a Husky"
	},
{
	"item": "dress",
	"label": "an eagle"
	},
{
	"item": "dress",
	"label": "a rose"
	},
{
	"item": "dress",
	"label": "a coffee table"
	},
{
	"item": "dress",
	"label": "a black bear"
	},
{
	"item": "dress",
	"label": "a shirt"
	},
{
	"item": "dress",
	"label": "a table"
	},
{
	"item": "dress",
	"label": "a dog"
	},
{
	"item": "dress",
	"label": "a bear"
	},
{
	"item": "dress",
	"label": "a flower"
	},
{
	"item": "dress",
	"label": "a car"
	},
{
	"item": "dress",
	"label": "a fish"
	},
{
	"item": "dress",
	"label": "candy"
	},
{
	"item": "dress",
	"label": "a bird"
	},
{
	"item": "dress",
	"label": "a clothing"
	},
{
	"item": "dress",
	"label": "furniture"
	},
{
	"item": "dress",
	"label": "an animal"
	},
{
	"item": "dress",
	"label": "a plant"
	},
{
	"item": "dress",
	"label": "a vehicle"
	},
{
	"item": "dress",
	"label": "a snack"
	},
{
	"item": "dress",
	"label": "a parrot"
	},
{
	"item": "dress",
	"label": "a German Shepherd"
	},
{
	"item": "dress",
	"label": "a grizzly bear"
	},
{
	"item": "dress",
	"label": "a goldfish"
	},
{
	"item": "dress",
	"label": "Skittles"
	},
{
	"item": "dress",
	"label": "a swordfish"
	},
{
	"item": "dress",
	"label": "an SUV"
	},
{
	"item": "dress",
	"label": "a clownfish"
	},
	//elephant
	{
	"item": "elephant",
	"label": "a panda bear"
	},
{
	"item": "elephant",
	"label": "an eagle"
	},
{
	"item": "elephant",
	"label": "a swordfish"
	},
{
	"item": "elephant",
	"label": "a hummingbird"
	},
{
	"item": "elephant",
	"label": "a parrot"
	},
{
	"item": "elephant",
	"label": "a black bear"
	},
{
	"item": "elephant",
	"label": "a polar bear"
	},
{
	"item": "elephant",
	"label": "a catfish"
	},
{
	"item": "elephant",
	"label": "a pigeon"
	},
{
	"item": "elephant",
	"label": "a German Shepherd"
	},
{
	"item": "elephant",
	"label": "a clownfish"
	},
{
	"item": "elephant",
	"label": "a grizzly bear"
	},
{
	"item": "elephant",
	"label": "an SUV"
	},
{
	"item": "elephant",
	"label": "a dining table"
	},
{
	"item": "elephant",
	"label": "a daisy"
	},
{
	"item": "elephant",
	"label": "a convertible"
	},
{
	"item": "elephant",
	"label": "a bear"
	},
{
	"item": "elephant",
	"label": "a bird"
	},
{
	"item": "elephant",
	"label": "a fish"
	},
{
	"item": "elephant",
	"label": "a dog"
	},
{
	"item": "elephant",
	"label": "a car"
	},
{
	"item": "elephant",
	"label": "a table"
	},
{
	"item": "elephant",
	"label": "a flower"
	},
{
	"item": "elephant",
	"label": "an animal"
	},
{
	"item": "elephant",
	"label": "a vehicle"
	},
{
	"item": "elephant",
	"label": "furniture"
	},
{
	"item": "elephant",
	"label": "a plant"
	},
{
	"item": "elephant",
	"label": "a Dalmatian"
	},
{
	"item": "elephant",
	"label": "a sports car"
	},
{
	"item": "elephant",
	"label": "a bedside table"
	},
{
	"item": "elephant",
	"label": "M&M's"
	},
{
	"item": "elephant",
	"label": "a rose"
	},
{
	"item": "elephant",
	"label": "a coffee table"
	},
{
	"item": "elephant",
	"label": "a dress shirt"
	},
{
	"item": "elephant",
	"label": "candy"
	},
{
	"item": "elephant",
	"label": "a shirt"
	},
{
	"item": "elephant",
	"label": "a snack"
	},
{
	"item": "elephant",
	"label": "clothing"
	},
	//firetruck
	{
	"item": "firetruck",
	"label": "a convertible"
	},
{
	"item": "firetruck",
	"label": "a sports car"
	},
{
	"item": "firetruck",
	"label": "an SUV"
	},
{
	"item": "firetruck",
	"label": "a minivan"
	},
{
	"item": "firetruck",
	"label": "a Hawaii shirt"
	},
{
	"item": "firetruck",
	"label": "a dining table"
	},
{
	"item": "firetruck",
	"label": "a grizzly bear"
	},
{
	"item": "firetruck",
	"label": "a swordfish"
	},
{
	"item": "firetruck",
	"label": "a catfish"
	},
{
	"item": "firetruck",
	"label": "gummy bears"
	},
{
	"item": "firetruck",
	"label": "a polo shirt"
	},
{
	"item": "firetruck",
	"label": "a picnic table"
	},
{
	"item": "firetruck",
	"label": "a black bear"
	},
{
	"item": "firetruck",
	"label": "a German Shepherd"
	},
{
	"item": "firetruck",
	"label": "a polar bear"
	},
{
	"item": "firetruck",
	"label": "a car"
	},
{
	"item": "firetruck",
	"label": "a shirt"
	},
{
	"item": "firetruck",
	"label": "a table"
	},
{
	"item": "firetruck",
	"label": "a bear"
	},
{
	"item": "firetruck",
	"label": "a fish"
	},
{
	"item": "firetruck",
	"label": "candy"
	},
{
	"item": "firetruck",
	"label": "a dog"
	},
{
	"item": "firetruck",
	"label": "a vehicle"
	},
{
	"item": "firetruck",
	"label": "clothing"
	},
{
	"item": "firetruck",
	"label": "furniture"
	},
{
	"item": "firetruck",
	"label": "an animal"
	},
{
	"item": "firetruck",
	"label": "a snack"
	},
{
	"item": "firetruck",
	"label": "jelly beans"
	},
{
	"item": "firetruck",
	"label": "a tulip"
	},
{
	"item": "firetruck",
	"label": "a rose"
	},
{
	"item": "firetruck",
	"label": "a hummingbird"
	},
{
	"item": "firetruck",
	"label": "a clownfish"
	},
{
	"item": "firetruck",
	"label": "a sunflower"
	},
{
	"item": "firetruck",
	"label": "a Husky"
	},
{
	"item": "firetruck",
	"label": "a pigeon"
	},
{
	"item": "firetruck",
	"label": "an eagle"
	},
{
	"item": "firetruck",
	"label": "Skittles"
	},
{
	"item": "firetruck",
	"label": "a flower"
	},
{
	"item": "firetruck",
	"label": "a bird"
	},
{
	"item": "firetruck",
	"label": "a plant"
	},
	// gloves
{
	"item": "gloves",
	"label": "a polo shirt"
	},
{
	"item": "gloves",
	"label": "a Hawaii shirt"
	},
{
	"item": "gloves",
	"label": "a T-Shirt"
	},
{
	"item": "gloves",
	"label": "a dress shirt"
	},
{
	"item": "gloves",
	"label": "a grizzly bear"
	},
{
	"item": "gloves",
	"label": "a German Shepherd"
	},
{
	"item": "gloves",
	"label": "a black bear"
	},
{
	"item": "gloves",
	"label": "a panda bear"
	},
{
	"item": "gloves",
	"label": "M&M's"
	},
{
	"item": "gloves",
	"label": "a sunflower"
	},
{
	"item": "gloves",
	"label": "Skittles"
	},
{
	"item": "gloves",
	"label": "a Dalmatian"
	},
{
	"item": "gloves",
	"label": "a swordfish"
	},
{
	"item": "gloves",
	"label": "a coffee table"
	},
{
	"item": "gloves",
	"label": "a shirt"
	},
{
	"item": "gloves",
	"label": "a bear"
	},
{
	"item": "gloves",
	"label": "a dog"
	},
{
	"item": "gloves",
	"label": "candy"
	},
{
	"item": "gloves",
	"label": "a flower"
	},
{
	"item": "gloves",
	"label": "a fish"
	},
{
	"item": "gloves",
	"label": "a table"
	},
{
	"item": "gloves",
	"label": "a clothing"
	},
{
	"item": "gloves",
	"label": "an animal"
	},
{
	"item": "gloves",
	"label": "a snack"
	},
{
	"item": "gloves",
	"label": "a plant"
	},
{
	"item": "gloves",
	"label": "furniture"
	},
{
	"item": "gloves",
	"label": "a picnic table"
	},
{
	"item": "gloves",
	"label": "a minivan"
	},
{
	"item": "gloves",
	"label": "a clownfish"
	},
{
	"item": "gloves",
	"label": "a car"
	},
{
	"item": "gloves",
	"label": "a vehicle"
	},
	//grasses
	{
	"item": "grasses",
	"label": "a rose"
	},
{
	"item": "grasses",
	"label": "a sunflower"
	},
{
	"item": "grasses",
	"label": "a daisy"
	},
{
	"item": "grasses",
	"label": "a tulip"
	},
{
	"item": "grasses",
	"label": "a T-Shirt"
	},
{
	"item": "grasses",
	"label": "Skittles"
	},
{
	"item": "grasses",
	"label": "a polar bear"
	},
{
	"item": "grasses",
	"label": "a clownfish"
	},
{
	"item": "grasses",
	"label": "a convertible"
	},
{
	"item": "grasses",
	"label": "a goldfish"
	},
{
	"item": "grasses",
	"label": "an eagle"
	},
{
	"item": "grasses",
	"label": "a black bear"
	},
{
	"item": "grasses",
	"label": "a hummingbird"
	},
{
	"item": "grasses",
	"label": "a Husky"
	},
{
	"item": "grasses",
	"label": "a picnic table"
	},
{
	"item": "grasses",
	"label": "a pigeon"
	},
{
	"item": "grasses",
	"label": "a flower"
	},
{
	"item": "grasses",
	"label": "a shirt"
	},
{
	"item": "grasses",
	"label": "candy"
	},
{
	"item": "grasses",
	"label": "a bear"
	},
{
	"item": "grasses",
	"label": "a fish"
	},
{
	"item": "grasses",
	"label": "a car"
	},
{
	"item": "grasses",
	"label": "a bird"
	},
{
	"item": "grasses",
	"label": "a dog"
	},
{
	"item": "grasses",
	"label": "a table"
	},
{
	"item": "grasses",
	"label": "a plant"
	},
{
	"item": "grasses",
	"label": "clothing"
	},
{
	"item": "grasses",
	"label": "a snack"
	},
{
	"item": "grasses",
	"label": "an animal"
	},
{
	"item": "grasses",
	"label": "a vehicle"
	},
{
	"item": "grasses",
	"label": "furniture"
	},
{
	"item": "grasses",
	"label": "a panda bear"
	},
{
	"item": "grasses",
	"label": "an SUV"
	},
{
	"item": "grasses",
	"label": "M&M's"
	},
{
	"item": "grasses",
	"label": "a minivan"
	},
{
	"item": "grasses",
	"label": "a Pug"
	},
{
	"item": "grasses",
	"label": "a polo shirt"
	},
{
	"item": "grasses",
	"label": "a Dalmatian"
	},
{
	"item": "grasses",
	"label": "a grizzly bear"
	},
	//horse
	{
	"item": "horse",
	"label": "a goldfish"
	},
{
	"item": "horse",
	"label": "a clownfish"
	},
{
	"item": "horse",
	"label": "a German Shepherd"
	},
{
	"item": "horse",
	"label": "a Husky"
	},
{
	"item": "horse",
	"label": "a Dalmatian"
	},
{
	"item": "horse",
	"label": "a hummingbird"
	},
{
	"item": "horse",
	"label": "a swordfish"
	},
{
	"item": "horse",
	"label": "a black bear"
	},
{
	"item": "horse",
	"label": "a panda bear"
	},
{
	"item": "horse",
	"label": "a dress shirt"
	},
{
	"item": "horse",
	"label": "a bedside table"
	},
{
	"item": "horse",
	"label": "a daisy"
	},
{
	"item": "horse",
	"label": "a grizzly bear"
	},
{
	"item": "horse",
	"label": "gummy bears"
	},
{
	"item": "horse",
	"label": "a Hawaii shirt"
	},
{
	"item": "horse",
	"label": "a fish"
	},
{
	"item": "horse",
	"label": "a dog"
	},
{
	"item": "horse",
	"label": "a bird"
	},
{
	"item": "horse",
	"label": "a bear"
	},
{
	"item": "horse",
	"label": "a shirt"
	},
{
	"item": "horse",
	"label": "a table"
	},
{
	"item": "horse",
	"label": "a flower"
	},
{
	"item": "horse",
	"label": "candy"
	},
{
	"item": "horse",
	"label": "an animal"
	},
{
	"item": "horse",
	"label": "clothing"
	},
{
	"item": "horse",
	"label": "furniture"
	},
{
	"item": "horse",
	"label": "a plant"
	},
{
	"item": "horse",
	"label": "a snack"
	},
{
	"item": "horse",
	"label": "an eagle"
	},
{
	"item": "horse",
	"label": "a catfish"
	},
{
	"item": "horse",
	"label": "a polar bear"
	},
{
	"item": "horse",
	"label": "a tulip"
	},
{
	"item": "horse",
	"label": "a rose"
	},
{
	"item": "horse",
	"label": "a convertible"
	},
{
	"item": "horse",
	"label": "a minivan"
	},
{
	"item": "horse",
	"label": "a car"
	},
{
	"item": "horse",
	"label": "a vehicle"
	},
	//iguana
	{
	"item": "iguana",
	"label": "a catfish"
	},
{
	"item": "iguana",
	"label": "a pigeon"
	},
{
	"item": "iguana",
	"label": "a swordfish"
	},
{
	"item": "iguana",
	"label": "a German Shepherd"
	},
{
	"item": "iguana",
	"label": "a panda bear"
	},
{
	"item": "iguana",
	"label": "a clownfish"
	},
{
	"item": "iguana",
	"label": "a goldfish"
	},
{
	"item": "iguana",
	"label": "a black bear"
	},
{
	"item": "iguana",
	"label": "a Pug"
	},
{
	"item": "iguana",
	"label": "a grizzly bear"
	},
{
	"item": "iguana",
	"label": "a parrot"
	},
{
	"item": "iguana",
	"label": "a bedside table"
	},
{
	"item": "iguana",
	"label": "a minivan"
	},
{
	"item": "iguana",
	"label": "a convertible"
	},
{
	"item": "iguana",
	"label": "M&M's"
	},
{
	"item": "iguana",
	"label": "a sunflower"
	},
{
	"item": "iguana",
	"label": "a dining table"
	},
{
	"item": "iguana",
	"label": "a fish"
	},
{
	"item": "iguana",
	"label": "a bird"
	},
{
	"item": "iguana",
	"label": "a dog"
	},
{
	"item": "iguana",
	"label": "a bear"
	},
{
	"item": "iguana",
	"label": "a table"
	},
{
	"item": "iguana",
	"label": "a car"
	},
{
	"item": "iguana",
	"label": "candy"
	},
{
	"item": "iguana",
	"label": "a flower"
	},
{
	"item": "iguana",
	"label": "an animal"
	},
{
	"item": "iguana",
	"label": "furniture"
	},
{
	"item": "iguana",
	"label": "a vehicle"
	},
{
	"item": "iguana",
	"label": "a snack"
	},
{
	"item": "iguana",
	"label": "a plant"
	},
{
	"item": "iguana",
	"label": "an eagle"
	},
{
	"item": "iguana",
	"label": "a Husky"
	},
{
	"item": "iguana",
	"label": "jelly beans"
	},
{
	"item": "iguana",
	"label": "a sports car"
	},
{
	"item": "iguana",
	"label": "Skittles"
	},
	// ivy
	{
	"item": "ivy",
	"label": "a sunflower"
	},
{
	"item": "ivy",
	"label": "a tulip"
	},
{
	"item": "ivy",
	"label": "a daisy"
	},
{
	"item": "ivy",
	"label": "a rose"
	},
{
	"item": "ivy",
	"label": "a picnic table"
	},
{
	"item": "ivy",
	"label": "a Dalmatian"
	},
{
	"item": "ivy",
	"label": "a polar bear"
	},
{
	"item": "ivy",
	"label": "a polo shirt"
	},
{
	"item": "ivy",
	"label": "a parrot"
	},
{
	"item": "ivy",
	"label": "a Pug"
	},
{
	"item": "ivy",
	"label": "a black bear"
	},
{
	"item": "ivy",
	"label": "a hummingbird"
	},
{
	"item": "ivy",
	"label": "a dress shirt"
	},
{
	"item": "ivy",
	"label": "a Husky"
	},
{
	"item": "ivy",
	"label": "an eagle"
	},
{
	"item": "ivy",
	"label": "a Hawaii shirt"
	},
{
	"item": "ivy",
	"label": "a flower"
	},
{
	"item": "ivy",
	"label": "a table"
	},
{
	"item": "ivy",
	"label": "a dog"
	},
{
	"item": "ivy",
	"label": "a bear"
	},
{
	"item": "ivy",
	"label": "a shirt"
	},
{
	"item": "ivy",
	"label": "a bird"
	},
{
	"item": "ivy",
	"label": "a plant"
	},
{
	"item": "ivy",
	"label": "furniture"
	},
{
	"item": "ivy",
	"label": "an animal"
	},
{
	"item": "ivy",
	"label": "clothing"
	},
{
	"item": "ivy",
	"label": "M&M's"
	},
{
	"item": "ivy",
	"label": "Skittles"
	},
{
	"item": "ivy",
	"label": "a clownfish"
	},
{
	"item": "ivy",
	"label": "a minivan"
	},
{
	"item": "ivy",
	"label": "a T-Shirt"
	},
{
	"item": "ivy",
	"label": "a pigeon"
	},
{
	"item": "ivy",
	"label": "a catfish"
	},
{
	"item": "ivy",
	"label": "a grizzly bear"
	},
{
	"item": "ivy",
	"label": "an SUV"
	},
{
	"item": "ivy",
	"label": "gummy bears"
	},
{
	"item": "ivy",
	"label": "candy"
	},
{
	"item": "ivy",
	"label": "a fish"
	},
{
	"item": "ivy",
	"label": "a car"
	},
{
	"item": "ivy",
	"label": "a snack"
	},
{
	"item": "ivy",
	"label": "a vehicle"
	},
	//kitten
	{
	"item": "kitten",
	"label": "a goldfish"
	},
{
	"item": "kitten",
	"label": "a panda bear"
	},
{
	"item": "kitten",
	"label": "a German Shepherd"
	},
{
	"item": "kitten",
	"label": "a pigeon"
	},
{
	"item": "kitten",
	"label": "a black bear"
	},
{
	"item": "kitten",
	"label": "a polar bear"
	},
{
	"item": "kitten",
	"label": "a swordfish"
	},
{
	"item": "kitten",
	"label": "a parrot"
	},
{
	"item": "kitten",
	"label": "a clownfish"
	},
{
	"item": "kitten",
	"label": "a catfish"
	},
{
	"item": "kitten",
	"label": "a hummingbird"
	},
{
	"item": "kitten",
	"label": "a grizzly bear"
	},
{
	"item": "kitten",
	"label": "a Pug"
	},
{
	"item": "kitten",
	"label": "a rose"
	},
{
	"item": "kitten",
	"label": "a minivan"
	},
{
	"item": "kitten",
	"label": "a T-Shirt"
	},
{
	"item": "kitten",
	"label": "a fish"
	},
{
	"item": "kitten",
	"label": "a bear"
	},
{
	"item": "kitten",
	"label": "a dog"
	},
{
	"item": "kitten",
	"label": "a bird"
	},
{
	"item": "kitten",
	"label": "a flower"
	},
{
	"item": "kitten",
	"label": "a car"
	},
{
	"item": "kitten",
	"label": "a shirt"
	},
{
	"item": "kitten",
	"label": "an animal"
	},
{
	"item": "kitten",
	"label": "a plant"
	},
{
	"item": "kitten",
	"label": "a vehicle"
	},
{
	"item": "kitten",
	"label": "clothing"
	},
{
	"item": "kitten",
	"label": "a Dalmatian"
	},
{
	"item": "kitten",
	"label": "a tulip"
	},
{
	"item": "kitten",
	"label": "a Hawaii shirt"
	},
{
	"item": "kitten",
	"label": "a picnic table"
	},
{
	"item": "kitten",
	"label": "a coffee table"
	},
{
	"item": "kitten",
	"label": "a table"
	},
{
	"item": "kitten",
	"label": "furniture"
	},
	//lamp
	{
	"item": "lamp",
	"label": "a bedside table"
	},
{
	"item": "lamp",
	"label": "a picnic table"
	},
{
	"item": "lamp",
	"label": "a dining table"
	},
{
	"item": "lamp",
	"label": "a grizzly bear"
	},
{
	"item": "lamp",
	"label": "a Hawaii shirt"
	},
{
	"item": "lamp",
	"label": "a Husky"
	},
{
	"item": "lamp",
	"label": "an eagle"
	},
{
	"item": "lamp",
	"label": "a German Shepherd"
	},
{
	"item": "lamp",
	"label": "gummy bears"
	},
{
	"item": "lamp",
	"label": "a polar bear"
	},
{
	"item": "lamp",
	"label": "a swordfish"
	},
{
	"item": "lamp",
	"label": "a catfish"
	},
{
	"item": "lamp",
	"label": "a tulip"
	},
{
	"item": "lamp",
	"label": "a dress shirt"
	},
	{
	"item": "lamp",
	"label": "a Dalmatian"
	},
{
	"item": "lamp",
	"label": "jelly beans"
	},
{
	"item": "lamp",
	"label": "a panda bear"
	},
{
	"item": "lamp",
	"label": "a minivan"
	},
{
	"item": "lamp",
	"label": "a parrot"
	},
{
	"item": "lamp",
	"label": "a sports car"
	},
{
	"item": "lamp",
	"label": "a goldfish"
	},
{
	"item": "lamp",
	"label": "a table"
	},
{
	"item": "lamp",
	"label": "a bear"
	},
{
	"item": "lamp",
	"label": "a shirt"
	},
{
	"item": "lamp",
	"label": "a dog"
	},
{
	"item": "lamp",
	"label": "a bird"
	},
{
	"item": "lamp",
	"label": "candy"
	},
{
	"item": "lamp",
	"label": "a fish"
	},
{
	"item": "lamp",
	"label": "a flower"
	},
{
	"item": "lamp",
	"label": "a car"
	},
{
	"item": "lamp",
	"label": "furniture"
	},
{
	"item": "lamp",
	"label": "an animal"
	},
{
	"item": "lamp",
	"label": "clothing"
	},
{
	"item": "lamp",
	"label": "a snack"
	},
{
	"item": "lamp",
	"label": "a plant"
	},
{
	"item": "lamp",
	"label": "a vehicle"
	},
{
	"item": "lamp",
	"label": "a sunflower"
	},
{
	"item": "lamp",
	"label": "a T-Shirt"
	},
{
	"item": "lamp",
	"label": "a coffee table"
	},
{
	"item": "lamp",
	"label": "a hummingbird"
	},
	// lion
{
	"item": "lion",
	"label": "a German Shepherd"
	},
{
	"item": "lion",
	"label": "a Pug"
	},
{
	"item": "lion",
	"label": "a catfish"
	},
{
	"item": "lion",
	"label": "a parrot"
	},
{
	"item": "lion",
	"label": "an eagle"
	},
{
	"item": "lion",
	"label": "a swordfish"
	},
{
	"item": "lion",
	"label": "a sports car"
	},
{
	"item": "lion",
	"label": "a goldfish"
	},
{
	"item": "lion",
	"label": "a dress shirt"
	},
{
	"item": "lion",
	"label": "jelly beans"
	},
{
	"item": "lion",
	"label": "a sunflower"
	},
{
	"item": "lion",
	"label": "an SUV"
	},
{
	"item": "lion",
	"label": "a coffee table"
	},
{
	"item": "lion",
	"label": "a dog"
	},
{
	"item": "lion",
	"label": "a fish"
	},
{
	"item": "lion",
	"label": "a bird"
	},
{
	"item": "lion",
	"label": "a car"
	},
{
	"item": "lion",
	"label": "a shirt"
	},
{
	"item": "lion",
	"label": "candy"
	},
{
	"item": "lion",
	"label": "a flower"
	},
{
	"item": "lion",
	"label": "a table"
	},
{
	"item": "lion",
	"label": "an animal"
	},
{
	"item": "lion",
	"label": "a vehicle"
	},
{
	"item": "lion",
	"label": "clothing"
	},
{
	"item": "lion",
	"label": "a snack"
	},
{
	"item": "lion",
	"label": "a plant"
	},
{
	"item": "lion",
	"label": "furniture"
	},
{
	"item": "lion",
	"label": "a black bear"
	},
{
	"item": "lion",
	"label": "a clownfish"
	},
{
	"item": "lion",
	"label": "a pigeon"
	},
{
	"item": "lion",
	"label": "a grizzly bear"
	},
{
	"item": "lion",
	"label": "a hummingbird"
	},
{
	"item": "lion",
	"label": "a T-Shirt"
	},
{
	"item": "lion",
	"label": "a polar bear"
	},
{
	"item": "lion",
	"label": "a Dalmatian"
	},
{
	"item": "lion",
	"label": "a dining table"
	},
{
	"item": "lion",
	"label": "a bear"
	},
	//lobster
	{
	"item": "lobster",
	"label": "a parrot"
	},
{
	"item": "lobster",
	"label": "a Husky"
	},
{
	"item": "lobster",
	"label": "a Pug"
	},
{
	"item": "lobster",
	"label": "a black bear"
	},
{
	"item": "lobster",
	"label": "a catfish"
	},
{
	"item": "lobster",
	"label": "a grizzly bear"
	},
{
	"item": "lobster",
	"label": "a goldfish"
	},
{
	"item": "lobster",
	"label": "a clownfish"
	},
{
	"item": "lobster",
	"label": "a Dalmatian"
	},
{
	"item": "lobster",
	"label": "a swordfish"
	},
{
	"item": "lobster",
	"label": "a pigeon"
	},
{
	"item": "lobster",
	"label": "jelly beans"
	},
{
	"item": "lobster",
	"label": "a tulip"
	},
{
	"item": "lobster",
	"label": "a Hawaii shirt"
	},
{
	"item": "lobster",
	"label": "a dining table"
	},
{
	"item": "lobster",
	"label": "a convertible"
	},
{
	"item": "lobster",
	"label": "a bird"
	},
{
	"item": "lobster",
	"label": "a dog"
	},
{
	"item": "lobster",
	"label": "a bear"
	},
{
	"item": "lobster",
	"label": "a fish"
	},
{
	"item": "lobster",
	"label": "candy"
	},
{
	"item": "lobster",
	"label": "a flower"
	},
{
	"item": "lobster",
	"label": "a shirt"
	},
{
	"item": "lobster",
	"label": "a table"
	},
{
	"item": "lobster",
	"label": "a car"
	},
{
	"item": "lobster",
	"label": "an animal"
	},
{
	"item": "lobster",
	"label": "a snack"
	},
{
	"item": "lobster",
	"label": "a plant"
	},
{
	"item": "lobster",
	"label": "clothing"
	},
{
	"item": "lobster",
	"label": "furniture"
	},
{
	"item": "lobster",
	"label": "a vehicle"
	},
{
	"item": "lobster",
	"label": "a panda bear"
	},
{
	"item": "lobster",
	"label": "a German Shepherd"
	},
{
	"item": "lobster",
	"label": "a sports car"
	},
{
	"item": "lobster",
	"label": "an SUV"
	},
{
	"item": "lobster",
	"label": "M&M's"
	},
{
	"item": "lobster",
	"label": "Skittles"
	},
{
	"item": "lobster",
	"label": "a dress shirt"
	},
	//motorcycle
	{
	"item": "motorcycle",
	"label": "a sports car"
	},
{
	"item": "motorcycle",
	"label": "a minivan"
	},
{
	"item": "motorcycle",
	"label": "an SUV"
	},
{
	"item": "motorcycle",
	"label": "a convertible"
	},
{
	"item": "motorcycle",
	"label": "a German Shepherd"
	},
{
	"item": "motorcycle",
	"label": "a Husky"
	},
{
	"item": "motorcycle",
	"label": "a hummingbird"
	},
{
	"item": "motorcycle",
	"label": "a polar bear"
	},
{
	"item": "motorcycle",
	"label": "a coffee table"
	},
{
	"item": "motorcycle",
	"label": "a picnic table"
	},
{
	"item": "motorcycle",
	"label": "a polo shirt"
	},
{
	"item": "motorcycle",
	"label": "a car"
	},
{
	"item": "motorcycle",
	"label": "a dog"
	},
{
	"item": "motorcycle",
	"label": "a bird"
	},
{
	"item": "motorcycle",
	"label": "a bear"
	},
{
	"item": "motorcycle",
	"label": "a table"
	},
{
	"item": "motorcycle",
	"label": "a shirt"
	},
{
	"item": "motorcycle",
	"label": "a vehicle"
	},
{
	"item": "motorcycle",
	"label": "an animal"
	},
{
	"item": "motorcycle",
	"label": "furniture"
	},
{
	"item": "motorcycle",
	"label": "clothing"
	},
{
	"item": "motorcycle",
	"label": "a T-Shirt"
	},
{
	"item": "motorcycle",
	"label": "an eagle"
	},
{
	"item": "motorcycle",
	"label": "a goldfish"
	},
{
	"item": "motorcycle",
	"label": "a pigeon"
	},
{
	"item": "motorcycle",
	"label": "a grizzly bear"
	},
{
	"item": "motorcycle",
	"label": "a swordfish"
	},
{
	"item": "motorcycle",
	"label": "a fish"
	},
	//pig
	{
	"item": "pig",
	"label": "a clownfish"
	},
{
	"item": "pig",
	"label": "a German Shepherd"
	},
{
	"item": "pig",
	"label": "a polar bear"
	},
{
	"item": "pig",
	"label": "a catfish"
	},
{
	"item": "pig",
	"label": "a panda bear"
	},
{
	"item": "pig",
	"label": "a Pug"
	},
{
	"item": "pig",
	"label": "a Dalmatian"
	},
{
	"item": "pig",
	"label": "an eagle"
	},
{
	"item": "pig",
	"label": "a parrot"
	},
{
	"item": "pig",
	"label": "a pigeon"
	},
{
	"item": "pig",
	"label": "a swordfish"
	},
{
	"item": "pig",
	"label": "a T-Shirt"
	},
{
	"item": "pig",
	"label": "a Hawaii shirt"
	},
{
	"item": "pig",
	"label": "a dress shirt"
	},
{
	"item": "pig",
	"label": "a fish"
	},
{
	"item": "pig",
	"label": "a dog"
	},
{
	"item": "pig",
	"label": "a bear"
	},
{
	"item": "pig",
	"label": "a bird"
	},
{
	"item": "pig",
	"label": "a shirt"
	},
{
	"item": "pig",
	"label": "an animal"
	},
{
	"item": "pig",
	"label": "clothing"
	},
{
	"item": "pig",
	"label": "a Husky"
	},
{
	"item": "pig",
	"label": "a goldfish"
	},
{
	"item": "pig",
	"label": "a black bear"
	},
{
	"item": "pig",
	"label": "a hummingbird"
	},
{
	"item": "pig",
	"label": "a polo shirt"
	},
// popcorn
{
	"item": "popcorn",
	"label": "gummy bears"
	},
{
	"item": "popcorn",
	"label": "jelly beans"
	},
{
	"item": "popcorn",
	"label": "Skittles"
	},
{
	"item": "popcorn",
	"label": "M&M's"
	},
{
	"item": "popcorn",
	"label": "a T-Shirt"
	},
{
	"item": "popcorn",
	"label": "a Pug"
	},
{
	"item": "popcorn",
	"label": "an SUV"
	},
{
	"item": "popcorn",
	"label": "a catfish"
	},
{
	"item": "popcorn",
	"label": "a German Shepherd"
	},
{
	"item": "popcorn",
	"label": "an eagle"
	},
{
	"item": "popcorn",
	"label": "a pigeon"
	},
{
	"item": "popcorn",
	"label": "candy"
	},
{
	"item": "popcorn",
	"label": "a shirt"
	},
{
	"item": "popcorn",
	"label": "a dog"
	},
{
	"item": "popcorn",
	"label": "a car"
	},
{
	"item": "popcorn",
	"label": "a fish"
	},
{
	"item": "popcorn",
	"label": "a bird"
	},
{
	"item": "popcorn",
	"label": "a snack"
	},
{
	"item": "popcorn",
	"label": "clothing"
	},
{
	"item": "popcorn",
	"label": "an animal"
	},
{
	"item": "popcorn",
	"label": "a vehicle"
	},
{
	"item": "popcorn",
	"label": "a parrot"
	},
{
	"item": "popcorn",
	"label": "a Husky"
	},
{
	"item": "popcorn",
	"label": "a coffee table"
	},
{
	"item": "popcorn",
	"label": "a hummingbird"
	},
{
	"item": "popcorn",
	"label": "a bedside table"
	},
{
	"item": "popcorn",
	"label": "a black bear"
	},
{
	"item": "popcorn",
	"label": "a convertible"
	},
{
	"item": "popcorn",
	"label": "a daisy"
	},
{
	"item": "popcorn",
	"label": "a table"
	},
{
	"item": "popcorn",
	"label": "a bear"
	},
{
	"item": "popcorn",
	"label": "a flower"
	},
{
	"item": "popcorn",
	"label": "a furniture"
	},
{
	"item": "popcorn",
	"label": "a plant"
	},
	//pottedPlant
	{
	"item": "pottedPlant",
	"label": "a rose"
	},
{
	"item": "pottedPlant",
	"label": "a tulip"
	},
{
	"item": "pottedPlant",
	"label": "a daisy"
	},
{
	"item": "pottedPlant",
	"label": "a sunflower"
	},
{
	"item": "pottedPlant",
	"label": "a bedside table"
	},
{
	"item": "pottedPlant",
	"label": "a convertible"
	},
{
	"item": "pottedPlant",
	"label": "a Pug"
	},
{
	"item": "pottedPlant",
	"label": "a panda bear"
	},
{
	"item": "pottedPlant",
	"label": "a goldfish"
	},
{
	"item": "pottedPlant",
	"label": "a pigeon"
	},
{
	"item": "pottedPlant",
	"label": "a black bear"
	},
{
	"item": "pottedPlant",
	"label": "a parrot"
	},
{
	"item": "pottedPlant",
	"label": "a grizzly bear"
	},
{
	"item": "pottedPlant",
	"label": "a catfish"
	},
{
	"item": "pottedPlant",
	"label": "a flower"
	},
{
	"item": "pottedPlant",
	"label": "a table"
	},
{
	"item": "pottedPlant",
	"label": "a car"
	},
{
	"item": "pottedPlant",
	"label": "a dog"
	},
{
	"item": "pottedPlant",
	"label": "a bear"
	},
{
	"item": "pottedPlant",
	"label": "a fish"
	},
{
	"item": "pottedPlant",
	"label": "a bird"
	},
{
	"item": "pottedPlant",
	"label": "a plant"
	},
{
	"item": "pottedPlant",
	"label": "furniture"
	},
{
	"item": "pottedPlant",
	"label": "a vehicle"
	},
{
	"item": "pottedPlant",
	"label": "an animal"
	},
{
	"item": "pottedPlant",
	"label": "a clownfish"
	},
{
	"item": "pottedPlant",
	"label": "a German Shepherd"
	},
{
	"item": "pottedPlant",
	"label": "a polar bear"
	},
{
	"item": "pottedPlant",
	"label": "a picnic table"
	},
	//pretzels
	{
	"item": "pretzels",
	"label": "M&M's"
	},
{
	"item": "pretzels",
	"label": "Skittles"
	},
{
	"item": "pretzels",
	"label": "gummy bears"
	},
{
	"item": "pretzels",
	"label": "jelly beans"
	},
{
	"item": "pretzels",
	"label": "a polo shirt"
	},
{
	"item": "pretzels",
	"label": "a dress shirt"
	},
{
	"item": "pretzels",
	"label": "a minivan"
	},
{
	"item": "pretzels",
	"label": "a hummingbird"
	},
{
	"item": "pretzels",
	"label": "a catfish"
	},
{
	"item": "pretzels",
	"label": "a Husky"
	},
{
	"item": "pretzels",
	"label": "a Pug"
	},
{
	"item": "pretzels",
	"label": "a rose"
	},
{
	"item": "pretzels",
	"label": "a T-Shirt"
	},
{
	"item": "pretzels",
	"label": "a sports car"
	},
{
	"item": "pretzels",
	"label": "a bedside table"
	},
{
	"item": "pretzels",
	"label": "a dining table"
	},
{
	"item": "pretzels",
	"label": "a Dalmatian"
	},
{
	"item": "pretzels",
	"label": "candy"
	},
{
	"item": "pretzels",
	"label": "a shirt"
	},
{
	"item": "pretzels",
	"label": "a car"
	},
{
	"item": "pretzels",
	"label": "a bird"
	},
{
	"item": "pretzels",
	"label": "a fish"
	},
{
	"item": "pretzels",
	"label": "a dog"
	},
{
	"item": "pretzels",
	"label": "a flower"
	},
{
	"item": "pretzels",
	"label": "a table"
	},
{
	"item": "pretzels",
	"label": "a snack"
	},
{
	"item": "pretzels",
	"label": "clothing"
	},
{
	"item": "pretzels",
	"label": "a vehicle"
	},
{
	"item": "pretzels",
	"label": "an animal"
	},
{
	"item": "pretzels",
	"label": "a plant"
	},
{
	"item": "pretzels",
	"label": "furniture"
	},
{
	"item": "pretzels",
	"label": "a Hawaii shirt"
	},
{
	"item": "pretzels",
	"label": "a polar bear"
	},
{
	"item": "pretzels",
	"label": "a grizzly bear"
	},
{
	"item": "pretzels",
	"label": "a clownfish"
	},
{
	"item": "pretzels",
	"label": "a parrot"
	},
{
	"item": "pretzels",
	"label": "a black bear"
	},
{
	"item": "pretzels",
	"label": "a picnic table"
	},
{
	"item": "pretzels",
	"label": "a coffee table"
	},
{
	"item": "pretzels",
	"label": "a bear"
	},
	//rabbit
	{
	"item": "rabbit",
	"label": "a panda bear"
	},
{
	"item": "rabbit",
	"label": "a hummingbird"
	},
{
	"item": "rabbit",
	"label": "a Dalmatian"
	},
{
	"item": "rabbit",
	"label": "a Pug"
	},
{
	"item": "rabbit",
	"label": "a pigeon"
	},
{
	"item": "rabbit",
	"label": "a goldfish"
	},
{
	"item": "rabbit",
	"label": "a parrot"
	},
{
	"item": "rabbit",
	"label": "a black bear"
	},
{
	"item": "rabbit",
	"label": "an eagle"
	},
{
	"item": "rabbit",
	"label": "a polar bear"
	},
{
	"item": "rabbit",
	"label": "gummy bears"
	},
{
	"item": "rabbit",
	"label": "a T-Shirt"
	},
{
	"item": "rabbit",
	"label": "a tulip"
	},
{
	"item": "rabbit",
	"label": "a bedside table"
	},
{
	"item": "rabbit",
	"label": "a picnic table"
	},
{
	"item": "rabbit",
	"label": "a polo shirt"
	},
{
	"item": "rabbit",
	"label": "a coffee table"
	},
{
	"item": "rabbit",
	"label": "jelly beans"
	},
{
	"item": "rabbit",
	"label": "M&M's"
	},
{
	"item": "rabbit",
	"label": "a sunflower"
	},
{
	"item": "rabbit",
	"label": "a bear"
	},
{
	"item": "rabbit",
	"label": "a bird"
	},
{
	"item": "rabbit",
	"label": "a dog"
	},
{
	"item": "rabbit",
	"label": "a fish"
	},
{
	"item": "rabbit",
	"label": "candy"
	},
{
	"item": "rabbit",
	"label": "a shirt"
	},
{
	"item": "rabbit",
	"label": "a flower"
	},
{
	"item": "rabbit",
	"label": "a table"
	},
{
	"item": "rabbit",
	"label": "an animal"
	},
{
	"item": "rabbit",
	"label": "a snack"
	},
{
	"item": "rabbit",
	"label": "clothing"
	},
{
	"item": "rabbit",
	"label": "a plant"
	},
{
	"item": "rabbit",
	"label": "furniture"
	},
{
	"item": "rabbit",
	"label": "a catfish"
	},
{
	"item": "rabbit",
	"label": "a Husky"
	},
{
	"item": "rabbit",
	"label": "a clownfish"
	},
{
	"item": "rabbit",
	"label": "a grizzly bear"
	},
{
	"item": "rabbit",
	"label": "a convertible"
	},
{
	"item": "rabbit",
	"label": "a dining table"
	},
{
	"item": "rabbit",
	"label": "a sports car"
	},
{
	"item": "rabbit",
	"label": "a car"
	},
{
	"item": "rabbit",
	"label": "a vehicle"
	},
	//rhino
	{
	"item": "rhino",
	"label": "a goldfish"
	},
{
	"item": "rhino",
	"label": "a swordfish"
	},
{
	"item": "rhino",
	"label": "a Pug"
	},
{
	"item": "rhino",
	"label": "an eagle"
	},
{
	"item": "rhino",
	"label": "a pigeon"
	},
{
	"item": "rhino",
	"label": "a parrot"
	},
{
	"item": "rhino",
	"label": "a panda bear"
	},
{
	"item": "rhino",
	"label": "a polar bear"
	},
{
	"item": "rhino",
	"label": "a T-Shirt"
	},
{
	"item": "rhino",
	"label": "a Hawaii shirt"
	},
{
	"item": "rhino",
	"label": "M&M's"
	},
{
	"item": "rhino",
	"label": "a hummingbird"
	},
{
	"item": "rhino",
	"label": "a sunflower"
	},
{
	"item": "rhino",
	"label": "a sports car"
	},
{
	"item": "rhino",
	"label": "a clownfish"
	},
{
	"item": "rhino",
	"label": "a Dalmatian"
	},
{
	"item": "rhino",
	"label": "a dress shirt"
	},
{
	"item": "rhino",
	"label": "a fish"
	},
{
	"item": "rhino",
	"label": "a dog"
	},
{
	"item": "rhino",
	"label": "a bird"
	},
{
	"item": "rhino",
	"label": "a bear"
	},
{
	"item": "rhino",
	"label": "a shirt"
	},
{
	"item": "rhino",
	"label": "candy"
	},
{
	"item": "rhino",
	"label": "a flower"
	},
{
	"item": "rhino",
	"label": "a car"
	},
{
	"item": "rhino",
	"label": "an animal"
	},
{
	"item": "rhino",
	"label": "clothing"
	},
{
	"item": "rhino",
	"label": "a snack"
	},
{
	"item": "rhino",
	"label": "a plant"
	},
{
	"item": "rhino",
	"label": "a vehicle"
	},
{
	"item": "rhino",
	"label": "a German Shepherd"
	},
{
	"item": "rhino",
	"label": "gummy bears"
	},
{
	"item": "rhino",
	"label": "a rose"
	},
{
	"item": "rhino",
	"label": "a minivan"
	},
{
	"item": "rhino",
	"label": "a coffee table"
	},
{
	"item": "rhino",
	"label": "Skittles"
	},
{
	"item": "rhino",
	"label": "a convertible"
	},
{
	"item": "rhino",
	"label": "a table"
	},
{
	"item": "rhino",
	"label": "furniture"
	},
	//rosemary
	{
	"item": "rosemary",
	"label": "a daisy"
	},
{
	"item": "rosemary",
	"label": "a sunflower"
	},
{
	"item": "rosemary",
	"label": "a rose"
	},
{
	"item": "rosemary",
	"label": "a tulip"
	},
{
	"item": "rosemary",
	"label": "a parrot"
	},
{
	"item": "rosemary",
	"label": "an eagle"
	},
{
	"item": "rosemary",
	"label": "M&M's"
	},
{
	"item": "rosemary",
	"label": "a sports car"
	},
{
	"item": "rosemary",
	"label": "a pigeon"
	},
{
	"item": "rosemary",
	"label": "a polar bear"
	},
{
	"item": "rosemary",
	"label": "a catfish"
	},
{
	"item": "rosemary",
	"label": "Skittles"
	},
{
	"item": "rosemary",
	"label": "a flower"
	},
{
	"item": "rosemary",
	"label": "a bird"
	},
{
	"item": "rosemary",
	"label": "candy"
	},
{
	"item": "rosemary",
	"label": "a car"
	},
{
	"item": "rosemary",
	"label": "a bear"
	},
{
	"item": "rosemary",
	"label": "a fish"
	},
{
	"item": "rosemary",
	"label": "a plant"
	},
{
	"item": "rosemary",
	"label": "an animal"
	},
{
	"item": "rosemary",
	"label": "a snack"
	},
{
	"item": "rosemary",
	"label": "a vehicle"
	},
{
	"item": "rosemary",
	"label": "a swordfish"
	},
{
	"item": "rosemary",
	"label": "a clownfish"
	},
{
	"item": "rosemary",
	"label": "an SUV"
	},
{
	"item": "rosemary",
	"label": "a convertible"
	},
{
	"item": "rosemary",
	"label": "a T-Shirt"
	},
{
	"item": "rosemary",
	"label": "a Husky"
	},
{
	"item": "rosemary",
	"label": "a panda bear"
	},
{
	"item": "rosemary",
	"label": "a Hawaii shirt"
	},
{
	"item": "rosemary",
	"label": "a picnic table"
	},
{
	"item": "rosemary",
	"label": "a Dalmatian"
	},
{
	"item": "rosemary",
	"label": "a black bear"
	},
{
	"item": "rosemary",
	"label": "a shirt"
	},
{
	"item": "rosemary",
	"label": "a dog"
	},
{
	"item": "rosemary",
	"label": "a table"
	},
{
	"item": "rosemary",
	"label": "clothing"
	},
{
	"item": "rosemary",
	"label": "furniture"
	},
	//sheep
	{
	"item": "sheep",
	"label": "a grizzly bear"
	},
{
	"item": "sheep",
	"label": "a goldfish"
	},
{
	"item": "sheep",
	"label": "a catfish"
	},
{
	"item": "sheep",
	"label": "a swordfish"
	},
{
	"item": "sheep",
	"label": "a Pug"
	},
{
	"item": "sheep",
	"label": "a German Shepherd"
	},
{
	"item": "sheep",
	"label": "a pigeon"
	},
{
	"item": "sheep",
	"label": "a Dalmatian"
	},
{
	"item": "sheep",
	"label": "an eagle"
	},
{
	"item": "sheep",
	"label": "a parrot"
	},
{
	"item": "sheep",
	"label": "a sports car"
	},
{
	"item": "sheep",
	"label": "an SUV"
	},
{
	"item": "sheep",
	"label": "a dining table"
	},
{
	"item": "sheep",
	"label": "a sunflower"
	},
{
	"item": "sheep",
	"label": "M&M's"
	},
{
	"item": "sheep",
	"label": "a picnic table"
	},
{
	"item": "sheep",
	"label": "a minivan"
	},
{
	"item": "sheep",
	"label": "a convertible"
	},
{
	"item": "sheep",
	"label": "a bear"
	},
{
	"item": "sheep",
	"label": "a fish"
	},
{
	"item": "sheep",
	"label": "a dog"
	},
{
	"item": "sheep",
	"label": "a bird"
	},
{
	"item": "sheep",
	"label": "a car"
	},
{
	"item": "sheep",
	"label": "a table"
	},
{
	"item": "sheep",
	"label": "a flower"
	},
{
	"item": "sheep",
	"label": "candy"
	},
{
	"item": "sheep",
	"label": "an animal"
	},
{
	"item": "sheep",
	"label": "a vehicle"
	},
{
	"item": "sheep",
	"label": "furniture"
	},
{
	"item": "sheep",
	"label": "a plant"
	},
{
	"item": "sheep",
	"label": "a snack"
	},
{
	"item": "sheep",
	"label": "a panda bear"
	},
{
	"item": "sheep",
	"label": "a black bear"
	},
{
	"item": "sheep",
	"label": "a clownfish"
	},
{
	"item": "sheep",
	"label": "a coffee table"
	},
{
	"item": "sheep",
	"label": "a Husky"
	},
{
	"item": "sheep",
	"label": "a rose"
	},
{
	"item": "sheep",
	"label": "a polar bear"
	},
{
	"item": "sheep",
	"label": "a bedside table"
	},
{
	"item": "sheep",
	"label": "a Hawaii shirt"
	},
{
	"item": "sheep",
	"label": "a polo shirt"
	},
{
	"item": "sheep",
	"label": "a shirt"
	},
{
	"item": "sheep",
	"label": "clothing"
	},
	//snake
	{
	"item": "snake",
	"label": "a clownfish"
	},
{
	"item": "snake",
	"label": "a Husky"
	},
{
	"item": "snake",
	"label": "an eagle"
	},
{
	"item": "snake",
	"label": "a polar bear"
	},
{
	"item": "snake",
	"label": "a goldfish"
	},
{
	"item": "snake",
	"label": "a grizzly bear"
	},
{
	"item": "snake",
	"label": "a Pug"
	},
{
	"item": "snake",
	"label": "a hummingbird"
	},
{
	"item": "snake",
	"label": "a parrot"
	},
{
	"item": "snake",
	"label": "a dining table"
	},
{
	"item": "snake",
	"label": "M&M's"
	},
{
	"item": "snake",
	"label": "a Hawaii shirt"
	},
{
	"item": "snake",
	"label": "an SUV"
	},
{
	"item": "snake",
	"label": "gummy bears"
	},
{
	"item": "snake",
	"label": "a fish"
	},
{
	"item": "snake",
	"label": "a dog"
	},
{
	"item": "snake",
	"label": "a bird"
	},
{
	"item": "snake",
	"label": "a bear"
	},
{
	"item": "snake",
	"label": "a table"
	},
{
	"item": "snake",
	"label": "candy"
	},
{
	"item": "snake",
	"label": "a shirt"
	},
{
	"item": "snake",
	"label": "a car"
	},
{
	"item": "snake",
	"label": "an animal"
	},
{
	"item": "snake",
	"label": "furniture"
	},
{
	"item": "snake",
	"label": "a snack"
	},
{
	"item": "snake",
	"label": "clothing"
	},
{
	"item": "snake",
	"label": "a vehicle"
	},
{
	"item": "snake",
	"label": "a catfish"
	},
{
	"item": "snake",
	"label": "a Dalmatian"
	},
{
	"item": "snake",
	"label": "a panda bear"
	},
{
	"item": "snake",
	"label": "a daisy"
	},
{
	"item": "snake",
	"label": "a minivan"
	},
{
	"item": "snake",
	"label": "a flower"
	},
{
	"item": "snake",
	"label": "a plant"
	},
	//socks
	{
	"item": "socks",
	"label": "a T-Shirt"
	},
{
	"item": "socks",
	"label": "a dress shirt"
	},
{
	"item": "socks",
	"label": "a Hawaii shirt"
	},
{
	"item": "socks",
	"label": "a polo shirt"
	},
{
	"item": "socks",
	"label": "a rose"
	},
{
	"item": "socks",
	"label": "a clownfish"
	},
{
	"item": "socks",
	"label": "a parrot"
	},
{
	"item": "socks",
	"label": "a minivan"
	},
{
	"item": "socks",
	"label": "a goldfish"
	},
{
	"item": "socks",
	"label": "a hummingbird"
	},
{
	"item": "socks",
	"label": "a convertible"
	},
{
	"item": "socks",
	"label": "a Husky"
	},
{
	"item": "socks",
	"label": "an eagle"
	},
{
	"item": "socks",
	"label": "a dining table"
	},
{
	"item": "socks",
	"label": "a Dalmatian"
	},
{
	"item": "socks",
	"label": "a shirt"
	},
{
	"item": "socks",
	"label": "a flower"
	},
{
	"item": "socks",
	"label": "a fish"
	},
{
	"item": "socks",
	"label": "a bird"
	},
{
	"item": "socks",
	"label": "a car"
	},
{
	"item": "socks",
	"label": "a dog"
	},
{
	"item": "socks",
	"label": "a table"
	},
{
	"item": "socks",
	"label": "clothing"
	},
{
	"item": "socks",
	"label": "a plant"
	},
{
	"item": "socks",
	"label": "an animal"
	},
{
	"item": "socks",
	"label": "a vehicle"
	},
{
	"item": "socks",
	"label": "furniture"
	},
{
	"item": "socks",
	"label": "a sunflower"
	},
{
	"item": "socks",
	"label": "jelly beans"
	},
{
	"item": "socks",
	"label": "a swordfish"
	},
{
	"item": "socks",
	"label": "M&M's"
	},
{
	"item": "socks",
	"label": "a panda bear"
	},
{
	"item": "socks",
	"label": "a black bear"
	},
{
	"item": "socks",
	"label": "a pigeon"
	},
{
	"item": "socks",
	"label": "an SUV"
	},
{
	"item": "socks",
	"label": "a German Shepherd"
	},
{
	"item": "socks",
	"label": "a bedside table"
	},
{
	"item": "socks",
	"label": "candy"
	},
{
	"item": "socks",
	"label": "a bear"
	},
{
	"item": "socks",
	"label": "a snack"
	},
	//squirrel
	{
	"item": "squirrel",
	"label": "a Pug"
	},
{
	"item": "squirrel",
	"label": "a parrot"
	},
{
	"item": "squirrel",
	"label": "a Dalmatian"
	},
{
	"item": "squirrel",
	"label": "a clownfish"
	},
{
	"item": "squirrel",
	"label": "a goldfish"
	},
{
	"item": "squirrel",
	"label": "a catfish"
	},
{
	"item": "squirrel",
	"label": "a grizzly bear"
	},
{
	"item": "squirrel",
	"label": "a hummingbird"
	},
{
	"item": "squirrel",
	"label": "a polar bear"
	},
{
	"item": "squirrel",
	"label": "a Husky"
	},
{
	"item": "squirrel",
	"label": "a pigeon"
	},
{
	"item": "squirrel",
	"label": "a German Shepherd"
	},
{
	"item": "squirrel",
	"label": "a panda bear"
	},
{
	"item": "squirrel",
	"label": "an SUV"
	},
{
	"item": "squirrel",
	"label": "Skittles"
	},
{
	"item": "squirrel",
	"label": "a polo shirt"
	},
{
	"item": "squirrel",
	"label": "a bedside table"
	},
{
	"item": "squirrel",
	"label": "a dining table"
	},
{
	"item": "squirrel",
	"label": "a Hawaii shirt"
	},
{
	"item": "squirrel",
	"label": "a dog"
	},
{
	"item": "squirrel",
	"label": "a bird"
	},
{
	"item": "squirrel",
	"label": "a fish"
	},
{
	"item": "squirrel",
	"label": "a bear"
	},
{
	"item": "squirrel",
	"label": "a car"
	},
{
	"item": "squirrel",
	"label": "candy"
	},
{
	"item": "squirrel",
	"label": "a shirt"
	},
{
	"item": "squirrel",
	"label": "a table"
	},
{
	"item": "squirrel",
	"label": "an animal"
	},
{
	"item": "squirrel",
	"label": "a vehicle"
	},
{
	"item": "squirrel",
	"label": "a snack"
	},
{
	"item": "squirrel",
	"label": "clothing"
	},
{
	"item": "squirrel",
	"label": "furniture"
	},
{
	"item": "squirrel",
	"label": "a black bear"
	},
{
	"item": "squirrel",
	"label": "an eagle"
	},
{
	"item": "squirrel",
	"label": "a sports car"
	},
{
	"item": "squirrel",
	"label": "a convertible"
	},
{
	"item": "squirrel",
	"label": "gummy bears"
	},
{
	"item": "squirrel",
	"label": "a daisy"
	},
{
	"item": "squirrel",
	"label": "a flower"
	},
{
	"item": "squirrel",
	"label": "a plant"
	},
	//train
	{
	"item": "train",
	"label": "a minivan"
	},
{
	"item": "train",
	"label": "a sports car"
	},
{
	"item": "train",
	"label": "a convertible"
	},
{
	"item": "train",
	"label": "an SUV"
	},
{
	"item": "train",
	"label": "a dress shirt"
	},
{
	"item": "train",
	"label": "a T-Shirt"
	},
{
	"item": "train",
	"label": "a Dalmatian"
	},
{
	"item": "train",
	"label": "jelly beans"
	},
{
	"item": "train",
	"label": "a clownfish"
	},
{
	"item": "train",
	"label": "a polar bear"
	},
{
	"item": "train",
	"label": "a grizzly bear"
	},
{
	"item": "train",
	"label": "a tulip"
	},
{
	"item": "train",
	"label": "gummy bears"
	},
{
	"item": "train",
	"label": "a hummingbird"
	},
{
	"item": "train",
	"label": "a pigeon"
	},
{
	"item": "train",
	"label": "a sunflower"
	},
{
	"item": "train",
	"label": "a car"
	},
{
	"item": "train",
	"label": "a shirt"
	},
{
	"item": "train",
	"label": "a dog"
	},
{
	"item": "train",
	"label": "candy"
	},
{
	"item": "train",
	"label": "a fish"
	},
{
	"item": "train",
	"label": "a bear"
	},
{
	"item": "train",
	"label": "a flower"
	},
{
	"item": "train",
	"label": "a bird"
	},
{
	"item": "train",
	"label": "a vehicle"
	},
{
	"item": "train",
	"label": "clothing"
	},
{
	"item": "train",
	"label": "an animal"
	},
{
	"item": "train",
	"label": "a snack"
	},
{
	"item": "train",
	"label": "a plant"
	},
{
	"item": "train",
	"label": "a black bear"
	},
{
	"item": "train",
	"label": "a swordfish"
	},
{
	"item": "train",
	"label": "an eagle"
	},
{
	"item": "train",
	"label": "Skittles"
	},
{
	"item": "train",
	"label": "a goldfish"
	},
{
	"item": "train",
	"label": "a Pug"
	},
{
	"item": "train",
	"label": "a panda bear"
	},
{
	"item": "train",
	"label": "a Hawaii shirt"
	},
{
	"item": "train",
	"label": "a catfish"
	},
{
	"item": "train",
	"label": "a coffee table"
	},
{
	"item": "train",
	"label": "a table"
	},
{
	"item": "train",
	"label": "furniture"
	},
	//wardrobe
	{
	"item": "wardrobe",
	"label": "a bedside table"
	},
{
	"item": "wardrobe",
	"label": "a picnic table"
	},
{
	"item": "wardrobe",
	"label": "a coffee table"
	},
{
	"item": "wardrobe",
	"label": "a dining table"
	},
{
	"item": "wardrobe",
	"label": "a hummingbird"
	},
{
	"item": "wardrobe",
	"label": "a catfish"
	},
{
	"item": "wardrobe",
	"label": "a rose"
	},
{
	"item": "wardrobe",
	"label": "a Husky"
	},
{
	"item": "wardrobe",
	"label": "a panda bear"
	},
{
	"item": "wardrobe",
	"label": "an SUV"
	},
{
	"item": "wardrobe",
	"label": "a grizzly bear"
	},
{
	"item": "wardrobe",
	"label": "gummy bears"
	},
{
	"item": "wardrobe",
	"label": "a black bear"
	},
{
	"item": "wardrobe",
	"label": "a table"
	},
{
	"item": "wardrobe",
	"label": "a bird"
	},
{
	"item": "wardrobe",
	"label": "a fish"
	},
{
	"item": "wardrobe",
	"label": "a flower"
	},
{
	"item": "wardrobe",
	"label": "a dog"
	},
{
	"item": "wardrobe",
	"label": "a bear"
	},
{
	"item": "wardrobe",
	"label": "a car"
	},
{
	"item": "wardrobe",
	"label": "candy"
	},
{
	"item": "wardrobe",
	"label": "furniture"
	},
{
	"item": "wardrobe",
	"label": "an animal"
	},
{
	"item": "wardrobe",
	"label": "a plant"
	},
{
	"item": "wardrobe",
	"label": "a vehicle"
	},
{
	"item": "wardrobe",
	"label": "a snack"
	},
{
	"item": "wardrobe",
	"label": "a polo shirt"
	},
{
	"item": "wardrobe",
	"label": "a tulip"
	},
{
	"item": "wardrobe",
	"label": "M&M's"
	},
{
	"item": "wardrobe",
	"label": "a Pug"
	},
{
	"item": "wardrobe",
	"label": "a goldfish"
	},
{
	"item": "wardrobe",
	"label": "a Dalmatian"
	},
{
	"item": "wardrobe",
	"label": "a polar bear"
	},
{
	"item": "wardrobe",
	"label": "a shirt"
	},
{
	"item": "wardrobe",
	"label": "clothing"
	}
  ]).slice(0,45);

  function makeStim(i) {
    //get item
    var item = items[i];
    var item_id = item.item;
    var label = item.label;
      
      return {
	  "item": item_id,
	  "label":label,
    }
  }
  exp.all_stims = [];
  for (var i=0; i<items.length; i++) {
    exp.all_stims.push(makeStim(i));
  }

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

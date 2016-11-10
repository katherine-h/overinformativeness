// ======================================
// ================ OLD =================
// ======================================

/*  Copyright (c) 2012 Sven "FuzzYspo0N" Bergström, 
                  2013 Robert XD Hawkins
    
 written by : http://underscorediscovery.com
    written for : http://buildnewgames.com/real-time-multiplayer/
    
    substantially modified for collective behavior experiments on the web
    MIT Licensed.
*/

/*
  The main game class. This gets created on both server and
  client. Server creates one for each game that is hosted, and each
  client creates one for itself to play the game. When you set a
  variable, remember that it's only set in that instance.
*/
/*var has_require = typeof require !== 'undefined';

if( typeof _ === 'undefined' ) {
  if( has_require ) {
    _ = require('underscore');
    utils  = require('../../sharedUtils/sharedUtils.js');
  }
  else throw new ('mymodule requires underscore, see http://underscorejs.org');
}

var game_core = function(options){
  // Store a flag if we are the server instance
  this.server = options.server ;
  
  // How many players in the game?
  this.players_threshold = 2;
  this.playerRoleNames = {
    role1 : 'speaker',
    role2 : 'listener'
  };
  
  //Dimensions of world in pixels and numberof cells to be divided into;
  this.numHorizontalCells = 5;
  this.numVerticalCells = 1;
  this.cellDimensions = {height : 300, width : 300}; // in pixels
  this.cellPadding = 0;
  this.world = {height : (this.cellDimensions.height * this.numVerticalCells
              + this.cellPadding),
              width : (this.cellDimensions.width * this.numHorizontalCells
              + this.cellPadding)}; 
  
  // Which round are we on (initialize at -1 so that first round is 0-indexed)
  this.roundNum = -1;

  // How many rounds do we want people to complete?
  this.numRounds = 20;

  // How many mistakes have the pair made on the current trial?
  this.attemptNum = 0;

  // This will be populated with the tangram set
  this.objects = [];
  
  if(this.server) {
    // If we're initializing the server game copy, pre-create the list of trials
    // we'll use, make a player object, and tell the player who they are
    this.id = options.id;
    this.expName = options.expName;
    this.player_count = options.player_count;
    console.log("1");
    this.trialList = this.makeTrialList();
    console.log("2");
    this.data = {
      id : this.id.slice(0,6),
      trials : [],
      catch_trials : [], system : {}, 
      subject_information : {
        gameID: this.id.slice(0,6)
      }
    // console.log("3");
    };
    console.log("4");
    this.players = [{
      id: options.player_instances[0].id,
      instance: options.player_instances[0].player,
      player: new game_player(this,options.player_instances[0].player)
    }];
    console.log("5");
    this.streams = {};
    console.log("6");
    this.server_send_update();
    console.log("7");
  } else {
    console.log("8");
    // If we're initializing a player's local game copy, create the player object
    this.players = [{
      id: null,
      instance: null,
      player: new game_player(this)
    }];
  }
  console.log("9");
};

var game_player = function( game_instance, player_instance) {
  this.instance = player_instance;
  this.game = game_instance;
  this.role = '';
  this.message = '';
  this.id = '';
}; 

// server side we set some classes to global types, so that
// we can use them in other files (specifically, game.server.js)
if('undefined' != typeof global) {
  var objectList = _.map(require('./stimuli/objectSet', _.clone)); 
  // console.log(objectList);
  module.exports = global.game_core = game_core;
  module.exports = global.game_player = game_player;
}

// HELPER FUNCTIONS

// Method to easily look up player 
game_core.prototype.get_player = function(id) {
  var result = _.find(this.players, function(e){ return e.id == id; });
  return result.player;
};

// Method to get list of players that aren't the given id
game_core.prototype.get_others = function(id) {
  var otherPlayersList = _.filter(this.players, function(e){ return e.id != id; });
  var noEmptiesList = _.map(otherPlayersList, function(p){return p.player ? p : null;});
  return _.without(noEmptiesList, null);
};

// Returns all players
game_core.prototype.get_active_players = function() {
  var noEmptiesList = _.map(this.players, function(p){return p.player ? p : null;});
  return _.without(noEmptiesList, null);
};

// Advance to the next round
game_core.prototype.newRound = function() {
  if(this.roundNum == this.numRounds - 1) {
    // If you've reached the planned number of rounds, end the game
    var local_game = this;
    _.map(local_game.get_active_players(), function(p){
      p.player.instance.disconnect();
    });
  } else {
    // Otherwise, get the preset list of tangrams for the new round
    this.roundNum += 1;
    console.log("now on round " + (this.roundNum + 1));
    this.objects = this.trialList[this.roundNum];
    this.server_send_update();
  }
};

game_core.prototype.makeTrialList = function () {
  var conditionList = getRandomizedConditions(),
      local_this = this,
      trialList = [],
      previousTargets = [];

  // Had to switch to a for loop here to keep track of previousTargets
  for (var i = 0; i < conditionList.length; i++) {
    var condition = conditionList[i];
    var objList = sampleObjects(condition, previousTargets);
    previousTargets.push(objList[0].name);
    var locs = sampleStimulusLocs(objList);
    trialList.push(_.map(_.zip(objList, locs.speaker, locs.listener), function(tuple) {
      var speakerGridCell = local_this.getPixelFromCell(tuple[1][0], tuple[1][1]); 
      var listenerGridCell = local_this.getPixelFromCell(tuple[2][0], tuple[2][1]);
      return addCellInfoToObj(tuple, speakerGridCell, listenerGridCell);
    }));
  };
  return(trialList);
};

game_core.prototype.server_send_update = function(){
  //Make a snapshot of the current state, for updating the clients
  var local_game = this;
  
  // Add info about all players
  var player_packet = _.map(local_game.players, function(p){
    return {id: p.id,
            player: null};
  });

  var state = {
    gs : this.game_started,   // true when game's started
    pt : this.players_threshold,
    pc : this.player_count,
    dataObj  : this.data,
    roundNum : this.roundNum,
    objects: this.objects
  };

  _.extend(state, {players: player_packet});
  _.extend(state, {instructions: this.instructions});
  if(player_packet.length == 2) {
    _.extend(state, {objects: this.objects});
  }

  //Send the snapshot to the players
  this.state = state;
  _.map(local_game.get_active_players(), function(p){
    p.player.instance.emit( 'onserverupdate', state);});
};


var sampleObjects = function(condition, earlierTargets) {
  var remainingTargets = getRemainingTargets(earlierTargets, condition.type);
  var target = sampleTarget(condition, remainingTargets);
  var distractors = sampleDistractors(condition, target);
  
  if(checkItem(condition,target,distractors)) {
    return [target].concat(distractors);
  } else { // Try again if something is wrong
    return sampleObjects(condition, earlierTargets);
  }
};

var sampleTarget = function(condition, remainingTargets) {
  var target = _.sample(remainingTargets);
  target.targetStatus = "target";

  if (condition.type === "basic") {
    target.condition = condition.type + condition.d1Level + condition.d2Level;
    target.fullName = target.name;
    return target;
  } else {
    target.condition = condition.type + condition.numDistractors + condition.numSame;
    var chosenSize = _.sample(target.size);
    var chosenColor = _.sample(target.color);
    return _.extend(target, {
      chosenSize : chosenSize,
      chosenColor : chosenColor,
      fullName : chosenSize + "_" + chosenColor + "_" + target.name,
      url : "stimuli/" + chosenSize + "_" + chosenColor + "_" + target.name + ".jpg"
    });
  }
};

var sampleDistractors = function(condition, target) {
  var levels = {
    1 : {class: getObjectSubset("distrClass1"),
	 selector: firstClassSelector},
    2 : {class: getObjectSubset("distrClass2"),
	 selector: secondClassSelector},
    3 : {class: getObjectSubset("distrClass2"),
	 selector: thirdClassSelector}
  };

  if(condition.type === "basic") {
    var distractorInfo = [levels[condition.d1Level], levels[condition.d2Level]];
    return _.map(distractorInfo, function(d) {
      var distractor = d.selector(target, d.class);
      return _.extend(distractor, {
	targetStatus : "distractor",
	fullName : distractor.name,
	condition : condition.type + condition.d1Level + condition.d2Level
      });
    });
  } else {
    return _.map(_.range(condition.numDistractors), function(dNum) {
      return _.extend(_.clone(target), {
	targetStatus : "distractor",
	fullName : getDistractorName(target, dNum, condition),
	url : "stimuli/" + getDistractorName(target, dNum, condition) + ".jpg",
	condition : condition.type + condition.numDistractors + condition.numSame	
      });
    });
  }
};

var getDistractorName = function (target, dNum, condition) {
  // Create some that are the same as the target on the insufficient dimension
  var sameColor = target.chosenColor,
      sameSize = target.chosenSize,
      diffColor = _.without(target.color, target.chosenColor),
      diffSize = _.without(target.size, target.chosenSize);
  if(dNum < condition.numSame) {
    if(condition.type === "color") 
      return sameSize + "_" + diffColor + "_" + target.name;
    else if(condition.type === "size")
      return diffSize + "_" + sameColor + "_" + target.name;
    else
      throw "unknown condition type";
  } else {
    return diffSize + "_" + diffColor + "_" + target.name;
  }
};

var checkItem = function(condition, target, distractors) {
  var diffName = distractors[0].name != distractors[1].name;
  if(condition.type === "basic") {
    if(condition.d1Level === 2 && condition.d2Level === 3 ) {
      var diffSuper = distractors[0].superdomain != distractors[1].superdomain;
      return diffName && diffSuper;
    } else if (condition.d1Level === 3 && condition.d2Level === 3) {
      var diffTarget = (distractors[0].superdomain != target.superdomain
			&& distractors[1].superdomain != target.superdomain)
      		&& distractors[0].superdomain != distractors[1].superdomain;
      return diffName && diffTarget;
    } else {
      return diffName;
    }
  } else {
    return true;
  }
};

// Util functions

var addCellInfoToObj = function(tuple, speakerGridCell, listenerGridCell) {
  console.log("tuple");
  console.log(tuple[0]);
  var object = _.clone(tuple[0]);
  object.speakerCoords = {
    gridX : tuple[1][0],
    gridY : tuple[1][1],
    trueX : speakerGridCell.centerX - object.width/2,
    trueY : speakerGridCell.centerY - object.height/2,
    gridPixelX: speakerGridCell.centerX - 150,
    gridPixelY: speakerGridCell.centerY - 150
  };
  object.listenerCoords = {
    gridX : tuple[2][0],
    gridY : tuple[2][1],
    trueX : listenerGridCell.centerX - object.width/2,
    trueY : listenerGridCell.centerY - object.height/2,
    gridPixelX: listenerGridCell.centerX - 150,
    gridPixelY: listenerGridCell.centerY - 150
  };
  return object;
};

var getRemainingTargets = function(earlierTargets, condition) {
  var criticalObjs = (condition === "basic" ?
		      getObjectSubset("target") :
		      getObjectSubset("colorSizeTrial"));
  return _.filter(criticalObjs, function(x) {
    return !_.contains(earlierTargets, x.name );
  });
};


var getRandomizedConditions = function() {
  // Add basic level trials
  var conds = [];

  // Add color/size trials
  _.forEach(["color"], function(type) {
    // _.forEach([2, 3, 4], function(numDistractors) {
    numDistractors = 2;
    _.forEach(_.range(1, numDistractors + 1), function(numSame) {
    	// Add two of each trial type
    	var trial = {type : type, numDistractors : numDistractors, numSame : numSame};
    	conds.push(trial, trial);
    });
    // });
  });
  
  return _.shuffle(conds);
};

var sampleStimulusLocs = function(objList) {
  var minX = objList.length === 3 ? 2 : 1;
  var maxX = objList.length === 5 ? 5 : 4;
  var locs = _.map(_.range(minX, maxX + 1), function(i) {return [i, 1]; });
  return {listener : _.shuffle(locs), speaker : _.shuffle(locs)};
};

var getObjectSubset = function(targetStatus) {
  return _.map(_.shuffle(_.filter(objectList, function(x){
    if(targetStatus === "colorSizeTrial") {
      return x.type == "colorSizeTrial";
    } else {
      return x.targetStatus == targetStatus;
    }
  })), _.clone);
};

var firstClassSelector = function(target, list) {
  return _.sample(_.filter(list, function(x) {
    return target.basiclevel === x.basiclevel;
  }));
};

var secondClassSelector = function(target, list) {
  return _.sample(_.filter(list, function(x) {
    return target.superdomain === x.superdomain;
  }));
};

var thirdClassSelector = function(target, list) {
  return _.extend(_.sample(list),{targetStatus : "distrClass3"});
};

// maps a grid location to the exact pixel coordinates
// for x = 1,2,3,4; y = 1,2,3,4
game_core.prototype.getPixelFromCell = function (x, y) {
  return {
    centerX: (this.cellPadding/2 + this.cellDimensions.width * (x - 1)
        + this.cellDimensions.width / 2),
    centerY: (this.cellPadding/2 + this.cellDimensions.height * (y - 1)
        + this.cellDimensions.height / 2),
    upperLeftX : (this.cellDimensions.width * (x - 1) + this.cellPadding/2),
    upperLeftY : (this.cellDimensions.height * (y - 1) + this.cellPadding/2),
    width: this.cellDimensions.width,
    height: this.cellDimensions.height
  };
};

// maps a raw pixel coordinate to to the exact pixel coordinates
// for x = 1,2,3,4; y = 1,2,3,4
game_core.prototype.getCellFromPixel = function (mx, my) {
  var cellX = Math.floor((mx - this.cellPadding / 2) / this.cellDimensions.width) + 1;
  var cellY = Math.floor((my - this.cellPadding / 2) / this.cellDimensions.height) + 1;
  return [cellX, cellY];
};

game_core.prototype.getTangramFromCell = function (gridX, gridY) {
  for (i=0; i < this.objects.length; i++) {
    if (this.objects[i].gridX == gridX && this.objects[i].gridY == gridY) {
      var tangram = this.objects[i];
      var tangramIndex = i;
      // return tangram;
      return i;
    }
  }
  console.log("Did not find tangram from cell!")
}

// readjusts trueX and trueY values based on the objLocation and width and height of image (objImage)
game_core.prototype.getTrueCoords = function (coord, objLocation, objImage) {
  var trueX = this.getPixelFromCell(objLocation.gridX, objLocation.gridY).centerX - objImage.width/2;
  var trueY = this.getPixelFromCell(objLocation.gridX, objLocation.gridY).centerY - objImage.height/2;
  if (coord == "xCoord") {
    return trueX;
  }
  if (coord == "yCoord") {
    return trueY;
  }
};
*/


// ======================================
// ================ NEW =================
// ======================================



/*  Copyright (c) 2012 Sven "FuzzYspo0N" Bergström, 
                  2013 Robert XD Hawkins
    
 written by : http://underscorediscovery.com
    written for : http://buildnewgames.com/real-time-multiplayer/
    
    substantially modified for collective behavior experiments on the web
    MIT Licensed.
*/

/*
  The main game class. This gets created on both server and
  client. Server creates one for each game that is hosted, and each
  client creates one for itself to play the game. When you set a
  variable, remember that it's only set in that instance.
*/
var has_require = typeof require !== 'undefined';

if( typeof _ === 'undefined' ) {
  if( has_require ) {
    _ = require('underscore');
    utils  = require('../../sharedUtils/sharedUtils.js');
  }
  else throw new ('mymodule requires underscore, see http://underscorejs.org');
}

var game_core = function(options){
  // Store a flag if we are the server instance
  this.server = options.server ;
  
  // How many players in the game?
  this.players_threshold = 2;
  this.playerRoleNames = {
    role1 : 'speaker',
    role2 : 'listener'
  };
  
  //Dimensions of world in pixels and numberof cells to be divided into;
  this.numHorizontalCells = 5;
  this.numVerticalCells = 1;
  this.cellDimensions = {height : 300, width : 300}; // in pixels
  this.cellPadding = 0;
  this.world = {height : (this.cellDimensions.height * this.numVerticalCells
              + this.cellPadding),
              width : (this.cellDimensions.width * this.numHorizontalCells
              + this.cellPadding)}; 
  
  // Which round are we on (initialize at -1 so that first round is 0-indexed)
  this.roundNum = -1;

  // How many rounds do we want people to complete?
  this.numRounds = 54;

  // How many mistakes have the pair made on the current trial?
  this.attemptNum = 0;

  // This will be populated with the tangram set
  this.objects = [];
  
  if(this.server) {
    // If we're initializing the server game copy, pre-create the list of trials
    // we'll use, make a player object, and tell the player who they are
    this.id = options.id;
    this.expName = options.expName;
    this.player_count = options.player_count;
    this.trialList = this.makeTrialList();
    this.data = {
      id : this.id.slice(0,6),
      trials : [],
      catch_trials : [], system : {}, 
      subject_information : {
        gameID: this.id.slice(0,6)
      }
    // console.log("3");
    };
    this.players = [{
      id: options.player_instances[0].id,
      instance: options.player_instances[0].player,
      player: new game_player(this,options.player_instances[0].player)
    }];
    this.streams = {};
    this.server_send_update();
  } else {
    // If we're initializing a player's local game copy, create the player object
    this.players = [{
      id: null,
      instance: null,
      player: new game_player(this)
    }];
  }
};
var game_player = function( game_instance, player_instance) {
  this.instance = player_instance;
  this.game = game_instance;
  this.role = '';
  this.message = '';
  this.id = '';
}; 

// server side we set some classes to global types, so that
// we can use them in other files (specifically, game.server.js)
if('undefined' != typeof global) {
  var objectList = _.map(require('./stimuli/objectSet', _.clone)); 
  // console.log(objectList);
  module.exports = global.game_core = game_core;
  module.exports = global.game_player = game_player;
}

// HELPER FUNCTIONS

// Method to easily look up player 
game_core.prototype.get_player = function(id) {
  var result = _.find(this.players, function(e){ return e.id == id; });
  return result.player;
};

// Method to get list of players that aren't the given id
game_core.prototype.get_others = function(id) {
  var otherPlayersList = _.filter(this.players, function(e){ return e.id != id; });
  var noEmptiesList = _.map(otherPlayersList, function(p){return p.player ? p : null;});
  return _.without(noEmptiesList, null);
};

// Returns all players
game_core.prototype.get_active_players = function() {
  var noEmptiesList = _.map(this.players, function(p){return p.player ? p : null;});
  return _.without(noEmptiesList, null);
};

// Advance to the next round
game_core.prototype.newRound = function() {
  if(this.roundNum == this.numRounds - 1) {
    // If you've reached the planned number of rounds, end the game
    var local_game = this;
    _.map(local_game.get_active_players(), function(p){
      p.player.instance.disconnect();
    });
  } else {
    // Otherwise, get the preset list of tangrams for the new round
    this.roundNum += 1;
    console.log("now on round " + (this.roundNum + 1));
    this.objects = this.trialList[this.roundNum];
    this.server_send_update();
  }
};

game_core.prototype.makeTrialList = function () {
      local_this = this,
      trialList = [],
      targetPos = 0;

  // Had to switch to a for loop here to keep track of previousTargets
  for (var i = 0; i < objectList[0].length; i++) {
  // for (var i = 0; i < 5; i++) {
    var objList = sampleObjects(targetPos);
    // console.log("objList");
    // console.log(objList);
    targetPos++;
    var locs = sampleStimulusLocs(objList);
    trialList.push(_.map(_.zip(objList, locs.speaker, locs.listener), function(tuple) {
      var speakerGridCell = local_this.getPixelFromCell(tuple[1][0], tuple[1][1]); 
      var listenerGridCell = local_this.getPixelFromCell(tuple[2][0], tuple[2][1]);
      return addCellInfoToObj(tuple, speakerGridCell, listenerGridCell);
    }));
  };
  // console.log(trialList);
  trialList = _.shuffle(trialList);
  console.log(trialList.length);
  return(trialList);
};

game_core.prototype.server_send_update = function(){
  //Make a snapshot of the current state, for updating the clients
  var local_game = this;
  
  // Add info about all players
  var player_packet = _.map(local_game.players, function(p){
    return {id: p.id,
            player: null};
  });

  var state = {
    gs : this.game_started,   // true when game's started
    pt : this.players_threshold,
    pc : this.player_count,
    dataObj  : this.data,
    roundNum : this.roundNum,
    objects: this.objects
  };

  _.extend(state, {players: player_packet});
  _.extend(state, {instructions: this.instructions});
  if(player_packet.length == 2) {
    _.extend(state, {objects: this.objects});
  }

  //Send the snapshot to the players
  this.state = state;
  _.map(local_game.get_active_players(), function(p){
    p.player.instance.emit( 'onserverupdate', state);});
};

var sampleObjects = function(targetPos) {
  // console.log("targetPos");
  // console.log(targetPos);
  var target = objectList[0][targetPos];
  target.targetStatus = "target";
  // console.log("target");
  // console.log(target);
  var distractors = sampleDistractors(target);
  // console.log("distractors");
  // console.log(distractors);
  
  return [target].concat(distractors);
  // if(checkItem(target,distractors)) {
  //   return [target].concat(distractors);
  // } else { // Try again if something is wrong
  //   return sampleObjects(targetPos);
  // }
};

var sampleDistractors = function(target) {
    return _.map(_.range(2), function(dNum) {
      return _.extend(_.clone(target), {
  targetStatus : "distractor",
  fullName : getDistractorName(target, dNum, target.context),
  url : "stimuli/" + getDistractorName(target, dNum, target.context) + ".png",
  condition : target.context
    });
  });
};

var getDistractorName = function (target, dNum, condition) {
  var objects = _.clone(objectList);
  objects = _.shuffle(objects[0]);
  // console.log(objects);
  var sameType = target.targetType;
  var sameColor = target.targetColor;

  var k = 0;
  var targetObject = sameType;
  var diffTargetColor = sameColor;
  while (sameType != targetObject || sameColor === diffTargetColor) {
    targetObject = objects[k].targetType;
    diffTargetColor = objects[k].targetColor;
    k++;
    if (k>objects.length) {
      console.log("noooo, something is wrong in getting the distractorname in k");
    };
  };

  var i = 0;
  var diffType1 = sameType;
  var diffColor1 = sameColor;
  while (diffType1 === sameType || diffColor1 === sameColor || diffColor1 === diffTargetColor) {
    diffType1 = objects[i].targetType;
    diffColor1 = objects[i].targetColor;
    i++;
    if (i>objects.length) {
      console.log("noooo, something is wrong in getting the distractorname in i");
    };
  };

  var j = 0;
  var diffType2 = sameType;
  var diffColor2 = sameColor;
  while (diffType2 === sameType || diffColor2 === sameColor || diffType2 === diffType1 || diffColor2 === diffColor1) {
    diffType2 = objects[j].targetType;
    diffColor2 = objects[j].targetColor;
    j++;
    if (j>objects.length) {
      console.log("noooo, something is wrong in getting the distractorname in j");
    };
  };


  if (condition === "overinformative-cc") {
    // console.log("overinformative-cc");
    if (dNum === 0) {
      return "cup" + "_" + sameColor;
    } else {
      return diffType1 + "_" + diffColor1;
    }
  } else if (condition === "overinformative") {
    // console.log("overinformative");
    if (dNum === 0) {
      return diffType1 + "_" + diffColor1;
    } else {
      return diffType2 + "_" + diffColor2;
    }
  } else {
    // console.log("informative");
    if (dNum === 0) {
      return sameType + "_" + diffTargetColor;
    } else {
      return diffType1 + "_" + diffColor1;
    }
  }
};

// Util functions

var addCellInfoToObj = function(tuple, speakerGridCell, listenerGridCell) {
  // console.log("tuple");
  // console.log(tuple[0]);
  var object = _.clone(tuple[0]);
  object.speakerCoords = {
    gridX : tuple[1][0],
    gridY : tuple[1][1],
    trueX : speakerGridCell.centerX - object.width/2,
    trueY : speakerGridCell.centerY - object.height/2,
    gridPixelX: speakerGridCell.centerX - 150,
    gridPixelY: speakerGridCell.centerY - 150
  };
  object.listenerCoords = {
    gridX : tuple[2][0],
    gridY : tuple[2][1],
    trueX : listenerGridCell.centerX - object.width/2,
    trueY : listenerGridCell.centerY - object.height/2,
    gridPixelX: listenerGridCell.centerX - 150,
    gridPixelY: listenerGridCell.centerY - 150
  };
  return object;
};

var sampleStimulusLocs = function(objList) {
  var minX = objList.length === 3 ? 2 : 1;
  var maxX = objList.length === 5 ? 5 : 4;
  var locs = _.map(_.range(minX, maxX + 1), function(i) {return [i, 1]; });
  return {listener : _.shuffle(locs), speaker : _.shuffle(locs)};
};

var firstClassSelector = function(target, list) {
  return _.sample(_.filter(list, function(x) {
    return target.basiclevel === x.basiclevel;
  }));
};

var secondClassSelector = function(target, list) {
  return _.sample(_.filter(list, function(x) {
    return target.superdomain === x.superdomain;
  }));
};

var thirdClassSelector = function(target, list) {
  return _.extend(_.sample(list),{targetStatus : "distrClass3"});
};

// maps a grid location to the exact pixel coordinates
// for x = 1,2,3,4; y = 1,2,3,4
game_core.prototype.getPixelFromCell = function (x, y) {
  return {
    centerX: (this.cellPadding/2 + this.cellDimensions.width * (x - 1)
        + this.cellDimensions.width / 2),
    centerY: (this.cellPadding/2 + this.cellDimensions.height * (y - 1)
        + this.cellDimensions.height / 2),
    upperLeftX : (this.cellDimensions.width * (x - 1) + this.cellPadding/2),
    upperLeftY : (this.cellDimensions.height * (y - 1) + this.cellPadding/2),
    width: this.cellDimensions.width,
    height: this.cellDimensions.height
  };
};

// maps a raw pixel coordinate to to the exact pixel coordinates
// for x = 1,2,3,4; y = 1,2,3,4
game_core.prototype.getCellFromPixel = function (mx, my) {
  var cellX = Math.floor((mx - this.cellPadding / 2) / this.cellDimensions.width) + 1;
  var cellY = Math.floor((my - this.cellPadding / 2) / this.cellDimensions.height) + 1;
  return [cellX, cellY];
};

game_core.prototype.getTangramFromCell = function (gridX, gridY) {
  for (i=0; i < this.objects.length; i++) {
    if (this.objects[i].gridX == gridX && this.objects[i].gridY == gridY) {
      var tangram = this.objects[i];
      var tangramIndex = i;
      // return tangram;
      return i;
    }
  }
  console.log("Did not find tangram from cell!")
}

// readjusts trueX and trueY values based on the objLocation and width and height of image (objImage)
game_core.prototype.getTrueCoords = function (coord, objLocation, objImage) {
  var trueX = this.getPixelFromCell(objLocation.gridX, objLocation.gridY).centerX - objImage.width/2;
  var trueY = this.getPixelFromCell(objLocation.gridX, objLocation.gridY).centerY - objImage.height/2;
  if (coord == "xCoord") {
    return trueX;
  }
  if (coord == "yCoord") {
    return trueY;
  }
};


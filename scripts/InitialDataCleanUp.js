"use strict;"

var APP = APP || {};

APP.InitialDataCleanUp = (function(){
  var _matches = 0;

  function init(){
    console.log("3.0: " + icons3_0.length + ", 2.0.1: " + icons2_0_1.length);
    _addPotentialNameMatches();
    console.log("name matches: " + _matches);
    _addTagsTo3_0();
  }

  function _addPotentialNameMatches(){
    var names_3_0 = icons3_0.map(function(e){
      return e.name;
    });

    icons2_0_1.forEach(function(icon){
      var newNameGuess = icon.name;
      newNameGuess = newNameGuess.replace('social', 'logo');
      newNameGuess = newNameGuess.replace('android', 'md');

      // Check if name match exists
      if (names_3_0.indexOf(newNameGuess) !== -1){
        _matches += 1;
        icon.newName = newNameGuess;
        icons3_0[names_3_0.indexOf(newNameGuess)].oldName = icon.name;
      } else {
        icon.newName = null;
      }
    });
  }

  // Adds search tags and null old name if was not matched
  function _addTagsTo3_0(){
    icons3_0.forEach(function(icon){
      // Add tags
      icon.tags = [];
      var tempTags = icon.name.split('-');
      tempTags.forEach(function(tag){
        if (tag === 'outline' || tag === 'ios' || tag === 'md') {
          icon.tags.push(tag);
        } else if (tag === 'logo') {
          // Don't do anything since logo ones are included in next but need this here so it doesn't do a lookup on "logo" every time
        } else {
          // Grab core tags from available list
          var remainingTags = tags3_0[tag];
          if (remainingTags){
            icon.tags = icon.tags.concat(remainingTags);
          } else {
            icon.tags.push(tag);
          }
        }
      });

      // Add null oldName if not set yet
      if (!icon.oldName){
        icon.oldName = null;
      }
    });
  }

  return {
    init: init
  }
})();

$(document).ready(function(){
  APP.InitialDataCleanUp.init();
})

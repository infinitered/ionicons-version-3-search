"use strict;"

var APP = APP || {};

APP.InitialDataCleanUp = (function(){
  var _matches = 0;

  function init(){
    _addTagsTo3_0();
  }

  // Adds search tags
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

      // Add empty community tags
      icon.communityTags = [];
    });
  }

  return {
    init: init
  }
})();

$(document).ready(function(){
  APP.InitialDataCleanUp.init();
})

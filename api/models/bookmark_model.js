var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookmarkSchema = new Schema(
  {
    title : {
      type : String
    },
    link : {
      type : String,
      unique: true
    },
    time_created: {
      type: Date,
      default : Date.now()
    },
    time_update : {
      type: Date,
      default : Date.now()
    },
    publisher : {
      type : String 
    },
    tag : {
      type : String
    }
  }  
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);

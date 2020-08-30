var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TagSchema = new Schema(
  {
    title : {
      type : String,
      unique : true
    },
    time_created: {
      type: Date,
      default: Date.now()
    },
    time_update : {
      type: Date,
      default: Date.now()
    },
    bookmarks : {
      type : []
    }
  }  
);

module.exports = mongoose.model("Tag", TagSchema);

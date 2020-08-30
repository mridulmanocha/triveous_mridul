var mongoose = require("mongoose");
var Bookmark = mongoose.model("Bookmark");
var Tag = mongoose.model("Tag");


exports.create_bookmark = (req, res, next) => {
  var bookmark = req.body
  Bookmark.create(bookmark, (err, bookmark2) => {
    if (err) res.send(err);
    else if (!bookmark2) res.status(500).send("Internal Server Error");
    else {
            if(bookmark.tag){
              next();
            } else {
              res.send('created');
            }
    }
  });
};

exports.create_tag = (req, res) => {
  var body = req.body
  Tag.findOne(
    {
      "title": body.tag
    },
    function(err, tag) {
      if(!tag){
        if(!body.title){
          body.title = res.locals.title;
        }
        var tag2 = {
          title : body.tag,
          bookmarks : body.title
        }
          Tag.create(tag2, (err, tag) => {
            if (err) res.send(err);
            else if (!tag) res.status(500).send("Internal Server Error");
            else {
                    res.send('bookmark created');
            }
          });
      } else {
        if(!body.title){
          body.title = res.locals.title;
        }
          Tag.findOneAndUpdate(
            {
              title : body.tag
            }, 
            { $push: { bookmarks: body.title  } },
            function(err,suc){
                if(suc){
                  res.send('created'); 
                } else res.send(err);
            }
          );
      }
    });
};

exports.delete_bookmark = (req,res ) => {
  var body = req.body


  Bookmark.findOneAndRemove({ link : body.link }, function( error, bookmark, result) {
  
    if(error) res.send(error);
    else 
    {
      Tag.findOneAndUpdate(
        {
          title : bookmark.tag
        }, 
        { $pull: { bookmarks: bookmark.title} },
        function(err,suc){
            if(suc){
              res.send('deleted'); 
            } else res.send('error');
        }
      )
    }
});
}

exports.set_tag = (req,res,next) => {
  var body = req.body

  Bookmark.findOneAndUpdate(
    {
      link : body.link
    }, 
    {$set:{tag: body.tag , time_update : Date.now()  }},
    function(err,suc){
        if(suc){
          res.locals.title = suc.title;
          next();
        } else res.send(err);
    }
  );
}

exports.remove_tag = (req,res,next) => {

  var body = req.body


  Bookmark.findOneAndUpdate(
    {
      link : body.link
    }, 
    {$unset:{tag: ""},
      $set:{time_update : Date.now()  }},
    function(err,suc){
        if(suc){
          console.log(suc);
          Tag.findOneAndUpdate(
            {
              title : suc.tag
            }, 
            { $pull: { bookmarks: suc.title} },
            function(err,suc){
                if(suc){
                  res.send('removed'); 
                } else res.send('error');
            }
          )
        } else res.send(err);
    }
  );
}

exports.create_empty_tag = (req,res) => {
  var body = req.body
  var tag2 = {title : body.title};
  Tag.create(tag2, (err, tag) => {
    if (err) res.send(err);
    else if (!tag) res.status(500).send("Internal Server Error");
    else {
            res.send('empty tag created');
    }
  });
}

exports.get_bookmarks = (req,res) => {
  Bookmark.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
}

exports.get_tags = (req,res) => {
  Tag.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
}
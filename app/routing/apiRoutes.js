var friends = require("../data/friends");
console.log("test: ",friends);
module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/survey", function(req, res) {
    var index = Math.floor(Math.random() * 10); 
  	console.log("format: ",req.body);
    var newFriend = req.body;
    if(friends.length === 1){
      friends.push(newFriend);
      var result = [friends[0], newFriend]
      res.json(result);
    }else {
    
      console.log(newFriend);
       
        var lowestDiff = 1000; // set this to a high number to start.
        var matchedFriend;
        var scoresLength = newFriend["scores[]"].length
        for(var fr=0;fr<friends.length;fr++){
          //console.log(": ",currentDiff);
          var currentFriend=friends[fr];
          var currentDiff = 0;
          
          for(var i = 0; i<scoresLength;i++){
            var scoreA = parseInt(newFriend["scores[]"][i]);
            var scoreB = currentFriend["scores[]"][i];
            var diff = Math.abs(scoreA-scoreB);
            currentDiff += diff;
          }

          if(currentDiff < lowestDiff || matchedFriend == undefined){
            lowestDiff = currentDiff;
            matchedFriend = currentFriend;
          }
        }
        friends.push(newFriend);
        var result = {
              friendA:matchedFriend,
              friendB:newFriend
            }
        res.json(result);
      }
  });
}
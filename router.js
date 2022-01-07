var Profile = require("./profile.js");

// Handle the HTTP route GET / and POST / i.e. Home
function home(request, response) {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.write("Header\n");
    response.end("Search\n");
    response.write("Footer\n");
  }
}

// Handle http route GET /:username i.e /hannahkwaw2
function user(request, response) {
  var username = request.url.replace("/", "");
  if (username.length > 0) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.write("Header\n");

    var studentProfile = new Profile(username);

    studentProfile.on("end", function (profileJSON) {
      //show profile

      //store values needed
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript,
      };
      response.end(values.username + " has " + values.badges + " badges\n");
      response.write("Footer\n");
    });

    //on error
    studentProfile.on("error", function (error) {
      //show error
      response.write(error.message + "\n");
      response.write("Footer\n");
    });
  }
}
module.exports.home = home;
module.exports.user = user;

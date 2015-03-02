function BadgeAsserter () {
  this.host = "http://monet.informatik.rwth-aachen.de/Serious-Game-Framework/";
  this.badges_path = "data/badges/";
  this.assertions_path = this.badges_path + "assertions/";

  this.assertBadge = function (game_name, oidc_userinfo, badge_name) {
    this.game_name = game_name || "other";
    this.user_info = oidc_userinfo;
    this.badge_name = badge_name || game_name;

    // determine uid, which is: (game_name)-(badge-name)-(user.firstname)-(user.lastname)
    // will also be used as the file_name with a .json ending
    // EXAMPLES: tutorial-tutorial-marko-kajzer(.json) | other-10-correct-marko-kajzer(.json)
    this.uid = this.game_name + "-" + this.badge_name + "-" + this.user_info.name.toLowerCase().split(' ').join('-')
    this.assertion_file_name = this.uid + ".json";
    // this.assertion_file_name = "tutorial-marko-kajzer";

    this.assertion_host_path = this.host + this.assertions_path + this.assertion_file_name;
    this.identity = this.user_info.email;
    this.badge_host_path = this.host + this.badges_path + this.game_name + "/" + this.badge_name + "-badge.json";

    // Some debugging information, choose at own needs
    // console.log(this.host);
    // console.log(this.badges_path);
    // console.log(this.assertions_path);
    // console.log(this.game_name);
    // console.log(this.user_info);
    // console.log(this.badge_name);
    // console.log(this.uid);
    // console.log(this.assertion_file_name);
    // console.log(this.assertion_host_path);
    // console.log(this.identity);
    // console.log(this.badge_host_path);

    // Check if assertion file already exists
    var request = $.ajax({
      "async": false,
      "url" : this.assertion_host_path
    });

    if(request.status == 404) {
      // Assertion file does not exists
      // -> User does not have earned this badge yet, go on with assertion process
      console.log("Assertion file does not already exist, assert and issue Badge");
    }
    else if(request.status == 200) {
      // Assertion file does already exist
      // -> User has already earned the badge, abort assertion process
      console.log("Assertion file does already exist, abort assertion process");
      return;
    }

    // create the badge assertion
    this.assertion = {
      "uid": this.uid,
      "recipient": {
        "type": "email",
        "identity": this.identity,
        "hashed": false
      },
      "badge": this.badge_host_path,
      "verify": {
        "type": "hosted",
        "url": this.assertion_host_path
      },
      "issuedOn": Date.now() / 1000 | 0
    }
    this.assertion = JSON.stringify(this.assertion);

    // prepare params for PHP BadgeAsserter
    this.file_path = "../" + this.assertions_path + this.assertion_file_name;

    var params = "action=create";
        params += "&path=" + this.file_path;
        params += "&assertion=" + this.assertion;

    // POST Request to PHP Badge Assertion to create the actual assertion file
    var xhr = new XMLHttpRequest();
    xhr.open('post', './lib/badge-asserter.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);

    // issue the Badge
    this.issueBadge([this.assertion_host_path], this.file_path)
  };

  this.issueBadge = function (assertion_host_path, file_path) {
    // Issue the Badge
    OpenBadges.issue(assertion_host_path, function(errors, successes) {
      console.log(errors);
      console.log(successes);

      // if there was an error, delete the assertions file
      // if error was that badge already existed, no action is taken
      if(errors !== [] && errors[0].reason !== 'EXISTS') {
        // prepare params for PHP BadgeAsserter
        var params = "action=delete";
            params += "&path=" + file_path;

        // POST Request to PHP Badge Asserter to delete the assertion file
        var xhr = new XMLHttpRequest();
        xhr.open('post', './lib/badge-asserter.php', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
      }
    });
  };
}

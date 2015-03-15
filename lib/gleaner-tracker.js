function GleanerTracker () {
  this.gleaner_url = "http://localhost:3000/collect/track"; // TODO MARKO use real location
  this.gleaner_traces_url = "http://localhost:3000/collect/traces"; // TODO MARKO use real location

  this.startTracking = function (user_info) {
    // Call collect/start method of Gleaner API
    // TODO MARKO add real url
    // TODO MARKO add real email
    $.ajax({
      type: 'POST',
      url: "http://localhost:3000/collect/start/54f7502966468383acbec8319dnoib1qqzq1714i",
      dataType: "json",
      headers: {
        'Authorization': 'a:',
        'Email': user_info.email
      },
      success: function(result) {
        console.log("Login registered!");
        gleaner_tracker.trackTrace(user_info, "login")
      },
      error: function(error) {
        console.log(error);
        console.log("Cannot start tracking. Server down?");
      }
    });
  }

  this.trackTrace = function (user_info, type, data) {
    // check if user is logged in
    if(user_info) {}
    else {
      console.log("User not logged in. No action!");
      return;
    }

    var trace;
    var badge_statistic;
    if(type == "level_completion") {
      // Prepare the trace for level_completion with Level and Game IDs and the level result
      trace = [{
        "type": "logic",
        "event": "level_end",
        "target_level": data.levelID,
        "target_game": data.gameID,
        "user": user_info.email,
        "result": data.result
      }];

      badge_statistic = data.result;
    }
    else if(type == "elearning") {
      // Prepare the trace for level_completion with Level and Game IDs and the level result
      trace = [{
        "type": "input",
        "target": "elearning",
        "action": "clicked",
        "context_game": data.gameID,
        "context_level": data.levelID,
        "user": user_info.email
      }];
    }
    else if(type == "game_start") {
      // Prepare the trace for starting a game with Game ID
      trace = [{
        "type": "logic",
        "event": "game_start",
        "target_game": data.gameID,
        "user": user_info.email
      }];
    }
    else if(type == "login") {
      // Prepare the trace for logging in, which contains the login time
      trace = [{
        "type": "logic",
        "event": "login",
        "time": Date.now() / 1000 | 0,
        "user": user_info.email
      }];
    }

    // Now send the prepared trace
    $.ajax({
      type: 'POST',
      dataType: 'json',
      contentType:'application/json',
      url: this.gleaner_url,
      headers: {
        'Email': user_info.email
      },
      data: JSON.stringify(trace),
      success: function(result) {
        console.log("Trace saved!");
        if(badge_statistic) {
          gleaner_tracker.queryStatisticsRecords(user_info, badge_statistic);
        }
      },
      error: function() {
        console.log("Trace could not be saved!");
      }
    });
  }

  this.queryStatisticsRecords = function(user_info, statistic) {
    // Query count of records of the given statistic from this user
    $.ajax({
      url: this.gleaner_traces_url,
      dataType: "json",
      headers: {
        'Statistic': statistic,
        'Email': user_info.email,
      },
      success: function(result) {
        gleaner_tracker.checkBadgeRequirements(user_info, result);
      },
      error: function() {
        console.log("An error occured while checking requirements...");
      }
    });
  }

  this.checkBadgeRequirements = function(user_info, result) {
    // Check requirements based on the previously saved statistic
    // Award badges depending on the statistics:
    // First correct / incorrect answer
    // First usage of show_me
    // Ten correct answers
    user_info = {name: "Marko Kajzer", email: "marko.kajzer@hotmail.de"};
    if(result.result == "correct") {
      if(result.count == 1) {
        badge_asserter.assertBadge("other", user_info, "one-correct");
      }
      else if(result.count == 10) {
        badge_asserter.assertBadge("other", user_info, "ten-correct");
      }

    }
    else if(result.result == "wrong") {
      if(result.count == 1) {
        badge_asserter.assertBadge("other", user_info, "one-wrong");
      }
    }
    else if(result.result == "show_me") {
      badge_asserter.assertBadge("other", user_info, "one-show-me");
    }
  }
}

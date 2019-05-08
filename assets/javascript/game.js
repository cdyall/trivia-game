var card = $("#quiz");

//My Array of quests and ans
var quests = [
  {
    quest: "Which of these is a Frank Lloyd Wright design? ",
    ans: ["The Glass House", "Jeddah Tower", "Falling Water", "520 Park Ave"],
    cAns: "Falling Water"
  },

  {
    quest: "Which of this is a Frank Gehry Design?",
    ans: ["One World Trade Center", "Citi Building", "The Modern", "Dancing House"],
    cAns: "Dancing House"
  },

  {
    quest: "What is the proposed height of Jeddah Tower?",
    ans: ["2000 feet", "30 feet", "5000 feet", "3300 feet"],
    cAns: "3300 feet"
  },

  {
    quest: "Which memorial was masterminded by louis khan?",
    ans: ["reflecting pools", "Roosevelt Memorial", "East Coast Memorial", "CowGirl SeaHorse"],
    cAns: "Roosevelt Memorial"
  },

  {
    quest: "In what year was the Empire State Building completed?",
    ans: ["1927", "1946", "1938", "1931"],
    cAns: "1931"
  },

  {
    quest: "What was the tallest structure in New York in 1883? ",
    ans: ["Chrysler Buliding", "Empire State Building", "Brooklyn Bridge", "Lincoln Tunnel"],
    cAns: "Brooklyn Bridge"
  },

  {
    quest: "Which current Developer is one of the oldest in NYC?",
    ans: ["Procida", "Turner", "Mayrich", "L.Riso"],
    cAns: "Turner"
  },

  {
    quest: "Which Modernist Architect praised the George Wasshington Bridge?",
    ans: ["Robert Stern", "Louis Kahn", "Frank Gehry", "Le Corbusier"],
    cAns: "Le Corbusier"
  },

  {
    quest: "Who is the Architect of The Shard?",
    ans: ["Adrian Smith", "Santiago Calatrava", "Renzo Piano", "Steve Leventis"],
    cAns: "Renzo Piano"
  },

  {
    quest: "When was Carnegie Hall completed?",
    ans: ["1891", "1902", "1879", "1983"],
    cAns: "1891"
  }
];

//variables for the following functions
var timer;
var action = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  // A complex array with variables and functions
  countdown: function() {
    action.counter--;
    $("#counter-number").html(action.counter);
    if (action.counter === 0) {
      action.done();
    }
  },

  start: function() {
    timer = setInterval(action.countdown, 1000);

    $("#sub-box").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < quests.length; i++) {
      card.append("<h2>" + quests[i].quest + "</h2>");
      for (var j = 0; j < quests[i].ans.length; j++) {
        card.append("<input type='radio' name='quest-" + i +
          "' value='" + quests[i].ans[j] + "''>" + quests[i].ans[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === quests[i].cAns) {
        action.correct++;
      } else {
        action.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct ans: " + this.correct + "</h3>");
    card.append("<h3>Incorrect ans: " + this.incorrect + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  action.start();
});

$(document).on("click", "#done", function() {
  action.done();
});

$(document).ready(function(){
  
    // event listeners
    $("#countdown").hide();
    $("#begin").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  });
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    clock: 20,
    clockOn: false,
    clockId : '',
    // questions options and answers data
    questions: {
      q1: "Which of these is a Frank Lloyd Wright design? " ,
      q2: "Which of this is a Frank Gehry Design?",
      q3: "What is the proposed height of Jeddah Tower?",
      q4: "Which memorial was masterminded by louis khan?",
      q5: "In what year was the Empire State Building completed?",
      q6: "What was the tallest structure in New York in 1883? ",
      q7: "Which current Developer is one of the oldest in NYC?",
      q8: "Which Modernist Architect praised the George Wasshington Bridge?",
      q9: "Who is the Architect of The Shard?",
      q10: "When was Carnegie Hall completed?"
    },
    options: {
      q1: ["The Glass House","Jeddah Tower","Falling Water","520 Park Ave"],
      q2: ["One World Trade Center","Citi Building","The Modern","Dancing House"],
      q3: ["2000 feet","30 feet", "5000 feet", "3300 feet"],
      q4: ["reflecting pools","Roosevelt Memorial","East Coast Memorial","CowGirl SeaHorse"],
      q5: ["1927","1946","1938","1931"],
      q6: ["Chrysler Buliding","Empire State Building","Brooklyn Bridge","Lincoln Tunnel"],
      q7: ["Procida","Turner","Mayrich","L.Riso"],
      q8: ["Robert Stern","Louis Kahn","Frank Gehry","Le Corbusier"],
      q9: ["Adrian Smith","Santiago Calatrava","Renzo Piano","Steve Leventis"],
      q10: ["1891","1902","1879","1983"]
    },
    answers: {
      q1: "Falling Water",
      q2: "Dancing House",
      q3: "3300 feet",
      q4: "Roosevelt Memorial",
      q5: "1931",
      q6: "Brooklyn Bridge",
      q7: "Turner",
      q8: "Le Corbusier",
      q9: "Renzo Piano",
      q10: "1891"
    },
    // trivia methods
    // method to initialize game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.clockId);
      
      // show game section
      $('#playoff').show();
      
      //  empty last results
      $('#results').html('');
      
      // show clock
      $('#clock').text(trivia.clock);
      
      // remove start button
      $('#begin').hide();
  
      $('#countdown').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    // method to loop through and display questions and options 
    nextQuestion : function(){
      
      // set clock to 20 seconds each question
      trivia.clock = 10;
       $('#clock').removeClass('last-seconds');
      $('#clock').text(trivia.clock);
      
      // to prevent clock speed up
      if(!trivia.clockOn){
        trivia.clockId = setInterval(trivia.clockRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#quandry').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      });
      
    },
    // method to decrement counter and count unanswered if clock runs out
    clockRunning : function(){
      // if clock still has time left and there are still questions left to ask
      if(trivia.clock > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#clock').text(trivia.clock);
        trivia.clock--;
          if(trivia.clock === 4){
            $('#clock').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, run result
      else if(trivia.clock === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.clockId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hide game sction
        $('#playoff').hide();
        
        // show start button to begin a new game
        $('#begin').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // clock ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.clockId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.clockId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  };
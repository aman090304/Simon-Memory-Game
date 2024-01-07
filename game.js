
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
var started=false;
var gamePattern = [];
var userClickedPattern = [];
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
    playSound( $(this).attr("id"));
    animatePress($(this).attr("id"));
  checkAnswer(userClickedPattern.length-1);
});
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } 
    else {
        if(level!=0){
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(()=> $("body").removeClass("game-over"),200)
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        gameReset();
        }
    }
}
function gameReset(){
    $("h1").text("Press A Key to Start");
    gamePattern=[];
    userClickedPattern=[];
    started=false;
    level=0;
}
function nextSequence() {
    level++;
    userClickedPattern = [];
    $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}


function playSound(name){
    var audio=new Audio("sounds/"+ name+ ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(()=> $("#"+currentColour).removeClass("pressed"),100);
}
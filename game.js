
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var started=false;



$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function () {
                nextSequence();       // from here the next sequence function will be called
              }, 1000);
      
        }
    }
    else{
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        })
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $(document).keypress(startOver);
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
    setTimeout(()=>{
        nextSequence();
    },200)  
    
}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber=Math.floor(Math.random()*4);    //generates random number between 0 and 3
    let randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $(`#${randomChoosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio=new Audio(`sounds/${randomChoosenColor}.mp3`);
    audio.play();
}


function animatePress(currentColor)
{
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(()=>{
        $(`#${currentColor}`).removeClass("pressed")
    },100);
}

function playSound(userChoosenColor)
{
    var audio=new Audio(`sounds/${userChoosenColor}.mp3`);
    audio.play();
}






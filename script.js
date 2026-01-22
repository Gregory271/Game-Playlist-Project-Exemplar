console.log("js started");
var grid = document.querySelector(".grid-container");

if(localStorage.getItem("datalist")){
  var data = JSON.parse(localStorage.getItem("datalist"));
  if(grid){//error handling for form page, grid doesnt exist there, yet this code runs anyway
    makeCards();
  }
}
else{
  var data;
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() { 
      if (this.readyState == 4 && this.status == 200) { 
        data = JSON.parse(xhttp.responseText);
        console.log("no local storage found, adding datalist to browser storage");
        localStorage.setItem("datalist",JSON.stringify(data));
        data=JSON.parse(localStorage.getItem("datalist"));

        console.log(data);


        if(grid){
          makeCards();
        }
      }
  };
  xhttp.open("GET", "gameData.json", true); 
  xhttp.send(); 
}


function makeCards(){
  grid.innerHTML = ""; // clears cards on screen only (data stays intact)
  data.forEach(function(game) { 
        
        let card = document.createElement("div"); 
        card.classList.add("card"); 

        let textData =
          "<div class='game-title'>" + game.title + "</div>" +
          "<span>" +
          "Publisher: " + game.publisher + "<br></span>" +
          "<span> Release Date: " + game.releaseDate + "<br></span>" +
          "<span> Needs Research: " + game.needsResearch +
          "</span>"; 

        card.innerHTML = textData;

        if (game.imgSrc) { 
          card.style.backgroundImage = "url(" + game.imgSrc + ")";
        }
        else{
          card.style.backgroundColor = "lightgreen";
        }
        if (game.gifSrc) {

          card.addEventListener("mouseenter", function () {
            console.log("mouse entered card");
            console.log("img set to "+game.gifSrc);
            this.style.backgroundImage = "url('" + game.gifSrc + "')";
          });

          card.addEventListener("mouseleave", function () {
            console.log("mouse left card");
            this.style.backgroundImage = "url(" + game.imgSrc + ")";
          });
        }

        grid.appendChild(card);
       });
       console.log("cards refreshed");
}


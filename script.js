console.log("js started");
var grid = document.querySelector(".grid-container");
//made grid global so that it can be used anywhere
const filterInput = document.querySelector(".filter-input");

if(localStorage.getItem("datalist")){
  var data = JSON.parse(localStorage.getItem("datalist"));
  if(grid){//error handling for form page, grid doesnt exist there, yet this code runs anyway
    makeCards();//call makeCard function if the grid exists
  }
}
else{//otherwise if localStorage doesnt contain the data, then make the request
  var data;
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() { 
      if (this.readyState == 4 && this.status == 200) { //if request is successful
        data = JSON.parse(xhttp.responseText);//convert to usable object for website interface
        console.log("no local storage found, adding datalist to browser storage");
        localStorage.setItem("datalist",JSON.stringify(data));//convert to string for localStorage save
        data=JSON.parse(localStorage.getItem("datalist")); //parse data from localStorage, ensure info is updated

        console.log(data);


        if(grid){//if grid exists then make cards
          makeCards();
        }
      }
  };
  xhttp.open("GET", "gameData.json", true); 
  xhttp.send(); 
}

filterInput.addEventListener("input",function(){
  let filterType = filterInput.value;
  filterGames(filterType);
})

function makeCards(){
  grid.innerHTML = ""; // clears cards on screen only (data stays intact)
  data.forEach(function(game) { 
        
        let card = document.createElement("div"); 
        card.classList.add("card"); 

        let publisher = String(game.publisher);//this pattern was added to add spaces after commas in data
        publisher = publisher.split(",");
        if(publisher.length>1){
          publisher = publisher.join(", ");
        }

        let textData =
          "<div class='game-title'>" + game.title + "</div>" +
          "<span>" +
          "Publisher: " + publisher + "<br></span>" +
          "<span> Release Date: " + game.releaseDate; 

        card.innerHTML = textData;

        if (game.imgSrc) { 
          card.style.backgroundImage = "url(" + game.imgSrc + ")";
        }
        else{
          card.style.backgroundColor = "lightgreen";
        }
        if (game.gifSrc) {

          card.addEventListener("mouseenter", function () {
            // console.log("mouse entered card");
            // console.log("img set to "+game.gifSrc);
            this.style.backgroundImage = "url('" + game.gifSrc + "')";
          });

          card.addEventListener("mouseleave", function () {
            //console.log("mouse left card");
            this.style.backgroundImage = "url(" + game.imgSrc + ")";
          });
        }

        grid.appendChild(card);
       });
       console.log("cards refreshed");
}

function filterGames(filterChoice){
  console.log("filtering...." + filterChoice);
}


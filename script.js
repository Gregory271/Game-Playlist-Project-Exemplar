// console.log("js console");//check that script code is connected by displaying message in console

// let data;//declare variable that will store json data
// let grid = document.querySelector(".grid-container");//declare variable that identifies empty grid div

// var xhttp = new XMLHttpRequest();//declare variable that stores XHR

// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {//checks state of data request for a successful transfer
//        // Typical action to be performed when the document is ready:
//        data = JSON.parse(xhttp.responseText);//converts JSON data into usable javaScript objects
//        console.log(data);//displays data as list of JS objects

//        data.forEach(function(game){//this loop "looks" at each data item recieved, creates a "card" on interface for each game
//         let card = document.createElement("div");//declares a variable that represents the new "card" or div of each playlist item
//         card.classList.add("card");//adds the card class to each new div object for css styles
//         //the code below concatenates/joins the properties of your data in order to display info/text on the webpage
//         let textData = "<div class='game-title'>"+game.title + "</div>"+ "<span>" + "Publisher: " + game.publisher + "<br>" + " Release Date: " + game.releaseDate + "<br>" +"Needs Research: " + "</span>" /*+ game.needsResearch + "</span>"*/;
//         card.innerHTML= textData;//inserts data we concatenated previously into each new "card" or div
//         if(game.imgSrc){//checks if data includes an image for a particular data item
//             card.style.backgroundImage = "url('"+game.imgSrc+"')";//places image in background if image exists
//         }
//         grid.appendChild(card);//finally, add the fully assembled card with text and picture to the screen
//        });

//     }
// };
// xhttp.open("GET", "gamedata.json", true);//details which file the XHR will get
// xhttp.send();//sends out the XHR for data transfer

console.log("js console"); // [__1__]

let data; // [__2__]
let grid = document.querySelector(".grid-container"); // [__3__]

var xhttp = new XMLHttpRequest(); // [__4__]

xhttp.onreadystatechange = function() { // [__5__]
    if (this.readyState == 4 && this.status == 200) { // [__6__]

       data = JSON.parse(xhttp.responseText); // [__7__]
       console.log(data); // [__8__]

       data.forEach(function(game) { // [__9__]
        let card = document.createElement("div"); // [__10__]
        card.classList.add("card"); // [__11__]

        let textData =
          "<div class='game-title'>" + game.title + "</div>" +
          "<span>" +
          "Publisher: " + game.publisher + "<br>" +
          " Release Date: " + game.releaseDate + "<br>" +
          "Needs Research: " + game.needsResearch +
          "</span>"; // [__12__]

        card.innerHTML = textData; // [__13__]

        if (game.imgSrc) { // [__14__]
            card.style.backgroundImage = "url('" + game.imgSrc + "')";
        }

        grid.appendChild(card); // [__15__]
       });

    }
};

xhttp.open("GET", "gamedata.json", true); // [__16__]
xhttp.send(); // [__17__]

console.log("js started");
var grid = document.querySelector(".grid-container");
//made grid global so that it can be used anywhere
const filterInput = document.querySelector(".filter-input");
const descendingButton = document.querySelector("#descending");
const ascendingButton = document.querySelector("#ascending");
const sortSelect = document.querySelector(".sort-select");
var sortByChoice;
var ratingClicked = false;;

if (localStorage.getItem("datalist")) {
  var data = JSON.parse(localStorage.getItem("datalist"));
  if (grid) {//error handling for form page, grid doesnt exist there, yet this code runs anyway
    makeCards();//call makeCard function if the grid exists
  }
}
else {//otherwise if localStorage doesnt contain the data, then make the request
  var data;
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { //if request is successful
      data = JSON.parse(xhttp.responseText);//convert to usable object for website interface
      console.log("no local storage found, adding datalist to browser storage");
      localStorage.setItem("datalist", JSON.stringify(data));//convert to string for localStorage save
      data = JSON.parse(localStorage.getItem("datalist")); //parse data from localStorage, ensure info is updated

      console.log(data);

      if (grid) {//if grid exists then make cards
        makeCards();
      }
    }
  };
  xhttp.open("GET", "gameData.json", true);
  xhttp.send();
}

//display sort options when sort type is chosen
filterInput.addEventListener("input", function () {
  let sortType = filterInput.value;
  if (sortType == "default") {
    console.log("resetting data to default sort option");
    if (sortSelect.style.display === "block") {
      sortSelect.style.display = "none";
    }
    restoreDefaultOrder();
  }
  else if (sortType == "filter-release") {
    sortSelect.style.display = "block";
  }
})

//event listeners for radio button options to sort
descendingButton.addEventListener("click", function () {
  sortByChoice = descendingButton.value;
  console.log("sort choice chosen - " + sortByChoice);
  sortGames(sortByChoice);
})
ascendingButton.addEventListener("click", function () {
  sortByChoice = ascendingButton.value;
  console.log("sort choice chosen - " + sortByChoice);
  sortGames(sortByChoice);
})

function makeCards() {
  grid.innerHTML = ""; // clears cards on screen only (data stays intact)
  data.forEach(function (game) {

    let card = document.createElement("div");
    card.classList.add("card");

    let publisher = String(game.publisher);//this pattern was added to add spaces after commas in data
    publisher = publisher.split(",");
    if (publisher.length > 1) {
      publisher = publisher.join(", ");
    }
    let textData =
      "<div class='game-title'>" + game.title + "</div>" +
      "<span>" +
      "Publisher: " + publisher + "<br><br><br></span>" +
      "<span> Release Date: " + game.releaseDate + "<br><br><br> User Rating: <span class='user-rating'>" + game.userRating + "</span>";

    card.innerHTML = textData;

    if (game.imgSrc) {
      card.style.backgroundImage = "url('" + game.imgSrc + "')";
    }
    else {
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
        card.style.backgroundImage = "url('" + game.imgSrc + "')";
      });
    }
    const ratingSpan = card.querySelector(".user-rating");
    // const saveRatingButton = ratingSpan.querySelector(".save-rating-button");

    if (game.userRating === undefined || game.userRating == "") {
      game.userRating = "Not Rated";
      ratingSpan.textContent = game.userRating;
      ratingSpan.style.color = "#ff0000";
    }
    // ratingSpan.insertAdjacentHTML("beforebegin","<div class='rating-flexbox'>");
    ratingSpan.insertAdjacentHTML("beforeend", "<input type='number' class='rating-input' name='rating-input' min='0' max='10'>")
    ratingSpan.insertAdjacentHTML("beforeend", "<button class='save-rating-button'>Save Rating</button>")
    grid.appendChild(card);

    ratingSpan.addEventListener("click", function () {
      var ratingInput = this.querySelector(".rating-input");
      var saveRatingButton = this.querySelector(".save-rating-button");

      if (!ratingClicked) {
        ratingClicked = true;
        ratingInput.style.visibility = "visible";
        saveRatingButton.style.visibility = "visible";
      } else {
        ratingClicked = false;
        ratingInput.style.visibility = "hidden";
        saveRatingButton.style.visibility = "hidden";
      }
    });

    ratingSpan.querySelector(".rating-input").addEventListener("input", function () {
      if (this.value < 0) { this.value = 0; }
      if (this.value > 10) { this.value = 10; }
    });


    ratingSpan.querySelector(".rating-input").addEventListener("click", function (e) {
      e.stopPropagation();
    });

    ratingSpan.querySelector(".save-rating-button").addEventListener("click", function (e) {
      e.stopPropagation();

      var ratingInput = ratingSpan.querySelector(".rating-input");
      var rating = ratingInput.value;

      game.userRating = rating;

      ratingSpan.childNodes[0].nodeValue = rating; // update text label

      localStorage.setItem("datalist", JSON.stringify(data));

      ratingInput.style.visibility = "hidden";
      this.style.visibility = "hidden";
      ratingClicked = false;
    });


  });
  console.log("cards refreshed");
}

function getNextId() {//id comparison function for "default" sorting function
  var maxId = 0;

  data.forEach(function (item) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  });
  return maxId + 1;
}

function restoreDefaultOrder() {//resets sorting back to default order of data, uses helper getNextId()
  data.sort(function (a, b) {
    return a.id - b.id;
  });

  localStorage.setItem("datalist", JSON.stringify(data));
  makeCards();
}

function dateToNumber(dateStr) {//date comparison helper function
  // Handles missing dates
  if (!dateStr) {
    return 0;
  }

  // If your dates are already like "2024-12-31", Date() will parse nicely.
  var t = new Date(dateStr).getTime();

  if (isNaN(t)) {
    return 0;
  }

  return t;
}

function sortGames(sortChoice) {
  if (sortChoice == descendingButton.value) { // new -> old
    data.sort(function (a, b) {
      return dateToNumber(b.releaseDate) - dateToNumber(a.releaseDate);
    });
  }
  else if (sortChoice == ascendingButton.value) { // old -> new
    data.sort(function (a, b) {
      return dateToNumber(a.releaseDate) - dateToNumber(b.releaseDate);
    });
  }

  // Save the new order (optional but recommended if you want it to “stick”)
  localStorage.setItem("datalist", JSON.stringify(data));

  // Re-render
  makeCards();
}
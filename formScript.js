console.log("form script started");


//data = JSON.parse(localStorage.getItem("datalist"));
console.log(data);

const titleInput = document.querySelector("#title-input");
const devInput = document.querySelector("#dev-input");
const releaseDateInput = document.querySelector("#release-date-input");
const imgInput = document.querySelector("#img-input");
const gifInput = document.querySelector("#gif-input");

//code to initialize form submission of data to list object
var form = document.querySelector("form");

form.addEventListener("submit",function(e){
    e.preventDefault();
    let title = titleInput.value;
    let publisher = devInput.value;
    let releaseDate = releaseDateInput.value;
    let gifSrc = gifInput.value;
    let imgSrc = imgInput.value;
    let newObj = {"id":getNextId(), "title": title, "publisher":publisher, "releaseDate":releaseDate, "imgSrc":imgSrc, "gifSrc":gifSrc };
    submitData(newObj);
    form.reset();
});

function submitData(newGame){
    data.push(newGame);
    localStorage.setItem("datalist",JSON.stringify(data));
    console.log(localStorage.getItem("datalist"));
    //makeCards();
}
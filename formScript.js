console.log("form script started");


//data = JSON.parse(localStorage.getItem("datalist"));
console.log(data);

const titleInput = document.querySelector("#title-input");

//code to initialize form submission of data to list object
var form = document.querySelector("form");

form.addEventListener("submit",function(e){
    e.preventDefault();
    let title = titleInput.value;
    let newText = {"id":data.length+1, "title": title };
    submitData(newText);
});

function submitData(newGame){
    data.push(newGame)

    localStorage.setItem("datalist",JSON.stringify(data));
    console.log(localStorage.getItem("datalist"));
    makeCards();
}
var mealCategory = ['entree', 'dessert', 'snack'];
var currentObj = 1; // Current entry displayed on page
var maxObj = 5; // Last entry displayed on page

class FilipinoFood {
    constructor(name, origin, myRating, isServedAtJollibee, mealType, image) {
        this.name = name; // string 1
        this.origin = origin; // string 2
        this.myRating = myRating; // number
        this.isServedAtJollibee = isServedAtJollibee; // boolean
        this.mealType = mealType; // category
        this.image = image; // image (string)
    }
}

/*
let food1 = new FilipinoFood('Adobo','Phillipines', 10, true, mealCategory[0], 'images/adobo.png');
let food2 = new FilipinoFood('Lumpia', 'China', 8, false, mealCategory[2], 'images/lumpia.png');
let food3 = new FilipinoFood('Filipino Spaghetti', 'Italy', 10, true, mealCategory[0], 'images/spaghetti.png');
let food4 = new FilipinoFood('Sinigang','Phillipines', 9, false, mealCategory[0], 'images/sinigang.png');
let food5 = new FilipinoFood('Halo-halo','Japan', 8, true, mealCategory[1], 'images/halohalo.png');
*/

var httpRequest;

function RequestGet() {
    httpRequest = new XMLHttpRequest();
    console.log("requestget");

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    httpRequest.onreadystatechange = callbackFunc;
    httpRequest.open('GET',`GetItem.php?curr=${currentObj}`);
    httpRequest.send();
}

function RequestPost(url, jsonStr) {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    httpRequest.onreadystatechange = callbackFunc;
    httpRequest.open('POST',url);
    httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    httpRequest.send('curr='+ encodeURIComponent(currentObj) +'&newObj='+ encodeURIComponent(jsonStr));
}

function callbackFunc() {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // HTTP Ok
                console.log(httpRequest.responseText);
                let obj = JSON.parse(httpRequest.responseText);
                //console.log(obj);
                updatePage(obj);
            }
        }
    }
    catch (exception) {
        alert('EXCEPTION:' + exception);
    }
}

function updatePage(obj) {
    document.getElementById("name").value = obj.name;
    document.getElementById("origin").value = obj.origin;
    document.getElementById("rating").value = obj.myRating;
    document.getElementById("jollibee").checked = obj.isServedAtJollibee;
    document.getElementById("category").value = obj.mealType;
    document.getElementById("image").innerHTML = '<img src="' + obj.image + '" width="200" height="200">';
    document.getElementById("counter").innerHTML = 'Item #' + currentObj + ' of ' + maxObj;
}

function First() {
    currentObj = 1;
    RequestGet();
}

function Prev() {
    if (currentObj > 1) {
        currentObj--;
        RequestGet();
    }
}

function Next() {
    if (currentObj < maxObj) {
        currentObj++;
        RequestGet();
    }
}

function Last() {
    currentObj = maxObj;
    RequestGet();
}

function Save() {
    let newName = document.getElementById("name").value;
    let newOrigin = document.getElementById("origin").value;
    let newRating = document.getElementById("rating").value;
    let newIsServedAtJollibee = document.getElementById("jollibee").checked;
    let newCategory = document.getElementById("category").value;
    let newImage = document.getElementById("id").childNodes[0].src;

    let newFood = new FilipinoFood(newName, newOrigin, newRating, newIsServedAtJollibee, newCategory, newImage);
    let jsonStr = JSON.stringify(newFood);

    RequestPost('SaveItem.php',jsonStr);
}
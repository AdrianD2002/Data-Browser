var currentObj = 1; // Current entry displayed on page
var maxObj = 10; // Last entry displayed on page

class FilipinoFood {
    constructor(name, origin, myRating, isServedAtJollibee, mealType, image) {
        this.dishName = name; // string 1
        this.origin = origin; // string 2
        this.myRating = myRating; // number
        this.isServedAtJollibee = isServedAtJollibee; // boolean
        this.mealType = mealType; // category
        this.dishImage = image; // image URL
    }
}

var httpRequest;

function ResetDB() {
    httpRequest = new XMLHttpRequest();
    console.log("Reinitializing Database.");

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    httpRequest.onreadystatechange = ResetCallback;
    httpRequest.open('GET',`initDB.php`);
    httpRequest.send();
}

function ResetCallback() {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // HTTP Ok
                console.log(httpRequest.responseText);
                currentObj = 1;
                RequestGet();
            }
        }
    }
    catch (exception) {
        alert('RESETDB EXCEPTION: ' + exception);
    }
}

function RequestGet() {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    httpRequest.onreadystatechange = GetCallback;
    httpRequest.open('GET',`fetch_data.php?curr=${currentObj}`);
    httpRequest.send();
}

function GetCallback() {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // HTTP Ok
                let obj = JSON.parse(httpRequest.responseText);
                //console.log(obj);
                updatePage(obj);
            }
        }
    }
    catch (exception) {
        alert('GET EXCEPTION: ' + exception);
    }
}

function RequestPost(url, jsonStr) {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    httpRequest.onreadystatechange = PostCallback;
    httpRequest.open('POST',url);
    httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    httpRequest.send('curr='+ encodeURIComponent(currentObj) +'&newObj='+ encodeURIComponent(jsonStr));
}

function PostCallback() {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // HTTP Ok
                console.log(httpRequest.responseText);
                RequestGet();
            }
        }
    }
    catch (exception) {
        alert('POST EXCEPTION: ' + exception);
    }
}

function updatePage(obj) {
    document.getElementById("name").value = obj.dishName;
    document.getElementById("origin").value = obj.origin;
    document.getElementById("rating").value = obj.myRating;
    document.getElementById("jollibee").checked = obj.isServedAtJollibee;
    document.getElementById("category").value = obj.mealType;
    document.getElementById("image").innerHTML = '<img src="' + obj.dishImage + '" width="300" height="300">';
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
    let newImage = document.getElementById("image").childNodes[0].src;

    let newFood = new FilipinoFood(newName, newOrigin, newRating, newIsServedAtJollibee, newCategory, newImage);
    let jsonStr = JSON.stringify(newFood);
    console.log(jsonStr)

    RequestPost('save_data.php',jsonStr);
}
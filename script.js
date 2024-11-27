var currentObj = 1; // Current entry displayed on page
var maxObj; // Last entry displayed on page
var httpRequest; // Placeholder for HTTP requests
var sortByIndex = true; // Toggle for display order

var currId; // To save the current object's database ID, separate from the DOM

class FilipinoFood {
    constructor(id, name, origin, myRating, isServedAtJollibee, mealType, image) {
        this.id = id;
        this.dishName = name; // string 1
        this.origin = origin; // string 2
        this.myRating = myRating; // number
        this.isServedAtJollibee = isServedAtJollibee; // boolean
        this.mealType = mealType; // category
        this.dishImage = image; // image URL
    }
}

function Initialize() {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    httpRequest.onreadystatechange = InitializeCallback;
    httpRequest.open('GET',`init.php`);
    httpRequest.send();
}

function InitializeCallback() {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // HTTP Ok
                maxObj = parseInt(httpRequest.responseText);
                document.getElementById("by_index").style = 'color: lime; font-weight: bolder';
                RequestGet();
            }
        }
    }
    catch (exception) {
        alert('RESETDB EXCEPTION: ' + exception);
    }
}

function ResetDB() {
    httpRequest = new XMLHttpRequest();
    console.log("Reinitializing Database.");

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    httpRequest.onreadystatechange = ResetCallback;
    httpRequest.open('GET',`reset_db.php`);
    httpRequest.send();
}

function ResetCallback() {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // HTTP Ok
                console.log(httpRequest.responseText);
                currentObj = 1;
                maxObj = 10;
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
    sortType = sortByIndex ? 1 : 0;

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    httpRequest.onreadystatechange = GetCallback;
    httpRequest.open('GET',`fetch_data.php?curr=${currentObj}&sortIndex=${sortType}`);
    httpRequest.send();
}

function GetCallback() {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // HTTP Ok
                let obj = JSON.parse(httpRequest.responseText);
                //console.log(httpRequest.responseText);
                updatePage(obj);
            }
        }
    }
    catch (exception) {
        alert('GET EXCEPTION: ' + exception);
    }
}

function RequestPost(url, str) {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    httpRequest.onreadystatechange = PostCallback;
    httpRequest.open('POST',url);
    httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    httpRequest.send('str='+ encodeURIComponent(str));
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
    currId = obj.id;

    console.log("Updating page with object:\n" + JSON.stringify(obj));

    document.getElementById("name").value = obj.dishName;
    document.getElementById("origin").value = obj.origin;
    document.getElementById("rating").value = obj.myRating;
    document.getElementById("jollibee").checked = obj.isServedAtJollibee == 1;
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
    let newId = currId;
    let newName = document.getElementById("name").value;
    let newOrigin = document.getElementById("origin").value;
    let newRating = document.getElementById("rating").value;
    let newIsServedAtJollibee = document.getElementById("jollibee").checked ? 1 : 0;
    let newCategory = document.getElementById("category").value;
    let newImage = document.getElementById("image").childNodes[0].src.replace(window.location.origin + '/Data-Browser/', '');

    let newFood = new FilipinoFood(newId, newName, newOrigin, newRating, newIsServedAtJollibee, newCategory, newImage);
    let jsonStr = JSON.stringify(newFood);
    console.log("Saving object:\n" + jsonStr)

    RequestPost('save_curr.php',jsonStr);
}

function Delete() {
    RequestPost('delete_record.php',currId);
    if (currentObj == maxObj) {
        currentObj = currentObj - 1;
    }
    maxObj--;
}

function Create() {
    let newName = document.getElementById("name").value;
    let newOrigin = document.getElementById("origin").value;
    let newRating = document.getElementById("rating").value;
    let newIsServedAtJollibee = document.getElementById("jollibee").checked ? 1 : 0;
    let newCategory = document.getElementById("category").value;
    let newImage = document.getElementById("image").childNodes[0].src.replace(window.location.origin + '/Data-Browser/', '');

    let newFood = new FilipinoFood(maxObj + 1, newName, newOrigin, newRating, newIsServedAtJollibee, newCategory, newImage);
    let jsonStr = JSON.stringify(newFood);

    RequestPost('save_new.php',jsonStr);
    maxObj++;
}

function ToggleSort() {
    sortByIndex = !sortByIndex;

    if (sortByIndex) {
        document.getElementById("by_index").style = 'color: lime; font-weight: bolder';
        document.getElementById("by_name").style = '';
    }
    else {
        document.getElementById("by_index").style = '';
        document.getElementById("by_name").style = 'color: lime; font-weight: bolder';
    }

    RequestGet();
}

var fileName;

function Upload() {
    let file = document.getElementById('file').files[0];
    fileName = file.name;
    let data = new FormData();
    data.append('file',file);

    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    console.log(file.name)

    httpRequest.onreadystatechange = UploadCallBack;
    httpRequest.open('POST','upload.php');
    httpRequest.send(data);
}

function UploadCallBack() {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // HTTP Ok
                console.log(httpRequest.responseText);
                document.getElementById("image").childNodes[0].src = "uploads/" + fileName;
            }
        }
    }
    catch (exception) {
        alert('POST EXCEPTION: ' + exception);
    }
}
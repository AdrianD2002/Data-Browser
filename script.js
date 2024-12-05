var currentObj = 1; // Current entry displayed on page
var maxObj; // Last entry displayed on page
let obtainedObj; // Obtained object from non-page updating get request
var httpRequest; // Placeholder for HTTP requests
var sortByIndex = true; // Toggle for display order
var editingEnabled = false;

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
                RequestGet();
            }
        }
    }
    catch (exception) {
        alert('RESETDB EXCEPTION: ' + exception);
    }
}

function ToggleEditing() {
    editingEnabled = !editingEnabled;
    document.getElementById('edit_options').hidden = !editingEnabled;
    document.getElementById('file_input').hidden = !editingEnabled;
    document.getElementById('category').disabled = !editingEnabled;
    document.getElementById('category').hidden = !editingEnabled;
    document.getElementById('category_static').hidden = editingEnabled;


    if (editingEnabled) {
        document.getElementById('name').removeAttribute("readonly");
        document.getElementById('origin').removeAttribute("readonly");
        document.getElementById('rating').removeAttribute("readonly");
        document.getElementById('jollibee').removeAttribute("readonly");
    }
    else {
        document.getElementById('name').setAttribute("readonly",true);
        document.getElementById('origin').setAttribute("readonly",true);
        document.getElementById('rating').setAttribute("readonly",true);
        document.getElementById('jollibee').setAttribute("readonly",true);
        document.getElementById('category').setAttribute("disabled",true);
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
    document.getElementById("category_static").innerHTML = obj.mealType;
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
    if (maxObj == 1) {
        alert("Can't delete the last object!");
        return;
    }
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

function GetObj(newCallback) {
    httpRequest = new XMLHttpRequest();
    sortType = sortByIndex ? 1 : 0;

    if(!httpRequest) {
        alert('Could not create XMLHTTP instance!');
        return false;
    }

    console.log("currentobj: " + currentObj);
    httpRequest.onreadystatechange = function () {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
    
                    obtainedObj = JSON.parse(httpRequest.responseText);
                    console.log("Obtained:\n" + JSON.stringify(obtainedObj));
                    console.log("Sort by Index: " + sortByIndex);
    
                    let curr = document.getElementById("sorted_table").innerHTML;
    
                    let str = '<tr>';
                    str += '<td>' + obtainedObj["dishName"] + '</td>';
                    str += '<td>' + obtainedObj["origin"] + '</td>';
                    str += '<td>' + obtainedObj["myRating"] + '</td>';
                    str += '<td>' + (obtainedObj["isServedAtJollibee"] == 1 ? 'Yes' : 'No') + '</td>';
                    str += '<td>' + obtainedObj["mealType"] + '</td>';
                    str += '<td>' + obtainedObj["dishImage"] + '</td>';
                    str += '</tr>';
    
                    document.getElementById("sorted_table").innerHTML = curr + str; 
                    
                    currentObj++;

                    if (newCallback) newCallback();
                }
            }
        }
        catch (exception) {
            alert('GET EXCEPTION: ' + exception);
        }
    };

    httpRequest.open('GET',`fetch_data.php?curr=${currentObj}&sortIndex=${sortType}`);
    httpRequest.send();
}
function ShowTable() {
    document.getElementById("sorted_table").innerHTML = '';
    sortByIndex = false;
    let tempObj = currentObj;
    currentObj = 1;
    document.getElementById("sorted_table").innerHTML = '<tr><th>Name</th><th>Origin</th><th>Rating</th><th>Served at Jollibee?</th><th>Course</th><th>Image URL</th></tr>';

    function GetNext() {
        if (currentObj <= maxObj) {
            GetObj(GetNext);
        } else {
            sortByIndex = true;
            currentObj = tempObj;
        }
    }

    GetNext();
}
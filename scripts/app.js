// GLOBAL VARIABLES
var apiRecords = [];
var categories = [];

function getRecords() {
	var numRows = document.getElementById("numRecords");
	
	if (numRows && numRows.value) {
		apiRecords = [];
		showLoadingScreen();
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "http://filltext.com/?rows="+ numRows.value +"&fname={firstName}&lname={lastName}&category=[%22category1%22,%22category2%22,%22category3%22]&pretty=true", false);
		xhttp.send();
		apiRecords = JSON.parse(xhttp.responseText);
		createList();
	}
	else {
		alert("Please enter number of records you want to retrieve!");
	}
}


function createList() {
	if(apiRecords.length > 0) {
		var list="";
		//get unique categories
		categories = apiRecords.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
		
		// create filtering tools
		list += '<div class="button-group-pills text-center">';
		for(f=0; f < categories.length; f++) {
			list += '<div class="pill-btn">'+
						'<input name="filters" onclick="filter()" id="filterRecords" checked type="checkbox" value="'+ categories[f] +'" class="graphic" />'+
						'<label for="cb2">'+ categories[f] +'</label>'+
					'</div>';
     
		}
		
		// create records list
		for(var i=0; i< apiRecords.length; i++) {
			list += '<div class="record-row ' + apiRecords[i].category +'" >'+
						'<div class="profile-pic-container">'+ getPicFromName(apiRecords[i].fname, apiRecords[i].lname) +'</div>'+
						'<div class="name-container">'+ apiRecords[i].fname+ " " +apiRecords[i].lname +'</div>'+
						'<div class="category-container">' + apiRecords[i].category +'</div>'+
					'</div>';
		}
		
		var listContainer = document.getElementById('listContainer');
		listContainer.innerHTML = list;
		hideLoadingScreen();
		listContainer.classList.remove("hidden");
	}
}

function filter() {
	var filtersApplied = [];
	var filtersCheckboxes = document.querySelectorAll('input[name=filters]:checked');
	for(var c = 0; c< filtersCheckboxes.length; c++) {
		filtersApplied.push(filtersCheckboxes[c].value);
	}
	
	// Hide All rows
	document.querySelectorAll('.record-row').forEach(function(el) {
	   el.style.display = 'none';
	});


	for(i=0; i<filtersApplied.length;i++) {
		document.querySelectorAll('.' + filtersApplied[i]).forEach(function(el) {
		   el.style.display = 'block';
		});

	}
}

function getPicFromName(fname, lname) {
	return fname.charAt(0) + lname.charAt(0);
}


function showLoadingScreen() {
	var loadingScreen = document.getElementById("loadingScreen");
	document.getElementById('listContainer').innerHTML = "";
	loadingScreen.classList.remove("hidden");
}


function hideLoadingScreen() {
	var loadingScreen = document.getElementById("loadingScreen");
	loadingScreen.classList.add("hidden");
}
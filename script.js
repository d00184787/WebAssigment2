//Define Objects and see if it working
console.log("It works!");

bountyInput1 = document.querySelector("#bountyInput1");
console.log("bountyInput1 ", bountyInput1);

bountyInput2 = document.querySelector("#bountyInput2");
console.log("bountyInput2 ", bountyInput2);

bountyInput3 = document.querySelector("#bountyInput3");
console.log("bountyInput3 ", bountyInput3);

bountyInput4 = document.querySelector("#bountyInput4");
console.log("bountyInput4 ", bountyInput4);

bountySubmit = document.querySelector("#bountySubmit");
console.log("bountySubmit ", bountySubmit);

var bountyList = document.querySelector('#bountyList');

var list_of_hits;
//For TESTING puroses, create a inital list of doom to test create. Once done, remove it. You only
//create when you do a input

var bountyClientInfo;

//Create Bounty 
var pinBountyPaper = function(bountyClientInfo) { //MUST BE DONE THROUGH GET

	var bountyDiv = document.createElement("div");
	var bountyPic = document.createElement("div");
	var bountyListContainer = document.createElement("div");

	var bountyUL = document.createElement("ul");
	var bountyName = document.createElement("li");

	bountyDiv.className = "bounty";
	bountyPic.className = "bountyPic";
	bountyListContainer.className = "bountyListContainer"

	bountyName.innerHTML = bountyClientInfo

	bountyList.appendChild(bountyDiv)
	bountyDiv.appendChild(bountyPic)
	bountyDiv.appendChild(bountyListContainer)
	bountyListContainer.appendChild(bountyUL)

	bountyUL.appendChild(bountyName)
};

//Read the Inputs when Submit
bountySubmit.onclick = function(){
	//This past this the current info to Server. Which mean when it writes
	//it will get current one that the user submit.
	bountyClientInfo = bountyInput1.value
	createBounty(bountyClientInfo)
	getBounty()

	//Empty and remove everything from the current bounty. MAKE SURE NOT PART
	//of the INIT PROCESS
	var bountyList = document.querySelector('#bountyList')
	while (bountyList.firstChild){
		bountyList.removeChild(bountyList.firstChild);
	}


	console.log('I got the new bounty list')

	//make a loop function to write ALL the data from 
	//reads from list_of_hits
	setTimeout(function(){
	for (i=0; i < list_of_hits.length; i++){
		console.log(list_of_hits[i])
		pinBountyPaper(list_of_hits[i])
		console.log("building ", i)
	}
	}, 400);

	//This statement below will be part of LOOP. 
	//Going through Each of the Dictonry in the list
	
	console.log("All the Bounty Info: ",bountyClientInfo)

	//once assign current Bounty for the single loop, pass it through the
	//pinBountyPaper

	//pinBountyPaper(bountyClientInfo)
}

//FETCH GET
var getBounty = function(name){
fetch("http://localhost:8080/assassins").then(function (response) {
	response.json().then(function(theData){
	  	list_of_hits = theData;
  	});
});
};

var createBounty = function(clientInfo) {

	//clientInfo = "Test  Test^"

	var Data = 'name=' + encodeURIComponent(clientInfo);

	fetch("http://localhost:8080/assassins",{
		method: "POST",
		body: Data,
		headers: {"content-type":"application/x-www-form-urlencoded"}
	}).then(function (response) {
		//NEVER EVER PUT JSON CODE HERE. IT CREATING and sending URLENCODED it not needed
		console.log("Cool, you were able create something:", Data)
			//Need to save the data to file?
  		});
};
getBounty()
; // This will run on page load
setInterval(function(){
    getBounty()
    var bountyList = document.querySelector('#bountyList')
	while (bountyList.firstChild){
		bountyList.removeChild(bountyList.firstChild);
	}
	for (i=0; i < list_of_hits.length; i++){
		console.log(list_of_hits[i])
		pinBountyPaper(list_of_hits[i])
		console.log("building ", i)
	}
}, 1000);
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

list_of_hits = [{name:"John Doe"},
		{age:"21"},
		{reason:"Vote for Dan Doom"},
		{bounty:"500000"}
		]

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
	var bountyAge = document.createElement("li");
	var bountyReason = document.createElement("li");
	var bountyBounty = document.createElement("li");

	bountyDiv.className = "bounty";
	bountyPic.className = "bountyPic";
	bountyListContainer.className = "bountyListContainer"

	bountyName.innerHTML = bountyClientInfo.name
	bountyAge.innerHTML = bountyClientInfo.age
	bountyReason.innerHTML = bountyClientInfo.reason
	bountyBounty.innerHTML = bountyClientInfo.bounty

	bountyList.appendChild(bountyDiv)
	bountyDiv.appendChild(bountyPic)
	bountyDiv.appendChild(bountyListContainer)
	bountyListContainer.appendChild(bountyUL)

	bountyUL.appendChild(bountyName)
	bountyUL.appendChild(bountyAge)
	bountyUL.appendChild(bountyReason)
	bountyUL.appendChild(bountyBounty)
};

//Read the Inputs when Submit
bountySubmit.onclick = function(){
	bountyClientInfo = {name: bountyInput1.value, age: bountyInput2.value, reason: bountyInput3.value, bounty: bountyInput4.value}
	console.log("All the Bounty Info: ",bountyClientInfo)

	createBounty(bountyClientInfo)
	//pinBountyPaper(bountyClientInfo)
}

//FETCH GET
var getBounty = function(name){
fetch("http://localhost:8080/assassins").then(function (response) {
	response.json().then(function(theData){
		console.log("Data List:", theData)
	  	list_of_hits = theData;
	  	console.log("List of Hits:", list_of_hits)
  	});
});
};

console.log("List of Hits2: ", list_of_hits)

//FETCH CREATE 

var createBounty = function(clientInfo) {
	var Data = clientInfo=encodeURIComponent(clientInfo);

	console.log(Data)

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



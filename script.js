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

//Read the Inputs when Submit
bountySubmit.onclick = function(){
	console.log(bountyInput1.value, bountyInput2.value, bountyInput3.value, bountyInput4.value)
	bountyClientInfo = bountyInput1.value //Save all the inputs in one dictonary
	console.log("All the Bounty Info: ",bountyClientInfo)
}


list_of_hits = [{name:"John Doe"},
		{age:"21"},
		{reason:"Vote for Dan Doom"},
		{bounty:"500000"}
		]

//FETCH GET
fetch("http://localhost:8080/pandas").then(function (response) {
	response.json().then(function(theData){
		console.log("Data List:", theData)
	  	list_of_hits = theData;
	  	console.log("List of Hits:", list_of_hits)
  	});
});
console.log("List of Hits2: ", list_of_hits)

//FETCH CREATE
var createBounty = function(name) {
	var someData = `name=${encodeURIcomponet(name)}`;
	fetch("http://localhost:8080/pandas",{
		method: "POST",
		body: someData,
		headers: {"content-type":"application/x-www-form-urlencoded"}
	}).then(function (response) {
		response.json().then(function(theData){
			console.log("Cool, you were able create something:", someData)
  		});
	});
};






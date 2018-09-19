//Define Objects and see if it working
//https://api.myjson.com/bins/13ocs4
console.log("It works!");

var inputBox = document.querySelector("#input");
console.log("inputBox", inputBox);

var obj = document.querySelector("#object");
console.log("object", object);

var logList = document.querySelector("#logList");
console.log("logList", logList);


var but1 = document.querySelector(".but1");
console.log("but1", but1);

var but2 = document.querySelector(".but2");
console.log("but2", but2);

var but3 = document.querySelector(".but3");
console.log("but3", but3);

var boxQuestion = document.querySelector("#question");
console.log("boxQuestion", boxQuestion);
var boxResponse = document.querySelector("#response");
console.log("boxResponse", boxResponse);

var onSubmit = true;

console.log("onSubmit", onSubmit);

var question_list;

//Sample Data https://api.myjson.com/bins/13ocs4

fetch("https://api.myjson.com/bins/119t1g").then(function (response) {
  response.json().then(function (theData) {
    question_list = theData;
  });
});

console.log(question_list);

//Because I was using fetch and assign the var, it didn't have time to respone
//in time to assign question_list. Which is why I need make sure to only
//ask the fetch using a event and not automaticlly.

//Start the question

//get the length of question list and start loop
//while there is still number in the loop, you must
//get rid of them for by being correct or wrong
//once the there nothing in arrary, reset. && but2.innerHTML="Start Question"

var questionSlot = [];
but2.onclick = function(){
	
	//INTIZLAE
	if (question_list.length == 0 || question_list == []) {
		question_list.forEach(function(question){
			questionSlot.push(question);
		});
	}	

	//GENERATE RANDOM INEX
	var max = (question_list.length - 1)
	var min = (0)
	questionIndex = Math.floor(Math.random() * (max - min) + min);

	//REMOVE FROM INDEX
	//console.log(question_list)
	//question_list.splice(questionIndex, 1)

	//CHANGE QUESTION ON SITE
	if (question_list.length == 0 || question_list == []) {
		boxQuestion.innerHTML = "Good job!";
	}
	else{
		boxQuestion.innerHTML = question_list[questionIndex].question;
	}



	but2.innerHTML = "Skip Question"

	//prevent user inputing another thing on same question
	response.innerHTML = ""
	but1.disabled=false;
	inputBox.disabled=false;
};

but1.onclick = function(){
	if (inputBox.value.toLowerCase() === question_list[questionIndex].answer) {
		response.innerHTML = "Correct! The answer was:  " + question_list[questionIndex].answer

		var createLog = document.createElement("li");
		createLog.innerHTML = "Correct! The answer was: ' " + question_list[questionIndex].answer + " ' "; //replace 0 with Index, make var of index
		createLog.style.color = "green";
		logList.appendChild(createLog);

		but2.innerHTML = "Next Question";
		inputBox.value = "";
		but1.disabled=true;
		inputBox.disabled=true;
	}

	else {
		response.innerHTML = "What is " + question_list[questionIndex].answer + "?"

		var createLog = document.createElement("li");
		createLog.innerHTML = "Wrong! The answer was: ' " +  question_list[questionIndex].answer + " ' "; //replace 0 with Index, make var of index
		createLog.style.color = "red"
		logList.appendChild(createLog);

		but2.innerHTML = "Next Question"
		inputBox.value = ""
		but1.disabled=true;
		inputBox.disabled=true;
	};
};



but3.onclick = function(){
	while (logList.firstChild){
		logList.removeChild(logList.firstChild)
	};
};



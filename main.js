

   // Initialize Firebase
   var config = {
     apiKey: "AIzaSyAXYmH9ebgRoNX_m2kA4X_9Dl_UjwPYBM8",
     authDomain: "traintraingoaway-42a02.firebaseapp.com",
     databaseURL: "https://traintraingoaway-42a02.firebaseio.com",
     projectId: "traintraingoaway-42a02",
     storageBucket: "traintraingoaway-42a02.appspot.com",
     messagingSenderId: "964887635449"
   };
   firebase.initializeApp(config);

 var DMX=document.createElement(Audio)
    $(DMX).setAttribute("Src",assets/thomas)
// 2. Button for adding TRAINS
$("#add-Train-btn").on("click", function(WORK) {
  debugger
    DMX.play();
    
   WORK.preventDefault();
   $('#add-train-btn').submit(false)

    //audio for when trains added
   

  // Grabs user input
  var trainName = $("#Train-name-input").val().trim();
  var trainDest = $("#role-input").val().trim();
  var startTime = moment($("#start-input").val().trim(), "Military Time HH:MM").format("X");
  var tFrequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding Train data
  var newTrain = {
    name: trainName,
    role: trainDest,
    start: startTime,
    rate: tFrequency
  };
debugger;
  // Uploads Train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#Train-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var tFrequency = childSnapshot.val().rate;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(empStart);
  console.log(tFrequency);

  // Prettify the Train start
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

 // Current Time
 var currentTime = moment();
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


  var trainNext = moment().diff(moment(empStart, "X"), "months");
  console.log(trainNext);

     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Calculate the total billed rate
  var trainRuns = trainNext * tFrequency;
  console.log(trainRuns);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(firstTime),
    $("<td>").text(trainNext),
    $("<td>").text(tFrequency),
    $("<td>").text(trainRuns)
  );

  // Append the new row to the table
  $("#Train-table > tbody").append(newRow);
});



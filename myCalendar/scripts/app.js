important = true;
serverURL= "https://fsdiapi.azurewebsites.net/"

function toggleImportant() {
  if (important) {
    $("#iImportant").removeClass("fas").addClass("far");
    important = false;
  } else {
    $("#iImportant").removeClass("far").addClass("fas");
    important = true;
  }
}

function saveTask() {
  let title = $("#txtTitle").val();
  let dueDate = $("#selDate").val();
  let location = $("#txtLocation").val();
  let priority = $("#selPriority").val();
  let color = $("#selColor").val();
  let contactP = $("#txtPhone").val();
  let contactE = $("#txtEmail").val();
  let description = $("#txtDescription").val();
  let task = new Task(
    title,
    important,
    dueDate,
    location,
    priority,
    color,
    contactP,
    contactE,
    description
  );
  console.log(task);
  $.ajax({
    type: 'POST',
    url: serverURL + "api/tasks/",
    data: JSON.stringify(task), //from obj to string
    contentType: "application/json",
    success: function(res){
      console.log("Server says", res);

      let t =JSON.parse(res); //from string to obj
      displayTask(t);
    },
    error: function(error){
      console.error("Error saving task", error)
    },
  });
  clearInputs();
    // displayTask(task);

  
  //get the value
  //

}

function displayTask(task){
  let syntax=`<div class="task">
  <h5>${task.title}<h5/>
  <label>Location: ${task.location}</label><br>
  <label>Phone: ${task.contactP}</label><br>
  <label>Task ID: ${task._id}</label>
  </div>`
  
  $(".pending-tasks").append(syntax);
}

function clearInputs() {
  $("#txtTitle").val("");
  // $("#iImportant").val("");
  $("#selDate").val("");
  $("#txtLocation").val("");
  $("#selPriority").val("");
  $("#selColor").val("#000000");
  $("#txtPhone").val("");
  $("#txtEmail").val("");
  $("#txtDescription").val("");
}

function init() {
  console.log("Calendar System");

  // load data

  //hook events
  $("#iImportant").click(toggleImportant);
  $("#btnSave").click(saveTask);
}

window.onload = init;

/*
1 catch the click event
2 call the function(toggleImportant)
3 console.log("importance")
*/

//Retrieve task list and next ID from localStorage or initialize empty arrays
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// Select elements for the To Do, In Progress, and Done swim lanes
const $toDoElement = $("#todo-cards").addClass("lane");
const $inProgressElement = $("#in-progress-cards").addClass("lane");
const $doneElement = $("#done-cards").addClass("lane");

// Function to generate a unique task ID
function generateTaskId() {
  // Increment the next ID
  nextId++;
  // Store the updated next ID in localstorage
  localStorage.setItem("nextId", nextId);
  // Return the new ID
  return nextId;
}

// Function to create a task card element
function createTaskCard(task) {
  // Create the main card element with the task ID and necessary classes
  const $taskCard = $("<div>")
    .addClass("card dragTask")
    .attr("id", task.id)
    .css("margin", "5%");
  // Create the card header with the task title
  const $taskCardHeader = $("<h4>").addClass("card-header").text(task.title);
  // Create the card header with the task title
  const $taskCardBody = $("<div>").addClass("card-body").text(task.description);
  // Create a card footer with the task due date
  const $taskCardDate = $("<div>").addClass("card-footer").text(task.dueDate);
  // Create the delete button
  const $taskCardDelete = $("<a>")
    .addClass("btn btn-danger delete-task")
    .text("Delete Task")
    .attr("data-id", task.id);

  // Add status class based on due date
  const statusClass = cardDue(task.dueDate);
  $taskCard.addClass(statusClass);

  //Append the date and delete button to the card body
  $taskCardBody.append($taskCardDate, $taskCardDelete);
  // Append the header and body to the main card element
  $taskCard.append($taskCardHeader, $taskCardBody);
  // Return the complete card element
  return $taskCard;
}

// Function to render the task list in the appropiate columns
function renderTaskList() {
  // Clear the existing task elements
  $toDoElement.empty();
  $inProgressElement.empty();
  $doneElement.empty();

  // Retrieve the task list from localstorage
  taskList = JSON.parse(localStorage.getItem("tasks")) || [];

  // Iterate through the task list and append each task to the appropiate columns
  for (let task of taskList) {
    let card = createTaskCard(task);
    if (task.status === "to-do") {
      $toDoElement.append(card);
    } else if (task.status === "in-progress") {
      $inProgressElement.append(card);
    } else {
      $doneElement.append(card);
    }
  }

  // Make task cards draggable
  $(".dragTask").draggable({
    zIndex: 100,
    opacity: 0.5,
    helper: function (event) {
      // Clone the dragged element and set its width to match the original
      let originalcard = $(event.target).hasClass("dragTask")
        ? $(event.target)
        : $(event.target).closest(".dragTask");
      return originalcard.clone().css({
        width: originalcard.outerWidth(),
      });
    },
  });
}

//Function to handle adding a new task
function handleAddTask(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the task details from input fields
  let titleE = $("#titleInput").val();
  let dueDate = $("#dateInput").val();
  let description = $("#taskInput").val();

  // Generate a new task ID
  let newId = generateTaskId();

  //Create a new task object
  let newTask = {
    title: titleE,
    dueDate: dueDate,
    description: description,
    id: newId,
    status: "to-do",
  };

  // Reset the form input fields
  $("#form").trigger("reset");

  // Add the new task to the task list and store it in localstorage
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  // Re-render the task list to include the new task
  renderTaskList();
}

//Function to handle deleting a task
function handleDeleteTask(event) {
  let deleteID = parseInt($(event.target).closest(".card").attr("id"));

  taskList = taskList.filter((task) => task.id !== deleteID);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  $(event.target).closest(".card").remove();
}

// Function to handle dropping a task into a new swim lane
function handleDrop(event, ui) {
  let taskId = ui.draggable[0].id;
  let newStatus = event.target.id;
  let updateTask = JSON.parse(localStorage.getItem("tasks"));

  for (let task of updateTask) {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(updateTask));

  renderTaskList();
}

// Function to handle dropping a task into a new swim lane
function handleDrop(event, ui) {
  // Retrieve the task ID from the draggable element
  let taskId = ui.draggable[0].id;
  // Retrieve the new status from the drop target element's ID
  let newStatus = event.target.id;
  // Parse the task list from localStorage
  let updateTask = JSON.parse(localStorage.getItem("tasks"));

  // Iterate through the task list to find the task with the matching ID
  for (let task of updateTask) {
    if (task.id === taskId) {
      // Update the task's status with the new status
      task.status = newStatus;
    }
  }
  // Store the updated task list back in localStorage
  localStorage.setItem("tasks", JSON.stringify(updateTask));

  // Re-render the task list to reflect the status change
  renderTaskList();
}

// Function to determine the status class based on the due date
function cardDue(dueDate) {
  let today = dayjs();
  let taskDate = dayjs(dueDate);

  let difference = today.diff(taskDate, "d", true);

  if (difference > 1) {
    return "pastdue";
  } else if (difference > 0 && difference <= 1) {
    return "immediate";
  } else {
    return "soon";
  }
}

$(document).ready(function () {
  // Bind the save task button to the handleAddTask functio
  $("#saveTask").on("click", handleAddTask);

  // Delegate the delete task button to the handleDeleteTask function
  $(".container").on("click", ".delete-task", handleDeleteTask);

  // Initialize the date picker for the date input field
  $("#dateInput").datepicker({
    changeMonth: true,
    changeYear: true,
  });

  // Make swim lanes droppable and bind the handleDrop function
  $(".lane").droppable({
    accept: ".dragTask",
    drop: function (event, ui) {
      let movedTaskID = Number($(ui.draggable).attr("id"));
      let newStatus = $(this).attr("id");
      let taskList = JSON.parse(localStorage.getItem("tasks"));

      for (let task of taskList) {
        if (task.id === movedTaskID) {
          task.status = newStatus;
          break;
        }
      }

      localStorage.setItem("tasks", JSON.stringify(taskList));

      if (newStatus === "done") {
        $(ui.draggable).addClass("soon");
      } else {
        $(ui.draggable).removeClass("soon");
      }

      ui.draggable.detach().appendTo($(this));
    },
  });

  // Initial render of the task list
  renderTaskList();
});

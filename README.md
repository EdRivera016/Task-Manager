# Task Manager
![Github license](https://img.shields.io/badge/license-MIT-blue.svg)
[License](https://choosealicense.com/licenses/MIT/)

## Table Of Contents  
- [Task Manager](#task-manager)
  - [Table Of Contents](#table-of-contents)
  - [Description](#description)
  - [User Story](#user-story)
  - [Acceptance criteria](#acceptance-criteria)
  - [Deployed Apllication](#deployed-apllication)
  - [Screenshot](#screenshot)
  - [Features](#features)
  - [Questions](#questions)
  - [Contributions](#contributions)


## Description
This Task Manager project represents a basic Kanban-style task management board implemented in HTML, CSS, and JavaScript. The board allows users to add, delete, and move tasks between different columns ("To Do", "In Progress", and "Done"). Tasks can also be marked with different statuses based on their due dates (soon, immediate, past due).

The HTML structure sets up the main layout and includes the necessary meta tags, external CSS resources (Bootstrap for styling, FontAwesome for icons, Google Fonts, and jQuery UI for datepicker functionality), and links to the custom stylesheet and JavaScript file.

## User Story

AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly

## Acceptance criteria

GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist

## Deployed Apllication
https://edrivera016.github.io/Task-Manager/

## Screenshot
![Showing when tasks are at different due dates](TaskManager(1).png)
![Tasks after marked done](TaskManager(2).png)

## Features 
-Task Management: Create, update, and delete tasks with ease.
-Task Details: Each task includes a title, due date, and description.
-Drag-and-Drop Interface: Move tasks between "To Do", "In Progress", and "Done" columns using drag-and-drop functionality.
-Data Persistence: Tasks and their statuses are stored in localStorage, ensuring they remain intact across browser sessions.
-Visual Indicators: Highlight tasks that are overdue, due today, or upcoming based on due dates.
-Responsive Design: Optimized for both desktop and mobile devices.
-Modal Form for Task Addition: Easily add new tasks through a modal form.
-jQuery UI Date Picker: Conveniently select due dates with a date picker.
-Unique Task ID Generation: Automatically generate unique IDs for new tasks.
-One-Click Task Deletion: Quickly delete tasks with a single click.

## Questions 
Please send any quesons you may have [here](mailto:edwinrivera016@outlook.com?subject=[Github]%20Dev%20Connect) or visit [github/EdRivera016](https://github.comEdRivera016).

## Contributions
- Starter code provided by UCF: git@github.com:coding-boot-camp/musical-happiness.git
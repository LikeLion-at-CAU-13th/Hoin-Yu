import TodoController from "./controller/TodoController.js";

const addBtn = document.getElementById('input-button');
const input = document.querySelector('input');

// Make sure we have both lists in the HTML
document.addEventListener('DOMContentLoaded', () => {
    // Check if complete-list exists, if not, create it
    if (!document.getElementById('complete-list')) {
        const completeListContainer = document.createElement('div');
        completeListContainer.classList.add('complete-list-container');
        
        const completeTitle = document.createElement('h2');
        completeTitle.innerText = '완료된 일정';
        
        const completeList = document.createElement('div');
        completeList.id = 'complete-list';
        
        completeListContainer.appendChild(completeTitle);
        completeListContainer.appendChild(completeList);
        
        // Add after the todo list
        const todoContainer = document.getElementById('to-do-list').parentElement;
        todoContainer.parentElement.insertBefore(completeListContainer, todoContainer.nextSibling);
    }
});

addBtn.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        const todoController = new TodoController(input.value);
        todoController.addTodo();
    }
});

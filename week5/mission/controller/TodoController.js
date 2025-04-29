import Todo from "../DOM/Todo.js";
import CompleteController from "./CompleteController.js";

class TodoController {
    constructor(todoText) {
        this.newTodo = new Todo(todoText);
        this.todoText = todoText;

        this.delBtnNode = this.newTodo.getDelBtn();
        this.comBtnNode = this.newTodo.getCompleteBtn();
        this.innerNode = this.newTodo.getInnerText();

        this.delBtnNode.addEventListener('click', () => {
            this.delTodo();
        });
        
        this.comBtnNode.addEventListener('click', () => {
            this.doneTodo();
        });
    }

    addTodo() {
        const todoList = document.getElementById("to-do-list");
        todoList.appendChild(this.newTodo.addRow());

        const input = document.querySelector('input');
        input.value = '';
    }

    delTodo() {
        const todoList = document.getElementById("to-do-list");
        todoList.removeChild(this.newTodo.getRow());
    }
    
    doneTodo() {
        this.innerNode.classList.toggle('done-text');
        this.comBtnNode.classList.toggle('done-btn');

        if (this.comBtnNode.innerText === '미완') {
            this.comBtnNode.innerText = '완료';
        } else {
            // Move to complete list when marking as complete
            const completeController = new CompleteController(this.innerNode.innerText);
            completeController.addComplete();
            this.delTodo(); // Remove from todo list
            return;
        }
    }
}

export default TodoController;
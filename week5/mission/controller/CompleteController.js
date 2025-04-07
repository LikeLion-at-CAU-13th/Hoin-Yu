import Div from "../DOM/Div.js";
import Button from "../DOM/Button.js";
import Complete from "../DOM/Complete.js";
class CompleteController {
    constructor(todoText) {
        this.newTodo = new Complete(todoText);


        this.todoText = todoText
        this.row = document.createElement('div');
        this.row.classList.add('row');
        
        this.innerText = new Div(todoText, 'text-box').node;
        //this.innerText.classList.add('done-text');
        
        // 삭제 버튼 생성
        this.delBtn = new Button('삭제', 'del-btn').node;
        
        // 삭제 버튼 이벤트 등록
        this.delBtn.addEventListener('click', () => {
            this.delComplete();
        });
        
        this.row.appendChild(this.innerText);
        this.row.appendChild(this.delBtn);
    }

    addComplete() {
        const completeList = document.getElementById("complete-list");
        completeList.appendChild(this.row);
    }

    delComplete() {
        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.row);
    }
}

export default CompleteController;
import Button from "./Button.js";
import Div from "./Div.js";

class Complete {
    constructor(todoText) {
        this.row = new Div('', 'complete-row').node;

        this.innerText = new Div(todoText, 'complete-text-box');
        this.delBtn = new Button('./assets/delete.png', 'del-btn', '삭제');
    }

    addRow() {
        [this.innerText, this.delBtn].forEach((dom) => {
            this.row.appendChild(dom.node);
        });
        return this.row;
    }

    getRow() {
        return this.row;
    }
    
    getDelBtn() {
        return this.delBtn.node;
    }
    
    getInnerText() {
        return this.innerText.node;
    }
}

export default Complete;
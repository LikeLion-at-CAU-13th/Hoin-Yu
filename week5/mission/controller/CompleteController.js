import Div from "../DOM/Div.js";
import Button from "../DOM/Button.js";

class CompleteController {
    constructor(todoText) {
        // 완료된 작업을 위한 row 생성
        this.row = document.createElement('div');
        this.row.classList.add('row');
        
        // 텍스트 박스 생성
        this.innerText = new Div(todoText, 'text-box').node;
        this.innerText.classList.add('done-text'); // 취소선 스타일 유지
        
        // 삭제 버튼 생성
        this.delBtn = new Button('삭제', 'del-btn').node;
        
        // 삭제 버튼 이벤트 등록
        this.delBtn.addEventListener('click', () => {
            this.delComplete();
        });
        
        // row에 요소들 추가
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
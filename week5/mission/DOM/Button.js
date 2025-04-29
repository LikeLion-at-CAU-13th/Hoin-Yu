import DOM from "./DOM.js";

class Button extends DOM {
    constructor(imgSrc, className, alt = '') {
        super('button', '', className);

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = alt;
        img.classList.add('icon');
        
        this.node.appendChild(img);
    }
}
export default Button;

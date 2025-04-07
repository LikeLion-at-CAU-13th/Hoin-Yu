import DOM from "./DOM.js";

class Button extends DOM {
    constructor(innerText, className) {
        super('button', innerText, className);
    }
}
export default Button;
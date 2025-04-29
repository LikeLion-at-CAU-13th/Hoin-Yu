import DOM from "./DOM.js"

class Div extends DOM {
    constructor(innerText, className) {
        super('div', innerText, className);
    }
}

export default Div;
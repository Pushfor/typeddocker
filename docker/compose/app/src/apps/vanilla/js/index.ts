
const test = async () => {
    return await Promise.resolve(1);
};

test().then(() => {
    const sass = require("../scss/component.scss");
    const style = document.createElement("style");
    style.innerHTML = sass;
    document.body.appendChild(style);
});

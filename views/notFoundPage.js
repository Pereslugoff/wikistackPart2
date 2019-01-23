const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
<h1> Status : 404 , Not found </h1>`);
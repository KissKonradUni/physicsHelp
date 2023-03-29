{
    const templates = 
    `<template id="fold-group-template">
        <fg-header>
            <fg-title>\${TITLE}</fg-title>
            <fg-button>\${BUTTON}</fg-button>
        </fg-header>
        <fg-content>\${CONTENT}</fg-content>
    </template>`;
    this.document.body.innerHTML += templates;
}

class HTMLFoldGroup extends HTMLElement {
    constructor() {
        super();

        let title = this.getAttribute("title") ?? "Fold Group";

        let content = this.innerHTML;
        this.innerHTML = "";

        let template = document.getElementById("fold-group-template");
        let templateContent = template.content;
        this.appendChild(templateContent.cloneNode(true));

        this.innerHTML = this.innerHTML
            .replace("${TITLE}", title)
            .replace("${BUTTON}", "&#x2630")
            .replace("${CONTENT}", content);

        let foldHeader = this.querySelector("fg-header");
        let foldButton = this.querySelector("fg-button");
        let foldContent = this.querySelector("fg-content");
        foldContent.setAttribute("state", this.getAttribute("default-state") ?? "closed");
        foldButton.innerHTML = foldContent.getAttribute("state") == "closed" ? "&#x2630" : "&#x2715";

        let clickEvent = (e) => {
            foldContent.setAttribute("state", foldContent.getAttribute("state") == "open" ? "closed" : "open");
            foldButton.innerHTML = foldButton.innerHTML == "\u2715" ? "&#x2630" : "&#x2715";
        };
        foldHeader.addEventListener("click", clickEvent);
    }
}

customElements.define("fold-group", HTMLFoldGroup);
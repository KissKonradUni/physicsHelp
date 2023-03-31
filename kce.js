{
    function registerGlobalFunction(name, func) {
        this[name] = func;
    }

    const templates = 
    `<template id="fold-group-template">
        <fg-header>
            <fg-title>\${TITLE}</fg-title>
            <fg-button>\${BUTTON}</fg-button>
        </fg-header>
        <fg-content>\${CONTENT}</fg-content>
    </template>`;
    this.document.body.innerHTML += templates;

    const lightmode = `
    <style id="lightmode">
        :root {
            --main-color: #ddd;
            --secondary-color: #bbb;
            --tetriary-color: #fff;
            --main-text-color: #000;
            --accent-text-color: #f80;
        }
    </style>
    `;
    this.document.body.innerHTML += lightmode;
    document.getElementById("lightmode").setAttribute("media", "max-width: 1px;");

    registerGlobalFunction("toggleLightmode", (e) => {
        let styleElement = document.getElementById("lightmode");
        styleElement.setAttribute("media", styleElement.getAttribute("media") == "max-width: 1px;" ? "" : "max-width: 1px;");
    });
}

class HTMLSidebar extends HTMLElement {
    buttonCount = 0;
    
    toggleSidebar() {
        this.setAttribute("state", (this.getAttribute("state") ?? "closed") == "closed" ? "open" : "closed");
    }

    registerSidebarButton(title) {
        let element = document.createElement("sb-button");
        element.innerText = title;
        this.appendChild(element);
        return element;
    }

    constructor()  {
        super();

        registerGlobalFunction("toggleSidebar", () => {
            this.toggleSidebar();
        });
        registerGlobalFunction("registerSidebarButton", (title) => {
            return this.registerSidebarButton(title);
        })
    }
}
customElements.define("side-bar", HTMLSidebar);

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

        registerSidebarButton(title).addEventListener("click", (e) => {
            document.querySelector(`fold-group[title="${e.target.innerText}"]`).scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
            toggleSidebar();
        });
    }
}
customElements.define("fold-group", HTMLFoldGroup);
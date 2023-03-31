registerGlobalFunction("search", () => {
    let search = document.getElementById("search-bar").value.toLowerCase();
    let elemArray = Array.from(document.querySelectorAll("div.phys-table"));
    let pArray = Array.from(document.querySelectorAll("fg-content>p"));
    let fArray = Array.from(document.querySelectorAll("fg-content"));
    let bArray = Array.from(document.querySelectorAll("fg-button"));
    pArray.forEach((e) => e.setAttribute("style", ""));
    elemArray.forEach((e) => e.setAttribute("style", ""));

    if (search != "") {
        elemArray.filter((elem) => !elem.innerText.toLowerCase().includes(search)).forEach((elem) => {
            console.log(elem.innerText);
            elem.setAttribute("style", "display: none;");
        });
        pArray.filter((elem) => !elem.innerText.toLowerCase().includes(search)).forEach((elem) => {
            console.log(elem.innerText);
            elem.setAttribute("style", "display: none;");
        });
        fArray.forEach((e) => e.setAttribute("state", "open"));
        bArray.forEach((e) => e.innerText = "\u2715");
    } else {
        fArray.forEach((e) => e.setAttribute("state", "closed"));
        bArray.forEach((e) => e.innerText = "\u2630");
    }
});

registerGlobalFunction("toggleSearch", () => {
    let search = document.querySelector("div.search");
    search.setAttribute("state", (search.getAttribute("state") ?? "closed") == "closed" ? "open" : "closed");
})
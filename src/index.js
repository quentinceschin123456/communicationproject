var listElem = document.getElementsByClassName("menuScenarios");
Array.from(listElem).forEach(element => {
    element.onmouseenter = function (event) {
        document.getElementById("displayScreenTitle").textContent = event.target.textContent;
    }
});
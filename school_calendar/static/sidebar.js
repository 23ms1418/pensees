const body = document.querySelector("body")
sidebar = body.querySelector(".sidebar"),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});


modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        modeText.innerText = "Light Mode"
        localStorage.setItem("theme", "dark");
        console.log(1)
    }else{
        modeText.innerText = "Dark Mode"
        localStorage.setItem("theme", "light")
    }
});


document.addEventListener("DOMContentLoaded", (event) => {
    const theme = localStorage.getItem("theme");

    if (theme == "dark") {
        document.body.classList.add("dark");
    }
})


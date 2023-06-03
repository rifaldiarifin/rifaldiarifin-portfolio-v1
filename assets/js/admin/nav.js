/* eslint-disable */
const nav = document.querySelector(".main-nav");
const navList = nav.querySelectorAll(".navlist");
const pointNav = nav.querySelector(".point-nav");
const heading1 = document.querySelector("h1");

const navigation = function() {
    const setMenu = (list, i) => {
        clearClass(navList, "active");
            pointNav.setAttribute("style", `transform: translateY(${i * 100}px)`);
            list.classList.add("active");
    }
    const setRadio = (list) => {
        const hrefMenu = list.children[0].getAttribute("href");
        const radio = body.querySelector(`[name = "main-navigation"]#radio-${hrefMenu}`);
        radio.click()
        heading1.innerHTML = hrefMenu
        if(hrefMenu == "dashboard"){
            updateChartOverview()
            updateChartLineViews()
        }
    }
    navList.forEach((list, i) => {
        list.addEventListener("click", e => {
            e.preventDefault();
            setMenu(list, i);
            setRadio(list);
        })
    });
}
navigation();
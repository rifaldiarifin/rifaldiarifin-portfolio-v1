const btnModal = document.querySelectorAll(".btn-modal");
const modalScreen = document.querySelector(".modal-screen");

const modal_aboutme = document.getElementById("aboutme");
const modal_moreskills = document.getElementById("moreskills");
const modal_viewallproject = document.getElementById("viewallproject");

const openModal = async (modalID) => {
    await clearTimeout();
    let sidenow = "fadein-now";
    let sideafter = "fadein-after";

    header.classList.remove(sidenow);
    header.classList.remove(sideafter);
    clearClass(section_list, sidenow);
    clearClass(section_list, sideafter);
    modalScreen.classList.remove(sidenow);
    modalScreen.classList.remove(sideafter);

    body.classList.add("scroll-off");
    header.classList.add("hide");
    addClass(section_list, "hide");
    miniNav.classList.add("hide");

    modalScreen.classList.add("active");
    modalID.classList.add("active");
    modalScreen.classList.add(sideafter);
    
    setTimeout(() => {
        header.classList.remove(sidenow);

        clearClass(section_list, sidenow);

        modalScreen.classList.remove(sideafter);
    }, 400);
}

const closeModal = async (modalID) => {
    await clearTimeout();
    let sidenow = "fadeout-now";
    let sideafter = "fadeout-after";
    
    modalScreen.classList.add(sidenow);

    setTimeout(() => {
        modalScreen.classList.remove("active");
        modalID.classList.remove("active");
        modalScreen.classList.remove(sideafter);
        modalScreen.classList.remove(sidenow);

        body.classList.remove("scroll-off");
        header.classList.remove("hide");
        clearClass(section_list, "hide");
        miniNav.classList.remove("hide");

        header.classList.add(sideafter);
        addClass(section_list, sideafter);
        
        setTimeout(() => {
            header.classList.remove(sideafter);

            clearClass(section_list, sideafter);

            modalScreen.classList.remove(sidenow);
        }, 400);
    }, 100);
}

btnModal.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        if(e.target.classList.contains("open")){
            switch (e.target.dataset.modal) {
                case "moreskills":
                    openModal(modal_moreskills);
                    break;
                case "aboutme":
                    openModal(modal_aboutme);
                    break;
                case "viewallproject":
                    openModal(modal_viewallproject);
                    break;
            
                default:
                    break;
            }
        } else if(e.target.classList.contains("close")){
            switch (e.target.dataset.modal) {
                case "moreskills":
                    closeModal(modal_moreskills);
                    break;
                case "aboutme":
                    closeModal(modal_aboutme);
                    break;
                case "viewallproject":
                    closeModal(modal_viewallproject);
                    break;
            
                default:
                    break;
            }
        }
    });
});
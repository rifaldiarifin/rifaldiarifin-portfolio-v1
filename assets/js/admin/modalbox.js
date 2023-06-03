/* eslint-disable */
const btnModal = document.querySelectorAll(".btn-modal");
const modalScreen = document.querySelector(".modal-screen");

const openModal = async (modalID) => {
    await clearTimeout();
    let alertfadein = "alertfadein";
    let alertfadeout = "alertfadeout";

    modalScreen.classList.remove(alertfadein);
    modalScreen.classList.remove(alertfadeout);

    modalScreen.classList.add("active");
    modalID.classList.add("active");
    modalScreen.classList.add(alertfadein);
    
    setTimeout(() => {
        modalScreen.classList.remove(alertfadein);
    }, 400);
}

const closeModal = async (modalID) => {
    await clearTimeout();
    let alertfadein = "alertfadein";
    let alertfadeout = "alertfadeout";
    
    modalScreen.classList.add(alertfadeout);

    setTimeout(() => {
        modalScreen.classList.remove("active");
        modalID.classList.remove("active");
        modalScreen.classList.remove(alertfadeout);
        modalScreen.classList.remove(alertfadein);
        setTimeout(() => {
            modalScreen.classList.remove(alertfadein);
        }, 400);
    }, 100);
}

btnModal.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        if(e.target.classList.contains("open")){
            try {
                const modal = document.getElementById(e.target.dataset.modalkey);
                openModal(modal);
            } catch (error) {
                throw new error;
            }
        } else if(e.target.classList.contains("close")){
            try {
                const modal = document.getElementById(e.target.dataset.modalkey);
                closeModal(modal);
            } catch (error) {
                throw new error;
            }
        }
    });
});
const form = document.getElementById("contact-form"),
    inputName = document.getElementById("name"),
    inputEmail = document.getElementById("email"),
    inputMessage = document.getElementById("message");

const resetInputField = (form) => {
    form.reset()
    inputName.parentElement.classList.remove("alert");
    inputName.parentElement.classList.remove("valid");

    inputEmail.parentElement.classList.remove("alert");
    inputEmail.parentElement.classList.remove("valid");

    inputMessage.parentElement.classList.remove("alert");
    inputMessage.parentElement.classList.remove("valid");
}

async function handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            interAlertMessage({
                title: "Contact Us",
                description: "Thanks for your submission!",
                alertType: "success gradient"
            });
            resetInputField(form)
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    interAlertMessage({
                        title: "Contact Us",
                        description: data["errors"].map(error => error["message"]).join(", "),
                        alertType: "danger"
                    });
                } else {
                    interAlertMessage({
                        title: "Contact Us",
                        description: "Oops! There was a problem submitting your form",
                        alertType: "danger"
                    });
                }
            })
        }
    }).catch(error => {
        interAlertMessage({
            title: "Contact Us",
            description: "Oops! There was a problem submitting your form",
            alertType: "danger"
        });
    });
}
form.addEventListener("submit", handleSubmit)
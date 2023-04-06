"use strict"

const body = document.querySelector("body");

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// CALENDAR

const months = ["January", "February", "Maret", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    numMonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    shortWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const renderCalendarPopup = (inputbox) => {
    let calendarUI = `
            <div class="calendar-header">
                <p class="current-date" tabindex="0">January 2099</p>
                <div class="icons">
                    <span class="icons8-regular back" aria-label="prev" tabindex="0"></span>
                    <span class="icons8-regular forward" aria-label="next" tabindex="0"></span>
                </div>
            </div>
            <div class="calendar-box" data-option="days">
                <ul class="weeks"></ul>
                <ul class="days"></ul>
                <ul class="months"></ul>
                <ul class="years"></ul>
            </div>
    `;
    const calendarParent = document.createElement("div");
    calendarParent.classList.add("calendar-popup");
    calendarParent.innerHTML = calendarUI;
    inputbox.appendChild(calendarParent);
}


const interCalendar = async function (inputbox, option, minyear = 1400, maxyear = 2099) {
    await renderCalendarPopup(inputbox);
    // const calendarPopup = inputbox.querySelectorAll(".calendar-popup");
    const textfield = inputbox.querySelector("input");

    let dateSelected = [];
    // for (let x = 0; x < calendarPopup.length; x++) {
    const calendar = inputbox,
        currentDate = inputbox.querySelector(".current-date"),
        calendarBox = inputbox.querySelector(".calendar-box"),
        prevNextBtn = inputbox.querySelectorAll(".icons span");

    let daysTag = calendar.querySelector(".days"),
        monthsTag = calendar.querySelector(".months"),
        weeksTag = calendar.querySelector(".weeks"),
        yearsTag = calendar.querySelector(".years"),
        date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();


    const renderCalendarWeeks = () => {
        let liTag = "";
        for (let e = 0; e < 7; e++) {
            liTag += `<li>${shortWeeks[e]}</li>`;
        }
        weeksTag.innerHTML = liTag;
    }

    const renderCalendarDays = () => {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
            lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            const lidate = lastDateofLastMonth - i + 1;
            liTag += `<li class="inactive" tabindex="0" data-li="${lidate}">${lidate}</li>`;

        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            let markLi = i;
            if (markLi === new Date().getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
                markLi = "class='active'";
                if (i == parseInt(dateSelected["day"]) && currMonth == parseInt(dateSelected["month"]) - 1 && currYear == parseInt(dateSelected["year"])) {
                    markLi = "class='active select'";
                }
            } else if (markLi == parseInt(dateSelected["day"]) && currMonth == parseInt(dateSelected["month"]) - 1 && currYear == dateSelected["year"]) {
                markLi = "class='select'";
            } else {
                markLi = "";
            }
            liTag += `<li ${markLi} tabindex="0" data-li="${i}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            const lidate = i - lastDayofMonth + 1;
            liTag += `<li class="inactive" tabindex="0" data-li="${lidate}">${lidate}</li>`;
        }

        currentDate.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;
    }

    const renderCalendarMonths = () => {
        let monthToday = new Date().getMonth();
        let classli = "";
        let liTag = '';
        for (let x = 0; x < 12; x++) {
            if ((x == monthToday) && (currYear == new Date().getFullYear())) {
                classli = "class='active'";
            } else if (x == parseInt(dateSelected["month"]) - 1 && currYear == dateSelected["year"]) {
                classli = "class='select'";
            } else {
                classli = "";
            }
            if (x == parseInt(dateSelected["month"]) - 1 && currYear == dateSelected["year"] && x == new Date().getMonth()) {
                classli = "class='active select'";
            }
            liTag += `<li ${classli} tabindex="0" data-li="${x}">${shortMonths[x]}</li>`;
        }
        currentDate.innerText = `${currYear}`;
        monthsTag.innerHTML = liTag;

    }

    const renderCalendarYears = () => {
        let firstYears = ([...currYear.toString()][0] + [...currYear.toString()][1] + [...currYear.toString()][2] + "0") - 1,
            lastYears = [...(currYear + 10).toString()];
        lastYears = lastYears[0] + lastYears[1] + lastYears[2] + "0";
        let liTag = "";
        let statusLI = "";
        let dateli = "";
        for (let y = firstYears; y <= lastYears; y++) {
            if (y === firstYears || y == lastYears) {
                statusLI = "class='inactive'";
                if (y == parseInt(dateSelected["year"])) {
                    statusLI = "class='inactive select'";
                }
            } else if (y === new Date().getFullYear()) {
                statusLI = "class='active'";
                if (y == parseInt(dateSelected["year"])) {
                    statusLI = "class='active select'";
                }
            } else if (y == parseInt(dateSelected["year"])) {
                statusLI = "class='select'";
            } else {
                statusLI = "";
            }
            if (y !== minyear - 1 && y !== maxyear + 1) {
                dateli = y;
            } else {
                dateli = "";
            }
            liTag += `<li ${statusLI} tabindex="0" data-li="${dateli}">${dateli}</li>`;
        }
        currentDate.innerText = `${firstYears + 1} - ${lastYears - 1}`;
        yearsTag.innerHTML = liTag;
    }

    const clearCalendar = () => {
        daysTag.innerHTML = "";
        monthsTag.innerHTML = "";
        yearsTag.innerHTML = "";
    }

    const renderCalendar = async () => {
        switch (calendarBox.dataset.option.toLowerCase()) {
            case "days":
                renderCalendarWeeks();
                await clearCalendar();
                renderCalendarDays();
                break;
            case "months":
                await clearCalendar();
                renderCalendarMonths();
                break;
            case "years":
                await clearCalendar();
                renderCalendarYears();
                break;

            default:
                break;
        }
    }

    renderCalendar();

    const vertAnimation = async (slide, ul) => {
        ul.classList.remove("prev-top");
        ul.classList.remove("next-bottom");
        await clearTimeout();

        if (slide == "prev") {
            ul.classList.add("prev-top");
            setTimeout(() => {
                ul.classList.remove("prev-top");
            }, 370);
        } else {
            ul.classList.add("next-bottom");
            setTimeout(() => {
                ul.classList.remove("next-bottom");
            }, 370);
        }
    }
    const horiAnimation = async (slide, ul) => {
        ul.classList.remove("prev-left");
        ul.classList.remove("next-right");
        await clearTimeout();
        if (slide == "prev") {
            ul.classList.add("prev-left");
            setTimeout(() => {
                ul.classList.remove("prev-left");
            },370);
        } else {
            ul.classList.add("next-right");
            setTimeout(() => {
                ul.classList.remove("next-right");
            }, 370);
        }
    }
    const fadeAnimation = async (atr, side, now, after) => {
        await clearTimeout();
        let sidenow = '';
        let sideafter = '';
        if (side.toLowerCase() == "in") {
            sidenow = "fadein-now";
            sideafter = "fadein-after";
        } else if (side.toLowerCase() == "out") {
            sidenow = "fadeout-now";
            sideafter = "fadeout-after";
        }
        now.classList.remove(sidenow);
        now.classList.remove(sideafter);
        after.classList.remove(sidenow);
        after.classList.remove(sideafter);

        now.classList.add(sidenow);
        setTimeout(() => {
            calendarBox.setAttribute("data-option", atr);
            renderCalendar();
            after.classList.add(sideafter);
            setTimeout(() => {
                now.classList.remove(sidenow);
                after.classList.remove(sideafter);
            }, 400);
        }, 400);
    }

    currentDate.addEventListener("click", async () => {
        switch (calendarBox.dataset.option.toLowerCase()) {
            case "days":
                fadeAnimation("months", "out", daysTag, monthsTag);
                break;
            case "months":
                fadeAnimation("years", "out", monthsTag, yearsTag);
                break;
            default:
                break;
        }
    });
    const setMarkCalendar = (calendarBoxUL, newLI) => {
        const ul = calendarBoxUL.querySelectorAll("li");
        for (let x = 0; x < ul.length; x++) {
            const element = ul[x];
            element.classList.remove("select");
        }
        newLI.classList.add("select");
    }

    const calendarSelect = (calendarBoxUL, action) => {
        calendarBox.addEventListener("click", (e) => {
            let elmnt = e.target;
            if (e.target.parentElement === calendarBoxUL && e.target.tagName === "LI") {
                action(elmnt, e);
            }
        });
    }
    calendarSelect(daysTag, (e) => {
        let monthselect = currMonth;
        if (e.textContent !== "" && e.classList.contains("inactive") && e.textContent < 15) {
            monthselect = currMonth + 1;
            if (monthselect < 0 || monthselect > 11) {
                date = new Date(currYear, currMonth);
                monthselect = date.getMonth();
            } else {
                date = new Date();
            }
        } else if (e.classList.contains("inactive") && e.textContent > 15) {
            monthselect = currMonth - 1;
        }
        setMarkCalendar(daysTag, e);
        dateSelected['day'] = e.textContent.length === 1 ? '0' + e.textContent : e.textContent;
        dateSelected['month'] = numMonths[monthselect];
        dateSelected['year'] = currYear.toString();
        dateSelected['fulldate'] = `${dateSelected['day']} - ${dateSelected['month']} - ${dateSelected['year']}`;
        // result(dateSelected);
        textfield.value = dateSelected[option];
    });
    calendarSelect(monthsTag, (e) => {
        if (e.textContent !== "") {
            currMonth = parseInt(e.dataset.li);
            fadeAnimation("days", "in", monthsTag, daysTag);
        }
    });
    calendarSelect(yearsTag, (e) => {
        if (e.textContent !== "") {
            currYear = parseInt(e.dataset.li);
            fadeAnimation("months", "in", yearsTag, monthsTag);
        }
    });
    const calendarOptionSwitch = (days, months, years) => {
        switch (calendarBox.dataset.option.toLowerCase()) {
            case "days":
                days();
                break;
            case "months":
                months();

                break;
            case "years":
                years();
                break;

            default:
                break;
        }
    }

    // prevnext days
    const nextDays = async (slideAnimation) => {
        if (currYear <= maxyear) {
            currMonth = currMonth + 1;
            if (currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth);
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else {
                date = new Date();
            }
            await renderCalendarDays();
            vertAnimation(slideAnimation, daysTag);
        }
    }
    const prevDays = async (slideAnimation) => {
        if (currYear > minyear) {
            currMonth = currMonth - 1;
            if (currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth);
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else {
                date = new Date();
            }
            await renderCalendarDays();
            vertAnimation(slideAnimation, daysTag);
        }
    }
    // prevnext months
    const nextMonths = async (slideAnimation) => {
        if (currYear < 2099) {
            currYear = currYear + 1;
            renderCalendarMonths();
            horiAnimation(slideAnimation, monthsTag);
        }
    }
    const prevMonths = async (slideAnimation) => {
        if (currYear > minyear) {
            currYear = currYear - 1;
            renderCalendarMonths();
            horiAnimation(slideAnimation, monthsTag);
        }
    }
    // 
    // prevnext years
    const nextYears = async (slideAnimation) => {
        if (currYear < maxyear - 10) {
            currYear = currYear + 10;
            renderCalendarYears();
            horiAnimation(slideAnimation, yearsTag);
            return;
        }
    }
    const prevYears = async (slideAnimation) => {
        if (currYear > minyear + 10) {
            currYear = currYear - 10;
            renderCalendarYears();
            horiAnimation(slideAnimation, yearsTag);
        }
    }
    // 

    prevNextBtn.forEach(btn => {
        btn.addEventListener("click", async () => {
            calendarOptionSwitch(async () => {
                btn.ariaLabel === "prev" ? prevDays(btn.ariaLabel) : nextDays(btn.ariaLabel);
            }, () => {
                btn.ariaLabel === "prev" ? prevMonths(btn.ariaLabel) : nextMonths(btn.ariaLabel);
            }, () => {
                btn.ariaLabel === "prev" ? prevYears(btn.ariaLabel) : nextYears(btn.ariaLabel);
            });
        });
    });
    calendarBox.addEventListener("mousewheel", async (e) => {
        calendarOptionSwitch(() => {
            if (e.deltaY > 1) {
                nextDays("next");
            } else if (e.deltaY < 1) {
                prevDays("prev");
            }
        }, async () => {
            if (e.deltaY > 1) {
                nextMonths("next");
            } else if (e.deltaY < 1) {
                prevMonths("prev");
            }
        }, () => {
            if (e.deltaY > 1) {
                nextYears("next");
            } else if (e.deltaY < 1) {
                prevYears("prev");
            }
        });
    });
    // }

}

// BOX TEXTAREA


let inputField;
window.addEventListener("focusin", (e) => {
    if (e.target.parentElement.classList.contains("textarea-field")) {
        inputField = e.target;
        e.target.parentElement.classList.add("focus");
        e.target.parentElement.classList.add("valid");
    }

    if (e.target.parentElement.classList.contains("input-field")) {
        inputField = e.target;
        e.target.parentElement.classList.add("focus");
        e.target.parentElement.classList.add("valid");
    }
});
window.addEventListener("focusout", (e) => {
    if (e.target.parentElement.classList.contains("textarea-field")) {
        e.target.parentElement.classList.remove("focus");

        if (inputField.value.length < 1) {
            e.target.parentElement.classList.remove("alert");
            e.target.parentElement.classList.remove("valid");
        }
    }

    if (e.target.parentElement.classList.contains("input-field")) {
        const msgInput = e.target.parentElement.querySelector("span[data-msginput]");
        const valueinput = inputField.value;
        if(e.target.parentElement.dataset.validatormode == "offline"){
            switch (e.target.parentElement.dataset.type.toLowerCase()) {
                case "password":
                    e.target.parentElement.classList.remove("focus");
    
                    if (inputField.value.length < 1) {
                        e.target.parentElement.classList.remove("alert");
                        e.target.parentElement.classList.remove("valid");
                    }

                    if(e.target.parentElement.classList.contains("p-match")){
                        if(valueinput.length > 0 && valueinput.length < 8){
                            inputField.classList.add("alert");
                            setMsgInput(msgInput, "Password to short!");
                        } else if(valueinput.length !== 0 && e.target.parentElement.nextElementSibling.children[1].value.length == 0){
                            inputField.classList.add("alert");
                            setMsgInput(e.target.parentElement.nextElementSibling.children[2], "Repeat here!");
                        } else if(valueinput == e.target.parentElement.nextElementSibling.children[1].value){
                            e.target.parentElement.classList.remove("alert");
                            e.target.parentElement.nextElementSibling.classList.remove("alert");
                        } else if(valueinput.length !== 0) {
                            inputField.classList.add("alert");
                            e.target.parentElement.nextElementSibling.classList.add("alert");
                            setMsgInput(msgInput, "Password Not Match!");
                            setMsgInput(e.target.parentElement.nextElementSibling.children[2], "Password Not Match!");
                        }
                    }
                    if(e.target.parentElement.classList.contains("s-match")){
                        if(valueinput.length > 0 && valueinput.length < 8){
                            inputField.classList.add("alert");
                            setMsgInput(msgInput, "Password to short!");
                        } else if(valueinput.length !== 0 && e.target.parentElement.previousElementSibling.children[1].value.length == 0){
                            inputField.classList.add("alert");
                            setMsgInput(e.target.parentElement.previousElementSibling.children[2], "Also fill in here!");
                        } else if(valueinput === e.target.parentElement.previousElementSibling.children[1].value){
                            e.target.parentElement.classList.remove("alert");
                            e.target.parentElement.previousElementSibling.classList.remove("alert");
                        } else if(valueinput.length !== 0){
                            inputField.classList.add("alert");
                            e.target.parentElement.previousElementSibling.classList.add("alert");
                            setMsgInput(msgInput, "Password Not Match!");
                            setMsgInput(e.target.parentElement.previousElementSibling.children[2], "Password Not Match!");
                        }
                    }
                    break;
                case "combobox":
                    window.addEventListener("click", (s) => {
                        if (inputField.value.length < 1 && !inputField.parentElement.contains(s.target)) {
                            e.target.parentElement.classList.remove("valid");
                            e.target.parentElement.classList.remove("alert");
                        }
                    })
                    break;
                case "email":
                    let checkDomain = valueinput.split(".");
                    let resultDomain = checkDomain[checkDomain.length - 1];
                    let indexInput;
    
                    [...valueinput].forEach((arrInpt, indxInput) => {
                        if (arrInpt == "@") {
                            indexInput = indxInput;
                        }
                    });
    
                    if ((!valueinput.includes("@")) && (!valueinput.length < 1)) {
                        setMsgInput(msgInput, 'Invalid email "@" !');
                    } else if ((![...valueinput][indexInput - 1]) && (!valueinput.length < 1)) {
                        setMsgInput(msgInput, 'Invalid email "...@" !');
                    } else if ((![...valueinput][indexInput + 1]) && (!valueinput.length < 1)) {
                        setMsgInput(msgInput, 'Invalid email "@..." !');
                    } else if ((!valueinput.length < 1) && (!valueinput.includes(".")) || (!valueinput.length < 1) && (resultDomain.length == 0)) {
                        setMsgInput(msgInput, 'Invalid email "." !');
    
                    } else if (valueinput.includes(".")) {
    
                        if (resultDomain.length == 1) {
                            setMsgInput(msgInput, `Invalid domain length 1 ".${resultDomain}" !`);
                        } else {
                            e.target.parentElement.classList.remove("alert");
                        }
                    }
    
                    e.target.parentElement.classList.remove("focus");
    
                    if (inputField.value.length < 1) {
                        e.target.parentElement.classList.remove("alert");
                        e.target.parentElement.classList.remove("valid");
                    }
                    break;
                case "date":
                        window.addEventListener("click", (s) => {
                            if (inputField.value.length < 1 && !inputField.parentElement.contains(s.target)) {
                                e.target.parentElement.classList.remove("valid");
                                e.target.parentElement.classList.remove("alert");
                            }
                        })
                        
                    break;
                case "nik-indonesia":
                    const num_nik = [...valueinput],
                            provinsi = num_nik[0] + num_nik[1],
                            kabupaten = num_nik[2] + num_nik[3],
                            kecamatan = num_nik[4] + num_nik[5],
                            tanggalLahir = num_nik[6] + num_nik[7] + num_nik[8] + num_nik[9] + num_nik[10] + num_nik[11];

                            // fetch(`https://rifaldiarifin.github.io/api-wilayah-indonesia/api/provinces.json`)
                            // .then(response => response.json())
                            // .then(provinces => {
                            //     console.log(getKeyByValue(provinces, provinsi));
                            // });


                    e.target.parentElement.classList.remove("focus");
                    if (inputField.value.length < 1) {
                        e.target.parentElement.classList.remove("alert");
                        e.target.parentElement.classList.remove("valid");
                    }
                default:
                    e.target.parentElement.classList.remove("focus");
                    
                    if (inputField.value.length == 0 || !inputField.parentElement.contains(e.target)) {
                        // console.log("asdasd");
                        e.target.parentElement.classList.remove("alert");
                        e.target.parentElement.classList.remove("valid");
                    } else {
                        e.target.parentElement.classList.add("valid");
                    }
                    break;
            }
        } else if(e.target.parentElement.dataset.validatormode == "online"){
            switch (e.target.parentElement.dataset.type.toLowerCase()) {
                case "phone":
                    const checkPhone = validator.isMobilePhone(valueinput, 'id-ID');
                    if(!checkPhone){
                        setMsgInput(msgInput, `it's not a phone number!`);
                        e.target.parentElement.classList.add("alert");
                    } else {
                        e.target.parentElement.classList.remove("alert");
                    }

                    e.target.parentElement.classList.remove("focus");
    
                    if (inputField.value.length < 1) {
                        e.target.parentElement.classList.remove("alert");
                        e.target.parentElement.classList.remove("valid");
                    }
                    break;
                case "email":
                    const emailCheck = validator.isEmail(valueinput);
                    if(!emailCheck){
                        setMsgInput(msgInput, `it's not a phone number!`);
                    } else {
                        e.target.parentElement.classList.remove("alert");
                    }

                    e.target.parentElement.classList.remove("focus");
    
                    if (inputField.value.length < 1) {
                        e.target.parentElement.classList.remove("alert");
                        e.target.parentElement.classList.remove("valid");
                    }
                    break;
            
                default:
                    break;
            }
        }
    }
});

// image upload
const previewImage = () => {
    const btnupload = document.querySelector(".image-upload");
    const img = btnupload.querySelector("img.circle-view");
    const input = btnupload.querySelector("input[type='file']");
    let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

    input.addEventListener("change", function(){
        const file = this.files[0];
        if(file){
            console.log(file);
            const reader = new FileReader();
            reader.onload = function(){
                const result = reader.result;
                img.src = result;
            }
            reader.readAsDataURL(file);
        }
        if(this.value){
            let valueStore = this.value.match(regExp);
        }
    });
}

// BOX INPUT

const inputFieldGroup = document.querySelectorAll(".input-field");

const setMsgInput = (elmnt, message) => {
    const parentMsg = elmnt.parentElement;
    parentMsg.classList.add("alert");
    parentMsg.classList.add("valid");
    elmnt.dataset.msginput = ` / ${message}`;
}
const setMsgInput2 = (elmnt, span, message) => {
    elmnt.classList.add("alert");
    elmnt.classList.add("valid");
    span.dataset.msginput = ` / ${message}`;
}

const showpass = () => {
    const span = document.createElement("span");
    span.classList.add("show-pass");
    parentField.appendChild(span);
}

const interInputField = (rangeQuery = false) => {
    const container = document.getElementById(rangeQuery);
    const getInputField = (inputFields = inputFieldGroup) => {
        let x;

        for (x = 0; x < inputFields.length; x++) {
            const parentField = inputFields[x],
                inputField = parentField.querySelector("input");

            switch (parentField.dataset.type.toLowerCase()) {
                case "password":
                    const spanEye = parentField.querySelector("span.show-pass");
                    inputField.setAttribute("type", "password");

                    if (inputField.value.length < 1) {
                        spanEye.classList.remove("show");
                        spanEye.classList.remove("active");
                        inputField.setAttribute("type", "password");
                    }

                    inputField.addEventListener("input", () => {
                        if (inputField.value.length > 0) {
                            parentField.classList.remove("alert");
                            spanEye.classList.add("show");
                        } else if (inputField.value.length < 1) {
                            spanEye.classList.remove("show");
                        }
                    });

                    spanEye.addEventListener("click", () => {
                        if (spanEye.classList.contains("active")) {
                            spanEye.classList.remove("active");
                            inputField.setAttribute("type", "password");
                        } else {
                            spanEye.classList.add("active");
                            inputField.setAttribute("type", "text");
                        }
                    });
                    break;
                case "number":
                    inputField.setAttribute("type", "text");
                    inputField.setAttribute("onkeypress", "return numberKey(event)");
                    break;
                case "phone":
                    inputField.setAttribute("type", "text");
                    inputField.setAttribute("onkeypress", "return numberKey(event)");
                    break;
                case "nik-indonesia":
                    inputField.setAttribute("type", "text");
                    inputField.setAttribute("onkeypress", "return numberKey(event)");
                    break;
                case "email":
                    inputField.setAttribute("type", "email");
                    break;
                case "date":
                    inputField.setAttribute("type", "text");
                    inputField.setAttribute("readonly", "true");
                    interCalendar(parentField, "fulldate");
                    const calendarInput = parentField.querySelector(".calendar-popup");
                    inputField.addEventListener("focusin", (e) => {
                        calendarInput.classList.add("on");
                        calendarInput.classList.add("slide-bottom-on");
                        setTimeout(() => {
                            calendarInput.classList.remove("slide-bottom-on");
                        }, 400);
                    });
                    window.addEventListener("click", (e) => {
                        if ((e.target.parentElement.classList.contains("days")) || (!parentField.contains(e.target))) {
                            parentField.classList.remove("focus");
                            calendarInput.classList.add("slide-bottom-off");
                            setTimeout(() => {
                                calendarInput.classList.remove("on");
                                calendarInput.classList.remove("slide-bottom-off");
                            }, 400);
                        }
                    });
                    break;
                case "combobox":
                    inputField.setAttribute("type", "text");
                    inputField.setAttribute("readonly", "true");
                    const combobox = parentField.querySelector(".combobox");
                    inputField.addEventListener("focusin", (e) => {
                        combobox.classList.add("on");
                        combobox.classList.add("slide-bottom-on");
                        setTimeout(() => {
                            combobox.classList.remove("slide-bottom-on");
                        }, 400);
                    });
                    window.addEventListener("click", (e) => {
                        if ((e.target.classList.contains("disappear")) || (!parentField.contains(e.target))) {
                            parentField.classList.remove("focus");
                            combobox.classList.add("slide-bottom-off");
                            if(e.target.classList.contains("li")){
                                inputField.value = e.target.dataset.valuelist;
                            }
                            setTimeout(() => {
                                combobox.classList.remove("on");
                                combobox.classList.remove("slide-bottom-off");
                            }, 400);
                        }
                    });
                    break;
                default:
                    const textField = parentField.querySelector("input");
                    textField.setAttribute("type", "text");
            }
        }
    }
    if (!rangeQuery == false) {
        const inputField = container.querySelectorAll(".input-field");
        getInputField(inputField);
        return;
    }
    getInputField();
    return;
}
interInputField();

const numberKey = e => {
    let x = e.which || e.keycode;
    if (x >= 48 && x <= 57) {
        return true;
    }
    else {
        return false;
    }
}



// RIPPLE EFFECTS

const btnEvent = (event, elmnt, action) => {
    // clearTimeout();
    elmnt.addEventListener(event, (e) => action());
}

const renderRipple = (btn, e, rippleRemove = 1000) => {
    let x;
    let y;
    if (e.target == btn) {
        x = e.layerX;
        y = e.layerY;
    }

    let ripple = document.createElement("span")
    ripple.setAttribute("class", "ripple");
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    btn.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, rippleRemove);
}
let targetMouse;
window.addEventListener("mousedown", (e) => {
    // BUTTON -------------
    if ((e.target.classList.contains("btn-filled") || (e.target.classList.contains("btn-regular")) || (e.target.classList.contains("dropdown-input")) || (e.target.classList.contains("header-profile")))) {
        targetMouse = e.target;
        e.target.classList.remove("press");
        setTimeout(() => {
            e.target.classList.add("press");
        },10);
    } else if (targetMouse) {
        if ((e.target.classList.contains("btn-filled") == false) || (e.target.classList.contains("btn-regular") == false) || (e.target.classList.contains("dropdown-input") == false) || (e.target.classList.contains("header-profile") == false)) {
            setTimeout(() => {
                targetMouse.classList.remove("press");
            }, 600);
        }
    }


    // 
});

window.addEventListener("click", e => {
    // BUTTON -----------
    if ((e.target.classList.contains("btn-filled") || (e.target.classList.contains("btn-regular")) || (e.target.classList.contains("dropdown-input")) || (e.target.classList.contains("header-profile")))) {
        renderRipple(e.target, e);
    }

    // RIPPLE
    if ((e.target.parentElement.classList.contains("list-box")) || (e.target.classList.contains("rpl-click"))) {
        renderRipple(e.target, e);
    };

    // COLLAPSE BOX
    if (e.target.classList.contains("coll-btn")) {
        e.target.parentElement.parentElement.classList.contains("active") ? e.target.parentElement.parentElement.classList.remove("active") : e.target.parentElement.parentElement.classList.add("active");
    }
});

// DROPDOWN


const dropdown_key = document.querySelectorAll("[data-dpkey]");


const getDropdownGroup = (rangeQuery = false) => {
    const container = document.getElementById(rangeQuery);
    let dpKey = [],
        dpGroup = [];

    const getDropdown = (rangeContainer, dropdown) => {
        for (let k = 0; k < dropdown.length; k++) {
            const key = dropdown[k]
                .dataset
                .dpkey
                .split(",")[0];
            if (dpKey.includes(key) == false) {
                dpKey.push(key);
            }
        }

        for (let g = 0; g < dpKey.length; g++) {
            dpGroup.push([
                rangeContainer.querySelector(`[data-dpkey="${dpKey[g]},btn-primary"]`),
                rangeContainer.querySelector(`[data-dpkey="${dpKey[g]},dropdown"]`)
            ]);
        }
    }
    if (!rangeQuery == false) {
        const dropdown_more = container.querySelectorAll("[data-dpkey]");
        getDropdown(container, dropdown_more);
        return dpGroup;
    }
    getDropdown(body, dropdown_key);
    return dpGroup;
}

const dropdownOn = (primary, dropdown, css, time = 400) => {
    primary.classList.add("active");
    dropdown.classList.add("active");
    dropdown.classList.add(css);
    setTimeout(() => {
        dropdown.classList.remove(css);
    }, time);
}
const dropdownOff = (primary, dropdown, css, time = 400) => {
    dropdown.classList.add(css);
    primary.classList.remove("active");
    setTimeout(() => {
        dropdown.classList.remove("active");
        dropdown.classList.remove(css);
    }, time);
}

const interDropdown = async (rangeQuery = false) => {
    for (let x = 0; x < getDropdownGroup(rangeQuery).length; x++) {
        const primary = getDropdownGroup(rangeQuery)[x][0],
            dropdown = getDropdownGroup(rangeQuery)[x][1],
            dropdown_css_on = dropdown.dataset.dpanim.split(",")[0],
            dropdown_css_off = dropdown.dataset.dpanim.split(",")[1];

        primary.addEventListener("click", () => {
            if (dropdown.classList.contains("active")) {
                dropdownOff(primary, dropdown, dropdown_css_off);
            } else {
                dropdownOn(primary, dropdown, dropdown_css_on);
            }
        });
        document.addEventListener("click", (e) => {
            if ((e.target !== primary) && (!dropdown.contains(e.target) || (e.target.classList.contains("disappear")))) {
                dropdownOff(primary, dropdown, dropdown_css_off);
            }
        });
    }
}
interDropdown();

// QUICK

const add = (elmnt, className) => {
    elmnt.classList.add(className);
}
const del = (elmnt, className) => {
    elmnt.classList.remove(className);
}
const cont = (elmnt, className) => {
    return elmnt.classList.contains(className);
}

// NAV GROUP VERTICAL

const lists = document.querySelectorAll(".nav-group .list");
const nav_point = document.querySelector(".nav-group span.nav-point");

const clearActive = () => {
    for (let z = 0; z < lists.length; z++) {
        lists[z].classList.remove("active");
    }
}

for (let x = 0; x < lists.length; x++) {
    const list = lists[x];
    list.addEventListener("click", () => {
        nav_point.setAttribute("style", `transform: translateY(${50 * x}px)`);
        nav_point.classList.add("pointmove");
        setTimeout(() => {
            nav_point.classList.remove("pointmove");
        }, 400);
        clearActive();
        list.classList.add("active");
    });
}

// NAV GROUP HORIZONTAL
let directionNavPointBefore = 0;
let directionNavPoint = 0;
const calcTotalClientWidth = (elmnt, index, margin) => {
    let totalList = 0;
    let totalMargin = 0;
    const li = elmnt.clientWidth - (elmnt.clientWidth / 4);
    let c = 0;
    for (c = 0; c <= index; c++) {
        totalList += elmnt.parentElement.children[c + 1].clientWidth;
        totalMargin = margin * index;
    }
    totalList = totalList - li;
    return [totalList + totalMargin, elmnt.clientWidth / 2];
}
const navStyle = (translateX, width) => {
    return `transform: translateX(${translateX}px); width: ${width}px`;
}
document.addEventListener("DOMContentLoaded", () => {
    const navHorizontal = document.querySelectorAll(".nav-group-horiz");



    for (let x = 0; x < navHorizontal.length; x++) {
        const navHoriz = navHorizontal[x];
        const navList = navHoriz.querySelectorAll(".list");

        const checkNavActive = () => {
            let index = 0;
            for (let z = 0; z < navList.length; z++) {
                const list = navList[z];
                if (list.classList.contains("active")) {
                    index = z;
                }
            }
            index == 0 ? index = false : index;
            return index;
        }

        const renderNavPoint = () => {
            if (!navHoriz.children[0].classList.contains("nav-point") && navHoriz.children[0].tagName !== "SPAN") {
                const navPoint = document.createElement("span");
                navPoint.setAttribute("class", "nav-point");
                navHoriz.insertBefore(navPoint, navHoriz.children[0]);
                if (checkNavActive() == false) {
                    const x = navList[0].clientWidth / 4;
                    directionNavPoint = x;
                    navList[0].classList.add("active");
                    setTimeout(() => {
                        navPoint.setAttribute("style", navStyle(x, x * 2));
                    }, 100);
                } else {
                    const navIndex = checkNavActive();
                    const calcCW = calcTotalClientWidth(navList[navIndex], navIndex, 10);
                    navPoint.setAttribute("style", navStyle(calcCW[0], calcCW[1]));
                    directionNavPoint = calcCW[0];
                }
                return navPoint;
            }
        }

        const setNavPoint = (elmnt, translateX, width) => {
            clearClass(navList, "active");
            navPoint.setAttribute("style", navStyle(translateX, width));
            elmnt.classList.add("active");
            directionNavPointBefore = directionNavPoint;
            directionNavPoint = translateX;
        }

        const navPoint = renderNavPoint();



        for (let l = 0; l < navList.length; l++) {
            const list = navList[l];
            const calcCW = calcTotalClientWidth(list, l, 10);
            list.addEventListener("click", (e) => {
                if (e.target.classList.contains("list")) {
                    setNavPoint(list, calcCW[0], calcCW[1]);
                }
            });

        }
    }

});
// const setBuatLaporanPoint = () => {
//     const navList = document.querySelectorAll("#main-nav-horiz .list");
//     const navPoint = document.querySelector("#main-nav-horiz .nav-point");
//     const calcCW = calcTotalClientWidth(navList[1], 1, 10);
//     clearClass(navList, "active");
//     navPoint.setAttribute("style", navStyle(calcCW[0], calcCW[1]));
//     navList[1].classList.add("active");
//     directionNavPointBefore = directionNavPoint;
//     directionNavPoint = calcCW[0];
// }
// const setNavIndex2Point = () => {
//     const navList = document.querySelectorAll("#main-nav-horiz .list");
//     const navPoint = document.querySelector("#main-nav-horiz .nav-point");
//     const calcCW = calcTotalClientWidth(navList[2], 2, 10);
//     clearClass(navList, "active");
//     navPoint.setAttribute("style", navStyle(calcCW[0], calcCW[1]));
//     navList[2].classList.add("active");
//     directionNavPointBefore = directionNavPoint;
//     directionNavPoint = calcCW[0];
// }
// const setNavIndex3Point = () => {
//     const navList = document.querySelectorAll("#main-nav-horiz .list");
//     const navPoint = document.querySelector("#main-nav-horiz .nav-point");
//     const calcCW = calcTotalClientWidth(navList[3], 3, 10);
//     clearClass(navList, "active");
//     navPoint.setAttribute("style", navStyle(calcCW[0], calcCW[1]));
//     navList[3].classList.add("active");
//     directionNavPointBefore = directionNavPoint;
//     directionNavPoint = calcCW[0];
// }
// const setNavIndex4Point = () => {
//     const navList = document.querySelectorAll("#main-nav-horiz .list");
//     const navPoint = document.querySelector("#main-nav-horiz .nav-point");
//     const calcCW = calcTotalClientWidth(navList[4], 4, 10);
//     clearClass(navList, "active");
//     navPoint.setAttribute("style", navStyle(calcCW[0], calcCW[1]));
//     navList[4].classList.add("active");
//     directionNavPointBefore = directionNavPoint;
//     directionNavPoint = calcCW[0];
// }

// SLIDER BOX

const sliderboxs = document.querySelectorAll(".slider-box");

const clearClass = (elmnts, nameOfClass) => {
    for (let x = 0; x < elmnts.length; x++) {
        const elmnt = elmnts[x];
        elmnt.classList.remove(nameOfClass);
    }
}
const addClass = (elmnts, nameOfClass) => {
    for (let x = 0; x < elmnts.length; x++) {
        const elmnt = elmnts[x];
        elmnt.classList.add(nameOfClass);
    }
}

sliderboxs.forEach(async sliderbox => {
    const slides = sliderbox.querySelector(".slides"),
        slidercontrol = sliderbox.querySelector(".slider-control"),
        slide = slides.querySelectorAll(".slide");
    slidercontrol.innerHTML = "";

    const renderDotsControl = () => {
        let dots = "",
            dotactive = "";
        for (let z = 0; z < slide.length; z++) {
            z == sliderbox.dataset.index ? dotactive = "active" : dotactive = "";
            dots += `<div class="dot-slide ${dotactive}"></div>`;
        }
        dots = `<div class="prev-slide"></div>${dots}<div class="next-slide"></div>`;
        slidercontrol.innerHTML = dots;
    }
    const renderSliderLopping = (slide, dots, index) => {
        // slides looping
        clearClass(slide, "active");
        slide[index].classList.add("active");

        // dots looping
        clearClass(dots, "active");
        dots[index].classList.add("active");
    }
    const renderSlideFirst = () => {
        clearClass(slide, "active")
        slide[sliderbox.dataset.index].classList.add("active");
    }
    renderSlideFirst();
    renderDotsControl();

    const sliderloop = (option, timeloop) => {
        const dots = sliderbox.querySelectorAll(".dot-slide");
        let indexbefore = parseInt(sliderbox.dataset.index) - 1,
            index = parseInt(sliderbox.dataset.index),
            indexafter = parseInt(sliderbox.dataset.index) + 1;
        if (indexbefore == -1) indexbefore = slide.length - 1;
        if (indexafter == slide.length) indexafter = 0;

        const prevSlide = async () => {
            horizontalAnimation("top", slide[index], slide[indexbefore], () => { });
            await horizontalAnimation("prev", slide[index], slide[indexbefore], () => {
                renderSliderLopping(slide, dots, index);
            }).then(() => {
                indexbefore == 0 ? indexbefore = slide.length - 1 : indexbefore--;
                index == 0 ? index = slide.length - 1 : index--;
                indexafter == 0 ? indexafter = slide.length - 1 : indexafter--;
            });
        }

        const nextSlide = async () => {
            horizontalAnimation("bottom", slide[index], slide[indexafter], () => { });
            await horizontalAnimation("next", slide[index], slide[indexafter], () => {
                renderSliderLopping(slide, dots, index);
            }).then(() => {
                indexbefore == slide.length - 1 ? indexbefore = 0 : indexbefore++;
                index == slide.length - 1 ? index = 0 : index++;
                indexafter == slide.length - 1 ? indexafter = 0 : indexafter++;
            });
        }

        if (option == "backward") {
            setInterval(async () => {
                prevSlide();
            }, timeloop);
        }
        else if (option == "forward") {
            setInterval(async () => {
                nextSlide();
            }, timeloop);
        }
        slidercontrol.addEventListener("click", (e) => {
            if (e.target.classList.contains("prev-slide")) {
                prevSlide();
            } else if (e.target.classList.contains("next-slide")) {
                nextSlide();
            }
        });
    }
    sliderloop(sliderbox.dataset.slideoption, sliderbox.dataset.timeloop);
});


// animation
const horizontalAnimation = async (side, now, after, renderSomething) => {
    await clearTimeout();
    const sidenow = `${side}-now`,
        sideafter = `${side}-after`;
    now.classList.remove(sidenow);
    now.classList.remove(sideafter);
    after.classList.remove(sidenow);
    after.classList.remove(sideafter);

    now.classList.add(sidenow);
    setTimeout(async () => {
        await renderSomething();
        after.classList.add(sideafter);
        setTimeout(() => {
            now.classList.remove(sidenow);
            after.classList.remove(sideafter);
        }, 400);
    }, 400);
}

// Viewer Box
const viewerBoxs = document.querySelectorAll(".viewer-box");

const getExtentionFile = filename => {
    const fileArr = filename.split(".");
    return fileArr[fileArr.length - 1].toLowerCase();
}

const interViewer = (rangeQuery = false) => {
    const container = document.getElementById(rangeQuery);
    const getViewerBox = viewerBoxs => {
        viewerBoxs.forEach(viewerBox => {
            const mainView = viewerBox.querySelector(".main-view");
            const galleryView = viewerBox.querySelector(".gallery-view");
            const list = galleryView.querySelectorAll(".gallery-view .list");
            list.forEach(li => {
                li.addEventListener("click", e => {
                    let src = li.dataset.filesrc;
                    switch (li.dataset.filetype) {
                        case "image":
                            if ((mainView.children.length == 0) || (mainView.children[0].tagName !== "IMG")) {
                                mainView.innerHTML = `<img class="image-viewer" src="${src}" alt="htr">`;
                                mainView.classList.remove("no-view");
                                return;
                            }
                            mainView.children[0].src = src;
                            break;
                        case "video":
                            if (((mainView.children.length == 0) || mainView.children[0].tagName !== "VIDEO")) {
                                mainView.innerHTML = `<video class="video-viewer" controls autoplay>
                                                            <source src="${src}" type="video/${getExtentionFile(src)}">
                                                        </video>`;
                                mainView.classList.remove("no-view");
                                return;
                            }
                            mainView.children[0].children[0].src = src;
                            mainView.children[0].children[0].type = getExtentionFile(src);
                            break;
                        default:
                            break;
                    }
                });
            });
        });
    }
    if (!rangeQuery == false) {
        let viewer = container.querySelectorAll(".viewer-box");
        getViewerBox(viewer);
        return;
    }
    getViewerBox(viewerBoxs);
    return;
}
interViewer();

// Screen loading
const setInterLoading = () => {
    let templateUI = `<div class="dot-loading">
                        <div class="box-dot">
                            <span class="dot-move2"></span>
                            <span class="dot-move1"></span>
                            <span class="dot-move3"></span>
                        </div>
                    </div>`;
    const screenPlate = document.createElement("div");
    screenPlate.classList.add("screen-loading", "alertfadein");
    screenPlate.innerHTML = templateUI;
    body.insertBefore(screenPlate, body.children[0]);
}

const removeInterLoading = () => {
    const screenPlate = body.querySelector(".screen-loading");
    screenPlate.classList.replace("alertfadein", "alertfadeout");
    setTimeout(() => {
        screenPlate.remove();
    }, 200);
}

// Inter Alert

const interAlertConfirm = ({
    title = "Hello World", 
    description = "Type something in here!", 
    alertType = "info", 
    trueLabel = "Yes", 
    falseLabel = "No", 
    accept = () => {}, 
    reject = () => {},
}) => {
    const renderUI = () => {
        let alertUI = document.createElement("div");
        alertUI.classList.add("alert-box", "alertfadein");
        alertUI.innerHTML = `<div class="alert-confirm ${alertType}">
                                <span class="close"></span>
                                <div class="alert-icon">
                                    <div class="icon"></div>
                                </div>
                                <div class="alert-description">
                                    <h3 class="font-size-18">${title}</h3>
                                    <p>${description}</p>
                                </div>
                                <span class="separate"></span>
                                <div class="alert-action">
                                    <button class="btn-filled" id="true1" data-btnLabel="${trueLabel}"></button>
                                    <button class="btn-regular"id="false0">
                                        <p>${falseLabel}</p>
                                    </button>
                                </div>
                            </div>`;
        body.insertBefore(alertUI, body.firstChild);
        return alertUI;
    }
    const alertUI = renderUI();

    const destroyAlert = () => {
        alertUI.classList.replace("alertfadein", "alertfadeout");
        setTimeout(() => {
            alertUI.remove();
        }, 200);
    }

    const getConfirm = new Promise((resolve, rejected) => {
        alertUI.addEventListener("click", (e) => {
            if (e.target.id == "true1") {
                resolve(true);
                destroyAlert();
            } else if (e.target.id == "false0") {
                rejected(false);
                destroyAlert();
            } else if (e.target.classList.contains("close")) {
                rejected(false);
                destroyAlert();
            }
        });
    });
    getConfirm
    .then(response => {
        accept(response);
    })
    .catch(response => {
        reject(response);
    });
}

const interAlertMessage = ({
    title = "Hello World", 
    description = "Type something in here!", 
    alertType = "info", 
    trueLabel = "OK", 
    falseLabel = "No", 
    accept = (res) => console.log(res), 
    reject = (res) => console.log(res),
}) => {
    const renderUI = () => {
        let alertUI = document.createElement("div");
        alertUI.classList.add("alert-box", "alertfadein");
        alertUI.innerHTML = `<div class="alert-message ${alertType}">
                                <span class="close"></span>
                                <div class="alert-icon">
                                    <div class="icon"></div>
                                </div>
                                <div class="alert-description">
                                    <h3 class="font-size-18">${title}</h3>
                                    <p>${description}</p>
                                </div>
                                <span class="separate"></span>
                                <div class="alert-action">
                                    <button class="btn-filled" id="true1" data-btnLabel="${trueLabel}"></button>
                                </div>
                            </div>`;
        body.insertBefore(alertUI, body.firstChild);
        body.classList.add("scroll-off")
        return alertUI;
    }
    const alertUI = renderUI();

    const destroyAlert = () => {
        alertUI.classList.replace("alertfadein", "alertfadeout");
        body.classList.remove("scroll-off")
        setTimeout(() => {
            alertUI.remove();
        }, 200);
    }

    const getMessage = new Promise((resolve, reject) => {
        alertUI.addEventListener("click", (e) => {
            if (e.target.id == "true1") {
                resolve(true);
                destroyAlert();
            } else if (e.target.classList.contains("close")) {
                reject(false);
                destroyAlert();
            }
        });
    });
    getMessage
    .then(response => {
        accept(response);
    })
    .catch(response => {
        reject(response);
    });
}

// timeline step
let timePoint = 0;
const signupText = [
    {
        title : "Langkah 1",
        description : "Masukan data sesuai dengan Kartu KTP anda.",
    },
    {
        title :  "Langkah 2",
        description : "Masukan Lokasi & Alamat tempat tinggal anda.",
    },
    {
        title :  "Langkah 3",
        description : "Masukan nomor telepon anda.",
    },
    {
        title :  "Langkah Terakhir",
        description : "Syarat & Ketentuan yang berlaku.",
    },
];
const interTimelineStep = () => {
    const formBox = document.querySelector(".form-box"),
        stepLabel = formBox.querySelector("#step-label"),
        stepDescription = formBox.querySelector("#step-description"),
        timeline = formBox.querySelector(".timeline-step"),
        step = timeline.querySelectorAll(".step");
    const nextTimeline = async () => {
        if(timePoint < step.length - 1){
            step[timePoint].classList.replace("now", "done");
            await setTimeout(() => {
                step[timePoint + 1].classList.add("now");
                timePoint++;
                stepLabel.innerHTML = signupText[timePoint].title;
                stepDescription.innerHTML = signupText[timePoint].description;
                return;
            }, 400)
        } else if (timePoint == step.length -  1){
            step[timePoint].classList.replace("now", "done");
            return;
        }
    }
    const prevTimeline = async () => {
        if(timePoint > 0){
            step[timePoint].classList.remove("now");
            step[timePoint - 1].classList.replace("done", "now");
            timePoint--;
            stepLabel.innerHTML = signupText[timePoint].title;
            stepDescription.innerHTML = signupText[timePoint].description;
            return;
        } else if(timePoint == 0){
            step[timePoint].classList.replace("now", "done");
            timePoint--;
            return;
        }
    }
    formBox.addEventListener("click", async (e) => {
        if(e.target.classList.contains("prev")){
            await prevTimeline();
        } else if (e.target.classList.contains("next")){
            await nextTimeline();
        }
    })
}

const loadScripts = (interOption) => {
    interDropdown(interOption);
    interInputField(interOption);
    interViewer(interOption);
}
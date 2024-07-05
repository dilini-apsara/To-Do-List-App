const btnAddTaskElm = document
    .querySelector("#btn-add-task");

const txtTaskElm = document
    .querySelector("#txt-task");

const listContainerElm = document
    .querySelector("#list-container");

const noItemsElm = document
    .querySelector("#list-container > div");

const modeElm = document
    .querySelector("#mode");

modeElm.addEventListener('change', ()=>{
    if (modeElm.checked){
        document.querySelector('html').setAttribute('data-bs-theme', 'dark');
    }else{
        document.querySelector('html').removeAttribute('data-bs-theme');
    }
});

btnAddTaskElm.addEventListener('click', (e)=>{
    e.preventDefault();
    const task = txtTaskElm.value.trim();
    if (!task) {
        txtTaskElm.focus();
        txtTaskElm.select();
        return;
    }

    if (listContainerElm.contains(noItemsElm)) {
        noItemsElm.remove();
    }

    const listItemElm = document
        .createElement("div");
    const lblElm = document
        .createElement("label");
    const inputElm = document
        .createElement("input");
    const iconElm = document
        .createElement("i");
    const text = document
        .createTextNode(task);

    lblElm.append(inputElm);
    lblElm.append(text);
    listItemElm.append(lblElm);
    listItemElm.append(iconElm);

    listItemElm.setAttribute("class", "list-item d-flex justify-content-between p-2 align-items-center animate__animated animate__fadeInUp");
    listItemElm.setAttribute("tabindex", "0");
    lblElm.setAttribute("class", "d-flex gap-2");
    inputElm.setAttribute("type", "checkbox");
    inputElm.setAttribute("tabindex", "-1");
    inputElm.setAttribute("class", "form-check-input");
    iconElm.setAttribute("class", "bi bi-trash3 me-2");

    listContainerElm.append(listItemElm);
    txtTaskElm.value = "";
    txtTaskElm.focus();
});

listContainerElm.addEventListener('click',
    (e)=>{
        if (e.target.getAttribute("class") === 'bi bi-trash3 me-2'){
            e.target.parentElement.remove();
            if (!listContainerElm.children.length){
                listContainerElm.append(noItemsElm);
            }
        }
    });

listContainerElm.addEventListener('keydown', (e)=>{
    switch (e.code){
        case "ArrowUp":
            e.target.closest(".list-item").previousElementSibling?.focus();
            break;
        case "ArrowDown":
            e.target.closest(".list-item").nextElementSibling?.focus();
            break;
        case "Space":
            const checkboxElm = e.target.closest(".list-item").querySelector("input");
            checkboxElm.checked = !checkboxElm.checked;
            break;
        case "Delete":
            let previousElm = e.target.closest(".list-item").previousElementSibling;
            const iconElm = e.target.closest(".list-item")
                .querySelector("i");
            iconElm.click();
            previousElm = previousElm ?? document.querySelector(".list-item");
            previousElm?.focus();
    }
});
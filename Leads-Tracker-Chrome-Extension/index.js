let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("save-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

/* Falsy values--> false, 0, "", null, undefined, NaN */
// null -> how you as a developer define emptiness
// undefined -> how JavaScript define emptiness 

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
}

window.render = function render(leads) {
    // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
    // or
    // create the element
    // set text content
    // append to ul
    // let listItem = document.createElement("li");
    // listItem.innerHTML = "<a href='myLeads[myLeads.length - 1]'>" + myLeads[myLeads.length - 1] + "</a>";
    // ulEl.append(listItem);

    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        /*We need to specify the address in single quotes otherwise it will create a mismatch conflict with the double quotes
        Since the address is the javascript object, we need to specify them outside the single quotes
        Target attribute is used for opening the link in new tab */
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";

        /* Putting everything inside `` and removing "" makes it a string, so we can format it in a readable way. This is called Template String */
        /* Put JavaScript code inside ${} */
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

/* Specify the kind of event we are listening for and the function that needs to be executed for the event occured*/
saveBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    inputEl.value = "";
    render(myLeads);
})


tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        leadsFromLocalStorage = myLeads;
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })

})

deleteBtn.addEventListener("dblclick", function () {
    myLeads = [];
    leadsFromLocalStorage = [];
    localStorage.setItem("myLeads", JSON.stringify([]));
    render(myLeads);
})

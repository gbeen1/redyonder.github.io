// page navigation
document.querySelector("#navHome").addEventListener("click", () => location.replace("index.html"));
document.querySelector("#navNewForm").addEventListener("click", () => {
    window.localStorage.setItem("ID", NCR.GetNewNCRNo());
    window.location.replace("ncrform.html");
});

const collapsableFilts = document.querySelector("#collapsableFilterItems");
collapsableFilts.style.display = "none";
let applyFilters = false;

const nonCollapsableFilterInputs = document.querySelectorAll(".nonCollapsableFilterInput");
nonCollapsableFilterInputs[0].addEventListener("input", FilterChanged);
nonCollapsableFilterInputs[1].addEventListener("click", ToggleFilters);

// collapses filters, disables them
function ToggleFilters(){
    if(collapsableFilts.style.display == "none"){
        nonCollapsableFilterInputs[1].textContent = "Hide Filters"
        collapsableFilts.style.display = "block";
        applyFilters = true
        UpdateList();
    }
    else{
        nonCollapsableFilterInputs[1].textContent = "Show Filters"
        collapsableFilts.style.display = "none";
        applyFilters = false;
        UpdateList();
    }
}


const pageButtons = document.querySelectorAll(".pageButtons");
const pageNumSpan = document.querySelector("#pageNumber");
let listLength = 0;

// sets page to 1, updates list, enables or disables next and back buttons as required
function FilterChanged(){
    pageNum = 1;
    pageNumSpan.innerHTML = "Page " + pageNum;
    pageButtons[0].disabled = true;
    UpdateList();
    if(nonCollapsableFilterInputs[0].value == 0 || pageNum * nonCollapsableFilterInputs[0].value >= listLength)
        pageButtons[1].disabled = true;
    else
        pageButtons[1].disabled = false;
}

// back page button updates list to new page, enables or disables page buttons as required
pageButtons[0].addEventListener("click", () => {
    pageNum--;
    pageNumSpan.innerHTML = "Page " + pageNum;
    UpdateList();
    if(pageNum == 1)
        pageButtons[0].disabled = true;
    if(pageNum * nonCollapsableFilterInputs[0].value < listLength)
        pageButtons[1].disabled = false;
    document.querySelector("thead").scrollIntoView();
});

// next page button updates list to new page, enables or disables page buttons as required
pageButtons[1].addEventListener("click", () => {
    pageNum++;
    pageNumSpan.innerHTML = "Page " + pageNum;
    UpdateList();
    pageButtons[0].disabled = false;
    if(pageNum * nonCollapsableFilterInputs[0].value >= listLength)
        pageButtons[1].disabled = true;
    document.querySelector("thead").scrollIntoView();
});

// filters will update list when interacted with
const collapsableFilterInputs = document.querySelectorAll(".collapsableFilterInput");
collapsableFilterInputs.forEach((input) => input.addEventListener("input", FilterChanged));

// gets list of NCRs according to filters, applies them to table as clickable rows leading to the form page. Also gets length of list to help enabling & disabling back and next page buttons
function UpdateList(){
    const NCRs = NCR.GetTabledNCRs(
        applyFilters, 
        pageNum, 
        nonCollapsableFilterInputs[0].value, 
        collapsableFilterInputs[0].value, 
        collapsableFilterInputs[1].value, 
        collapsableFilterInputs[2].value, 
        collapsableFilterInputs[3].value, 
        collapsableFilterInputs[4].value, 
        collapsableFilterInputs[5].value, 
        collapsableFilterInputs[6].checked, 
        collapsableFilterInputs[7].checked
    );

    listLength = NCR.GetFilteredNCRsLength(
        applyFilters, 
        collapsableFilterInputs[0].value, 
        collapsableFilterInputs[1].value, 
        collapsableFilterInputs[2].value, 
        collapsableFilterInputs[3].value, 
        collapsableFilterInputs[4].value, 
        collapsableFilterInputs[5].value, 
        collapsableFilterInputs[6].checked, 
        collapsableFilterInputs[7].checked
    );

    const tableBody = document.querySelector("#tableBody");
    tableBody.innerHTML = "";

    NCRs.forEach((ncr) => {
        const row = tableBody.insertRow();
        const NCRNoCell = row.insertCell();
        const PONumCell = row.insertCell();
        const SupplierCell = row.insertCell();
        const SAPNoCell = row.insertCell();
        const DescCell = row.insertCell();
        const DateOpenedCell = row.insertCell();
        const StatusCell = row.insertCell();

        NCRNoCell.innerHTML = ncr.ID;
        PONumCell.innerHTML = ncr.poID;
        SupplierCell.innerHTML = ncr.supplierName;
        SAPNoCell.innerHTML = ncr.productID;
        DescCell.innerHTML = ncr.productDesc;
        DateOpenedCell.innerHTML = ncr.ncrDateOpened.toLocaleDateString('en-US');
        StatusCell.innerHTML = ncr.ncrActive ? "Active" : "Closed";

        row.addEventListener("click", () => {
            window.localStorage.setItem("ID", ncr.ID);
            window.location.replace("ncrform.html");
        });
    });
}

// initial list on startup
FilterChanged();

document.querySelector("#btnHelp").addEventListener("click", function(event){
    event.preventDefault();
    alert("Click show filters to begin filtering items.\n\nClick on a table item to edit or view active or closed forms respectively.");
});

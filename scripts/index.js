const collapsableFilts = document.querySelector("#collapsableFilterItems");
collapsableFilts.style.display = "none";
let applyFilters = false;

const nonCollapsableFilterInputs = document.querySelectorAll(".nonCollapsableFilterInput");
nonCollapsableFilterInputs[0].addEventListener("input", ShownItemsNumChanged);
nonCollapsableFilterInputs[1].addEventListener("click", ToggleFilters);

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


function ShownItemsNumChanged(){
    pageNum = 1;
    pageNumSpan.innerHTML = "Page " + pageNum;
    pageButtons[0].disabled = true;
    UpdateList();
    if(nonCollapsableFilterInputs[0].value == 0 || pageNum * nonCollapsableFilterInputs[0].value >= listLength)
        pageButtons[1].disabled = true;
    else
        pageButtons[1].disabled = false;
}

pageButtons[0].addEventListener("click", () => {
    pageNum--;
    pageNumSpan.innerHTML = "Page " + pageNum;
    if(pageNum == 1)
        pageButtons[0].disabled = true;
    if(pageNum * nonCollapsableFilterInputs[0].value < listLength)
        pageButtons[1].disabled = false;
    UpdateList();
});

pageButtons[1].addEventListener("click", () => {
    pageNum++;
    pageNumSpan.innerHTML = "Page " + pageNum;
    pageButtons[0].disabled = false;
    if(pageNum * nonCollapsableFilterInputs[0].value >= listLength)
        pageButtons[1].disabled = true;
    UpdateList();
})

const collapsableFilterInputs = document.querySelectorAll(".collapsableFilterInput");
collapsableFilterInputs.forEach((input) => input.addEventListener("input", () => UpdateList(true)));

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
    });
}

function moveToCreate()
{
    location.replace("./createNCR.html")
}

btnCreateNCR.addEventListener('click', moveToCreate)


ShownItemsNumChanged();

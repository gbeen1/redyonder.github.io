// nav bar
document.querySelector("#navHome").addEventListener("click", () => location.replace("index.html"));
document.querySelector("#navNewForm").addEventListener("click", () => {
    window.localStorage.setItem("ID", NCR.GetNewNCRNo());
    window.location.replace("ncrform.html");
});

// form save, complete & cancel buttons
const buttons = document.querySelectorAll(".btn");// save, complete, close
buttons[0].disabled = true;
buttons[1].disabled = true;

// form fields, asterisks, and validity of each field
const inputs = document.querySelectorAll(".qualityRep");
const asterisks = document.querySelectorAll(".asterisk");
const IsValid = [false, false, false, false, false, false, false, false, false]

// fills in available fields if ncr number matches existing ncr, otherwise just ncr no, date, active
const ncr = NCR.GetNCRByID(window.localStorage.getItem("ID"));
const infospans = document.querySelectorAll(".infospans")
infospans[0].innerHTML = window.localStorage.getItem("ID");
if(typeof ncr == "undefined"){
    infospans[1].innerHTML = new Date().toLocaleDateString();
    infospans[2].innerHTML = "Active";
}
else{
    infospans[1].innerHTML = ncr.ncrDateOpened.toLocaleDateString();
    inputs[0].value = ncr.poID;
    inputs[1].value = ncr.supplierName;
    inputs[2].value = ncr.productID;
    inputs[3].checked = ncr.qaOptSupOrRecInsp;
    inputs[4].checked = ncr.qaOptWIP;
    inputs[5].value = ncr.poSalesOrderNum;
    inputs[6].value = ncr.poQuantityReceived;
    inputs[7].value = ncr.qaQuantityDefective;
    inputs[8].value = ncr.productDesc;
    inputs[9].value = ncr.qaDefectDesc;
    inputs[10].checked = ncr.qaNonConforming;
    inputs[11].checked = ncr.qaEngNeeded;
    ValidatePONo();
    ValidateSuppName();
    ValidateSAPNo();
    ValidateApplProcess();
    ValidateSalesOrderNo();
    ValidateQuantityRec();
    ValidateQuantityDefect();
    ValidateItemDesc();
    ValidateDefectDesc();
    if(ncr.ncrActive)
        infospans[2].innerHTML = "Active";
    else{
        infospans[2].innerHTML = "Closed"
        inputs.forEach(input => input.disabled = true);
        buttons[0].disabled = true;
        buttons[1].disabled = true;
    }
}

inputs[0].addEventListener("input", ValidatePONo);// PO
inputs[1].addEventListener("input", ValidateSuppName);// supplier
inputs[2].addEventListener("input", ValidateSAPNo);// SAP
inputs[3].addEventListener("input", ValidateApplProcess);// Appl Process 1
inputs[4].addEventListener("input", ValidateApplProcess);// Appl Process 2
inputs[5].addEventListener("input", ValidateSalesOrderNo);// Sales Order No.
inputs[6].addEventListener("input", ValidateQuantityRec);// Quantity Rec
inputs[7].addEventListener("input", ValidateQuantityDefect);// Quantity Defect
inputs[8].addEventListener("input", ValidateItemDesc);// Item Desc
inputs[9].addEventListener("input", ValidateDefectDesc);// Defect Desc

// validation functions check if fields are valid, sets asterisk to appropriate colour based on validity, checks if buttons should be enabled
function ValidatePONo(){
    IsValid[0] = inputs[0].value.length > 0 && /^\d+$/.test(inputs[0].value);
    if(IsValid[0])
        asterisks[0].style.color = "green";
    else
        asterisks[0].style.color = "red";
    CheckEnableButtons();
}

function ValidateSuppName(){
    IsValid[1] = inputs[1].value.length > 0;
    if(IsValid[1])
        asterisks[1].style.color = "green";
    else
        asterisks[1].style.color = "red";
    CheckEnableButtons();
}

function ValidateSAPNo(){
    IsValid[2] = inputs[2].value.length > 0 && /^\d+$/.test(inputs[2].value);
    if(IsValid[2])
        asterisks[2].style.color = "green";
    else
        asterisks[2].style.color = "red";
    CheckEnableButtons();
}

function ValidateApplProcess(){
    IsValid[3] = inputs[3].checked != inputs[4].checked;
    if(IsValid[3])
        asterisks[3].style.color = "green";
    else
        asterisks[3].style.color = "orange";
    CheckEnableButtons();
}

function ValidateSalesOrderNo(){
    IsValid[4] = inputs[5].value.length > 0 && /^\d+$/.test(inputs[5].value);
    if(IsValid[4])
        asterisks[4].style.color = "green";
    else
        asterisks[4].style.color = "orange";
    CheckEnableButtons();
}

function ValidateQuantityRec(){
    IsValid[5] = inputs[6].value.length > 0 && /^\d+$/.test(inputs[6].value);
    if(IsValid[5])
        asterisks[5].style.color = "green";
    else
        asterisks[5].style.color = "orange";
    CheckEnableButtons();
}

function ValidateQuantityDefect(){
    IsValid[6] = inputs[7].value.length > 0 && /^\d+$/.test(inputs[7].value);
    if(IsValid[6])
        asterisks[6].style.color = "green";
    else
        asterisks[6].style.color = "orange";
    CheckEnableButtons();
}

function ValidateItemDesc(){
    IsValid[7] = inputs[8].value.length > 0;
    if(IsValid[7])
        asterisks[7].style.color = "green";
    else
        asterisks[7].style.color = "orange";
    CheckEnableButtons();
}

function ValidateDefectDesc(){
    IsValid[8] = inputs[10].value.length > 0;
    if(IsValid[8])
        asterisks[8].style.color = "green";
    else
        asterisks[8].style.color = "orange";
    CheckEnableButtons();
}

// enables buttons if required fields are filled for respective buttons
function CheckEnableButtons(){
    if(IsValid[0] && IsValid[1] && IsValid[2]){
        buttons[0].disabled = false;
        if(IsValid[3] && IsValid[4] && IsValid[5] && IsValid[6] && IsValid[7] && IsValid[8])
            buttons[1].disabled = false;
        else
            buttons[1].disabled = true
    }
    else{
        buttons[0].disabled = true;
        buttons[1].disabled = true;
    }
}

// save button checks valid fields, submits form
buttons[0].addEventListener("click", async function(event){
    event.preventDefault();
    ValidatePONo();
    ValidateSuppName();
    ValidateSAPNo();
    if(IsValid[0] && IsValid[1] && IsValid[2]){
        const formData = new FormData(document.querySelector("#frmNCR"));
        try{
            const response = await fetch(null, {
                method: "POST",
                body: formData
            });
            //console.log(await response.json);
            window.alert("Save succeeded!");
        }
        catch (e){
            console.log(e);
            window.alert("Save failed! Going to pretend that it didn't for the sake of the demonstration.");
        }
    }
    else
        window.alert("Save failed! Ensure all required fields are properly filled.")
});


// complete button checks valid fields, submits forms, disables all fields
buttons[1].addEventListener("click", async function(event){
    event.preventDefault();
    ValidatePONo();
    ValidateSuppName();
    ValidateSAPNo();
    ValidateApplProcess();
    ValidateSalesOrderNo();
    ValidateQuantityRec();
    ValidateQuantityDefect();
    ValidateItemDesc();
    ValidateDefectDesc();
    if(IsValid[0] && IsValid[1] && IsValid[2] && IsValid[3] && IsValid[4] && IsValid[5] && IsValid[6] && IsValid[7] && IsValid[8]){
        const formData = new FormData(document.querySelector("#frmNCR"));
        try{
            const response = await fetch(null, {
                method: "POST",
                body: formData
            });
            //console.log(await response.json);
            window.alert("Submission succeeded!");
        }
        catch (e){
            console.log(e);
            window.alert("Save failed! Going to pretend that it didn't for the sake of the demonstration.");
        }
        infospans[2].innerHTML = "Closed"
        inputs.forEach(input => input.disabled = true);
        buttons[0].disabled = true;
        buttons[1].disabled = true;
    }
    else
        window.alert("Save failed! Ensure all required fields are properly filled.")
});

// cancel button returns to lists
buttons[2].addEventListener("click", function(event){
    event.preventDefault();
    window.location.replace("index.html");
});

document.querySelector("#btnHelp").addEventListener("click", function(event){
    event.preventDefault();
    alert("Please complete all fields with the asterisk attached to it. \n\nFor the fields, NCR No., PO or Prod. No., Sales Order No., Quantity Recieved and Quantity Defective, please only enter valid numbers. \n(No Negatives) \n\nWhen completed, please review your information and select the \"Complete\" button to send your part to the Engineer.");
});

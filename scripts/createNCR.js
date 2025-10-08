const btnCreate = document.querySelector("#btnCreate");
btnCreate.disabled = true;

const fields = Array.from(document.querySelectorAll(".createFormInput"));
fields[0].addEventListener("input", ValidateSupplier);
fields[0].addEventListener("change", UpdateSAPDatalist)
fields[1].addEventListener("input", ValidatePO);
fields[2].addEventListener("input", ValidateSaleNo);
fields[3].addEventListener("input", ValidateSAPNo);

let isValid = [false, false, false, false];

const datalists = document.querySelectorAll(".comboBoxItems");
// fill supplier datalist
GetSupplierList().forEach(function(supplier){
    let option = document.createElement("option");
    option.value = supplier.supplierName;
    datalists[0].appendChild(option);
});


// fill SAP No. datalist based on supplier
function UpdateSAPDatalist(){
    alert("updating List");
    datalists[1].innerHTML = "";
    let supplierID = 0;

    GetSupplierList().forEach(function(supplier){
        if(supplier.supplierName == fields[0].value){
            supplierID = supplier.ID;
            alert("supplier found " + supplierID);
        }
    });

    if(supplierID != 0)
        GetProductList().forEach(function(product){
            if(product.supplierID == supplierID){
                let option = document.createElement("option");
                option.value = product.ID;
                datalists[1].appendChild(option);
            }
        });
}


// form validation
function ValidateSupplier(){
    if(fields[0].value.length > 0)
        isValid[0] = true;
    else
        isValid[0] = false;
    EnableCreate();
}

function ValidatePO(){
    if(fields[1].value.length > 0 && /^\d+$/.test(fields[1].value))// regex test if it's a digit
        isValid[1] = true;
    else
        isValid[1] = false;
    EnableCreate();
}

function ValidateSaleNo(){
    if(fields[2].value.length > 0 && /^\d+$/.test(fields[2].value))
        isValid[2] = true;
    else
        isValid[2] = false;
    EnableCreate();
}

function ValidateSAPNo(){
    if(fields[3].value.length > 0 && /^\d+$/.test(fields[3].value))
        isValid[3] = true;
    else
        isValid[3] = false;
    EnableCreate();
}

// enable the submit button if all fields are valid
function EnableCreate(){
    if(isValid[0] && isValid[1] && isValid[2] && isValid[3])
        btnCreate.disabled = false;
    else
        btnCreate.disabled = true;
}

// final validation and submission of form
const form = document.querySelector("#frmCreate");
form.addEventListener("submit", async function(event){
    event.preventDefault();
    ValidateSupplier();
    ValidatePO();
    ValidateSaleNo();
    ValidateSAPNo();
    if(isValid[0] && isValid[1] && isValid[2] && isValid[3]){// submit action copied from https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_forms_through_JavaScript
        const formData = new FormData(form);
        try{
            const response = await fetch(null, {
                method: "POST",
                body: formData
            });
            //console.log(await response.json);
        }
        catch (e){
            console.log(e);
        }
        window.location.replace("file:///C:/Users/Matthew/Desktop/Proj%20Planning%20and%20Dev/editNCR.html")
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const ncrId = window.localStorage.getItem("ID");
    const ncr = NCR.GetNCRByID(ncrId);

    // #region Quality Representative Section
    setChecked("qr_chk_ipa_suprec", ncr.qaOptSupOrRecInsp);
    setChecked("qr_chk_ipa_wip", ncr.qaOptWIP);
    setText("qr_supname", ncr.supplierName);
    setText("qr_descriptitem", ncr.productID);

    setText("qr_ncrno", ncr.ID);
    setText("qr_pono", ncr.poID);
    setText("qr_salesno", ncr.poSalesOrderNum);
    setText("qr_qtyrecieve", ncr.poQuantityReceived);
    setText("qr_qtydefect", ncr.qaQuantityDefective);

    setText("qr_descripdefect", ncr.qaDefectDesc);

    if (ncr.qaNonConforming === true) {
        setChecked("qr_chk_nonconform_yes", true);
    } else if (ncr.qaNonConforming === false) {
        setChecked("qr_chk_nonconform_no", true);
    }

    setText("qr_name", ncr.qaCompletedBy);
    setDate("qr_date", ncr.qaDateCompleted);
    // #endregion

    // #region Engineering Section
    // Bind datas only if engineering data exists
    if (ncr.ncrStage === "Engineering" || ncr.ncrStage === "Closed") {
        if (ncr.engReview === "Use as is") {
            setChecked("eng_chk_revdispo_use", true);
        } else if (ncr.engReview === "Repair") {
            setChecked("eng_chk_revdispo_repair", true);
        } else if (ncr.engReview === "Rework") {
            setChecked("eng_chk_revdispo_rework", true);
        } else if (ncr.engReview === "Scrap") {
            setChecked("eng_chk_revdispo_scrap", true);
        }

        if (ncr.engNotifyCutomer === true) {
            setChecked("eng_chk_customnoti_yes", true);
        } else if (ncr.engNotifyCutomer === false) {
            setChecked("eng_chk_customnoti_no", true);
    }

    setText("eng_dispo", ncr.engDisposition);

    if (ncr.engUpdateDrawing === true) {
        setChecked("eng_chk_drawupdate_yes", true);
    } else if (ncr.engUpdateDrawing === false) {
        setChecked("eng_chk_drawupdate_no", true);
    }

    setText("eng_orirev", ncr.engOriginalRevNo);
    setText("eng_updaterev", ncr.engUpdatedRevNo);
    setText("eng_engname", ncr.engUpdatedBy);
    setDate("eng_revdate", ncr.engUpdatedOn);

    setText("eng_name", ncr.engCompletedBy);
    setDate("eng_date", ncr.engDateCompleted);
    }
    // #endregion

    // #region Purchasing Section
    if (ncr.ncrStage === "Purchasing" || ncr.ncrStage === "Closed") {
        if (ncr.purchPrelimDec === "Return to supplier for either rework or replacement") {
            setChecked("pur_chk_dicision_return", true);
        } else if (ncr.purchPrelimDec === "Rework in-house") {
            setChecked("pur_chk_dicision_rework", true);
        } else if (ncr.purchPrelimDec === "Scrap in-house") {
            setChecked("pur_chk_dicision_scrap", true);
        } else if (ncr.purchPrelimDec === "Defer for HBC Engineering review") {
            setChecked("pur_chk_dicision_defer", true);
        }

        if (ncr.purchCAR === true) {
            setChecked("pur_chk_CAR_yes", true);
        } else if (ncr.purchCAR === false) {
            setChecked("pur_chk_CAR_no", true);
        }

        if (ncr.purchFollowUp === true) {
            setChecked("pur_chk_followup_yes", true);
        } else if (ncr.purchFollowUp === false) {
            setChecked("pur_chk_followup_no", true);
        }

        setText("pur_name", ncr.purchCompletedBy);
        setDate("pur_date", ncr.purchCompletedOn);
    }
    // #endregion

    // #region Inspector Section
    if (ncr.ncrStage === "Inspector" || ncr.ncrStage === "Closed") {
        if (ncr.purchFollowUp === true) {
            setChecked("ins_chk_follow_yes", true);
        } else if (ncr.purchFollowUp === false) {
            setChecked("ins_chk_followup_no", true);
        }

        setText("ins_newNCR", ncr.qa2NewNCR);

        setText("ins_name", ncr.purchCompletedBy);
        setDate("ins_date", ncr.purchCompletedOn);
    }
     // #endregion

     //#region Quality Department Section
    if (ncr.ncrStage === qa2ReinspectAccept || ncr.ncrStage === "Closed") {
        if (ncr.ncrStage === "Closed") {
            setChecked("reqr_chk_close_yes", true);
        }

        setText("reqr_name", ncr.qa2CompletedBy);
        setDate("reqr_date", ncr.qa2CompletedOn);
    }
    // #endregion

    // Document Bottom
    setText("doc_docauther", ncr.qaCompletedBy);
    setDate("doc_docdate", ncr.ncrDateOpened);
    setText("doc_approvedby", ncr.purchCompletedBy);
    setDate("doc_revdate", ncr.qa2CompletedBy);
    if (ncr.qaDateCompleted = qa2CompletedBy) {
        const revNum = 1;
        setText("doc_revno", revNum);
    } else {
        const revNum = 2;
        setText("doc_revno", revNum);
    }
    
    });

function setText(elementID, value) {
    const st = document.getElementById(elementID);
    if (st) {
        st.innerText = (value === null || value === undefined) ? "" : value;
        if (st.tagName === "INPUT") st.value = value;
    }
}

function setChecked(elementID, isChecked) {
    const sc = document.getElementById(elementID);
    if (sc) {
        sc.checked = isChecked;
    }
}

function setDate(elementID, dateObj) {
    const sd = document.getElementById(elementID);
    if (sd && dateObj) {
        const date = new Date(dateObj);
        if (!isNaN(date)) {
            sd.innerText = date.toLocaleDateString('en-US');
        }
    }
}
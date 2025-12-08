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
    //if (ncr.ncrStage === "Purchasing" || ncr.ncrStage === "Closed") {
    //    if (ncr./*Purchasing's Preliminary Decision*/ === "Return") {
    //        setChecked("pur_chk_dicision_return", true);
    //    } else if (ncr./*Purchasing's Preliminary Decision*/ === "Rework") {
    //        setChecked("pur_chk_dicision_rework", true);
    //    } else if (ncr./*Purchasing's Preliminary Decision*/ === "Scrap") {
    //        setChecked("pur_chk_dicision_scrap", true);
    //    } else if (ncr./*Purchasing's Preliminary Decision*/ === "Defer") {
    //        setChecked("pur_chk_dicision_defer", true);
    //    }

    //    if (ncr./*Was CAR raised?*/ === true) {
    //        setChecked("pur_chk_CAR_yes", true);
    //    } else if (ncr./*Was CAR raised?*/ === false) {
    //        setChecked("pur_chk_CAR_no", true);
    //    }

    //    if (ncr./*Follow-up Required?*/ === true) {
    //        setChecked("pur_chk_followup_yes", true);
    //    } else if (ncr./*Follow-up Required?*/ === false) {
    //        setChecked("pur_chk_followup_no", true);
    //    }

    //    setText("pur_name", ncr./*Operations Manager Name*/);
    //    setDate("pur_date", ncr./*Purchasing / operations section date*/);
    //}
    // #endregion

    // #region Inspector Section
    //if (ncr.ncrStage === "Inspector" || ncr.ncrStage === "Closed") {
    //    if (ncr./*Follow-up Required?*/ === true) {
    //        setChecked("ins_chk_follow_yes", true);
    //    } else if (ncr./*Follow-up Required?*/ === false) {
    //        setChecked("ins_chk_followup_no", true);
    //    }

    //    setText("ins_newNCR", ncr./*New NCR Number*/);

    //    setText("ins_name", ncr./*Inspector's Name*/);
    //    setDate("ins_date", ncr./*Inspector section date*/);
    //}
    // #endregion

    // #region Quality Department Section
    //if (ncr.ncrStage === /*"Quality"*/ || ncr.ncrStage === "Closed") {
    //    if (ncr./*NCR Closed*/ === true) {
    //        setChecked("reqr_chk_close_yes", true);
    //    }

    //    setText("reqr_name", ncr.qaCompletedBy);
    //    setDate("reqr_date", ncr./*Re-Quality Department date*/);
    //}
    // #endregion

    // Document Bottom
    setText("doc_docauther", ncr.qaCompletedBy);
    setDate("doc_docdate", ncr.ncrDateOpened);
    //setText("doc_approvedby", ncr./*Operations Manager Name*/);
    //setDate("doc_revdate", ncr./*Revision Date*/);
    //setText("doc_revno", ncr./*Revision Number*/);
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
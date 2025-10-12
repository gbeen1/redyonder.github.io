// Input elements
const ckbActive = document.getElementById('chkActiveFilter');
const ckbClosed = document.getElementById('chkClosedFilter');

const tableRows = document.querySelectorAll('#tableBody tr');

// Functions
function activeFilter()
{
    const showActive = ckbActive.checked;
    const showClosed = ckbClosed.checked;

    tableRows.forEach(row => {
        const status = row.querySelector('.status-cell').textContent; // get the text from Status column

        if ((showActive && status === 'Active') || (showClosed && status === 'Closed'))
            {
            row.style.display = ''; // show the rows
            }
        else
            {
            row.style.display = 'none'; // hide the rows
            }
    });
}

// Eventlistener
ckbActive.addEventListener('change', activeFilter);
ckbClosed.addEventListener('change', activeFilter);

activeFilter(); // When the page first loaded, show initial active/closed rows
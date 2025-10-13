// Input elements
const ckbActive = document.getElementById('chkActiveFilter');
const ckbClosed = document.getElementById('chkClosedFilter');
const sltDate = document.getElementById('sltDateFilter');
const tableBody = document.getElementById('tableBody');

const originRows = Array.from(tableBody.querySelectorAll('tr'));

// Functions
function dateFilter(rows) {
    const dateFilter = sltDate.value;

    if (dateFilter === 'none')
    {
        return rows;
    }

    const today = new Date();
    const aWeekBefore = new Date();
    aWeekBefore.setDate(today.getDate() - 7); // the date of a week ago
    aWeekBefore.setHours(0, 0, 0, 0); // make time to 0 for date comparison

    return rows.filter(row => {
        const rowDate = new Date(row.cells[5].textContent);
        if (dateFilter === 'new')
        {
            return rowDate >= aWeekBefore; // new if it is a week before it was created
        }
        else
        {
            return rowDate < aWeekBefore; // old if it is a week after it was created
        }
    });
}

function activeFilter()
{
    const showActive = ckbActive.checked;
    const showClosed = ckbClosed.checked;

    return rows.filter(row => {
        const status = row.querySelector('.status').textContent;
        return (showActive && status === 'Active') || (showClosed && status === 'Closed');
    });
}

function renderTable(rowsToRender) {
    tableBody.innerHTML = ''; // clear table

    rowsToRender.forEach(row => {
        tableBody.appendChild(row);
    }); // add filted rows
}

function updateTable() {
    let filteredRows = filterByStatus(originalRows);
    
    filteredRows = filterByDate(filteredRows);

    renderTable(filteredRows);
}

// Eventlistener
ckbActive.addEventListener('change', updateTable);
ckbClosed.addEventListener('change', updateTable);
sltDate.addEventListener('change', updateTable);

updateTable(); // When the page first loaded, show initial active/closed rows
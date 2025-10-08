const list = document.getElementById('');
const create = document.getElementById('');
const edit = document.getElementById('');

function moveToCreate()
{
    location.replace("./createNCR.html");
}

function moveToEdit()
{
    location.replace("./createNCR.html");
}

function moveToList()
{
    location.replace("./list.html")
}

Btn.addEventlistener('click', moveToCreate);
Btn.addEventlistener('click', moveToEdit);
Btn.addEventlistener('click', moveToList);
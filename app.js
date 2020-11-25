// Selectors
const toDoDate = document.getElementById('todo-date');
const toDoInput = document.getElementById('todo-task');
const toDoResp = document.getElementById('todo-responsible');
const toDoButton = document.getElementById('todo-button');
const completeBtn = document.getElementById('complete-btn');
const impBtn = document.getElementById('imp-btn');
const trashBtn = document.getElementById('trash-btn');
const tblResult = document.getElementById('tbl-result');
const cntTable = document.getElementById('content-table');
const cntCells = document.getElementsByTagName('td');
const filterOption = document.getElementById('filter-todo');

// Event listeners
toDoButton.addEventListener('click', addToDo);
completeBtn.addEventListener('click', addComplete);
impBtn.addEventListener('click', markImp);
trashBtn.addEventListener('click', deletBtn);
filterOption.addEventListener('click', filterTodo);

// Functions

function addToDo(event) {
        event.preventDefault(); 

        let newRow = tblResult.insertRow(0); 
        let cell1 = newRow.insertCell(0); 
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);

        cell1.innerHTML = toDoDate.value; 
        cell2.innerHTML = toDoInput.value;
        cell3.innerHTML = toDoResp.value;

        selectRow();
}

let rowSelected;

function selectRow () { 
        for (i=0; i < cntCells.length; i++) {
            cntCells[i].onclick = function () {
                let indexSel = this.parentNode.rowIndex; 
                let rowsNotSelected = cntTable.getElementsByTagName('tr'); 
                for (let row = 0; row < rowsNotSelected.length; row++) {
                    rowsNotSelected[row].classList.remove('selected');
                }
                rowSelected = cntTable.getElementsByTagName('tr')[indexSel];
                rowSelected.classList.add('selected'); 
            }
        }
}


function addComplete () {
    if (rowSelected.classList.contains('selected')) {
        rowSelected.classList.toggle('completed');
}
}

 function markImp () {
    if (rowSelected.classList.contains('selected')) {
        rowSelected.classList.toggle('important');
 }
 }

 function deletBtn () {
    if (rowSelected.classList.contains('selected')) {
        rowSelected.addEventListener('transitionend', function () {
            rowSelected.remove();
        });
        rowSelected.classList.add('fall');
 }
}



// // Filter To Do

function filterTodo(event) {
    const todos =  tblResult.childNodes; 
    todos.forEach(function(rowSelected) {
        switch(event.target.value) {
            case "all":
                    rowSelected.style.display = '';
                break;
            case "important":
                if(rowSelected.classList.contains('important')) {
                    rowSelected.style.display = '';
                } else {
                    rowSelected.style.display = 'none';
                }
                break;
            case "completed":
                if (rowSelected.classList.contains('completed')) {
                    rowSelected.style.display = '';
                } else {
                    rowSelected.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!rowSelected.classList.contains('completed')) {
                    rowSelected.style.display = '';
                } else {
                    rowSelected.style.display = 'none';
                }
                break;
        }
    });
}

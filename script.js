let task = document.getElementById("task");
let date = document.getElementById("date");
let time = document.getElementById("time");
let resultArea = document.getElementById("resultArea");
let notes = [];

// אם יש פתקים שנשמרו אז אני מעביר אותם למערך ולאחר מכן מציג אותם בדף
if (localStorage.savedNotesList) {
    notes = JSON.parse(localStorage.savedNotesList);
}


// הצגה ראשונית של של הפתקים.
displayNotes();

//   שמירת פתק חדש לאחר וולידציות של זמן והכנסת ערכים למשתנים. 
function saveNote() {
    if (task.value && date.value && time.value) {
        var val = validation();
        if (val) {
            notes.push(new note(task.value, date.value, time.value));
            localStorage.savedNotesList = JSON.stringify(notes);
            var lastNote = notes.length - 1;
            displayNotes(lastNote);
        }
        else {
            alert("this date and time has allready passed please enter valid values");
        }

        resetForm();
    }
    else {
        alert(`please fill all the requiments`);
    }
}

// הצגה של הפתקים על הדף כולל אפקט הפייד אין בפתק האחרון
function displayNotes(lastNote) {
    resultArea.innerHTML = ``;
    for (let index = 0; index < notes.length; index++) {
        if (index == lastNote) {
            resultArea.innerHTML += `
        <div  class="noteArea col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 fadeIN ">
        <span onclick='deleteNote(${index})' class="delNote row">X</span>
            <div class="taskArea row-card-text scroll">${notes[index].task}</div>
            <div class="dateAndTimeArea row">${notes[index].date.split(`-`).reverse().join(`/`)}  <br> ${notes[index].time}</div>
        </div>`;
        }
        else {
            resultArea.innerHTML += `
            <div  class="noteArea col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2  ">
            <span onclick='deleteNote(${index})' class="delNote row">X</span>
                <div class="taskArea row-card-text scroll">${notes[index].task}</div>
                <div class="dateAndTimeArea row">${notes[index].date.split(`-`).reverse().join(`/`)}  <br> ${notes[index].time}</div>
            </div>`;
        }


    }
}

// איפוס של הטופס
function resetForm() {
    task.value = ``;
    date.value = ``;
    time.value = ``;
}

// מחיקת פתק  תוך שמירה והצגה של מערך הפתקים מחדש
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.savedNotesList = JSON.stringify(notes);
    displayNotes();
}

// וולידציית התאריך והשעה
function validation() {
    const D = new Date();
    var systemDate;
    const year = D.getFullYear();
    const month = D.getMonth() + 1;
    const day = D.getDate();
    const hour = D.getHours();
    const minute = D.getMinutes();
    const systemTime = `${hour}:${minute}`;

    if (month <= 9) {
        systemDate = `${year}-0${month}-${day}`;
        if (day <= 9) {
            systemDate = `${year}-0${month}-0${day}`;
        }

    }

    else {
        systemDate = `${year}-${month}-${day}`;
        if (day <= 9) {
            systemDate = `${year}-${month}-0${day}`;
        }
    }

    if ((systemTime > time.value && systemDate == date.value) || systemDate > date.value) {
        return false;
    }
    else {
        return true;
    }

}

// איפוס של האחסון המקומי
// localStorage.clear();
const exerciseList = document.querySelector('#exercise-list');
const form = document.querySelector('#add-exercise')

//create element and render exercise
function renderExercise(doc){
    	let li = document.createElement('li');              // Jedes Dokument bekommt ein li-Tag und 
        let name = document.createElement('span');           // span-Tag zugeteilt --> für CSS
        let area = document.createElement('span')
        let cross = document.createElement('div');

        li.setAttribute('data-id', doc.id); // Das jeweilige Dokument erhält eine eigene ID
        name.textContent = doc.data().name; //Name vom Dokument wird entnommen
        area.textContent = doc.data().area;
        cross.textContent = 'x';

        li.appendChild(name);           //  The append() method takes a single item as an input parameter     
        li.appendChild(area);          //   and adds that to the end of the list. The items inside 
        li.appendChild(cross)                                //   a list can be numbers, strings, another list, dictionary.

        exerciseList.appendChild(li);

// Daten auf der Website löschen aus der Datenbank

cross.addEventListener('click', (evt) => {
    let id = evt.target.parentElement.getAttribute('data-id');
    db.collection('exercise').doc(id).delete();

    })
}


//  Daten werden aus der Datenbank entnommen --> VERALTET (KEINE REAL-TIME DATABASE)
//db.collection('übung').orderBy('name').get().then((snapshot) => { // Snapshot der Kollektion --> Daten werden entnommen
  //  snapshot.docs.forEach(doc => {                                // Unterteilt die Kollektion in einzelne Dokumente
    //    renderExercise(doc);                                      // obere Funktion wird ausgeführt
    //})
//})

//Daten in die Datenbank speichern --> User
form.addEventListener('submit', (evt) => { 
    if(form.name.value == '' || form.area.value == ''){
        evt.preventDefault();
        return false;
    }
    else{
        evt.preventDefault();
        db.collection('exercise').add({
            name: form.name.value,
            area: form.area.value
    })
    form.name.value = '';
    form.area.value = '';
}});

// Real-Time Listener
db.collection('exercise').orderBy('name').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderExercise(change.doc);
        } else if (change.type == 'removed'){
            let li = exerciseList.querySelector('[data-id=' + change.doc.id + ']');
            exerciseList.removeChild(li);
        }
    })
})
 


const exerciseList = document.querySelector('#exercise-list');
const form = document.querySelector('#add-exercise')

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

//Daten in die Datenbank speichern --> User
form.addEventListener('submit', (evt) => { 
    if(form.name.value == '' || document.getElementById("categorylist").value == ''){
        evt.preventDefault();
        return false;
    }
    else{
        evt.preventDefault();
        db.collection('exercise').add({
            name: form.name.value,
            area: document.getElementById("categorylist").value
    })
    form.name.value = '';
    document.getElementById("categorylist").value = '';
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


function getSelectValue(){
    var selectedValue = document.getElementById("categorylist").value;
    console.log(selectedValue)
}





/* function getId(){
    db.collection('category').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.id)
        })
    })
}
function getName(){
    db.collection('category').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data.area)
        })
    })
}
*/ 

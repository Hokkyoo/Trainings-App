const exerciseList = document.querySelector('#exercise-list');
const form = document.querySelector('#add-exercise')

function renderExercise(doc){
    	let li = document.createElement('li');              // Jedes Dokument bekommt ein li-Tag und 
        let name = document.createElement('span');           // span-Tag zugeteilt --> für CSS
        let area = document.createElement('span')


        li.setAttribute('data-id', doc.id); // Das jeweilige Dokument erhält eine eigene ID
        name.textContent = doc.data().name; //Name vom Dokument wird entnommen
        area.textContent = doc.data().area;

        li.appendChild(name);           //  The append() method takes a single item as an input parameter     
        li.appendChild(area);           //   and adds that to the end of the list. The items inside 
          //   a list can be numbers, strings, another list, dictionary.

        exerciseList.appendChild(li);
}

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





/* db.collection('exercise').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
    })
})
*/ 


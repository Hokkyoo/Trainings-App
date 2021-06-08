const exerciseList = document.querySelector('#exercise-list');

//create element and render exercise
function renderExercise(doc){
    	let li = document.createElement('li');              // Jedes Dokument bekommt ein li-Tag und 
        let name = document.createElement('span');           // span-Tag zugeteilt 
        let category = document.createElement('span');

        li.setAttribute('data-id', doc.id); // Das jeweilige Dokument erhält eine eigene ID
        name.textContent = doc.data().name; //Name vom Dokument wird entnommen
        category.textContent = doc.data().category; //Kategorie vom Dokument wird entnommen

        li.appendChild(name);           //  The append() method takes a single item as an input parameter
        li.appendChild(category);       //   and adds that to the end of the list. The items inside 
                                        //   a list can be numbers, strings, another list, dictionary.

        exerciseList.appendChild(li);
}

db.collection('übung').get().then((snapshot) => { // Snapshot der Kollektion --> Daten werden entnommen
    snapshot.docs.forEach(doc => {                 // Unterteilt die Kollektion in einzelne Dokumente
        renderExercise(doc);                        // obere Funktion wird ausgeführt
    })
})
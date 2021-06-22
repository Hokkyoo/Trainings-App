    const routineList = document.querySelector('#routine-list');
    const form = document.querySelector('#add-routine')

    function renderExercise(doc){
    	let li = document.createElement('li');              // Jedes Dokument bekommt ein li-Tag und 
        let name = document.createElement('span');           // span-Tag zugeteilt --> für CSS
        let area = document.createElement('span');
        let list = document.createElement('b');


        li.setAttribute('data-id', doc.id); // Das jeweilige Dokument erhält eine eigene ID
        name.textContent = doc.data().name; //Name vom Dokument wird entnommen
        area.textContent = doc.data().area;
        list.textContent = 'add';

        li.appendChild(name);           
        li.appendChild(area);
        li.appendChild(list)         
          

        exerciseList.appendChild(li);
}

db.collection('routine').orderBy('name').onSnapshot(snapshot =>{
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

list.addEventListener('click', (evt) => {
    let id = evt.target.parentElement.getAttribute('data-id');
    db.collection('routine').doc(id).data().add();

    })

    db.collection('routine').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
    })
})
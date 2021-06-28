//listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        console.log('user logged in:', user);
    } else {
        console.log('user logged out');
    }
})

//sign up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //informationen aus dem textfields
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //speichern der daten in firebase
    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        console.log(cred.user)
        $('#modal-signup').modal('hide');
        signupForm.reset();
    })
})

//log in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred => {
        console.log(cred.user)
        $('#modal-signup').modal('hide');
        loginForm.reset();
    })
})

//logout

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
    })
})




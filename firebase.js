
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAaH2OpCrvpbZ7WtyWhpGxdf8pB43efjAI",
    authDomain: "mini-project1-56835.firebaseapp.com",
    projectId: "mini-project1-56835",
    storageBucket: "mini-project1-56835.appspot.com",
    messagingSenderId: "522001607958",
    appId: "1:522001607958:web:22fb9b120cca87f9a83437"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

var signup = document.getElementById('signup');
signup.addEventListener('click', (e) => {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    console.log(email);

    if (validate_email(email) == false) {
        alert('Email is not valid');
        return;
    }
    if (validate_password(password) == false) {
        alert('Password is not valid');
        return;
    }
    if(validate_fields(username)==false){
        alert('invalid name');
        return;
    }



    createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user;

        set(ref(database, 'user/' + user.uid), {
            email: email,
            username: username,
            last_login: Date.now()
        });
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('username').value = "";

        alert('user created');
    }).catch((error) => {
        const errCode = error.code;
        const message = error.message;
        alert(message);
    })


})


const login = document.getElementById('log');
login.addEventListener('click', (e)=>{
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user;

        update(ref(database, 'users/' + user.uid), {
            last_login: Date.now()
        })

        
        window.location.assign('index.html');
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        alert('logged in successfully');


    }).catch((error) => {
        const errCode = error.code;
        const errMessage = error.message;
        alert(errMessage);
    })
});



function validate_email(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
        return true;
    } else {
        return false;
    }
}

function validate_password(password) {
    if (password.length < 6) {
        return false;
    } else {
        return true;
    }
}

function validate_fields(field) {
    if (field == null) {
        alert('name cannot be empty');
        return false;
    }

    if (field.length <= 0) {
        alert('name cannot be empty');
        return false;
    } else {
        // return true;
        let expression = /^[A-Za-z]+$/;
        if (expression.test(field) == true) {
            return true;
        } else {
            alert('only letter are allowed in name');
            return false;
        }
    }
}



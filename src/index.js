
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN4KB82aEF-f1jQsu_41Os_QcMH9EAqhA",
  authDomain: "brookx3-73468.firebaseapp.com",
  databaseURL: "https://brookx3-73468-default-rtdb.firebaseio.com",
  projectId: "brookx3-73468",
  storageBucket: "brookx3-73468.appspot.com",
  messagingSenderId: "1004382599882",
  appId: "1:1004382599882:web:ddc82414810326d2855233"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  money = "0"

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is incorrect!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) {
    alert('User name is to short!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      total : money,
      last_login : Date.now()
    }


    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data);

    localStorage.setItem('user' , user.uid);

    // DOne
    setTimeout(function() {
      window.location.href = "/pages/home.html";
    }, 1500);
    
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password incorrect!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    localStorage.setItem('user' , user.uid)

    // DOne

    setTimeout(function() {
      window.location.href = "/pages/home.html";
    }, 1000);
    

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
function licence() {
  window.location.href = "/licence.html"
}
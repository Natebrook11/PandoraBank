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
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

var value = localStorage.getItem("user");

var senderRef = firebase.database().ref('users/' + value + '/total');
var receiverRef = firebase.database().ref('users/');

// Get a reference to the HTML elements
var countDisplay = $('#total');
var incrementBtn = $('#increment-btn');

window.addEventListener('load', console.log(localStorage.getItem('user')));


// Display the current count and animate the count increase from 0 to the current value
senderRef.once('value', function (snapshot) {
    var count = snapshot.val();
    localStorage.setItem('count', count)
    countDisplay.prop('Counter', 0).animate({ Counter: count }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
            localStorage.setItem('count', count)
            countDisplay.text('Total: ' + Math.ceil(now).toLocaleString() + ' 🪙'); // Add locale string to the count
        }
    })
});

function show(value) {
    document.getElementById(value).classList.toggle('show');
}

window.addEventListener('load', document.getElementById('userId').innerHTML = localStorage.getItem('user'));



// Always update the count when there are changes
senderRef.on('value', function (snapshot) {
    var count = snapshot.val();
    var countlocal = 'Total: ' + count.toLocaleString() + '🪙';
    countDisplay.text(countlocal); // Add locale string to the count
});
function transfer() {
    const sender = localStorage.getItem("user");
    const receiver = document.getElementById('receiver').value;
    const amount = parseInt(document.getElementById('amount').value);

    // Check if the sender has sufficient balance
    senderRef.once('value', function (snapshot) {
        var senderBalance = snapshot.val();
        if (senderBalance >= amount) {
            // Deduct the amount from the sender's account
            senderRef.set(senderBalance - amount);

            // Add the amount to the receiver's account
            receiverRef.child(receiver + '/total').once('value', function (snapshot) {
                var receiverBalance = snapshot.val();
                receiverRef.child(receiver + '/total').set(receiverBalance + amount);
            });

            alert('Amount transferred successfully!');
        } else {
            alert('Insufficient balance!');
        }
    });
}


function copyToClipboard(text) {
    const localStorageItem = text;
    const textToCopy = localStorage.getItem(localStorageItem);

    if (textToCopy) {
        const input = document.createElement('textarea');
        input.value = textToCopy;
        document.body.appendChild(input);

        input.select();
        input.setSelectionRange(0, 99999); // For mobile devices

        document.execCommand('copy');

        document.body.removeChild(input);

        const copyButton = document.querySelector('.copy');
        copyButton.classList.add('clicked');
        setTimeout(function () {
            copyButton.classList.remove('clicked');
        }, 5000);

    } else {
        alert('No text found in localStorage item: ' + localStorageItem);
    }
}








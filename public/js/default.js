$(document).ready(() => {

    const firebaseConfig = {
		apiKey: "AIzaSyBvR9zIex4BTKbmAu7mRhboQRqYuwjDUlo",
		authDomain: "gift-list-c5892.firebaseapp.com",
		databaseURL: "https://gift-list-c5892-default-rtdb.firebaseio.com",
		projectId: "gift-list-c5892",
		storageBucket: "gift-list-c5892.appspot.com",
		messagingSenderId: "276664561455",
		appId: "1:276664561455:web:648463c82de008559dfbda",
		measurementId: "G-CYHS7MBKSP"
	};

    // Inicializa Firebase con la configuración
    firebase.initializeApp(firebaseConfig);

	$.ajax({
		url: "login.html",
		dataType: "html"
	}).done(data => {
		$('body').append(data)
	})
})
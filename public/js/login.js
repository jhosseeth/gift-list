
const usersData = data => {
	const usersId = Object.keys(data)
	let usersCounter = 0
	return usersId.map(userId => {
		return {
			id: ++usersCounter,
			name: data[userId].name,
			email: data[userId].email
		}
	})
}

const showUsers = users => {
	users.forEach(user => {
		const userTpl = $('#user').contents().clone()

		userTpl
			.attr('id', user.id)
			.attr('data-email', user.email)
			.attr('data-name', user.name)
			.html(user.name)
			.on('click', selectUser)

		$('#users').append(userTpl)
	})
}

const selectUser = e => {
	const userId = e.target.id
	const name = e.target.dataset.name
	const email = e.target.dataset.email
	const submit = function(e) {
		e.preventDefault()
		const formData = new FormData(this)
		const password = formData.get('password')
		const userData = { name, email, password }
		login(userData)
	}

	$('#signIn').show().on('submit', submit)
}

const login = async (user) => {
	const logged = await authenticate(user)
	if (logged) goToHomePage()
}

const authenticate = ({ name, email, password }) => {
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				window.currentUser = {
					id: userCredential.user.uid,
					name: name
				}
				resolve(true)
			})
			.catch((error) => {
				console.error(error)
				reject(false)
			});
	})
}

const goToHomePage = () => {
	$.ajax({
		url: "./home.html",
		dataType: "html"
	}).done(data => {
		$('body').html(data)
	})
}

const usersRef = firebase.database().ref('users')

usersRef.get().then(snapshot => {
	if (snapshot.exists()) {
		const users = usersData(snapshot.val())
		showUsers(users)
  	} else {
    	console.log("No data available");
	}
}).catch((error) => {
	console.error(error);
});
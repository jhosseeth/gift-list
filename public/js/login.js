
const giftsRef = firebase.database().ref('gifts')

const usersData = data => {
	const usersId = Object.keys(data)
	return usersId.map(userId => {
		return {
			id: userId,
			name: data[userId].name
		}
	})
}

const showUsers = users => {
	users.forEach(user => {

		const userTpl = $('#user').contents().clone()

		userTpl.attr('id', user.id).html(user.name)
    	console.log('user: ', user)

		$('#users').append(userTpl)
	})
}

giftsRef.get().then(snapshot => {
	if (snapshot.exists()) {
		const users = usersData(snapshot.val())
		showUsers(users)
  	} else {
    	console.log("No data available");
	}
}).catch((error) => {
	console.error(error);
});
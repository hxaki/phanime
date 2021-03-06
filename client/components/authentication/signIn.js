Template.signIn.events({
	'click #signInButton': function(event, template) {
		event.preventDefault();
		// Get input

		// We are using toLowerCase to ensure any version of the username will
		// log the user in.
		var identification = $('#identification').val().toLowerCase();
		var password = $('#password').val();


		// Get template data
		var data = template.data;

		// Check if the login request is coming from discourse or not
		Meteor.loginWithPassword(identification, password, function(error) {
			var currentRouteName = Router.current().route.name;

			if (error) {
				Notifications.error('Login Unsuccessful', 'Username or password is invalid');
			} else {
				// Check if the login request is coming from discourse or not
				if (data.sso && data.sig) {

					var user = Meteor.user();

					console.log(user.avatarImageUrl());

					user.avatarImageUrl = user.avatarImageUrl();

					// Temporary way to send the user to the right place after verification
					Meteor.call('discourseSSO', data.sso, data.sig, user, function (error, result) {
						console.log(result);
						if (result) {
							window.location = result;
						}
					});

				} else {

					// Let's authenticate the user in discourse as well
					// This will direct us to /community/sso route where the
					// discourse authentication will be done, that route will then
					// eventually lead to the index route


					if (Meteor.settings.public.enableDiscourseAuth === true) {
						window.location = "http://community.phanime.com/session/sso?return_path=http://phanime.com/";
					} else {
						Router.go('dashboard');
					}


				}

			}

		});

	}
});

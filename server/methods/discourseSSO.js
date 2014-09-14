Meteor.methods({
	discourseSSO: function(payload, sig, user) {
		var sso = new discourse_sso(privateSiteSettings.discourseSSOKey);
		var nonce;
		// validate sig with payload
		if (sso.validate(payload, sig)) {
			var nonce = sso.getNonce(payload);
			console.log(nonce);

			var userParams = {
				"nonce": nonce,
				"external_id": user._id,
				"email": user.emails[0].address, // we just grab the first address
				"username": user.username,
				"name": (user.profile) ? user.profile.name : ''  
			};

			var queryParams = sso.buildLoginString(userParams);
			console.log(queryParams);
			var returnUrl = "http://community.phanime.com/session/sso_login?" + queryParams;


			return returnUrl;
		}
	}
});
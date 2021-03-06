SyncedCron.add({
	name: 'Calculate ratings for anime',
	schedule: function(parser) {
		// parser is a later.parse object
		return parser.text('every 24 hours');
	}, 
	job: function() {
		Anime.find().forEach(function(anime) {
			Meteor.call('calculateAnimeRatingById', anime._id, function(error, results) {
				if (!error) {
					return "Finished";
				}
			});
		});
	}
});
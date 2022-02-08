const eventsModel = require("../models/events");

exports.getEvents = async function(req, res) {
	const events = await eventsModel.getEvents(req.queryParams).catch((error) => {
		console.error(error);
		res.status(500).json(error);
	});

	if(events){
		res.json(events);
	}
}
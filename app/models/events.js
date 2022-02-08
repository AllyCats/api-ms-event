'use strict';

const db = require("../helpers/db");
const mysql = require("mysql");

let event = function(event){
	this.id = event.id;
	this.uuid = event.uuid;
	this.created = event.created;
	this.updated = event.updated;
	this.name = event.name;
	this.startDateTime = event.startDateTime;
	this.endDateTime = event.endDateTime;
	this.user = {
		uuid: event.userUuid,
		nickName: event.userNickName,
		avatar: event.userAvater
	};
}

module.exports = event;

let select = `
SELECT
	e.id,
	e.uuid,
	e.created,
	e.updated,
	e.name,
	e.startDateTime,
	e.endDateTime,
	u.uuid as userUuid,
	u.avatar as userAvater,
	u.nickName as userNickName
FROM events e
LEFT JOIN users u
ON e.userId = u.id`

event.getEvents = async function (queryParams) {
	let where = ``;
	if(queryParams){
		where += ` WHERE e.id IS NOT NULL`;
	}

	let limit = queryParams.limit ? Number(queryParams.limit) : 100;

	let limitString = ` LIMIT ${limit}`;

	let offset = queryParams.page ? ((Number(queryParams.page) - 1) * limit) : 0;

	let offsetString = ` OFFSET ${offset}`;
	
	return new Promise((resolve, reject) => {
			db.query(select + where + limitString + offsetString,
					[],
					(err, results) => {
						if(err){
							console.error(err);
							reject({ message: 'Failed to get events: Unexpected database error' });
						}else{
							let events = [];
							for(let e of results){
								events.push(new event(e));
							}
							resolve(events);
						}
					}
			);
	});
}
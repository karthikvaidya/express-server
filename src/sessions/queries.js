module.exports = {
	insert: {
		session:
			'insert into sessions (session_id, user_id, token, start_time, device_info, expiration_time, type) values ($1, $2, $3, $4, $5, $6, $7)',
	},
	update: {},
	select: {
		id:
			'select user_id as "userId", session_id as "sessionId", token, status, start_time as "startTime", device_info as "deviceInfo", expiration_time as "expirationTime" from sessions where session_id = $1 and type = $2',
		token:
			'select user_id as "userId", session_id as "sessionId", token, status, start_time as "startTime", expiration_time as "expirationTime" from sessions where token = $1 and type = $2',
	},
};

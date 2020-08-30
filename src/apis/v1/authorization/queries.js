module.exports = {
	insert: {
		user:
			'insert into users (email, user_id, user_role, last_name, password, first_name, role_id, phone_number, country_code, full_name) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
	},
	select: {
		email:
			'select user_id as "userId", first_name as "firstName", last_name as "lastName", user_role as "role", password from users where email = $1 and is_deleted is false',
		userRole: 'select role_id as "roleId" from roles where role = $1',
		ensure: {
			byId: 'select user_id as "userId" from users where user_id = $1',
			byEmail: 'select user_id as "userId" from users where email = $1',
		},
	},
};

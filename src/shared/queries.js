module.exports = {
	select: {
		role:
			'select role, role_id as "roleId", permissions from roles where role = $1',
		userId:
			'select user_id as "userId", role from users where user_id = $1 and is_deleted = $2',
	},
};

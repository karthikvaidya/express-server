const ENVS = {
	dev: 'dev',
	prod: 'prod',
	local: 'local',
	staging: 'staging',
};

const USER_ROLES = ['user', 'admin'];
const COMPLEXITIES = ['low', 'mid', 'high'];
const VALID_STATUS = ['rejected', 'approved', 'pending'];
const STORY_TYPES = ['enhancement', 'bugfix', 'development', 'qa'];

module.exports = {
	ENVS,
	USER_ROLES,
	STORY_TYPES,
	COMPLEXITIES,
	VALID_STATUS,
};

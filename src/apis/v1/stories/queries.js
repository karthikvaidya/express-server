module.exports = {
	insert: {
		story:
			'insert into stories (name, cost, status, user_id, story_id, summary, story_type, complexity, description, estimated_time) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
	},
	select: {
		story:
			'select user_id as "userId" from stories where story_id = $1 and is_deleted is false',
		list: {
			user:
				'select story_id as "storyId", user_id as "userId", summary, description, story_type as "storyType", complexity, estimated_time as "estimatedTime", cost, status from stories where user_id = $3 and is_deleted is false order by creation_dt limit $1 offset $2',
			admin:
				'select story_id as "storyId", user_id as "userId", summary, description, story_type as "storyType", complexity, estimated_time as "estimatedTime", cost, status from stories where is_deleted is false order by creation_dt limit $1 offset $2',
		},
	},
	count: {
		user:
			'select count(story_id) from stories where user_id = $1 and is_deleted is false',
		admin: 'select count(story_id) from stories where is_deleted is false',
	},
};

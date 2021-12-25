const list = [];
const count = 0;
const error = null;

export default function (state = { list, count, error }, action) {
	switch (action.type) {
		case 'LIST_COMMENTS_BY_ARTICLE': return { ...state, list: action.list, count: action.count };
		case 'CREATE_COMMENT':
			{
				const { comment } = action;
				const { parentCommentId } = comment;
				if (!parentCommentId) {
					return { ...state, list: [...state.list, { ...comment, subcomments: [] }], count: state.count + 1, error: null };
				}
				const newlist = state.list.map((thread) => {
					if (thread._id != parentCommentId) {
						return thread;
					}
					thread.subcomments = [comment, ...thread.subcomments];
					return thread;
				});
				return { ...state, list: newlist, count: state.count + 1, error: null };
			}
		case 'CREATE_COMMENT_ERROR': return { ...state, error: action.error };
		default: return state;
	}
};

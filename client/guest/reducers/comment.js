const list = [];
const count = 0;
const error = null;

export default function (state = { list, count, error }, action) {
	switch (action.type) {
		case 'LIST_COMMENTS_BY_ARTICLE': return { ...state, list: action.list, count: action.count };
		case 'CREATE_COMMENT': return { ...state, list: [...state.list, action.comment], count: count++, error: null };
		case 'CREATE_COMMENT_ERROR': return { ...state, error: action.error };
		default: return state;
	}
};

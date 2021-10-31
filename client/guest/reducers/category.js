const list = [];
const current = null;

export default function (state = { list, current }, action) {
	switch (action.type) {
		case 'LIST_CATEGORIES': return { ...state, list: action.list };
		case 'GET_CATEGORY_BY_NAME': return { ...state, current: action.category };
		default: return state;
	}
};

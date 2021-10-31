function listCategoriesSuccess(list) {
	return { type: 'LIST_CATEGORIES', list };
};

export function listCategories() {
	return async (dispatch) => {
		const response = await fetch(`/api/categories`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(listCategoriesSuccess(responseJson.result));
	};
};

function getCategoryByNameSuccess(category) {
	return { type: 'GET_CATEGORY_BY_NAME', category };
};

export function getCategoryByName(name) {
	return async (dispatch) => {
		const response = await fetch(`/api/categories/name/${name}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(getCategoryByNameSuccess(responseJson.result));
	};
};

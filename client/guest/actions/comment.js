function createCommentSuccess(comment) {
	return { type: 'CREATE_COMMENT', comment };
};

function createCommentError(response) {
	return { type: 'CREATE_COMMENT_ERROR', error: response.error };
}

export function createComment(articleTitle, comment) {
	return async (dispatch) => {
		const response = await fetch(`/api/articles/title/${articleTitle}/comments`, {
			credentials: 'same-origin',
			method: 'post',
			body: JSON.stringify(comment),
			headers: { 'Content-Type': 'application/json' }
		});
		if (response.ok) {
			const responseJson = await response.json();
			return dispatch(createCommentSuccess(responseJson.result));
		}
		const error = await response.text();
		return dispatch(createCommentError(JSON.parse(error)));
	};
};

function listCommentsByArticleSuccess(list, count) {
	return { type: 'LIST_COMMENTS_BY_ARTICLE', list, count };
};

export function listCommentsByArticle(articleTitle) {
	return async (dispatch) => {
		const response = await fetch(`/api/articles/title/${articleTitle}/comments`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(listCommentsByArticleSuccess(responseJson.result, responseJson.count));
	};
};

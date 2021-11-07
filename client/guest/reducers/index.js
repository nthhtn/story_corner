import { combineReducers } from 'redux';

import article from './article';
import user from './user';
import category from './category';
import comment from './comment';

export default combineReducers({ article, user, category, comment });

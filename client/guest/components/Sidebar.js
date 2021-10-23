import React, { Component } from 'react';
import qs from 'qs';

import { listCategories } from '../actions/category';

var self;

export default class Sidebar extends Component {

	constructor(props) {
		super(props);
		const query = qs.parse(this.props.location?.search, { ignoreQueryPrefix: true });
		const category = query.category ? query.category.split(',') : [];
		this.state = {
			selected: category,
			keyword: query.keyword || ''
		};
		self = this;
	}

	render() {
		return (
			<aside id="secondary" className="widget-area" role="complementary">
				<section id="search-4" className="widget widget_search"><h2 className="widget-title">Tìm kiếm</h2>
					<div role="search" className="search-form">
						<label>
							<span className="screen-reader-text">Tìm kiếm cho:</span>
							<input type="search" className="search-field" placeholder="Tìm kiếm …" value="" name="s" />
						</label>
						<input type="submit" className="search-submit" value="Tìm kiếm" />
					</div>
				</section>
			</aside>
		);
	}

}

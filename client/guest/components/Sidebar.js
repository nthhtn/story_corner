import React, { Component } from 'react';
import qs from 'qs';

var self;

export default class Sidebar extends Component {

	constructor(props) {
		super(props);
		const query = qs.parse(this.props.location?.search, { ignoreQueryPrefix: true });
		this.state = {
			keyword: query.keyword || ''
		};
		self = this;
	}

	triggerSearch(e) {
		e.preventDefault();
		const keyword = $('#search-keyword').val();
		if (keyword.length < 3) {
			return;
		}
		window.open(
			`/articles/search?keyword=${keyword}`,
			'_blank'
		);
	}

	render() {
		return (
			<aside id="secondary" className="widget-area" role="complementary">
				<section id="search-4" className="widget widget_search"><h2 className="widget-title">Tìm kiếm</h2>
					<div role="search" className="search-form">
						<label>
							<span className="screen-reader-text">Tìm kiếm cho:</span>
							<input type="search" className="search-field" id="search-keyword" placeholder="Tìm kiếm…"
								onKeyUp={(e) => {
									if (e.key === 'Enter') { $('#search-button').trigger('click'); }
								}} />
						</label>
						<input type="submit" className="search-submit" id="search-button" value="Tìm kiếm" onClick={this.triggerSearch.bind(this)}>
						</input>
					</div>
				</section>
			</aside>
		);
	}

}

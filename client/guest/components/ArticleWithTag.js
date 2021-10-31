import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ReactHtmlParser from 'react-html-parser';
import { Helmet } from 'react-helmet';

import { listArticlesByTag } from '../actions/article';
import Sidebar from './Sidebar';
import ArticleItem from './ArticleItem';

export default class ArticleWithTag extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activePage: 1,
			tag: this.props.match.params.tag
		};
	}

	async componentDidMount() {
		await this.props.dispatch(listArticlesByTag(this.state.tag, 1, 5));
	}

	async onPageChange(page) {
		await this.props.dispatch(listArticlesByTag(this.state.tag, page, 5));
		this.setState({ activePage: page });
		scrollToElement('articles-wrapper');
	}

	render() {
		return (
			<div id="content" className="site-content">
				<div className="wrap">
					<div id="primary" className="content-area">
						<main id="main" className="site-main" role="main">

							<header className="page-header">
								<h1 className="page-title">Danh mục: <span>{this.state.tag}</span></h1>
							</header>

							{this.props.article.list.map((item, i) => {
								const components = [<ArticleItem {...item} key={item._id} />];
								if (i < this.props.article.list.length - 1) {
									const separator = <div className="separator" key={"separator" + item._id}><svg className="pencil-sharpener" version="1.1" x="0px" y="0px"
										width="48px" height="79.5px" viewBox="0 0 48 79.5"
										style={{ enableBackground: "new 0 0 48 79.5" }} aria-hidden="true">
										<g>
											<path className="sharpener0"
												d="M42.7,39.8c0-8.2,1.9-15.9,5.3-22.8V0H0v17c3.4,6.9,5.3,14.6,5.3,22.8S3.4,55.6,0,62.5v17h48v-17C44.6,55.6,42.7,47.9,42.7,39.8z" />
											<g>
												<path className="sharpener1"
													d="M24,13.2L24,13.2c-5.4,0-9.8,4.4-9.8,9.7v56.5h19.5V23C33.7,17.6,29.4,13.2,24,13.2z" />
												<path className="sharpener2"
													d="M24,13.2c-5.4,0-9.8,4.4-9.8,9.8v56.5h11V13.3C24.8,13.3,24.4,13.2,24,13.2z" />
												<path className="sharpener3" d="M28.4,14.3c-1-0.5-2-0.8-3.2-1v66.2h3.2V14.3z" />
												<g>
													<circle className="sharpener0" cx="19.6" cy="45.2" r="3.6" />
													<path className="sharpener1"
														d="M16.7,47.3c0.1,0.2,0.3,0.4,0.5,0.6c0.2,0.2,0.4,0.3,0.6,0.4l4.6-5.3c-0.1-0.2-0.3-0.4-0.5-0.6s-0.4-0.3-0.6-0.4L16.7,47.3z" />
												</g>
											</g>
										</g>
									</svg>
									</div>;
									components.push(separator);
								}
								return components;
							})}

						</main>
					</div>
					<Sidebar />
				</div>
			</div>
		);
	}

}

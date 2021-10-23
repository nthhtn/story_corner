import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ReactHtmlParser from 'react-html-parser';

import { listArticles } from '../actions/article';
import Sidebar from './Sidebar';

class ArticleItem extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const { _id, title, content, coverImg, createdAt, categoryId } = this.props;
		return (
			<article id="post-3000"
				className="post-3000 post type-post status-publish format-standard has-post-thumbnail hentry category-tan-man tag-tanman">

				<div className="featured-image">
					<a href={`/articles/${title}`}>
						<svg className="paperclip" version="1.1" id="Layer_1" x="0px" y="0px" width="168px"
							height="569px" viewBox="0 0 168 569" style={{ "enableBackground": "new 0 0 168 569" }}
							aria-hidden="true">
							<path className="paperclip0"
								d="M96,0C49.7,0,24,37.7,24,84v63l18,6V84c0-36.4,17.6-66,54-66s54,29.6,54,66v401c0,36.4-29.6,66-66,66s-66-29.6-66-66V285H0v200c0,46.3,37.7,84,84,84s84-37.7,84-84V84C168,37.7,142.3,0,96,0z" />
						</svg>
						<img width="1000" height="627"
							src={coverImg}
							className="attachment-scratchpad-featured size-scratchpad-featured wp-post-image"
							alt="" loading="lazy"
							srcSet="https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-1000x627.jpg 1000w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-300x188.jpg 300w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-700x439.jpg 700w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-768x482.jpg 768w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-1536x964.jpg 1536w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-478x300.jpg 478w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462.jpg 2048w"
							sizes="(max-width: 1000px) 100vw, 1000px" data-attachment-id="3012"
							data-permalink="https://gocnhoannie.com/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-2/"
							data-orig-file="https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462.jpg"
							data-orig-size="2048,1285" data-comments-opened="1"
							data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;}"
							data-image-title="Nghỉ ngơi cũng là một phần của quá trình"
							data-image-description="" data-image-caption=""
							data-medium-file="https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-300x188.jpg"
							data-large-file="https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-700x439.jpg" />
					</a>
				</div>

				<header className="entry-header">
					<span className="cat-links"><span className="screen-reader-text">Posted in&nbsp;</span> <a
						href={"/articles/category/" + categoryId.displayName} rel="category tag">{categoryId.displayName}</a></span>
					<h2 className="entry-title"><a
						href={"/articles/" + title}
						rel="bookmark">{title}</a></h2>
					<div className="entry-meta">
						<span className="posted-on">
							<a href="https://gocnhoannie.com/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh/" rel="bookmark">
								<time className="entry-date published" dateTime={createdAt}>{createdAt}</time>
								<time className="updated" dateTime={createdAt}>{createdAt}</time></a></span><span className="byline"> by&nbsp;
							<span className="author vcard"><a className="url fn n" href={"/articles/" + title}>Annie</a></span>
						</span>
					</div>
				</header>

				<div className="entry-content">

					<p>{ReactHtmlParser(content)}
						<a href={"/articles/" + title} className="more-link">
							Continue reading
							<span className="screen-reader-text">&#8220;{title}&#8221;</span>
							<span className="meta-nav">&rarr;</span></a>
					</p>
				</div>

			</article>
		);
	}

}

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = { activePage: 1 };
	}

	async componentDidMount() {
		await this.props.dispatch(listArticles(1, 5));
	}

	render() {
		return (
			<div id="content" className="site-content">
				<div className="wrap">
					<div id="primary" className="content-area">
						<main id="main" className="site-main" role="main">

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

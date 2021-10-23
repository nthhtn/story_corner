import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Helmet } from 'react-helmet';

import { getArticleByTitle } from '../actions/article';
import Sidebar from './Sidebar';

export default class ArticleDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: this.props.match.params.title
		};
	}

	async componentDidMount() {
		await this.props.dispatch(getArticleByTitle(this.state.title));
	}

	render() {
		const { current } = this.props.article;
		console.log(current);
		return (
			<div id="content" className="site-content single">
				<div className="wrap">
					<div id="primary" className="content-area">
						<main id="main" className="site-main" role="main">
							<article id="post-3000" className="post-3000 post type-post status-publish format-standard has-post-thumbnail hentry category-tan-man tag-tanman">
								<div className="featured-image">
									<span>
										<svg className="paperclip" version="1.1" id="Layer_1" x="0px" y="0px" width="168px" height="569px" viewBox="0 0 168 569" style={{ enableBackground: "new 0 0 168 569" }} aria-hidden="true">
											<path className="paperclip0" d="M96,0C49.7,0,24,37.7,24,84v63l18,6V84c0-36.4,17.6-66,54-66s54,29.6,54,66v401c0,36.4-29.6,66-66,66s-66-29.6-66-66V285H0v200c0,46.3,37.7,84,84,84s84-37.7,84-84V84C168,37.7,142.3,0,96,0z"></path>
										</svg>
										<img width="1000" height="627" src="https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-1000x627.jpg" className="attachment-scratchpad-featured size-scratchpad-featured wp-post-image" alt="" loading="lazy" srcSet="https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-1000x627.jpg 1000w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-300x188.jpg 300w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-700x439.jpg 700w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-768x482.jpg 768w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-1536x964.jpg 1536w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-478x300.jpg 478w, https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462.jpg 2048w" sizes="(max-width: 1000px) 100vw, 1000px" data-attachment-id="3012" data-permalink="https://gocnhoannie.com/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-2/" data-orig-file="https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462.jpg" data-orig-size="2048,1285" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;}" data-image-title="Nghỉ ngơi cũng là một phần của quá trình" data-image-description="" data-image-caption="" data-medium-file="https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-300x188.jpg" data-large-file="https://gocnhoannie.com/wp-content/uploads/2021/09/Nghi-ngoi-cung-la-mot-phan-cua-qua-trinh-e1631717338462-700x439.jpg" />			</span>
								</div>

								<header className="entry-header">
									<span className="cat-links"><span className="screen-reader-text">Posted in&nbsp;</span>
										<a href={"/articles/category/" + current?.categoryId.displayName} rel="category tag">{current?.categoryId.displayName}</a>
									</span>
									<h1 className="entry-title">{current?.title}</h1>
									<div className="entry-meta">
										<span className="posted-on">Posted on <a href={"/articles/" + current?.title} rel="bookmark">
											<time className="entry-date published" dateTime={current?.createdAt}>{current?.createdAt}</time>
											<time className="updated" dateTime="2021-09-17T09:05:02+07:00">Tháng Chín 17, 2021</time></a>
										</span>
										<span className="byline"> by
											<span className="author vcard">
												<a className="url fn n" href="/">{current?.authorId.fullName}</a>
											</span>
										</span>
									</div>
								</header>

								<div className="entry-content">
									{ReactHtmlParser(current?.content)}
									{/* <div className="sharedaddy sd-sharing-enabled"><div className="robots-nocontent sd-block sd-social sd-social-icon-text sd-sharing"><h3 className="sd-title">Share this:</h3><div className="sd-content"><ul data-sharing-events-added="true"><li className="share-twitter"><a rel="nofollow noopener noreferrer" data-shared="sharing-twitter-3000" className="share-twitter sd-button share-icon" href="https://gocnhoannie.com/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh/?share=twitter&amp;nb=1" target="_blank" title="Click to share on Twitter"><span>Twitter</span></a></li><li className="share-facebook"><a rel="nofollow noopener noreferrer" data-shared="sharing-facebook-3000" className="share-facebook sd-button share-icon" href="https://gocnhoannie.com/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh/?share=facebook&amp;nb=1" target="_blank" title="Click to share on Facebook"><span>Facebook</span></a></li><li className="share-end"></li></ul></div></div></div><div className="sharedaddy sd-block sd-like jetpack-likes-widget-wrapper jetpack-likes-widget-loaded" id="like-post-wrapper-164634405-3000-616a339a5f629" data-src="https://widgets.wp.com/likes/#blog_id=164634405&amp;post_id=3000&amp;origin=gocnhoannie.com&amp;obj_id=164634405-3000-616a339a5f629" data-name="like-post-frame-164634405-3000-616a339a5f629" data-title="Like or Reblog"><h3 className="sd-title">Like this:</h3><div className="likes-widget-placeholder post-likes-widget-placeholder" style={{ height: 55, display: "none" }}><span className="button"><span>Like</span></span> <span className="loading">Loading...</span></div><iframe className="post-likes-widget jetpack-likes-widget" name="like-post-frame-164634405-3000-616a339a5f629" src="https://widgets.wp.com/likes/#blog_id=164634405&amp;post_id=3000&amp;origin=gocnhoannie.com&amp;obj_id=164634405-3000-616a339a5f629" height="55px" width="100%" frameBorder="0" scrolling="no" title="Like or Reblog"></iframe><span className="sd-text-color"></span><a className="sd-link-color"></a></div>
									<div id="jp-relatedposts" className="jp-relatedposts" style={{ display: "block" }}>
										<h3 className="jp-relatedposts-headline"><em>Related</em></h3>
										<div className="jp-relatedposts-items jp-relatedposts-items-visual jp-relatedposts-grid ">
											<div className="jp-relatedposts-post jp-relatedposts-post0 jp-relatedposts-post-thumbs" data-post-id="2854" data-post-format="false">
												<a className="jp-relatedposts-post-a" href="https://gocnhoannie.com/nhin-lai-2020-mot-nam-day-bien-dong/" title="Nhìn lại 2020 – Một năm đầy biến động" data-origin="3000" data-position="0">
													<img className="jp-relatedposts-post-img" loading="lazy" src="https://i1.wp.com/gocnhoannie.com/wp-content/uploads/2021/01/Tam-biet-2020-Mot-nam-day-bien-dong.jpg?resize=350%2C200&amp;ssl=1" width="350" height="200" alt="Góc nhỏ của Annie - Tạm biệt 2020 - Một năm đầy biến động" />
												</a>
												<h4 className="jp-relatedposts-post-title">
													<a className="jp-relatedposts-post-a" href="https://gocnhoannie.com/nhin-lai-2020-mot-nam-day-bien-dong/" title="Nhìn lại 2020 – Một năm đầy biến động" data-origin="3000" data-position="0">Nhìn lại 2020 – Một năm đầy biến động</a>
												</h4>
											</div>
										</div>
									</div> */}

								</div>


								<div className="author-info clear">
									<div className="author-avatar">
										<span className="avatar-container"><img alt="" src={current?.authorId.avatar} className="avatar avatar-100 photo" height="100" width="100" loading="lazy" /></span>	</div>

									<div className="author-description">
										<h2 className="author-title">
											<span className="author-heading">Author:&nbsp;</span>
											<a href="https://gocnhoannie.com/author/gocnhoannie/" rel="author">{current?.authorId.fullName}</a>
										</h2>

										<p className="author-bio">
											<a className="author-link" href="https://gocnhoannie.com/author/gocnhoannie/" rel="author">View All Posts</a>
										</p>
									</div>
								</div>

								<footer className="entry-footer">
									<span className="tags-links">
										<span className="tags-header">Tagged:&nbsp;</span>
										{current?.tags.map((tag) => (<a href="https://gocnhoannie.com/tag/tanman/" rel="tag" key={tag._id}>#{tag.tagValue}&nbsp;</a>))}
									</span>
								</footer>
							</article>
						</main>
					</div>
				
					<Sidebar />
				</div>
			</div>
		);
	}

}
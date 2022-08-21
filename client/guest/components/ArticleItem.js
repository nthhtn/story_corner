import React, { Component } from 'react';

import { getBriefHtmlContent } from '../helpers';

export default class ArticleItem extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		let { _id, title, content, coverImg, createdAt, categoryId } = this.props;
		console.log(this.props);
		let titleUrl = encodeURIComponent(title);
		return (
			<article id="post-3000"
				className="post-3000 post type-post status-publish format-standard has-post-thumbnail hentry category-tan-man tag-tanman">

				<div className="featured-image">
					<a href={`/articles/${titleUrl}`}>
						<svg className="paperclip" version="1.1" id="Layer_1" x="0px" y="0px" width="168px"
							height="569px" viewBox="0 0 168 569" style={{ "enableBackground": "new 0 0 168 569" }}
							aria-hidden="true">
							<path className="paperclip0"
								d="M96,0C49.7,0,24,37.7,24,84v63l18,6V84c0-36.4,17.6-66,54-66s54,29.6,54,66v401c0,36.4-29.6,66-66,66s-66-29.6-66-66V285H0v200c0,46.3,37.7,84,84,84s84-37.7,84-84V84C168,37.7,142.3,0,96,0z" />
						</svg>
						<img maxwidth="1000" maxheight="627"
							src={coverImg}
							className="attachment-scratchpad-featured size-scratchpad-featured wp-post-image"
							alt="" loading="lazy"
							srcSet={coverImg}
							data-permalink={`/articles/${titleUrl}`}
							data-orig-file={coverImg}
							data-image-title={title}
						/>
					</a>
				</div>

				<header className="entry-header">
					<span className="cat-links"><span className="screen-reader-text">Posted in&nbsp;</span> <a
						href={"/articles/category/" + categoryId.name} rel="category tag">{categoryId.displayName}</a></span>
					<h2 className="entry-title"><a
						href={"/articles/" + titleUrl}
						rel="bookmark">{title}</a></h2>
					<div className="entry-meta">
						<span className="posted-on">
							<a href={"articles/" + titleUrl} rel="bookmark">Posted on&nbsp;
								<time className="entry-date published" dateTime={createdAt}>{$.format.date(createdAt, "dd/MM/yyyy")}</time>
								<time className="updated" dateTime={createdAt}>{createdAt}</time></a></span><span className="byline">
									{/* by&nbsp;
							<span className="author vcard"><a className="url fn n" href={"/articles/" + titleUrl}>Annie</a></span> */}
						</span>
					</div>
				</header>

				<div className="entry-content">

					<p>{getBriefHtmlContent(content)}
						<a href={"/articles/" + titleUrl} className="more-link">
							Đọc tiếp
							<span className="screen-reader-text">&#8220;{title}&#8221;</span>
							<span className="meta-nav">&rarr;</span></a>
					</p>
				</div>

			</article>
		);
	}

}

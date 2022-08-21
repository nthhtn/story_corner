import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

import { getArticleByTitle } from '../actions/article';
import { listCommentsByArticle, createComment } from '../actions/comment';
import Sidebar from './Sidebar';

class CommentSub extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, text, createdAt, parentCommentId, onReplyBtnClick } = this.props;
		const { avatar, fullName } = this.props.commenterId;
		return (
			<li className="comment byuser odd alt depth-2">
				<article className="comment-body">
					<footer className="comment-meta">
						<div className="comment-author vcard">
							<span className="avatar-container">
								<img alt="" src={avatar || "/assets/image/anonymous_avatar.png"}
									srcSet={avatar || "/assets/image/anonymous_avatar.png"}
									className="avatar avatar-100 photo" height="100" width="100" loading="lazy" />
							</span>
							<b className="fn">{fullName}</b>&nbsp;
							<span className="says">viết:</span>
						</div>

						<div className="comment-metadata">
							<a href="#" onClick={(e) => e.preventDefault()}>
								<time dateTime={createdAt}>{$.format.date(createdAt, "dd/MM/yyyy hh:mm a")}</time>
							</a>
						</div>

					</footer>

					<div className="comment-content">
						<p>{text}</p>
					</div>

					<div className="reply">
						<a rel="nofollow" className="comment-reply-link" href="#" onClick={(e) => onReplyBtnClick(e, parentCommentId, text, fullName)}>
							Trả lời
						</a>
					</div>
				</article>
			</li>
		);
	}
}

class CommentThread extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, text, createdAt, subcomments, onReplyBtnClick } = this.props;
		const { avatar, fullName } = this.props.commenterId;
		return (
			<li className="comment even thread-even depth-1 parent">
				<article className="comment-body">
					<footer className="comment-meta">
						<div className="comment-author vcard">
							<span className="avatar-container">
								<img alt="" src={avatar || "/assets/image/anonymous_avatar.png"}
									srcSet={avatar || "/assets/image/anonymous_avatar.png"}
									className="avatar avatar-100 photo" height="100" width="100" loading="lazy" />
							</span>
							<b className="fn">{fullName}</b>&nbsp;
							<span className="says">viết:</span>
						</div>

						<div className="comment-metadata">
							<a href="#" onClick={(e) => e.preventDefault()}>
								<time dateTime={createdAt}>{$.format.date(createdAt, "dd/MM/yyyy hh:mm a")}</time>
							</a>
						</div>

					</footer>

					<div className="comment-content">
						<p>{text}</p>
					</div>

					<div className="reply">
						<a rel="nofollow" className="comment-reply-link" href="#" onClick={(e) => onReplyBtnClick(e, _id, text, fullName)}>
							Trả lời
						</a>
					</div>
				</article>
				<ol className="children">
					{subcomments?.map((comment) =>
						<CommentSub onReplyBtnClick={onReplyBtnClick.bind(this)} key={comment._id} {...comment} />
					)}
				</ol>
			</li>
		);
	}
}

export default class ArticleDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: this.props.match.params.title,
			replyToCommentThread: null
		};
	}

	async componentDidMount() {
		await this.props.dispatch(getArticleByTitle(this.state.title));
		await this.props.dispatch(listCommentsByArticle(this.state.title));
	}

	replyToCommentThread(e, threadId, text, author) {
		e.preventDefault();
		const element = document.getElementById("comment-text");
		const y = element.getBoundingClientRect().top + window.pageYOffset;
		window.scrollTo({ top: y, behavior: 'smooth' });
		element.focus();
		this.setState({ replyToCommentThread: threadId });
		$('#comment-text').attr('placeholder', 'Trả lời @' + author);
	}

	async addComment() {
		const text = $('#comment-text').val();
		if (!text) {
			$('#comment-error').html('Vui lòng nhập nội dung bình luận!');
			return;
		}
		let newComment = { text, parentCommentId: this.state.replyToCommentThread };
		if (!this.props.user.me) {
			const fullName = $('#author').val();
			const email = $('#email').val();
			const password = $('#password').val();
			if (!text || !fullName || !email || !password) {
				$('#comment-error').html('Vui lòng nhập đầy đủ các trường bắt buộc!');
				return;
			}
			newComment = { ...newComment, fullName, email, password };
		}
		$('#comment-error').html('');
		await this.props.dispatch(createComment(this.state.title, newComment));
		if (this.props.comment.error) {
			$('#comment-error').html(this.props.comment.error);
			Swal.fire({
				title: error,
				text: 'Đã có lỗi xảy ra, vui lòng thử lại!',
				icon: 'error',
				showCancelButton: false,
				confirmButtonText: 'OK',
			});
		} else {
			$('#respond input').val('');
			$('#respond textarea').val('');
			$('#comment-text').attr('placeholder', "Nhập bình luận ở đây");
			Swal.fire({
				title: 'Viết bình luận thành công!',
				icon: 'success',
				showCancelButton: false,
				confirmButtonText: 'OK',
			});
		}
	}

	render() {
		const { current } = this.props.article;
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
										<img maxwidth="1000" maxheight="627"
											src={current?.coverImg}
											className="attachment-scratchpad-featured size-scratchpad-featured wp-post-image"
											alt="" loading="lazy"
											srcSet={current?.coverImg}
											data-permalink={`/articles/${current?.title}`}
											data-orig-file={current?.coverImg}
											data-image-title={current?.title}
										/>
									</span>
								</div>

								<header className="entry-header">
									<span className="cat-links"><span className="screen-reader-text">Posted in&nbsp;</span>
										<a href={"/articles/category/" + current?.categoryId.name} rel="category tag">{current?.categoryId.displayName}</a>
									</span>
									<h1 className="entry-title">{current?.title}</h1>
									<div className="entry-meta">
										<span className="posted-on">Posted on&nbsp;
											<a href={"/articles/" + current?.title} rel="bookmark">
												<time className="entry-date published" dateTime={current?.createdAt}>
													{!current?.createdAt ? '' : $.format.date(current?.createdAt, "dd/MM/yyyy")}
												</time>
											</a>
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
								</div>


								<div className="author-info clear">
									<div className="author-avatar" style={{backgroundImage: `url("${current?.authorId.avatar}")`}}>
									</div>

									<div className="author-description">
										<h2 className="author-title">
											<span className="author-heading">Author:&nbsp;</span>
											<a href="/" rel="author">{current?.authorId.fullName}</a>
										</h2>

										<p className="author-bio">
											<a className="author-link" href="/" rel="author">View All Posts</a>
										</p>
									</div>
								</div>

								<footer className="entry-footer">
									<span className="tags-links">
										<span className="tags-header">Tagged:&nbsp;</span>
										{current?.tags.map((tag) => (<a href={"/articles/tag/" + tag.tagValue} rel="tag" key={tag._id}>#{tag.tagValue}&nbsp;</a>))}
									</span>
								</footer>
							</article>

							<div id="comments" className="comments-area">

								<h2 className="comments-title">
									{this.props.comment?.count} thoughts on “<span>{current?.title}</span>”
								</h2>

								<ol className="comment-list">
									{this.props.comment?.list?.map((thread) =>
										<CommentThread onReplyBtnClick={this.replyToCommentThread.bind(this)} key={thread._id} {...thread} />
									)}
								</ol>

							</div>

							<div className="pencil-shaving-contain">
								<svg className="pencil-shaving" version="1.1" x="0px" y="0px" width="31.5px" height="54.8px" viewBox="0 0 31.5 54.8" style={{ enableBackground: "new 0 0 31.5 54.8" }} aria-hidden="true">
									<polygon className="pencil-shaving0" points="17.8,0 25.9,13.1 23.4,14.6 18.4,10.9 22.4,15.5 20.3,18 18.3,17.8 18.7,20 20.5,24.2 25.2,25.4
	25.3,26.5 28.6,27.4 27.6,29.6 28.6,31.2 27.1,33.4 28.9,35.6 31.5,36 27.2,51.6 23.6,54.8 23.9,50.8 19.3,51.4 18.3,47.6 15,48
	14.6,44.1 10.1,43.6 11.8,38.5 7.3,37.6 8.1,32.8 4.3,32 6.1,28.5 2.2,26.5 4,23.7 1.8,21.2 4.7,18.4 2.3,14.8 7.1,14.1 5.4,9.6
	9.3,9.1 9.2,4.3 13.8,4.1 13.6,0.6 "></polygon>
									<path className="pencil-shaving1" d="M27.2,51.6l-2.4,0l0.1-2.6c0-0.2-0.1-0.3-0.2-0.4c-0.1-0.1-0.3-0.1-0.5,0l-3.9,1.8l-0.4-3.6
	c0-0.1-0.1-0.3-0.2-0.3c-0.1-0.1-0.3-0.1-0.4-0.1l-2.9,0.6l0.1-3.6c0-0.1,0-0.3-0.1-0.4c-0.1-0.1-0.2-0.1-0.4-0.1h-3.3l0.7-4.8
	c0-0.3-0.1-0.5-0.4-0.6l-4-0.8l0.8-3.8c0-0.2-0.1-0.5-0.3-0.6L6.8,31l0.7-2.9c0.1-0.2-0.1-0.5-0.3-0.6L4.1,26l1.2-1.8
	c0.1-0.2,0.1-0.4,0-0.6l-2-2.6l2.8-1.9c0.1-0.1,0.2-0.2,0.2-0.3c0-0.1,0-0.3-0.1-0.4l-2.2-3l3.8-0.4c0.1,0,0.3-0.1,0.4-0.2
	c0.1-0.1,0.1-0.3,0.1-0.4l-1.2-4l3.2-0.1c0.1,0,0.3-0.1,0.4-0.2c0.1-0.1,0.1-0.2,0.1-0.4l-0.4-4.5h4.2c0.1,0,0.3-0.1,0.4-0.2
	c0.1-0.1,0.1-0.2,0.1-0.4l-0.1-3.1L17.8,0l-5.3,0c-0.1,0-0.3,0.1-0.4,0.2s-0.1,0.2-0.1,0.4l0.3,2.4L8.6,3.3c-0.3,0-0.5,0.2-0.5,0.5
	v4L4.5,8.2c-0.2,0-0.3,0.1-0.4,0.2C4,8.6,4,8.8,4,8.9l1.5,4.2L1.3,14c-0.2,0-0.3,0.2-0.4,0.3c-0.1,0.2,0,0.3,0.1,0.5l2.6,3.4l-3,2.6
	c-0.1,0.1-0.2,0.2-0.2,0.4c0,0.1,0.1,0.3,0.2,0.4l2.2,2.1l-2.6,3C0,26.7,0,26.9,0,27s0.2,0.3,0.3,0.3l4.4,1.8l-2.4,3.2
	c-0.1,0.1-0.1,0.3-0.1,0.5c0.1,0.2,0.2,0.3,0.4,0.3l4.1,0.7L4,38.5c-0.1,0.2-0.1,0.3,0,0.5c0.1,0.2,0.3,0.3,0.4,0.3h6.2
	c0,0-2.4,5.9-2.1,6.3c0.2,0.3,5.2,0,5.2,0l0.1,3.3c0,0.3,0.2,0.5,0.5,0.5h3.4v3.8c0,0.2,0.1,0.3,0.2,0.4s0.3,0.1,0.5,0.1l4.3-1.7
	l0.5,2.3c0,0.2,0.1,0.3,0.3,0.4c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3-0.1L27.2,51.6z"></path>
									<polygon className="pencil-shaving2" points="28,16.4 23.6,9.3 23.1,10.3 24.8,13.2 24.1,13.6 25.5,16.8 26.5,16.2 26.9,16.8 "></polygon>
									<polygon className="pencil-shaving2" points="22.8,16.8 25.3,18.1 24.1,18.8 21.7,17.3 23.5,19.4 18.3,17.8 23.1,19.9 18.3,19 17.8,17.5 21.3,16.8
	22.4,15.5 "></polygon>
									<polygon className="pencil-shaving2" points="24.1,25.6 25.5,25.4 26.5,26.8 28,26.8 30.9,26.1 29.6,28.1 28,29.2 29,30.7 29.3,31.6 27.5,33
	29.2,34.3 29.3,35.6 31.1,35.9 28.3,35.9 28,34.7 25.9,33.7 28,31.1 26.5,29.7 28,27.9 24.9,28.7 25.3,26.5 "></polygon>
								</svg>
							</div>

							<div id="comments-form">
								<div className="comments-form-contain">
									<svg className="post-mark" version="1.1" x="0px" y="0px" width="395.7px" height="155.5px" viewBox="0 0 395.7 155.5" style={{ enableBackground: "new 0 0 395.7 155.5" }} aria-hidden="true">
										<path className="post-mark0" d="M318.4,155.5c-42.9,0-77.8-34.9-77.8-77.7S275.5,0,318.4,0s77.8,34.9,77.8,77.8S361.3,155.5,318.4,155.5z M318.4,5c-40.1,0-72.8,32.6-72.8,72.8c0,40.1,32.6,72.7,72.8,72.7s72.8-32.6,72.8-72.7C391.2,37.6,358.5,5,318.4,5z"></path>
										<path className="post-mark0" d="M318.4,136.6c-32.4,0-58.8-26.4-58.8-58.8c0-32.4,26.4-58.8,58.8-58.8s58.8,26.4,58.8,58.8C377.2,110.2,350.9,136.6,318.4,136.6z M318.4,20.9c-31.3,0-56.8,25.5-56.8,56.8s25.5,56.8,56.8,56.8s56.8-25.5,56.8-56.8S349.8,20.9,318.4,20.9z"></path>
										<path className="post-mark0" d="M247.6,32.1c0.9-1.4,1.8-2.8,2.8-4.1c-0.8-0.5-1.6-1-2.4-1.5c-5-3.1-10.1-6.4-20.3-6.4s-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4s-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4c-10.2,0-15.3,3.2-20.3,6.4C51,29.3,46.7,32,37.9,32c-8.8,0-13.1-2.7-17.6-5.6C15.3,23.3,10.2,20,0,20v5c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6s13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6s13.1,2.7,17.6,5.6C246.1,31.1,246.8,31.6,247.6,32.1z"></path>
										<path className="post-mark0" d="M240,46.7c-3.2-1.2-7.1-2.1-12.3-2.1c-10.2,0-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4s-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4c-10.2,0-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4v5c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6s13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6c4.5,0,7.8,0.7,10.6,1.8C238.9,49.9,239.4,48.3,240,46.7z"></path>
										<path className="post-mark0" d="M234.5,69.8c-2-0.4-4.2-0.6-6.8-0.6c-10.2,0-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4s-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4s-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4v5c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6c2.5,0,4.6,0.2,6.5,0.6C234.3,73.2,234.4,71.5,234.5,69.8z"></path>
										<path className="post-mark0" d="M235.8,94.7c-2.3-0.5-5-0.8-8.1-0.8c-10.2,0-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4s-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4c-10.2,0-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4v5c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6s13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6c3.9,0,6.9,0.5,9.5,1.4C236.7,98.4,236.2,96.6,235.8,94.7z"></path>
										<path className="post-mark0" d="M248.9,125.4c-0.3-0.2-0.6-0.4-0.9-0.6c-5-3.1-10.1-6.4-20.3-6.4s-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4s-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4c-10.2,0-15.3,3.2-20.3,6.4c-4.6,2.9-8.9,5.6-17.6,5.6c-8.8,0-13.1-2.7-17.6-5.6c-5-3.1-10.1-6.4-20.3-6.4v5c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6c8.8,0,13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6s13.1,2.7,17.6,5.6c5,3.1,10.1,6.4,20.3,6.4c10.2,0,15.3-3.2,20.3-6.4c4.6-2.9,8.9-5.6,17.6-5.6s13.1,2.7,17.6,5.6c3,1.9,6.2,3.9,10.5,5.1C253.3,131.4,251,128.5,248.9,125.4z"></path>
									</svg>
									<svg className="stamp" version="1.1" id="Layer_1" x="0px" y="0px" width="157.3px" height="186px" viewBox="0 0 157.3 186" style={{ enableBackground: "new 0 0 157.3 186" }} aria-hidden="true">
										<path className="stamp0" d="M157.3,16.4V0h-15.7c-0.4,3.3-3.3,5.9-6.7,5.9s-6.3-2.6-6.7-5.9h-9.1c-0.4,3.3-3.3,5.9-6.7,5.9s-6.3-2.6-6.7-5.9h-9.1c-0.4,3.3-3.3,5.9-6.7,5.9S83.7,3.3,83.3,0h-9.1c-0.4,3.3-3.3,5.9-6.7,5.9c-3.4,0-6.3-2.6-6.7-5.9h-9.1c-0.4,3.3-3.3,5.9-6.7,5.9c-3.4,0-6.3-2.6-6.7-5.9h-9.1c-0.4,3.3-3.3,5.9-6.7,5.9c-3.4,0-6.3-2.6-6.7-5.9H0v16.4c3.7,0,6.8,3,6.8,6.8c0,3.7-3,6.8-6.8,6.8v6.7c3.7,0,6.8,3,6.8,6.8c0,3.7-3,6.8-6.8,6.8v6.7c3.7,0,6.8,3,6.8,6.8s-3,6.8-6.8,6.8v6.7c3.7,0,6.8,3,6.8,6.8c0,3.7-3,6.8-6.8,6.8v6.7c3.7,0,6.8,3,6.8,6.8c0,3.7-3,6.8-6.8,6.8v6.7c3.7,0,6.8,3,6.8,6.8s-3,6.8-6.8,6.8v6.7c3.7,0,6.8,3,6.8,6.8c0,3.7-3,6.8-6.8,6.8v6.7c3.7,0,6.8,3,6.8,6.8c0,3.7-3,6.8-6.8,6.8V186h15.8c0-3.7,3-6.8,6.8-6.8c3.7,0,6.8,3,6.8,6.8h9c0-3.7,3-6.8,6.8-6.8c3.7,0,6.8,3,6.8,6.8h9c0-3.7,3-6.8,6.8-6.8c3.7,0,6.8,3,6.8,6.8h9c0-3.7,3-6.8,6.8-6.8s6.8,3,6.8,6.8h9c0-3.7,3-6.8,6.8-6.8s6.8,3,6.8,6.8h9c0-3.7,3-6.8,6.8-6.8s6.8,3,6.8,6.8h15.6v-14.5c-3.7,0-6.8-3-6.8-6.8c0-3.7,3-6.8,6.8-6.8v-6.7c-3.7,0-6.8-3-6.8-6.8c0-3.7,3-6.8,6.8-6.8v-6.7c-3.7,0-6.8-3-6.8-6.8s3-6.8,6.8-6.8v-6.7c-3.7,0-6.8-3-6.8-6.8c0-3.7,3-6.8,6.8-6.8v-6.7c-3.7,0-6.8-3-6.8-6.8c0-3.7,3-6.8,6.8-6.8v-6.7c-3.7,0-6.8-3-6.8-6.8s3-6.8,6.8-6.8v-6.7c-3.7,0-6.8-3-6.8-6.8c0-3.7,3-6.8,6.8-6.8v-6.7c-3.7,0-6.8-3-6.8-6.8C150.5,19.4,153.6,16.4,157.3,16.4z"></path>
										<rect x="15.5" y="16.4" className="stamp1" width="126.3" height="153.9"></rect>
										<g>
											<path className="stamp2" d="M124.6,66.4c1.6,3.9,2.5,8.8,2.5,14.6s-1.7,11.5-5,16.9c-3.4,5.4-7.4,9.8-12.1,13.1c-4.7,3.3-9,5-12.9,5c-2.5,0-4.5-0.8-6-2.4c-1.5-1.6-2.5-3.6-3-6c-6.3,6.3-11.6,9.5-15.9,9.5c-2.9,0-5.9-1.5-9-4.5c-3.2-3-4.7-5.9-4.7-8.5c0-2.6,0.8-5.8,2.5-9.6c1.7-3.8,3.8-7.5,6.3-11.1c2.6-3.6,5.7-6.7,9.4-9.3c3.7-2.6,7.2-3.9,10.4-3.9s6.6,1.6,9.9,4.8c3.4,3.2,5,6.6,5,10c0,1.8-0.5,3.7-1.6,5.7c0.9,1.1,1.4,2,1.4,2.8c0,0.8-0.2,2.2-0.5,4.2c-0.3,2-0.6,3.5-0.7,4.3c-0.1,0.9,0,1.5,0.3,1.9c1.1,0,2.6-0.9,4.6-2.7c2-1.8,4-4.6,5.9-8.4c1.9-3.8,2.8-7.7,2.8-11.8c0-6.8-1.7-12-5.2-15.6c-3.5-3.6-8.4-5.4-14.8-5.4c-8.1,0-15.9,2.5-23.4,7.4c-7.5,5-13.4,11.2-17.7,18.6c-4.3,7.4-6.5,14.8-6.5,22c0,13.3,6.5,19.9,19.4,19.9c6.7,0,12.7-0.8,18-2.5c4.9-1.6,7.7-2.2,8.6-1.9c0.9,0.3,1.3,1,1.3,2.2c0,2.3-1.5,4.6-4.5,6.7c-3,2.2-6.5,3.9-10.6,5.1c-4.1,1.2-7.9,1.9-11.4,1.9c-8.9,0-17-3.1-24.3-9.2c-7.3-6.1-10.9-13.4-10.9-22c0-6.7,1.6-13.6,4.7-20.7c3.1-7.1,7.3-13.7,12.6-19.6c5.3-5.9,11.9-10.8,19.8-14.6c7.9-3.8,16.4-5.7,25.7-5.7c9.2,0,16.7,2.8,22.4,8.3C120.5,58.9,123,62.5,124.6,66.4z M71.4,106.3c2.4,0,6-2,10.7-5.8c4.8-3.9,7.7-8.1,8.7-12.7c0.2-0.7,0.6-1.1,1.1-1.3c-1.1-3.3-2.5-5-4.2-5c-3.6,0-7.6,3-11.9,9c-4.4,6-6.5,10.4-6.5,13.2C69.3,105.4,70,106.3,71.4,106.3z"></path>
										</g>
									</svg>

									<div id="respond" className="comment-respond">
										<h3 id="reply-title" className="comment-reply-title">Bình luận
											<small>
												<a rel="nofollow" id="cancel-comment-reply-link" href="/the-gioi-nay-thuc-qua-on/#respond" style={{ display: "none" }}>Cancel reply</a>
											</small>
										</h3>
										<div id="commentform" className="comment-form">
											<textarea type="text" id="comment-text" rows="4" style={{ width: '100%', resize: 'none' }} placeholder="Nhập bình luận ở đây" />
										</div>
										<div id="comment-form-identity" style={{ display: this.props.user.me ? 'none' : 'block' }}>
											<div id="comment-form-nascar">Điền thông tin vào ô dưới đây để  bình luận</div>
											<div id="comment-form-guest" className="comment-form-service selected">
												<div className="comment-form-padder">
													<div className="comment-form-fields">
														<div className="comment-form-field comment-form-email">
															<label htmlFor="email">Email <span className="required">(bắt buộc)</span></label>
															<div className="comment-form-input"><input id="email" type="email" style={{ width: '100%' }} /></div>
														</div>
														<div className="comment-form-field comment-form-author">
															<label htmlFor="author">Tên <span className="required">(bắt buộc)</span></label>
															<div className="comment-form-input"><input id="author" type="text" style={{ width: '100%' }} /></div>
														</div>
														<div className="comment-form-field comment-form-author">
															<label htmlFor="password">Mật khẩu <span className="required">(bắt buộc)</span></label>
															<div className="comment-form-input">
																<input id="password" type="password" style={{ width: '100%' }} />
															</div>
														</div>
													</div>
												</div>
											</div>

										</div>
										<p id="comment-error" style={{ color: 'red' }}></p>
										<button type="submit" id="comment-submit" className="submit wp-block-button__link" style={{ marginTop: 15 }} onClick={this.addComment.bind(this)}>
											Gửi bình luận
										</button>
									</div>

								</div>
							</div>
						</main>
					</div>

					<Sidebar />
				</div>
			</div>
		);
	}

}
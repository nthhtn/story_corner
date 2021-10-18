import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Helmet } from 'react-helmet';

import { getArticleByTitle } from '../actions/article';
// import Sidebar from './Sidebar';

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
		return (
			<div id="content" className="site-content">
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
									<span className="cat-links"><span className="screen-reader-text">Posted in</span> <a href="https://gocnhoannie.com/tan-man/" rel="category tag">Tản mạn</a></span>
									<h1 className="entry-title">Nghỉ ngơi cũng là một phần của quá trình</h1>
									<div className="entry-meta">
										<span className="posted-on">Posted on <a href="https://gocnhoannie.com/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh/" rel="bookmark"><time className="entry-date published" dateTime="2021-09-15T21:41:37+07:00">Tháng Chín 15, 2021</time><time className="updated" dateTime="2021-09-17T09:05:02+07:00">Tháng Chín 17, 2021</time></a></span><span className="byline"> by <span className="author vcard"><a className="url fn n" href="https://gocnhoannie.com/author/gocnhoannie/">Annie</a></span></span>
									</div>
								</header>

								<div className="entry-content">

									<p>Vì giãn cách xã hội do Covid, phần vừa mới nghỉ việc và ở nhà tự học, đôi khi mình cũng có chút sốt ruột. Mình tự hỏi, khi chuỗi ngày nghỉ này qua đi, mọi thứ trở lại bình thường, chuyện gì sẽ xảy ra với mình?<span id="more-3000"></span></p>
									<p>Có chăng mình sẽ buộc phải chạy thật nhanh? Nếu như lúc đó công việc của mọi người đã vào nếp, còn mình vẫn lạc lối và chưa tìm được hướng đi phù hợp với bản thân thì sao? Mình phải đối mặt với những người xung quanh và chính mình như thế nào? Mình có nên thoả hiệp để nhận tạm một công việc mình có thể làm nhưng không thích lắm?</p>



									<p>Ngẫm nghĩ lại, quãng thời gian này với mình mà nói chưa có ngày nào trôi qua hoang phí cả. Mình có nhiều giây phút sống chậm lại, trò chuyện với bản thân, hồi tưởng lại 2 năm qua rốt cuộc đã làm những gì. Mình cũng chăm chỉ củng cố kiến thức, mỗi ngày cố gắng học một chút những thứ mới, vẫn coi phim, đọc sách và tập thể dục đều đặn. Có thể nói, mình đã sống trọn từng khoảnh khắc ở hiện tại, cũng cho bản thân chút không gian và thời gian thư giãn sau những tháng ngày chạy đua không ngừng nghỉ.</p>



									<p>Mình chỉ là đang quan ngại cái quá trình này rồi sẽ tiếp diễn đến khi nào, tương lai của mình rồi sẽ ra sao. Dù đã mường tượng được phương hướng của bản thân, nhưng đi thế nào, từng bước ra sao thật sự rất khó nói. Mình những tưởng sẽ lưu lại Sài Gòn vài ba năm nữa để đi làm, nhưng dịch bệnh khiến mình phải quay về lại Đà Nẵng, khiến cho mọi dự định, kế hoạch đã vạch sẵn dường như đều rẽ sang một hướng khác. Tương lai thật sự không thể tính toán chính xác 100% được.</p>



									<p>Gần đây coi show Ký Ức Hạn Định, có một đoạn phỏng vấn của Lâm Ngạn Tuấn thực sự đả thông được tư tưởng của mình:</p>



									<p><strong><em>“So với việc có thể đến một nơi nào đó thật nhanh, thì việc biết được bản thân bạn muốn đi đâu quan trọng hơn nhiều. Dù chạy hay đi đến đó thì tôi vẫn có thể tiến về lối đi đúng đắn ấy, chỉ cần phương hướng của tôi không sai, rồi cũng có ngày tôi sẽ về đích.”</em></strong></p>





									<p>Trong bài Đạo Nghỉ Ngơi (Turn off) của Tuấn cũng có một câu thế này:</p>



									<p><em><strong>“Ngay cả khi trở nên chậm hơn, thì cũng cứ nghỉ ngơi đi. Mỗi người đều là một cá thể độc nhất vô nhị. Tới đích rồi mới biết đó là cả một quá trình.”</strong></em></p>
									<p></p><div className="jetpack-video-wrapper"><span className="embed-youtube" style={{ textAlign: "center", display: "block" }}><iframe loading="lazy" className="youtube-player" src="https://www.youtube.com/embed/GEFBALGU_34?version=3&amp;rel=1&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;fs=1&amp;hl=vi&amp;autohide=2&amp;wmode=transparent" allowFullScreen={true} style={{ border: 0, display: "block", margin: 0, width: 660, height: 371.643 }} sandbox="allow-scripts allow-same-origin allow-popups allow-presentation" data-ratio="0.5630952380952381" data-width="840" data-height="473"></iframe></span></div><p></p>



									<p>Nếu tương lai vốn dĩ bất định như vậy, tiếp tục lo nghĩ liệu có giải quyết được vấn đề không? Tại sao mình không tiếp tục hưởng thụ và trân trọng quãng thời gian này? Biết bao giờ bản thân mới có cơ hội để thả lỏng và làm mới chính mình như thế này? Mình cũng đâu phải ăn không nằm rồi chơi suốt ngày?</p>
									<p>Trước đây mình những tưởng đi thật nhanh, thử thật nhiều, thất bại thật nhiều khi còn trẻ thì sẽ sớm trưởng thành, dày dạn kinh nghiệm hơn. Như vậy sau này sẽ bớt phải va vấp và khó khăn hơn. Nhưng càng lớn, mình lại thấy đi chậm nhưng đúng hướng dù sao vẫn tốt hơn chạy nhanh như con thiêu thân lao vào đống lửa mà không suy nghĩ.&nbsp;</p>
									<p>Đôi lúc chỉ cần nhắm mắt lại, định tâm, không phải câu trả lời đã ở trong lòng rồi sao?</p>
									<p>Trong cái thế giới ồn ào và vồn vã này, tìm được lối đi đúng đắn vốn không dễ, bỏ ngoài tai những xì xào điều tiếng, kiên trì đi đến đích lại càng khó. Cuộc đời không phải đường đua, tốc độ như thế nào là do chính mình quyết định.&nbsp;</p>
									<p>Cứ bình tĩnh tận hưởng quá trình này. Mọi chuyện rồi sẽ ổn thôi.</p>
									<div className="sharedaddy sd-sharing-enabled"><div className="robots-nocontent sd-block sd-social sd-social-icon-text sd-sharing"><h3 className="sd-title">Share this:</h3><div className="sd-content"><ul data-sharing-events-added="true"><li className="share-twitter"><a rel="nofollow noopener noreferrer" data-shared="sharing-twitter-3000" className="share-twitter sd-button share-icon" href="https://gocnhoannie.com/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh/?share=twitter&amp;nb=1" target="_blank" title="Click to share on Twitter"><span>Twitter</span></a></li><li className="share-facebook"><a rel="nofollow noopener noreferrer" data-shared="sharing-facebook-3000" className="share-facebook sd-button share-icon" href="https://gocnhoannie.com/nghi-ngoi-cung-la-mot-phan-cua-qua-trinh/?share=facebook&amp;nb=1" target="_blank" title="Click to share on Facebook"><span>Facebook</span></a></li><li className="share-end"></li></ul></div></div></div><div className="sharedaddy sd-block sd-like jetpack-likes-widget-wrapper jetpack-likes-widget-loaded" id="like-post-wrapper-164634405-3000-616a339a5f629" data-src="https://widgets.wp.com/likes/#blog_id=164634405&amp;post_id=3000&amp;origin=gocnhoannie.com&amp;obj_id=164634405-3000-616a339a5f629" data-name="like-post-frame-164634405-3000-616a339a5f629" data-title="Like or Reblog"><h3 className="sd-title">Like this:</h3><div className="likes-widget-placeholder post-likes-widget-placeholder" style={{ height: 55, display: "none" }}><span className="button"><span>Like</span></span> <span className="loading">Loading...</span></div><iframe className="post-likes-widget jetpack-likes-widget" name="like-post-frame-164634405-3000-616a339a5f629" src="https://widgets.wp.com/likes/#blog_id=164634405&amp;post_id=3000&amp;origin=gocnhoannie.com&amp;obj_id=164634405-3000-616a339a5f629" height="55px" width="100%" frameBorder="0" scrolling="no" title="Like or Reblog"></iframe><span className="sd-text-color"></span><a className="sd-link-color"></a></div>
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
									</div>

								</div>


								<div className="author-info clear">
									<div className="author-avatar">
										<span className="avatar-container"><img alt="" src="https://secure.gravatar.com/avatar/b05111cb7f6fd63a5a70b99312cfbe0c?s=100&amp;r=g" srcSet="https://secure.gravatar.com/avatar/b05111cb7f6fd63a5a70b99312cfbe0c?s=200&amp;r=g 2x" className="avatar avatar-100 photo" height="100" width="100" loading="lazy" /></span>	</div>

									<div className="author-description">
										<h2 className="author-title">
											<span className="author-heading">Author:</span>
											<a href="https://gocnhoannie.com/author/gocnhoannie/" rel="author">Annie</a>
										</h2>

										<p className="author-bio">
											<a className="author-link" href="https://gocnhoannie.com/author/gocnhoannie/" rel="author">View All Posts</a>
										</p>
									</div>
								</div>

								<footer className="entry-footer">
									<span className="tags-links"><span className="tags-header">Tagged:</span> <a href="https://gocnhoannie.com/tag/tanman/" rel="tag">#tanman</a></span>
								</footer>
							</article>
						</main>
					</div>
				</div>
			</div>
		);
	}

}
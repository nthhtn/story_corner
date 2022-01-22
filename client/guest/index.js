import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import Main from './components/Main';
import store from './store';
import { getMyProfile } from './actions/user';

store.dispatch(getMyProfile())
	.then(() => {
		const rootComponent = (
			<Provider store={store}>
				<BrowserRouter>
					<div id="page" className="site">
						<a className="skip-link screen-reader-text" href="#content">Skip to content</a>
						<header id="masthead" className="site-header" role="banner">

							<nav id="site-navigation" className="main-navigation" role="navigation">
								<div className="wrap">
									<button className="menu-toggle" aria-controls="primary-menu" aria-expanded="false">Menu</button>
									<div className="menu-phan-trang-container">
										<ul id="primary-menu" className="menu">
											<li id="menu-item-817"
												className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-817">
												<a href="/" aria-current="page">Trang chủ</a>
											</li>
											<li id="menu-item-1913"
												className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-1913">
												<a href="#">Review</a>
												<ul className="sub-menu">
													<li id="menu-item-658"
														className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-658">
														<a href="/articles/category/review du lich">Du lịch</a>
													</li>
													<li id="menu-item-660"
														className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-660">
														<a href="/articles/category/review phim">Phim</a>
													</li>
												</ul>
											</li>
											<li id="menu-item-1913"
												className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-1913">
												<a href="#">Dịch thuật</a>
												<ul className="sub-menu">
													<li id="menu-item-658"
														className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-658">
														<a href="/articles/category/dich thuat bai hat">Bài hát</a>
													</li>
													<li id="menu-item-660"
														className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-660">
														<a href="/articles/category/dich thuat phim">Phim</a>
													</li>
													<li id="menu-item-660"
														className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-660">
														<a href="/articles/category/dich thuat bai bao">Bài báo</a>
													</li>
												</ul>
											</li>
											<li id="menu-item-659"
												className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-659">
												<a href="/articles/category/tan man">Tản mạn</a>
											</li>
											{
												store.getState().user.me?.role === 'admin' &&
												(<li id="menu-item-659"
													className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-659">
													<a href="/dashboard">Bảng điều khiển</a>
												</li>)
											}
											{
												!store.getState().user.me ?
													(<li id="menu-item-659"
														className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-659">
														<a href="/login">Đăng nhập</a>
													</li>)
													:
													(<li id="menu-item-659"
														className="menu-item menu-item-type-taxonomy muấtenu-item-object-category menu-item-659">
														<a href="/logout">Đăng xuất</a>
													</li>)
											}
										</ul>
									</div>
								</div>
							</nav>

							<div className="site-branding">
								<div className="wrap">
									<div className="header-image-contain">
										<a href="/">
											<img src="/assets/image/header.jpg"
												width="1000" height="250" alt="" className="header-image" />
										</a>
										<div className="photo-corners">
											<svg version="1.1" className="photo-corner" x="0px" y="0px" width="70.7px"
												height="70.7px" viewBox="-64 65.3 70.7 70.7"
												style={{ enableBackground: "new -64 65.3 70.7 70.7" }}>
												<polygon className="photo-corner0"
													points="-38,91.3 -19.3,91.3 6.7,65.3 -42.3,65.3 -64,65.3 -64,87 -64,136 -38,110 " />
												<polygon className="photo-corner1"
													points="-30.6,70.1 -34.4,70.1 -58.8,70.1 -59.8,70.1 -59.8,71.1 -59.8,94.6 -59.8,98.4 -59.8,124.5 -58.8,123.5 -58.8,99.3 -58.8,95.6 -58.8,71.1 -35.3,71.1 -31.6,71.1 -5.1,71.1 -4.1,70.1 " />
												<polygon className="photo-corner1"
													points="-42.8,86.1 -43.8,86.1 -43.8,87.1 -43.8,109.5 -42.8,108.5 -42.8,87.1 -21.1,87.1 -20.1,86.1 " />
											</svg>
											<svg version="1.1" className="photo-corner" x="0px" y="0px" width="70.7px"
												height="70.7px" viewBox="-64 65.3 70.7 70.7"
												style={{ enableBackground: "new -64 65.3 70.7 70.7" }}>
												<polygon className="photo-corner0"
													points="-38,91.3 -19.3,91.3 6.7,65.3 -42.3,65.3 -64,65.3 -64,87 -64,136 -38,110 " />
												<polygon className="photo-corner1"
													points="-30.6,70.1 -34.4,70.1 -58.8,70.1 -59.8,70.1 -59.8,71.1 -59.8,94.6 -59.8,98.4 -59.8,124.5 -58.8,123.5 -58.8,99.3 -58.8,95.6 -58.8,71.1 -35.3,71.1 -31.6,71.1 -5.1,71.1 -4.1,70.1 " />
												<polygon className="photo-corner1"
													points="-42.8,86.1 -43.8,86.1 -43.8,87.1 -43.8,109.5 -42.8,108.5 -42.8,87.1 -21.1,87.1 -20.1,86.1 " />
											</svg>
											<svg version="1.1" className="photo-corner" x="0px" y="0px" width="70.7px"
												height="70.7px" viewBox="-64 65.3 70.7 70.7"
												style={{ enableBackground: "new -64 65.3 70.7 70.7" }}>
												<polygon className="photo-corner0"
													points="-38,91.3 -19.3,91.3 6.7,65.3 -42.3,65.3 -64,65.3 -64,87 -64,136 -38,110 " />
												<polygon className="photo-corner1"
													points="-30.6,70.1 -34.4,70.1 -58.8,70.1 -59.8,70.1 -59.8,71.1 -59.8,94.6 -59.8,98.4 -59.8,124.5 -58.8,123.5 -58.8,99.3 -58.8,95.6 -58.8,71.1 -35.3,71.1 -31.6,71.1 -5.1,71.1 -4.1,70.1 " />
												<polygon className="photo-corner1"
													points="-42.8,86.1 -43.8,86.1 -43.8,87.1 -43.8,109.5 -42.8,108.5 -42.8,87.1 -21.1,87.1 -20.1,86.1 " />
											</svg>
											<svg version="1.1" className="photo-corner" x="0px" y="0px" width="70.7px"
												height="70.7px" viewBox="-64 65.3 70.7 70.7"
												style={{ enableBackground: "new -64 65.3 70.7 70.7" }}>
												<polygon className="photo-corner0"
													points="-38,91.3 -19.3,91.3 6.7,65.3 -42.3,65.3 -64,65.3 -64,87 -64,136 -38,110 " />
												<polygon className="photo-corner1"
													points="-30.6,70.1 -34.4,70.1 -58.8,70.1 -59.8,70.1 -59.8,71.1 -59.8,94.6 -59.8,98.4 -59.8,124.5 -58.8,123.5 -58.8,99.3 -58.8,95.6 -58.8,71.1 -35.3,71.1 -31.6,71.1 -5.1,71.1 -4.1,70.1 " />
												<polygon className="photo-corner1"
													points="-42.8,86.1 -43.8,86.1 -43.8,87.1 -43.8,109.5 -42.8,108.5 -42.8,87.1 -21.1,87.1 -20.1,86.1 " />
											</svg>
										</div>
									</div>
									<a href="/" className="site-logo-link" rel="home" itemProp="url"></a>
									<h1 className="site-title"><a href="/" rel="home">Story's Corner</a></h1>
									<p className="site-description">Viết review và kể chuyện về cuộc đời</p>
								</div>
							</div>

						</header>

						<Main />

						<footer id="colophon" className="site-footer" role="contentinfo">
							<div className="wrap">
								<div className="site-info">
									<svg className="line" version="1.1" x="0px" y="0px" width="1509.5px" height="15.6px"
										viewBox="0 0 1509.5 15.6" style={{ enableBackground: "new 0 0 1509.5 15.6" }} aria-hidden="true">
										<path className="line0"
											d="M746,8.7c1.2,0,2.5,0,3.7,0c13.9-0.1,27.8-0.3,41.7-0.4S819.1,8,833,7.8c13.9-0.1,27.8-0.3,41.7-0.4s27.8-0.3,41.7-0.4s27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4c3.3,0,6.7-0.1,10-0.1c-503-3.3-1006,0.7-1508.9,12.2c13.9,0.3,27.7,0.6,41.6,0.8c13.9,0.2,27.7,0.5,41.6,0.6s27.8,0.3,41.6,0.5c13.9,0.1,27.8,0.2,41.6,0.3c13.9,0.1,27.8,0.1,41.6,0.1c13.9,0,27.8,0,41.6-0.1c13.9-0.1,27.8-0.1,41.6-0.3c13.9-0.1,27.8-0.3,41.6-0.4c13.9-0.2,27.7-0.4,41.6-0.6c13.9-0.2,27.7-0.5,41.6-0.8s27.7-0.6,41.6-1c13.9-0.4,27.7-0.8,41.6-1.2c13.7-0.4,27.5-0.3,41.3-0.4c13.9-0.1,27.8-0.3,41.7-0.4s27.8-0.3,41.7-0.4s27.8-0.3,41.7-0.4c13.9-0.1,27.8-0.3,41.7-0.4C720.7,8.9,733.3,8.8,746,8.7z" />
									</svg>
									<a href="https://wordpress.org/">Proudly powered by WordPress</a>
									<span className="sep"> | </span>
									Theme: Scratchpad by <a href="http://wordpress.com/themes/" rel="designer">Automattic</a>. </div>

							</div>
						</footer>

					</div>
				</BrowserRouter>
			</Provider>);

		render(rootComponent, document.getElementById('root'));
	});


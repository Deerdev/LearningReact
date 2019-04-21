import React from 'react'
import ReactDom from 'react-dom'

// import MediaQuery from 'react-responsive';
import App from './app';

import './config'
import './index.css'


const Pc = () => <p>抱歉，本应用不支持PC端访问，请切换移动端浏览</p>;

// boss genius me msg 4个页面
// ReactDom.render(
// 	[
// 		<MediaQuery key="mb" maxDeviceWidth={750} component={App} />,
// 		<MediaQuery key="pc" minDeviceWidth={751} component={Pc} />
// 	],
// 	document.getElementById('root')
// )

ReactDom.render(<App />, document.getElementById('root'));


import React from 'react'
// ssr 不可以import资源
// import logoImg from './job.png'
import './logo.css'
class Logo extends React.Component{

	render(){
		return (
			<div className="logo-container">
				<img src={require('./job.png')} alt=""/>
			</div>
		)
	}
}

export default Logo

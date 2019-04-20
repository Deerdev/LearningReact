import React from 'react'


export default function imoocForm(Comp){
	return class WrapperComp extends React.Component{
		constructor(props){
			super(props)
			this.state = {}
			this.handleChange = this.handleChange.bind(this)
		}
		handleChange(key,val){
			console.log(key,val)
			this.setState({
				[key]:val
			})
		}
		// {...this.props} 属性穿透，直接给Comp
		// state 也当prop传过去，在Comp中，使用 this.props.state 访问
		render(){
			return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
		}
	}
}
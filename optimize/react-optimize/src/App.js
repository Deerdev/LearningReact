import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      num:0,
      title:""
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {

  }
  render() {
    return (
      <div className="App">
        {/* 每次render都会执行bind */}
        <button onClick={this.handleClick.bind(this)}>bt1</button>
        {/* 每次render都会创建一个箭头函数 */}
        <button onClick={()=>this.handleClick()}>bt2</button>
        {/* 推荐：在初始化时绑定this */}
        <button onClick={this.handleClick()}>bt3</button>
        {/* 会传递过多的参数 */}
        <Demo {...this.state}></Demo>
        <Demo title={this.state.title}></Demo>
      </div>
    );
  }
}

// 可以使用 PureComponent，就不要自己判断shouldComponentUpdate
class Demo extends Component {
  shouldComponentUpdate(nextProps, nextStates) {
    // title改名才会刷新自己；不让父组件刷新-子组件也会刷新
    if (nextProps.title === this.props.title) {
      return false
    }
    return true
  }
  render() {
    return (
      <p>demo:{this.props.title}</p>
    )
  }
}

export default App;

import React from "react";
import { connect } from "react-redux";
import { addGun, removeGun, addGunAsync } from "./index.redux";

// 装饰器模式
@connect(
  // mapStates:把state映射到props 的 num上
  state => ({ num: state }),
  // mapActions：把action映射到props的方法上
  { addGun, removeGun, addGunAsync }
)
class App extends React.Component {
  // 可以直接调用 state 和 action
  render() {
    // num addGun，removeGun，addGunAsync都是connect给的，不需要手动dispatch
    return (
      <div>
        <h2>现在有机枪{this.props.num}把</h2>
        <button onClick={this.props.addGun}>申请武器</button>
        <button onClick={this.props.removeGun}>上交武器</button>
        <button onClick={this.props.addGunAsync}>拖两天再给</button>
      </div>
    );
  }
}
export default App;

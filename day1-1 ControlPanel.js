import React,{ Component } from 'react'
import Counter from './Counter.js'

//父组件
// 1.在父组件中给prop赋值：
//   通过名为caption的prop,ControlPanel传递给Counter组件实例说明文字；
//   通过名为initValue的prop传递给Counter组件一个初始的计数值。
const style = {
    margin: '20px'
};

class ControlPanel extends Component {
    constructor(props){
        super(props);

        this.onCounterUpdate = this.onCounterUpdate.bind(this);
        //定义一个initValues初始值
        this.initValues = [0,10,20];
        const initSum = this.initValues.reduce((a,b) => a+b,0);
        this.state = {
            sum:initSum
        };
    }

    //onCounterUpdate函数的参数和Counter中调用onUpdate prop的参数规格一致，第一个为新值，
    // 第二个为参数之前的值，两者之差就是改变值，将这个改变作用到this.state.sum上就是新的sum状态
    onCounterUpdate(newValue,previousValue){
        const valueChange = newValue - previousValue;
        this.setState({ sum: this.state.sum + valueChange });
    }
    render(){
        return(
            <div style={style}>
                <Counter onUpdate={this.onCounterUpdate} caption="First"></Counter>
                <Counter onUpdate={this.onCounterUpdate} caption="Second" initValue={this.initValues[1]}></Counter> 
                <Counter onUpdate={this.onCounterUpdate} caption="Third" initValue={this.initValues[2]}></Counter>
                <hr/>
                <div>Total Count:{this.state.sum}</div>
            </div>
        );
    }
}
export default ControlPanel;

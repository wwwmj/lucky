import React,{ Component } from 'react';
import PropTypes from 'prop-types'

const buttonStyle = {
    margin: '10px'
};


class Counter extends Component{

    //装载过程：
    //装载第一个函数：constructor：要创造一个组件类的实例，当然会调用对应的构造函数，但不是每个组件都需要定义自己的构造函数
    constructor (props){
        //如果一个苏建需要定义自己的构造函数，一定要记得在构造函数的第一行通过super调用父类也就是React.Component的构造函数。
        //如果在构造函数中没有调用super(props)，那么组件实例被构造之后，类实例的所有成员函数就无法通过this.props访问到父组件传过来的的props值。
        super(props);

        //在Counter的构造函数中还给两个成员函数绑定了当前this的执行环境，因为es6方法创造的React组件类并不自动给我们绑定this到当前对象
        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
        this.onClickDncrementButton = this.onClickDncrementButton.bind(this);

        //读取传入的prop的方法
        //在构造函数中可以通过参数props获得传入prop值，在其他函数中则可以通过this.props访问传入prop的值
        //通过对this.state的赋值完成了对组件state的初始化
        this.state = {
            count:props.initValue
        }
    }

    //onClickIncrementButton和onClickDncrementButton的任务除了调用this.setState改变内部状态，还要调用this.updateCount这个函数
    onClickIncrementButton(){
        this.updateCount(true)
    }

    onClickDncrementButton(){
        this.updateCount(false)
    }

    //
    updateCount(isIncrement){
        const previousValue = this.state.count;
        const newValue = isIncrement ? previousValue + 1 : previousValue - 1;

        //通过this.state可以读取到组件的当前state，我们改变组件state必须要使用this.setState函数
        this.setState({count:newValue})
        //新增的prop叫做onUpdate，类型是一个函数，当Counter的状态改变的时候，就会调用这个给定的函数，从而达到通知父组件的作用
        //Counter的onUpdate就成了作为子组件的Counter向父组件ControlPanel传递数据的渠道，
        //这个函数第一个参数是Counter更新之后的新值，第二个参数是更新之前的值，如何使用，Counter不用管,父组件来使用
        this.props.onUpdate(newValue, previousValue)
    }
    render(){

        //通过this.props获得传入的caption
        const {caption} = this.props;
        return(
            <div>
                <button style={buttonStyle} onClick={this.onClickIncrementButton}>+</button>
                <button style={buttonStyle} onClick={this.onClickDncrementButton}>-</button>
                <span>{caption}count:{this.state.count}</span>
            </div>
        );
    }
}

//propTypes检查
//prop是组件的对外接口，那么就应该有某种方式让组件声明自己的接口规范，一个组件应该可以规范一次啊这些方面：
//这个组件支持哪些prop
//每个prop通过propTypes来支持这些功能
//在es6方法定义的组件类中，可以通过增加类的propTypes属性来定义prop规格，这不只是声明，而且是一种限制，在运行时
//和静态代码检查是，都可以根据propTypes判断外部世界是否正确的使用了组件的属性
Counter.propTypes = {
    //caption必须是string类型，caption带上了isRequired，这表示Counter组件必须要指定caption，就是Counter必须有caption
    caption:PropTypes.string.isRequired,
    //initValue必须是number类型
    initValue:PropTypes.number,
    onUpdate:PropTypes.func
};

//react的defaultProps功能
//PropType声明中没有用isRequired要求必须有值的prop,所以我们需要判断initValue所给的prop值是否存在，如果不存在，
//就给一个默认的初始值。
Counter.defaultProps = {
    initValue:0,
    onUpdate: f => f  //什么都不用做的函数
}
export default Counter;

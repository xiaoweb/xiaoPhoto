/**
 * Created by zhouliying1 on 2016/4/12.
 */
const React = require('react');
let ReactDOM = require('react-dom');

let Loading = React.createClass({
    end: false,
    hide(){
        this.end = true;
        ReactDOM.findDOMNode(this).classList.add('hideop');
        setTimeout(()=> {
            if (this.end) {
                ReactDOM.unmountComponentAtNode(document.getElementById('loading'));
            }
        }, 300)
    },
    render(){
        return <div className="loading-bar" style={{width: (this.props.progress || this.state.progress) + "%"}}></div>
    },
    getInitialState(){
        return {
            progress: 0
        }
    },
    componentDidMount(){
        if (typeof this.props.progress == "undefined") {
            var time = setInterval(()=> {
                if (this.state.progress < 90 && typeof this.props.progress == "undefined") {
                    this.setState({
                        progress: this.state.progress + 10
                    })
                } else {
                    clearInterval(time);
                }
            }, 100)
        }
    },
    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.progress >= 100) {
            this.hide();
        }
        return true;
    }
});

export default Loading

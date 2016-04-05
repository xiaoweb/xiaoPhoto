/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/2/3 * Time: 15:18 */
var React = require('react');
var ReactDOM = require('react-dom');

var Com = require('../right');

var PubSub = require('pubsub-js');

var HideBtn = React.createClass({
    getInitialState(){
        return {
            hide: false
        }
    },
    render(){
        return <div ref="bar" className="admin-left-btn" onClick={this.click}></div>
    },
    click(){
        [this.refs.bar].forEach(element=> {
            this.state.hide ? (element.classList.remove('act'), PubSub.publish('test')) : (element.classList.add('act'),PubSub.publish('test','act'));
        });
        this.setState({
            hide: !this.state.hide
        })
    }
})

module.exports = HideBtn

/**
 * Created by zhouliying1 on 2016/4/7.
 */
let React = require('react');
let ReactDOM = require('react-dom');

import $ from "jquery";
require('updatedata');

let Test = React.createClass({
    render(){
        return <div>
            hello 小小相册
        </div>
    }
})
ReactDOM.render(<Test/>,document.getElementById('test3'));
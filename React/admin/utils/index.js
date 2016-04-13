/**
 * Created by zhouliying1 on 2016/4/12.
 */
const React = require('react');
let ReactDOM = require('react-dom');
import LoadingBar from "utils/loadingBar"

module.exports = {
    loading(progress){
        ReactDOM.render(<LoadingBar progress={progress} />,document.getElementById('loading'));
    }
}
/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/2/2 * Time: 11:19 */

var React = require('react');
var $ = require('jquery');


var Video = React.createClass({
    getInitialState(){
        return {
            submit: true,
            url: ""
        }
    },
    render(){
        return <div>
            <input ref="file" onChange={this.getUpUrl} type="file"/>
            <input disabled={this.state.submit} onClick={this.upVideo} type="submit"/>
        </div>
    },
    getUpUrl(){
        $.post('/video/get_url', {fileName: '123.mp4'}, data=> {
            this.setState({
                submit: false,
                url:data.data.upload_url
            });
        },'json')
    },
    upVideo(){
        $.post(this.state.url,data=>{
            console.log(data);
        },'json')
    }
})

module.exports = Video;



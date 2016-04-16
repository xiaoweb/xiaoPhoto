/**
 * Created by zhouliying1 on 2016/4/7.
 */
let util = require('utils');
let PubSub = require('pubsub-js');
let React = require('react');
let ReactDom = require('react-dom');
import {
    NavItem,List,ListItem,Button,Progress
} from 'amazeui-react'

let UpdateContent = React.createClass({
    uploader: "",
    render(){
        return <div>
            <Button ref="btn" amStyle="primary" round amSize="xs" onClick={this.upload}>上传图片</Button>
            <span> </span>
            <Button ref="clear" disabled={this.state.disabled} amStyle="primary" round amSize="xs"
                    onClick={this.clearEnd}>清理记录</Button>
            <h5 style={{color:'red'}}>提示:切换到其他页面后,未成功文件会停止上传!</h5>
            <hr></hr>
            {this.state.list.map((t, i)=> {
                let str = '等待中';
                if (t.status == 5) {
                    str = '已完成';
                } else if (t.status == 2) {
                    str = '上传中';
                }
                return <List key={i}>
                    <span>{t.name} </span>
                    <span> ({((t.speed || 0 ) / 1024).toFixed(1) + 'kb' + '/' + (t.size / 1024 / 1024).toFixed(2) + 'MB'})</span>
                    <span>{str}</span>
                    <Progress now={t.percent} label={t.percent+'%'}/>
                </List>
            })}

        </div>
    },
    clearEnd(){
        this.setState({
            list: []
        })
    },
    getInitialState(){
        return {
            list: [],
            disabled: false,
        }
    }
    ,
    componentDidMount(){
        ReactDom.findDOMNode(this.refs.clear).disabled = true;
        this.uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',      // 上传模式,依次退化
            browse_button: ReactDom.findDOMNode(this.refs.btn),         // 上传选择的点选按钮，**必需**
            // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
            // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
            // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
            // uptoken : '<Your upload token>', // uptoken 是上传凭证，由其他程序生成
            uptoken_url: '/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
            //uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
            //   // do something$.post()
            //   return uptoken;
            //},
            get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
            // downtoken_url: '/downtoken',
            // 请Ajax求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
            unique_names: false,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
            save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
            domain: 'http://static.xiaoweb.cn/',     // bucket 域名，下载资源时用到，**必需**
            //container: ReactDom.findDOMNode(this.refs.btn).parentNode,             // 上传区域 DOM ID，默认是 browser_button 的父元素，
            max_file_size: '100mb',             // 最大文件体积限制
            flash_swf_url: 'https://staticfile.qnssl.com/Plupload/2.1.1/Moxie.swf',  //引入 flash,相对路径
            max_retries: 3,                     // 上传失败最大重试次数
            dragdrop: false,                     // 开启可拖曳上传
            //drop_element: 'container',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',                  // 分块上传时，每块的体积
            auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
            //x_vars : {
            //    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
            //    'time' : function(up,file) {
            //        var time = (new Date()).getTime();
            // do something with 'time'
            //        return time;
            //    },
            //    'size' : function(up,file) {
            //        var size = file.size;
            // do something with 'size'
            //        return size;
            //    }
            //},
            init: {
                'FilesAdded': (up, files) => {
                    plupload.each(files, (file) => {
                        // 文件添加进队列后,处理相关的事情
                        var arr = this.state.list;
                        arr.push(file);
                        this.setState({
                            list: arr
                        })
                    });
                    this.setState({
                        disabled: true
                    })
                },
                'BeforeUpload': function (up, file) {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': (up, file) => {
                    //$('#test2').html('<div style="width:' + file.percent + '%;background:#ccc;height:10px;"></div>')
                    // 每个文件上传时,处理相关的事情
                    var arr = this.state.list;

                    this.setState({
                        list: arr.map(t=> {
                            if (t.lastModifiedDate === file.lastModifiedDate) {
                                return file;
                            } else {
                                return t
                            }
                        })
                    })
                },
                'FileUploaded': (up, file, info) => {
                    // 每个文件上传成功后,处理相关的事情
                    // 其中 info 是文件上传成功后，服务端返回的json，形式如
                    // {
                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                    //    "key": "gogopher.jpg"
                    //  }
                    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                    var arr = this.state.list;

                    this.setState({
                        list: arr.map(t=> {
                            if (t.lastModifiedDate === file.lastModifiedDate) {
                                return file;
                            } else {
                                return t
                            }
                        })
                    })

                },
                'Error': function (up, err, errTip) {
                    //上传出错时,处理相关的事情
                    alert(JSON.parse(err.response).error)
                },
                'UploadComplete': (up, file) => {
                    //队列文件处理完毕后,处理相关的事情
                    this.setState({
                        disabled: false
                    })
                },
                'Key': function (up, file) {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    // 该配置必须要在 unique_names: false , save_key: false 时才生效
                    /*var key = path + file.id+"."+file.name;*/
                    /* return key*/
                }
            }
        });
    },
    componentWillUnmount(){
        this.uploader.destroy()
    }
})

module.exports = UpdateContent;
export default UpdateContent;
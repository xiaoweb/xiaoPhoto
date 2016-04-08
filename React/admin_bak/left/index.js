/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/2/2 * Time: 9:10 */

let React = require('react');
let ReactDOM = require('react-dom');
import {Link,IndexLink} from 'react-router'
let Com = {
    hideBtn: require('left/hideBtn')
}

var PubSub = require('pubsub-js');

let Left = React.createClass({
    observer(msg, data){
        let node = ReactDOM.findDOMNode(this);
        data ? node.classList.add(data) : node.classList.remove('act')
    },
    render(){
        return (
            <div className="admin-left">
                {
                    this.state.navList.map((t, i)=> {
                        if (t.path) {
                            return <div key={i} className="admin-left-navlist">
                                <h5 onClick={this.navToggle}>{t.label}</h5>
                                <ul>
                                    <li >
                                        {t.path.map((t, i)=> {
                                            return <IndexLink key={i} to={t.link}
                                                              activeClassName='act'>{t.name}
                                            </IndexLink>
                                        })}
                                    </li>
                                </ul>
                            </div>
                        } else {
                            return <ul key={i}>
                                <li>
                                    <IndexLink to={t.link} activeClassName='act'>{t.name}</IndexLink>
                                </li>
                            </ul>
                        }
                    })
                }
            </div>
        )
    },
    getInitialState(){
        return {
            navList: [
                {link: '/admin/', name: '首页'},
                {link: '/admin/video', name: '视频'}/*,
                {
                    label: 'test',
                    path: [
                        {link: '/admin/test', name: 'test'}
                    ]
                }*/

            ]
        }
    },
    componentDidMount(){
        PubSub.subscribe('test', this.observer);
    },
    navToggle(e){
        let element = e.target.parentElement.classList;
        Array.prototype.includes.call(element, ('act')) ? element.remove('act') : element.add('act')
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.observer);
    }
})

export {Left , Com} ;
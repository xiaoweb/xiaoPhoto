/**
 * Created by zhou on 16/4/8.
 */
let React = require('react');
let PubSub = require('pubsub-js');

const host = staticHost;

let List = React.createClass({
    observer(msg, data){
        this.getList();
    },
    getList(){
        $.post('/list', data=> {
            this.setState({
                list: data.items
            })
        }, 'json')
    },
    getInitialState(){
        return {
            list: []
        }
    },
    render(){
        return <ul>
            {
                this.state.list.map((t, i)=> {
                    return <li key={i}>
                        <img src={host+'/'+t.key+'!100'}/>
                    </li>
                })
            }
        </ul>
    },
    componentDidMount(){
        this.getList();
        PubSub.subscribe('updateList', this.observer)
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.observer);
    }
})

export default List;
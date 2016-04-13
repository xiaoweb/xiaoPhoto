/**
 * Created by zhou on 16/4/8.
 */
let React = require('react');
let PubSub = require('pubsub-js');
import utils from "utils";


import {
    AvgGrid, Col ,Grid
} from 'amazeui-react'


const host = staticHost;

let List = React.createClass({
    observer(msg, data){
        this.getList();
    },
    getList(){
        utils.loading();
        $.post('/list', data=> {
            this.setState({
                list: data.items
            });
            utils.loading(100);
        }, 'json')
    },
    getInitialState(){
        return {
            list: []
        }
    },
    render(){
        return <div>
            <AvgGrid id="user-img-list" sm={2} md={4} lg={6}>
                {
                    this.state.list.map((t, i)=> {
                        return <li key={i}>
                            <img data-layer-src={host+'/'+t.key+'!800'} width="80%" style={{margin:"10%"}} src={host+'/'+t.key+'!230'}  />
                        </li>
                    })
                }

            </AvgGrid>

        </div>
    },
    componentDidMount(){
        this.getList();
        PubSub.subscribe('updateList', this.observer);
    },
    componentDidUpdate(){
        $('#user-img-list img').unbind();
        layer.photos({
            photos: '#user-img-list'
        });
    },
    componentWillUnmount(){
        PubSub.unsubscribe(this.observer);
    }
})

export default List;
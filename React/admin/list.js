/**
 * Created by zhou on 16/4/8.
 */
let React = require('react');

let List = React.createClass({
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
                        <img src={'http://7xsn4t.com2.z0.glb.qiniucdn.com/'+t.key+'!100'} />
                    </li>
                })
            }
        </ul>
    },
    componentDidMount(){
        $.post('/list', data=> {
            this.setState({
                list: data.items
            })
        }, 'json')
    }
})

export default List;
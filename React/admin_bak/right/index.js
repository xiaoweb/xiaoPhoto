/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/2/2 * Time: 9:10 */

let React = require('react');
let Com = {
    init: require('right/init'),
    video: require('right/video')
}

let Right = React.createClass({
    render(){
        return (
            <div className="admin-right">
                {this.props.children}
            </div>
        )
    }
})


export { Right ,Com };
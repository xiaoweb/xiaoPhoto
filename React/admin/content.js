/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/2/2 * Time: 9:17 */
let React = require('react');

import Head from 'head';
import {Left , Com} from 'left';
import {Right} from 'right';
import Bottom from 'bottom';


let Content = React.createClass({
    render(){
        return(
          <div className="admin-content">
              <Head/>
              <div className="admin-middle">
                  <Left/>
                  <Com.hideBtn />
                  <Right>
                      {this.props.children}
                  </Right>
              </div>
              <Bottom/>
          </div>
        )
    }
})


export default Content;

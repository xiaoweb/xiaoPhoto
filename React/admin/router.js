/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/2/2 * Time: 12:36 */

import { Router, Route, Link, browserHistory,IndexRoute } from 'react-router'

import Content from 'content';
import {Com} from 'right';
import NoPage from 'nopage'

var rootRoute = {
    path: '/admin',
    component: Content,
    indexRoute: {component: Com.init},
    childRoutes: [
        {path:'video',component: Com.video},
        {path:'*',component: NoPage}
    ]
}



export default rootRoute


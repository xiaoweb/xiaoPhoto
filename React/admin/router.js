/**
 * Created by zhouliying1 on 2016/4/15.
 */
import Content from 'content'
import List from 'list'
import utils from "utils";

var rootRoute = {
    path: '/',
    component: Content,
    indexRoute: {component:List},
    childRoutes: [
        {path:'upload',getComponents(nextState, callback) {
            utils.loading();
            require([], function (require) {
                utils.loading(100);
                callback(null, require('updatedata'))
            })
        }},
        {path:'list',component: List},
        {path:'*',component: List},
    ]
}



export default rootRoute

/**
 * Created by zhouliying1 on 2016/4/15.
 */
import Content from 'content'
import List from 'list'
import Upload from 'updatedata'

var rootRoute = {
    path: '/',
    component: Content,
    indexRoute: {component:List},
    childRoutes: [
        {path:'upload',component: Upload},
        {path:'list',component: List},
        {path:'*',component: List},
    ]
}



export default rootRoute

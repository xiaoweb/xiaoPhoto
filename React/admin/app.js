/**
 * Created by zhouliying1 on 2016/4/7.
 */
let React = require('react');
let ReactDOM = require('react-dom');
import {
    AvgGrid, Col ,Grid,Nav,NavItem,Topbar,CollapsibleNav,
} from 'amazeui-react'

import List from "list";
import UpLoadBtn from "updatedata";

let UserIndex = React.createClass({
    render(){
        return <Grid>
            <Col sm={12} md={12} lg={12}>
                <Nav tabs className="user-nav-top">
                    <NavItem active href="#">首页</NavItem>
                    <NavItem href="#">开始使用</NavItem>
                    <NavItem href="#">按需定制</NavItem>
                </Nav>
            </Col>
            <Col sm={12} md={2} lg={2}>
                <Nav>
                    <NavItem active href="#">图片列表</NavItem>
                    <UpLoadBtn />
                    <NavItem href="/logout">退出</NavItem>
                </Nav>
            </Col>
            <Col sm={12} md={10} lg={10}>
                <List />
            </Col>
        </Grid>
    }
})

ReactDOM.render(<UserIndex />,document.getElementById('content'));

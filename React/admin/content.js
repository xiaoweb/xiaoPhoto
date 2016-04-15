/**
 * Created by zhouliying1 on 2016/4/15.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import {
    AvgGrid, Col, Grid, Nav, NavItem, Topbar, CollapsibleNav,
} from 'amazeui-react'
import {Link, IndexLink} from 'react-router'

let Content = React.createClass({
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
                    <NavItem>
                        <IndexLink to="/list" activeClassName='active'>图片列表</IndexLink>
                    </NavItem>
                    <NavItem>
                        <IndexLink to="/upload" activeClassName='active'>上传列表</IndexLink>
                    </NavItem>
                    <NavItem href="/logout">退出</NavItem>
                </Nav>
            </Col>
            <Col sm={12} md={10} lg={10}>
                {this.props.children}
            </Col>
        </Grid>
    }
})

export default Content;
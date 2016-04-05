let React = require('react');
let ReactDOM = require('react-dom');
import routes from 'router';

import { Router,browserHistory } from 'react-router'

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('content'));
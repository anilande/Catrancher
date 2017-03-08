import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import Hotels from './main';
import NotFoundPage from './components/NotFoundPage';

const routes = (
	<Router>
	    <Route path="/" component={Hotels} />
	    <Route path="*" component={NotFoundPage} />
	</Router>
);

export default routes;
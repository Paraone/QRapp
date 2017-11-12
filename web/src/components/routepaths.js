import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import store, {history} from '../store';

//components
import Connector from './connector';
import home from './pages/home';
import AllUsers from './pages/allUsers';
import SingleUser from './pages/singleUser';
import AllFiles from './pages/allFiles';
import SingleFile from './pages/singleFile';

class RoutePaths extends Component{
  render(){
    return(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Connector}>
            <IndexRoute component={home}></IndexRoute>
            <Route path="users">
              <IndexRoute component={AllUsers}></IndexRoute>
              <Route path=":id">
                <IndexRoute component={SingleUser}></IndexRoute>
                <Route path="files">
                  <IndexRoute component={AllFiles}></IndexRoute>
                  <Route path=":filename" component={SingleFile}></Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default RoutePaths;

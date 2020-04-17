import React, {Fragment} from 'react';

import './Layout.css';
import NavigationBar from "../UI/NavigationBar/NavigationBar";

const Layout = props => {
  return (
    <Fragment>
      <NavigationBar />
      <div className='Layout'>
        {props.children}
      </div>
    </Fragment>
  );
};

export default Layout;
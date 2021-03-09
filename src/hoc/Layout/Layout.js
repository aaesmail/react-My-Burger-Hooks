import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closeSideDrawerHandler = () => {
    setShowSideDrawer(false);
  };

  const toggleSideDrawerHandler = () => {
    setShowSideDrawer((prevShowSideDrawer) => !prevShowSideDrawer);
  };

  return (
    <Fragment>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={toggleSideDrawerHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        show={showSideDrawer}
        close={closeSideDrawerHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);

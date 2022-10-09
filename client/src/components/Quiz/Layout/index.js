import PropTypes from "prop-types";
import Navbar from "../../Home/Navbar";
import React, { Fragment } from "react";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <main style={{ marginTop: "5em" }}> {children} </main>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;

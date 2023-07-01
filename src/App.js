import React, { Children } from "react";
import { Fragment } from "react";

const Layout = ({ children }) => {
  return <div className="layout">{children}</div>
} 

export default function Square() {
  return (
    <Layout>
      <button className="square">X</button>
      <button className="square">X</button>
    </Layout>
  );
}

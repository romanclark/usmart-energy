import React from "react";
import loading from "../../assets/loading.svg";

const Loading = (props) => (
  <div className={props.type}>
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;

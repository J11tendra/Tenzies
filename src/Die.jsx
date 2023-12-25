import React from "react";

export default function Die(props) {
  return (
    <div
      className={`die-face ${props.isHeld ? "active" : ""}`}
      onClick={props.handleClick}
    >
      <h2>{props.value}</h2>
    </div>
  );
}

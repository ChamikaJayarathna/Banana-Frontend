import React from 'react';
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
        <h1>Welcome to the Banana Game</h1>
        <Link to={'/signup'}>signup</Link>
        <br />
        <Link to={'/login'}>login</Link>
    </div>
  );
}

export default Welcome;
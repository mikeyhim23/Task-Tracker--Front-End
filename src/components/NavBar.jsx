import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/user-tasks">User Tasks</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;

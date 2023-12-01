import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function NavBar() {
    return (
        <nav>
            <Link to='/' className="navItem">Overview</Link>
            <Link to='/server' className="navItem">Server Interface</Link>
            <Link to='/kitchen' className="navItem">Kitchen Interface</Link>
            <Link to='/documentation' className="navItem">Documentation</Link>
        </nav>
    );
};
import React from 'react'
import { useEffect } from 'react';

function NotFound() {

    useEffect(() => {
        // change background color to bg-dark
        document.body.className = "bg-dark";
    }, []);

    return (
        <div>404 Page not found</div>
    )
}

export default NotFound
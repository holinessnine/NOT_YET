import React from 'react';
import { useLocation } from 'react-router-dom';

const RedirectPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const url = query.get('url');

    if (url) {
        window.location.href = url;
        return <p>Redirecting...</p>;
    }

    return <p>No URL provided</p>;
};

export default RedirectPage;

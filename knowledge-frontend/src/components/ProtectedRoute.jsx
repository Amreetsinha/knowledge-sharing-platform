import React from 'react';
import { Navigate } from 'react-router-dom';
import JwtUtils from '../utils/security/JwtUtils';

/**
 * ProtectedRoute component as requested by the user.
 * It checks if the user is authenticated, if the token is expired, 
 * and if the user has the required roles.
 */
const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
    if (!JwtUtils.isAuthenticated() || JwtUtils.isTokenExpired()) {
        return <Navigate to="/unauthorized" replace/>;
    } else {
        const userRoles = JwtUtils.getUserRoles();
        return (
            userRoles.some(role => allowedRoles.includes(role)) ? (
                <Component />
            ) : (
                <Navigate to="/unauthorized" replace />
            )
        );
    }
};

export default ProtectedRoute;

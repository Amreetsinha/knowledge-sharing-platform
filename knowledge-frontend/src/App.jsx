import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import CreateArticle from './pages/CreateArticle';
import ArticleView from './pages/ArticleView';
import ManageArticles from './pages/ManageArticles';
import EditArticle from './pages/EditArticle';




function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/articles" element={<Dashboard />} />
        <Route path="/article/:id" element={<ArticleView />} />


        {/* Protected Routes Example */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute 
              element={Dashboard} 
              allowedRoles={['USER', 'ADMIN']} 
            />
          } 
        />
        
        <Route 
          path="/create-article" 
          element={
            <ProtectedRoute 
              element={CreateArticle} 
              allowedRoles={['USER', 'ADMIN']} 
            />
          } 
        />

        <Route 
          path="/manage-articles" 
          element={
            <ProtectedRoute 
              element={ManageArticles} 
              allowedRoles={['USER', 'ADMIN']} 
            />
          } 
        />

        <Route 
          path="/edit-article/:id" 
          element={
            <ProtectedRoute 
              element={EditArticle} 
              allowedRoles={['USER', 'ADMIN']} 
            />
          } 
        />


        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute 
              element={() => <div className="p-10 text-white">User Profile Content</div>} 
              allowedRoles={['USER', 'ADMIN']} 
            />
          } 
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


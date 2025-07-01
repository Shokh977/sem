import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Components/Pages/Home'
import Courses from './Components/Pages/Courses'
import About from './Components/Pages/About'
import Blog from './Components/Pages/Blog';
import SignIn from './Components/Pages/SignIn'
import SignUp from './Components/Pages/SignUp'
import Xizmatlar from './Components/Pages/Xizmatlar'
import Admin from './Components/Pages/Admin'
import CourseDetail from './Components/Pages/CourseDetail'
import CourseManagement from './Components/Pages/CourseManagement'
import CourseEdit from './Components/Pages/CourseEdit'
import BlogDetail from './Components/Pages/BlogDetail'
import BlogEdit from './Components/Pages/BlogEdit'
import EmailVerification from './Components/Pages/EmailVerification'
import Portfolio from './Components/Pages/Portfolio'
import Profile from './Components/Pages/Profile'
import SuccessStories from './Components/Pages/SuccessStories'
import SavedBlogs from './Components/Pages/SavedBlogs'

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function AppContent() {
  return (
    <Router>
      <Navbar />
      <main className="bg-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/xizmatlar" element={<Xizmatlar />} />
          <Route path="/admin/*" element={
            <ProtectedRoute adminOnly>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses" element={
            <ProtectedRoute adminOnly>
              <CourseManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses/new" element={
            <ProtectedRoute adminOnly>
              <CourseEdit />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses/edit/:id" element={
            <ProtectedRoute adminOnly>
              <CourseEdit />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/portfolio" element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/blog/:blogId" element={<BlogDetail />} />
          <Route path="/saved-blogs" element={
            <ProtectedRoute>
              <SavedBlogs />
            </ProtectedRoute>
          } />
          <Route path="/admin/blogs/new" element={
            <ProtectedRoute adminOnly>
              <BlogEdit />
            </ProtectedRoute>
          } />
          <Route path="/admin/blogs/edit/:id" element={
            <ProtectedRoute adminOnly>
              <BlogEdit />
            </ProtectedRoute>
          } />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App

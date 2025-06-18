import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Components/Pages/Home'
import Courses from './Components/Pages/Courses'
import About from './Components/Pages/About'
import Blog from './Components/Pages/Blog'
import SignIn from './Components/Pages/SignIn'
import SignUp from './Components/Pages/SignUp'
import Xizmatlar from './Components/Pages/Xizmatlar'
import Admin from './Components/Pages/Admin'
import CourseDetail from './Components/Pages/CourseDetail'
import BlogDetail from './Components/Pages/BlogDetail'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="bg-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/xizmatlar" element={<Xizmatlar />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/blog/:blogId" element={<BlogDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App

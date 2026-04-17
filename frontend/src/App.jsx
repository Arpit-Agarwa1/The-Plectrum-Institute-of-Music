/**
 * APP — website routes (each path shows a different page)
 */
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout.jsx";
import { HomePage } from "./pages/public/Home.jsx";
import { AboutPage } from "./pages/public/About.jsx";
import { CoursesPage } from "./pages/public/Courses.jsx";
import { CourseDetailPage } from "./pages/public/CourseDetails.jsx";
import { TeachersPage } from "./pages/public/Teachers.jsx";
import { TeacherDetailPage } from "./pages/public/TeacherDetails.jsx";
import { GalleryPage } from "./pages/public/Gallery.jsx";
import { TestimonialsPage } from "./pages/public/Testimonials.jsx";
import { ContactPage } from "./pages/public/Contact.jsx";
import { BookingPage } from "./pages/student/BookClass.jsx";
import { BlogPage } from "./pages/public/Blog.jsx";
import { BlogPostPage } from "./pages/public/BlogPost.jsx";
import { LoginPage } from "./pages/auth/Login.jsx";
import { RegisterPage } from "./pages/auth/Register.jsx";
import { NotFoundPage } from "./pages/public/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/teachers/:id" element={<TeacherDetailPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

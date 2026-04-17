/**
 * API ROUTES — all URLs under /api
 *
 * Pattern: router.METHOD(path, middleware..., controller)
 */

import { Router } from "express";
import { body } from "express-validator";

import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { authLimiter, bookingLimiter } from "../middleware/rateLimit.js";
import { uploadSingleImage } from "../middleware/upload.js";

import * as authController from "../controllers/authController.js";
import * as courseController from "../controllers/courseController.js";
import * as teacherController from "../controllers/teacherController.js";
import * as appointmentController from "../controllers/appointmentController.js";
import * as testimonialController from "../controllers/testimonialController.js";
import * as galleryController from "../controllers/galleryController.js";
import * as eventController from "../controllers/eventController.js";
import * as blogController from "../controllers/blogController.js";
import * as newsletterController from "../controllers/newsletterController.js";
import * as userController from "../controllers/userController.js";
import * as uploadController from "../controllers/uploadController.js";
import * as stripeController from "../controllers/stripeController.js";

const router = Router();

// ---------- Auth ----------
router.post(
  "/auth/register",
  authLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 characters"),
  ],
  authController.register
);

router.post(
  "/auth/login",
  authLimiter,
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login
);

router.get("/auth/me", requireAuth, authController.me);

// ---------- Courses (public) ----------
router.get("/courses", courseController.listCourses);
router.get("/courses/:slug", courseController.getCourse);

// ---------- Teachers (public) ----------
router.get("/teachers", teacherController.listTeachers);
router.get("/teachers/:id", teacherController.getTeacher);

// ---------- Appointments ----------
router.post(
  "/appointments",
  bookingLimiter,
  optionalAuth,
  appointmentController.createAppointment
);
router.get(
  "/appointments/mine",
  requireAuth,
  appointmentController.listMyAppointments
);

// ---------- Testimonials (public) ----------
router.get("/testimonials", testimonialController.listTestimonials);

// ---------- Gallery (public) ----------
router.get("/gallery", galleryController.listGallery);

// ---------- Events (public) ----------
router.get("/events", eventController.listEvents);

// ---------- Blog (public) ----------
router.get("/blog", blogController.listPosts);
router.get("/blog/:slug", blogController.getPost);

// ---------- Newsletter ----------
router.post(
  "/newsletter",
  [body("email").trim().notEmpty().isEmail().withMessage("Valid email required")],
  newsletterController.subscribe
);

// ---------- Stripe ----------
router.post("/stripe/checkout", stripeController.createCheckoutSession);
// Note: webhook is mounted in app.js with raw body

// ---------- Admin: courses ----------
router.get("/admin/courses", requireAuth, requireAdmin, courseController.adminListCourses);
router.post("/admin/courses", requireAuth, requireAdmin, courseController.createCourse);
router.patch("/admin/courses/:id", requireAuth, requireAdmin, courseController.updateCourse);
router.delete("/admin/courses/:id", requireAuth, requireAdmin, courseController.deleteCourse);

// ---------- Admin: teachers ----------
router.post("/admin/teachers", requireAuth, requireAdmin, teacherController.createTeacher);
router.patch("/admin/teachers/:id", requireAuth, requireAdmin, teacherController.updateTeacher);
router.delete("/admin/teachers/:id", requireAuth, requireAdmin, teacherController.deleteTeacher);

// ---------- Admin: appointments ----------
router.get(
  "/admin/appointments",
  requireAuth,
  requireAdmin,
  appointmentController.adminListAppointments
);
router.patch(
  "/admin/appointments/:id",
  requireAuth,
  requireAdmin,
  appointmentController.updateAppointmentStatus
);

// ---------- Admin: testimonials ----------
router.get(
  "/admin/testimonials",
  requireAuth,
  requireAdmin,
  testimonialController.adminList
);
router.post(
  "/admin/testimonials",
  requireAuth,
  requireAdmin,
  testimonialController.createTestimonial
);
router.delete(
  "/admin/testimonials/:id",
  requireAuth,
  requireAdmin,
  testimonialController.deleteTestimonial
);

// ---------- Admin: gallery ----------
router.post(
  "/admin/gallery",
  requireAuth,
  requireAdmin,
  uploadSingleImage.single("image"),
  galleryController.createGalleryItem
);
router.delete(
  "/admin/gallery/:id",
  requireAuth,
  requireAdmin,
  galleryController.deleteGalleryItem
);

// ---------- Admin: events ----------
router.get("/admin/events", requireAuth, requireAdmin, eventController.adminListEvents);
router.post("/admin/events", requireAuth, requireAdmin, eventController.createEvent);
router.patch("/admin/events/:id", requireAuth, requireAdmin, eventController.updateEvent);
router.delete("/admin/events/:id", requireAuth, requireAdmin, eventController.deleteEvent);

// ---------- Admin: blog ----------
router.post("/admin/blog", requireAuth, requireAdmin, blogController.createPost);
router.patch("/admin/blog/:id", requireAuth, requireAdmin, blogController.updatePost);
router.delete("/admin/blog/:id", requireAuth, requireAdmin, blogController.deletePost);

// ---------- Admin: students ----------
router.get("/admin/students", requireAuth, requireAdmin, userController.listStudents);

// ---------- Admin: upload image URL helper ----------
router.post(
  "/admin/upload",
  requireAuth,
  requireAdmin,
  uploadSingleImage.single("file"),
  uploadController.uploadImage
);

export default router;

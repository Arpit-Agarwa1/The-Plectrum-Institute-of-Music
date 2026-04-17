/**
 * DEMO DATA — used by `npm run seed` and by the server when MONGODB_URI=memory.
 * Assumes Mongoose is already connected.
 */

import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { Teacher } from "../models/Teacher.js";
import { Testimonial } from "../models/Testimonial.js";
import { Event } from "../models/Event.js";
import { BlogPost } from "../models/BlogPost.js";
import { slugify } from "../utils/slug.js";

export async function seedDemoData() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@plectrum.music";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const hash = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hash,
      role: "admin",
    });
    console.log("Created admin user:", adminEmail);
  } else {
    console.log("Admin user already exists, skipping.");
  }

  const courseCount = await Course.countDocuments();
  if (courseCount === 0) {
    const samples = [
      {
        title: "Guitar",
        description:
          "Acoustic and electric fundamentals, chords, and songs you love.",
        instructor: "James Cole",
        duration: "12 weeks",
        level: "Beginner to Intermediate",
        image:
          "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80",
      },
      {
        title: "Piano",
        description:
          "Reading notation, technique, and classical and pop repertoire.",
        instructor: "Elena Mora",
        duration: "12 weeks",
        level: "All levels",
        image:
          "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
      },
      {
        title: "Drums",
        description:
          "Timing, grooves, and coordination in a supportive studio.",
        instructor: "Marcus Lee",
        duration: "10 weeks",
        level: "Beginner",
        image:
          "https://images.unsplash.com/photo-1519892300165-ceb5583e4bff?w=800&q=80",
      },
      {
        title: "Vocal Training",
        description: "Breath control, pitch, and performance confidence.",
        instructor: "Sofia Reyes",
        duration: "8 weeks",
        level: "All levels",
        image:
          "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
      },
      {
        title: "Music Theory",
        description: "Scales, harmony, and ear training for any instrument.",
        instructor: "Elena Mora",
        duration: "10 weeks",
        level: "Beginner",
        image:
          "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
      },
      {
        title: "Violin",
        description: "Posture, bowing, and beautiful tone from week one.",
        instructor: "Anna Weiss",
        duration: "12 weeks",
        level: "Beginner to Advanced",
        image:
          "https://images.unsplash.com/photo-1465821185615-80aaa3df3c75?w=800&q=80",
      },
    ];

    for (const c of samples) {
      await Course.create({ ...c, slug: slugify(c.title), isPublished: true });
    }
    console.log("Inserted demo courses.");
  }

  const teacherCount = await Teacher.countDocuments();
  if (teacherCount === 0) {
    await Teacher.insertMany([
      {
        name: "James Cole",
        instrument: "Guitar",
        experience: "15+ years",
        bio: "Touring guitarist and patient teacher focused on musicality.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        socialLinks: { youtube: "https://youtube.com" },
        availability: [
          { day: "Monday", start: "14:00", end: "18:00" },
          { day: "Wednesday", start: "10:00", end: "14:00" },
        ],
        order: 1,
      },
      {
        name: "Elena Mora",
        instrument: "Piano & Theory",
        experience: "20+ years",
        bio: "Classical training with a love for modern arrangements.",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        socialLinks: { instagram: "https://instagram.com" },
        order: 2,
      },
    ]);
    console.log("Inserted demo teachers.");
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany([
      {
        studentName: "Priya K.",
        course: "Guitar",
        rating: 5,
        review:
          "Clear lessons and a calm studio. I finally learned barre chords!",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        isPublished: true,
      },
    ]);
    console.log("Inserted demo testimonial.");
  }

  const eventCount = await Event.countDocuments();
  if (eventCount === 0) {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    await Event.create({
      title: "Spring Student Recital",
      description: "Celebrate progress with friends and family.",
      date: d,
      location: "Main Hall",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    });
    console.log("Inserted demo event.");
  }

  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.create({
      title: "5 Warm-Up Ideas Before Practice",
      slug: "5-warm-up-ideas-before-practice",
      excerpt: "Short routines that protect your hands and ears.",
      content:
        "Start slow. Focus on one phrase. Use a metronome only after the motion feels easy...",
      coverImage:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    });
    console.log("Inserted demo blog post.");
  }

  console.log("Demo data ready.");
}

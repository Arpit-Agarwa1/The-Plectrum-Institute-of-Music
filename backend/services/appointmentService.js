/**
 * APPOINTMENT SERVICE — bookings and status updates.
 */

import { Appointment } from "../models/Appointment.js";
import { sendMail } from "../config/mail.js";
import { notFound } from "../utils/httpError.js";

export async function createBooking(body, optionalUserId) {
  const data = { ...body };
  if (optionalUserId) data.userId = optionalUserId;

  const appointment = await Appointment.create(data);

  const lines = [
    `Hello ${appointment.name},`,
    ``,
    `We received your booking request for ${appointment.course}.`,
    `Date: ${appointment.date} at ${appointment.time}`,
    `Status: ${appointment.status}`,
    ``,
    `We will contact you soon at ${appointment.email}.`,
    ``,
    `— The Plectrum Institute of Music`,
  ];

  await sendMail({
    to: appointment.email,
    subject: "Booking received — Plectrum Institute",
    text: lines.join("\n"),
  });

  return appointment;
}

export async function listAppointmentsForUser(userId) {
  return Appointment.find({ userId }).sort({ createdAt: -1 });
}

export async function listAllAppointmentsAdmin() {
  return Appointment.find().sort({ createdAt: -1 });
}

export async function updateAppointmentAdmin(id, { status, meetingUrl }) {
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status, meetingUrl },
    { new: true }
  );
  if (!appointment) throw notFound("Appointment not found");

  if (appointment.email && status === "approved") {
    await sendMail({
      to: appointment.email,
      subject: "Your class is confirmed",
      text: `Hi ${appointment.name},\n\nYour booking is approved.\n${
        meetingUrl ? `Online link: ${meetingUrl}\n` : ""
      }\n— Plectrum Institute`,
    });
  }

  return appointment;
}

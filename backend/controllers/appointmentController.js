/**
 * APPOINTMENT CONTROLLER (MVC)
 */

import * as appointmentService from "../services/appointmentService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createAppointment = asyncHandler(async (req, res) => {
  const userId = req.user && req.user.id ? req.user.id : null;
  const appointment = await appointmentService.createBooking(req.body, userId);
  jsonResponse.jsonData(res, appointment, 201);
});

export const listMyAppointments = asyncHandler(async (req, res) => {
  const list = await appointmentService.listAppointmentsForUser(req.user.id);
  jsonResponse.jsonData(res, list);
});

export const adminListAppointments = asyncHandler(async (req, res) => {
  const list = await appointmentService.listAllAppointmentsAdmin();
  jsonResponse.jsonData(res, list);
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentAdmin(
    req.params.id,
    req.body
  );
  jsonResponse.jsonData(res, appointment);
});

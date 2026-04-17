/**
 * EVENT CONTROLLER (MVC)
 */

import * as eventService from "../services/eventService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listEvents = asyncHandler(async (req, res) => {
  const data = await eventService.listUpcomingEvents();
  jsonResponse.jsonData(res, data);
});

export const adminListEvents = asyncHandler(async (req, res) => {
  const data = await eventService.listAllEventsAdmin();
  jsonResponse.jsonData(res, data);
});

export const createEvent = asyncHandler(async (req, res) => {
  const item = await eventService.createEvent(req.body);
  jsonResponse.jsonData(res, item, 201);
});

export const updateEvent = asyncHandler(async (req, res) => {
  const item = await eventService.updateEvent(req.params.id, req.body);
  jsonResponse.jsonData(res, item);
});

export const deleteEvent = asyncHandler(async (req, res) => {
  await eventService.deleteEvent(req.params.id);
  jsonResponse.jsonMessage(res, "Deleted");
});

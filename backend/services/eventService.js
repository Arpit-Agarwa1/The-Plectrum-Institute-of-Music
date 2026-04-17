/**
 * EVENT SERVICE
 */

import { Event } from "../models/Event.js";
import { notFound } from "../utils/httpError.js";

export async function listUpcomingEvents() {
  return Event.find({ date: { $gte: new Date() } }).sort({ date: 1 });
}

export async function listAllEventsAdmin() {
  return Event.find().sort({ date: 1 });
}

export async function createEvent(body) {
  return Event.create(body);
}

export async function updateEvent(id, body) {
  const item = await Event.findByIdAndUpdate(id, body, { new: true });
  if (!item) throw notFound("Not found");
  return item;
}

export async function deleteEvent(id) {
  const item = await Event.findByIdAndDelete(id);
  if (!item) throw notFound("Not found");
  return item;
}

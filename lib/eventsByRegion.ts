import { EVENTS } from "@/lib/events";

export function getEventsByRegion(regionId: string) {
  return EVENTS.filter(e => e.regionId === regionId);
}
"use client";

import {
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { EVENTS } from "../lib/events";
import type { MapHandle } from "./Map";

type Region = {
  id: string;
  name: string;
};

type SearchItem = {
  type: "Place" | "Event";
  label: string;
  regionId: string;
};

type RegionSearchProps = {
  mapRef: RefObject<MapHandle | null>;
};

export default function RegionSearch({ mapRef }: RegionSearchProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  
  useEffect(() => {
    if (!mapRef.current) return;

    const list = mapRef.current.getRegions();
    setRegions(list);
  }, [mapRef]);

const searchIndex = useMemo((): SearchItem[] => {
  const regionEntries = regions.map(r => ({
    type: "Place" as const,
    label: r.name,
    regionId: r.id,
  }));

  const eventEntries = EVENTS.map(e => ({
    type: "Event" as const,
    label: e.name,
    regionId: e.regionId,
  }));

  return [...regionEntries, ...eventEntries];
}, [regions]);

  
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return searchIndex.filter(item =>
      item.label.toLowerCase().includes(q)
    );
  }, [query, searchIndex]);

  
  const select = (item: SearchItem) => {
    setActive(item.regionId);
    mapRef.current?.zoomTo(item.regionId);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      select(results[0]);
    }
  };

  return (
    <div className="event-list">
      <h3>Search Events</h3>

      <input
        className="event-search"
        type="text"
        placeholder="Search event or region…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />

      <ul>
        {results.map((item, i) => (
          <li
            key={i}
            className={active === item.regionId ? "active" : ""}
            onClick={() => select(item)}
          >
            {item.label}
            <span className={"tag " + item.type}>
              {" " + item.type}
            </span>
          </li>
        ))}

        {query && results.length === 0 && (
          <li className="no-results">No matches</li>
        )}
      </ul>
    </div>
  );
}

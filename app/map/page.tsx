"use client";

import { useRef, useState } from "react";
import SVGMap, { type MapHandle, type TooltipState } from "@/components/Map";
import RegionSearch from "@/components/EventList";
import Modal from "@/components/Modal";
import Tooltip from "@/components/Tooltip";

export default function Map() {
    const mapRef = useRef<MapHandle | null>(null);

    const [modal, setModal] = useState({
        open: false,
        title: "",
        text: ""
    });

    const [tooltip, setTooltip] = useState<TooltipState>({
        visible: false,
        x: 0,
        y: 0,
        title: "",
        info: ""
    });

    return (
        <>
            <Tooltip {...tooltip} />
            <div className="map-scope">
            <SVGMap
                ref={mapRef}
                onRegionSelect={(title, text) =>
                    setModal({ open: true, title, text })
                }
                onTooltip={setTooltip}
            />
            </div>

            <RegionSearch mapRef={mapRef} />

            <Modal
                open={modal.open}
                title={modal.title}
                text={modal.text}
                onClose={() => setModal({ open: false, title: "", text: "" })}
            />
        </>
    );
}

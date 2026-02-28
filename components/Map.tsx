"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type Dispatch,
  type PointerEvent as ReactPointerEvent,
  type SetStateAction,
  type WheelEvent as ReactWheelEvent,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import WaterShader from "./WaterShader";
import "./Map.css"

gsap.registerPlugin(useGSAP);

const ROTATE_THRESHOLD = 0.15; // radians ≈ 8.5°
const PINCH_THRESHOLD = 0.05;

const MIN_SCALE = 0.6;
const MAX_SCALE = 4;

type RegionRecord = {
  id: string;
  name: string;
};

export type MapHandle = {
  zoomTo: (regionId: string) => void;
  getRegions: () => RegionRecord[];
};

export type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  info: string;
};

type MapProps = {
  onRegionSelect?: (title: string, info: string) => void;
  onTooltip?: Dispatch<SetStateAction<TooltipState>>;
};

type PointerData = {
  clientX: number;
  clientY: number;
};

type PanZoomState = {
  scale: number;
  rotation: number;
  x: number;
  y: number;
  dragging: boolean;
  isPinching: boolean;
  dragDistance: number;
  lastX: number;
  lastY: number;
  svgScale: number;
  pointerDownTarget: EventTarget | null;
  pointers: Map<number, PointerData>;
  initialPinchDistance: number | null;
  initialScale: number;
  pinchMidpoint: { x: number; y: number } | null;
  initialRotation: number;
  initialPinchAngle: number;
};

const SVGMap = forwardRef<MapHandle, MapProps>(function SVGMap(
  { onRegionSelect, onTooltip },
  ref,
) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const mapRef = useRef<SVGGElement | null>(null);
  const bubbleLayerRef = useRef<HTMLDivElement | null>(null);

  const state = useRef<PanZoomState>({
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0,
    dragging: false,
    isPinching: false,
    dragDistance: 0,
    lastX: 0,
    lastY: 0,
    svgScale: 1,
    pointerDownTarget: null,
    pointers: new Map(),
    initialPinchDistance: null,
    initialScale: 1,
    pinchMidpoint: null,
    initialRotation: 0,
    initialPinchAngle: 0,
  });

  const updateSvgScale = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const vb = svg.viewBox.baseVal;
    const rect = svg.getBoundingClientRect();
    if (!vb.width) return;

    state.current.svgScale = rect.width / vb.width;
  };

  const apply = () => {
    const target = mapRef.current;
    if (!target) return;

    const s = state.current;

    gsap.set(target, {
      x: s.x * s.scale,
      y: s.y * s.scale,
      scale: s.scale,
      rotation: s.rotation,
      transformOrigin: "0 0",
      force3D: true,
    });
  };

  const setActiveRegion = (id: string) => {
    const map = mapRef.current;
    if (!map) return;

    map
      .querySelectorAll<SVGElement>(".region.active")
      .forEach((r) => r.classList.remove("active"));

    const region = map.querySelector<SVGElement>(`[data-region="${id}"]`);
    if (!region) return;

    region.classList.add("active");
  };

  const zoomTo = (id: string) => {
    const map = mapRef.current;
    const svg = svgRef.current;
    if (!map || !svg) return;

    const region = map.querySelector<SVGGraphicsElement>(`[data-region="${id}"]`);
    if (!region) return;

    const s = state.current;
    const vb = svg.viewBox.baseVal;
    const box = region.getBBox();
    const pad = 0.7;

    const nextScale = Math.min(
      MAX_SCALE,
      Math.max(
        MIN_SCALE,
        Math.min(vb.width / box.width, vb.height / box.height) * pad,
      ),
    );

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    s.rotation = 0;
    s.scale = nextScale;
    s.x = vb.width / 2 / nextScale - cx;
    s.y = vb.height / 2 / nextScale - cy;

    gsap.to(map, {
      x: s.x * s.scale,
      y: s.y * s.scale,
      scale: s.scale,
      rotation: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  const down = (e: ReactPointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.setPointerCapture(e.pointerId);

    const s = state.current;
    s.pointers.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

    if (s.pointers.size === 2) {
      s.isPinching = true;
      s.dragging = false;

      const [p1, p2] = [...s.pointers.values()];
      const dx = p1.clientX - p2.clientX;
      const dy = p1.clientY - p2.clientY;

      s.initialPinchDistance = Math.hypot(dx, dy);
      s.initialScale = s.scale;

      const angle = Math.atan2(p2.clientY - p1.clientY, p2.clientX - p1.clientX);

      s.initialPinchAngle = angle;
      s.initialRotation = s.rotation;

      const rect = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;

      const mx = (p1.clientX + p2.clientX) / 2;
      const my = (p1.clientY + p2.clientY) / 2;

      s.pinchMidpoint = {
        x: ((mx - rect.left) / rect.width) * vb.width,
        y: ((my - rect.top) / rect.height) * vb.height,
      };

      return;
    }

    if (s.pointers.size === 1) {
      s.dragging = true;
      s.dragDistance = 0;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.pointerDownTarget = e.target;
    }
  };

  const move = (e: ReactPointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    const s = state.current;
    if (!s.pointers.has(e.pointerId)) return;

    s.pointers.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

    if (s.isPinching && s.pointers.size === 2) {
      const [p1, p2] = [...s.pointers.values()];

      const dx = p1.clientX - p2.clientX;
      const dy = p1.clientY - p2.clientY;
      const distance = Math.hypot(dx, dy);
      const initialDistance = s.initialPinchDistance;
      if (!initialDistance) return;

      const pinchRatio = distance / initialDistance;

      const angle = Math.atan2(p2.clientY - p1.clientY, p2.clientX - p1.clientX);
      const angleDelta = angle - s.initialPinchAngle;

      const rect = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;

      const mx = (p1.clientX + p2.clientX) / 2 - rect.left;
      const my = (p1.clientY + p2.clientY) / 2 - rect.top;

      const px = (mx / rect.width) * vb.width;
      const py = (my / rect.height) * vb.height;

      const ax = px / s.scale - s.x;
      const ay = py / s.scale - s.y;

      const pinchStrength = Math.abs(pinchRatio - 1);
      const rotateStrength = Math.abs(angleDelta);

      if (rotateStrength > ROTATE_THRESHOLD && rotateStrength > pinchStrength) {
        const prevRotation = s.rotation;
        const nextRotation = s.initialRotation + (angleDelta * 180) / Math.PI;

        const rad = ((nextRotation - prevRotation) * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        const rx = ax * cos - ay * sin;
        const ry = ax * sin + ay * cos;

        s.x += ax - rx;
        s.y += ay - ry;

        s.rotation = nextRotation;

        apply();
        return;
      }

      if (pinchStrength > PINCH_THRESHOLD) {
        let nextScale = s.initialScale * pinchRatio;
        nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));

        s.scale = nextScale;
        s.rotation = s.initialRotation;

        s.x = px / nextScale - ax;
        s.y = py / nextScale - ay;

        apply();
      }

      return;
    }

    if (s.dragging && s.pointers.size === 1) {
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;

      s.dragDistance += Math.abs(dx) + Math.abs(dy);

      s.x += dx / (s.scale * s.svgScale);
      s.y += dy / (s.scale * s.svgScale);

      s.lastX = e.clientX;
      s.lastY = e.clientY;

      apply();
    }
  };

  const up = (e: ReactPointerEvent<SVGSVGElement>) => {
    const s = state.current;
    s.pointers.delete(e.pointerId);

    if (s.isPinching && s.pointers.size < 2) {
      s.isPinching = false;
      s.initialScale = s.scale;
      s.initialRotation = s.rotation;
      s.initialPinchDistance = null;
      s.pinchMidpoint = null;
      s.pointerDownTarget = null;
      return;
    }

    if (s.pointers.size === 0) {
      s.dragging = false;

      const CLICK_THRESHOLD = 5;
      if (s.dragDistance > CLICK_THRESHOLD) {
        s.pointerDownTarget = null;
        return;
      }

      const downTarget = s.pointerDownTarget;
      s.pointerDownTarget = null;

      if (!(downTarget instanceof Element)) return;

      const region = downTarget.closest(".region") as SVGElement | null;
      if (!region) return;

      const id = region.dataset.region;
      const title = region.dataset.title;
      const info = region.dataset.info;
      if (!id) return;

      setActiveRegion(id);
      zoomTo(id);

      onRegionSelect?.(title ?? "", info ?? "");
    }
  };

  const wheel = (e: ReactWheelEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    const s = state.current;
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;

    const zoom = e.deltaY < 0 ? 1.1 : 0.9;
    const ns = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s.scale * zoom));
    if (ns === s.scale) return;

    const mx = ((e.clientX - rect.left) / rect.width) * vb.width;
    const my = ((e.clientY - rect.top) / rect.height) * vb.height;

    const wx = mx / s.scale - s.x;
    const wy = my / s.scale - s.y;

    s.scale = ns;
    s.x = mx / ns - wx;
    s.y = my / ns - wy;

    apply();
  };
useGSAP(() => {
  const ctx = gsap.context(() => {
    apply();
  });

  return () => ctx.revert();
});

  useEffect(() => {
    updateSvgScale();
    window.addEventListener("resize", updateSvgScale);
    return () => window.removeEventListener("resize", updateSvgScale);
  }, []);

  useImperativeHandle(ref, () => ({
    zoomTo: (id: string) => {
      setActiveRegion(id);
      zoomTo(id);
    },
    getRegions: () => {
      const map = mapRef.current;
      if (!map) return [];

      return Array.from(map.querySelectorAll<SVGElement>(".region"))
        .map((r) => ({
          id: r.dataset.region ?? "",
          name: r.dataset.title ?? "",
        }))
        .filter((r) => r.id.length > 0);
    },
  }));

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const map = mapRef.current;
    if (!map) return;

    const onMove = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const region = target.closest(".region") as SVGElement | null;
      if (!region) {
        onTooltip?.((prev) => ({ ...prev, visible: false }));
        return;
      }

      const { title, info } = region.dataset;

      onTooltip?.({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        title: title ?? "",
        info: info ?? "",
      });
    };

    const onLeave = () => {
      onTooltip?.((prev) => ({ ...prev, visible: false }));
    };

    map.addEventListener("pointermove", onMove);
    map.addEventListener("pointerleave", onLeave);

    return () => {
      map.removeEventListener("pointermove", onMove);
      map.removeEventListener("pointerleave", onLeave);
    };
  }, [onTooltip]);

  useEffect(() => {
    const layer = bubbleLayerRef.current;
    if (!layer) return;

    const bubbleCount = window.innerWidth < 768 ? 12 : 24;
    const bubbles: Array<{ el: HTMLDivElement; x: number; y: number; vx: number; vy: number }> = [];

    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < bubbleCount; i++) {
      const el = document.createElement("div");
      el.className = "bubble";

      const size = Math.random() * 10 + 6;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;

      layer.appendChild(el);

      bubbles.push({
        el,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.3 + 0.1),
      });
    }

    let rafId = 0;

    const animate = () => {
      for (const b of bubbles) {
        b.x += b.vx;
        b.y += b.vy;

        if (b.y < -20) b.y = height + 20;
        if (b.x < -20) b.x = width + 20;
        if (b.x > width + 20) b.x = -20;

        b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      bubbles.forEach((b) => b.el.remove());
    };
  }, []);

  return (
    <>
    <WaterShader />
            <div ref={bubbleLayerRef} className="bubble-layer" />
            <div className="map-wrapper">
                <svg className="mapsvg"
                    ref={svgRef}
                    viewBox="0 0 4558.44 5184.06"
                    onPointerDown={down}
                    onPointerMove={move}
                    onPointerUp={up}
                    onPointerLeave={up}
                    onPointerCancel={up}
                    onWheel={wheel}
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g ref={mapRef}>
                        <defs>
                            <linearGradient
                                id="linear-gradient"
                                x1="346.06"
                                y1="-4157.68"
                                x2="165.06"
                                y2="-4138.68"
                                gradientTransform="translate(2001.5 4856.56)"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stopColor="#d9d788" />
                                <stop offset="1" stopColor="#fffdc6" />
                            </linearGradient>
                            <style>
{`
  .cls-12,
  .cls-14,
  .cls-17,
  .cls-18,
  .cls-20,
  .cls-21,
  .cls-22,
  .cls-23,
  .cls-25,
  .cls-27,
  .cls-3,
  .cls-31,
  .cls-32,
  .cls-38,
  .cls-39,
  .cls-42,
  .cls-44,
  .cls-45,
  .cls-51,
  .cls-53,
  .cls-6,
  .cls-62,
  .cls-64,
  .cls-66,
  .cls-72,
  .cls-74,
  .cls-76,
  .cls-9 {
    fill-rule: evenodd;
  }

  .cls-3 { fill: #636571; }
  .cls-6 { fill: #ffe6bb; }
  .cls-9 { fill: #388e3c; }
  .cls-12 { fill: #504f4e; }
  .cls-14 { fill: #ab9e96; }
  .cls-17 { fill: #555; }
  .cls-18 { fill: #fff; }
  .cls-20 { fill: #89e3e3; }
  .cls-21 { fill: #54675d; }
  .cls-22 { fill: #8b8880; }
  .cls-23 { fill: #2d3d35; }
  .cls-25 { fill: #256828; }

  .cls-77 {
    stroke: #556565;
    stroke-width: 3;
    fill: none;
  }

  .cls-27 { fill: #1e2f57; }
  .cls-31 { fill: #d3d3d3; }
  .cls-32 { fill: #caffff; }
  .cls-38 { fill: #42534a; }
  .cls-39 { fill: #89adff; }
  .cls-42 { fill: #e6e6e6; }
  .cls-44 { fill: #e1e1e1; }
  .cls-45 { fill: #88e3e3; }
  .cls-51 { fill: #545454; }
  .cls-53 { fill: #5a2f25; }
  .cls-62 { fill: #eee; }
  .cls-64 { fill: #ae917d; }
  .cls-66 { fill: #787777; }
  .cls-72 { fill: #a4f3f3; }
  .cls-74 { fill: #646464; }
  .cls-76 { fill: #e8e8e8; }
`}
</style>

                        </defs>
                        <g id="base">
                            <path
                                d="M2381.5 110.06h-642l-309 309.5-699 553.5-417.5 1612 1254 2525 2380.5-898 308-507 227-450v-867l-734-1794-1368-484z"
                                fill="#092330"
                                fillRule="evenodd"
                            />
                            <path
                                d="M2151 2529.06l-46 5s45.83 172.16 76 348.5 60 419.5 60 419.5 49.16 66.95 180.5 22c96.69-10.29 188.5-22 188.5-22s137.59-32.72 162.5-38.5 154.76-87.21 163-115.5c-3.41-10.26-3-8.5-3-8.5l-107 39.5-23.5-110 104.5-27-14-93-31 5-15.5-173s-22.2-198.91-34-235c10.24-2.64 24-3 24-3h1.5l-59.5-130.5-144 24.5-212.5 32-223.5 46-47 14z"
                                fill="#aa986f"
                                fillRule="evenodd"
                            />
                            <g
                                className="region"
                                data-region="basketballcourt"
                                data-title="BasketBall Court"
                                data-info="No events here"
                            >
                                <path
                                    d="M3356.5 2848.84l577.07-4.78s-11.53-507.27-62.57-579c-51.99-13.14-636.8 122.63-636.8 122.63l122.3 461.15z"
                                    fill="#638b57"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-21"
                                    d="M3330.5 2884.84l601.77 12.5v-53.5h-573.63l-28.14 41z"
                                />
                                <path
                                    className="cls-38"
                                    d="M3186.03 2405.35l49.5-15 123.97 453.49-26 40-147.47-478.49z"
                                />
                                <g>
                                    <path
                                        d="M3327.03 2461.41l141.69-30.78 57.89 244.92-142.73 31.19-56.85-245.33z"
                                        fill="#28787b"
                                        fillRule="evenodd"
                                    />
                                    <path
                                        className="cls-18"
                                        d="M3470.23 2427.38l-12.44 2.77-.1-.44-2.93.66.1.43-130.61 29.08.78 3.43 56.22 247.6 149.15-33.26-60.16-250.27h-.01zm-131.1 42.44c-1.08-3.91-1.8-7.31-2.17-10.2l-7.92 1.76 55.85 245.45 9.32-2.07-.17-.66c-11.25-44.16 2.1-72.39 40.04-84.68l.07-.02.07-.02c30.78-6.64 53.55 1.06 68.33 23.09 4.6 6.84 8.11 14.69 10.55 23.55 1.22 4.42 1.98 8.18 2.29 11.29l-2.99.29c-.29-2.94-1.02-6.54-2.2-10.79-2.36-8.55-5.75-16.11-10.15-22.68-14.01-20.89-35.72-28.17-65.12-21.84-36.15 11.73-48.82 38.75-37.99 81.06l.19.75 127.96-28.48-58.94-244.71-7.74 1.72c3.76 15.1 4.56 28.26 2.41 39.46-4.15 21.72-18.38 36.5-42.67 44.33l-.07.02-.07.02c-30.73 6.64-53.51-1.05-68.33-23.09-4.6-6.83-8.11-14.68-10.55-23.55zm.77-10.86l115.58-25.68c10.43 41.85-2.3 68.6-38.19 80.26-29.41 6.32-51.12-.96-65.12-21.84-4.4-6.56-7.79-14.12-10.15-22.68-1.08-3.91-1.79-7.26-2.12-10.06zm108.71 108.15l47.58-9.8.8 3.4-47.58 9.59c.24 1.51.3 3.08.17 4.68-.91 10.45-10.12 18.18-20.58 17.27-8.34-.73-14.95-6.74-16.81-14.45l-51.9 10.46-.66-2.83 52.08-10.72c-.07-.99-.07-2.01.02-3.03.91-10.45 10.12-18.18 20.58-17.27 7.7.67 13.92 5.85 16.3 12.71zm-2.92.59c-.63-1.65-1.55-3.21-2.78-4.67-2.84-3.38-6.46-5.27-10.86-5.65-4.4-.39-8.29.84-11.68 3.68-3.38 2.84-5.27 6.46-5.65 10.86-.06.74-.08 1.46-.06 2.16l31.03-6.39zm-30.6 9.51c.56 2.3 1.67 4.43 3.31 6.4 2.84 3.38 6.46 5.27 10.86 5.65s8.3-.84 11.68-3.68c3.38-2.84 5.27-6.46 5.65-10.86.12-1.32.09-2.6-.09-3.83l-31.41 6.33z"
                                    />
                                    <path
                                        d="M3596.14 2394.22l45.29 386.91 230.68-19.97-46.23-397.05-229.74 30.11z"
                                        fill="#46633d"
                                        fillRule="evenodd"
                                    />
                                </g>
                            </g>
                            <path
                                className="cls-9"
                                d="M1820.36 2570.12l180.65-13.05s157.74 524.38 173 665 10.5 89.5 10.5 89.5l22.49 142-32.99 56.5-401 93-83-22.5v-256.5l-30-102 30-201-30-177v-113l31.8-39.85s-38.61-447.86-31.82-705.15c6.8-257.29 59.01-324 59.01-324s69.62 125.38 86.5 353c16.88 227.63 14.85 555.05 14.85 555.05z"
                            />
                            <path
                                d="M2204 3394.06l-41.33-252c-22.58-93.53-139.81-511.66-137.67-507s176.5 813 176.5 813l-16.5 8-329 75h-49.5l-33.5-37h-41l-61.5 37v57.5s97.59 44.82 112.5 42 137-42 137-42l247-57.5 53-47.5v-46.1l-16-43.4z"
                                fill="#4b644d"
                                fillRule="evenodd"
                            />
                            <path
                                d="M2519.5 3424.06s71 113.92 96.5 241 43.05 295.52 40.5 321.5c28.55 35.76 91.15 141.93 162.5 171.5 10.92 45.56 20 158.5 20 158.5l-20 15-128 21.5-171.5 35-191.5 46.5-267.5 59-30.5-105.5h-59.5l-23-71.5 58.5-24-11.5-76.5-74.5 40v-40l-33-34-69.5 20s-17.71-15.13-15-33 50-64 50-64-32.48-9.92-35-17 0-58.5 0-58.5l-44.5-43s21.12-12.66 16-28-16-66-16-66l-64 23-47-48-20.5-57-34.5-21 34.5-27.5-34.5-46.5-33-68.5 67.5-55 86.5-23 45 34.5 287.5-72 459-107.5z"
                                fill="#7f9493"
                                fillRule="evenodd"
                            />
                            <path
                                className="cls-25"
                                d="M2634.01 3759.4s71.29-8.49 80.99 0c9.29 25.02 21 186.5 21 186.5s70.17 164.82 139.5 177.66l8.5 212.5-45-38-17.5-142.22c-12.89 3.43-56.5-9.9-167.49-170.28 0 0 .22-92.28-20-226.16zM2520 3424.06s83.3-2.49 93 6c9.29 25.02 64.93 168.04 67 180.5-36.43 1.05-75.5 12-75.5 12s-30.8-113.62-84.5-198.5z"
                            />
                            <g id="lake">
                                <path
                                    className="cls-64"
                                    d="M1272 5184.06v-58l156-237 144.5-233.5v-118.5l53.5-30.5 142 30.5 172-149h98l21.5 102.5 772-168 135.5-66.5 33.5 234.5 25.5 125.5v134l-25.5 139-268 108-247 100.5-321 28.5-354.5 58h-538z"
                                />
                                <path
                                    d="M1452 5098.06l57.29-214.06s137.63-15.28 164.63-65.05 42.16-111.34 72.86-141.78c30.7-30.45 116.5-83.51 173.22-72.28 56.71 11.22-56.59-26.53 28.68 0s38.52.53 200.32-41.82c161.8-42.35 103.84-54.5 241.3-50.48 137.46 4.03 297.78-106.93 300.7-34.02s212.57-120.56 190-40 64.67 272.75 0 347-36.88 37.24-122 98.44c-85.12 61.2-151.18 45.63-174.5 87.85-23.32 42.23-271.26 124.61-382.19 100.64s-260.2 38.58-377.81 37.57c-117.6-1.01-55.09-26.99-150.58 0S1452 5098.08 1452 5098.08v-.02z"
                                    fill="#27342e"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-20"
                                    d="M1493 5080.08l51-174.5s170.19-53.83 193.77-95.37c23.58-41.54 36.81-92.91 63.62-118.32s76.68-69.68 126.2-60.32c49.52 9.36-49.42-22.14 25.04 0 74.46 22.14 58.68.44 199.96-34.9s90.67-45.48 210.69-42.12 296.16-89.23 298.71-28.39 209.2-100.62 189.5-33.39 56.47 227.6 0 289.56-91.96 31.09-166.28 82.16c-74.32 51.07-132.01 58.83-152.36 94.07-20.36 35.24-236.86 83.22-333.72 63.22-96.86-20-227.2 32.19-329.89 31.35-102.69-.85-48.11-22.52-131.48 0s-244.77 26.94-244.77 26.94h.01z"
                                />
                                <path
                                    className="cls-72"
                                    d="M1998 4689.56c-37.36-6.66-109.16-35.96-121 0s47.65 86.93 0 78.5c-47.65-8.44-66.78-41.01-70 0s.55 81.84-23.5 87-157.31 41.01-164 78.5 27.15 31.94 0 47.5-6.93 54.04 29 51c35.92-3.04 76.18-63.15 105.5-51s32.35 26.21 53 26 34.1-14.28 70-26 52.85 3.19 87 0 80.43-47.48 111-47.5c30.57-.02 39-20.44 74 0s60.99 60.92 100 47.5 93.2-25.31 98.5-47.5 40.74-66.61 0-78.5-79.5-13.35-121.5-22c-42-8.64-77.87-42.92-48-65s9.35-26.18 0-48 7.61-42.59-29-30.5-74 30.5-74 30.5l-77-30.5z"
                                />
                                <path
                                    className="cls-32"
                                    d="M2022.5 4769.06c-48.09-17.47-52.56-17.89-63-1s-32.53 21.09-39.5 33-25.06 50.06 0 51 12.58 4.03 39.5 18.5 44.37 25.57 63 0 15.99-40.42 44-39 62.65-9.05 48-30.5-35.98-37.88-48-33-44 1-44 1z"
                                />
                                <path
                                    className="cls-72"
                                    d="M2603.5 4591.56c-31.66-2.98-54.7-14.78-70.5 0s1.52 15.72-29 25.5 9.95-45.29-54 0-72 55.99-83 72.5-32.71 55.01 0 66.5 1.96 13.04 31 43 64.25 26.86 68.5 53 5.8 76.01 66.5 34 78.36-33.98 103-66-15.12-55.58 35.5-52 83.4 47.55 87.5-12 19.12-39.29 0-66.5c-19.12-27.2-2.3-51.74-43.5-54.5s-63 0-63 0 53.08-26.86 19-43.5-68 0-68 0z"
                                />
                                <path
                                    className="cls-32"
                                    d="M2565.35 4669.45c-48.09-17.47-52.56-17.89-63-1s-32.53 21.09-39.5 33-25.06 50.06 0 51 12.58 4.03 39.5 18.5 44.37 25.57 63 0 15.99-40.42 44-39 62.65-9.05 48-30.5-35.98-37.88-48-33-44 1-44 1z"
                                />
                            </g>
                            <g
                                id="mitegreens"
                                fillRule="evenodd"
                                className="region"
                                data-region="mitegreens"
                                data-title="MITE Greens"
                                data-info="No events here"
                            >
                                <path
                                    d="M2066.58 2053.45l55.03 460.99c.04.32.08.64.14.96.05.32.12.63.19.95.07.31.15.63.24.94s.18.62.28.92c.1.31.21.61.33.91.12.3.24.6.38.89.13.29.27.58.42.87s.3.57.47.85c.16.28.33.55.51.82s.36.53.55.79.39.52.59.77c.2.25.41.49.63.73s.44.47.66.7c.23.23.46.45.7.67s.48.43.73.63.5.4.76.59c.26.19.52.37.79.55s.54.35.82.51.56.32.85.47.58.29.87.42.59.26.89.38c.3.12.6.23.91.33.31.1.61.2.92.29.31.09.62.17.94.24.31.07.63.14.95.19.32.06.64.1.96.14.32.04.64.07.96.09s.64.04.97.04h.97c.32-.01.64-.03.97-.05.32-.03.64-.06.96-.1s.64-.09.95-.15l721.95-134.69c.38-.07.76-.15 1.13-.25.37-.09.75-.2 1.11-.32.37-.12.73-.24 1.09-.38s.72-.29 1.07-.45.7-.33 1.04-.51.68-.37 1-.58c.33-.2.65-.41.97-.64.32-.22.62-.45.93-.69.3-.24.6-.49.88-.75.29-.26.56-.53.83-.8.27-.28.53-.56.78-.85s.5-.59.73-.9c.23-.31.46-.62.67-.94.21-.32.42-.65.61-.98.19-.33.38-.67.55-1.02a17.293 17.293 0 00.91-2.13c.13-.37.25-.73.36-1.1s.2-.74.29-1.12c.09-.38.16-.76.22-1.14s.11-.76.15-1.15c.04-.38.07-.77.08-1.15.01-.39.02-.77 0-1.16s-.03-.77-.06-1.16c-.03-.38-.08-.77-.13-1.15-.06-.38-.12-.76-.2-1.14-.08-.38-.17-.75-.27-1.12s-.22-.74-.34-1.11-.26-.73-.41-1.08c-.15-.36-.31-.71-.47-1.06-.17-.35-.35-.69-.54-1.03s-.39-.67-.6-.99l-275.11-425.77c-.13-.2-.26-.39-.39-.58s-.27-.38-.42-.57c-.14-.19-.29-.37-.44-.55s-.3-.36-.46-.54-.31-.35-.48-.52c-.16-.17-.33-.34-.49-.5-.17-.16-.34-.33-.51-.48-.17-.16-.35-.31-.53-.46-.18-.15-.36-.3-.55-.44-.19-.14-.37-.29-.56-.42-.19-.14-.38-.27-.58-.4-.2-.13-.39-.26-.59-.38-.2-.12-.4-.24-.61-.36-.2-.12-.41-.23-.62-.33-.21-.11-.42-.21-.63-.31-.21-.1-.43-.2-.64-.29-.22-.09-.43-.18-.65-.26l-.66-.24c-.22-.08-.45-.15-.67-.21-.23-.07-.45-.13-.68-.19-.23-.06-.46-.11-.68-.16-.23-.05-.46-.1-.69-.14s-.46-.08-.7-.11l-.7-.09-.7-.06c-.23-.02-.47-.03-.7-.03h-.7c-.23 0-.47 0-.7.02-.23.01-.47.03-.7.05s-.47.04-.7.07c-.23.03-.47.06-.7.1l-.69.12-501.87 99.47c-.29.06-.58.12-.86.19s-.57.15-.85.23-.56.17-.84.27-.55.2-.83.31c-.27.11-.54.23-.81.35s-.53.25-.79.39c-.26.13-.52.28-.77.42-.26.15-.51.3-.75.46-.25.16-.49.32-.73.49s-.48.35-.71.53-.46.37-.68.56c-.22.19-.44.39-.66.59-.21.2-.42.41-.63.62-.2.21-.4.43-.6.65-.19.22-.38.45-.57.68-.18.23-.36.46-.54.7-.17.24-.34.48-.5.73s-.32.5-.47.75-.29.51-.43.77-.27.52-.4.79-.25.53-.36.81c-.11.27-.22.55-.32.82-.1.28-.19.56-.28.84-.09.28-.17.56-.24.85-.07.28-.14.57-.2.86s-.11.58-.16.87c-.05.29-.09.58-.12.87s-.06.58-.08.88c-.02.29-.03.59-.04.88v.88c0 .29.02.59.04.88.02.29.05.59.08.88l-.02-.03z"
                                    fill="#b93d54"
                                />
                                <path
                                    d="M2093.06 2070.99l52.16 405.34c.04.32.09.63.15.95.06.31.12.63.19.94.07.31.15.62.24.93.09.31.18.61.29.91a16.315 16.315 0 00.71 1.78 17.697 17.697 0 00.89 1.7c.16.27.33.55.51.81.18.27.36.53.55.79s.39.51.59.76c.2.25.41.49.62.73.21.24.43.47.66.69.23.23.46.45.69.66s.48.42.73.62.5.4.76.58c.26.19.52.37.79.55s.54.34.81.51c.28.16.55.32.84.46.28.15.57.29.86.42s.58.26.88.38c.3.12.6.23.9.33s.61.2.91.29c.31.09.62.17.93.24.31.07.62.14.94.19.31.06.63.1.95.14.32.04.63.07.95.1s.64.04.96.05h.96c.32 0 .64-.02.96-.05.32-.02.64-.06.95-.1.32-.04.63-.09.95-.15l659.8-119.04c.38-.07.76-.15 1.14-.24s.75-.2 1.12-.31.74-.24 1.1-.38a20.133 20.133 0 003.12-1.53c.33-.2.66-.41.97-.64.32-.22.63-.45.93-.69s.6-.49.89-.75c.29-.26.57-.53.84-.8.27-.28.53-.56.79-.85.25-.29.5-.59.73-.9.24-.31.46-.62.68-.94.22-.32.42-.65.62-.98s.38-.67.56-1.02c.18-.35.34-.7.49-1.05.15-.36.3-.72.43-1.08s.25-.73.36-1.1.21-.75.29-1.12c.09-.38.16-.76.22-1.14s.11-.77.15-1.15c.04-.39.07-.77.08-1.16.02-.39.02-.77.01-1.16 0-.39-.03-.77-.06-1.16s-.08-.77-.13-1.15c-.06-.38-.12-.76-.2-1.14-.08-.38-.17-.76-.27-1.13-.1-.37-.22-.74-.34-1.11s-.26-.73-.41-1.09-.31-.71-.47-1.06c-.17-.35-.35-.69-.54-1.03s-.39-.67-.6-.99l-244.98-378.7c-.13-.2-.26-.39-.39-.58s-.27-.38-.41-.57-.29-.37-.44-.55-.3-.36-.46-.54-.31-.35-.48-.52c-.16-.17-.33-.34-.49-.5l-.51-.48c-.17-.16-.35-.31-.53-.46-.18-.15-.36-.3-.55-.44-.19-.14-.37-.28-.56-.42s-.38-.27-.58-.4c-.2-.13-.39-.26-.59-.38-.2-.12-.4-.24-.61-.36-.2-.12-.41-.23-.62-.33-.21-.11-.42-.21-.63-.31-.21-.1-.43-.2-.64-.29-.22-.09-.43-.18-.65-.26l-.66-.24c-.22-.08-.45-.15-.67-.21-.22-.07-.45-.13-.68-.19-.23-.06-.46-.11-.69-.16s-.46-.1-.69-.14-.46-.08-.7-.11l-.7-.09-.7-.06c-.23-.02-.47-.03-.7-.03h-.7c-.23 0-.47 0-.7.02-.23.01-.47.03-.7.05s-.47.04-.7.07c-.23.03-.47.06-.7.1l-.69.12-466.98 92.39c-.29.06-.58.12-.87.19-.29.07-.57.15-.86.23-.28.08-.57.18-.85.27-.28.1-.56.2-.83.31s-.55.23-.82.35-.54.25-.8.39-.52.28-.78.43-.51.3-.76.46-.49.33-.74.5c-.24.17-.48.35-.71.53s-.46.37-.69.56a17.92 17.92 0 00-1.29 1.23c-.21.21-.4.43-.6.65-.19.22-.38.45-.57.68-.18.23-.36.47-.54.71-.17.24-.34.48-.5.73s-.32.5-.47.76-.29.51-.43.78c-.14.26-.27.53-.39.8-.13.27-.24.54-.36.81-.11.27-.22.55-.32.83s-.19.56-.28.84-.17.57-.24.86-.14.57-.2.86-.11.58-.16.88c-.05.29-.08.59-.12.88-.03.29-.06.59-.07.89-.02.3-.03.59-.03.89v.89c.01.3.03.59.05.89.02.3.05.59.09.88l.04-.05z"
                                    fill="#24b729"
                                />
                            </g>
                            <g id="atm" fillRule="evenodd">
                                <path
                                    d="M2634 2428.71l20.69-3.65 8.64 48.93-20.69 3.65-8.64-48.93z"
                                    fill="#fcfc17"
                                />
                                <path d="M2649.5 2514.71l13.5-41-19.5 4 6 37z" fill="#727200" />
                            </g>
                            <path
                                className="cls-9"
                                d="M2768 2819.06l27-7 7 110-59.5 13 25.5-116z"
                            />
                            <g
                                id="mainblock"
                                className="region"
                                data-region="mainblock"
                                data-title="Main Block"
                                data-info="No events here"
                            >
                                <path
                                    className="cls-76"
                                    d="M2268.5 2727.06l-25.5 74.5 224-37.5 25.5-76-224 39z"
                                />
                                <path
                                    className="cls-17"
                                    d="M2241 2798.06l-28.5-201.5 28.5-64 29 195.5-27 74-2-4z"
                                />
                                <path
                                    className="cls-66"
                                    d="M2165.5 2602.56l49.5-7.5 28-63-57 10.5-20.5 60z"
                                />
                                <path
                                    className="cls-17"
                                    d="M2173 2455.06l-21 77 13 70 22-60-12-91-2 4zM2523 2587.56l-7.5 59 42.5 249.5 26-4-57-311-4 6.5z"
                                />
                                <path
                                    d="M2515.5 2648.56l-26.5 12-7.5-66.5 43.5-10.5-9.5 65z"
                                    fill="#3e3e3e"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-17"
                                    d="M2218 2999.06l21-51.5 45.5 278-28 71-38.5-297.5z"
                                />
                                <path
                                    className="cls-66"
                                    d="M2355.5 3278.06l-98.5 18 28-70.5 88-18-17.5 70.5zM2530.37 3234.79l-59.3 10.55 3.89-51.68 73.2-14.7-17.8 55.83h.01z"
                                />
                                <path
                                    className="cls-17"
                                    d="M2356.63 3278.94l3.37 45.63 25.5-66.5-12.5-50-16.37 70.87z"
                                />
                                <path
                                    className="cls-76"
                                    d="M2456.5 3301.56l-95 22.5 23.5-66 96.5-26-25 69.5z"
                                />
                                <path
                                    className="cls-31"
                                    d="M2220.5 2451.56l-6-26 409.5-61.5 27 159 71-11 60 397.5-69.5 16 55 216-294.5 51.5 9.5 40-97.5 24.5-12-50.5-88.5 17-46-277.5 343.5-56-57.5-307-42 10.5 9.5 94-222 40-31.5-194.5-53 10-10.5-92h45.5z"
                                />
                                <path
                                    className="cls-76"
                                    d="M2735 2976.06l47-66-70 15 13.5 51h9.5z"
                                />
                            </g>
                            <g
                                id="store"
                                fillRule="evenodd"
                                className="region"
                                data-region="store"
                                data-title="Store"
                                data-info="No events here"
                            >
                                <path
                                    d="M2754.87 3258.92l-212.38 43.52 22.52-82.88 216.5-35-26.63 74.36h-.01z"
                                    fill="#a3fff1"
                                />
                                <path
                                    d="M2783.5 3183.56l-219.5 37-16.5-41 218.5-37.5 17.5 41.5z"
                                    fill="#b9fff5"
                                />
                                <path
                                    d="M2530 3238.06l12.5 64.5 22-82-17-41-17.5 56v2.5z"
                                    fill="#375e59"
                                />
                            </g>
                            <path
                                className="cls-22"
                                d="M1834 1463.06l621-47s25.55-469.46 0-608c-90.8 2.44-503 35-503 35s-74.97-7.91-118 115.5 0 504.5 0 504.5zM2660.5 1519.56l77.5 313.5 47 30.5-22 29.5 12.5 32.87s249.53-68.18 366-76.87 194.5-16 194.5-16l-62-288.5-68-119.5-545.5 94.5z"
                            />
                            <path
                                className="cls-74"
                                d="M2768 1932.56l6-6.5 180.5-48.85c114.32-17.54 161.62-30.31 381.5-44.15 1.22 15.69 0 24.5 0 24.5s-150.15 8.42-320 53.5c-169.86 45.08-227.51 140.39-232 156-4.49 15.6 6 40 6 40s-45.9-58.05-44-107 22-67.5 22-67.5z"
                            />
                            <path
                                d="M2605 3621.56l28 142h80.5s-22.2-141.47-34.5-156-74 14-74 14z"
                                fill="#6b807f"
                                fillRule="evenodd"
                            />
                            <path
                                className="cls-77"
                                d="M2628 3614.06s26.51 133.03 25.5 145M2621 3618.06s26.51 129.36 25.5 141M2615 3618.06s27 129.36 25.97 141M2648 3614.06s27 130.28 25.97 142M2641 3614.06s27 130.28 25.97 142M2635 3614.06s27 133.03 25.97 145M2668 3609.06s27 134.86 25.97 147M2661 3612.17s27 132.11 25.97 144M2655 3612.17s27 132.11 25.97 144M2681 3612.06s27 132.11 25.97 144M2675 3612.06s27 132.11 25.97 144"
                            />
                            <path
                                className="cls-74"
                                d="M2796 1495.06l17.5-45 404.5-56.5-12 31.5-410 70z"
                            />
                            <path
                                d="M2753 1160.06l43 335 17-45-60-314v24z"
                                fill="#3b3a3a"
                                fillRule="evenodd"
                            />
                            <path
                                className="cls-3"
                                d="M2972 2403.56l282 504.5 54.5-23.5-161-520.5-175.5 39.5z"
                            />
                            <path
                                className="cls-9"
                                d="M2660.5 1517.58s149.38-24.31 135.5-22.52c-4.23.54-1.05-22.11-6-45l-37-285.5s-26.25-1.37-62 0-81 5.46-81 5.46l-26.5 246.04v222.02l38 167.5 50 87s43.19 4.71 67-59.5c-15.27-66.81-78-315.5-78-315.5z"
                            />
                            <path
                                id="roads"
                                className="cls-18"
                                d="M3882.03 3258.15l-638.88-222.31.02.27c4.61 57.05 27.45 113.3 68.52 168.73 13.75 18.55 28.74 35.88 44.99 51.99 8.08 8.01 14.76 14.14 20.03 18.4l.37.3 190.18 198.44 40.65 42.41-10.83 10.38-230.17-240.16c-5.6-4.56-12.53-10.93-20.79-19.12-16.79-16.64-32.28-34.55-46.48-53.71-10.03-13.54-19.02-27.14-26.97-40.8-8.11 4.66-16.33 9.6-24.67 14.8a923.723 923.723 0 00-24.87 16.11c-34.04 22.8-53.11 39.15-57.2 49.05-4.12 9.95-6.25 17.34-6.39 22.17v.59c0 .53.03.95.1 1.28l-.05-.06c-.17-.38-.43-.75-.76-1.11a6.79 6.79 0 00-1.13-.94l-8.41 12.42c-7.19-4.88-6.26-18.24 2.77-40.08 5.26-12.7 26.16-31.3 62.72-55.79 17.3-11.59 34.17-22.11 50.6-31.55-22.22-41.82-34.72-84.19-37.5-127.11-11.34 4.26-24.47 10.12-39.38 17.59-42.42 21.24-81.2 47.91-116.35 79.99-3.58 3.27-8.89 8.14-15.94 14.63-25.98 23.92-46.02 41.61-60.13 53.07-23.47 19.07-47.39 35.7-71.76 49.91-59.79 34.86-137.23 63.29-232.33 85.26-34.18 7.9-70.66 16.36-109.44 25.36-4.84 1.13-9.36 2.17-13.56 3.14 10.31.38 19.33 1.39 27.06 3.03 27.08 5.75 48.76 22.37 65.04 49.85 6.49 10.96 12.86 24.8 19.11 41.52 3.74 10.02 9.15 26.11 16.22 48.27 6.61 20.73 11.82 36.46 15.64 47.18 13.2 37.09 30.05 115.84 50.57 236.26 2.02 11.86 3.99 23.57 5.91 35.16 7.79 46.97 14.74 91.58 20.85 133.82.72 3.54 2.03 8.21 3.93 14.01 3.92 11.94 8.91 23.51 14.98 34.72 17.78 32.85 41.49 56.87 71.12 72.04 2.5 1.28 5.05 2.5 7.63 3.66l-6.11 13.69c-36.33-16.22-64.94-43.64-85.84-82.25-6.49-12-11.83-24.39-16.03-37.18-2.12-6.47-3.6-11.79-4.43-15.94l-.04-.2-.03-.2c-7.6-52.58-16.51-108.85-26.72-168.81-1.44-8.42-2.85-16.63-4.25-24.65-.99-5.63-1.96-11.16-2.93-16.61l-1.12-.29c-9.12-2.35-20.11-4.18-32.97-5.49-27.42-2.78-51.41-1.13-71.95 4.97-18.11 5.37-29.63 13.05-34.58 23.06-2.66 5.39-3.48 13.03-2.45 22.92.21 2.04.34 3.52.39 4.43.1 1.87 1.04 10.5 2.82 25.89 8.17 70.46 12.13 117.23 11.87 140.33-.03 2.27-.09 4.31-.2 6.12-1.21 20.55-2.91 36.68-5.11 48.4-2.41 12.83-5.9 23.01-10.46 30.54-4.14 6.84-13.16 14.26-27.04 22.28-6.62 3.81-12.89 7.04-18.82 9.69l-6.11-13.7c3.18-1.42 6.49-3.03 9.91-4.84 2.44-1.28 4.95-2.66 7.52-4.14 11.66-6.74 18.9-12.42 21.71-17.06 3.62-5.98 6.47-14.5 8.55-25.54 1.17-6.22 2.19-13.83 3.08-22.84.69-7.04 1.29-14.93 1.81-23.67 1.14-19.39-2.73-67.34-11.6-143.84-1.82-15.71-2.79-24.65-2.9-26.83-.04-.66-.14-1.89-.33-3.67-.58-5.56-.77-10.08-.56-13.57.37-6.39 1.87-12.24 4.49-17.55 6.88-13.92 21.47-24.18 43.76-30.79 22.44-6.66 48.35-8.49 77.74-5.51 11.14 1.13 21.04 2.65 29.67 4.56-6.19-34.15-11.99-63.94-17.39-89.34-14.2.36-29.54 1.09-46.04 2.19-33.23 2.23-55.57 5.21-67.03 8.92-16.54 5.37-30.74 2.43-42.58-8.83-9.47-9-17.43-23.86-23.89-44.57-5.68-18.21-16.69-48.77-33.05-91.7a6738.02 6738.02 0 00-17.28-44.81l-.26-.67-.13-.7c-.3-1.65-1.42-3.1-3.35-4.33-5.24-3.34-14.29-2.07-27.16 3.8-5.66 2.58-11.85 4.96-18.57 7.13-12.21 3.94-26.17 7.19-41.89 9.75-12.1 1.97-22.67 3.24-31.7 3.78l-5.11.31-34.94-75.52-14.95-6.36c-6.28.02-12.23-.12-17.85-.42-36.08-1.91-62.62-20.55-79.64-55.92-5.89-12.24-10.6-26.57-14.13-42.97-1.97-9.15-3.87-21.03-5.71-35.62-.67-5.29-1.15-8.8-1.45-10.52-.2-1.15-.38-2-.54-2.55.22.43.54.85.95 1.28-5.22-5.45-43.04-213.76-113.48-624.93l-.05-.26-.02-.27c-21.81-221.09-36.33-383.32-43.57-486.68l-.45-6.54c-4.3-62.61-18.32-107.16-42.08-133.65-7.07-7.89-14.57-13.6-22.5-17.15-1.56-.7-2.97-1.26-4.24-1.7-1.73-.59-3.18-.94-4.37-1.04l.11-1.27c-8.71-.27-17.26-1-25.65-2.18-24.02-3.37-45-10.3-62.93-20.78-22.67-13.25-39.72-31.75-51.14-55.49-19.89-41.37-36.31-107.97-49.27-199.81-1.37-9.68-2.64-19.17-3.83-28.48-.46-.44-1.04-.95-1.73-1.53-2.41-2.02-5.28-3.91-8.6-5.67a71.64 71.64 0 00-4.88-2.35c-12.11-5.31-27.01-8.49-44.71-9.54-9.32-.55-19.42-.51-30.29.12l-.87-14.97c33.92-1.97 61.22 1.58 81.9 10.66 2.41 1.06 4.65 2.13 6.72 3.24-3.18-27.1-5.57-52.57-7.17-76.41l-.02-.25v-203.49l21-327.04c.24-23.79-.44-52.93-2.06-87.43-3.23-69.15-9.51-130.49-18.84-184.01l14.78-2.57c.8 4.61 1.59 9.29 2.35 14.02 8.15 50.74 13.71 108.03 16.7 171.86 1.63 34.88 2.32 64.37 2.07 88.49v.2l-21 326.96v202.51c2.5 37.15 6.94 78.35 13.33 123.61 12.74 90.3 28.71 155.43 47.93 195.4 18.4 38.25 52.61 60.89 102.63 67.92 15.94 2.24 32.54 2.73 49.81 1.48 8.59-.63 15.59-1.47 21.01-2.54 276.48-48.46 437.85-78.1 484.09-88.92 28.5-6.66 51.85-14.5 70.03-23.53 8.59-4.26 14.4-7.78 17.45-10.55-1.73-4.23-3.43-8.48-5.1-12.75-29.21-74.62-45.29-143.38-48.22-206.3-8.22-2.54-17.4-4.39-27.54-5.56-17.18-1.99-37.12-2.02-59.82-.09l-1.1.09c-19.06 1.65-35.85 4.09-50.36 7.32l-3.26-14.64c15.45-3.44 33.27-6.01 53.46-7.72 35.49-3.01 64.87-1.38 88.16 4.87-.04-3.66-.04-7.3 0-10.93.76-55.79 10.27-152.26 28.54-289.4h-31.04v-15h33v.41c3.91-29.01 8.2-59.76 12.87-92.26 13.08-91.12 26.1-176.34 39.07-255.65h-57.93v-15h59.5v5.46l.96-5.81-6.44-93.13 14.97-1.04 3.58 51.81 2.98 43.06-.14.87c-13.83 83.78-27.72 174.3-41.68 271.56-5.95 41.43-11.28 80-16 115.72h94.87l61.22 204.23-.67-3.61 51.5-9.5 2.73 14.75-50.29 9.27 2.61 8.7c10.79 37.07 20.65 77.02 29.59 119.84 18.08 86.54 22.37 144.9 12.88 175.07l-7.16-2.25 6.32 4.05c-4.22 6.58-8.21 13.23-11.95 19.95-23.79 42.67-37.94 88.07-42.44 136.18-1.57 16.68-1.85 32.73-.86 48.13.04.64.09 1.27.13 1.9.35 4.89.76 9.1 1.22 12.63 46.83 75 76.08 120.96 87.76 137.9l67.61 97.95 72.76 105.36c1.47 1.88 2.92 3.8 4.36 5.75 3.15 4.3 6.25 8.79 9.29 13.48l.84-.47 47.15 83.5 50.24-18.36 5.15 14.09-47.92 17.51 83.34 147.57 43.78-20.89 6.46 13.54-42.85 20.44 84.07 148.89-1.51-5.31 42-12 4.12 14.42-39.82 11.37 62.77 111.16 1.69-4.24 10.54 3.76c6.12-6.69 13.94-13.62 23.45-20.77 22.36-16.8 45.58-27.11 69.64-30.9 15.28-2.41 50.02-3.72 104.24-3.92 28.3-.1 61.9.09 100.82.59 54.47.69 106.75 1.72 156.82 3.08l11.1-43.59-28.69-36.09 11.75-9.33 33.31 41.91-15.9 62.42-5.99-.16c-51.8-1.44-105.99-2.52-162.59-3.24-63.82-.82-113.15-.83-148-.05-26.64.6-44.82 1.66-54.54 3.2-21.6 3.4-42.58 12.76-62.96 28.07-5.49 4.14-10.34 8.15-14.55 12.04-.82.77-1.63 1.53-2.4 2.29l616.77 220.63-5.05 14.12-629.18-225.06-.22.56 1.78 2.6-9.07 15.73-17.92 45.1 641.32 223.15.78.27-4.93 14.17v-.02zM2390.61 819.33l17.86 104.17-28.32 5.18 2.7 14.76 76.5-14-2.7-14.76-33.43 6.12-17.83-104.01-14.78 2.54zm64.8 468.18l-106 13-1.83-14.89 106-13 1.83 14.89zm566.73 25.78l32.36 101.61v54.4l-89.13 16.64-2.75-14.75 3.91-.73 72.97-13.63v-39.61l-28.4-89.2-3.25-10.19 14.29-4.55zm-478.64 281.89c.7-51.95 9.12-139.81 25.25-263.6h85.67l63.9 213.15c10.66 36.62 20.42 76.16 29.28 118.6 15.66 75.01 20.86 127.55 15.59 157.65-.56 3.23-1.25 6.21-2.06 8.92-32.02 50.2-50.73 104.19-56.14 161.96-1.19 12.67-1.67 25-1.44 37-18.68-29.98-39.72-63.86-63.12-101.66-4.09-6.95-9.2-16.52-15.35-28.7-12.38-24.53-23.69-49.88-33.93-76.03-32.68-83.47-48.56-159.24-47.64-227.29h-.01zm44.78 259.85c-4.11 2.92-9.7 6.14-16.79 9.65-19.23 9.54-43.65 17.77-73.28 24.7-46.52 10.88-208.15 40.57-484.9 89.08-5.36 1.06-12.16 1.92-20.41 2.57 4.4 3.38 8.63 7.35 12.71 11.9 26.05 29.05 41.34 76.59 45.87 142.63 1.03 15.06 2.23 31.44 3.59 49.14 7.92 103.09 21.38 250.89 40.36 443.38 17.51 102.23 35.3 204.82 53.36 307.76 15.8 90.06 28.48 161.09 38.03 213.1 5.67 30.86 10.15 54.56 13.45 71.12 1.77 8.85 3.18 15.62 4.26 20.3.53 2.33.97 4.11 1.32 5.33.09.32.17.59.24.79 1.02 1.76 1.81 4.26 2.38 7.5.34 1.95.85 5.68 1.55 11.2 1.79 14.17 3.62 25.62 5.5 34.34 3.28 15.25 7.61 28.46 12.98 39.63 14.44 30.03 36.75 45.84 66.91 47.44 19.39 1.03 43.08.1 71.06-2.77l.54-.06c1.8-.25 3.68-.52 5.64-.81 3.38-.49 6.93-1.02 10.67-1.58 32.68-4.94 66.9-10.94 102.65-18.02 17.32-3.43 30.45-5.89 39.4-7.39 5.07-.84 23-4.84 53.8-12 24.13-5.6 47.42-11 69.86-16.2l-6.93-45.55 14.83-2.26 6.76 44.42 24.94-5.77c93.62-21.64 169.67-49.51 228.16-83.61 23.7-13.82 46.98-30.02 69.85-48.59 13.87-11.27 33.68-28.76 59.43-52.47 7.08-6.51 12.41-11.4 15.99-14.67 21.37-19.51 44.06-37.08 68.05-52.69a527.72 527.72 0 0151.69-29.63c18.91-9.48 35.18-16.5 48.8-21.06l8.49-21.36c-6.88-3.47-15.29-8.03-25.22-13.69-23.45-13.37-45.99-27.78-67.61-43.23-69.55-49.73-116.89-100.83-142.01-153.28-5.7-11.9-10.92-24.32-15.67-37.26l-160.91 13.99-1.3-14.94 157.12-13.67c-13.22-40.06-22.15-84.82-26.79-134.28-2.11-22.47-3.19-44.59-3.24-66.37-.02-10.94.17-19.67.57-26.18 2.3-31.3 4.56-50.83 6.77-58.59.21-.74-.55-3.03-2.29-6.87-1.84-4.08-4.64-9.03-8.39-14.85-4.38-6.82-8.89-13.18-13.51-19.1l-.14-.18-73.01-105.72-67.62-97.96c-11.75-17.06-41.05-63.08-87.88-138.07l-1.33.26c-.2-1.03-.4-2.15-.59-3.34-22.25-35.65-48.39-77.7-78.4-126.16l-.04-.08-.04-.07c-4.26-7.23-9.55-17.11-15.86-29.63a885.223 885.223 0 01-23.4-50.22h-.02zm654.75 1124.67l6.21-10.78 3.95-9.92-4.07-5.96-276.18-489.09c-1.26 9.71-2.58 23.91-3.96 42.59-.38 6.19-.56 14.59-.54 25.22.05 21.32 1.11 42.99 3.17 64.99 6.6 70.24 21.98 130.6 46.15 181.09 24.01 50.14 69.74 99.32 137.2 147.56 21.2 15.15 43.31 29.28 66.32 42.4 8.4 4.78 15.65 8.75 21.75 11.9zm-545.1 576.89c5.68 15.96 12.08 39.99 19.21 72.09-2.69.07-5.41.16-8.17.27-11.23.41-23.11 1.04-35.64 1.88-34.47 2.31-58.02 5.52-70.65 9.61-10.88 3.54-20.09 1.72-27.62-5.43-7.58-7.21-14.22-19.93-19.9-38.16-4.94-15.86-13.84-40.85-26.69-74.97-6.81-18.08-14.73-38.72-23.75-61.93-1.23-5.58-4.53-10.08-9.89-13.5-9.83-6.26-23.64-5.32-41.45 2.8-8.6 3.93-18.62 7.35-30.05 10.27-8.15 2.07-17.01 3.89-26.59 5.46-9.37 1.52-17.74 2.6-25.11 3.24l-25.1-54.25-5.98-12.94c2.04-.13 4.11-.26 6.2-.42l.1.92c5.89-.67 13.22-1.63 21.98-2.88 17.03-1.77 42.63-5.16 76.79-10.17 38.23-5.6 65.83-9.11 82.79-10.52 17.85-1.49 33.15-1.81 45.91-.97 6.97.46 13.18 1.27 18.62 2.43 22.79 4.83 41.2 19.11 55.25 42.81 6.04 10.2 12.03 23.24 17.96 39.13 3.66 9.8 8.98 25.65 15.98 47.57 6.66 20.89 11.93 36.78 15.8 47.66z"
                            />
                            <g id="mechblock" fillRule="evenodd">
                                <path
                                    d="M1776 2726.06l108 697.5 345-55.5-34-147.5-62.5 11.5s-63.41-418.04-145.5-546c-51.8 7.78-211 40-211 40z"
                                    fill="#6db8fe"
                                />
                                <path
                                    d="M2189.5 3440.56l39.5-73-341.5 56-10.5 70 312.5-53z"
                                    fill="#72abdf"
                                />
                                <path
                                    d="M1773 2739.06l104 754.5 13-70-114-696-3 11.5z"
                                    fill="#0e2e4b"
                                />
                            </g>
                            <path
                                id="dance2"
                                className="cls-9"
                                d="M2527.5 3813.56s30.51 64.43 17 207c-15.92 17.43-17 25.5-17 25.5s-291.39 2.64-492.5 75.5c-35.06 15.9-31 14.5-31 14.5l-110.5-514 76-19 497.5-141s15.56 64.9 26.5 141 34 210.5 34 210.5z"
                            />
                            <g id="pgblock">
                                <path
                                    className="cls-27"
                                    d="M2371.5 3560.56l-26.5 68.5 16 48 31-51-20.5-65.5z"
                                />
                                <path
                                    d="M2370 3648.06s-33.87 67.95-40 85-11.4 58.91 27 70.5c25.72-1.35 27.5 0 27.5 0l30-62.5 3.5-8-24.5-51-23.5-34z"
                                    fill="#263f7b"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-27"
                                    d="M2019.5 4088.56l24-59.5-101-461.5-22.5 74.5 99.5 446.5z"
                                />
                                <path
                                    className="cls-39"
                                    d="M2492 4009.06s-320.6 27.16-470 79c2.37-12.11 21.5-59 21.5-59l466-72-17.5 52z"
                                />
                                <path
                                    className="cls-27"
                                    d="M2418.5 3730.06l-34 73 6 18.5h32.5l-4.5-91.5z"
                                />
                                <path
                                    d="M2408.5 3394.06l-465.5 174.5 100.5 460.5 466-71s44.86-80.24 11-276.5-112-287.5-112-287.5zm-38.5 167.5l-212 85.5 42 193 222.5-21s-4.91-67.58-6.5-80c-7.34-1.92-38.16-4.58-51.5-45s26.5-68.5 26.5-68.5l-21-64z"
                                    fill="#6392ff"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-39"
                                    d="M2171.5 3707.06l173-74 27-73-216.5 88 16.5 59z"
                                />
                            </g>
                            <path
                                className="cls-22"
                                d="M1839.98 539.06l-25 245c.66 20.5.63 30.48 0 62.5 69.92-3.29 636-38.5 636-38.5l170.5 15.5v-178l-155.5-87.5c-150.66-22.08-488-34.5-488-34.5l-138 15.5zM1833.5 1462.06s-32.34 90.87-12.5 304 204 182.5 204 182.5l443.5-77.5s62.05-10.5 46-90-53-347.5-53-347.5l-124 11.5-442 45-62-28z"
                            />
                            <path
                                className="cls-12"
                                d="M1834 1462.06s14.45 25.53 41.5 30 325.74-28.12 509-38l132.5 8-4.5-28-64-18-614.5 46zM2619 820.56l-168-12.5-636 38v-59s79.73 12.03 119.5 11 111.44.1 130.5 0 228.02-7.4 281.5-11c53.47-3.6 130.5-12 130.5-12l142 45.5z"
                            />
                            <g id="fc" fillRule="evenodd">
                                <path
                                    d="M2289 4141.56l46 201.5 267-56s57.18-146.25-59.5-241c-58.88 27.16-253.5 95.5-253.5 95.5z"
                                    fill="#c47cff"
                                />
                                <path
                                    d="M2334 4387.56l248.5-59.5 19.5-41-268 55.5v45z"
                                    fill="#d096ff"
                                />
                                <path
                                    d="M2285 4180.56l4-39 45 201v45l-49-207z"
                                    fill="#521c7e"
                                />
                            </g>
                            <g id="nblock" fillRule="evenodd">
                                <path
                                    d="M1961.5 1444.06l47.5 351 189-21-14.5-87.5-67.5 8.5-42.5-270-112 19z"
                                    fill="#f9c69c"
                                />
                                <path
                                    d="M2174 1826.56l-184 22.5 20-54 188.5-21.5-24.5 53z"
                                    fill="#fcd1ad"
                                />
                                <path
                                    d="M1952 1498.56l37 350.5 22-54-49.5-349.5-9.5 53z"
                                    fill="#785334"
                                />
                            </g>
                            <g id="oblock">
                                <path
                                    d="M2354.5 1864.06l44-78.5-166.5 19-25.5 77.5 148-18z"
                                    fill="#fbbdaf"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-53"
                                    d="M2198 1781.56l8.5 101 25.5-78-25.5-107-8.5 74.5v9.5zM2243 1626.56l3.19 64.5 18.81-2-16-150.5-8.5 54 2.5 34z"
                                />
                                <path
                                    d="M2208 1593.56l32.5-3 8-49-27 4.5-13.5 47.5z"
                                    fill="#c98475"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-53"
                                    d="M2198 1484.06l8.5-58.5 15 120.5-15 47.5-8.5-109.5z"
                                />
                                <path
                                    d="M2206.5 1696.56l24 108 167.5-18-66.5-370.5-125 9.5 15 121 27.5-5 15.5 147-58 8z"
                                    fill="#f9ad9c"
                                    fillRule="evenodd"
                                />
                            </g>
                            <path
                                id="dance"
                                className="cls-9"
                                d="M2220 2804.06l247.6-40.29 23.4-75.97-1.5-27.74 26-12 14 80 4.5 24.5 24 142.46-319.62 52.02-18.38-142.98z"
                            />
                            <g id="mess" fillRule="evenodd">
                                <path
                                    d="M1993 1404.06l159-2.5s119.8-15.46 154-66c-.15.34 7.5-21.5 7.5-21.5l-305 74-15.5 16z"
                                    fill="#f7b063"
                                />
                                <path
                                    d="M1990 1249.56l317-22.5 8 86s-51.05 65.1-190.5 68c-84.84 5.13-116 7.5-116 7.5l-18.5-139z"
                                    fill="#f9951e"
                                />
                                <path
                                    d="M1978 1278.06l12-28.5 19 138.5-14 16.5-17-126.5z"
                                    fill="#773800"
                                />
                            </g>
                            <path
                                className="cls-64"
                                d="M2790.5 2106.06l164 290 486.5-103.5 78-28.5-148.5-736v-65l-96.5 29-7.5 27 56.5 334-199.5 16-269 81-70.5 92s-15.54 30.36 6.5 64z"
                            />
                            <g id="mblock">
                                <path
                                    d="M2012.5 1139.56l116.5-13-18-175 144.5-15 42.5 190 119-15-75.5-303.5-374.5 34 45.5 297.5z"
                                    fill="#ffda99"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-6"
                                    d="M1996 1190.56l107-9.5 25-57-117.5 16-14.5 50.5zM2285 1173.56l107-9.5 25-57-117.5 16-14.5 50.5z"
                                />
                                <path
                                    d="M2116.5 1000.06L2247 977.9l8.15-42.72-16.12 1.88-127.32 14.1 4.79 48.9z"
                                    fill="#d9ba83"
                                    fillRule="evenodd"
                                />
                                <path
                                    d="M2247.5 982.06l37.5 192 15.5-50-45.5-187-7.5 45z"
                                    fill="#513e1e"
                                    fillRule="evenodd"
                                />
                                <path
                                    d="M1958 905.56l38 284.5 16-50-45-297.5-9 63z"
                                    fill="#342711"
                                    fillRule="evenodd"
                                />
                            </g>
                            <g id="tblock" fillRule="evenodd">
                                <path
                                    d="M1997.5 558.56l6.5 125h331s47.59-.75 43-73.5c-1.59-49.75 0-51.5 0-51.5h-380.5z"
                                    fill="#fbf8a3"
                                />
                                <path
                                    d="M1978 775.06l26-91 335.5-3s37.64-11.62 38.5-48.5c-7.92 49.51-25 112-25 112s-1.31 12.85-33 20-342 10.5-342 10.5z"
                                    fill="url(#linear-gradient)"
                                />
                                <path
                                    d="M1975 659.06l22-101 7.5 126-26.5 91-3-116z"
                                    fill="#393717"
                                />
                            </g>
                            <g id="borderforest-2">
                                <path
                                    className="cls-38"
                                    d="M4046.49 2124.56s-31.38 30.97-21.5 53 22.48 28.83 0 44.5-35.08 87.8 21.5 94.5c-47.28 21.94-42.3 51.63-21.5 71 22.5-10.55 21.5-26.5 21.5-26.5s-8.95 16.73 9 26.5c17.96 9.77 26 0 26 0l12.5 9s-51.64.88-55 15.5-33.04 20.99-23 37 38.69 28.91 54 7.5c-3.32 19.79-20.87 29.3-31 28.5s-36.43 14.21-23 29c38.83-.45 40.22 3.26 30.5 11-9.73 7.74-30.94 5.39-30.5 41 8.91 24.32 30.5 26.5 30.5 26.5s-41.19-11.73-45.5 8 5.24 34.33 38 35.5c-36.1 11.89-38.21 17-38 39s-.2 35.07 24 37c24.19 1.93 33.77 30.73 77.51 32.5-23.14 29.04-34.72 41.39-32.5 74.5s43 0 43 0-12.46 10.91 0 28.5c12.46 17.6 34.5-10.5 34.5-10.5s-10.21 20.46 10.5 28.5-95.85-5.01-102.5 14.5c-6.66 19.51 14.5 42 14.5 42s46.13 21.55 43 32c-3.12 10.45-.12 36.49 0 41s17 19 17 19 24.82 37.05 28 40.5-2.06 55.04 22.5 68 34.14-.37 44-17-34.09 45.73-18.5 55.5 1.82 28.27 18.5 33c15.37 4.36 51.3-7.78 56.5-11s31.5 0 31.5 0v-48s33.69 27.5 34.5 26-.06 20.92 0 33 22.5 39 22.5 39-13.16 28.8 11.5 35.5 38.53-55.91 48.5-35.5-7.76 15.73 13.5 35.5 29.18 14.04 41 0 67-508.5 67-508.5 16.75-161.55 0-320.43-67-315.07-67-315.07h-437.51z"
                                />
                                <path
                                    className="cls-21"
                                    d="M4146.28 2222.06s-24.5 24.18-16.79 41.37c7.72 17.2 17.55 22.5 0 34.74-17.55 12.23-27.39 68.54 16.79 73.77-36.92 17.13-33.03 40.31-16.79 55.42 17.56-8.24 16.79-20.69 16.79-20.69s-6.99 13.06 7.03 20.69 20.3 0 20.3 0l9.76 7.03s-40.32.69-42.94 12.1c-2.62 11.41-25.8 16.39-17.96 28.88s30.21 22.57 42.16 5.85c-2.59 15.45-16.29 22.88-24.2 22.25s-28.44 11.09-17.96 22.64c30.32-.35 31.41 2.54 23.81 8.59-7.6 6.04-24.16 4.21-23.81 32.01 6.96 18.98 23.81 20.69 23.81 20.69s-32.16-9.16-35.52 6.24c-3.37 15.4 4.09 26.8 29.67 27.71-28.19 9.28-29.83 13.27-29.67 30.44s-.15 27.38 18.74 28.88c18.89 1.51 26.36 23.99 60.52 25.37-18.07 22.67-27.11 32.31-25.38 58.16 1.73 25.85 33.58 0 33.58 0s-9.73 8.51 0 22.25 26.94-8.2 26.94-8.2-7.97 15.97 8.2 22.25c16.17 6.27-74.84-3.91-80.03 11.32-5.2 15.23 11.32 32.79 11.32 32.79s36.01 16.82 33.58 24.98c-2.44 8.16-.1 28.48 0 32.01.1 3.52 13.27 14.83 13.27 14.83s19.38 28.92 21.86 31.61c2.48 2.7-1.61 42.97 17.57 53.08s26.65-.29 34.35-13.27-26.62 35.7-14.44 43.33 54.5 19.68 58.56 17.17 15.23 8.59 15.23 8.59l9.37-46.06s26.31 21.47 26.94 20.3-.05 16.33 0 25.76 17.57 30.44 17.57 30.44-10.27 22.48 8.98 27.71 30.08-43.65 37.87-27.71c7.78 15.93-6.06 12.28 10.54 27.71s22.78 10.96 32.01 0 52.31-396.95 52.31-396.95 13.08-126.11 0-250.13-52.31-245.95-52.31-245.95h-341.63z"
                                />
                            </g>
                            <g id="borderforest-3">
                                <path
                                    className="cls-38"
                                    d="M2651 487.56s-15.66 78.22 73 70.5c26.08 18.57-13.77 111.08 80 108-12.61 35.72-18 78.2 31 89.5-53.63 2.54-31 52.5-31 52.5l-10.5 23s-25.41-15.24-34.5 0 9 25 9 25l-9 16s-13.57 25.66 9 39c-20.46 19.69-29.62 52.42 0 68.5-3.53 22.43-12.69 27.89 0 43.5-43.74-38-66.73 10.41-57 25 9.73 14.59-.83 44.65 57 33.5s52-33.5 52-33.5 5.23 24.59 47.5 21 58.56-34.47 55-55-19-34.5-19-34.5 39.41 4.21 50-29c15.52 6.29 38.12 22.63 63.5 0s52-12 52-12-2.85 31.97 29 41c-31.63 10.44-21.27 40.59 0 43.5 21.27 2.91 36.01 30.96 56.5 12 22.61-5.56 7.35 36.88 24.5 34s-19.27 29.17 0 53c6.57 33.7 13.06 59.31 40.5 52.5-12.77 18.59-35.2 51.41 0 74.5s32.5 11 32.5 11v25s-74.05 36.48-32.5 119c50.72 25.39 14.28 11.59 32.5 40 26.68 29.12 12 27.5 12 27.5s-38.42-6.47-35.5 20.5c27.61 16.39 35.5 0 35.5 0s-33.02 37.88 0 49 45-8.5 45-8.5 42.64-14.02 33.5-40.5c33.86-16.56 40.5 8.5 40.5 8.5s-35.71 43.94 0 67c18.51 21.74 37.5 0 37.5 0l16.5-12 11.5 12s-31.5 20.15-28 35.5 0 59 0 59 18.76 12.37 28 9.5 28-9.5 28-9.5 24.25 33.42 55.5 22.5c-2.88 33.31-6.3 58.03 24.5 70.5 14.51 28.76 22.98 45.75 52.5 52-3.84 23.32-20.98 23.35 0 47s52 0 52 0l28.5 40s-7.98 6.26 0 22.5c7.99 16.24-38.6-9.11-28.5 31.5 10.11 40.6 57.18 33.98 70.5 21 .9 38.23 12.11 44.93 32.5 50.5-11.42 23.42 12.3 25.56 21 21-6.04 17.94 22.5 24 22.5 24l-10 20.5s.7-4.08 0 13c-.69 17.08 29.36 24.65 34.5 15.5s27.62-23.69 37.5-15.5 28.15 31.95 43.5 26.5c15.35-5.46 28.1.4 35.5 14s60.6 17.16 49-14c20.84-6.07 25.5-26.5 25.5-26.5v40.5l26.5 23.5H4484l-535.5-1731-1550.5-321v321h253v56.5z"
                                />
                                <path
                                    className="cls-21"
                                    d="M2813.71 469.95s-13.48 67.31 62.82 60.67c22.44 15.98-11.85 95.59 68.84 92.95-10.85 30.74-15.49 67.3 26.67 77.03-46.14 2.19-26.67 45.18-26.67 45.18l-9.04 19.79s-21.87-13.12-29.69 0 7.74 21.52 7.74 21.52l-7.74 13.77s-11.67 22.08 7.74 33.57c-17.61 16.94-49.64 27.11-75.89 46.64-35.23 26.22-29.53 77.16 0 89.34 0 0 20.3-4.74 32.5-21.34 20.58-27.99 19.58-22.37 35.64-29.87 15.92-7.44 37.31 14.52 66.85 0h33.01s58.4-22.19 67.51-50.77c13.36 5.41 32.8 19.48 54.64 0 21.84-19.48 44.75-10.33 44.75-10.33s-2.45 27.52 24.96 35.29c-27.22 8.98-18.3 34.93 0 37.44s30.98 26.65 48.62 10.33c19.46-4.78 6.32 31.74 21.08 29.26s-16.58 25.11 0 45.61c5.66 29 11.24 51.04 34.85 45.18-10.99 15.99-30.29 44.25 0 64.11 30.29 19.87 27.97 9.47 27.97 9.47v21.51s-63.72 31.4-27.97 102.42c43.64 21.84 12.29 9.97 27.97 34.42 22.96 25.06 10.33 23.67 10.33 23.67s-33.06-5.57-30.55 17.64c23.76 14.1 30.55 0 30.55 0s-28.41 32.6 0 42.17 38.72-7.31 38.72-7.31 36.69-12.07 28.82-34.86c29.14-14.25 34.86 7.32 34.86 7.32s-30.73 37.81 0 57.66c15.92 18.71 32.26 0 32.26 0l14.2-10.33 9.9 10.33s-27.11 17.34-24.1 30.55c3.01 13.21 0 50.78 0 50.78s16.15 10.65 24.1 8.17c7.95-2.47 24.09-8.17 24.09-8.17s20.86 28.76 47.76 19.36c-2.48 28.67-5.43 49.95 21.08 60.68 12.49 24.75 39.24 29.77 39.24 29.77s-57.46 58.37-39.24 95.5c24.57 50.06 78.53-31.52 81.11-26.02 20.78 44.32 1.05 85.12 26.45 90.5-3.31 20.07-18.05 20.1 0 40.45 18.06 20.35 44.75 0 44.75 0l24.52 34.42s-6.87 5.39 0 19.37c6.87 13.97-33.22-7.84-24.52 27.11 8.69 34.94 49.21 29.24 60.66 18.07.78 32.9 10.42 38.67 27.97 43.46-9.83 20.16 10.58 22 18.07 18.08-5.2 15.43 19.36 20.65 19.36 20.65l-8.6 17.64s.6-3.51 0 11.19 25.26 21.21 29.68 13.34 23.77-20.39 32.27-13.34 24.22 27.5 37.43 22.81c13.22-4.7 24.18.34 30.55 12.05 6.37 11.7 52.15 14.77 42.17-12.05 17.93-5.22 21.94-22.81 21.94-22.81v34.86l22.8 20.22h373.89L3930.21 421.32 2398 110.06v272.39h289.32s-4.91 77.78 26.68 87.5c31.6 9.72 99.71-48.63 99.71-48.63v48.63z"
                                />
                                <path
                                    className="cls-38"
                                    d="M3355.5 512.56s-63.56-52.97-81.5 0c-17.94 52.97 35.5 45.5 35.5 45.5s-26.94 42.08 0 64.5-8.88 24.06 0 60.5 40.22 67.75 46 60 38.22-16.63 39.5-28 38.78-1.7 46-15 1.81-8.41 0-34c-1.82-25.59-9.86-28.66-16-43.5s16-47.5 16-47.5 4.07 48.63 0 0-21.32-86.53-46-62.5c-24.69 24.03-7.75-77.58-39.5 0zM3924.15 1528.43s181.98 73.46 179.55-61.88-114.24-77.6-114.24-77.6 26.03-117.14-51.08-148.22c-77.11-31.07.5-62.03-47.91-139.03s-142.26-125.16-148.86-102.95c-6.6 22.2-71.03 67.24-64.85 94.33s-84.1 33.34-89.47 69.39c-5.37 36.05 2.66 20.69 26.92 78.13 24.27 57.44 44.43 58.38 69.7 87.81s2.36 121.3 2.36 121.3-47.48-108.65 0 0 115.48 182.66 150.84 108.69c35.35-73.97 78.51 172.4 87.02-29.99l.02.02z"
                                />
                            </g>
                            <path
                                className="cls-22"
                                d="M2795.5 1111.06h-25l-17.5 25 59.5 314.5 169-25.5 237-31-34-169-53-114h-336z"
                            />
                            <g id="girls1">
                                <path
                                    className="cls-31"
                                    d="M2804 1096.06l59.5 238 124.5-19.5-39.5-143 103.5-16 36 146 118-19.5-64-234-338 48z"
                                />
                                <path
                                    className="cls-62"
                                    d="M2848.5 1402.56l115.5-17.5 22-70.5-121.5 19-16 69zM3063 1374.56l112-16 31-77.5-118 19.5-25 74z"
                                />
                                <path
                                    className="cls-51"
                                    d="M2785 1154.56l64 249 14.5-70-59.5-236.5-19 57.5zM3036 1226.56l27 148 26.07-77.58-37.57-141.42-15.5 71z"
                                />
                                <path
                                    className="cls-51"
                                    d="M2964 1232.06l72-9.5 16-67-103.5 15.5 15.5 61z"
                                />
                            </g>
                            <g id="girls2">
                                <path
                                    className="cls-31"
                                    d="M2794 1515.56l56 267 253-38-28-107.5-132 20.5-42.5-165.5-106.5 23.5z"
                                />
                                <path
                                    className="cls-42"
                                    d="M3072 1797.56l30.5-56-255 40.5-21 51 245.5-35.5z"
                                />
                                <path
                                    className="cls-51"
                                    d="M2784 1578.56l42.5 254.5 20-51-52-264-10.5 60.5z"
                                />
                            </g>
                            <g id="girls3">
                                <path
                                    className="cls-31"
                                    d="M3084.5 1479.56l75 289 114.5-12-78.5-294.5-111 17.5z"
                                />
                                <path
                                    className="cls-42"
                                    d="M3245.5 1815.56l-104 12.5 18.5-59.5 114.5-12.5-29 59.5z"
                                />
                                <path
                                    className="cls-51"
                                    d="M3074 1526.56l67.5 302 20-60-77-290-10.5 48z"
                                />
                            </g>
                            <g id="temple">
                                <path
                                    className="cls-9"
                                    d="M3007 3282.56l6 173.5 451-21.5-123.2-132.5s-1.84-43.06-61.3-51c-36.68-2.5-57.5 0-57.5 0l-215 31.5z"
                                />
                                <path
                                    className="cls-31"
                                    d="M3073 3302.56l6.5 80h132l-7.5-86.5-131 6.5z"
                                />
                                <path
                                    className="cls-44"
                                    d="M3221.5 3400.06l-10.5-17.5h-138l-17 25 165.5-7.5z"
                                />
                                <path
                                    d="M3054 3305.06l19-2.5 6.5 80-23.5 25-2-102.5z"
                                    fill="#656363"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-44"
                                    d="M3209 3300.06l12 99.5-10-17-6.5-86 4.5 3.5z"
                                />
                            </g>
                            <path
                                id="house"
                                d="M3105.69 3101.06l95.04-13.34 11.54 82.17-95.04 13.34-11.54-82.17z"
                                fill="#8e6c38"
                                fillRule="evenodd"
                            />
                            <g id="borderforest-4">
                                <path
                                    className="cls-38"
                                    d="M4471.01 3523.06s43.75-27.82 0-40.5c-43.76-12.68-29.11-55.78-67-47.5-37.9 8.28-50.8 24.02-53 0-2.21-24.02 6.96-21.6-23-28-29.97-6.4-43.81-76.98-49.01-44-5.19 32.98 7.8-13.37-23.49 0-31.3 13.37-23.71-19.14-50.01 0-26.29 19.14-52.33-17.76-59.49-12-7.17 5.76-15.23-37.3-36.01-17.5-20.77 19.8-38.15 2.51-48.5 17.5s-63.04-12.91-61.5 12c1.55 24.91-44.39-2.05-37 27 7.4 29.05 9.91 32.1 0 45s-1.63-40.59-30 0c-28.36 40.59-9.4 54.5-31 66-21.59 11.5-39.65-18.42-56 0s-80.73-38.12-82-18.5 8.03-1.08-22 18.5-46.05 9.42-56.5 22-35.79-21.81-48.5 0-50.75-3.64 0 46-90.22.36-78 32.5c12.23 32.14-46.39-60.98-46.5 0s-30.21 36.49-44 62-58.91-42.82-75 0-28.68 13.11-19.5 54.5-75.79-2.61-16 54 95.44 49.71 50.5 67c-44.94 17.3-59.99-58.83-71.5 0s-63.19 24.41-46 52c17.18 27.59 16.81 23.25 32 33.5 15.18 10.25-16.88 3.53-32 26.5s-69.82-37.97-69 0 0 48.5 0 48.5-32.44-18.31-36 0-27 48.5-27 48.5l-22 18.5s-44.37 19.17-26 43.5-48.16 25.83-57 47c-8.85 21.17-44.85-5.01-20.5 37.5 24.35 42.5-47.28 32.89-53 55s-70.75-17.57-44 26.5-18.67 33.79 0 69.5c18.67 35.72-41.75 15.83 0 42.5s-40.59-18.42 0 67 46.25 70.43 44 93.5-52.74 17.79-27.5 51c25.24 33.22-7.17 39.26 27.5 49.5 34.66 10.25-40.05 25.08-27.5 84s12.83 35.63 0 71.5c-12.83 35.88-14.41 39.29-16.5 52-2.09 12.72-5.98 20.45 0 31 5.98 10.56 249.5-31 249.5-31l451-207.5 326-261 292.5-278 228.5-446.5-12.99-140.5z"
                                />
                                <path
                                    className="cls-21"
                                    d="M4484 3654.56s-22.63-92.93-60.5-104.36c-37.87-11.43-25.19-50.25-57.99-42.79-32.8 7.46-45.2 24.79-47.1 3.15-1.91-21.64 6.03-19.45-19.91-25.22s-37.92-69.34-42.41-39.63 6.75-12.04-20.34 0-20.34-28.32-43.09-11.09c-22.76 17.24-45.29-15.99-51.5-10.81s-13.18-33.59-31.16-15.76-33.02 2.26-41.98 15.76c-8.95 13.5-54.56-11.63-53.23 10.81 1.34 22.43-38.42-1.85-32.02 24.32 6.4 26.17 8.58 28.91 0 40.53s-1.42-36.56-25.97 0-10.63 40.36-29.32 50.72c-18.69 10.36-44.9-43.52-85.98 0s-32.47-20.5-33.57-2.83 6.95-.97-19.04 16.66-39.86 8.49-48.9 19.82-30.98-19.64-41.98 0-43.92-3.28 0 41.43-78.09.33-67.51 29.27c10.58 28.95-92.84-9.31-92.94 45.61-.1 54.92 17.57-15.77 5.63 7.21-11.94 22.98-50.99-38.57-64.92 0s-24.82 11.81-16.88 49.09c7.94 37.28-65.6-2.35-13.85 48.64s38.89 93.41 0 108.99-51.93-52.99-61.89 0-54.69 21.98-39.81 46.84 14.55 20.95 27.69 30.17c13.14 9.23-14.61 3.18-27.7 23.87-13.08 20.69-60.43-34.2-59.72 0s0 43.69 0 43.69-28.08-16.49-31.16 0c-3.08 16.49-23.37 43.68-23.37 43.68l-19.04 16.66s-38.4 17.27-22.5 39.18-41.68 23.27-49.34 42.33c-7.66 19.07-38.82-4.51-17.74 33.78 21.07 38.28-40.92 29.62-45.87 49.54-4.95 19.92-61.23-15.82-38.08 23.87s-16.16 30.43 0 62.6-36.13 14.26 0 38.29c36.13 24.02-35.13-16.6 0 60.34 35.13 76.95 40.03 63.44 38.08 84.22-1.95 20.78-45.65 16.02-23.8 45.94 21.85 29.92-6.2 35.36 23.8 44.59s-34.66 22.59-23.8 75.66c10.86 53.07 11.1 32.09 0 64.4s-12.47 35.38-14.28 46.84c-1.81 11.45-5.18 18.41 0 27.92s215.95-27.92 215.95-27.92l390.35-186.9 282.16-235.09 253.17-208.07 75.44-92.47 227.91-453.5v.02z"
                                />
                            </g>
                            <path
                                className="cls-9"
                                d="M3794.03 3248.06l-486.97-180s-4.05 96.87 57.47 151c33.96 33.76 263.5 275 263.5 275l234-108 13.5-38 36-46-117.5-54z"
                            />
                            <path
                                id="entry"
                                d="M4025 3025.06l-11.5 91s-9.69 45.69-54.5 54c-14.18 39.48-20.5 62-20.5 62s31.96 13.07 0 85.5c-18.87 25.92-35.39 44.9-36.5 45.5"
                                stroke="#ffd231"
                                strokeWidth="12"
                                fill="none"
                            />
                            <path
                                className="cls-23"
                                d="M4460.5 2100.56l-345.5 23.5-68 38h437l-23.5-61.5z"
                            />
                            <g id="playground">
                                <path
                                    id="playgroundground"
                                    d="M880.67 1345.43l-282.84 757.86c-.21.57-.42 1.15-.61 1.73s-.37 1.17-.54 1.76-.32 1.18-.46 1.78c-.14.59-.27 1.19-.39 1.79s-.22 1.2-.32 1.81c-.09.6-.17 1.21-.24 1.82s-.12 1.22-.17 1.83c-.04.61-.07 1.22-.09 1.83s-.02 1.22-.02 1.84.03 1.22.06 1.83c.03.61.08 1.22.13 1.83.06.61.13 1.22.21 1.82.08.61.17 1.21.28 1.81.11.6.22 1.2.35 1.8s.27 1.19.43 1.78c.15.59.32 1.18.5 1.77 47.58 155.64 159.55 521.94 159.55 521.94s60.62 155.75 135.5 226c41.15 38.61 86.61 51.39 119.21 55.08 24.64 2.78 63.99 6.02 88.29 11 56.84 11.63 162.25 23.84 273-11.08 118.33-37.31 231.33-128.42 285.18-176.36 18.52-16.49 33.23-50.74 33.75-75.54l26.66-1293.43c.01-.73.01-1.45-.01-2.18-.02-.73-.06-1.45-.11-2.18-.06-.73-.13-1.45-.22-2.17s-.2-1.44-.33-2.16c-.13-.72-.27-1.43-.43-2.14s-.34-1.41-.53-2.12c-.19-.7-.4-1.4-.63-2.09s-.48-1.38-.74-2.05c-.26-.68-.54-1.35-.83-2.02-.29-.67-.6-1.32-.93-1.97-.33-.65-.67-1.29-1.03-1.93-.35-.63-.73-1.26-1.12-1.87-.39-.62-.79-1.22-1.2-1.82a44.32 44.32 0 00-2.68-3.45c-.47-.55-.96-1.09-1.45-1.62-.5-.53-1.01-1.05-1.54-1.55s-1.06-.99-1.61-1.47-1.11-.94-1.68-1.39c-.57-.45-1.15-.89-1.74-1.31s-1.2-.83-1.81-1.22a43.834 43.834 0 00-3.78-2.17c-.65-.33-1.3-.65-1.96-.95-.66-.3-1.33-.58-2.01-.85-.67-.27-1.36-.52-2.05-.75-.69-.23-1.38-.45-2.08-.65-.7-.2-1.4-.38-2.11-.55s-1.42-.32-2.13-.45c-.72-.13-1.44-.25-2.16-.34-.72-.1-1.44-.18-2.17-.24-.72-.06-1.44-.11-2.17-.13l-750.46-27.68c-.58-.02-1.17-.03-1.76-.03s-1.17.01-1.75.04c-.58.02-1.17.06-1.75.11a51.857 51.857 0 00-3.49.42c-.58.09-1.15.2-1.73.31-.57.11-1.15.24-1.71.38s-1.13.29-1.7.44c-.56.16-1.12.33-1.68.51s-1.11.37-1.66.58c-.55.2-1.09.42-1.63.64s-1.08.46-1.61.7c-.53.24-1.06.5-1.58.77s-1.04.54-1.55.83c-.51.29-1.02.58-1.51.89-.5.31-.99.62-1.48.95s-.97.66-1.44 1a46.764 46.764 0 00-2.76 2.17c-.45.38-.88.77-1.31 1.16-.43.4-.85.8-1.27 1.21-.41.41-.82.83-1.22 1.26-.4.43-.79.87-1.17 1.31-.38.44-.75.9-1.12 1.35-.36.46-.72.92-1.06 1.4-.35.47-.68.95-1.01 1.44a46.376 46.376 0 00-2.67 4.53c-.27.52-.52 1.05-.77 1.58s-.48 1.07-.71 1.61c-.23.54-.44 1.08-.65 1.63l.03-.02z"
                                    fill="#86807c"
                                    fillRule="evenodd"
                                />
                                <g id="playgroundmarkings">
                                    <path
                                        d="M1213.5 1474.56v38h100v-38h-100z"
                                        fill="#686461"
                                        fillRule="evenodd"
                                    />
                                    <path
                                        className="cls-14"
                                        d="M1605.5 1686.06h-476v976.4l476 10.19v-986.6zm-356 111.51v-102.5h-111v479.5h147.62c2.33-42.64 37.65-76.5 80.88-76.5s78.54 33.86 80.88 76.5h148.62v-479.5h-116v102.5h-231zm9-102.5h213v93.5h-213v-93.5zm180.38 479.5c-.99-17.95-7.98-33.42-20.97-46.41-14.06-14.06-31.03-21.09-50.91-21.09s-36.85 7.03-50.91 21.09c-12.99 12.99-19.97 28.46-20.96 46.41h143.75zm-300.38 9v470.1l117.24 2.51 1.76-100.61 230.97 4.03-1.77 101.53 109.81 2.35v-479.9h-148.62c-2.33 42.64-37.65 76.5-80.88 76.5s-78.54-33.86-80.88-76.5H1138.5zm156.62-.01c.99 17.95 7.98 33.42 20.96 46.41 14.06 14.06 31.03 21.09 50.91 21.09s36.85-7.03 50.91-21.09c12.99-12.99 19.98-28.46 20.97-46.41h-143.75zm182.56 477.36l-212.95-4.56 1.6-91.65 212.97 3.72-1.61 92.49h-.01zM1553 1473.06h107.5v164H1553v-164zm6 6.04v72.44h95.5v-72.44H1559zm0 151.93v-73.45h95.5v73.45H1559zM1036.5 2104.06H929v163h107.5v-163zm-101.5 78v-72h95.5v72H935zm0 6v73h95.5v-73H935z"
                                    />
                                </g>
                            </g>
                            <path
                                className="cls-9"
                                d="M3339.5 2941.56l550 193.5 17.5-48.5 56 20.5 24 8.5 25-174-592.5-34s-25.9.5-45.9 9-34.1 25-34.1 25zM3812.44 3177.39l-503.5-172-3.88 11.36 503.5 172 3.88-11.35zM2983.5 2525.06l241 424s-112.29-55.24-184-174.5-57-249.5-57-249.5zM2778 2410.56l61 135 83-11.5 31 185 14.5-4s-27.89-95.13-27.5-235c-.91-2.59 0-11 0-11l-31-60-15 7.5 16.5 38.5-16.5-5.5-23.44-53.98-92.56 14.98zM2967.07 2768.06l13.42-2.47s42.36 120.71 123.87 152.7c-46.64 10.17-110.95 16.39-110.95 16.39l-26.34-166.62z"
                            />
                            <path
                                className="cls-20"
                                d="M2895.5 2780.56l72.5-10.5 25.5 165-100.73 13.63s21.91-79.96 2.73-168.13z"
                            />
                            <path
                                className="cls-18"
                                d="M2895.07 2777.59l75.44-10.93 26.42 170.96-111.18 15.04 1.38-4.48c4.06-13.22 7.33-30.11 9.83-50.67 4.98-41.09 3.52-79.87-4.4-116.32l-.68-3.15 3.19-.46zm8.93 115.48c.27-45.05 1.32-69.42-3-110.44l65.42-9.56 23.58 158.11-92 12.9c3.42-12.74 6-51 6-51z"
                            />
                            <path
                                className="cls-72"
                                d="M2914.5 2798.06s10.64-14.24 18-7.5 12.14-6.24 16.5 0-5.86 8.26 0 13.5 23.64 9.26 19 17 7.64 18.26 0 23-8.86 8.26-8.5 15 10.14 14.76 8.5 20.5 9.14 8.26 0 17.5-16.86 12.76-19 18-8.86 8.26-16.5 9.5-11.86 10.26-11.5 0 0-27.5 0-27.5 24.14-.74 11.5-17.5-18.36-30.24-18-32.5 0-26 0-26 7.86-9.26 0-23z"
                            />
                            <path
                                className="cls-32"
                                d="M2941 2825.06c-10.18 1.1-17.81-10.48-15 5 2.82 15.48-11.93 6.84 0 18 11.93 11.15 11.41 11.65 13 19s9 16.5 9 16.5l-9 13.5s9.99 14.67 17 0 3.63-25.19 0-30-7.43-13.44-8-19-10.83.24 0-9.5 8.59-10.8 8-13.5-8-9.5-8-9.5-4.13 1.18-9 0-2.97 9.84 2 9.5z"
                            />
                            <g>
                                <path
                                    className="cls-20"
                                    d="M2887.67 2725.63l62.12-6.05-28.43-177.18-86.02 9.4s41.66 77.85 52.33 173.82z"
                                />
                                <path
                                    className="cls-18"
                                    d="M2887.25 2725.62l64.65-6.25-29.64-184.21-94.95 10.32 2.46 4.35c7.25 12.82 14.97 29.64 23.15 50.47 16.34 41.63 26.75 82.35 31.21 122.16l.38 3.44 2.73-.26v-.02zM2863.62 2603c13.53 46.37 21.52 71.28 30.48 114.47l51.17-4.03-29.38-167.97-71.79 6.23c6.3 12.41 19.53 51.29 19.53 51.29h-.01z"
                                />
                                <path
                                    className="cls-72"
                                    d="M2897.96 2703.22s12.87 12.19 16.87 3.53c4-8.67 11.72 3.59 13.42-3.86 1.7-7.45-7.22-7.15-4-13.92s16.49-15.07 10.43-21.96.81-20.61-6.81-23.71c-7.62-3.1-9.66-6.45-11.36-13.48-1.7-7.03 3.88-17.59.85-23.12-3.03-5.53 4.99-10.65-5.18-18.04-10.17-7.39-17.5-9.22-20.79-14.12-3.29-4.9-9.66-6.45-16.24-5.94s-12.69-7.81-9.36 2.69 8.14 28.35 8.14 28.35 19.86-4.88 14.54 15.35-5.99 35.46-5.02 37.71 7.7 26.8 7.7 26.8 9.14 7.71 6.81 23.71z"
                                />
                                <path
                                    className="cls-32"
                                    d="M2911.53 2669.19c-8.61 1.24-11.39 14.96-13.68-1.65-2.29-16.61-11.74-4.27-5.33-18.55 6.41-14.29 5.83-14.67 4.95-22.62-.88-7.95 2.44-19.11 2.44-19.11l-11.32-11.81s3.79-17.46 13.83-3.97 10.41 25.12 8.88 30.93c-1.53 5.8-2.07 15.59-.88 21.46 1.18 5.87-8.88 2.28 2.81 9.79s10.19 9.13 10.51 12.05c.32 2.92-3.7 11.66-3.7 11.66s-3.71-.25-7.32 2.1-5.33-9.45-1.19-10.26v-.02z"
                                />
                            </g>
                            <path
                                className="cls-9"
                                d="M2812.5 2546.56l23.5-3.5s49.96 156.79 54 183c-33.11 1.54-49.5 2.5-49.5 2.5l-28-182zM2894.59 2781.06l-48.59 5 15.64 168 30.72-2.5s13.33-94.11 2.23-170.5z"
                            />
                            <g>
                                <g id="borderforest">
                                    <path
                                        className="cls-38"
                                        d="M1427 4996.57s46.1-75.12 28-107.5-11.96-33.97 26.5-58.5c38.47-24.53 103.33-30.31 79-73s20.55-93.02 28.5-79-44.42-22.13 0 0 46.94 6.24 71 0c24.07-6.24 32-34.5 32-34.5l-32-36.5-71-48.5s24.53-20.4 36.5-26.5c11.97-6.11 34.5 26.5 34.5 26.5h94s-1.08 54.22 23.5 24.5c24.59-29.72 43.59-33.67 42.5-51-1.08-17.33-22.68-28.7 0-24.5s19.59 9.66 34.5 0c14.92-9.67 23-25.5 23-25.5s-30.52 9.9 0 0c30.53-9.91 44.58-2.39 42.5-21-2.07-18.61-4.86-3.96 0-39.5 4.86-35.55-11.49-42.36 15-34 26.5 8.35 50.43 8.07 34.5-20.5-15.92-28.57-15.75-58.75 0-59.5 15.76-.75 20.56-3.21 33.5 0 12.95 3.21 0-30.5 0-30.5s10.82 20.75 0 0c-10.81-20.75 3.89-19.54 0-34.5-3.88-14.96-20.5-27-20.5-27s-5.27 20.18-27 27-38.38 23.87-35.5 0 49.9 10.46 15-27c-34.89-37.47-42-37.5-42-37.5h-38.5l-34.5 22s-15.75-19.49 0-43.5 32.46-22.13 34.5-30 65.74-16.42 23-26.5c-42.74-10.09-57.5-12.5-57.5-12.5s12.21-11.81 12-24.5 25.72-46.65-12-46.5c-37.71.14-42.5-13.5-42.5-13.5s18.52-18.17 26.5-28c7.99-9.84-26.5-54.5-26.5-54.5s4.13-1.47 0-18.5c-4.12-17.04-23.5-15.01-23.5-15.01l-43 33.51-19-18.5s20.61 20 0 0c-20.6-20.01-31.51-23.26-32-35s0-29.5 0-29.5l-12.5-36.5h-22s-15.2 20.98 0 0c15.2-20.99 41.92-24.49 34.5-46.5-7.42-22.02-34.5-30.01-34.5-30.01l-13.5-20.49s45.83 14.67 13.5-20c-32.32-34.68-36.5-41.51-36.5-41.51l36.5-12s20.88-38.45 22-41.5c1.12-3.04-27.85-10.81 0 0 27.86 10.82 42.34 21.86 44.5 0 2.17-21.85 19-59.49 19-59.49s18.41-2.99 29.5 0c11.09 2.98 13.5-19.01 13.5-19.01s-18.38-19.35 0-16.99c18.39 2.35 24.66 6.28 23.5-13.51-1.15-19.79-26.04-28.5-23.5-38.5s-7.76-7.28-13.5-23c-5.74-15.71-7.13-33.58 0-39.5 7.13-5.91 13.5-12 13.5-12s22.94-11.48-13.5-22.5c-36.43-11.02-36.8-23.49-48.5-43-11.69-19.51-14.04-31.67 0-34.5 14.05-2.82 19-25.5 19-25.5v-20s-1.72-8.31 13-15c14.72-6.68 40.06-17.64 16.5-28.5s-29.5-16-29.5-16 10.9-43.8 0-52.5c-10.89-8.69-34.04-12.51-19-21 15.04-8.48 32-27.5 32-27.5v-28.5s-31.81-109.21-13-116c18.81-6.78 30.96-23.65 13-37-17.95-13.34-48.03-24-32-36s19-33 19-33-14.23-18.57-19-27.5c-4.76-8.92-32 0-32 0s23.02-59.1-12.5-35.5c-35.51 23.6-12.71 45.42-35.5 35.5-22.78-9.91-50.51-48.21-51.5-35.5s19.8 45.42 0 35.5c-19.8-9.91-35.55-31.14-45.5-23.5-9.94 7.64-26.36 14.61-33.5 23.5-7.14 8.9-26.5 15-26.5 15s-12.98-9.73-28 0c-15.01 9.74-29 30.5-29 30.5s-24.53-4.68-32.5 15 18 53 18 53-43.39 3.03-52.5 20c-9.11 16.98-15.1 48.73-23 18-7.89-30.72 2.5-41.31-22.5-38-25 3.32 3.68-26.09-26.5 0s-54 0-54 0-25.61-34.34-40.5-17c-14.89 17.35-33.5-16.5-33.5-16.5s-6.09-56.66-18-52.5c-11.9 4.17-70.79 13.16-87 33-16.21 19.85-62 36-62 36s-63.79-13.84-58-36c5.79-22.15 24.21-46.84 0-60.5-24.21-13.65-61.79-21.34-40-35.5 21.79-14.15 26.21-33.84 0-62-26.21-28.15-66-50-66-50s40.21 76.16 0 0c-40.21-76.15-54-96-54-96s38.21-3.84 0-44c-38.21-40.15 0-77 0-77s56.21-10.84 0-55c-56.21-44.15-84-52-84-52s-9.79-51.84 0-48c9.79 3.85 52.21-81.84 32-102-20.21-20.15-57.79-25.84-32-45 25.79-19.15 32-63 32-63s-71.79-59.84-32-46c39.79 13.85 68.21 44.16 84 0 15.79-44.15 0-60 0-60s58.21-5.84 54-26 0-73 0-73 38.21-26.84 0-71 31.6-15.72 48.5-41.5 31.11-4.59 17.5-36-42.21-46.87-17.5-51.5-.11-1.93 17.5-28 16.5-51 16.5-51 19.86 44.03 23.5 0 0-67.5 0-67.5l23-32.5s-47.45-17.8-23-24.5-3.18 3.43 23-20.5 36.34-4.56 22-37.5c-14.34-32.95-47.07-33.6-22-43s16.26-27.89 35-12.5c18.74 15.38-13.49 52.6 18.5 55.5 31.99 2.89 42.73-33.6 43.5-43 .78-9.4-6.52-33.01 13-12.5 19.52 20.5 14.07 31.12 25.5 12.5s0-60.5 0-60.5 35.39-29.59 48.5 0-.66 42.85 18 48c18.66 5.14 33.5-17 33.5-17s12.75-27.27 22 0c9.25 27.26-2.82-44.82 18.5-64 21.33-19.18 26.87 6.85 19-24s-39.05-6.2-19-37 63.81-33.89 19-54c-44.81-20.12-56.35.05-59.5-21.5s-12.13-23.88 0-38c12.14-14.13 63.71-25.45 22-51-41.71-25.56-59.77.58-38-26.5 21.77-27.08 38-36 38-36s-12.63-19.12-38-39.5-37.65-21.86-17.5-34.5c20.16-12.64 31.56-21.32 33.5-38 1.95-16.68 0-58.5 0-58.5s45.2-4.98 0-37-53.65-39.69-33.5-43.5c20.16-3.81 29.01-18.52 33.5-29 0 0 11.53 25.77 40.5 0s23.05-29.28 19-46-22.71-37.09 0-32 17.99 64.01 35 32 26.5-79 26.5-79 17.54-6.22 22.5 0 23 0 23 0v-23s29.71 2.63 34.5 0 18-42 18-42l14.5-20.5h29s96.6-16.26 133.5-41.5 11.75-83.76 51.5-29.5 48 29.5 48 29.5h64l53.5 41.5s-30.77-13.69 0 0 42.5 0 42.5 0l34.5-41.5s25.41 25.63 38.5 41.5c13.1 15.87 42 0 42 0l20.5-41.5s31.37-11.71 47.5 0c16.14 11.71 0 41.5 0 41.5l85-41.5s-65.92 5.68 0 0 106.25-9.54 110 0c0 0 18.51-7.37 47 0s20.99-22.58 53 0 100 41.5 100 41.5v-41.5s-35.31-40.28 19-29.5 17.51-6.43 87 0 76 0 76 0v-100s103.95 41.4 108.5 0 0-76 0-76v-115.5l-184.5-39-358-52s-576.05-12.84-664.5 0-681.5 150-681.5 150-231.01 245.93-250.5 262S0 1570.06 0 1570.06v1310l314 1137.01 486 872 424 292.49 203-184.99z"
                                    />
                                    <path
                                        className="cls-21"
                                        d="M1305.49 4969.01l50.82-32.45c11.81-21.42 14.95-51.25 0-78-14.95-26.74 37.97-14.63 39.07-40 1.28-29.63-54.09-73.13-22.31-93.38 31.78-20.26 74.92 43.27 88.82 36.88 19.49-8.95-3.45-61.92-23.55-97.19-20.1-35.26 16.98-27.39 23.55-15.81 6.57 11.59 15.77-18.27 52.47 0 36.7 18.28 10.27-38.34 30.15-43.5 19.89-5.15 15.29-56.33 15.29-56.33l-26.44-30.15-58.66-40.06s20.26-16.84 30.15-21.89c9.89-5.04 28.51 21.89 28.51 21.89h77.66s87.93 60.1 108.25 35.56c20.31-24.55 23.2-5.92 22.3-20.24-.89-14.32-18.74-23.7 0-20.23 18.74 3.46 16.19 7.98 28.51 0 12.32-7.99 19-21.07 19-21.07s-25.22 8.18 0 0 36.83-1.97 35.12-17.34c-1.71-15.38-32.52-3.27-28.51-32.63 4.02-29.36 22.32-4.97 44.2 1.93 21.89 6.9 41.67 6.66 28.51-16.93-13.16-23.6-44.83-93.87-31.81-94.49s16.98-2.65 27.68 0c10.69 2.65 0-25.19 0-25.19s8.93 17.14 0 0c-8.94-17.14 3.21-16.14 0-28.5s-16.94-22.3-16.94-22.3-4.35 16.67-22.31 22.3c-17.95 5.64-31.71 19.72-29.33 0 2.38-19.71 41.23 8.65 12.39-22.3-28.83-30.94-34.7-30.98-34.7-30.98h-31.81l-28.5 18.17s-13.02-16.09 0-35.93c13.01-19.83 26.82-18.27 28.5-24.78 1.69-6.5 54.32-13.55 19.01-21.89-35.32-8.33-47.51-10.32-47.51-10.32s10.09-9.76 9.91-20.24c-.17-10.48 21.25-38.53-9.91-38.41-31.17.12-35.12-11.15-35.12-11.15s15.3-15 21.9-23.13c6.6-8.12-21.9-45.02-21.9-45.02s3.41-1.21 0-15.28-19.42-12.39-19.42-12.39l-35.52 27.67 36.76-15.28s17.03 16.53 0 0c-17.02-16.52-26.03-19.21-26.44-28.91-.4-9.7 0-24.37 0-24.37l-10.32-30.14h-18.18s-12.56 17.33 0 0c12.56-17.34-25.68-20.23-31.81-38.41-6.13-18.19-28.51-24.79-28.51-24.79l-11.15-16.93s37.86 12.13 11.15-16.52c-26.7-28.65-30.15-34.29-30.15-34.29l30.15-9.9s-35.21-31.77-34.29-34.28c.93-2.52-23.01-8.94 0 0 23.02 8.93 34.98 18.05 36.77 0 1.79-18.06 26.85-127.02 26.85-127.02s15.21-2.48 24.38 0c9.16 2.46 11.15-15.7 11.15-15.7s-15.19-15.99 0-14.04c15.19 1.94 20.38 5.19 19.42-11.15-.96-16.35-21.52-23.54-19.42-31.8 2.1-8.27-6.41-6.02-11.15-19.01-4.74-12.97 53.6-18.4 59.49-23.29 5.89-4.89 11.15-9.91 11.15-9.91s18.95-9.48-11.15-18.59c-30.1-9.1-30.41-19.4-40.07-35.52-9.66-16.11-11.61-26.16 0-28.5 11.61-2.33 15.7-21.06 15.7-21.06l-26.44-43.79s-1.42-6.87 10.74-12.4c12.16-5.51 33.1-14.57 13.63-23.54s-24.37-13.21-24.37-13.21 9-36.19 0-43.37-28.13-10.33-15.7-17.34c12.42-7.01 26.44-22.72 26.44-22.72v-23.54s-26.28-90.21-10.74-95.82c15.54-5.6 25.57-19.53 10.74-30.56-14.84-11.02-39.68-19.82-26.44-29.74 13.24-9.91 15.7-27.25 15.7-27.25s-11.76-15.35-15.7-22.72c-3.94-7.37-26.44 0-26.44 0s19.01-48.82-10.33-29.32c-29.34 19.49-10.5 37.51-29.33 29.32s-41.74-39.82-42.55-29.32c-.82 10.5 16.36 37.51 0 29.32s-29.38-25.72-37.6-19.41c-8.21 6.31-21.78 12.06-27.67 19.41-5.9 7.35-21.9 12.39-21.9 12.39s-10.73-8.04-23.13 0c-12.41 8.04-23.96 25.19-23.96 25.19s-20.27-3.86-26.86 12.39c-6.58 16.26 14.87 43.78 14.87 43.78s-35.84 2.5-43.37 16.52c-7.53 14.03-12.48 40.25-19.01 14.87-6.52-25.38 2.07-34.13-18.59-31.39-20.65 2.74 3.05-21.54-21.89 0-24.94 21.55-44.62 0-44.62 0s-21.16-28.36-33.46-14.04c-12.3 14.33-27.68-13.63-27.68-13.63s-5.04-46.8-14.87-43.36c-9.84 3.44-58.49 10.86-71.88 27.25-13.4 16.4-95.44 125.56-95.44 125.56s-52.7-11.44-47.92-29.74 20.01-38.69 0-49.97-51.05-17.63-33.05-29.33c18-11.69 21.66-27.95 0-51.21s-54.53-41.3-54.53-41.3 33.23 62.91 0 0c-33.23-62.9-44.62-79.3-44.62-79.3s31.57-3.17 0-36.34 0-63.6 0-63.6 46.45-8.96 0-45.44c-46.45-36.47-69.4-42.95-69.4-42.95s-8.09-42.82 0-39.65c8.09 3.18 16.7-67.6 0-84.25-16.7-16.64-21.31-21.34 0-37.17 21.31-15.82-22.97-64.71-22.97-64.71s-110.58-18.86-128.19-17c-17.6 1.85 57.64-2.03 70.69-38.5 13.04-36.48-70.69-71.8-70.69-71.8s48.1-4.83 44.62-21.48-22.43-34.22-22.43-34.22 54-48.25 22.43-84.73c-31.57-36.47 26.11-12.98 40.07-34.27 13.97-21.3 28.75-30.51 17.5-56.45-11.25-25.95-37.92-90.73-17.5-94.55 20.42-3.83 53.61 50.42 68.17 28.88 14.55-21.54 13.63-42.13 13.63-42.13s16.41 36.37 19.42 0 0-55.76 0-55.76l19-26.84s-66.52-36.69-46.31-42.22c20.2-5.54-2.63 2.83 19-16.94 21.63-19.76 9.42-41.78-2.43-68.99-11.85-27.22-38.89-27.76-18.18-35.52 20.71-7.77 13.44-23.04 28.92-10.33 15.48 12.71-11.14 43.45 15.28 45.85 26.43 2.39 35.3-27.76 35.94-35.52.64-7.77-5.39-27.27 10.74-10.33 16.13 16.94 11.62 25.71 21.07 10.33 9.45-15.39-46.32-122.59-46.32-122.59s29.25-24.44 40.08 0-.55 35.4 14.87 39.65 27.68-14.05 27.68-14.05 20.45-132.02 28.09-109.5c7.64 22.53-33.03-73.72 0-153 15.09-36.21 37.59-.29 38.42-31.99 2.15-82.02 95.01 29.13 80.15-46.51-6.13-31.19 15.01 22.88 44.38 0 10.88-8.47 27.16-31.77 61.14-41.5 21.65-6.19 66.61 145.4 62.38-37-1.06-46-80-27.65-62.38-43.5 17.62-15.84 22.2 5.66 15.7-19.82s-32.26-5.12-15.7-30.56c16.57-25.44 52.73-27.99 15.7-44.61-37.03-16.61-46.56.05-49.16-17.75-2.61-17.8-10.03-19.72 0-31.39s52.64-21.02 18.18-42.13c-34.47-21.11-49.39.48-31.4-21.89 17.98-22.37 31.4-29.74 31.4-29.74s-10.44-15.79-31.4-32.63c-20.97-16.83-31.11-18.06-14.46-28.5s68.45-17.61 70.05-31.39c1.61-13.78-15.87-8.54-42.37-94.61l42.37-38.49s41.65-43.54 4.31-69.99-44.33-32.79-27.68-35.93c16.65-3.15 23.97-15.29 27.68-23.95 3.71-8.66 2.48 23.95 2.48 23.95s22.75 39.71 46.68 18.42c23.94-21.29 3.34-66.56 0-80.37s-18.76-30.64 0-26.43c18.77 4.2 14.86 52.87 28.92 26.43s36.18 38 36.18 38 24.17-37.77 28.26-32.63c4.1 5.14 19.01 0 19.01 0v-19s31.55 44.22 28.5 0c-3.05-44.22 14.88-34.69 14.88-34.69l11.98-16.93h23.96l21.07-70.62c23.19-14.98 54.02 37.79 84.51 16.93s12.6-86.12 45.44-41.3 39.66 24.37 39.66 24.37l59.99-68.56 44.21 34.28s-25.43-11.31 0 0c25.42 11.31 35.11 0 35.11 0l28.51-34.28s20.99 21.17 31.8 34.28c10.82 13.11 34.71 0 34.71 0l16.93-34.28s25.92-9.68 39.25 0c13.33 9.67 0 34.28 0 34.28h40.99s-54.47 4.69 0 0 13.79 43.33 16.89 51.21c0 0 15.29-6.08 38.83 0s66.24-114.71 98.29-51.21c32.06 63.5 102.13 34.28 102.13 34.28v-34.28s-29.18-33.27 15.69-24.37c44.88 8.9 14.47-5.31 71.89 0 57.41 5.31 96.29 34.28 96.29 34.28l56.15 41.3 42.35-16.93 87-90.75 37.5-143-319.29-97.9-295.8-42.94s-475.95-10.61-549.03 0c-73.08 10.61-563.08 123.9-563.08 123.9S623.43 331.77 607.33 345.03C591.22 358.3 0 1583.96 0 1583.96v1296.1l314 1173.15 478.68 838.35 437.04 290.5s-7.07-54 0-72c7.06-18 28.26 0 28.26 0 .53-19.22-47.21-24.73-28.26-78 18.94-53.26 12.9-21.86 12.9-21.86s34.59 32.16 50.31 21.86c15.72-10.3 12.56-63.05 12.56-63.05z"
                                    />
                                    <path
                                        className="cls-38"
                                        d="M1576.5 460.56l-103 29s-34.89 6.32-43.5 19.5-28 49-28 49-19.28 27.43-31.5 31-57.09-21.77-56.5 0 0 48.5 0 48.5l-29.5 28.5-39 17-31.5 16.5-25.5 17 25.5 37.5v54l-25.5 34.5v40.5l-33.5 25 33.5 23 25.5 33-25.5 35 25.5 28s-2.29 10.41 0 21-25.5 36-25.5 36l57 27 17.5 25-17.5 54v37s29.21 44.83 0 53.5-18.01 21.49-31.5 34.5-41.5 49.5-41.5 49.5 41.53-5.98 73 0 508.5 0 508.5 0 22.32-512.19-35-681.5-142.5-222.5-142.5-222.5zM1223.5 3978.06s-12.64-151.69-132.5-118-139.46-237.94-197-234 70.9-3.94-128 0-273.37-158.75-267-170 133.92-196.85 0-177 0-252 0-252 256.02-156.12 134-262c-122.02-105.88-33.75-57.44-134-149s-144-197-144-197l-165 197s96.93 114.59 85.5 149 28.27-236.43 0 0-33.46 251.16 0 342-27.85 79.2 0 172-48.42 337.45 79.5 347c127.92 9.55-2.66 177.87 144 234 146.66 56.13 213.38-12 267 182s128 319 128 319 58.73 387.93 197 196 41.98-269.45 222-284 241.71-200.53 180-231-269.5-64-269.5-64z"
                                    />
                                    <path
                                        className="cls-38"
                                        d="M1088 3242.57v-100.5l44.5 41s36.21-38.82 50.5-41l77 41s-8.78-87.98 38-41 42.75-7.44 47 41 24.8 32.58 0 59.5-53.56 47.38-47 59.5 108.94 78.03 93.5 92-28.4 11.69-46.5 43-51.32-2.23-47 57 78.34 106.64-38 55-85.03-60.6-127.5-55c-42.47 5.59-62.54 94.96-71.5 0s-20.09-62.58 0-100-15.62-50.49 0-92 27-59.5 27-59.5z"
                                    />
                                    <path
                                        className="cls-23"
                                        d="M780.47 3847.32v-57.86l25.53 23.61s20.77-22.35 28.97-23.61c8.2-1.26 0 0 0 0s158.81 95.63 211.75 163.67c52.94 68.03 0 108.47 0 108.47s-5.04-50.66 21.8-23.61c26.84 27.05 24.53-4.28 26.97 23.61 2.44 27.89 14.23 18.75 0 34.26-14.23 15.5-30.73 27.28-26.97 34.26s161.33-8.05 152.48 0c-8.86 8.05 17 56.12 0 85.96-10.23 17.95-55.62 6.57-66 24.59-10.38 18.03-88.96-34.1-86.48 0s9.73 207.14-57.02 177.41-13.57-180.63-37.93-177.41c-24.37 3.22-35.88 54.68-41.02 0s-11.53-36.03 0-57.58c11.53-21.55-8.96-29.07 0-52.97s-59.55-68.35-97.57-139.04c-38.02-70.7-54.51-143.74-54.51-143.74v-.02zM1119.96 3285.88v-57.86l25.53 23.61s20.77-22.35 28.97-23.61l44.18 23.61s-5.04-50.65 21.8-23.61c26.84 27.05 24.53-4.28 26.97 23.61 2.44 27.89 14.23 18.76 0 34.26s-30.73 27.28-26.97 34.26 62.5 44.92 53.65 52.97c-8.86 8.05-16.3 6.73-26.68 24.76s-29.45-1.28-26.97 32.82 44.95 61.4-21.8 31.67-48.79-34.89-73.15-31.67c-24.37 3.22-35.88 54.68-41.02 0s-11.53-36.03 0-57.58-8.96-29.07 0-52.97 15.49-34.26 15.49-34.26z"
                                    />
                                    <path
                                        className="cls-38"
                                        d="M753.64 968.49v-75.11l33.31 30.64s27.1-29.01 37.8-30.64l57.63 30.64s-6.57-65.75 28.44-30.64c35.02 35.11 32-5.56 35.18 30.64s18.56 24.35 0 44.47-40.09 35.41-35.18 44.47c4.91 9.06 81.54 58.31 69.99 68.76-11.55 10.44-21.26 8.74-34.81 32.14s-38.41-1.66-35.18 42.6 58.64 79.7-28.44 41.11-63.65-45.29-95.43-41.11c-31.79 4.18-46.81 70.97-53.52 0s-15.04-46.77 0-74.74-11.69-37.73 0-68.76c11.69-31.02 20.21-44.47 20.21-44.47z"
                                    />
                                    <path
                                        className="cls-23"
                                        d="M465.5 2933.06s81.27 34.32 59.5-53c-21.77-87.32-67-149-67-149s-33.23-103.12-52-45 0 120 0 120-15.58-48.73-45.5 0-52.29 39.93-46.5 74 46.5 78 46.5 78-56.41 117.6 0 80c56.41-37.61 105-105 105-105z"
                                    />
                                    <path
                                        className="cls-21"
                                        d="M1270 1335.06s345.91-10.05 364-32 8.32-26.39 26-63.5 27.9-133.04 28-150 6.53-74 0-90.5-28-224-28-224 2.23-57.9 0-74-19.45-37.41-26-49.5-47.53-66.88-55-75.5-58.5-69.5-58.5-69.5H1473s-4.58 4.03-17 13.5c-12.42 9.47-18.31 11.79-22 22s-8.09 30.3-13 34-1.34 11.92-14.5 22.5-35 17-35 17-28.4-14.43-26.5 0 15.16 18.71 0 36-35.19 22.02-46.5 31.5-46.5 31.5-46.5 31.5 5.56 30.35 0 43.5-15.54 67.65-20.5 84-20.14 28.69-13.5 41 6.14 5.04 13.5 30-.72 60.33 0 72.5 28.91 5.5 20.5 33-19.08 29.69 0 48.5 38.85 22.9 46.5 45.5 12.26 48.75 0 66 32.83 41.25 15.5 61-25.87 33.13-32.5 43.5 0 32 0 32l-11.5 20z"
                                    />
                                    <path
                                        className="cls-38"
                                        d="M1373.64 860.49v-75.11l33.31 30.64s27.1-29.01 37.8-30.64c10.7-1.63 0 0 0 0l57.63 30.64s-6.57-65.75 28.44-30.64c35.02 35.11 32-5.56 35.18 30.64s18.56 24.35 0 44.47-40.09 35.41-35.18 44.47c4.91 9.06 81.54 58.31 69.99 68.76-11.55 10.44-21.26 8.74-34.81 32.14s-38.41-1.66-35.18 42.6c3.23 44.26 58.64 79.7-28.44 41.11s-63.65-45.29-95.43-41.11c-31.79 4.18-46.81 70.97-53.52 0s-15.04-46.77 0-74.74-11.69-37.73 0-68.76c11.69-31.02 20.21-44.47 20.21-44.47z"
                                    />
                                </g>
                                <path
                                    className="cls-38"
                                    d="M467.16 1429.3c-4.79 1.85-10.74 3.76-17.1 5.8-24.01 7.7-53.9 17.29-49.8 32.97 2.12 8.11 12.2 15.67 21.85 22.91 13.96 10.47 27.04 20.29 13.92 30.14-11.34 8.51-16.99 4.84-19.81 3.02-2.55-1.66-2.76-1.79-2.73 10.14-10.96-2.66-19.43-3.02-23.83 1.2-13.47 12.91-32.01 44.63-19.92 50.43s29.41 93.89-19.19 74.25c-25.55-10.33-36.61-28.29-44.48-41.07-7.1-11.53-11.6-18.84-21.81-12.54-7.78 4.81-18.28 6.42-27.63 7.86-16.5 2.54-29.41 4.52-17.44 22.53 18.75 28.21 42.7 75.87 42.7 75.87-4.79 1.85-10.74 3.76-17.11 5.8-24.01 7.71-53.9 17.3-49.8 32.97 2.12 8.11 12.2 15.67 21.85 22.91 13.96 10.47 27.04 20.29 13.92 30.14-11.34 8.51-16.99 4.84-19.8 3.02-2.69-1.75-2.77-1.8-2.73 12.18.09 28.57 22.54 33.43 22.54 33.43s-64.17 1-47.98 32.35c7.55 14.61 15.06 21.14 20.99 26.29 6.8 5.9 11.52 10.01 11.84 22.4.61 23.21-26.83 33.52-19.21 46.78 3.28 5.71-.27 3.44-2.52 2-2.98-1.91-3.68-2.35 16.73 19.08 18.65 19.59 25.65 39.23 30.26 52.16 4.24 11.9 6.44 18.08 13.85 13.25 15.44-10.09 34.89-23.53 34.89-23.53s3-42.74 25.44-17.16c10.12 11.54 10.83 24.49 11.33 33.83.62 11.36.94 17.37 17.58 9.05 30.31-15.17 45.07-30.39 45.07-30.39s74.24-13.26 63.97-43.13c-6.09-17.71-10.44-24.48-14.54-30.84-2.81-4.37-5.51-8.55-8.55-15.96-3.13-7.61-10.68-11.92-17.17-15.63-9.02-5.15-16.02-9.15-6.35-19.25 16.64-17.38 45.07-30.39 45.07-30.39s15.96-21.03.14-44.49c-6.66-9.88-24.77-16.44-41.08-22.35-22.42-8.12-41.45-15.02-22.76-27.63 12.1-8.16 26.73-11.65 39.55-14.7l.33-.08c3.38 9.15 5.87 13.39 12.37 9.15 15.44-10.09 34.89-23.53 34.89-23.53s3-42.74 25.44-17.16c10.12 11.54 10.83 24.49 11.33 33.82.62 11.36.94 17.37 17.58 9.05 30.31-15.17 45.07-30.39 45.07-30.39s74.24-13.26 63.97-43.13c-6.09-17.71-10.44-24.48-14.54-30.84-2.81-4.37-5.51-8.55-8.55-15.96-3.13-7.61-10.68-11.92-17.17-15.63-9.03-5.15-16.02-9.15-6.35-19.25 16.63-17.38 45.07-30.39 45.07-30.39s15.96-21.03.14-44.49c-6.67-9.88-24.77-16.44-41.08-22.35-22.42-8.12-41.45-15.02-22.76-27.63 12.1-8.16 26.73-11.65 39.55-14.7 21.38-5.09 37.71-8.98 28.78-31.37-6.79-17.02-18.88-21.29-27.38-24.29-9.39-3.31-14.39-5.08-3-20.77 10.39-14.31 12.37-15.61 13.66-17.4 1.4-1.95 1.97-4.49 11.65-25.04 5.41-11.48 13.83-23.82 21.94-35.71 19.75-28.94 37.73-55.29 6.25-60.47-18-2.97-37.2-9.67-54.55-15.73-25.46-8.89-46.97-16.4-54.98-8.72-13.47 12.91-32.01 44.63-19.92 50.43s29.41 93.89-19.19 74.25c-25.55-10.33-36.61-28.29-44.48-41.07-7.1-11.53-11.6-18.84-21.81-12.54-7.78 4.81-18.28 6.42-27.63 7.86-16.5 2.54-29.41 4.53-17.44 22.53 18.75 28.21 42.7 75.87 42.7 75.87l-.04-.02z"
                                />
                                <path
                                    className="cls-23"
                                    d="M499.63 1543.31c-20.29 9.52-29.44 19.85-29.44 19.85s-16.51-28.51-18.17 12.25c-1.66 40.77 1.68 43.26 1.68 43.26s-32.24 29.22-32.61 42.6c-.36 13.38-1.34-6.06 10.05 14.9 11.39 20.95-13.92 28.47 16.91 25.07 30.82-3.4 34.09-27.1 42.16-28.43 8.07-1.33 45.12 26.13 45.12 26.13s16.31 6.93 18.17-12.25-4.15-18.24-4.42-32.43c-.27-14.19-2.82-7.42 5.1-24.58 7.92-17.16 39.81-3.08 37.07-25s-19.64-44.76-26.95-39.97-18.99 6.24-28.45-1.43-29.89-44.33-29.89-44.33l-6.32 24.35zM316.09 1858.41c-9.98 10.81-16.51-16.55-14.54 9.8 1.97 26.35-1.43 19.16-7.34 37.72s.55 8.99-4.74 24.34-7.14 12.9 13.72 20.35c20.86 7.45 19.68 1.62 28.75 11.27 9.07 9.66-19.01 49.52 16.42 24.34 35.42-25.17 29.85-14.65 29.23-36.62-.62-21.98-18.58-38.48-8.61-43.35s-8.09 6.23 19.26-12.99c27.36-19.22 33.27-40.22 20.44-43.39-12.83-3.16 2.68 8.37-22.16-6.2s-49.74-26.72-49.74-26.72 13.06-18.08 0 0-20.7 41.44-20.7 41.44z"
                                />
                            </g>
                            <path
                                className="cls-38"
                                d="M2029.58 4373.56l42.42 97.5 59-15 164.5-30 276-52.5 267.5-78.5 15.07 13.54 80.93-36.04 10.5 22.5-59.41 38.33-90.09 40.17s-71.13 23.61-94 24.5-57.2-10.85-68 0-33.59 10.96-48.5 17-22.93 8.21-45.5 11-42-8.88-52.5 0c-10.49 8.88-21.86 14.15-37.5 16.5s-16.71-5.12-35 0-326 50.5-326 50.5l-28 1-38.5-106H1965l-14-69 14-24 9.92 78.5h54.66z"
                            />
                            <g id="fountain">
                                <path
                                    d="M2531.5 3707.56s-.35 26.79 23.5 36.5 49.44-4.38 49-26.5c-8.33 10.99-11.56 19.92-24 21.5s-14.69.88-25-3.5c-10.3-4.38-23.5-28-23.5-28z"
                                    fill="#5e6868"
                                    fillRule="evenodd"
                                />
                                <path
                                    className="cls-45"
                                    d="M2533 3703.06c0-20.99 17.01-38 38-38s38 17.01 38 38-17.01 38-38 38-38-17.01-38-38z"
                                />
                                <path
                                    className="cls-18"
                                    d="M2571 3665.06c-20.99 0-38 17.01-38 38s17.01 38 38 38 38-17.01 38-38-17.01-38-38-38zm-22.63 60.63c-6.25-6.25-9.37-13.79-9.37-22.63s3.12-16.38 9.37-22.63 13.79-9.37 22.63-9.37 16.38 3.12 22.63 9.37 9.38 13.79 9.37 22.63c0 8.84-3.12 16.38-9.37 22.63s-13.79 9.37-22.63 9.37-16.38-3.13-22.63-9.37z"
                                />
                                <g>
                                    <path
                                        className="cls-45"
                                        d="M2622.15 3678.54s51.6-12.01 72.97-7.45c4.87 16.44 6.51 26.34 6.51 26.34s-47.12-3.17-73.9 10.43c-2.98-11.17-5.58-29.32-5.58-29.32z"
                                    />
                                    <path
                                        className="cls-18"
                                        d="M2621.56 3675.63c8.67-2.02 18.22-3.84 28.66-5.47 21.09-3.29 36.24-3.95 45.45-1.99l1.62.35.5 1.68c3.29 11.11 5.49 20.01 6.59 26.72l.62 3.73-3.54-.24c-7.73-.52-16.59-.48-26.58.12-19.81 1.19-35.13 4.53-45.96 10.04l-2.98 1.51-.9-3.39c-2.01-7.54-3.89-17.43-5.65-29.68l-.4-2.77 2.56-.6zm29.47.42c19.22-3.01 33.2-3.79 41.95-2.34 2.38 8.15 4.12 14.99 5.23 20.54-7.06-.31-14.94-.21-23.64.31-18.78 1.13-33.78 4.18-45 9.16-1.48-6.2-2.9-13.81-4.26-22.85 7.86-1.76 16.43-3.36 25.71-4.81h.01z"
                                    />
                                </g>
                            </g>
                            <path
                                className="cls-9"
                                d="M2802 3069.06l25 114s252.6-63.88 347-208.5c-65.97 12.2-71 14.5-71 14.5l-18.5-67s-172.58 28.03-192 27c5.27 56.1 13 93 13 93l-103.5 27zM2748 2681.06l40.5-4.5-22-119.5h-38l19.5 124zM2043.5 1986.06l8.5 56s17.09-7.59 37.5-10.5 446.5-90 446.5-90l-21.5-41.5-471 86z"
                            />
                            <path
                                d="M1888 1912.06s58.12 51.64 166.5 31 418.5-74 418.5-74l-38.5 13-145.5 30-260.5 48s-96.3 15.65-140.5-48z"
                                fill="#464543"
                                fillRule="evenodd"
                            />
                            <path
                                className="cls-9"
                                d="M2515 1437.56l-64-21.5s19.29-212.54 0-608c82.28 5.43 98 7.5 98 7.5s13.81 322.6-11.5 411.5-22.5 210.5-22.5 210.5z"
                            />
                            <path
                                className="cls-31"
                                d="M2460.5 1245.06l65.5 17v59l-65.5-6v-70zM2457.5 895.06l94.5 11.5 1 54.5h-91l-4.5-66zM2374.5 812.56v-28l38.5-3v28.5l-38.5 2.5z"
                            />
                            <path
                                className="cls-64"
                                d="M1812.5 2017.56h106s75.87 3.03 82 89.5 43.5 450 43.5 450v116h-9.5l-34-116-180 13.5s-8.8-507.37-15-553c2.97-2.47 7 0 7 0z"
                            />
                            <path
                                id="parking"
                                className="cls-3"
                                d="M2676.5 3340.06s55.39 124.6 153.5 578.5c78.84-23.82 228.5-70 228.5-70l136.5 51 141.5-135.5 81-161 160.5-53-114-117-450 23-7-175-330.5 59z"
                            />
                            <g>
                                <path
                                    className="cls-21"
                                    d="M3884.5 2194.06s-35.7 19.52-56.5 21.5c-20.8 1.99-25.08 34.11-59 16.5s-57.2-67.66-60.5-38c-3.3 29.67-7.43 25.73-27 38s-32.7-15.36-55.5 0 1.16 42.45-34 32-41.11-9.09-50.5-17.5-22.5-14.5-22.5-14.5l-37.5-16.5s-4.25 5.5 0-21.5-40.5-87-40.5-87-22.08 28.61 0 0c22.08-28.6 19.98-16.85 20-49 .02-32.15-20-48.5-20-48.5v-26l20-33.5s-10.14 20.09-20-19 6.77-51.94 0-62-12.41-6.31-23.5-36 0-38 0-38-33.37-36.16-31.5-50.5-42.05-18.05 0-26.5 55 0 55 0-18.14-63.07 20-27 37.47 8.66 44.5 27 .18 16.12 0 26.5-5.79-13.75 13.5 21.5-3.14 41.09 22.5 49.5 35.5 0 35.5 0-6.62 19.59 0 31 63.56 29.71 49 35.5-26.65 17.84 0 18c26.65.15 30.92-18.7 36 0s-20.8 21.54-12.5 50 32 59.5 32 59.5-28.85-2.96 0 0 24.09-46.44 44.5-13.5-7.41 20.94 23.5 46 70.48-4.4 61 16c-9.48 20.4-61.18 29.18-24 49s48.88 5.94 59 0 24.61-46.61 39 0 67.09 7.58 83.5 24 17.5 63 17.5 63-19.51 42.36 0 52.5 28.03 20.65 14.5 36-57.68 20.59-32 36 36.26 24.08 32 45.5-21.62 38.46-32 32-56.5-32-56.5-32 18.79-61.94 0-45.5 17.76-30.74 0-36 17.76-23.47 0-36-6.36-24.71-27-14.5-42.94 9.36-39 0 39-38 39-38z"
                                />
                                <path
                                    className="cls-38"
                                    d="M3620.38 2016.79s-53.58 1.64-62.5 0-27.5 30-27.5 30 9.59-73.63 0 0-.79 59.23 0 82-26 5.78 0 38-21.41 42.95 27.5 23.5 46.43-110.96 62.5-61.5 53.65 63.16 66 61.5 35.82 21.38 31.5-23.5-69.05-15.36-31.5-62c37.56-46.64 25-54.53 12-58s-59 0-59 0l-19-30z"
                                />
                            </g>
                            <path
                                className="cls-38"
                                d="M3472.5 4601.56c-46.43 14.14-134.03 57.55-165.5 0-31.47-57.54-84.82-37.91-72 0 12.81 37.91-20.17 35.33-39.5 0s-19.75-35.46-27.5-54.5 0-75 0-75h27.5l39.5-31.5s-43.06-74.64 0-52.5c43.07 22.15-99.05-107.67-67-116s67 0 67 0-44.66 57.16 0 47.5 72-22.5 72-22.5-18-41.15-5.96 2.56c12.05 43.71-31.97 106.09 5.96 88.44 37.93-17.66 71.64-17.37 71.5 0-.13 17.37 4.91 39.87 0 52.5s-87.46 4.19-43 31.5c44.46 27.3 45.9 23.07 81 22 35.1-1.06 54.61-24.41 56 0s-41.74 57.71-56 53c-14.25-4.71-30.33-22.35 0 0 30.33 22.36 35.86-17.36 35.86-17.36l20.14 71.86z"
                            />
                            <g>
                                <path
                                    className="cls-38"
                                    d="M4045.5 3747.5c-5.72-1.3-12.56-3.29-19.88-5.42-27.62-8.03-62-18.02-68.12-.58-3.16 9.02 1.55 22.6 6.06 35.61 6.52 18.82 12.63 36.44-6.06 37.39-16.15.82-19.16-6.26-20.65-9.78-1.36-3.2-1.47-3.45-9.05 7.85-8.67-9.5-16.45-15.25-23.29-14.07-20.98 3.62-58.73 21.8-51 35s-32.06 107.58-65.5 58c-17.58-26.07-16.59-50.11-15.88-67.23.64-15.43 1.04-25.23-12.62-25.77-10.42-.42-21.38-5.59-31.14-10.19-17.23-8.12-30.7-14.48-30.86 10.19-.25 38.65-8 99-8 99-5.71-1.3-12.56-3.29-19.88-5.42-27.62-8.03-62-18.02-68.12-.58-3.16 9.02 1.54 22.6 6.06 35.61 6.52 18.82 12.63 36.44-6.06 37.39-16.15.82-19.16-6.26-20.65-9.78-1.43-3.37-1.48-3.47-10.35 9.78-18.14 27.08 0 46 0 46s-61.33-39.99-66 0c-2.18 18.64.76 29.6 3.09 38.26 2.66 9.92 4.51 16.81-3.09 28.74-14.23 22.34-46.75 14.59-48 32-.54 7.49-2.45 3.08-3.66.28-1.6-3.7-1.98-4.57 3.66 28.72 5.15 30.42-.76 53.47-4.65 68.64-3.58 13.96-5.44 21.22 4.65 21.36 21.04.3 48 0 48 0s30.1-38.52 35 0c2.21 17.38-5.38 30.07-10.85 39.23-6.66 11.14-10.19 17.04 10.85 19.77 38.34 4.99 62 0 62 0s78.66 34.81 88 0c5.54-20.64 5.73-29.82 5.91-38.45.13-5.93.25-11.6 2.09-20.55 1.89-9.2-2.49-18.09-6.27-25.74-5.25-10.63-9.32-18.88 6.27-22.26 26.81-5.83 62 0 62 0s28.5-9.71 28.5-42c0-13.6-12.94-31.35-24.59-47.35-16.02-21.98-29.62-40.65-3.91-40.65 16.64 0 32.7 6.03 46.78 11.32l.36.13c-2.64 10.81-2.99 16.42 5.86 16.54 21.03.3 48 0 48 0s30.1-38.52 35 0c2.21 17.38-5.38 30.07-10.85 39.23-6.66 11.14-10.19 17.04 10.85 19.77 38.34 4.99 62 0 62 0s78.66 34.81 88 0c5.54-20.64 5.73-29.82 5.91-38.45.13-5.93.25-11.6 2.09-20.55 1.89-9.2-2.49-18.09-6.27-25.74-5.25-10.63-9.32-18.87 6.27-22.26 26.81-5.83 62 0 62 0s28.5-9.71 28.5-42c0-13.6-12.94-31.35-24.59-47.35-16.02-21.98-29.62-40.65-3.91-40.65 16.65 0 32.71 6.03 46.78 11.32 23.47 8.82 41.39 15.56 47.22-11.32 4.43-20.43-4.28-32.18-10.41-40.44-6.76-9.12-10.37-13.98 10.41-21.56 18.95-6.91 21.65-6.87 24.02-7.74 2.57-.95 4.73-2.99 26.98-16.26 12.44-7.42 28.26-13.71 43.52-19.79 37.14-14.78 70.94-28.23 44.48-53.21-15.13-14.29-29.01-32.87-41.56-49.68-18.41-24.65-33.97-45.48-46.44-43.32-20.98 3.62-58.73 21.8-51 35s-32.06 107.58-65.5 58c-17.58-26.07-16.59-50.11-15.88-67.23.64-15.43 1.04-25.23-12.62-25.77-10.42-.42-21.38-5.59-31.14-10.19-17.23-8.12-30.7-14.48-30.86 10.19-.25 38.65-8 99-8 99h-.01z"
                                />
                                <path
                                    className="cls-23"
                                    d="M4003.5 3876.06c-25.25-3.94-40.5 0-40.5 0s2.57-37.5-25 0-26 42-26 42-49.13 7.08-58 19.5 2.59-6.59 0 20.5-31.31 18.05 0 34.5 49.52-3.89 58 0 26 53.5 26 53.5 11.01 16.96 25 0 7.71-19.9 16.5-33.5 2.07-8.82 20.5-20 39.62 22.48 51 0c11.39-22.48 9.97-54.87 0-55-9.96-.13-21.94-6.21-26-19.5s0-61 0-61l-21.5 19zM3629 4057.06c-16.33 3.86-5.06-26.18-20 0s-13.58 17.21-31 31-5.21 8.85-20 20-14.98 7.64 0 28 17.58 14.08 20 29-49.55 34.72 0 33.5 37.57 5.18 51-16 6.96-48.25 19.5-46.5c12.53 1.75-11.62.73 26.5 0s57.11-16.82 47-28c-10.12-11.18-2.8 9.62-17-20s-30-57-30-57 23.89-8.77 0 0-46 26-46 26z"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
    </>
  );
});

export default SVGMap;

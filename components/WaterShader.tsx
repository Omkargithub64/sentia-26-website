import "./SvgLoader.css"

function WaterPlane() {
  

  return (
<svg
      className="svg-liquid"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {}
        <filter id="liquid">


          <feDisplacementMap
            in="SourceGraphic"
            scale="20"
          />
        </filter>

        <filter id="blur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {}
      <circle
        cx="30"
        cy="30"
        r="35"
        fill="#00eaff"
        filter="url(#liquid)"
        opacity="0.6"
      />

      {}
      <circle
        cx="70"
        cy="40"
        r="35"
        fill="#1c10ff"
        filter="url(#liquid)"
        opacity="0.5"
      />

      {}
      <circle
        cx="50"
        cy="70"
        r="40"
        fill="#00eaff"
        filter="url(#liquid)"
        opacity="0.5"
      />
    </svg>
  )
}

export default function WaterShader() {
  return <WaterPlane />
}

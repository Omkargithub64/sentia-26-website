import { Suspense } from "react"
import MapPage from "./MapPage"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <MapPage />
    </Suspense>
  )
}
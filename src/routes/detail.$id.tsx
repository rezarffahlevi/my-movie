import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/detail/$id')({
  component: DetailComponent,
})

function DetailComponent() {
  const { id } = Route.useParams()
  return (
    <div className="p-2">
      <h3>About {id}</h3>
    </div>
  )
}

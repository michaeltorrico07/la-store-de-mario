import { useRef } from "react"
import { useApi } from "../shared/hooks/useApi"
import type { Method } from "axios"

interface Product {
  _uuid: string
  name: string
  tags: string[]
  description: string
  image: string
  price: number
}

export const CrearProducto = () => {
  const paramsRef = useRef({
    method: 'POST' as Method,
    url: '/product',
    body: {
      name: "panchubi",
      description: "un panchubi con mayonesa",
      tags: ["pancho", "panchubi", "le pongo queso y ahora es veneco", "wasa"],
      image: "https://www.ab173.com/upload/default/2024/0802/5dbb5e90e50b1b741d482a129f2d3a12.png",
      price: 2499
    }
  })

  const { data, loading, error, fetch } = useApi<Product>({
    autoFetch: false,
    params: paramsRef.current,
  })

  const handleCreate = () => {
    fetch(paramsRef.current)
  }

  return (
    <div>
      <h2>Crear Producto</h2>
      <button onClick={handleCreate} disabled={loading}>
        {loading ? 'Creando...' : 'Crear producto'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {data && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Producto creado:</h3>
          <p><strong>Nombre:</strong> {data.name}</p>
          <p><strong>Descripción:</strong> {data.description}</p>
          <p><strong>Precio:</strong> ${data.price}</p>
          <p><strong>Tags:</strong> {data.tags.join(', ')}</p>
          <img src={data.image} alt={data.name} width={150} />
        </div>
      )}
    </div>
  )
}

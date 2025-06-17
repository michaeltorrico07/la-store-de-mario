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

export const OtroApiTest = () => {
  const paramsRef = useRef({
    method: 'GET' as Method,
    url: '/product',
    query: {
      tags: ['wasa', 'panchubi'],
    },
  })

  const { data, loading, error } = useApi<Product[]>({
    autoFetch: true,
    params: paramsRef.current,
  })

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error al cargar productos: {error.message}</p>
  if (!data || data.length === 0) return <p>No se encontraron productos</p>

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {data.map((product) => (
          <li key={product._uuid} style={{ marginBottom: '1rem' }}>
            <img src={product.image} alt={product.name} width={100} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Tags: {product.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

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

export const UseApiTest = () => {
  const paramsRef = useRef({
    method: 'GET' as Method,
    url: '/product',
    pathParam: '95a551c2-c68e-4043-8b80-fe2ad53d6593',
  })

  const { data, loading, error } = useApi<Product>({
    autoFetch: true,
    params: paramsRef.current
  })

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error al cargar productos: {error.message}</p>
  if (!data) return <p>No se encontraron productos</p>
  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {(
          <li key={data._uuid} style={{ marginBottom: '1rem' }}>
            <img src={data.image} alt={data.name} width={100} />
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <p>Precio: ${data.price}</p>
            <p>Tags: {data.tags.join(', ')}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

// CrearProducto.tsx
import { useCreateBalatro } from "./createBalatro"

export const CrearProducto = () => {
  const { data, loading, error, handleCall } = useCreateBalatro()

  return (
    <div>
      <h2>Crear Producto</h2>
      <button onClick={handleCall} disabled={loading}>
        {loading ? 'Creando...' : 'Crear producto'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {data && (
        <div className="mt-4">
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

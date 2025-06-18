import { useGetAllProduct } from "./getAllProducts"

// auth.currentUser?.uid
export const OtraApiTest = () => {
  const { data, loading, error } = useGetAllProduct()

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error al cargar productos: {error.message}</p>
  if (!data) return <p>No se encontraron productos</p>
  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {data.map(( data )=> (
          <li key={data.id} style={{ marginBottom: '1rem' }}>
            <img className='w-[200px]' src={data.image} alt={data.name} width={100} />
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <p>Precio: ${data.price}</p>
            <p>Tags: {data.tags.join(', ')}</p>
          </li>
        ) )}
      </ul>
    </div>
  )
}

export const Loading = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex items-center justify-center absolute z-60">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Cargando...</p>
      </div>
    </div>
  )
}

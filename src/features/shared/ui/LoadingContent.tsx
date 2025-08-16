import { LoaderCircle } from 'lucide-react'

interface LoadingContentProps {
  loading: boolean
  children: React.ReactNode
  className?: string
  app?: boolean
}

export const LoadingContent = ({ children, loading, className, app }: LoadingContentProps) => {
  return (
    <div className={`relative w-full h-full ${loading && 'max-h-screen'} ${className}`}>
      {children}
      {loading && (
        <div className={`absolute inset-0 flex flex-col max-w-full max-h-full bg-white ${app && 'fixed z-[100]'}`}>
          <div className='m-auto flex flex-col items-center gap-4'>
            <LoaderCircle className='animate-spin text-red-600' size={50} />
            <p className='font-semibold text-md'>Cargando...</p>
          </div>
        </div>
      )}
    </div>
  )
}

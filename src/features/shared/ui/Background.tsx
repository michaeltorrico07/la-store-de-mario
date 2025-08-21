interface BackgroundProps {
  children: React.ReactNode
  className?: string
}

export const Background = ({ children, className } : BackgroundProps) => {
  return (
    <div className={`transition-none duration-[0] absolute inset-0 w-full bg-black min-h-[clamp(calc(100vh-80px),calc(100vh-60px),92vh)] h-fit z-0 ${className}`}>
      {children}
    </div>
  )
}

import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean
  variant?: 'glass' | 'glass-blue' | 'solid'
  hover?: boolean
}

export default function Card({
  padding = true,
  variant = 'glass',
  hover = false,
  className = '',
  children,
  ...props
}: CardProps) {
  const base = 'rounded-2xl'

  const variants = {
    glass: 'glass',
    'glass-blue': 'glass-blue',
    solid: 'bg-white/90 border border-gray-100/80 shadow-sm',
  }

  return (
    <div
      className={`
        ${base}
        ${hover ? 'glass-card' : variants[variant]}
        ${padding ? 'p-5' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

import { SectionProps } from '@/lib/types'
import { cn } from '@/lib/utils'

interface BaseSectionProps extends SectionProps {
  children: React.ReactNode
  className?: string
}

export function BaseSection({ 
  children, 
  className,
  isEditing = false 
}: BaseSectionProps) {
  return (
    <section 
      className={cn(
        "relative w-full",
        isEditing && "outline-2 outline-dashed outline-blue-300 hover:outline-blue-500",
        className
      )}
    >
      {children}
    </section>
  )
}
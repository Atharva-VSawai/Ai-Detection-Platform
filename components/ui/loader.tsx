import type React from "react"
import { cn } from "@/lib/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <div
      className={cn("w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin", className)}
      {...props}
    />
  )
}


"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      "h-4 w-4 rounded-sm border border-primary text-primary focus:ring-2 focus:ring-primary disabled:opacity-50",
      className,
    )}
    {...props}
  />
))

Checkbox.displayName = "Checkbox"

export { Checkbox }

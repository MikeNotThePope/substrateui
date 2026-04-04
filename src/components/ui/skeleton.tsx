import { cn } from "@/lib/utils"

/**
 * A pulsing placeholder element used to indicate loading content.
 *
 * @example
 * <Skeleton className="h-4 w-48" />
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

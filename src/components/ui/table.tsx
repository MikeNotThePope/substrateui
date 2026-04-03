import * as React from "react"

import { cn } from "@/lib/utils"

function Table({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"table">) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"thead">) {
  return (
    <thead ref={ref} data-slot="table-header" className={cn("[&_tr]:border-b-2", className)} {...props} />
  )
}

function TableBody({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"tbody">) {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"tfoot">) {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn(
        "border-t-2 bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"tr">) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "border-b-2 last:border-b-0 transition-colors hover:bg-surface-interactive data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"th">) {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        "h-12 px-4 text-left align-middle bg-surface-sunken font-mono text-xs uppercase tracking-wider text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"td">) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"caption">) {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

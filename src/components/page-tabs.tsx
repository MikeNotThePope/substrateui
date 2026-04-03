"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function PageTabs({
  className,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  return (
    <Tabs
      data-slot="page-tabs"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

function PageTabsList({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TabsList>) {
  return (
    <TabsList
      ref={ref}
      data-slot="page-tabs-list"
      className={cn(
        "bg-transparent border-b-2 rounded-none h-auto p-0 w-full justify-start",
        className,
      )}
      {...props}
    />
  )
}

function PageTabsTrigger({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      ref={ref}
      data-slot="page-tabs-trigger"
      className={cn(
        "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-2",
        className,
      )}
      {...props}
    />
  )
}

function PageTabsContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TabsContent>) {
  return (
    <TabsContent
      ref={ref}
      data-slot="page-tabs-content"
      className={className}
      {...props}
    />
  )
}

export { PageTabs, PageTabsList, PageTabsTrigger, PageTabsContent }

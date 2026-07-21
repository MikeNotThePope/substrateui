import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Root navigation menu component built on Base UI NavigationMenu.
 *
 * @example
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
 *       <NavigationMenuContent>...</NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 */
function NavigationMenu({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      data-slot="navigation-menu"
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
}

/** Horizontal list container for navigation menu items. */
function NavigationMenuList({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center space-x-1",
        className
      )}
      {...props}
    />
  )
}

/** Individual item within a navigation menu list. */
const NavigationMenuItem = NavigationMenuPrimitive.Item

/** Trigger button style variants. Use with cn(navigationMenuTriggerStyle()) for non-trigger elements. */
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-popup-open:text-accent-foreground data-popup-open:bg-accent/50 data-popup-open:hover:bg-accent data-popup-open:focus:bg-accent"
)

/** Button that toggles the visibility of a navigation menu content panel. */
function NavigationMenuTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className="relative top-[1px] ms-1 h-3 w-3 transition duration-200 group-data-popup-open:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

/** Animated content panel revealed when a navigation menu trigger is activated. */
function NavigationMenuContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      data-slot="navigation-menu-content"
      className={cn(
        "start-0 top-0 w-full animate-in fade-in data-ending-style:animate-out data-ending-style:fade-out data-[activation-direction=right]:slide-in-from-right-52 data-[activation-direction=left]:slide-in-from-left-52 data-[activation-direction=right]:data-ending-style:slide-out-to-left-52 data-[activation-direction=left]:data-ending-style:slide-out-to-right-52 md:w-auto",
        className
      )}
      {...props}
    />
  )
}

/** Accessible link element within a navigation menu. */
const NavigationMenuLink = NavigationMenuPrimitive.Link

/** Viewport container that renders the active navigation menu content with animations. */
function NavigationMenuViewport({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side="bottom"
        align="start"
        sideOffset={6}
        className="z-50"
      >
        <NavigationMenuPrimitive.Popup
          data-slot="navigation-menu-viewport-popup"
          className={cn(
            "relative h-[var(--popup-height)] w-full overflow-hidden rounded-lg border-2 bg-popover text-popover-foreground shadow-hard transition-[width,height] duration-200 data-open:animate-in data-closed:animate-out data-closed:zoom-out-95 data-open:zoom-in-90 md:w-[var(--popup-width)]"
          )}
        >
          <NavigationMenuPrimitive.Viewport
            className={cn("relative h-full w-full overflow-hidden", className)}
            ref={ref}
            data-slot="navigation-menu-viewport"
            {...props}
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  )
}

/**
 * Animated arrow indicator that tracked the active item under Radix.
 * Base UI positions its arrow inside the popup positioner instead, so this
 * component is kept only for API compatibility and renders nothing.
 */
function NavigationMenuIndicator(props: {
  className?: string
  children?: React.ReactNode
}) {
  void props
  return null
}

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

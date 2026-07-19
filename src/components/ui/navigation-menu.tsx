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
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[popup-open]:text-accent-foreground data-[popup-open]:bg-accent/50 data-[popup-open]:hover:bg-accent data-[popup-open]:focus:bg-accent"
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
      <NavigationMenuPrimitive.Icon
        render={
          <ChevronDown
            className="relative top-[1px] ms-1 h-3 w-3 transition duration-200 group-data-[popup-open]:rotate-180"
            aria-hidden="true"
          />
        }
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
        "start-0 top-0 w-full p-0 transition-[opacity,translate] duration-200 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[starting-style]:data-[activation-direction=left]:-translate-x-52 data-[starting-style]:data-[activation-direction=right]:translate-x-52 data-[ending-style]:data-[activation-direction=left]:translate-x-52 data-[ending-style]:data-[activation-direction=right]:-translate-x-52 md:w-auto",
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
        sideOffset={6}
        collisionAvoidance={{ side: "none" }}
        className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-200 ease-out data-[instant]:transition-none"
      >
        <NavigationMenuPrimitive.Popup
          data-slot="navigation-menu-popup"
          className="relative h-(--popup-height) w-full origin-(--transform-origin) overflow-hidden rounded-lg border-2 bg-popover text-popover-foreground shadow-hard transition-[opacity,transform,width,height,scale] duration-200 ease-out data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 md:w-(--popup-width)"
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
 * Animated arrow indicator pointing at the active trigger. Renders inside the
 * popup positioner (Base UI's Arrow part replaces Radix's Indicator).
 */
function NavigationMenuIndicator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Arrow>) {
  return (
    <NavigationMenuPrimitive.Arrow
      ref={ref}
      data-slot="navigation-menu-indicator"
      className={cn(
        "flex h-1.5 items-end justify-center overflow-hidden transition-[left,right] duration-200",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-ss-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Arrow>
  )
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

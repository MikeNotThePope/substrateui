import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"

const meta: Meta<typeof Carousel> = {
  title: "Data Display/Carousel",
  component: Carousel,
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  render: () => (
    <Carousel className="w-64">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, i) => (
          <CarouselItem key={i}>
            <div className="flex aspect-square items-center justify-center rounded border-2 bg-surface-sunken font-mono text-2xl">
              {i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

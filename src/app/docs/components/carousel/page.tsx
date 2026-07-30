"use client"

import { useEffect, useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const carouselProps: PropDef[] = [
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which axis the slides run along. Sets Embla's axis and moves the buttons to the ends of that axis." },
  { name: "opts", type: "CarouselOptions", default: undefined, description: "Passed straight to Embla — loop, align, slidesToScroll, dragFree, and the rest." },
  { name: "plugins", type: "CarouselPlugin", default: undefined, description: "Embla plugins, such as autoplay or wheel gestures." },
  { name: "setApi", type: "(api: CarouselApi) => void", default: undefined, description: "Hands you Embla's api object, for reading the selected index or scrolling programmatically." },
  { name: "labels", type: "CarouselLabels", default: undefined, description: "Text overrides for the two navigation buttons: previousSlide, nextSlide. Set on CarouselPrevious / CarouselNext." },
]

const labelDefaults: PropDef[] = [
  { name: "previousSlide", type: "string", default: '"Previous slide"', description: "Screen-reader name for the previous button, whose visible content is an arrow." },
  { name: "nextSlide", type: "string", default: '"Next slide"', description: "Screen-reader name for the next button." },
]

const slides = ["Proof", "Plum", "Lava", "Moss", "Slate"]

function CountedCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const update = () => setCurrent(api.selectedScrollSnap())
    update()
    api.on("select", update)
    return () => {
      api.off("select", update)
    }
  }, [api])

  return (
    <Stack gap="sm" align="center" className="w-full">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {slides.map((name) => (
            <CarouselItem key={name}>
              <Card>
                <CardContent className="flex h-28 items-center justify-center">
                  <span className="text-lg font-semibold">{name}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <P className="text-sm text-muted-foreground" aria-live="polite">
        Slide {current + 1} of {slides.length}
      </P>
    </Stack>
  )
}

export default function CarouselPage() {
  return (
    <DocPage
      title="Carousel"
      description="A horizontal or vertical slider on Embla, with the arrows wired up. Embla's whole options object is exposed, so loop, alignment, and multi-slide scrolling are configured rather than reimplemented."
    >
      <ComponentPreview
        code={`<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {themes.map((name) => (
      <CarouselItem key={name}>
        <Card>
          <CardContent className="flex h-28 items-center justify-center">
            <span className="text-lg font-semibold">{name}</span>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
      >
        <div className="px-14 py-2">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {slides.map((name) => (
                <CarouselItem key={name}>
                  <Card>
                    <CardContent className="flex h-28 items-center justify-center">
                      <span className="text-lg font-semibold">{name}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ComponentPreview>

      <ImportLine
        names={[
          "Carousel",
          "CarouselContent",
          "CarouselItem",
          "CarouselPrevious",
          "CarouselNext",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <P>
          The two buttons are positioned <em>outside</em> the track — 12 units
          past its inline edges — so the carousel needs horizontal room around it
          or they will be clipped. Both are optional: drop them and the carousel is
          drag-and-swipe only.
        </P>
        <CompositionTree
          root="Carousel"
          nodes={[
            { name: "CarouselContent", children: [{ name: "CarouselItem" }] },
            { name: "CarouselPrevious" },
            { name: "CarouselNext" },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>More than one slide at a time</H3>
        <P>
          An item is <Code>basis-full</Code> by default. Override the basis and
          several slides share the track — the pattern for a shelf of cards rather
          than a hero. <Code>opts</Code> goes to Embla, so{" "}
          <Code>align</Code> and <Code>loop</Code> come from there.
        </P>
        <ComponentPreview
          code={`<Carousel opts={{ align: "start", loop: true }}>
  <CarouselContent>
    {themes.map((name) => (
      <CarouselItem key={name} className="basis-1/2 md:basis-1/3">
        …
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        >
          <div className="px-14 py-2">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-sm"
            >
              <CarouselContent>
                {slides.map((name) => (
                  <CarouselItem key={name} className="basis-1/2">
                    <Card>
                      <CardContent className="flex h-24 items-center justify-center">
                        <span className="text-sm font-semibold">{name}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Vertical</H3>
        <P>
          <Code>orientation=&quot;vertical&quot;</Code> switches Embla&apos;s axis,
          rotates the buttons to the top and bottom, and swaps the item&apos;s
          leading padding for top padding. The track needs a height.
        </P>
        <ComponentPreview
          code={`<Carousel orientation="vertical" className="w-full max-w-xs">
  <CarouselContent className="h-40">
    {themes.map((name) => (
      <CarouselItem key={name}>…</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        >
          <div className="py-14">
            <Carousel orientation="vertical" className="w-full max-w-xs">
              <CarouselContent className="h-40">
                {slides.map((name) => (
                  <CarouselItem key={name}>
                    <Card>
                      <CardContent className="flex h-36 items-center justify-center">
                        <span className="text-lg font-semibold">{name}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Reading the position</H3>
        <P>
          <Code>setApi</Code> hands over Embla&apos;s api object. Subscribe to{" "}
          <Code>select</Code> for a slide counter or dot indicators, and unsubscribe
          on cleanup — the effect below is the whole pattern.
        </P>
        <ComponentPreview
          code={`const [api, setApi] = useState<CarouselApi>()
const [current, setCurrent] = useState(0)

useEffect(() => {
  if (!api) return
  const update = () => setCurrent(api.selectedScrollSnap())
  update()
  api.on("select", update)
  return () => { api.off("select", update) }
}, [api])

<Carousel setApi={setApi}>…</Carousel>
<p aria-live="polite">Slide {current + 1} of {slides.length}</p>`}
        >
          <div className="px-14 py-2">
            <CountedCarousel />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Direction</H3>
        <Stack gap="sm">
          <P>
            The buttons are positioned with <Code>-start-12</Code> and{" "}
            <Code>-end-12</Code>, and the item&apos;s gap with <Code>ps-4</Code>, so
            the furniture lands on the correct sides in RTL without changes.
          </P>
          <P>
            The arrows are <Code>ArrowLeft</Code> and <Code>ArrowRight</Code>{" "}
            glyphs, and they do <em>not</em> mirror themselves — in RTL the
            &quot;previous&quot; button sits on the right while still drawing a
            left-pointing arrow. Embla also needs telling which way the content
            runs. Pass <Code>opts={"{{ direction: \"rtl\" }}"}</Code> in an RTL
            locale and mirror the glyphs with{" "}
            <Code>className=&quot;rtl:-scale-x-100&quot;</Code> on the two buttons.
            See{" "}
            <a
              href="/docs/accessibility/direction"
              className="underline underline-offset-4 hover:text-primary"
            >
              Direction (RTL)
            </a>
            .
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          The two buttons contain an arrow and an <Code>sr-only</Code> name, so
          their accessible names come entirely from{" "}
          <Code>CarouselLabels</Code>. Override per instance with{" "}
          <Code>labels</Code>, or app-wide through{" "}
          <Code>LabelsProvider</Code>&apos;s <Code>carousel</Code> key — the
          provider is how you translate them once rather than at every call site.
        </P>
        <ComponentPreview
          code={`{/* Per instance */}
<CarouselPrevious labels={{ previousSlide: "Diapositive précédente" }} />
<CarouselNext labels={{ nextSlide: "Diapositive suivante" }} />

{/* Or app-wide */}
<LabelsProvider
  labels={{ carousel: { previousSlide: "Diapositive précédente", nextSlide: "Diapositive suivante" } }}
>
  {children}
</LabelsProvider>`}
        >
          <div className="px-14 py-2">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {slides.slice(0, 2).map((name) => (
                  <CarouselItem key={name}>
                    <Card>
                      <CardContent className="flex h-24 items-center justify-center">
                        <span className="text-sm font-semibold">{name}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                labels={{ previousSlide: "Diapositive précédente" }}
              />
              <CarouselNext labels={{ nextSlide: "Diapositive suivante" }} />
            </Carousel>
          </div>
        </ComponentPreview>
        <PropsTable props={labelDefaults} />
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            The track is a <Code>region</Code> with{" "}
            <Code>aria-roledescription=&quot;carousel&quot;</Code>, and each item a{" "}
            <Code>group</Code> with <Code>aria-roledescription=&quot;slide&quot;</Code>.
            Arrow keys move between slides once the region has focus, and both
            buttons disable themselves at the ends unless <Code>loop</Code> is set.
          </P>
          <P>
            Slides that scroll out of view stay in the DOM and in the tab order. If
            a slide holds a link or a button, a keyboard user will land on a control
            they cannot see — which is the strongest argument for not putting
            essential content in a carousel at all.
          </P>
          <P>
            If you add autoplay through <Code>plugins</Code>, it must stop on hover
            and on focus, and there must be a way to stop it permanently. Motion
            that cannot be paused fails WCAG 2.2.2, and content that moves on its
            own is unusable for anyone reading slowly.
          </P>
          <P>
            Announce position changes yourself, as the counter above does with{" "}
            <Code>aria-live=&quot;polite&quot;</Code>. Without it, pressing
            &quot;next&quot; is silent.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>opts</Code> and <Code>plugins</Code> are Embla&apos;s own types
          passed through untouched; see the{" "}
          <a
            href="https://www.embla-carousel.com/api/options/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Embla options reference
          </a>{" "}
          for that surface. <Code>CarouselContent</Code> and{" "}
          <Code>CarouselItem</Code> take plain <Code>div</Code> props; the two
          buttons take <Code>Button</Code>&apos;s, so <Code>variant</Code> and{" "}
          <Code>size</Code> work on them.
        </P>
        <PropsTable props={carouselProps} />
      </Stack>
    </DocPage>
  )
}

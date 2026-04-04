import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable } from "../../_components/props-table"
import { H3 } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Grid } from "@/components/ui/grid"

function PlaceholderBox({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-16 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
      {children}
    </div>
  )
}

export default function GridPage() {
  return (
    <DocPage
      title="Grid"
      description="A CSS Grid layout component with configurable columns, gap, and auto-fill/auto-fit modes. Use Grid to create responsive multi-column layouts for cards, features, and content sections."
    >
      <Stack gap="xl">
        {/* ── Column Counts ───────────────────────────────── */}
        <Stack gap="md">
          <H3>Column Counts</H3>
          <Stack gap="lg">
            <ComponentPreview
              title="columns={2}"
              code={`<Grid columns={2} gap="md">
  <PlaceholderBox>1</PlaceholderBox>
  <PlaceholderBox>2</PlaceholderBox>
  <PlaceholderBox>3</PlaceholderBox>
  <PlaceholderBox>4</PlaceholderBox>
</Grid>`}
            >
              <Grid columns={2} gap="md" className="w-full">
                <PlaceholderBox>1</PlaceholderBox>
                <PlaceholderBox>2</PlaceholderBox>
                <PlaceholderBox>3</PlaceholderBox>
                <PlaceholderBox>4</PlaceholderBox>
              </Grid>
            </ComponentPreview>

            <ComponentPreview
              title="columns={3}"
              code={`<Grid columns={3} gap="md">
  <PlaceholderBox>1</PlaceholderBox>
  <PlaceholderBox>2</PlaceholderBox>
  <PlaceholderBox>3</PlaceholderBox>
  <PlaceholderBox>4</PlaceholderBox>
  <PlaceholderBox>5</PlaceholderBox>
  <PlaceholderBox>6</PlaceholderBox>
</Grid>`}
            >
              <Grid columns={3} gap="md" className="w-full">
                <PlaceholderBox>1</PlaceholderBox>
                <PlaceholderBox>2</PlaceholderBox>
                <PlaceholderBox>3</PlaceholderBox>
                <PlaceholderBox>4</PlaceholderBox>
                <PlaceholderBox>5</PlaceholderBox>
                <PlaceholderBox>6</PlaceholderBox>
              </Grid>
            </ComponentPreview>

            <ComponentPreview
              title="columns={4}"
              code={`<Grid columns={4} gap="md">
  <PlaceholderBox>1</PlaceholderBox>
  <PlaceholderBox>2</PlaceholderBox>
  <PlaceholderBox>3</PlaceholderBox>
  <PlaceholderBox>4</PlaceholderBox>
  <PlaceholderBox>5</PlaceholderBox>
  <PlaceholderBox>6</PlaceholderBox>
  <PlaceholderBox>7</PlaceholderBox>
  <PlaceholderBox>8</PlaceholderBox>
</Grid>`}
            >
              <Grid columns={4} gap="md" className="w-full">
                <PlaceholderBox>1</PlaceholderBox>
                <PlaceholderBox>2</PlaceholderBox>
                <PlaceholderBox>3</PlaceholderBox>
                <PlaceholderBox>4</PlaceholderBox>
                <PlaceholderBox>5</PlaceholderBox>
                <PlaceholderBox>6</PlaceholderBox>
                <PlaceholderBox>7</PlaceholderBox>
                <PlaceholderBox>8</PlaceholderBox>
              </Grid>
            </ComponentPreview>
          </Stack>
        </Stack>

        {/* ── Gap Variants ────────────────────────────────── */}
        <Stack gap="md">
          <H3>Gap Variants</H3>
          <Grid columns={2} gap="lg">
            <ComponentPreview
              title="gap=&quot;sm&quot;"
              code={`<Grid columns={3} gap="sm">
  <PlaceholderBox>1</PlaceholderBox>
  <PlaceholderBox>2</PlaceholderBox>
  <PlaceholderBox>3</PlaceholderBox>
</Grid>`}
            >
              <Grid columns={3} gap="sm" className="w-full">
                <PlaceholderBox>1</PlaceholderBox>
                <PlaceholderBox>2</PlaceholderBox>
                <PlaceholderBox>3</PlaceholderBox>
              </Grid>
            </ComponentPreview>

            <ComponentPreview
              title="gap=&quot;lg&quot;"
              code={`<Grid columns={3} gap="lg">
  <PlaceholderBox>1</PlaceholderBox>
  <PlaceholderBox>2</PlaceholderBox>
  <PlaceholderBox>3</PlaceholderBox>
</Grid>`}
            >
              <Grid columns={3} gap="lg" className="w-full">
                <PlaceholderBox>1</PlaceholderBox>
                <PlaceholderBox>2</PlaceholderBox>
                <PlaceholderBox>3</PlaceholderBox>
              </Grid>
            </ComponentPreview>
          </Grid>
        </Stack>

        {/* ── Responsive Auto-Fill ────────────────────────── */}
        <Stack gap="md">
          <H3>Responsive Auto-Fill</H3>
          <ComponentPreview
            title="Auto-fill with minimum child width"
            code={`<Grid columns="auto-fill" minChildWidth="200px" gap="md">
  <PlaceholderBox>Card 1</PlaceholderBox>
  <PlaceholderBox>Card 2</PlaceholderBox>
  <PlaceholderBox>Card 3</PlaceholderBox>
  <PlaceholderBox>Card 4</PlaceholderBox>
  <PlaceholderBox>Card 5</PlaceholderBox>
</Grid>`}
          >
            <Grid columns="auto-fill" minChildWidth="200px" gap="md" className="w-full">
              <PlaceholderBox>Card 1</PlaceholderBox>
              <PlaceholderBox>Card 2</PlaceholderBox>
              <PlaceholderBox>Card 3</PlaceholderBox>
              <PlaceholderBox>Card 4</PlaceholderBox>
              <PlaceholderBox>Card 5</PlaceholderBox>
            </Grid>
          </ComponentPreview>
        </Stack>

        {/* ── API Reference ───────────────────────────────── */}
        <Stack gap="md">
          <H3>API Reference</H3>
          <PropsTable
            props={[
              {
                name: "columns",
                type: '1 | 2 | 3 | 4 | 5 | 6 | "auto-fill" | "auto-fit"',
                default: "1",
                description:
                  "Number of grid columns, or auto-fill/auto-fit for responsive layouts.",
              },
              {
                name: "gap",
                type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
                default: '"md"',
                description:
                  "Controls the spacing between grid items.",
              },
              {
                name: "minChildWidth",
                type: "string",
                description:
                  "Minimum child width for auto-fill/auto-fit columns (e.g. \"200px\").",
              },
              {
                name: "asChild",
                type: "boolean",
                default: "false",
                description:
                  "When true, merges props onto the child element via Radix Slot instead of rendering a wrapping div.",
              },
            ]}
          />
        </Stack>
      </Stack>
    </DocPage>
  )
}

"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { type ColumnDef } from "@tanstack/react-table"
import {
  Plus,
  Sun,
  Moon,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Inbox,
  ChevronRight,
  MoreHorizontal,
  User,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react"

// Typography
import { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Code, Mono } from "@/components/ui/typography"

// Layout
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { Grid } from "@/components/ui/grid"
import { Center } from "@/components/ui/center"
import { Divider } from "@/components/ui/divider"
import { Spacer } from "@/components/ui/spacer"

// Core
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ButtonGroup } from "@/components/ui/button-group"

// Form controls
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Combobox } from "@/components/ui/combobox"
import { DatePicker } from "@/components/ui/date-picker"
import { NativeSelect } from "@/components/ui/native-select"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { SearchField } from "@/components/ui/search-field"
import { Label } from "@/components/ui/label"

// Form patterns
import { Form } from "@/components/ui/form"
import { FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent } from "@/components/ui/form-section"
import { FormActions } from "@/components/ui/form-actions"
import { Field, FieldLabel, FieldHint, FieldError } from "@/components/ui/field"
import { Fieldset } from "@/components/ui/fieldset"

// Data display
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTable, DataTableColumnHeader, createSelectColumn } from "@/components/ui/data-table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Feedback
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction } from "@/components/ui/empty"

// Overlays
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"

// Navigation
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

// Utility
import { Kbd } from "@/components/ui/kbd"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AspectRatio } from "@/components/ui/aspect-ratio"

// ─── Data ───────────────────────────────────────────────────────────────

type Person = {
  name: string
  email: string
  role: string
  status: string
}

const people: Person[] = [
  { name: "Alex Chen", email: "alex@example.com", role: "Engineering", status: "Active" },
  { name: "Sarah Kim", email: "sarah@example.com", role: "Design", status: "Active" },
  { name: "James Wilson", email: "james@example.com", role: "Product", status: "Pending" },
  { name: "Maria Garcia", email: "maria@example.com", role: "Engineering", status: "Active" },
  { name: "David Park", email: "david@example.com", role: "Marketing", status: "Inactive" },
]

const statusVariant = (s: string) =>
  s === "Active" ? "success" : s === "Pending" ? "warning" : "error"

const dataTableColumns: ColumnDef<Person>[] = [
  createSelectColumn<Person>(),
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={statusVariant(row.getValue("status") as string)}>
        {row.getValue("status") as string}
      </Badge>
    ),
  },
]

const comboboxOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "solid", label: "SolidJS" },
]

// ─── Helpers ────────────────────────────────────────────────────────────

const sections = [
  "colors", "typography", "buttons", "badges", "form-controls",
  "form-patterns", "cards", "data-display", "feedback",
  "overlays-floating", "navigation", "layout-primitives", "utility",
]

const PlaceholderBox = ({ children }: { children?: React.ReactNode }) => (
  <div className="h-20 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
    {children}
  </div>
)

// ─── Color Swatch ───────────────────────────────────────────────────────

function Swatch({ color, shade }: { color: string; shade: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-10 h-10 rounded bg-${color}-${shade}`} />
      <Mono className="text-xs">{shade}</Mono>
    </div>
  )
}

function SemanticSwatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-16 h-10 rounded border-2 border-border ${className}`} />
      <Mono className="text-xs text-center">{label}</Mono>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  const { setTheme, resolvedTheme } = useTheme()
  const [searchValue, setSearchValue] = React.useState("")
  const [sliderValue, setSliderValue] = React.useState([50])
  const [comboValue, setComboValue] = React.useState("")
  const [dateValue, setDateValue] = React.useState<Date | undefined>(new Date())
  const [switchOn, setSwitchOn] = React.useState(true)
  const [checkboxChecked, setCheckboxChecked] = React.useState(true)
  const [dropdownChecked, setDropdownChecked] = React.useState(true)

  return (
    <Center max="xl" className="py-12">
      <Stack gap="2xl">

        {/* ── Header ─────────────────────────────────────────── */}
        <Stack gap="md">
          <div className="flex items-center justify-between">
            <div>
              <H1>SubstrateUI</H1>
              <Lead>Component Design System</Lead>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>

          {/* Section nav */}
          <Cluster gap="sm" wrap>
            {sections.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </a>
            ))}
          </Cluster>
        </Stack>

        <Divider />

        {/* ── 1. Colors ──────────────────────────────────────── */}
        <section id="colors">
          <Stack gap="lg">
            <div>
              <H2>Colors</H2>
              <Muted>Raw palette, semantic tokens, and status colors.</Muted>
            </div>

            <Stack gap="md">
              <H3>Plum</H3>
              <Cluster gap="sm" wrap>
                {["50","100","200","300","400","500","600","700","800","900","950"].map((s) => (
                  <Swatch key={s} color="plum" shade={s} />
                ))}
              </Cluster>

              <H3>Amber</H3>
              <Cluster gap="sm" wrap>
                {["50","100","200","300","400","500","600","700","800"].map((s) => (
                  <Swatch key={s} color="amber" shade={s} />
                ))}
              </Cluster>

              <H3>Warm Neutrals</H3>
              <Cluster gap="sm" wrap>
                {["50","100","200","300","400","500","600","700","800","900","950"].map((s) => (
                  <Swatch key={s} color="warm" shade={s} />
                ))}
              </Cluster>
            </Stack>

            <H3>Semantic Tokens</H3>
            <Cluster gap="md" wrap>
              <SemanticSwatch className="bg-background" label="background" />
              <SemanticSwatch className="bg-card" label="card" />
              <SemanticSwatch className="bg-surface-sunken" label="sunken" />
              <SemanticSwatch className="bg-surface-raised" label="raised" />
              <SemanticSwatch className="bg-surface-interactive" label="interactive" />
              <SemanticSwatch className="bg-primary" label="primary" />
              <SemanticSwatch className="bg-destructive" label="destructive" />
              <SemanticSwatch className="bg-accent" label="accent" />
            </Cluster>

            <H3>Status Colors</H3>
            <Cluster gap="md" wrap>
              {(["success", "warning", "error"] as const).map((status) => (
                <div key={status} className="flex flex-col items-center gap-1">
                  <div className={`w-24 h-10 rounded bg-status-${status}-surface flex items-center justify-center`}>
                    <span className={`text-sm font-semibold text-status-${status}-text`}>{status}</span>
                  </div>
                </div>
              ))}
            </Cluster>
          </Stack>
        </section>

        <Divider />

        {/* ── 2. Typography ──────────────────────────────────── */}
        <section id="typography">
          <Stack gap="lg">
            <div>
              <H2>Typography</H2>
              <Muted>Every typographic component with sample text.</Muted>
            </div>
            <Stack gap="md">
              {([
                ["H1", <H1 key="h1">Heading One</H1>],
                ["H2", <H2 key="h2">Heading Two</H2>],
                ["H3", <H3 key="h3">Heading Three</H3>],
                ["H4", <H4 key="h4">Heading Four</H4>],
                ["P", <P key="p">This is a paragraph of body text used across the interface.</P>],
                ["Lead", <Lead key="lead">Lead text for introductions and summaries.</Lead>],
                ["Large", <Large key="lg">Large emphasis text.</Large>],
                ["Small", <Small key="sm">Small caption text.</Small>],
                ["Muted", <Muted key="mt">Muted secondary text for descriptions.</Muted>],
                ["Code", <Code key="cd">const x = 42;</Code>],
                ["Mono", <Mono key="mn">Monospaced text for data display.</Mono>],
              ] as [string, React.ReactNode][]).map(([name, el]) => (
                <div key={name} className="flex items-baseline gap-4">
                  <Code className="w-16 shrink-0 text-right">{name}</Code>
                  <div>{el}</div>
                </div>
              ))}
            </Stack>
          </Stack>
        </section>

        <Divider />

        {/* ── 3. Buttons ─────────────────────────────────────── */}
        <section id="buttons">
          <Stack gap="lg">
            <div>
              <H2>Buttons</H2>
              <Muted>All variants, sizes, and states.</Muted>
            </div>

            <H3>Variants</H3>
            <Cluster gap="sm" wrap>
              {(["default","destructive","outline","secondary","amber","ghost","link"] as const).map((v) => (
                <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
              ))}
            </Cluster>

            <H3>Sizes</H3>
            <Cluster gap="sm" align="center" wrap>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Plus className="size-4" /></Button>
            </Cluster>

            <H3>Disabled</H3>
            <Cluster gap="sm" wrap>
              <Button disabled>Default</Button>
              <Button variant="destructive" disabled>Destructive</Button>
              <Button variant="outline" disabled>Outline</Button>
            </Cluster>

            <H3>Button Group</H3>
            <ButtonGroup>
              <Button variant="outline">Left</Button>
              <Button variant="outline">Center</Button>
              <Button variant="outline">Right</Button>
            </ButtonGroup>
            <Muted>Click any button to see the press-down effect.</Muted>
          </Stack>
        </section>

        <Divider />

        {/* ── 4. Badges ──────────────────────────────────────── */}
        <section id="badges">
          <Stack gap="lg">
            <div>
              <H2>Badges</H2>
              <Muted>Status indicators and labels.</Muted>
            </div>
            <Cluster gap="sm" wrap>
              {(["default","secondary","destructive","outline","success","warning","error"] as const).map((v) => (
                <Badge key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
              ))}
            </Cluster>
          </Stack>
        </section>

        <Divider />

        {/* ── 5. Form Controls ───────────────────────────────── */}
        <section id="form-controls">
          <Stack gap="lg">
            <div>
              <H2>Form Controls</H2>
              <Muted>Individual form elements and input types.</Muted>
            </div>

            <H3>Input</H3>
            <Stack gap="sm">
              <Input placeholder="Default input" />
              <Input disabled placeholder="Disabled input" />
              <Field error>
                <FieldLabel>Email</FieldLabel>
                <Input placeholder="Error state" />
                <FieldError>Please enter a valid email address.</FieldError>
              </Field>
            </Stack>

            <H3>Textarea</H3>
            <Stack gap="sm">
              <Textarea placeholder="Write something..." />
              <Textarea disabled placeholder="Disabled textarea" />
            </Stack>

            <H3>Select</H3>
            <Select>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eng">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="product">Product</SelectItem>
              </SelectContent>
            </Select>

            <H3>Checkbox</H3>
            <Cluster gap="lg">
              <div className="flex items-center gap-2">
                <Checkbox id="cb-unchecked" />
                <Label htmlFor="cb-unchecked">Unchecked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-checked" checked={checkboxChecked} onCheckedChange={(v) => setCheckboxChecked(!!v)} />
                <Label htmlFor="cb-checked">Checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb-disabled" disabled />
                <Label htmlFor="cb-disabled">Disabled</Label>
              </div>
            </Cluster>

            <H3>Radio Group</H3>
            <RadioGroup defaultValue="option-1">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option-1" id="r1" />
                <Label htmlFor="r1">Option One</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option-2" id="r2" />
                <Label htmlFor="r2">Option Two</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option-3" id="r3" />
                <Label htmlFor="r3">Option Three</Label>
              </div>
            </RadioGroup>

            <H3>Switch</H3>
            <Cluster gap="lg">
              <div className="flex items-center gap-2">
                <Switch id="sw-off" />
                <Label htmlFor="sw-off">Off</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="sw-on" checked={switchOn} onCheckedChange={setSwitchOn} />
                <Label htmlFor="sw-on">On</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="sw-disabled" disabled />
                <Label htmlFor="sw-disabled">Disabled</Label>
              </div>
            </Cluster>

            <H3>Slider</H3>
            <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="w-64" />
            <Mono className="text-sm">Value: {sliderValue[0]}</Mono>

            <H3>Combobox</H3>
            <Combobox
              options={comboboxOptions}
              value={comboValue}
              onValueChange={(v) => setComboValue(v as string)}
              placeholder="Select a framework..."
              searchPlaceholder="Search frameworks..."
            />

            <H3>Date Picker</H3>
            <DatePicker date={dateValue} onDateChange={setDateValue} />

            <H3>Native Select</H3>
            <NativeSelect className="w-64">
              <option value="">Choose...</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </NativeSelect>

            <H3>Input OTP</H3>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <H3>Search Field</H3>
            <SearchField
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search components..."
              shortcut="/"
            />
          </Stack>
        </section>

        <Divider />

        {/* ── 6. Form Patterns ───────────────────────────────── */}
        <section id="form-patterns">
          <Stack gap="lg">
            <div>
              <H2>Form Patterns</H2>
              <Muted>Structured form layout with sections and validation.</Muted>
            </div>

            <Form>
              <FormSection>
                <FormSectionHeader>
                  <FormSectionTitle>Contact</FormSectionTitle>
                  <FormSectionDescription>Your personal contact information.</FormSectionDescription>
                </FormSectionHeader>
                <FormSectionContent layout="grid">
                  <Field>
                    <FieldLabel>First Name</FieldLabel>
                    <Input placeholder="Alex" />
                  </Field>
                  <Field>
                    <FieldLabel>Last Name</FieldLabel>
                    <Input placeholder="Chen" />
                  </Field>
                </FormSectionContent>
                <FormSectionContent>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input type="email" placeholder="alex@example.com" />
                    <FieldHint>We will never share your email.</FieldHint>
                  </Field>
                </FormSectionContent>
              </FormSection>

              <FormSection>
                <FormSectionHeader>
                  <FormSectionTitle>Preferences</FormSectionTitle>
                  <FormSectionDescription>Choose your notification preferences.</FormSectionDescription>
                </FormSectionHeader>
                <FormSectionContent>
                  <Fieldset legend="Notification method">
                    <RadioGroup defaultValue="email">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="email" id="pref-email" />
                        <Label htmlFor="pref-email">Email</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="sms" id="pref-sms" />
                        <Label htmlFor="pref-sms">SMS</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="push" id="pref-push" />
                        <Label htmlFor="pref-push">Push notification</Label>
                      </div>
                    </RadioGroup>
                  </Fieldset>
                  <Field>
                    <FieldLabel>Favorite Framework</FieldLabel>
                    <Combobox
                      options={comboboxOptions}
                      placeholder="Select a framework..."
                      searchPlaceholder="Search..."
                    />
                  </Field>
                </FormSectionContent>
              </FormSection>

              <FormActions>
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
              </FormActions>
            </Form>
          </Stack>
        </section>

        <Divider />

        {/* ── 7. Cards ───────────────────────────────────────── */}
        <section id="cards">
          <Stack gap="lg">
            <div>
              <H2>Cards</H2>
              <Muted>Content containers with optional interactivity.</Muted>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>A standard card with header, content, and footer.</CardDescription>
              </CardHeader>
              <CardContent>
                <P>Card content goes here. This is a simple example of a card layout.</P>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>

            <Card interactive>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover over this card to see the interactive effect.</CardDescription>
              </CardHeader>
              <CardContent>
                <P>This card responds to hover with a subtle visual change.</P>
              </CardContent>
            </Card>

            <Grid columns={3}>
              {[1, 2, 3].map((n) => (
                <Card key={n}>
                  <CardHeader>
                    <CardTitle>Card {n}</CardTitle>
                    <CardDescription>Grid card example.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <P>Content for card {n}.</P>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Stack>
        </section>

        <Divider />

        {/* ── 8. Data Display ────────────────────────────────── */}
        <section id="data-display">
          <Stack gap="lg">
            <div>
              <H2>Data Display</H2>
              <Muted>Tables, accordions, and tabbed content.</Muted>
            </div>

            <H3>Table</H3>
            <div className="border-2 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {people.map((p) => (
                    <TableRow key={p.email}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.email}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <H3>Data Table</H3>
            <DataTable columns={dataTableColumns} data={people} />

            <H3>Accordion</H3>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is SubstrateUI?</AccordionTrigger>
                <AccordionContent>
                  SubstrateUI is a design system built on Radix primitives with a bold, distinctive visual style.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I install it?</AccordionTrigger>
                <AccordionContent>
                  Components are available in src/components/ui and can be imported directly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. All interactive components are built on Radix UI primitives which provide full accessibility support.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <H3>Tabs</H3>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <P>Overview content with project summary and key metrics.</P>
              </TabsContent>
              <TabsContent value="analytics">
                <P>Analytics dashboard with charts and data visualizations.</P>
              </TabsContent>
              <TabsContent value="settings">
                <P>Settings panel for configuring your workspace preferences.</P>
              </TabsContent>
            </Tabs>
          </Stack>
        </section>

        <Divider />

        {/* ── 9. Feedback ────────────────────────────────────── */}
        <section id="feedback">
          <Stack gap="lg">
            <div>
              <H2>Feedback</H2>
              <Muted>Alerts, progress indicators, and loading states.</Muted>
            </div>

            <H3>Alerts</H3>
            <Stack gap="sm">
              <Alert>
                <Info className="size-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>This is a default informational alert.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle className="size-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your changes have been saved successfully.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTriangle className="size-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Please review your input before continuing.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <XCircle className="size-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </Stack>

            <H3>Progress</H3>
            <Stack gap="sm">
              <Progress value={25} />
              <Progress value={50} />
              <Progress value={75} />
            </Stack>

            <H3>Spinner</H3>
            <Cluster gap="lg" align="center">
              <div className="flex flex-col items-center gap-1">
                <Spinner size="sm" />
                <Mono className="text-xs">sm</Mono>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Spinner />
                <Mono className="text-xs">default</Mono>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Spinner size="lg" />
                <Mono className="text-xs">lg</Mono>
              </div>
            </Cluster>

            <H3>Skeleton</H3>
            <div className="space-y-3 w-80">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <H3>Empty State</H3>
            <Empty>
              <EmptyIcon><Inbox /></EmptyIcon>
              <EmptyTitle>No results found</EmptyTitle>
              <EmptyDescription>Try adjusting your search or filters to find what you&apos;re looking for.</EmptyDescription>
              <EmptyAction>
                <Button>Clear filters</Button>
              </EmptyAction>
            </Empty>
          </Stack>
        </section>

        <Divider />

        {/* ── 10. Overlays & Floating ────────────────────────── */}
        <section id="overlays-floating">
          <Stack gap="lg">
            <div>
              <H2>Overlays &amp; Floating</H2>
              <Muted>Dialogs, sheets, popovers, tooltips, and menus.</Muted>
            </div>

            <Cluster gap="sm" wrap>
              {/* Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>This is a dialog description explaining the purpose of this modal.</DialogDescription>
                  </DialogHeader>
                  <P>Dialog body content goes here.</P>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Alert Dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Open Alert Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your data.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>This sheet slides in from the right side.</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <P>Sheet content goes here.</P>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Drawer */}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer Title</DrawerTitle>
                    <DrawerDescription>This drawer slides up from the bottom.</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 pb-8">
                    <P>Drawer content goes here.</P>
                  </div>
                </DrawerContent>
              </Drawer>

              {/* Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Stack gap="sm">
                    <H4>Popover Title</H4>
                    <P>This is popover content with some helpful information.</P>
                  </Stack>
                </PopoverContent>
              </Popover>

              {/* Tooltip */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover for Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a helpful tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Hover Card */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">Hover Card</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <Stack gap="sm">
                    <H4>@substrateui</H4>
                    <P>A bold design system built with Radix and Tailwind.</P>
                    <Muted>Joined March 2024</Muted>
                  </Stack>
                </HoverCardContent>
              </HoverCard>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><User className="mr-2 size-4" /> Profile</DropdownMenuItem>
                  <DropdownMenuItem><CreditCard className="mr-2 size-4" /> Billing</DropdownMenuItem>
                  <DropdownMenuItem><Settings className="mr-2 size-4" /> Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked={dropdownChecked} onCheckedChange={setDropdownChecked}>
                    Show activity
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><LogOut className="mr-2 size-4" /> Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Cluster>

            {/* Context Menu */}
            <H3>Context Menu</H3>
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground text-sm">
                  Right-click here to open the context menu
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Copy</ContextMenuItem>
                <ContextMenuItem>Paste</ContextMenuItem>
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </Stack>
        </section>

        <Divider />

        {/* ── 11. Navigation ─────────────────────────────────── */}
        <section id="navigation">
          <Stack gap="lg">
            <div>
              <H2>Navigation</H2>
              <Muted>Breadcrumbs, pagination, and navigation menus.</Muted>
            </div>

            <H3>Breadcrumb</H3>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Category</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Current Page</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <H3>Pagination</H3>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                {[1, 2, 3, 4, 5].map((n) => (
                  <PaginationItem key={n}>
                    <PaginationLink href="#" isActive={n === 2}>{n}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <H3>Navigation Menu</H3>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                    Projects
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                    Settings
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </Stack>
        </section>

        <Divider />

        {/* ── 12. Layout Primitives ──────────────────────────── */}
        <section id="layout-primitives">
          <Stack gap="lg">
            <div>
              <H2>Layout Primitives</H2>
              <Muted>Composable layout components for spacing and alignment.</Muted>
            </div>

            <H3>Stack</H3>
            <Stack gap="md">
              <PlaceholderBox>Stack item 1</PlaceholderBox>
              <PlaceholderBox>Stack item 2</PlaceholderBox>
              <PlaceholderBox>Stack item 3</PlaceholderBox>
              <PlaceholderBox>Stack item 4</PlaceholderBox>
            </Stack>

            <H3>Cluster</H3>
            <Cluster gap="sm" wrap>
              <Badge>Tag 1</Badge>
              <Badge variant="secondary">Tag 2</Badge>
              <Badge variant="outline">Tag 3</Badge>
              <Badge variant="success">Tag 4</Badge>
              <Badge variant="warning">Tag 5</Badge>
              <Badge variant="error">Tag 6</Badge>
            </Cluster>

            <H3>Grid</H3>
            <Grid columns={3}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <PlaceholderBox key={n}>Grid {n}</PlaceholderBox>
              ))}
            </Grid>

            <H3>Center</H3>
            <Muted>This page uses <Code>Center max=&quot;xl&quot;</Code> for its main content area.</Muted>

            <H3>Divider</H3>
            <Stack gap="md">
              <Divider />
              <Divider label="With Label" />
            </Stack>

            <H3>Spacer</H3>
            <Cluster gap="sm">
              <Badge>Left</Badge>
              <Spacer axis="horizontal" />
              <Badge>Right</Badge>
            </Cluster>
          </Stack>
        </section>

        <Divider />

        {/* ── 13. Utility ────────────────────────────────────── */}
        <section id="utility">
          <Stack gap="lg">
            <div>
              <H2>Utility</H2>
              <Muted>Keyboard hints, avatars, separators, and more.</Muted>
            </div>

            <H3>Kbd</H3>
            <Cluster gap="md" align="center">
              <Kbd>K</Kbd>
              <Kbd keys={["⌘", "K"]} />
            </Cluster>

            <H3>Avatar</H3>
            <Cluster gap="md" align="center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </Cluster>

            <H3>Separator</H3>
            <Stack gap="md">
              <Separator />
              <div className="flex items-center gap-4 h-8">
                <span className="text-sm">Item A</span>
                <Separator orientation="vertical" />
                <span className="text-sm">Item B</span>
                <Separator orientation="vertical" />
                <span className="text-sm">Item C</span>
              </div>
            </Stack>

            <H3>Scroll Area</H3>
            <ScrollArea className="h-48 w-80 border-2 rounded-lg p-4">
              <Stack gap="sm">
                {Array.from({ length: 20 }, (_, i) => (
                  <P key={i}>Scrollable item {i + 1}</P>
                ))}
              </Stack>
            </ScrollArea>

            <H3>Aspect Ratio</H3>
            <div className="w-80">
              <AspectRatio ratio={16 / 9}>
                <div className="w-full h-full rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  16:9
                </div>
              </AspectRatio>
            </div>
          </Stack>
        </section>

      </Stack>
    </Center>
  )
}

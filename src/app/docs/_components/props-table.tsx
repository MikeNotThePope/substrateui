import { capsClass } from "@/components/caps"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Code } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export interface PropDef {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  props: PropDef[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="border-2 rounded-lg overflow-hidden">
      <Table>
        {/* Column headers are spec marks: they label the sheet, they aren't
            content on it. Caps keeps them subordinate to the props. */}
        <TableHeader>
          <TableRow>
            <TableHead className={cn(capsClass, "w-[25%]")}>Prop</TableHead>
            <TableHead className={cn(capsClass, "w-[20%]")}>Type</TableHead>
            <TableHead className={cn(capsClass, "w-[10%]")}>Default</TableHead>
            <TableHead className={capsClass}>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell>
                <Code className="text-sm">{prop.name}</Code>
                {prop.required && (
                  <Badge variant="destructive" className="ml-2 text-xs">required</Badge>
                )}
              </TableCell>
              <TableCell>
                <Code className="text-xs">{prop.type}</Code>
              </TableCell>
              <TableCell>
                {prop.default ? <Code className="text-xs">{prop.default}</Code> : <span className="text-muted-foreground">—</span>}
              </TableCell>
              <TableCell className="text-sm">{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

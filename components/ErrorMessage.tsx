import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { PropsWithChildren } from "react"

export function ErrorMessage({children}: PropsWithChildren) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  )
}

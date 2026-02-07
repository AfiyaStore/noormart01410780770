// /hooks/use-toast.ts
import { toast } from 'sonner'

// যদি তুমি custom hook বানাতে চাও
export const useToast = () => {
    return { toast }
}

// অথবা direct export করো
// export { toast as useToast }

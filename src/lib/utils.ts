import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function showError(error: any) {
  if (error instanceof AxiosError) {
    if (error.code === "ERR_NETWORK") {
      toast.error("Network error. Please check your connections.");
    } else {
      toast.error(
        error.response?.data?.detail || "Login failed. Please try again."
      );
    }
  } else {
    toast.error("An unexpected error occurred. Please try again.");
  }
}

import { useState, useEffect, useCallback } from "react"

type Status = "idle" | "loading" | "success" | "error"

interface UseApiOptions<T> {
  fetchFn: () => Promise<T>
  immediate?: boolean
}

interface UseApiReturn<T> {
  data: T | null
  error: string | null
  loading: boolean
  status: Status
  refetch: () => void
}

export function useApi<T>({
  fetchFn,
  immediate = true,
}: UseApiOptions<T>): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>("idle")

  const fetchData = useCallback(async () => {
    setStatus("loading")
    setError(null)
    try {
      const response = await fetchFn()
      setData(response)
      setStatus("success")
    } catch (err) {
      if (err instanceof Error) {
        setError(err?.message || "Something went wrong")
      } else {
        setError("Something went wrong")
      }
      setStatus("error")
    }
  }, [fetchFn])

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [fetchData, immediate])

  return {
    data,
    error,
    loading: status === "loading",
    status,
    refetch: fetchData,
  }
}

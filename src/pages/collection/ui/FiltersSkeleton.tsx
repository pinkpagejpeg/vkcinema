import { type FC } from "react"
import { Stack, Skeleton } from "@mui/material"

export const FiltersSkeleton: FC = () => {
  return (
    <Stack spacing={4} mt={4}>
      <Stack spacing={1}>
        <Skeleton variant="text" width={80} height={32} />
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={40} 
          sx={{ borderRadius: 1 }}
        />
      </Stack>

      <Stack spacing={2}>
        <Skeleton variant="text" width={100} height={32} />
        <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
        <Stack direction="row" justifyContent="space-between">
          <Skeleton variant="text" width={30} height={24} />
          <Skeleton variant="text" width={30} height={24} />
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Skeleton variant="text" width={80} height={32} />
        <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
        <Stack direction="row" justifyContent="space-between">
          <Skeleton variant="text" width={40} height={24} />
          <Skeleton variant="text" width={40} height={24} />
        </Stack>
      </Stack>
    </Stack>
  )
}
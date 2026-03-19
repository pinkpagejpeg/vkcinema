import { type FC } from "react"
import { Card, CardContent, Stack, Skeleton, Divider } from "@mui/material"

export const FilmCardSkeleton: FC = () => {
  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start" flexWrap="nowrap">
          <Skeleton 
            variant="rectangular" 
            width={160} 
            height={260} 
            animation="wave"
            sx={{ borderRadius: 1 }}
          />

          <Stack spacing={1} flex={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Stack spacing={0.5} flex={1}>
                <Skeleton variant="text" width="60%" height={32} animation="wave" />
                <Skeleton variant="text" width="40%" height={20} animation="wave" />
              </Stack>
              <Skeleton variant="rounded" width={45} height={24} animation="wave" />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Skeleton variant="text" width={80} height={20} animation="wave" />
              <Divider orientation="vertical" flexItem />
              <Skeleton variant="text" width={50} height={20} animation="wave" />
              <Divider orientation="vertical" flexItem />
              <Skeleton variant="text" width={120} height={20} animation="wave" />
              <Divider orientation="vertical" flexItem />
              <Skeleton variant="text" width={150} height={20} animation="wave" />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Skeleton variant="rounded" width={120} height={36} animation="wave" />
              <Skeleton variant="circular" width={40} height={40} animation="wave" />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
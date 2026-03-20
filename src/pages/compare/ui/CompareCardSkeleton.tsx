import { type FC } from "react"
import { Card, CardContent, Grid, Stack, Skeleton } from "@mui/material"

export const CompareCardSkeleton: FC = () => {
    return (
        <Grid size={6}>
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between">
                            <Skeleton variant="text" width="70%" height={32} />
                            <Skeleton variant="rectangular" width={80} height={32} />
                        </Stack>

                        <Stack spacing={1}>
                            <Skeleton variant="text" width={100} height={24} />

                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <Skeleton variant="text" width={40} height={20} />
                                </Grid>
                                <Grid size={8}>
                                    <Skeleton variant="text" width={60} height={20} />
                                </Grid>

                                <Grid size={4}>
                                    <Skeleton variant="text" width={80} height={20} />
                                </Grid>
                                <Grid size={8}>
                                    <Skeleton variant="text" width={60} height={20} />
                                </Grid>

                                <Grid size={4}>
                                    <Skeleton variant="text" width={80} height={20} />
                                </Grid>
                                <Grid size={8}>
                                    <Skeleton variant="text" width={60} height={20} />
                                </Grid>

                                <Grid size={4}>
                                    <Skeleton variant="text" width={70} height={20} />
                                </Grid>
                                <Grid size={8}>
                                    <Skeleton variant="text" width={80} height={20} />
                                </Grid>

                                <Grid size={4}>
                                    <Skeleton variant="text" width={50} height={20} />
                                </Grid>
                                <Grid size={8}>
                                    <Stack direction="row" spacing={0.5}>
                                        <Skeleton variant="rounded" width={60} height={24} />
                                        <Skeleton variant="rounded" width={70} height={24} />
                                        <Skeleton variant="rounded" width={80} height={24} />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}
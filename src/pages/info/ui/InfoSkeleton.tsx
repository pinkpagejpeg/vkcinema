import { type FC } from "react"
import { Container, Grid, Box, Stack, Skeleton } from "@mui/material"
import { Footer, Header } from "../../../shared/ui"

export const InfoSkeleton: FC = () => {
  return (
    <Container maxWidth="xl">
      <Header />

      <Grid container spacing={4}>
        <Grid size={3}>
          <Box sx={{ width: 300, height: 400, borderRadius: 1 }}>
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              animation="wave"
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Grid>

        <Grid size={9}>
          <Stack spacing={2}>
            <Grid container alignItems="flex-start">
              <Grid>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Skeleton variant="text" width={300} height={48} animation="wave" />
                  <Skeleton variant="rounded" width={50} height={24} animation="wave" />
                  <Skeleton variant="circular" width={40} height={40} animation="wave" />
                </Stack>
                <Skeleton variant="text" width={200} height={24} sx={{ mt: 1 }} animation="wave" />
              </Grid>
            </Grid>

            <Skeleton variant="text" width="75%" height={24} animation="wave" />
            <Skeleton variant="text" width="60%" height={24} animation="wave" />
            <Skeleton variant="text" width="70%" height={24} animation="wave" />

            <Stack spacing={1}>
              <Skeleton variant="text" width={120} height={32} animation="wave" />
              <Grid container spacing={4}>
                <Grid>
                  <Stack spacing={0.5}>
                    <Skeleton variant="text" width={120} height={24} animation="wave" />
                    <Skeleton variant="text" width={80} height={24} animation="wave" />
                    <Skeleton variant="text" width={60} height={24} animation="wave" />
                    <Skeleton variant="text" width={140} height={24} animation="wave" />
                    <Skeleton variant="text" width={100} height={24} animation="wave" />
                  </Stack>
                </Grid>
                <Grid>
                  <Stack spacing={0.5}>
                    <Skeleton variant="text" width={80} height={24} animation="wave" />
                    <Skeleton variant="text" width={150} height={24} animation="wave" />
                    <Skeleton variant="text" width={180} height={24} animation="wave" />
                    <Skeleton variant="text" width={40} height={24} animation="wave" />
                    <Skeleton variant="text" width={90} height={24} animation="wave" />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={1}>
              <Skeleton variant="text" width={100} height={32} animation="wave" />
              <Grid container spacing={2}>
                <Grid>
                  <Skeleton variant="text" width={80} height={24} animation="wave" />
                </Grid>
                <Grid>
                  <Skeleton variant="text" width={60} height={24} animation="wave" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid>
                  <Skeleton variant="text" width={60} height={24} animation="wave" />
                </Grid>
                <Grid>
                  <Skeleton variant="text" width={60} height={24} animation="wave" />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Footer />
    </Container>
  )
}
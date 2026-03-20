import { type FC, type ReactNode } from "react"
import { Grid, Typography } from "@mui/material"

interface CompareCardItemProps {
    label: string
    value: ReactNode
}

export const CompareCardItem: FC<CompareCardItemProps> = ({ label, value }) => {
    return (
        <>
            <Grid size={4}>
                <Typography variant="body2" color="text.secondary">
                    {label}
                </Typography>
            </Grid>
            <Grid size={8}>
                <Typography variant="body2">
                    {value}
                </Typography>
            </Grid>
        </>
    )
}
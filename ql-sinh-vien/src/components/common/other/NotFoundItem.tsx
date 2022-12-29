import { Typography } from "@mui/material"

function NotFoundItem({ label }: { label: string }) {
  return (
    <Typography variant="h6" component="h6">
      {label}
    </Typography>
  )
}

export default NotFoundItem

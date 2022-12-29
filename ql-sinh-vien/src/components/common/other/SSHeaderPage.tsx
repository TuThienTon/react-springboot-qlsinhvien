import { Button, Grid, Typography } from "@mui/material";

function SSHeaderPage({
  title,
  children,
  variant = "h5",
  component = "h5",
}: {
  title: string;
  children?: any;
  variant?: any;
  component?: any;
}) {
  return (
    <div className="my-2 ">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Typography
          variant={variant}
          component={component}
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <div>{children}</div>
      </Grid>
    </div>
  );
}

export default SSHeaderPage;

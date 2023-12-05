import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="sticky" sx={{ mb: 5, top: 0,bgcolor: '#002e5d ' }}>
      <Toolbar>
        <Typography variant="h6">Irrigation Manager</Typography>
      </Toolbar>
    </AppBar>
  );
}

import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="static" sx={{mb: 5}}>
            <Toolbar>
                <Typography variant="h6">Irrigation Manager</Typography>
            </Toolbar>
        </AppBar>
    )
}
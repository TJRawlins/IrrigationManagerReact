import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
  openModal: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, openModal: false };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true, openModal: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }

  style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  handleClose = () => this.setState({ openModal: false });

  render() {
    if (this.state.hasError) {
      // return this.props.fallback;
      return (
        // <Modal
        //   id="error-modal"
        //   open={this.state.openModal}
        //   onClose={this.handleClose}
        //   aria-labelledby="modal-modal-title"
        //   aria-describedby="modal-modal-description"
        // >
        <Box sx={this.style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Server Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {this.props.fallback}
          </Typography>
          {/* <Button onClick={this.handleClose}>Dismiss</Button> */}
        </Box>
        // </Modal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

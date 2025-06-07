# <img src="https://github.com/TJRawlins/IrrigationManagerReact/blob/main/src/assets/irrigation%20logo%20icon.png?raw=true" width="45px" style="transform: translateY(10px);"> Droplet Frontend - Irrigation & Plant Management Application

A modern React-based web application for managing irrigation systems, tracking water usage, and organizing plant care schedules with an intuitive user interface.


## 📷 Screenshots
![Screenshot 2025-06-07 135603](https://github.com/user-attachments/assets/e29a866f-8d99-43c1-bc54-1f6d74d1f09e)

![image](https://github.com/user-attachments/assets/89eb9b77-54f9-4ccc-b953-c5bb2181092e)

![Screenshot 2025-06-07 135746](https://github.com/user-attachments/assets/adac4aa1-574f-4241-ac3d-ecca42a3438a)

![Screenshot 2025-06-07 135836](https://github.com/user-attachments/assets/53a4240a-8ba4-4ae4-b95b-21bc654bdd39)

## 🚀 Features

- **Interactive Dashboard**: Comprehensive overview of seasons, zones, and plants
- **Advanced Data Grid**: Sorting, filtering, column management, and export functionality
- **Water Usage Visualization**: Track consumption by week, month, and year
- **Image Management**: Upload and manage photos for zones and plants
- **Responsive Design**: Material-UI components with mobile-friendly interface
- **Form Validation**: Robust form handling with Formik and Yup
- **State Management**: Efficient Redux store for application state
- **Real-time Updates**: Live data synchronization with backend API

## 🛠️ Technology Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Forms**: Formik + Yup validation
- **HTTP Client**: Axios
- **Image Storage**: Firebase Storage
- **Secrets Management**: Infisical

### Main Dependencies
- React 18
- Material-UI
- Redux Toolkit
- Firebase
- Axios
- Formik & Yup
- React Router DOM
- Styled Components

### Development Dependencies
- TypeScript
- Vite
- ESLint
- Node Types
- Various TypeScript type definitions

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser
- Backend API running (see backend repository)
- Firebase project setup
- Infisical account for secrets management

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/TJRawlins/IrrigationManagerReact.git
cd IrrigationManagerReact
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
- Node.js and npm required
- Built with Vite + React + TypeScript
- HTTPS enabled development server with SSL certificates
- Environment variables required:
```bash
# Create .env file
cp .env.example .env

# Configure your variables
VITE_DEV_SECURE_URL = https://localhost
VITE_DEV_URL = http://localhost
VITE_REACT_DEV_PORT = 3000
VITE_BACKEND_API_DEV_PORT = 5555
```

### 4. Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init storage
```

### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── App/                    # Core application setup
│   ├── api/               # API configuration and axios setup
│   ├── context/           # React context providers
│   ├── firebase/          # Firebase configuration
│   └── Layout/            # Main layout components
├── Components/            # Reusable components
│   ├── dashboard/         # Dashboard related components
│   ├── plants/           # Plant management components
│   ├── users/            # User management components
│   └── zones/            # Zone management components
├── models/               # TypeScript interfaces and types
├── pages/               # Main page components
├── redux/               # Redux store and slices
├── styles/             # CSS and styling
└── theme/              # Material-UI theme configuration
```

## 🎨 Key Components

- **Layout**: App.tsx, Navbar, and Sidebar for main application structure
- **Dashboard**: Data visualization with MUI Charts
- **Plants**: Plant management with CRUD operations
- **Zones**: Irrigation zone management
- **Users**: User management interface

## 🔌 API Integration

- Axios-based API client with centralized error handling
- RESTful endpoints for:
  - Users management
  - Plants CRUD operations
  - Zones management
  - Seasons management
- Secure HTTPS communication

### Axios Configuration
```typescript
// api/agent.ts
import axios, { AxiosError, AxiosResponse } from "axios";

// Add error handing logic (errorHandler)

axios.defaults.baseURL = `${import.meta.env.VITE_DEV_SECURE_URL}:${
  import.meta.env.VITE_BACKEND_API_DEV_PORT
}/`;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(responseBody)
      .catch((error) => errorHandler(error)),
  post: (url: string, body: object) =>
    axios
      .post(url, body)
      .then(responseBody)
      .catch((error) => errorHandler(error)),
  put: (url: string, body: object) =>
    axios
      .put(url, body)
      .then(responseBody)
      .catch((error) => errorHandler(error)),
  delete: (url: string) =>
    axios
      .delete(url)
      .then(responseBody)
      .catch((error) => errorHandler(error)),
};

const Seasons = {
  list: () => requests.get("api/seasons"),
  details: (id: number) => requests.get(`api/seasons/${id}`),
  createZone: (season: object) => requests.post("api/seasons", season),
  editZone: (id: number, season: object) =>
    requests.put(`api/seasons/${id}`, season),
  removeZone: (id: number) => requests.delete(`api/seasons/${id}`),
};

const agent = {
  Seasons,
};

export default agent;
```

### Redux Store Setup
```typescript
// redux/seasonSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Season } from "../App/models/Season";

export interface SeasonState {
  season: Season;
  seasonList: Season[];
  seasonName: string;
}

const season =
  localStorage.getItem("season") &&
  localStorage.getItem("season") !== "undefined"
    ? JSON.parse(localStorage.getItem("season")!)
    : {};
const seasons =
  localStorage.getItem("seasons") &&
  localStorage.getItem("seasons") !== "undefined"
    ? JSON.parse(localStorage.getItem("seasons")!)
    : [];
const seasonName =
  localStorage.getItem("seasonName") &&
  localStorage.getItem("seasonName") !== "undefined"
    ? JSON.parse(localStorage.getItem("seasonName")!)
    : "Select Season";

const initialState: SeasonState = {
  season: season,
  seasonList: seasons,
  seasonName: seasonName,
};

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  // Reducers
  reducers: {
    updateCurrentSeasonName: (state, action: PayloadAction<string>) => {
      state.seasonName = action.payload;
      localStorage.setItem("seasonName", JSON.stringify(action.payload));
    },
    updateCurrentSeason: (state, action: PayloadAction<Season>) => {
      state.season = action.payload;
      localStorage.setItem("season", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentSeasonName,
  updateCurrentSeason,
} = seasonSlice.actions;

export default seasonSlice.reducer;

```

## 🎯 Core Features Implementation

- Form validation using Formik and Yup
- Redux state management with Redux Toolkit
- Firebase integration
- Error boundary implementation
- Type-safe development with TypeScript

### Form Validation
```typescript
// Yup schema for plant validation
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    type: Yup.string().required("Required field"),
    quantity: Yup.number().required("Required field"),
    galsPerWk: Yup.number().required("Required field"),
    emittersPerPlant: Yup.number().required("Required field"),
    emitterGPH: Yup.number().required("Required field"),
  });
```

## 🎨 UI/UX Features

- Material-UI (MUI) components
- Responsive design
- Custom theming
- Font Awesome icons integration
- Loading skeletons for better UX
- Chart visualizations
- Light / Dark mode

### Material-UI Theme
```typescript
// theme/theme.ts
import { createContext, useState, useMemo } from "react";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

export const tokens = (mode: string) => ({
  ...(mode === "light"
    ? {
        navBar: {
          background: #eef2f6,
          color: "#eef2f6",
        },
    : {
        navBar: {
          background: #555555,
          color: "#555555",
        },
      }),
});

const toggleColorMode: () => void = () => {};

export const ColorModeContext = createContext({
  toggleColorMode,
});

export const useMode = () => {
  const [mode, setMode] = useState<string>("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme: Theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode] as const;
};

// theme/NavBarTheme.ts
import { useTheme } from "@mui/material";
import { tokens } from "./theme";

export interface NavBarTheme {
  mainBar: {
    backgroundColor: string;
    borderBottom: string;
    color: string;
  };
}

export const useNavBarColorTheme = (): NavBarTheme => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    mainBar: {
      backgroundColor: colors.navBar.background
      color: colors.navBar.color,
    },
  };
};

// Layout/NavBar.ts
import { ColorModeContext } from "../../theme/theme";
import { useNavBarColorTheme } from "../../theme/NavBarTheme";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar sx={navBarColorTheme.mainBar}>
        <IconButton onClick={colorMode.toggleColorMode} >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
       </IconButton>
    </AppBar>
 );
}
```

## 📊 Data Management

- Redux Toolkit for state management
- Separate slices for plants, seasons, and zones
- Typed actions and reducers
- Async thunks for API calls

### Plant Data Grid Features
- **Column Management**: Show/hide columns dynamically
- **Filtering**: Multi-column filtering with various operators
- **Sorting**: Multi-column sorting capabilities
- **Density**: Compact, standard, and comfortable views
- **Export**: Excel and PDF export functionality
- **Pagination**: Efficient handling of large datasets

## 🔧 Scripts

```bash
npm start        # Start development server
npm run dev      # Alternative development server start
npm run server   # Start the proxy server with nodemon
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
```bash
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### Docker Deployment
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔒 Security Considerations

- Environment variables for sensitive data
- API request authentication
- Input validation and sanitization
- XSS protection with proper escaping
- HTTPS enforcement in production
- HTTPS enabled development server
- SSL certificates required in `/ssl` directory
- Firebase authentication integration
- Secure API communication

## 📱 Mobile Responsiveness

- Responsive grid layouts
- Touch-friendly interactions
- Optimized image loading
- Mobile-first design approach
- Gesture support for data tables

## 🐛 Common Issues & Solutions

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Check types without building
npm run type-check
```

**Performance Issues**
- Implement React.memo for expensive components
- Use useCallback for event handlers
- Implement virtual scrolling for large datasets

## 🔮 Upcoming Features

- **Dark/Light Theme Toggle**: User preference system
- **Advanced Analytics Dashboard**: Charts and graphs
- **Offline Support**: PWA capabilities
- **Mobile App**: React Native version
- **Real-time Notifications**: WebSocket integration
- **Multi-language Support**: i18n implementation

## 📝 Development Notes

**Started**: November 28, 2023

**Key Design Decisions**:
- Vite for faster development builds
- TypeScript for type safety and better DX
- Material-UI for consistent design system
- Redux Toolkit for predictable state management
- Formik + Yup for robust form handling

---

For backend API documentation, see the [Backend Repository](link-to-backend-repo).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards (ESLint + Prettier)
4. Write tests for new features
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📞 Support

For issues and questions, please create an issue in this repository or contact the development team.

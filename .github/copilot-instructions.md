---
applyTo: "**/*.{ts,tsx,js,jsx,css}"
---

# Irrigation Management App - Copilot Instructions

## Architecture Overview

This is a **React + TypeScript** irrigation management application using:

- **Material-UI (MUI)** for UI components and theming
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Formik + Yup** for form handling and validation
- **Firebase Storage** for image management
- **Axios** for API communication
- **Vite** as the build tool

## Code Organization Patterns

### File Structure Convention

```
src/
├── App/                    # Core application logic
│   ├── api/               # API layer (agent.ts, error handlers)
│   ├── context/           # React contexts
│   ├── firebase/          # Firebase configuration
│   ├── Layout/            # Layout components (App.tsx, Navbar, etc.)
│   └── models/            # TypeScript domain models
├── Components/            # Reusable UI components (PascalCase folders)
│   ├── common/           # Shared components
│   ├── plants/           # Plant-specific components
│   ├── zones/            # Zone-specific components
│   └── [feature]/        # Feature-specific groupings
├── pages/                # Page-level components
├── redux/                # Redux slices and store
├── routes/               # Routing configuration
├── hooks/                # Custom React hooks
├── constants/            # Application constants
├── theme/                # MUI theme configuration
├── styles/               # CSS files (organized by feature)
└── utils/                # Utility functions
```

### Component Naming & Export Patterns

- **Default exports**: Use for main components (`export default function ComponentName`)
- **File names**: Match component name exactly (e.g., `PlantGrid.tsx` exports `PlantGrid`)
- **Folder organization**: Group related components in feature folders
- **Index files**: Use sparingly, prefer explicit imports

## Material-UI (MUI) Standards

### Component Usage

- **Prefer MUI components** over custom HTML elements
- **Use MUI's `styled()` API** for custom styling instead of CSS classes when possible
- **Follow MUI CSS class naming**: Use `.MuiComponentName-modifier` for targeting specific component parts
- **DataGrid styling**: Always use proper MUI class selectors (`.MuiDataGrid-root`, `.MuiButtonGroup-grouped`)

### Theming Patterns

```typescript
// Theme usage pattern
const theme = useTheme();
const colors = tokens(theme.palette.mode);

// Color theme functions for components
const componentColorTheme = () => ({
  componentProperty: {
    backgroundColor: colors.category.variant,
  },
});
```

### Responsive Design

```typescript
// Media query pattern
const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
```

## Redux State Management

### Store Structure

```typescript
// Central store with feature-based slices
store: {
  season: SeasonState,
  zone: ZoneState,
  plant: PlantState,
  // Lists stored separately from single items
  seasonList: Season[],
  zoneList: Zone[],
  plantList: Plant[]
}
```

### Redux Patterns

- **Use Redux Toolkit** exclusively (`createSlice`, `configureStore`)
- **Separate single items from lists** in state (e.g., `plant` vs `plantList`)
- **Dispatch updates after API calls** to keep local state in sync
- **Use selectors** with `useSelector((state: RootState) => state.feature)`

### State Update Pattern

```typescript
// Standard pattern for data operations
await agent.Entity.operation(data)
  .then((result) => dispatch(updateCurrentEntity(result)))
  .then(() => fetchEntities(parentId))
  .catch((error) => alert(error));
```

## API Layer (agent.ts)

### API Organization

```typescript
// Agent pattern for API calls
const agent = {
  Entity: {
    list: () => requests.get<Entity[]>("entity"),
    details: (id: number) => requests.get<Entity>(`entity/${id}`),
    create: (entity: Entity) => requests.post<void>("entity", entity),
    update: (entity: Entity) =>
      requests.put<void>(`entity/${entity.id}`, entity),
    delete: (id: number) => requests.del<void>(`entity/${id}`),
  },
};
```

### Error Handling

- **Always include error handling** in API calls using `.catch()`
- **Use console logging** for debugging with color coding: `console.log("%cMessage", "color:#1CA1E6")`
- **Alert users** for critical errors that need immediate attention

## Form Handling with Formik

### Standard Form Pattern

```typescript
// Formik + Yup validation pattern
const initialValues = {
  /* field defaults */
};
const validationSchema = Yup.object().shape({
  /* validation rules */
});

const onSubmit = async (values: any) => {
  setIsLoading(true);
  try {
    await agent.Entity.create(values);
    await updateLocalStorage();
    handleClose();
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

### Form Field Patterns

- **Use Field component** from Formik as wrapper for MUI TextField
- **Include error handling**: `error={touched.field && Boolean(errors.field)}`
- **Add FormHelperText** for validation feedback
- **Use Tooltip** for user guidance

## Component Communication Patterns

### Props Interface Conventions

```typescript
// Standard props naming for CRUD operations
interface ComponentProps {
  fetchEntities: (parentId: number) => Promise<void>;
  setIsShowModal: (show: boolean) => void;
  isShowModal: boolean;
  // For theme consistency
  modalColorTheme?: ModalTheme;
}
```

### Local Storage Sync Pattern

```typescript
// Update local storage after operations
const updateLocalStorageEntity = async (entityId: number) => {
  await agent.Entity.details(entityId).then((entity) =>
    dispatch(updateCurrentEntity(entity))
  );
};
```

## Custom Hooks

### Plant Actions Hook Pattern

```typescript
// Encapsulate related operations in custom hooks
const usePlantActions = ({
  fetchPlants,
  updateLocalStorageZone,
  zoneId,
}: UsePlantActionsProps) => ({
  handleView: (plantId: number, setShowView: (show: boolean) => void) => {
    /* */
  },
  handleEdit: (plantId: number, setShowEdit: (show: boolean) => void) => {
    /* */
  },
  handleCopy: (plantId: number) => Promise<void>,
  handleDelete: (plantId: number) => Promise<void>,
  loadingStates: {
    /* loading state object */
  },
});
```

## Firebase Integration

### Image Upload Pattern

```typescript
// Standard Firebase image handling
const storage: FirebaseStorage = getStorage(app);
const imageRef: StorageReference = ref(storage, `path/${filename}`);

// Upload with compression
const uploadImage = async (file: File) => {
  const compressedFile = await compress(file);
  const snapshot = await uploadBytes(imageRef, compressedFile);
  return await getDownloadURL(snapshot.ref);
};
```

### Image Cleanup

- **Check if image is being used** by other entities before deletion
- **Use ref patterns** to track usage: `isImageBeingUsedRef.current`

## CSS and Styling

### CSS Organization

- **Feature-based CSS files** in `src/styles/[feature]/`
- **Base styles** in `src/styles/baseStyles/`
- **Component-specific CSS** co-located with components when needed

### Styling Priorities

1. **MUI's styled() API** for component-specific styles
2. **MUI theme integration** for consistent design system
3. **CSS classes** for complex layouts or animations
4. **Inline styles** only for dynamic values

## Data Grid Patterns

### MUI DataGrid Configuration

```typescript
// Standard DataGrid setup
const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200, minWidth: 150 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    renderCell: ActionsComponent,
  },
];

// Enable features
<DataGrid
  columns={columns}
  rows={rows}
  loading={isLoading}
  checkboxSelection
  disableRowSelectionOnClick
  pageSizeOptions={GRID_CONFIG.PAGE_SIZE_OPTIONS}
  paginationMode="client"
/>;
```

### Action Button Patterns

```typescript
// Button group for row actions
<ActionButtonGroup>
  <Tooltip title="View" arrow>
    <ActionButton onClick={handleView}>
      <FaRegEye />
    </ActionButton>
  </Tooltip>
  {/* Additional action buttons */}
</ActionButtonGroup>
```

## Performance Considerations

### Loading States

- **Component-level loading states** for better UX
- **Skeleton loaders** for complex components
- **useRef for flags** to prevent unnecessary re-renders

### State Management

- **Minimize re-renders** by structuring state properly
- **Use useCallback/useMemo** for expensive operations
- **Batch API calls** when possible

## Error Handling & Debugging

### Console Logging

```typescript
// Color-coded console messages for debugging
console.log("%cSuccess: Data loaded", "color:#28a745");
console.log("%cWarning: Validation failed", "color:#ffc107");
console.log("%cError: API call failed", "color:#dc3545");
console.log("%cInfo: Component mounted", "color:#1CA1E6");
```

### Error Boundaries

- **Wrap page components** in ErrorBoundary components
- **Graceful degradation** for non-critical failures

## TypeScript Conventions

### Type Safety

- **Define interfaces** for all component props and API responses
- **Use proper typing** for event handlers and async functions
- **Avoid `any` type** - use specific types or generics
- **Export types/interfaces** when used across multiple files

### Model Classes

```typescript
// Domain models with default values
export class Plant {
  id: number = 0;
  name: string = "";
  // ... other properties with defaults
}
```

## Constants and Configuration

### Application Constants

- **Centralize configuration** in `src/constants/`
- **Use ALL_CAPS** for constant names
- **Group related constants** in objects (e.g., `PLANT_GRID_CONFIG`)

## Testing Considerations

### Component Structure for Testing

- **Use data attributes** for test targeting
- **Avoid testing implementation details**
- **Focus on user interactions** and component outputs

## Security & Best Practices

### Environment Variables

- **Use Vite environment variables** (`import.meta.env.VITE_*`)
- **Never expose sensitive data** in client-side code
- **Validate all user inputs** with Yup schemas

### Firebase Security

- **Implement proper storage rules**
- **Validate file types and sizes** before upload
- **Clean up unused images** to manage storage costs

---

**Remember**: Always prioritize maintainability, type safety, and user experience. Follow these patterns consistently across the codebase for better collaboration and maintenance.

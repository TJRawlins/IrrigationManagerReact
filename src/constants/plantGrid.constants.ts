export const PLANT_GRID_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25],
  COLUMN_WIDTHS: {
    ID: 90,
    ACTION: 155,
    MODIFIED: 175,
    NOTES_MIN: 150,
    NAME_MIN: 150,
    NAME_MAX: 200,
  },
  INITIAL_COLUMN_VISIBILITY: {
    id: false,
    imagePath: true,
    timeStamp: false,
    age: false,
    hardinessZone: false,
    exposure: false,
    harvestMonth: false,
  },
  VIRTUALIZATION: {
    // Buffer of rows to render outside visible area for smooth scrolling
    OVERSCAN: 5,
    // Row height for consistent rendering (matches our minHeight settings)
    ROW_HEIGHT: 52,
    ROW_HEIGHT_COMPACT: 42,
    ROW_HEIGHT_COMFORTABLE: 56,
    // Enable virtualization when row count exceeds this threshold
    ENABLE_THRESHOLD: 50,
  },
};

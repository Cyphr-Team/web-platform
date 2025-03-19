import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    columnViewName?: string
    /**
     * The ID of the filter button element, allowing us to find, focus, and click it.
     * @see src/components/ui/multi-select-round.tsx
     * @see src/modules/loan-application-management/components/table/applications-scores/workspace-admin-application-score-columns.tsx
     * @see src/shared/molecules/table/column-filter.tsx
     */
    filterID?: string
  }
}

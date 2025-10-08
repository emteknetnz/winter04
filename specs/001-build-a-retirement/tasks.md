# Tasks: Retirement Calculator Application

**Feature Name**: Retirement Calculator Application  
**Branch**: `001-build-a-retirement`  
**Date**: 8 October 2025

---

## Task List




### T007: Remove Inflation from Inputs, Calculations, and Outputs [X]

- **Description**: Eliminate all references to inflation from the retirement calculator, including input fields, calculation logic, and displayed results.
- **Steps**:
  1. Identify and remove any inflation-related input fields from the UI.
  2. Update calculation logic to exclude inflation adjustments.
  3. Remove inflation references from output displays, charts, and tables.
  4. Refactor documentation and help text to reflect the absence of inflation.
  5. Test the application to ensure calculations and projections are correct without inflation.
- **Output**: Inflation removed from all inputs, calculations, and outputs; application reflects the change.

### T008: Remove Starting Balance Column and Rename Ending Balance [X]

- **Description**: Update the retirement calculator's output tables by removing the "Starting Balance" column. Move the "Ending Balance" column to the position previously occupied by "Starting Balance" and rename it to "Balance".
- **Steps**:
  1. Locate all output tables displaying "Starting Balance" and "Ending Balance".
  2. Remove the "Starting Balance" column from these tables.
  3. Move the "Ending Balance" column to the first position in the table.
  4. Rename the "Ending Balance" column to "Balance".
  5. Update any related documentation, help text, and UI labels to reflect the change.
  6. Test the application to ensure tables display correctly and calculations remain accurate.
- **Output**: Output tables show only the "Balance" column in the first position; documentation and UI updated accordingly.

### T009: Add 5px Padding to Tables and Input Fields [X]

- **Description**: Ensure that all tables and input fields in the retirement calculator application have at least 5px padding for improved readability and user experience.
- **Steps**:
  1. Update CSS styles for table cells (`td`, `th`) to include 5px padding.
  2. Update CSS styles for input fields to include 5px padding inside the fields and 5px spacing between adjacent inputs.
  3. Review all relevant UI components to confirm consistent padding.
  4. Test the application to verify visual improvements and usability.
- **Output**: Tables and input fields display with at least 5px padding; UI is visually consistent and user-friendly.

### T010: Run Prettier and Check Formatting of All Files

- **Description**: Ensure code quality and consistency by running Prettier on all project files and verifying that formatting adheres to established standards.
- **Steps**:
  1. Install Prettier if not already present in the project.
  2. Run Prettier across all source files and documentation.
  3. Review changes for any formatting issues or inconsistencies.
  4. Commit formatted files to the repository.
  5. Update documentation to note formatting standards and Prettier usage.
- **Output**: All files are consistently formatted according to Prettier rules; documentation updated.

### T011: Audit and Clean Up `src` Directory

- **Description**: Review the `src` directory for empty folders, duplicate code, and other opportunities to improve organization and maintainability.
- **Steps**:
  1. Identify and list any empty directories within `src`.
  2. Locate duplicate or redundant code blocks, components, or utilities.
  3. Document areas where code can be refactored or consolidated.
  4. Suggest removal or restructuring of unnecessary files or folders.
  5. Prepare a summary report of findings and recommended actions.
- **Output**: Audit report detailing empty directories, code duplication, and clean-up opportunities in `src`.
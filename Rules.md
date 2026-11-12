# Dashboard Development Guidelines

## 1. Before Making Changes
- Do not break or change existing business logic, API integrations, or workflows.
- Reuse existing components wherever possible.
- Ensure components are scalable for future requirements.

## 2. UI/UX Standards
- Follow the approved dashboard design and Ant Design components.
- Keep the UI clean, consistent, responsive, and user-friendly.
- Support both light and dark themes.
- Understand the existing code and functionality before modifying anything.

## 3. Coding Standards
- Use reusable, modular, and isolated components.
- Follow consistent naming conventions and folder structures.
- Avoid duplicate code and unnecessary complexity.
- Keep components simple and easy for other developers to understand.
- Handle loading, empty, and error states properly.

## 4. Packages & Dependencies
- Do not install new packages without team approval.
- First check whether existing dependencies can solve the requirement.

## 5. Before Pushing Code
- Test the changes locally.
- Ensure existing functionality is not affected.
- Fix console errors, warnings, and build issues.
- Keep code clean and remove unused imports and variables.

**Golden Rule:** Never compromise existing functionality for UI improvements. Build everything with scalability, maintainability, and consistency in mind.
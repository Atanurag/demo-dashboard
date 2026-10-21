# GoGas Control Center — React + Vite + Ant Design

A simple starter focused on the left navigation panel shown in the reference:
- Dark GoGas brand header and collapsible sidebar
- Global menu search
- Expandable navigation sections
- A second search field inside the expanded section
- Matching text highlight
- Data-driven menu structure so new device types/reports can be added in one place
- Ant Design inputs, buttons, tooltips, icons, and CSS styling

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Build check

```bash
npm run build
```

## Where to edit the menu

Open `src/App.jsx` and update the `groups` array near the top. Each item can have a `key`, `label`, `icon`, and `children`.

The dashboard body is intentionally a lightweight placeholder. The left panel is the first component to refine before adding the full organization dashboard.


# React Engine

A lightweight, web-based game engine UI built with React, TypeScript, and Tailwind CSS, inspired by industry-standard editors like Unity and Tiled.

## Description

React Engine provides a modern and intuitive interface for 2D game development, focusing on tilemap creation. It features a themeable, component-based architecture that is easy to extend. The main goal of this project is to demonstrate how modern web technologies can be used to create complex, desktop-like application experiences in the browser.

## Features

- **2D/3D View Modes**: Toggle between a 2D tilemap editor and a 3D scene view placeholder.
- **Tilemap Editor**:
    - Pan and zoom controls for easy navigation.
    - Grid-based layout for precise tile placement.
    - Brush and Eraser tools.
- **Asset Management**:
    - **Color Palette**: Select from a default palette or use custom colors to paint tiles.
    - **Custom Tilesets**: Import your own tileset images (PNG, JPG, etc.) directly from your computer.
    - **Asset Browser**: View and manage imported tilesets in the bottom panel.
- **Modern UI/UX**:
    - **Theming**: Switch between light and dark modes.
    - **Responsive Layout**: The UI is designed to be flexible and organized, with collapsible panels.
    - **Iconography**: Clean and clear icons for tools and file types.
- **File Explorer**: A familiar project hierarchy view for scenes, assets, and scripts.

## How to Use

1.  **Select a Tool**: Choose the Brush or Eraser from the Inspector panel on the right.
2.  **Choose a "Color"**:
    - Click a color from the **Color Palette** to paint with solid colors.
    - Import a tileset using the **Import Tileset** button in the bottom panel. The tileset will appear in the Inspector. Click on a tile to select it.
3.  **Paint on the Canvas**: Click and drag on the main tilemap canvas in the center to draw.
4.  **Navigate**:
    - Use the **mouse wheel** to zoom in and out.
    - **Middle-click and drag** to pan across the canvas.

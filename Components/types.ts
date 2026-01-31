
export type Theme = 'light' | 'dark';

export type ViewMode = '2D' | '3D';

export type Tool = 'brush' | 'eraser';

export type ColorTile = {
    type: 'color';
    value: string;
};

export type ImageTile = {
    type: 'tile';
    tilesetId: number;
    tileX: number;
    tileY: number;
};

export type Tile = ColorTile | ImageTile;

export interface Tileset {
    id: number;
    name: string;
    src: string;
    tileWidth: number;
    tileHeight: number;
    imageWidth: number;
    imageHeight: number;
}

export interface SelectedTile {
    tilesetId: number;
    tileX: number;
    tileY: number;
}

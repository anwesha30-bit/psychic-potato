
import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { Tile, Tileset } from '../../types';
import { GRID_WIDTH, GRID_HEIGHT, TILE_SIZE } from '../../constants';

interface TilemapEditorProps {
    gridData: Array<Tile | null>;
    tilesets: Tileset[];
    onCellPaint: (index: number) => void;
}

const TilemapEditor: React.FC<TilemapEditorProps> = ({ gridData, tilesets, onCellPaint }) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isPanning, setIsPanning] = useState(false);
    const [view, setView] = useState({ x: 0, y: 0, zoom: 1 });
    const editorRef = useRef<HTMLDivElement>(null);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const tilesetMap = React.useMemo(() => {
        return new Map(tilesets.map(ts => [ts.id, ts]));
    }, [tilesets]);

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (e.button === 1) { // Middle mouse button for panning
            setIsPanning(true);
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        } else if (e.button === 0) {
            setIsMouseDown(true);
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / (TILE_SIZE * view.zoom));
            const y = Math.floor((e.clientY - rect.top) / (TILE_SIZE * view.zoom));
            const index = y * GRID_WIDTH + x;
            if (index >= 0 && index < GRID_WIDTH * GRID_HEIGHT) {
                onCellPaint(index);
            }
        }
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isPanning) {
            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;
            setView(v => ({ ...v, x: v.x + dx, y: v.y + dy }));
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        } else if (isMouseDown) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / (TILE_SIZE * view.zoom));
            const y = Math.floor((e.clientY - rect.top) / (TILE_SIZE * view.zoom));
            const index = y * GRID_WIDTH + x;
            if (index >= 0 && index < GRID_WIDTH * GRID_HEIGHT) {
                onCellPaint(index);
            }
        }
    };
    
    const handleMouseUp = () => {
        setIsMouseDown(false);
        setIsPanning(false);
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const zoomFactor = 1.1;
        const newZoom = e.deltaY < 0 ? view.zoom * zoomFactor : view.zoom / zoomFactor;
        setView(v => ({ ...v, zoom: Math.max(0.1, Math.min(5, newZoom)) }));
    };

    useEffect(() => {
        const editorElement = editorRef.current;
        const handleMouseLeave = () => {
            setIsMouseDown(false);
            setIsPanning(false);
        };
        editorElement?.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            editorElement?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const gridCells = React.useMemo(() => {
        return gridData.map((cell, index) => {
            let style: React.CSSProperties = {};
            if (cell?.type === 'color') {
                style.backgroundColor = cell.value;
            } else if (cell?.type === 'tile') {
                const tileset = tilesetMap.get(cell.tilesetId);
                if (tileset) {
                    style.backgroundImage = `url(${tileset.src})`;
                    style.backgroundPosition = `-${cell.tileX * tileset.tileWidth}px -${cell.tileY * tileset.tileHeight}px`;
                }
            }

            return (
                <div
                    key={index}
                    className="border-r border-b border-gray-500/20"
                    style={style}
                />
            );
        });
    }, [gridData, tilesetMap]);


    return (
        <div 
            ref={editorRef}
            className="w-full h-full overflow-hidden cursor-crosshair"
            onWheel={handleWheel}
            style={{ cursor: isPanning ? 'grabbing' : 'crosshair' }}
        >
            <div
                className="grid bg-gray-400 dark:bg-gray-800"
                style={{
                    width: `${GRID_WIDTH * TILE_SIZE}px`,
                    height: `${GRID_HEIGHT * TILE_SIZE}px`,
                    gridTemplateColumns: `repeat(${GRID_WIDTH}, ${TILE_SIZE}px)`,
                    gridTemplateRows: `repeat(${GRID_HEIGHT}, ${TILE_SIZE}px)`,
                    transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`,
                    transformOrigin: 'top left',
                    backgroundImage: 'linear-gradient(rgba(128,128,128,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.1) 1px, transparent 1px)',
                    backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {gridCells}
            </div>
        </div>
    );
};

export default TilemapEditor;

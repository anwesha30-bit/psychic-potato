
import React from 'react';
import { FolderIcon, FileIcon, PlusIcon } from './icons/EditorIcons';

const FileItem: React.FC<{ icon: React.ReactNode; name: string; level?: number }> = ({ icon, name, level = 0 }) => (
    <div className="flex items-center space-x-2 px-2 py-1 hover:bg-blue-500 hover:bg-opacity-20 rounded-sm cursor-pointer" style={{ paddingLeft: `${level * 1 + 0.5}rem` }}>
        {icon}
        <span className="text-sm truncate">{name}</span>
    </div>
);

const LeftPanel: React.FC = () => {
    return (
        <aside className="w-64 flex-shrink-0 bg-gray-200 dark:bg-gray-900 p-2 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider">Project</h2>
                <button className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700">
                    <PlusIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="space-y-1">
                <FileItem icon={<FolderIcon className="w-4 h-4 text-yellow-500" />} name="Scenes" />
                <FileItem icon={<FileIcon className="w-4 h-4 text-blue-400" />} name="MainScene" level={1} />
                <FileItem icon={<FolderIcon className="w-4 h-4 text-yellow-500" />} name="Scripts" />
                <FileItem icon={<FileIcon className="w-4 h-4 text-green-400" />} name="PlayerController.ts" level={1} />
                <FileItem icon={<FileIcon className="w-4 h-4 text-green-400" />} name="EnemyAI.ts" level={1} />
                <FileItem icon={<FolderIcon className="w-4 h-4 text-yellow-500" />} name="Assets" />
                <FileItem icon={<FolderIcon className="w-4 h-4 text-yellow-500" />} name="Sprites" level={1} />
                <FileItem icon={<FolderIcon className="w-4 h-4 text-yellow-500" />} name="Prefabs" level={1} />
                <FileItem icon={<FileIcon className="w-4 h-4 text-gray-400" />} name="config.json" />
            </div>
        </aside>
    );
};

export default LeftPanel;

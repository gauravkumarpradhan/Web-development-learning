import { useState } from "react";
import { fileStructure } from "./store";
import "./style.css";
/*
Nested file folder strcutre
add or remove file/ folder
edit name of a file/folder
delete a file/folder
 */

function FileExplorer() {
    const [explorerInfo, setExplorerInfo] = useState(fileStructure);
    const [openedFiles, setOpenedFiles] = useState({});

    const AssetItem = ({
        entity,
        index,
        context,
        onClick,
        addNewEntity,
        onBlur,
        handleNewEntityNameChange,
        handleNewEntityOnFocus,
        handleDeleteEntity,
        handleEditEntityName,
        changeName,
        editEntity,
    }) => {
        return (
            <div className="entity-item-wrapper">
                <div
                    key={`${entity.name}.${index}`}
                    className={`${entity.type === "folder" ? "entity-folder" : ""
                        } entity`}
                    onClick={!editEntity.mode ? onClick : () => { }}
                >
                    <div>
                        {entity.type === "file" ? "📄" : "📁"}{" "}
                        {editEntity?.mode ? (
                            <input
                                value={editEntity?.name}
                                onChange={(e) => changeName(e.target.value)}
                                onKeyDown={(e) =>
                                    handleEditEntityName(e, e.target.value)
                                }
                            />
                        ) : entity?.name ? (
                            entity.name
                        ) : (
                            ""
                        )}
                    </div>

                    {context === "new" ? (
                        <input
                            onFocus={() => { }}
                            onBlur={() => {
                                onBlur();
                            }}
                            onChange={handleNewEntityNameChange}
                            onKeyDown={handleNewEntityOnFocus}
                        />
                    ) : null}
                </div>

                {context !== "new" ? (
                    <>
                        <div
                            className="add-folder"
                            onClick={(e) => {
                                changeName();
                                e.stopPropagation();
                            }}
                        >
                            🖊️{" "}
                            {`Edit ${entity?.type === "folder" ? "Folder" : "File"
                                }`}
                        </div>

                        <div
                            className="add-folder"
                            onClick={(e) => {
                                handleDeleteEntity(entity);
                                e.stopPropagation();
                            }}
                        >
                            ➖ {entity?.type === "folder" ? "Folder" : "File"}
                        </div>

                        {entity.type === "folder" ? (
                            <>
                                <div
                                    className="add-folder"
                                    onClick={(e) => {
                                        addNewEntity("folder");
                                        e.stopPropagation();
                                    }}
                                >
                                    ➕ Folder
                                </div>
                                <div
                                    className="add-folder"
                                    onClick={(e) => {
                                        addNewEntity("file");
                                        e.stopPropagation();
                                    }}
                                >
                                    ➕ File
                                </div>
                            </>
                        ) : null}
                    </>
                ) : null}
            </div>
        );
    };

    const AssetExplorerNode = ({ asset, index }) => {
        const [addEntity, setNewAddEntity] = useState({
            name: "",
            show: false,
            type: "",
        });

        const [editEntity, setEditEntity] = useState({
            mode: false,
            name: asset?.name
        });

        if (asset.type === "file") {
            return (
                <AssetItem
                    entity={asset}
                    index={index}
                    handleDeleteEntity={handleDeleteEntity}
                    changeName={changeName}
                    editEntity={editEntity}
                    handleEditEntityName={handleEditEntityName}
                />
            );
        }

        function addNewEntity(type) {
            setNewAddEntity((entity) => ({ ...entity, show: true, type }));
        }

        function changeName(name, mode) {
            setEditEntity((data) => ({ name: name ?? asset?.name, mode: mode ?? true }));
        }

        function handleEditEntityName(e, newName) {
            function editName(exlInfo) {
                if (exlInfo === asset) {
                    return {
                        ...exlInfo,
                        name: newName,
                    };
                }
                return {
                    ...exlInfo,
                    files: exlInfo?.files?.map((_asset) => editName(_asset)),
                };
            }

            if (e.key === "Enter") {
                setExplorerInfo(editName(explorerInfo));
                setEditEntity({ mode: false, name: "" });
            }
        }

        function handleNewEntityNameChange(e) {
            setNewAddEntity((data) => ({ ...data, name: e.target.value }));
        }

        function handleDeleteEntity(targetNode) {
            function recursiveComputeDeleteEntity(explInfo) {
                if (targetNode === explInfo) {
                    return null;
                }

                if (explInfo.type === "file") return { ...explInfo };

                return {
                    ...explInfo,
                    files: explInfo?.files
                        .map((file) => {
                            return recursiveComputeDeleteEntity(file);
                        })
                        .filter(Boolean),
                };
            }

            setExplorerInfo(recursiveComputeDeleteEntity(explorerInfo));
        }

        function handleNewEntityOnFocus(e) {
            const newEntity = {
                type: addEntity.type,
                name: addEntity.name,
                ...(addEntity.type === "folder" ? { files: [] } : {}),
            };

            function recursiveComputeAddNewEntity(explInfo, targetNode) {
                if (targetNode === explInfo) {
                    return {
                        ...explInfo,
                        files: [...explInfo.files, newEntity],
                    };
                }

                return {
                    ...explInfo,
                    files: explInfo?.files.map((file) =>
                        file.type === "file"
                            ? file
                            : recursiveComputeAddNewEntity(file, targetNode)
                    ),
                };
            }

            if (e.key === "Enter") {
                setExplorerInfo(
                    recursiveComputeAddNewEntity(explorerInfo, asset)
                );
            }
        }

        return (
            <div className="folder">
                <div>
                    <AssetItem
                        entity={asset}
                        index={index}
                        onClick={
                            asset.type === "folder"
                                ? () => {
                                    setOpenedFiles((data) => ({
                                        ...data,
                                        [`${asset.name}`]: !data[asset.name],
                                    }));
                                }
                                : () => { }
                        }
                        addNewEntity={addNewEntity}
                        handleDeleteEntity={handleDeleteEntity}
                        editEntity={editEntity}
                        changeName={changeName}
                        handleEditEntityName={handleEditEntityName}
                    />

                    <div style={{ marginLeft: "20px", marginBottom: "10px" }}>
                        {addEntity.show ? (
                            <AssetItem
                                entity={{ type: addEntity.type }}
                                context="new"
                                onBlur={() => {
                                    setNewAddEntity((data) => ({
                                        ...data,
                                        show: false,
                                        type: "",
                                    }));
                                }}
                                handleNewEntityNameChange={
                                    handleNewEntityNameChange
                                }
                                handleNewEntityOnFocus={handleNewEntityOnFocus}
                                handleDeleteEntity={handleDeleteEntity}
                                editEntity={editEntity}
                                changeName={changeName}
                                handleEditEntityName={handleEditEntityName}
                            />
                        ) : null}

                        {openedFiles[asset.name]
                            ? asset.files.map((_asset, ind) => {
                                return (
                                    <AssetExplorerNode
                                        key={ind}
                                        asset={_asset}
                                        index={ind}
                                    />
                                );
                            })
                            : null}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <AssetExplorerNode asset={explorerInfo} index={0} />
        </div>
    );
}

export default FileExplorer;

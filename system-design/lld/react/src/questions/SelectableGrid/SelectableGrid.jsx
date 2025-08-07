import { useState } from "react";
import "./style.css";

function SelectableGrid({ rows, cols }) {
    const [coordinates, setCoordinates] = useState({
        fromRow: null,
        fromCol: null,
        toRow: null,
        toCol: null,
    });
    const [isDragging, setIsDragging] = useState(false);

    const [minCol, maxCol] =
        coordinates.fromCol != null && coordinates.toCol !== null
            ? [
                Math.min(coordinates.fromCol, coordinates.toCol),
                Math.max(coordinates.fromCol, coordinates.toCol),
            ]
            : [null, null];

    const [minRow, maxRow] =
        coordinates.fromRow !== null && coordinates.toRow !== null
            ? [
                Math.min(coordinates.fromRow, coordinates.toRow),
                Math.max(coordinates.fromRow, coordinates.toRow),
            ]
            : [null, null];

    return (
        <div className="grid" style={{ "--rows": rows, "--cols": cols }}>
            {Array.from({ length: rows }).map((_, rowIndex) => {
                return (
                    <div key={rowIndex} className="selectable-grid-row">
                        {Array.from({ length: cols }).map((_, colIndex) => {
                            return (
                                <div
                                    key={colIndex}
                                    className={`grid-item ${minCol !== null &&
                                            maxCol !== null &&
                                            minRow !== null &&
                                            maxRow !== null &&
                                            colIndex >= minCol &&
                                            colIndex <= maxCol &&
                                            rowIndex >= minRow &&
                                            rowIndex <= maxRow
                                            ? "grid-item-selected"
                                            : ""
                                        }`}
                                    onMouseDown={() => {
                                        setCoordinates(() => ({
                                            fromRow: rowIndex,
                                            fromCol: colIndex,
                                        }));
                                        setIsDragging(!isDragging);
                                    }}
                                    onMouseEnter={() => {
                                        if (isDragging) {
                                            setCoordinates(
                                                (prevCoordinates) => ({
                                                    ...prevCoordinates,
                                                    toRow: rowIndex,
                                                    toCol: colIndex,
                                                })
                                            );
                                        }
                                    }}
                                    onMouseUp={() => {
                                        setCoordinates((prevCoordinates) => ({
                                            ...prevCoordinates,
                                            toRow: rowIndex,
                                            toCol: colIndex,
                                        }));

                                        setIsDragging(false);
                                    }}
                                >
                                    {rowIndex}
                                    {colIndex}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default SelectableGrid;

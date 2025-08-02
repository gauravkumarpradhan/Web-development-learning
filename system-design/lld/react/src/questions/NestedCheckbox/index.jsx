import "./style.css";
import data from "./data.json";
import { useState } from "react";

/*
    1. If child uncheks then it will uncheck till the top parent
    2. If parent is checked then it should check all the childrens
    3. If any of a prent decendent is unchecked the the parent should also unchecked.
*/

function CheckBoxMainPage() {
    const [checkbox, setIsCheckBox] = useState({});
    function CheckboxItem({ checkboxInfo, checked, handleTopToDown }) {
        const { label, name, id } = checkboxInfo;
        return (
            <div className="checkbox-item">
                <input
                    type="checkbox"
                    name={name}
                    onChange={(e) => handleTopToDown(e, checkboxInfo)}
                    value={id}
                    checked={checked}
                />
                <div className="checkbox-label">{label}</div>
            </div>
        );
    }

    const CheckboxList = ({ fieldConfig }) => {
        function updateChildren(currentNode, currentValue, obj) {
            function recursiveUpdateChildren(node, obj) {
                obj[node.name] = currentValue;
                if (node.children) {
                    for (let child of node.children) {
                        recursiveUpdateChildren(child, obj);
                    }
                }
            }
            recursiveUpdateChildren(currentNode, obj);
        }

        function updateParent(currentNode, currentValue, obj) {
            function recursiveUpdateParent(tree) {
                let isChecked = true;
                if (tree?.id === currentNode?.id) {
                    obj[tree.name] = currentValue;
                    return currentValue;
                }
                if (!tree.children) {
                    obj[tree.name] = !!checkbox[tree.name];
                    return !!checkbox[tree.name];
                }

                for (let child of tree.children) {
                    if (!recursiveUpdateParent(child)) {
                        isChecked = false;
                    }
                }

                if (tree.name) {
                    obj[tree.name] = isChecked;
                }

                return isChecked;
            }

            recursiveUpdateParent({ children: data });
        }

        function handleTopToDown(e, currentNode) {
            const currentValue = !checkbox[e.target.name];
            const newObj = {};
            updateChildren(currentNode, currentValue, newObj);
            updateParent(currentNode, currentValue, newObj);
            setIsCheckBox((checkbox) => ({ ...checkbox, ...newObj }));
        }

        return (
            <div>
                {fieldConfig?.map((field, index) => {
                    return (
                        <div className="checkbox-list">
                            <CheckboxItem
                                key={index}
                                checkboxInfo={field}
                                handleTopToDown={handleTopToDown}
                                checked={checkbox[field?.name]}
                            />

                            {field?.children ? (
                                <div className="checkbox-child-list">
                                    <CheckboxList
                                        fieldConfig={field.children}
                                    />
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            <CheckboxList fieldConfig={data} level={0} />
        </div>
    );
}

export default CheckBoxMainPage;

import { useState } from "react";
import "./style.css";
function TodoList() {
    const [info, setInfo] = useState({
        text: "",
        list: [],
    });
    function handleAddItem() {
        if (info.text.trim().length > 0) {
            setInfo((prevInfo) => ({
                text: "",
                list: [
                    ...prevInfo.list,
                    {
                        completed: false,
                        name: prevInfo.text,
                        id: prevInfo.list.length,
                    },
                ],
            }));
        }

    }

    function handleInputChange(e) {
        setInfo((prevInfo) => ({ ...prevInfo, text: e.target.value }));
    }

    function handleCheckboxChange(index) {
        const list = JSON.parse(JSON.stringify(info.list));
        list[index].completed = !list[index].completed;
        setInfo((prevInfo) => ({ ...prevInfo, list }));
    }

    function handleDeleteTodoItem(index) {
        const list = JSON.parse(JSON.stringify(info.list));
        list.splice(index, 1);
        setInfo((prevInfo) => ({ ...prevInfo, list }));
    }


    return (
        <div className="todo-list-container">
            <h1>Todo List</h1>
            <div className="add-todo-item-section">
                <input
                    placeholder="Enter todo"
                    onChange={handleInputChange}
                    value={info.text}
                />
                <button onClick={handleAddItem}>Add</button>
            </div>

            {info.list.length ? (
                <ul className="todo-list-item-container">
                    {info.list.map((item, index) => {
                        return (
                            <li key={`${index}.${item?.id}`}>
                                <div className="todo-list-item">
                                    <span>
                                        <input
                                            type="checkbox"
                                            checked={item?.completed}
                                            onChange={() =>
                                                handleCheckboxChange(index)
                                            }
                                        />
                                    </span>
                                    <span
                                        className={
                                            item?.completed
                                                ? "todo-item-mark"
                                                : ""
                                        }
                                    >
                                        {item?.name}
                                    </span>
                                    <span>
                                        <button
                                            onClick={() =>
                                                handleDeleteTodoItem(index)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
}

export default TodoList;

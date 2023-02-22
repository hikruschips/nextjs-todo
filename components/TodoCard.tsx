import {
  faCheck,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TodoCard = (props: {
  children?: React.ReactNode;
  handleEditTodo: () => Promise<void>;
  handleAddEdit: (todoKey: number) => () => void;
  edit: number;
  todoKey: number;
  edittedValue: string;
  setEdittedValue: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (todoKey: number) => () => Promise<void>;
}) => {
  const {
    children,
    edit,
    handleAddEdit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleEditTodo,
    handleDelete,
  } = props;
  return (
    <div className="p-2 relative sm:p-3 border flex items-stretch border-white border-solid">
      <div className="flex-1 flex">
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            type="text"
            className="bg-inherit flex-1 text-white outline-none"
            onChange={(e) => setEdittedValue(e.target.value)}
            value={edittedValue}
          />
        )}
        {/* {children} */}
      </div>
      <div className="flex items-center">
        {edit === todoKey ? (
          <FontAwesomeIcon
            onClick={handleEditTodo}
            className="px-2 duration-300 hover:scale-125 cursor-pointer"
            icon={faCheck}
          />
        ) : (
          <FontAwesomeIcon
            onClick={handleAddEdit(todoKey)}
            className="px-2 duration-300 hover:rotate-45 cursor-pointer"
            icon={faPencil}
          />
        )}
        <FontAwesomeIcon
          onClick={handleDelete(todoKey)}
          className="px-2 duration-300 hover:scale-125 cursor-pointer"
          icon={faTrashCan}
        />
      </div>
    </div>
  );
};

export default TodoCard;

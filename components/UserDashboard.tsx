import { useAuthContext } from "@/context/AuthContext";
import { database } from "@/firebase";
import useFetchTodos from "@/hooks/fetchTodos";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

function UserDashboard() {
  const { user } = useAuthContext();
  const [edit, setEdit] = useState(-1);
  const [todo, setTodo] = useState("");
  const [edittedValue, setEdittedValue] = useState("");

  const { loading, error, todos, setTodos } = useFetchTodos();
  // console.log(todosObject);

  // useEffect(() => {
  //   if (user) {
  //     setAddTodo(true);
  //   }
  // }, [user]);

  async function handleAddTodo() {
    if (!todo) {
      return;
    }
    const newKey =
      Object.keys(todos).length === 0
        ? 1
        : Math.max(...Object.keys(todos).map(Number)) + 1;
    setTodos({ ...todos, [newKey]: todo });
    const userRef = doc(database, "users", user!.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: todo,
        },
      },
      { merge: true }
    );
    setTodo("");
  }

  async function handleEditTodo() {
    if (!edittedValue) {
      return;
    }
    const newKey = edit;
    setTodos({ ...todos, [newKey]: edittedValue });
    const userRef = doc(database, "users", user!.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: edittedValue,
        },
      },
      { merge: true }
    );
    setEdit(-1);
    setEdittedValue("");
  }

  function handleAddEdit(todoKey: number) {
    return () => {
      console.log(todos[todoKey]);
      console.log("bannan");
      setEdit(todoKey);
      setEdittedValue(todos[todoKey]);
    };
  }

  function handleDelete(todoKey: number) {
    return async () => {
      const tempObj = { ...todos };
      delete tempObj[todoKey];

      setTodos(tempObj);
      const userRef = doc(database, "users", user!.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [todoKey]: deleteField(),
          },
        },
        { merge: true }
      );
    };
  }

  return (
    <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5">
      <div className="flex items-stretch">
        <input
          type="text"
          placeholder="Enter todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="outline-none p-3 text-base sm:text-lg text-red-600 flex-1 placeholder-yellow-500"
        />
        <button
          onClick={handleAddTodo}
          className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white font-medium text-base duration-300 hover:opacity-40 cursor-pointer"
        >
          ADD
        </button>
      </div>
      {loading && (
        <div className="flex-1 grid place-items-center">
          <FontAwesomeIcon className="animate-spin text-6xl" icon={faSpinner} />
        </div>
      )}
      {user && !loading && (
        <>
          {Object.keys(todos).map((todo, i) => {
            return (
              <TodoCard
                handleEditTodo={handleEditTodo}
                key={i}
                handleAddEdit={handleAddEdit}
                edit={edit}
                todoKey={todo as unknown as number}
                edittedValue={edittedValue}
                setEdittedValue={setEdittedValue}
                handleDelete={handleDelete}
              >
                {todos[todo as unknown as number]}
              </TodoCard>
            );
          })}
        </>
      )}
      {/* {!addTodo && (
        <button
          onClick={() => setAddTodo(true)}
          className="text-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase text-lg duration-300 hover:opacity-30 pointer-cursor"
        >
          ADD TODO
        </button>
      )} */}
    </div>
  );
}

export default UserDashboard;

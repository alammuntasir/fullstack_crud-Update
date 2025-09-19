"use client";

import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Add todo
  const handleAdd = () => {
    if (!name || !age) return;
    setTodos([...todos, { id: Date.now(), name, age }]);
    setName("");
    setAge("");
  };

  // Delete todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  function getAllTask() {
    axios
      .get("http://localhost:3000/getalltodo")
      .then((res) => {
      setTodos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-center mb-4">TODO List</h1>

      {/* Input Fields */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 outline-none"
        />

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 outline-none"
        />

        <button
          onClick={handleAdd}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <ul className="mt-6 space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
          >
            <div>
              <p className="font-semibold">{todo.name.toUpperCase()}</p>
              <p className="text-sm text-gray-600">{todo.age} years old</p>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

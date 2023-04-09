import React, { useState, useEffect } from "react";

import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodo";
import TodoContext from "./Context";

function App() {
	const [todos, setTodos] = useState([]);

	const getTodos = async () => {
		try {
			const response = await fetch("http://localhost:5000/todos");
			const responseArray = await response.json();
			setTodos(responseArray);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<TodoContext.Provider
			value={{ todos, setTodos, getTodos: () => getTodos() }}
		>
			<div className="container">
				<InputTodo />
				<ListTodos />
			</div>
		</TodoContext.Provider>
	);
}

export default App;

import React, { useContext, useState } from "react";
import TodoContext from "../Context";

const InputTodo = () => {
	const [description, setDescription] = useState("");

	const { todos, setTodos } = useContext(TodoContext);

	const onSubmitForm = async (e) => {
		e.preventDefault();

		try {
			const body = { description };
			const response = await fetch("http://localhost:5000/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const responseObj = await response.json();
			setTodos([...todos, responseObj]);
			setDescription("");
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			<h1 className="text-center my-5">Input Todo</h1>
			<form className="d-flex" onSubmit={(e) => onSubmitForm(e)}>
				<input
					type="text"
					placeholder="add todo"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="form-control"
				/>
				<button className="btn btn-success">Add</button>
			</form>
		</>
	);
};

export default InputTodo;

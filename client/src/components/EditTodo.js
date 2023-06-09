import React, { useContext, useState } from "react";
import TodoContext from "../Context";

const EditTodo = ({ todo }) => {
	const { todos, setTodos, getTodos } = useContext(TodoContext);
	const [description, setDescription] = useState(todo.description);

	const editText = async (id) => {
		try {
			const body = { description };

			const response = await fetch(`http://localhost:5000/todos/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			getTodos();
			setTodos(todos);
			// window.location = "/";
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			<button
				type="button"
				className="btn btn-warning"
				data-toggle="modal"
				data-target={`#id${todo.todo_id}`}
			>
				Edit
			</button>

			<div className="modal" id={`id${todo.todo_id}`}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Todo</h4>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={() => setDescription(todo.description)}
							>
								&times;
							</button>
						</div>

						<div className="modal-body">
							<input
								type="text"
								className="form-control"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>

						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-warning"
								data-dismiss="modal"
								onClick={() => editText(todo.todo_id)}
							>
								Edit
							</button>
							<button
								type="button"
								className="btn btn-danger"
								data-dismiss="modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditTodo;

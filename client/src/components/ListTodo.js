import React, { useContext } from "react";
import EditTodo from "./EditTodo";
import TodoContext from "../Context";

const ListTodos = () => {
	const { todos, setTodos } = useContext(TodoContext);

	const deleteTodo = async (id) => {
		try {
			await fetch(`http://localhost:5000/todos/${id}`, {
				method: "DELETE",
			});

			setTodos(todos.filter((todo) => todo.todo_id !== id));
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			<table className="table mt-5">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Description</th>
						<th scope="col"></th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo, index) => {
						return (
							<tr key={todo.todo_id}>
								<th scope="row">{index + 1}</th>
								<td>{todo.description}</td>
								<td>
									<EditTodo todo={todo} />
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => deleteTodo(todo.todo_id)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default ListTodos;

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // req.body

// ROUTES

// create a todo
app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *",
			[description]
		);
		res.json(newTodo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

// get all todos
app.get("/todos", async (req, res) => {
	try {
		const allTodos = await pool.query("SELECT * FROM todo");
		res.json(allTodos.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// get a todo
app.get("/todos/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
			id,
		]);
		res.json(todo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

// update a todo
app.put("/todos/:id", async (req, res) => {
	const { id } = req.params;
	const { description } = req.body;
	try {
		const response = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
			[description, id]
		);
		res.json(response.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
		res
			.status(200)
			.json({ message: `Successfully deleted todo with ID ${id}` });
	} catch (error) {
		console.error(error.message);
	}
});

app.listen(5000, () => {
	console.log("Server has started on port 5000");
});
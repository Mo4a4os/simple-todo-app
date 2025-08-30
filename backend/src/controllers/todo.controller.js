import Todo from "../models/todo.model.js";
export const getTodos = async (req, res) => {
  try {
    const userId = req.user._id;
    const todos = await Todo.find({
      ownerId: userId,
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

export const sendTodo = async (req, res) => {
  try {
    const { text, category } = req.body;
    const ownerId = req.user._id;
    if (!text) return res.status(404).json({ message: "no text provided" });
    const newTodo = new Todo({
      ownerId,
      text,
      category,
    });

    await newTodo.save();
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500);
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id: todoToDeleteId } = req.params;
    const ownerId = req.user._id;

    const todoToDelete = await Todo.findById(todoToDeleteId);

    if (!todoToDelete) {
      return res.status(404).json({ message: "no such todoId" });
    }

    if (todoToDelete.ownerId.toString() === ownerId.toString()) {
      await Todo.findByIdAndDelete(todoToDeleteId);
      return res.status(204).send();
    } else {
      return res.status(401).json({ message: "unauthorized deletion" });
    }
  } catch (error) {
    console.error("Delete todo error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateTodoCategory = async (req, res) => {
  try {
    const { id: todoId } = req.params;

    const ownerId = req.user._id;
    const { category } = req.body;
    if (!category)
      return res.status(404).json({ message: "no category chosen" });
    const todoToUpdate = await Todo.findById(todoId);
    if (!todoToUpdate) {
      return res.status(404).json({ message: "no such todoId" });
    }
    if (todoToUpdate.ownerId.toString() === ownerId.toString()) {
      const newTodo = await Todo.findByIdAndUpdate(
        todoId,
        {
          category: category,
        },
        { new: true }
      );
      return res.status(200).json(newTodo);
    } else {
      return res.status(401).json({ message: "unauthorized update" });
    }
  } catch (error) {
    console.error("todo error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateTodoText = async (req, res) => {
  const { id: todoId } = req.params;
  const ownerId = req.user._id;
  const { text: newText } = req.body;
  if (!newText) return res.status(404).json({ message: "no text provided" });
  const todoToUpdate = await Todo.findById(todoId);
  if (!todoToUpdate) {
    return res.status(404).json({ message: "no such todoId" });
  }
  if (todoToUpdate.ownerId.toString() === ownerId.toString()) {
    const newTodo = await Todo.findByIdAndUpdate(
      todoId,
      { text: newText },
      { new: true }
    );
    return res.status(200).json(newTodo);
  } else {
    return res.status(401).json({ message: "unauthorized update" });
  }
};
export const updateTodoDone = async (req,res) => {
  const { id: todoId } = req.params;
  const ownerId = req.user._id;
  const todoToUpdate = await Todo.findById(todoId);
  if (!todoToUpdate) {
    return res.status(404).json({ message: "no such todoId" });
  }
   if (todoToUpdate.ownerId.toString() === ownerId.toString()) {
    const newTodo = await Todo.findByIdAndUpdate(
      todoId,
      {isDone: !todoToUpdate.isDone },
      {new:true}
    )
    return res.status(200).json(newTodo)
   } else {
    return res.status(401).json({ message: "unauthorized update" });
  }
}
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { isBefore, isAfter, parseISO } from "date-fns";
// import useAsync from '../hooks/useAsync'
// import Tag from './Tag'
import debounceFn from "debounce-fn";
import { DataStore } from "@aws-amplify/datastore";
// import { useFormik } from 'formik'
import { TodoModel } from "../models";
import { useTodos } from "../screens/Todos";
import FullPageSpinner from "./FullPageSpinner";
// import {deleteTodo, editTodo, setTodos } from '../screens/Todos'

function TodoItem() {
//   const [editStatus, setEditStatus] = React.useState("idle");
  const [description, setDescription] = React.useState(undefined);
  // const {run, status, error, data} = useAsync()
  const { status, dispatch, setError, filters, todos } = useTodos();
  // const formik = useFormik({
  //     initialValues: {
  //         title: todo.title
  //     }
  // })
  // console.log(filters, 'filters')
  // const [title, setTitle] = React.useState('')
  // const [todos, setTodos] = React.useState([])
  // const [showEditForm, setShowEditForm] = React.useState(false)
  const [editTodoId, setEditTodoId] = React.useState(undefined);

  const deleteTodoAsync = async (id) => {
    dispatch({ status: "pending" });
    const todoToDelete = await DataStore.query(TodoModel, id);
    await DataStore.delete(todoToDelete);
    const copyOfTodos = [...todos];
    const filteredTodos = copyOfTodos.filter((todo) => {
      if (todoToDelete.id !== todo.id) {
        return true;
      }
      return false;
    });
    dispatch({ status: "resolved", todos: filteredTodos });
  };

  const editTodoAsync = async (todo, e) => {
    dispatch({ status: "pending" });
    const editedTodo = await DataStore.save(
      TodoModel.copyOf(todo, (item) => {
        // Update the values on {item} variable to update DataStore entry
        if (e.target.name === "title" || e.target.name === "description") {
          item[e.target.name] = description;
        } else if (e.target.name === "status") {
          item.status = todo.status === 100 ? 0 : 100;
        } else {
          item[e.target.name] = description;
        }
      })
    );
    const copyOfTodos = [...todos];
    const updatedTodos = copyOfTodos.map((todo) => {
      if (editedTodo.id === todo.id) {
        return editedTodo;
      }
      return todo;
    });
    dispatch({
      status: "resolved",
      todos: updatedTodos,
      filters: { status: todo.status, ...filters },
    });
  };
  React.useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ status: "pending" });
      const fetchedTodos = await DataStore.query(TodoModel);
      dispatch({ status: "resolved", todos: [...fetchedTodos] });
    };
    fetchTodos();
  }, [dispatch]);
 
  const filteredTodos = todos.filter((todo) => {
    const isBeforeEndDate = filters.endDate
      ? isBefore(parseISO(todo.dueDate), parseISO(filters.endDate))
      : true;
    const isAfterStartDate = filters.startDate
      ? isAfter(parseISO(todo.dueDate), parseISO(filters.startDate))
      : true;
    const isSearchMatch = filters.searchTerm
      ? todo.title.includes(filters.searchTerm.toLowerCase())
      : true;
    return isBeforeEndDate && isSearchMatch && isAfterStartDate;
  });

  return status === "resolved" && filteredTodos.length !== 0 ? (
    filteredTodos.map((todo) => (
      <li key={todo.id} style={{ marginLeft: "20px" }}>
        <Col>
          {status === "pending" ? (
            <FullPageSpinner />
          ) : (
            <>
              <Row className="justify-content-space-between">
                <Col>
                  <h4>{todo.title}</h4>
                </Col>
                <Col className="d-flex justify-content-start align-items-end flex-column">
                  {editTodoId === todo.id ? (
                    <Form.Group>
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="dueDate"
                        value={todo.dueDate}
                        onChange={(e) => editTodoAsync(todo, e)}
                      />
                    </Form.Group>
                  ) : (
                    <p>Due date: {todo.dueDate}</p>
                  )}
                  {todo.status === 100 ? (
                    <p style={{ color: "green" }}>Completed</p>
                  ) : (
                    <p style={{ color: "red" }}>Active</p>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Form>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={
                        description !== undefined
                          ? description
                          : todo.description
                      }
                      readOnly={editTodoId !== todo.id}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Row>

              <Row>
                <Col></Col>
                <Col className="d-flex justify-content-end align-items-center">
                  {status === "pending" ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : null}
                  <Button
                    variant="info"
                    onClick={(e) =>
                      editTodoAsync(todo, { target: { name: "status" } })
                    }
                  >
                    {todo.status === 100
                      ? "Mark as active"
                      : "Mark as complete"}
                  </Button>

                  {editTodoId === todo.id ? (
                    <Button
                      className="m-2"
                      variant="primary"
                      onClick={(e) => {
                        setEditTodoId(undefined);
                        editTodoAsync(todo, {
                          target: { name: "description" },
                        });
                      }}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className="m-2"
                      variant="secondary"
                      onClick={() => setEditTodoId(todo.id)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    onClick={() => deleteTodoAsync(todo.id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </li>
    ))
  ) : filters.searchTerm?.length > 0 ? (
    <p>No results</p>
  ) : (
    <p>No todos</p>
  );
}

export default TodoItem;

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_TODOS = gql`
  query {
    todos {
      id
      name
      is_completed
    }
  }
`;

const ADD_TODO = gql`
  mutation ($todo: todos_insert_input!) {
    insert_todos(objects: [$todo]) {
      affected_rows
    }
  }
`;

const App = () => {
  const { data, loading } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [todoName, setTodoName] = useState();

  if (loading) {
    return <>Loading</>;
  }
  return (
    <div>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await addTodo({
                variables: {
                  todo: {
                    name: todoName,
                  },
                },
              });
            } catch (error) {
              console.log("Error", error);
              alert("error creating todo");
            }
            alert("Todo Created!");
            setTodoName("");
          }}
        >
          <input
            type="text"
            placeholder="todo"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <button> Add Todo</button>
        </form>
      </div>

      {!data ? (
        "No Todos"
      ) : (
        <ul>
          {data.todos.map((todo) => {
            return <li key={todo.id}>{todo.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default App;

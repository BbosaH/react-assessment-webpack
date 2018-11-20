import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
/* stateless component to display counts
 * Displays count  Of Todo Items & count of Unchecked todo Items.
 */
const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
  TODO_CROSSED: "todo-crossed"
};

const Counts = props => {
  return (
    <div className="flow-right controls">
      <span>
        Item count:{" "}
        <span className={classNames.TODO_TEXT} id="item-count">
          {props.itemsCount}
        </span>
      </span>
      <span>
        Unchecked count:{" "}
        <span className={classNames.TODO_TEXT} id="unchecked-count">
          {props.uncheckedItemsCount}
        </span>
      </span>
    </div>
  );
};
Counts.propTypes = {
  itemsCount: PropTypes.number,
  uncheckedItemsCount: PropTypes.number
};

/* stateless component to create New Todo
 * contains text input to type TOdo Task and Button To add the New Todo Task
 */

const CreateNewTodo = props => {
  return (
    <React.Fragment>
      <input
        className="center"
        type="text"
        onChange={props.change}
        value={props.todoName}
      />
      <button
        className="button center"
        onClick={props.clickButton}
        style={{ marginTop: 10 }}
      >
        New TODO
      </button>
    </React.Fragment>
  );
};
CreateNewTodo.propTypes = {
  change: PropTypes.func,
  todoName: PropTypes.string,
  clickButton: PropTypes.func
};

/* stateless component to create CheckBox Widget
 */

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => (
  <input
    className={classNames.TODO_CHECKBOX}
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
  />
);

Checkbox.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string
};

/* stateless component to create TodolistItem counts
 * Displays TodoListItem consisting of Checkbox , Text and Delete Button to delete List Item
 */
const TodoListItem = props => {
  return (
    <li className={classNames.TODO_ITEM}>
      <Checkbox
        name={props.id}
        checked={props.checked}
        onChange={props.checkItem}
      />
      {props.checked ? (
        <strike className={classNames.TODO_CROSSED}>{props.text}</strike>
      ) : (
        <span className={classNames.TODO_TEXT}>{props.text}</span>
      )}

      <button
        className={classNames.TODO_DELETE}
        name={props.id}
        onClick={props.deleteItem}
      >
        delete
      </button>
    </li>
  );
};

TodoListItem.propTypes = {
  id: PropTypes.number,
  checked: PropTypes.bool,
  checkItem: PropTypes.func,
  text: PropTypes.string,
  deleteItem: PropTypes.func
};

/* stateless component to display counts
 * Displays TodoList Items.
 */
const TodoList = props => {
  return (
    <ul id="todo-list" className="todo-list">
      {props.listItems.map(item => {
        return (
          <TodoListItem
            key={item.id}
            {...item}
            checkItem={props.checkListItem}
            deleteItem={props.deleteItem}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  listItems: PropTypes.array,
  checkListItem: PropTypes.func,
  deleteItem: PropTypes.func
};

/* One classComponent that manages state of the App. component to display counts
 * Displays count  Of Todo Items & count of Unchecked todo Items.
 */
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentinputVal: "",
      listItems: []
    };
    this.setCurrentVal = this.setCurrentVal.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  //Method to update input value from input
  setCurrentVal(event) {
    let val = event.target.value;
    this.setState(prevState => {
      return {
        currentinputVal: val
      };
    });
  }
  //Method to add new Todo Item to list
  addNewTodo() {
    if (this.state.currentinputVal) {
      this.setState(prevState => {
        return {
          listItems: [
            {
              id: Date.now(),
              text: prevState.currentinputVal,
              checked: false
            },
            ...prevState.listItems
          ],
          currentinputVal: ""
        };
      });
    }
  }
  //Method to toggle checking of Items on a list
  checkItem(event) {
    const id = event.target.name;
    let item = this.state.listItems.find(item => {
      return item.id === parseInt(id);
    });
    item.checked = !item.checked;
    this.setState(prevState => {
      return {
        ...prevState.listItems,
        item
      };
    });
  }

  //method to delete item from list
  deleteItem(e) {
    const id = event.target.name;
    console.log(id);
    let itemIndex = this.state.listItems.findIndex(item => {
      return item.id === parseInt(id);
    });
    this.setState(prevState => {
      return {
        ...prevState.listItems,
        ...prevState.listItems.splice(itemIndex, 1)
      };
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="center title">My TODO App</h1>
        <Counts
          itemsCount={this.state.listItems.length}
          uncheckedItemsCount={
            this.state.listItems.filter(item => {
              return !item.checked;
            }).length
          }
        />
        <CreateNewTodo
          change={this.setCurrentVal}
          todoName={this.state.currentinputVal}
          clickButton={this.addNewTodo}
        />
        <TodoList
          listItems={this.state.listItems}
          checkListItem={this.checkItem}
          deleteItem={this.deleteItem}
        />
      </React.Fragment>
    );
  }
}
export default TodoApp;

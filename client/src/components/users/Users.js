import React, { Component } from "react";
import "./users.css";
import axios from "axios";

class Users extends Component {
  state = {
    users: [],
    name: "",
    email: ""
  };

  componentDidMount() {
    this.getUsers();
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevState.users !== this.state.users) {
  //     this.getUsers();
  //   }
  // };

  getUsers = () => {
    fetch("/api/users")
      .then(res => res.json())
      .then(users =>
        this.setState({ users }, () => console.log("users fetched...", users))
      );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email
    };
    console.log("newUser:", newUser);
    axios
      .post("/api/users/create", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));

    this.getUsers();
  };

  onRemove = e => {
    const removeUser = {
      id: e.target.id
    };
    console.log("removed", removeUser.id);
    axios.delete(`/api/users/delete/${removeUser.id}`);
    this.getUsers();
  };

  editUser(e) {
    e.preventDefault();
    console.log(e.target);
    const user = e.target;
    const edit = window.prompt(`Edit User: ${user.name}`);
    axios.put(`/api/users/edit/${user.id}`);
    // this.setState(currentState => {
    //   return {
    //     tasks: currentState.tasks.concat([
    //       {
    //         name: window.prompt("Add a new task"),
    //         active: true
    //       }
    //     ])
    //   };
    // });
  }
  render() {
    const users = this.state.users;

    return (
      <div>
        <h2>Users</h2>
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="Add User"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            className="addName"
          />
          <input
            placeholder="Add Email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            className="addEmail"
          />
          <button type="submit" className="submitUser">
            Add New User
          </button>
        </form>
        <ul className="user_table">
          {users.map(user => (
            <li key={user.id}>
              <form>
                <div className="user_name">Name: {user.name}</div>
                <div className="user_email">Email: {user.email}</div>
                <button
                  id={user.id}
                  name={user.name}
                  className="edit"
                  onClick={this.editUser}
                >
                  Edit
                </button>
                <button id={user.id} className="delete" onClick={this.onRemove}>
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;

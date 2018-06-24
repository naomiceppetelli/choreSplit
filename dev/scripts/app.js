import React from "react"
import ReactDOM from "react-dom"
import firebase from "firebase"
import UserList from "./UserList"

//configure firebase
const config = {
  apiKey: "AIzaSyBOkzwclTSG4f3nyO-iXrNJ0GzU-lviE5w",
  authDomain: "choreapp-4cb3a.firebaseapp.com",
  databaseURL: "https://choreapp-4cb3a.firebaseio.com",
  projectId: "choreapp-4cb3a",
  storageBucket: "choreapp-4cb3a.appspot.com",
  messagingSenderId: "981255477787"
}

firebase.initializeApp(config)

//beginning of application
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      task: "",
      userName: "",
      users: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addChoreToUser = this.addChoreToUser.bind(this)
  }

  componentDidMount() {
    const dbRef = firebase.database().ref("users")
    //taking a snapshot of the firebase database
    dbRef.on("value", snapshot => {
      // console.log(snapshot.val())
      const data = snapshot.val()
      const userArray = []
      for (let item in data) {
        //assigning the unique key given by firebase as a property on the user object
        data[item].key = item
        const users = userArray.push(data[item])
      }
      this.setState({
        users: userArray
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addChoreToUser(e) {
    e.preventDefault()
    //enter the chore and save it in an object with task and complete as properties
    //grab users from state.user and select a random one
    const chore = {
      task: this.state.task,
      completed: false
    }

    //randomly assigning a chore to a user
    const users = Array.from(this.state.users)

    const randomNumber = () => {
      return Math.floor(Math.random() * users.length)
    }

    const assignUser = users[randomNumber()]

    //make a second dbRef that pushses the chore to that user specifically through the template literal pathname
    const dbRef2 = firebase.database().ref(`users/${assignUser.key}/chore`)

    //push chore to that user
    dbRef2.push(chore)

    //updating the state to clear out the task and user values on the page
    this.setState({
      task: "",
      userName: ""
    })
  }

  handleSubmit(e) {
    //the event is passed in for the event handler, and we want to prevent the default action from happening
    e.preventDefault()
    const user = {
      name: this.state.userName
    }

    const users = []

    users.push(user)

    this.setState({
      users: users
    })

    //creating the users portion of the firebase database
    const dbRef1 = firebase.database().ref(`users`)

    //push it in
    dbRef1.push(user)

    //updating the state to clear out the task and user values on the page
    this.setState({
      task: "",
      userName: ""
    })
  }

  completeChore(userKey, key, completed) {
    console.log(userKey, key, completed)
    firebase
      .database()
      .ref(`users/${userKey}/chore/${key}`)
      .update({
        completed: completed === true ? false : true
      })
  }

  removeChore(userKey, key) {
    firebase
      .database()
      .ref(`users/${userKey}/chore/${key}`)
      .remove()
  }

  removeUser(userKey) {
    firebase
      .database()
      .ref(`users/${userKey}`)
      .remove()
  }

  render() {
    return (
      <div className="pageContent">
        <header>
          <div className="headerContainer">
            <h1>Chore List</h1>
            {/* This is a small thing, but there's this concept of a `document order` in semantic HTML. We want the headings tags to be semantically one greater or lesser than the one before it -- so this should probz be an h2!*/}
            <h3>
              A chore splitting application that randomly assigns a chore to a
              user
            </h3>
            <img src="public/assets/broom.svg" alt="" />
          </div>
        </header>
        <main>
          <div className="formContainer">
            {/* 
                we can turn this form into a component! Reduce our bulk in this main app container.
                I also don't think we'll need action, as we're not submitting this form to a server but submitting it through JS 
                (which is why we use event.preventDefault()) 
              */}
            <form
              className="form enterUser"
              action="POST"
              onSubmit={this.handleSubmit}
            >
              <div className="formInteriorContainer">
                <img
                  src="public/assets/oneFingers.svg"
                  alt="icon denoting that this is the first step"
                />
                <h2>Enter a name</h2>
                <h3>
                  To get started enter a name for your initial chore list. Add
                  as many users as you'd like!
                </h3>
                <div className="inputContainer">
                  <input
                    type="text"
                    onChange={this.handleChange}
                    placeholder="enter a new user"
                    name="userName"
                    value={this.state.userName}
                    required
                  />
                  <input type="submit" value="Add" />
                </div>
              </div>
            </form>
            {/* 
                another prime candidate for a form component; there's a lot of cool things to do in that realm. 
              */}
            <form
              className="form enterChore"
              action="POST"
              onSubmit={this.addChoreToUser}
            >
              <img
                src="public/assets/twoFingers.svg"
                alt="icon denoting that this is the second step"
              />
              <div className="formInteriorContainer">
                <h2>Add a chore</h2>
                <h3>
                  You can now assign a chore! Enter a task below and it will be
                  randomly assigned to a user.
                </h3>
                <div className="inputContainer">
                  {/* I see we've duplicate this input -- this tells me we could probably turn it into a component itself */}
                  <input
                    type="text"
                    onChange={this.handleChange}
                    placeholder="enter a chore"
                    name="task"
                    value={this.state.task}
                    required
                  />
                  <input type="submit" value="Add" />
                </div>
              </div>
            </form>
          </div>
          <div className="listContainer">
            <ul className="userList">
              {this.state.users.map(user => {
                return (
                  <UserList
                    key={user.key}
                    userKey={user.key}
                    name={user.name}
                    chore={user.chore}
                    completeChore={this.completeChore}
                    removeChore={this.removeChore}
                    removeUser={this.removeUser}
                  />
                )
              })}
            </ul>
          </div>
        </main>
        <footer>
          <p>
            Made by <a href="naomiceppetelli.com">Naomi Ceppetelli</a> ©2018
          </p>
        </footer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))

import React from "react"

const UserList = props => {
  return (
    <li key={props.userKey}>
      <h2>
        {props.name}'s Chores
        <button
          className="deleteUser"
          onClick={() => props.removeUser(props.userKey)}
        >
          <i className="fas fa-times" />
        </button>
      </h2>
      <div className="individualListFlex">
        <div className="choreList choreListIncomplete">
          <h3>To Do</h3>
          <ul>
            {/* filtering through the chore prop to determine if the completed value is completed or not, then mapping based on that returned array */}
            {props.chore !== undefined
              ? Object.keys(props.chore)
                  .filter(key => {
                    return props.chore[key].completed === false
                  })
                  .map(key => {
                    return (
                      <li key={key}>
                        {props.chore[key].task}

                        <div className="buttonDiv">
                          <button
                            className="completeButton"
                            onClick={() =>
                              props.completeChore(
                                props.userKey,
                                key,
                                props.chore[key].completed
                              )
                            }
                          >
                            <i className="fas fa-check" />
                          </button>

                          <button
                            className="deleteButton"
                            onClick={() =>
                              props.removeChore(
                                props.userKey,
                                key,
                                props.chore[key].completed
                              )
                            }
                          >
                            <i className="far fa-trash-alt" />
                          </button>
                        </div>
                      </li>
                    )
                  })
              : null}
          </ul>
        </div>
        <div className="choreList choreListCompleted">
          <h3>Completed</h3>
          <ul>
            {/* Yo holy shit. This is nice 👍👍👍 Doing some method chaining off Object.keys is some primo smart stuff!*/}
            {props.chore !== undefined
              ? Object.keys(props.chore)
                  .filter(key => {
                    return props.chore[key].completed === true
                  })
                  .map(key => {
                    return (
                      <li key={key}>
                        {props.chore[key].task}

                        <div className="buttonDiv">
                          {/* Maybe these buttons could be a singular component too?*/}
                          <button
                            className="reAddButton"
                            onClick={() =>
                              props.completeChore(
                                props.userKey,
                                key,
                                props.chore[key].completed
                              )
                            }
                          >
                            <i className="fas fa-undo-alt" />
                          </button>

                          <button
                            className="deleteButton"
                            onClick={() =>
                              props.removeChore(
                                props.userKey,
                                key,
                                props.chore[key].completed
                              )
                            }
                          >
                            <i className="far fa-trash-alt" />
                          </button>
                        </div>
                      </li>
                    )
                  })
              : null}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default UserList

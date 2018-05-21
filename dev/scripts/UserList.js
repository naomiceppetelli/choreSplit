import React from 'react' 

//change this to a complex component 
// class UserList extends React.Componenent {
//     constructor(props) {
//         super(props)
//         this.state = {
//             choresToDo = [],
//             completed = []
//         };
//     }

//     componentDidMount() {

//     }

//     Render() {
//     }
// }
const UserList = (props) => {
                    return (
                        <li key = {props.userKey}>
                            <h2>{props.name}'s Chores 
                                <button className="deleteUser" onClick={() => props.removeUser(props.userKey)}><i className="fas fa-times"></i></button>
                            </h2>
                            <div className = "individualListFlex">
                                <div className="choreList choreListIncomplete">
                                    <h3>To Do</h3>
                                    <ul>
                                        {/* filtering through the chore prop to determine if the completed value is completed or not, then mapping based on that returned array */}
                                        {props.chore !== undefined ? Object.keys(props.chore)
                                            .filter((key) => {
                                                return props.chore[key].completed === false
                                            })
                                            .map((key) => {
                                            // console.log(key)
                                            return (
                    
                                                <li key = {key}>
        
                                                    {props.chore[key].task}
                    
                                                    <div className="buttonDiv">
                                                        <button className = "completeButton" onClick={() => props.completeChore(props.userKey, key, props.chore[key].completed)}><i className="fas fa-check"></i></button>
                        
                                                        <button className = "deleteButton" onClick={() => props.removeChore(props.userKey, key, props.chore[key].completed)}><i className="far fa-trash-alt"></i></button>
                                                    </div>
                                                </li>)
                                        }) : null}
                                    </ul>
                                </div>
                                <div className = "choreList choreListCompleted">
                                    <h3>Completed</h3>
                                    <ul>
                                        {props.chore !== undefined ? Object.keys(props.chore)
                                            .filter((key) => {
                                                return props.chore[key].completed === true
                                            })
                                            .map((key) => {
                                                
                                                return (
        
                                                    <li key = {key}>
        
                                                        {props.chore[key].task}
        
                                                        <div className = "buttonDiv">
                                                            <button className="reAddButton" onClick={() => props.completeChore(props.userKey, key, props.chore[key].completed)}><i className="fas fa-undo-alt"></i></button>
            
                                                            <button className="deleteButton" onClick={() => props.removeChore(props.userKey, key, props.chore[key].completed)}><i className="far fa-trash-alt"></i></button>
                                                        </div>
                                                    </li>)
                                            }) : null}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )
    
}

export default UserList;

//how to get the user name to render even if there is not chore entered
//how to structure the data to get the unique key for each chore so that they can be completed/deleted
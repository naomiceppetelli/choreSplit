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
                            <h2>{props.name}'s Chores <button onClick={() => props.removeUser(props.userKey)}><i className="fas fa-times"></i></button></h2>
                            <ul className = 'choreListIncomplete'>
                                <li className = 'title'>To Do</li>
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
            
                                            <button onClick={() => props.completeChore(props.userKey, key, props.chore[key].completed)}><i className="fas fa-check"></i></button>
            
                                            <button onClick={() => props.removeChore(props.userKey, key, props.chore[key].completed)}><i className="far fa-trash-alt"></i></button>
                                        </li>)
                                }) : null}
                            </ul>
                            <ul className = 'choreListCompleted'>
                                
                                <li className='title'>Completed</li>

                                {props.chore !== undefined ? Object.keys(props.chore)
                                    .filter((key) => {
                                        return props.chore[key].completed === true
                                    })
                                    .map((key) => {
                                        
                                        return (

                                            <li key = {key}>

                                                {props.chore[key].task}

                                                <button onClick={() => props.completeChore(props.userKey, key, props.chore[key].completed)}><i className="fas fa-undo-alt"></i></button>

                                                <button onClick={() => props.removeChore(props.userKey, key, props.chore[key].completed)}><i className="far fa-trash-alt"></i></button>
                                            </li>)
                                    }) : null}
                            </ul>
                        </li>
                    )
    
}

export default UserList;

//how to get the user name to render even if there is not chore entered
//how to structure the data to get the unique key for each chore so that they can be completed/deleted
import React from 'react' 

const UserList = (props) => {
    return (
        <li>
            <h2>{props.name}'s Chores</h2>
            <ul>
                <li>
                    {Object.keys(props.chore).map((key)=>{
                        return props.chore[key].task
                    })}
                </li>
            </ul>
        </li>
    )
}

export default UserList;
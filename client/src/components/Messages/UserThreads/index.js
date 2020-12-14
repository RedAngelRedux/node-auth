import React, {useState, useEffect} from 'react';

const UserThreads = ({threads, getConvo}) => {

    // const [selectedName, setSelectedName] = useState("");
    // const [selectedId, setSelectedId] = useState("");


    const handleClick = (e) => {
        // setSelectedName(e.target.innerHtml);
        // setSelectedId(e.target.id);
        console.log(`clicked on user ${e.target.id}`);
        getConvo(e.target.id);
    }

//   useEffect( () => {
//       if (selectedId !== "") getConvo(selectedId);
//   },[selectedId])

    return ( 
        <React.Fragment>
            { 
                threads.map((user, i) => {
                    return user ? <div className="message-body" key={i} id={user._id} onClick={(e) => handleClick(e)}>{user.name}</div> : <></>;
                })
            }

        </React.Fragment>
     );
}
 
export default UserThreads;
import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc,updateDoc,deleteDoc,doc } from "firebase/firestore";
function App() {
  // React we can't update value direcly we have to define state (value,setValue)
  // if we don't use state whenever values has change but UI not rerender
  const [users, setUser] = useState([]);
  const userCollectionRef = collection(db, "tutorials");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [isUpdate,setUpdate] = useState(false)
  const [id,setId] = useState('')

// delete data 
  const deleteTutorial = async (docId) => {
    const tutorialDoc = doc(db,'tutorials',docId)
    await deleteDoc(tutorialDoc)
  }

  const handleChange = () => {
    setPublished(!published);
  };

  const addTutorial = async () => {
    if(isUpdate){
      const tutorialDoc = doc(db,'tutorials',id)
      await updateDoc(tutorialDoc,{title:title,description:description,published:published})
      return
    }
    await addDoc(userCollectionRef, {
      title: title,
      description: description,
      published: published,
    });
    setTitle('')
    setDescription('')
    setPublished(false)
  };
  const onUpdate = async (docId,tutorial) => {
    console.log(docId)
    console.log(tutorial)
    if(docId){
      setId(docId)
      setTitle(tutorial.title)
      setDescription(tutorial.description)
      setPublished(tutorial.published)
      setUpdate(true)
    }

    
// await updateDoc(doc)
  }
  // init page to load data it will execute automatically 
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log("data", data);
      setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div className="App">
      <div className="container">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          // onChange={(event) => {
          //   setTitle(event.target.value);
          //   console.log(event.target.value);
          // }}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          // onChange={(event) => {
          //   setDescription(event.target.value);
          // }}
        />
        <label>publish</label>{" "}
        <input type="checkbox" onChange={handleChange} checked={published} />
        <button onClick={addTutorial}>add</button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Published</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i}</th>
                  <td >{user.title} </td>
                  <td>{user.description} </td>
                  <td>{user.published === true ? 'true' : 'false'}</td>
                  <td>
                                                                  {/* when we have function paramater we have to () =>function(paramater) */}
                  <button className="btn btn-sm btn-info" onClick={() => onUpdate(user.id,user)}>Update</button>

                    <button className="btn btn-sm btn-danger" onClick={() => deleteTutorial(user.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

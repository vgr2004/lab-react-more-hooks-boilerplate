import { useReducer, useRef } from "react";
import'./App.css'

const initialState=[]
const reducer=(state,action)=>{
  switch(action.type){
    case "addTask":
      return[...state,{id:state.length , text:action.content , toggle:true}]
    case "toggleContent":
      return state.map((div)=>(div.id===action.selectedId?{...div,toggle:!div.toggle}:div))
    default:
      return state
  }
}

function App(){
  const [divs,dispatch]=useReducer(reducer,initialState)
  const ref=useRef()
  const addTask=(inputValue)=>{
    if(inputValue)
    dispatch({type:"addTask",content:inputValue})
  }
  const toggleContent=(id)=>{
    dispatch({type:'toggleContent',selectedId:id})
  }
  const scrollUp=()=>{
    ref.current.focus()
  }
  return (
    <div>
      <input ref={ref} type="text" id="inputBox" placeholder="Type here and press enter" 
      onKeyDown={(e)=>{if(e.key==="Enter"){
        addTask(e.target.value)
        e.target.value=""
      }}}/>
      {divs.map((div)=>(
        <div id="contentDiv" key={div.id}>
          <div>
           <div>{div.toggle?div.text:"This content is hidden"}</div> 
            <button onClick={()=>toggleContent(div.id)}>Toggle</button>
          </div>
        </div>
      ))}
      <div>
        <button id="gbw" onClick={scrollUp}>Get Back Writing</button>
      </div>
    </div>
  )
}

export default App
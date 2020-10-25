import React, {useEffect, useState} from "react";
import axios from 'axios';
import s from "./Tascs.module.scss";
import removeSvg from '../../images/remove.svg';


const Task = ({task, list, dataList, onRemoveTask, onCompleteTask}) => {
  const [keyList, setKeyList] = useState(null)

  useEffect(() => {
    axios.get('https://todo-165ea.firebaseio.com/todo.json').then(({data}) => {
      for (let keyList in data.lists) {
        if (data.lists[keyList].id === list.id) {
          setKeyList(keyList)
        }
      }
    })
  }, [keyList])

  const removeTaks = () => {
    axios.get('https://todo-165ea.firebaseio.com/todo.json').then(({data}) => {
      // console.log(data.lists.filter(item => item.colorId == task.listId))
      for (let keyList in data.lists) {
        if (data.lists[keyList].id === list.id) {
          for (let keyTask in data.lists[keyList].tasks) {
            if (data.lists[keyList].tasks[keyTask].id === task.id) {
              axios.delete(`https://todo-165ea.firebaseio.com/todo/lists/${keyList}/tasks/${keyTask}.json`)
                .then((res) => {
                  onRemoveTask(data.lists[keyList].id, task.id)
                })
                .catch(() => {
                  alert('Не удалось удалить выбранную задачу')
                })
            }
          }
        }
      }
    })
  }

 const changeCheckbox = (e) => {
    e.persist()
   onCompleteTask(list.id, task.id, e.target.checked)
   axios.get('https://todo-165ea.firebaseio.com/todo.json').then(({data}) => {
     // console.log(data.lists.filter(item => item.colorId == task.listId))
     for (let keyList in data.lists) {
       if (data.lists[keyList].id === list.id) {
         for (let keyTask in data.lists[keyList].tasks) {
           if (data.lists[keyList].tasks[keyTask].id === task.id) {
             console.log(!e.target.checked)
             axios.patch(`https://todo-165ea.firebaseio.com/todo/lists/${keyList}/tasks/${keyTask}.json`, {
               completed: e.target.checked
             })
               .then((res) => {
                 // onCompleteTask(data.lists[keyList].id, task.id, task.completed)
               })
               .catch(() => {
                 alert('Не удалось удалить выбранную задачу')
               })
           }
         }
       }
     }
   })
 }
// console.log(task)
  return (
    <div

      className={s.tasks__itemRow}
      key={task.id}>
      <div className={s.checkbox} >
        <input
          onChange={(e) => changeCheckbox(e)}
          id={`task-${task.id}`}
               type="checkbox"
               checked={task.completed}
        />
        <label htmlFor={`task-${task.id}`}>
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#767676" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

        </label>
      </div>
      {/*<input*/}
      {/*  className={s.tascs__text}*/}
      {/*  readOnly*/}
      {/*  value={task?.text}*/}
      {/*/>*/}

      <p className={s.tasks__text}>{task?.text}</p>
      <img
        onClick={removeTaks}
        className={s.tasks__removeIcon}
        src={removeSvg}
        alt="remove icon"
      />
    </div>
  )
}

export default Task
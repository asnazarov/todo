import React, {useState} from "react";
import axios from 'axios';
import s from "./Tascs.module.scss";
import editSvg from '../../images/edit.svg';
import AddTaskForm from './AddTaskForm.jsx'
import removeSvg from '../../images/remove.svg';
import Task from "./Task.jsx";

const Tascs = ({list, withoutEmpty, colors, onAddTask, dataList, onEditTitle, onRemoveTask, onCompleteTask}) => {

  const
    editTitle = () => {
      const newTitle = window.prompt('Название списка', list.name);
      if (newTitle) {
        onEditTitle(list.id, newTitle)
        for (let key in dataList) {
          if (dataList[key].id == list.id) {
            axios.patch(`https://todo-165ea.firebaseio.com/todo/lists/${key}.json`, {
              name: newTitle
            })
              .catch(() => alert('Не удалось обновить название списка'))
          }
        }
      }
    }

  const colorTitle = colors && colors.filter(item => list.color === item.name) // цвета для заголовков

  return (
    <div
      className={s.tasks}

    >
      <h2
        className={s.tasks__title}
        style={{color: colorTitle && colorTitle[0].hex}}
      >

        {list.name}
        <img onClick={editTitle} src={editSvg} alt="edit"/>
      </h2>
      {
        (!withoutEmpty && !list.tasks?.length && <h3 className={s.tasks__noTasks}>Задачи отсутствуют</h3>)
      }
      {
        list.tasks.map(task => (
            <Task
              onRemoveTask={onRemoveTask}
              onCompleteTask={onCompleteTask}
              key={task.id}
              task={task}
              list={list}
              dataList={dataList}
            />
          )
        )
      }

      <AddTaskForm
        onAddTask={onAddTask}
        list={list}
        dataList={dataList}
      />

    </div>
  )
}

export default Tascs
import React, {useState} from "react";
import axios from 'axios';
import classNames from 'classnames';
import List from "../List/List";
import s from './Tascs.module.scss';
import addTaskSvg from '../../images/addTask.svg';

const AddTaskForm = ({list, onAddTask, dataList}) => {
  const [visibleForm, setVisibleForm] = useState(false);  // видимость формы
  const [inputValue, setInputValue] = useState(''); // попап в форме по умолчанию пустой
  const [isLoading, setIsLoading] = useState(false)
  const [fieldValid, setFieldValid] = useState(false) // валидация инпута

  const toggleFormVisible = () => {
    setVisibleForm((visibleForm) => !visibleForm);
    setInputValue('')
    setFieldValid(false)
  }

  const addTask = () => {

    if (!inputValue) {
      return setFieldValid(true) // при клике ДОБАВИТЬ инпут попапа пустой? валидация  true
    } else {
      setFieldValid(false)
    }
    setIsLoading(true)
    const obj = {
      completed: false,
      text: inputValue,
      id: Math.floor(Math.random() * 100) + 1,
      listId: list.colorId,
    }

    for (let key in dataList) {
      if (dataList[key].id == list.id) {
        axios.post(`https://todo-165ea.firebaseio.com/todo/lists/${key}/tasks.json`, obj)
          .then((res) => {
            const dataObj = JSON.parse(res.config.data)
            onAddTask(list.id, dataObj)
            toggleFormVisible()
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    }


  }

  return (
    <>
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className={s.tasks__formNew}>
          <img src={addTaskSvg} alt="Add icon"/>
          <span>Добавить задачу</span>
        </div>
      ) : (
        <div className={s.tasks__formBlock}>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className={s.field}
            type="text"
            placeholder="Название задачи"
          />
          {fieldValid ? <p className={s.tasks__valid}>Поле не может быть пустым</p> : <p className={s.tasks__valid}></p>}
          {/*<p className={s.tasks__valid}>Поле не может быть пустым</p>*/}
          <button disabled={isLoading} onClick={addTask} type="submit" className={s.tasks__addTascs}>
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
          </button>
          <button onClick={toggleFormVisible} type="submit"
                  className={classNames(s.tasks__addTascs, s.tascs__addTascs_gray)}>
            Отмена
          </button>
        </div>
      )

      }


    </>
  )
}

export default AddTaskForm
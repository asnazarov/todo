import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Route, useHistory} from 'react-router-dom';
import s from './App.module.scss';
import DB from './assets/db.json'
import AddList from "./Components/AddList/AddList";
import List from "./Components/List/List";
import Tascs from "./Components/Tascs/Tascs";


function App() {
  // const [lists, setlists] = useState(DB.lists.map((item) => {
  //   item.color = DB.colors.filter(color => color.id === item.colorId)[0].name
  //   return item
  // }))
  const [lists, setlists] = useState(null) // массив объектов sidebar
  const [dataServer, setDataServer] = useState({}) // data.lists с сервера и чистыми tasks
  const [colors, setColors] = useState(null)  // массив объектов цветов
  const [activeItem, setActiveItem] = useState(null)
  let history = useHistory();

  useEffect(() => {
    axios.get('https://todo-165ea.firebaseio.com/todo.json').then(({data}) => {
      const dataList = data.lists
      let newArrLists = []
      for (let key in dataList) {
        let newArrTasks = []
        if (typeof dataList[key].tasks !== "undefined") {
          for (let ke in dataList[key].tasks) {
            newArrTasks.push(dataList[key].tasks[ke])
          }
          dataList[key].tasks = newArrTasks
        } else dataList[key].tasks = []
        newArrLists.push(dataList[key])
      }
      setlists(newArrLists)
      setDataServer(dataList)
      setColors(data.colors)
      // console.log(newArrLists)
    })
    // axios.get('http://localhost:8000/api/v1/customers/').then(({data}) => {
    //   console.log(data)
    // })
    // axios.get('http://localhost:3001/lists').then(({data}) => {
    //   console.log(data)
    // })

  }, [])


  const onAddList = (obj) => { // добавление нов. таски и обновление состояния
    const newLists = [...lists, obj]
    setlists(newLists)
    axios.get('https://todo-165ea.firebaseio.com/todo.json').then(({data}) => {
      const dataList = data.lists
      setDataServer(dataList)
      // console.log(dataList)
    })
  }
  const onAddTask = (listId, obj) => { // добавление нов. таски в папке и обновление состояния
    const newLists = lists.map(item => {
      if (item.id === listId) {
        if (typeof item.tasks === "undefined") {
          item.tasks = [obj]
          // console.log(item.tasks)
        } else {
          const newItemTask = [];
          for (let key in item.tasks) {
            newItemTask.push(item.tasks[key])
          }
          item.tasks = [...newItemTask, obj]
        }
      }
      return item
    })
    console.log(newLists)
    setlists(newLists)
    axios.get('https://todo-165ea.firebaseio.com/todo.json').then(({data}) => {
      const dataList = data.lists
      setDataServer(dataList)
      // console.log(dataList)
    })
  }

  const onRemoveTask = (listId, taskId) => {
    const newLists = lists.map(item => {
      if (item.id === listId) {
        item.tasks = item.tasks.filter(item => item.id !== taskId)
      }
      return item
    })
    setlists(newLists)
  }

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if(task.id === taskId) {
            task.completed = completed
          }
          return task
        })
      }
      return list
    })
    setlists(newList)
  }

  const onEditListTitle = (id, title) => {   // изменение тайтла  в папке с задачами
    const newLists = lists.map(item => {
      if (item.id === id) {
        item.name = title
      }
      return item
    })
    setlists(newLists)

  }

  useEffect(() => {
    const listId = history.location.pathname.split('/lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);

    }
  }, [lists, history.location.pathname])

  return (
    <div className={s.todo}>
      <div className={s.todo__sidebar}>
        <List
          onClickItem={item => {
            history.push(`/`)
            setActiveItem(item)
          }}
          items={[
            {
              icon: (
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.96 5.10001H5.74001C5.24321 5.10001 5.20001 5.50231 5.20001 6.00001C5.20001 6.49771 5.24321 6.90001 5.74001 6.90001H10.96C11.4568 6.90001 11.5 6.49771 11.5 6.00001C11.5 5.50231 11.4568 5.10001 10.96 5.10001ZM12.76 9.60001H5.74001C5.24321 9.60001 5.20001 10.0023 5.20001 10.5C5.20001 10.9977 5.24321 11.4 5.74001 11.4H12.76C13.2568 11.4 13.3 10.9977 13.3 10.5C13.3 10.0023 13.2568 9.60001 12.76 9.60001ZM5.74001 2.40001H12.76C13.2568 2.40001 13.3 1.99771 13.3 1.50001C13.3 1.00231 13.2568 0.600006 12.76 0.600006H5.74001C5.24321 0.600006 5.20001 1.00231 5.20001 1.50001C5.20001 1.99771 5.24321 2.40001 5.74001 2.40001ZM2.86001 5.10001H1.24001C0.743212 5.10001 0.700012 5.50231 0.700012 6.00001C0.700012 6.49771 0.743212 6.90001 1.24001 6.90001H2.86001C3.35681 6.90001 3.40001 6.49771 3.40001 6.00001C3.40001 5.50231 3.35681 5.10001 2.86001 5.10001ZM2.86001 9.60001H1.24001C0.743212 9.60001 0.700012 10.0023 0.700012 10.5C0.700012 10.9977 0.743212 11.4 1.24001 11.4H2.86001C3.35681 11.4 3.40001 10.9977 3.40001 10.5C3.40001 10.0023 3.35681 9.60001 2.86001 9.60001ZM2.86001 0.600006H1.24001C0.743212 0.600006 0.700012 1.00231 0.700012 1.50001C0.700012 1.99771 0.743212 2.40001 1.24001 2.40001H2.86001C3.35681 2.40001 3.40001 1.99771 3.40001 1.50001C3.40001 1.00231 3.35681 0.600006 2.86001 0.600006Z"
                    fill="#7C7C7C"/>
                </svg>
              ),
              name: 'Все задачи',
              active: history.location.pathname === '/'
            }
          ]}
        />

        <AddList onAddList={onAddList} items={lists} colors={colors}/>

        {lists ? (
            <List
              active={true}
              onClickItem={item => {
                history.push(`/lists/${item.id}`)
                // setLocationPath(history.location.pathname.split('/lists/')[1])
                // console.log(history.location.pathname)
                setActiveItem(item)
              }}
              items={lists}
              dataList={dataServer}
              onRemove={(id) => {   // удаление папки в sidebar
                const newLists = lists.filter(item => item.id !== id);
                setlists(newLists)
              }}
              isRemovable
              activeItem={activeItem}
            />
          ) :
          'Загрузка ...'
        }

      </div>
      <div className={s.todo__tascs}>
        <Route exact path="/">
          {lists && lists.map((list, index) => (
            <Tascs
              key={index}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTitle={onEditListTitle}
              onCompleteTask={onCompleteTask}
              colors={colors}
              list={list}
              dataList={dataServer}
              withoutEmpty
            />
          ))}
        </Route>
        <Route path={`/lists/`}>
          {lists && activeItem &&
          <Tascs
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onEditTitle={onEditListTitle}
            onCompleteTask={onCompleteTask}
            colors={colors}
            list={activeItem}
            dataList={dataServer}
          />}
        </Route>


      </div>
    </div>
  );

}

export default App;

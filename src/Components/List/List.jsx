import React, {useEffect, useState} from "react";
import axios from 'axios';
import s from "./List.module.scss";
import classNames from 'classnames';
import Badge from "../Badge/Badge";
import removeSvg from '../../images/remove.svg';


const List = ({items, dataList, openPopup, isRemovable, onRemove, onClickItem, activeItem}) => {
  // items - массив объектов, список  в sidebar
  // dataList - массив объектов с сервера с уникальными ключами
  // openPopup - f клик на открытие попапа
  // isRemovable - проверяет удаляемый ли элемент
  // onRemove - f удаление таски из items
  const removeList = (item) => {
    console.log(dataList)
    if (window.confirm('Вы действительно хотите удалить список?')) {

      for (let key in dataList) {
        if (dataList[key].id == item.id) {
          axios.delete(`https://todo-165ea.firebaseio.com/todo/lists/${key}.json`)
            .then((res) => {
              onRemove(item.id)
            });
        }
      }
    }
  }
  return (
    <ul onClick={openPopup} className={s.list}>

      {
        items.map((item, index) => {
          // item != null
          // console.log(item)
          const color = `badge__${item.color}`

          return (
            // <li>
            <li
              onClick={onClickItem ? () => onClickItem(item) : null}
              className={classNames(s.list__item, s[item.list__addButton],
                s[item.active ? 'active' : (activeItem && activeItem.id === item.id) && 'active' ])}
              key={index}>
              <i>
                {item.icon ? (item.icon) : (<Badge color={color}/>)}
              </i>
              <span className={s.list__text}>
                {item.name} {item.tasks && item.tasks.length > 0 && `( ${item.tasks.length} )`}
              </span>
              {isRemovable &&
              <img
                className={s.list__removeIcon}
                onClick={() => removeList(item)}
                src={removeSvg}
                alt="remove icon"/>
              }
            </li>
          )
        })
      }

    </ul>
  )

  // return (
  //   <ul onClick={openPopup} className={s.list}>
  //     {/*<ul className={s.list}>*/}
  //     {
  //for (var key in items) {
  //       console.log(items)
  //     }
  //       // items && items.forEach(item => console.log(item))
  //       // items.map((item, index) => {
  //       //
  //       //   const color = `badge__${item.color}`
  //       //   // const classListAddBtn = `${item.class}`
  //       //   const classActiveColor = item.active ? 'active' : ''
  //       //   return (
  //       //     <li className={classNames(s.list__item, s[item.list__addButton], s[classActiveColor])} key={index}>
  //       //       <i>
  //       //         {item.icon ? (item.icon) : (<Badge color={color}/>)}
  //       //       </i>
  //       //       <span className={s.list__text}>{item.name}</span>
  //       //       {isRemovable &&
  //       //       <img
  //       //         className={s.list__removeIcon}
  //       //         onClick={() => removeList(item)}
  //       //         src={removeSvg}
  //       //         alt="remove icon"/>}
  //       //     </li>
  //       //   )
  //       // })
  //     }
  //   </ul>
  // )
}

export default List
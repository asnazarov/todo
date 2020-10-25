import React, {useEffect, useState} from "react";
import axios from 'axios';
import List from "../List/List";
import s from './AddList.module.scss';
import Badge from "../Badge/Badge";
import close from '../../images/close.svg';


const AddList = ({onAddList, items, colors}) => {
  // onAddList - добавление нов. таски и обновление состояния
  // colors - массив цветов для попапа
  const [visiblePopup, setVisiblePopup] = useState(false) // отображение попапа
  const [selectedColor, setSelectColor] = useState(3) // выбор активного цвета в попапе
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('') // value инпута
  const [fieldValid, setFieldValid] = useState(false) // валидация инпута
  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectColor(colors[0].id)
    }
  }, [colors])

  const onClose = () => {  // сбросить попап в дефолт
    setInputValue('');
    setSelectColor(colors[0].id);
    setFieldValid(false)
  }

  function openPopup() {
    setVisiblePopup((visiblePopup) => !visiblePopup)
    onClose()
  }

  function addList(event) {  // добавление нового списка из попапа
    event.preventDefault()
    if (!inputValue) {
      return setFieldValid(true) // при клике ДОБАВИТЬ инпут попапа пустой? валидация  true
    } else {
      setFieldValid(false)
    }
    const color = colors.filter(c => c.id === selectedColor)[0].name
    setIsLoading(true)
    // axios.post('http://localhost:3001/lists', {name: inputValue, colorId: selectedColor, color: color})
    axios.post('https://todo-165ea.firebaseio.com/todo/lists.json',
      {
        color: color,
        colorId: selectedColor,
        id: Math.floor(Math.random() * 10000) + 1,
        tasks:[],
        name: inputValue
      })
      .then((res) => {
        const data = JSON.parse(res.config.data)
        const listObj = {...data}
        onAddList(listObj)
        console.log(data)
        setVisiblePopup(false)
        onClose()
      })
      .finally(() => {
        setIsLoading(false)
      })
    // onAddList({   // передача нового объекта в массив списка
    //   id: Math.floor(Math.random() * 100) + 1,
    //   name: inputValue,
    //   color: color
    // });

  }

  return (

    <div className={s.addList}>
      <List  // компонент   "+Добавить список"
        openPopup={openPopup}
        items={[
          {
            list__addButton: 'list__addButton',
            name: 'Добавить список',
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                   opacity="1">
                <path d="M6 1V11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 6H11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )
          }
        ]}
      />


      {visiblePopup &&
      (<div className={s.addPopup}>
        <img             // крестик закрытия попапа
          onClick={() => {
            onClose();
            setVisiblePopup(false)
          }}
          className={s.addPopup__closePopup}
          src={close} alt="закрыть"/>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={s.field} type="text" placeholder="Название папки"/>
        {fieldValid ? <p className={s.field__valid}>Поле не может быть пустым</p> : <p className={s.field__valid}></p>}
        <ul className={s.addPopup__listColor}>
          {/*рендер цветов в попапе*/}
          {colors ? (
            colors.map((item) => {
              const color = `badge__${item.name}`

              function handleClickPopup() {
                setSelectColor(item.id)
              }

              return (

                <li key={item.id}>
                  <Badge
                    handleClickPopup={handleClickPopup}
                    color={color}
                    stylePopup={'badge_stylePopup'}
                    stylePopupАctive={selectedColor === item.id && 'badge_stylePopupАctive'}
                  />
                </li>
              )
            })
          ) : ('Загрузка цветов...')
          }
          {/*рендер цветов в попапе*/}
        </ul>
        <button type="submit" onClick={addList} className={s.addPopup__btn}>
          {isLoading ? 'Добавление...' : 'Добавить'}
        </button>
      </div>)}
    </div>
  );
};

export default AddList
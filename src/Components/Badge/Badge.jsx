import React from "react";
import s from './Badge.module.scss';
import classNames from 'classnames'

const Badge = ({color, stylePopup, stylePopupАctive, handleClickPopup}) => {
  return (
    <>
      {/*<i className={[s.badge, s[color], s[stylePopup]].join(' ')}></i>*/}
      <i onClick={handleClickPopup} className={classNames(s.badge, s[color], s[stylePopup], s[stylePopupАctive])}></i>
    </>
  )
}

export default Badge
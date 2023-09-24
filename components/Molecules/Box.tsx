import React from 'react'
import styles from '../../styles/box.module.scss'

const Box = ({title,children}:any) => {
  return (
    <div className={styles.box_container}>
        <h1 className={styles.title}>{title}</h1>
        {children}

    </div>
  )
}

export default Box
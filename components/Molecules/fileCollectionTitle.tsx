import React from 'react'

const FileCollectionTitle = ({title,classes,graphCurrency}:any) => {
  return (
    <div className='mt-4'>
        <h1 className={classes}>{title}</h1>
        <h2>{graphCurrency}</h2>

    </div>
  )
}
export default FileCollectionTitle
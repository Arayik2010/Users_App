
import { CollectionTitleType } from '@/interface/fileCollectioTitle'
import Link from 'next/link'
import React from 'react'

const FileCollectionTitle = ({title,classes,graphCurrency,link,classBlock}:CollectionTitleType) => {
  return (
    <div className={`mt-4 ${classBlock}`}>
        <h1 className={classes}>{title}</h1>
        <h2>{graphCurrency}</h2>
        {link? <Link className='text-blue-600' href={link.linkRef}>{link.text}</Link> : null } 
       
    </div>
  )
}
export default FileCollectionTitle
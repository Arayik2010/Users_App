import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  return (
    <div className='flex gap-20 justify-center w-1/2 m-auto'>
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/users'>Users</Link>
        <Link href='/'>Login</Link>
    </div>
  )
}
export default Navigation

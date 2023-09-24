import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  return (
    <div>
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/users'>Users</Link>
        <Link href='/'>Login</Link>
    </div>
  )
}
export default Navigation

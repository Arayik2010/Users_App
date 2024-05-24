import Link from 'next/link'
import React from 'react'

const NavLink = ({routes}:any) => {
  return (
    <div>
          <Link href={routes.path}>{routes.name}</Link>
    </div>
  )
}
export default NavLink

import Image from 'next/image'
import Dashboard from './dashboard/page'
import Login from '@/components/Molecules/login'

export default function Home() {
  return (
    <main className="flex min-h-screen ">
      <div className="">
       <Login/>
      </div>
    </main>
  )
}

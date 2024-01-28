'use client'
import UsersService from '@/srevice/users';
import React, { useEffect } from 'react'



const Dashboard = () => {
  const usersService = UsersService.getInstance();

  const loadUsers = async() => {
    const userData = await usersService.listUsers()
    console.log(userData.data,'pppppp')
    
  }

  useEffect(() => {
    loadUsers()

  },[])

  return (
    <div>Dashboard </div>
  )
}

export default Dashboard

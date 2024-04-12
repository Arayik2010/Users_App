'use client'
import UsersService from '@/srevice/users';
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Dashboard = () => {
  // const notify = () => {toast.error("Wow so easy!"),  toast.success("Success Notification !")} ;
  function notify() {
        if (!Notification) {
      alert("Desktop notifications not available in your browser");
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      const notification = new Notification("New Message", {
        icon:
          "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
        body: "You have a new Message",
      });
      console.log(notification,'ffffff')
      notification.onclick = function () { 
        window.focus();
        this.close();
      };
    }
  }

  return (
    <div>
    <div>Dashboard </div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer
      position='top-left' 
      theme="dark"
       />
    </div>

  )
}

export default Dashboard

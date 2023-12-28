import React from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'

const useDebunce = (callback, delay) => {

    const timer = useRef()

    const debuncedCallback = useCallback((...arg) => {
        if(timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...arg)
        }, delay)

    },[callback,delay])
  
    return debuncedCallback
}

export default useDebunce

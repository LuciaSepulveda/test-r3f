import React from 'react'
import { useEffect } from 'react';
import { Button, Column, Line, Span } from './ButtonTimelineStyle';

import { useContext } from 'react';
import { useScroll } from 'framer-motion'
import { useState } from 'react';
import { AppContext } from '../../context/appContext';

export const ButtonTimeline = ({number, text, scrollActive, setScrollActive}) => {
  const { appState } = useContext(AppContext)
  const { scrollY, scrollYProgress } = useScroll()

  useEffect(() => {
    
        return scrollYProgress.onChange((latest) => {
            if(latest.toFixed(2) == 0.23 || latest.toFixed(2)==0.12 || latest.toFixed(2)==0.35 || latest.toFixed(2)==0.47 || latest.toFixed(2)==0.59){
              setScrollActive(parseInt(latest * 10, 10))
            }
            else{
              setScrollActive(0)
            }
        })
    
}, [])

  const goToScroll = (number) => {
    window.scrollTo(0, number*1000)
    setScrollActive(number)
}
  return (
    <Button onClick={() => goToScroll(number)} 
    style={{
      opacity: scrollActive===number ? 1 : 0.4
    }}>
      
       
        {
          scrollActive === number  ?
          <>
          <Line/>
            <Column>
              0{number}
              <Span>{text}</Span>
            </Column>
          </>
          :
          <>
          <Line/>
            0{number}
          </>
        }
    </Button>
  )
}

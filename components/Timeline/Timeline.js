import React from 'react'
import { useState } from 'react'
import { ButtonTimeline } from '../ButtonTimeline/ButtonTimeline'
import { ContainerTimeLine } from './timelineStyle'

const data = [
    {
        number: 1,
        text: 'TANGO D10S'
    },
    {
        number: 2,
        text: 'INTEL'
    },
    {
        number: 3,
        text: 'CCA'
    },
    {
        number: 4,
        text: 'QUE HACEMOS'
    },
    {
        number: 5,
        text: 'CONTACTO'
    }
]

export const Timeline = () => {
    const [scrollActive, setScrollActive] = useState(false)

  return (
    <ContainerTimeLine>
        {
            data.map(e=>(
                <ButtonTimeline key={e.number} number={e.number} text={e.text} scrollActive={scrollActive} setScrollActive={setScrollActive}/>
            ))
        }
        
    </ContainerTimeLine>
  )
}

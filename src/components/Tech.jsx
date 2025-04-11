import React from 'react';
import { BallCanvas} from './canvas';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';


const Tech = () => {
  return (
    <div className='flex flex-wrap justify-center gap-10'>
      {technologies.map((technology,index)=>(
        <div
        key={technology.name}
         className='w-28 h-28'
         >
          <BallCanvas key={technology.name || index} icon={technology.icon} />
        </div>
      ))}
    </div>
  )
}

export default SectionWrapper(Tech,"");
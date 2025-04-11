import React from 'react';
import { backend } from '../assets';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const Resume = () => {
  return (
    <div className='w-full mt-5 max-h-screen relative'>
      <div className='text-[15px] font-semibold text-white-100'>MY</div>
      <div className='text-[60px] font-extrabold'>Resume.</div>

      <Tilt className="xs:w-[250px] mt-11 min-w-full mx-auto">
        <motion.div
          variants={fadeIn("right", "spring", 0.5 * 1, 0.75)}
          className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
        >
          <div
            options={{
              max: 45,
              scale: 1,
              speed: 450
            }}
            className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex flex-col justify-evenly items-center'
          >
            <img src={backend} alt="resume" className='w-16 h-16 object-contain' />
            <h3
  className='text-white text-[20px] font-bold text-center cursor-pointer'
  onClick={() => window.open("https://drive.google.com/file/d/1mIVIblxmIgfwDNh5Iq54A3ZXyXtx9JlH/view?usp=drivesdk ")}
>
  Click Here
</h3>
          </div>
        </motion.div>
      </Tilt>
    </div>
  );
};

export default SectionWrapper(Resume, "resume");

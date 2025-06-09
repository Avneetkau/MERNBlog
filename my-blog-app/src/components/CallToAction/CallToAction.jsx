import { Button } from 'flowbite-react';
import React from 'react';

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-red-500 justify-center items-center rounded-tl-3xl rounded-br-3xltext-center">
      <div className="flex-1 justify-center flex flex-col">
      <h2 className="text-3xl text-serif"> Hi, I am Full stack developer</h2><br/>
      <p className="text-gray-500 my-2 text-2xl">Let's connect for new creation</p>
      <Button  className="rounded-tl-xl rounded-bl-none mt-5 bg-red-500 hover:bg-red-900 "><a href="https://www.linkedin.com/in/avneet-kaur-271953225/" target="_blank"
      rel="noopener noreferrer">Know me more</a></Button>
      </div>
      <div className="p-7 flex-1 ">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuO-UMRwuERw-_rnkn_dJg1HSe-m4NImg79g&s" className="w-[300px] h-[300px] object-cover"/>
      </div>
    </div>
  );
}

export default CallToAction;

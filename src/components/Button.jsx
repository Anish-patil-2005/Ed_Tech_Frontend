import React from 'react'

function Button({button_name,onclick,type}) {
  return (
    <button type={type} onClick={onclick} className="bg-[#8a4baf] text-white px-5 py-1.5 rounded-[5px] text-[18px] mt-2 cursor-pointer hover:bg-[#5f357e] transition-colors duration-300">
    {button_name}
    </button>
  )
}

export default Button

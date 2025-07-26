import React from 'react'

const Testimonials = () => {
    const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];


  return (
    <>
        {/* testimonials */}
        <section className='py-[80px] px-0 text-center'>
            <h2 className='text-[32px] text-[#8a4baf] mb-[30px] '>What our students say !</h2>
            {/* testimonials - cards */}
            <div className='flex flex-wrap justify-center gap-[30px]'>
                {
                    testimonialsData.map((e)=>(
                        <div className='bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] p-[20px] rounded-[10px] w-[300px] text-left flex flex-col items-center max-md:w-[80%] max-md:text-center' key={e.id}>
                            {/* student image */}
                            <div >
                                <img className='w-[80px] h-[80px] rounded-full object-cover mb-[10px]' src={e.image} alt="" />
                            </div>
                            {/* student message */}
                            <p className='text-[16px] text-[#333] mb-[10px]'>{e.message}</p>
                            {/* student info */}
                            <div className='text-center '>
                                <p className='text-[18px] font-bold text-[#8a4baf] mb-[5px]'>{e.name}</p>
                                <p className='text-[14px] text-[#666]'>{e.position}</p>
                            </div>
                                
                        </div>
                    ))
                }
            </div>
        </section>
    </>
  )
}

export default Testimonials

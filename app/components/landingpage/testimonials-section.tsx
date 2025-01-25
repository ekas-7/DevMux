"use client"

import ScrollableTestimonials from "./testimonials/sctest";
interface testiProp{
  id?:string;
}
export function TestimonialsSection({id}:testiProp) {
  return (
    <div className="bg-black mb-20 mt-[10rem]" id ={id} >
      <div className="text-center px-4 sm:px-8 max-w-7xl mx-auto mb-4 " >
        <h1 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white">
          See What People Say About DevMux
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[6rem] font-bold mt-4 leading-tight">
          <span className="bg-cosmic-drift bg-clip-text text-transparent">
            Testimonials
          </span>
        </h2>
      </div>
    
      
        <ScrollableTestimonials />
    
    </div>
  );
}

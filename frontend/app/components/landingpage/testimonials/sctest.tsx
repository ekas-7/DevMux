import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  title: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    title: "CEO, Tech Innovations",
    quote: "This product transformed our workflow completely. Incredible solution!",
  },
  {
    name: "Jane Smith",
    title: "Marketing Director",
    quote: "Seamless integration and exceptional customer support. Highly recommended.",
  },
  {
    name: "Alex Wong",
    title: "Startup Founder",
    quote: "Game-changing technology that solved our biggest challenges.",
  },
  {
    name: "Emily Chen",
    title: "Product Manager",
    quote: "Innovative approach that truly understands our business needs.",
  },
  {
    name: "Michael Rodriguez",
    title: "CTO",
    quote: "Scalable solution that adapts to our evolving tech landscape.",
  },
];

const TestimonialCard: React.FC<Testimonial> = ({ name, title, quote }) => (
    <div className="bg-black/80 border border-gray-800 p-8 rounded-lg text-white my-6 flex-shrink-0 backdrop-blur-xl hover:border-blue-600">
    <div className="flex items-center mb-6 space-x-6">
      <Avatar className="w-12 h-12">
        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-bold text-xl">{name}</h3>
        <p className="text-gray-400 text-sm">{title}</p>
      </div>
    </div>
    <p className="italic leading-relaxed">&#34;{quote}&#34;</p>
  </div>
  
  
);

const ScrollableTestimonials: React.FC = () => {
  return (
    <div className="  flex justify-center items-center p-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex space-x-4 h-[600px] overflow-hidden">
        <div className="flex flex-col animate-scroll-up">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`left-${index}`} {...testimonial} />
          ))}
        </div>

        <div className="flex flex-col animate-scroll-down">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`center-${index}`} {...testimonial} />
          ))}
        </div>

        <div className="flex flex-col animate-scroll-up">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`right-${index}`} {...testimonial} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollUp {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
        @keyframes scrollDown {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-scroll-up {
          animation: scrollUp 40s linear infinite;
        }
        .animate-scroll-down {
          animation: scrollDown 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollableTestimonials;

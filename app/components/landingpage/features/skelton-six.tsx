import Image from "next/image";

export const SkeletonSix = () => {
  return (
    <div className="flex items-center justify-center h-[80%] overflow-hidden">
      {/* Scrolling container */}
      <div className="flex animate-scroll space-x-4">
        {/* Original images */}
        <Image src="/LLM.svg" alt="LLM" width={250} height={250} />
        <Image src="/LLM.svg" alt="LLM" width={250} height={250} />
        <Image src="/LLM.svg" alt="LLM" width={250} height={250} />
        <Image src="/LLM.svg" alt="LLM" width={250} height={250} />
        {/* Duplicate images */}
        <Image src="/LLM.svg" alt="LLM" width={250} height={250} />
        <Image src="/LLM.svg" alt="LLM" width={250} height={250} />
        <Image src="/LLM.svg" alt="LLM" width={250} height={250} />
        <Image src="/LLM.svg" alt="LLM" width={250} height={250} />
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 10s linear infinite;
          display: flex;
          width: calc(250px * 8); /* Width = number of images × image width */
        }
      `}</style>
    </div>
  );
};

import { motion } from "framer-motion";
import Image from "next/image";

export const SkeletonTwo = () => {
    const images = [
      '/assest/img3.jpg',
      '/assest/img.jpg',
      
      '/assest/img1.jpg',
      '/assest/img3.jpg',
      '/assest/img.jpg',
      
      '/assest/img1.jpg',
      
    ]
  
    const imageVariants = {
      whileHover: {
        scale: 1.1,
        rotate: 0,
        zIndex: 100,
      },
      whileTap: {
        scale: 1.1,
        rotate: 0,
        zIndex: 100,
      },
    }
    return (
      <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
        <div className="flex flex-row -ml-20">
          {images.map((image, idx) => (
            <motion.div
              variants={imageVariants}
              key={"images-first" + idx}
              style={{
                rotate: Math.random() * 20 - 10,
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt="bali images"
                width="500"
                height="500"
                className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex flex-row">
          {images.map((image, idx) => (
            <motion.div
              key={"images-second" + idx}
              style={{
                rotate: Math.random() * 20 - 10,
              }}
              variants={imageVariants}
              whileHover="whileHover"
              whileTap="whileTap"
              className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt="bali images"
                width="500"
                height="500"
                className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
              />
            </motion.div>
          ))}
        </div>
  
        <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
        <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
      </div>
    )
  }
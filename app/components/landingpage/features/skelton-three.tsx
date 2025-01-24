import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const SkeletonThree = () => {
    return (
      <Link
        href="https://www.youtube.com/watch?v=GfUFaTmD7oo"
        target="__blank"
        className="relative flex gap-10 h-full group/image"
      >
        <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
          <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
            <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " />
            <Image
              src='/thumbnail.png'
              alt="header"
              width={800}
              height={800}
              className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
            />
          </div>
        </div>
      </Link>
    )
  }
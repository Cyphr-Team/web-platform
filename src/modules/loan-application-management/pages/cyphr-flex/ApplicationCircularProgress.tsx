import { type ReactNode } from "react"

interface ApplicationCircularProgressProps {
  percent: number
  text: ReactNode
}

export function ApplicationCircularProgress({
  percent,
  text
}: ApplicationCircularProgressProps) {
  const r = 20
  const miniR = r - 2.5

  const P = Math.PI * 2 * r
  const miniP = Math.PI * 2 * miniR

  const progress = percent * P
  const miniProgress = percent * miniP

  return (
    <div className="relative h-[332px] w-[332px]">
      <span>
        <svg className="h-full w-full" viewBox="22 22 44 44">
          <circle
            className="stroke-current text-white opacity-20"
            cx="44"
            cy="44"
            fill="none"
            pathLength={P}
            r={r}
            strokeWidth="2"
          />
        </svg>
      </span>

      <span className="absolute w-full h-full top-0 left-0 origin-center -rotate-90">
        <svg className="h-full w-full text-[#B3F00D]" viewBox="22 22 44 44">
          <circle
            className="stroke-current transition-all duration-1000 ease-out"
            cx="44"
            cy="44"
            fill="none"
            r={r}
            strokeDasharray={P}
            strokeDashoffset={P - progress}
            strokeWidth="2"
          />
        </svg>
      </span>

      <div className="h-full w-full -mt-[100%] absolute flex justify-center items-center flex-col">
        {new Array(2).fill(null).map((_, idx) => (
          <div
            key={idx}
            className="absolute h-[83%]"
            style={{ transform: `rotate(${(360 / 2) * idx}deg)` }}
          >
            <div className="bg-[#DFFF86] w-[3px] h-[5%]" />
          </div>
        ))}
      </div>

      <span className="absolute w-full h-full top-0 left-0 origin-center -rotate-[87deg]">
        <svg className="h-full w-full text-[#01B604]" viewBox="22 22 44 44">
          <circle
            className="stroke-current transition-all duration-1000 ease-out"
            cx="44"
            cy="44"
            fill="none"
            r={miniR}
            strokeDasharray={miniP}
            strokeDashoffset={miniP - miniProgress}
            strokeLinecap="round"
            strokeWidth="1"
          />
        </svg>
      </span>

      <span className="absolute w-full h-full top-0 left-0 -rotate-[93deg]">
        <svg className="h-full w-full text-[#0026157e]" viewBox="22 22 44 44">
          <circle
            className="stroke-current"
            cx="44"
            cy="44"
            fill="none"
            pathLength={P}
            r={r}
            strokeDasharray={`${(P - (P / 29) * 24) / 24} ${P / 29}`}
            strokeDashoffset={4.2}
            strokeWidth="2"
          />
        </svg>
      </span>

      <span className="h-full w-full -mt-[100%] absolute flex justify-center items-center flex-col">
        {text}
      </span>
    </div>
  )
}

export function CircularProgress({
  percent,
  text
}: {
  percent: number
  text: string
}) {
  const r = 20
  const P = Math.PI * 2 * r

  const progress = percent * P

  return (
    <div className="relative h-10 w-10">
      <span>
        <svg className="h-full w-full" viewBox="22 22 44 44">
          <circle
            className="stroke-current text-gray-200"
            cx="44"
            cy="44"
            fill="none"
            r={r}
            strokeDasharray={P}
            strokeWidth="4"
          />
          <text
            alignmentBaseline="middle"
            fontSize="12"
            textAnchor="middle"
            x="44"
            y="44"
          >
            {text}
          </text>
        </svg>
      </span>
      <span className="absolute w-full h-full top-0 left-0 origin-center -rotate-90">
        <svg className="h-full w-full text-primary" viewBox="22 22 44 44">
          <circle
            className="stroke-current"
            cx="44"
            cy="44"
            fill="none"
            r={r}
            strokeDasharray={P}
            strokeDashoffset={P - progress}
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>
      </span>
    </div>
  )
}

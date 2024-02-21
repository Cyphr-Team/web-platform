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
            r={r}
            fill="none"
            strokeWidth="4"
            strokeDasharray={P}
          />
          <text
            x="44"
            y="44"
            fontSize="12"
            textAnchor="middle"
            alignmentBaseline="middle"
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
            r={r}
            fill="none"
            strokeWidth="4"
            strokeDasharray={P}
            strokeDashoffset={P - progress}
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  )
}

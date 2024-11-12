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
    <div className="relative size-10">
      <span>
        <svg className="size-full" viewBox="22 22 44 44">
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
      <span className="absolute left-0 top-0 size-full origin-center -rotate-90">
        <svg className="size-full text-primary" viewBox="22 22 44 44">
          <circle
            className="stroke-current text-[#4F6161]"
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

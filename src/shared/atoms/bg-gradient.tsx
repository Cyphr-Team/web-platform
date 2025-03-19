export function BgGradient() {
  return (
    <div
      className="fixed -z-10"
      style={{
        height: "calc(100% + 40rem)",
        top: "50%",
        right: "-100%",
        width: "300%",
        background:
          "radial-gradient(farthest-side at 50% 50%, #b3f00d, transparent)"
      }}
    />
  )
}

interface MainLayoutProps {
  children: React.ReactNode
}

export function PaymentLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col space-y-3xl border-b mt-xl">
        <h1 className="text-3xl font-semibold whitespace-nowrap pl-10 py-6">
          Enter Payment Details
        </h1>
      </div>
      <div className="h-full overflow-auto">{children}</div>
    </div>
  )
}

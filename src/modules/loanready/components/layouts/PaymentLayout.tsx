interface MainLayoutProps {
  children: React.ReactNode
}

export function PaymentLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex size-full flex-col">
      <div className="mt-xl flex flex-col space-y-3xl border-b">
        <h1 className="whitespace-nowrap py-6 pl-10 text-3xl font-semibold">
          Enter Payment Details
        </h1>
      </div>
      <div className="h-full overflow-auto">{children}</div>
    </div>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoanInformationCard } from "../atoms/LoanInformationCard"
import avatar from "/avatar.svg"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { SkeletonCard } from "@/components/ui/skeleton"

const BasicInformationSkeleton = () => {
  return (
    <div className="flex w-full px-4xl gap-3xl">
      <div className="flex space-x-xl">
        <SkeletonCard isCircle className="flex flex-row" />
      </div>
      <div className="flex gap-xl md:gap-2xl lg:gap-3xl flex-1">
        <SkeletonCard numberOfLines={0} className="flex-1 w-auto" />
        <SkeletonCard numberOfLines={0} className="flex-1 w-auto" />
        <SkeletonCard numberOfLines={0} className="flex-1 w-auto" />
      </div>
    </div>
  )
}

export const BasicInformation = () => {
  const { isLoading } = useLoanApplicationDetailContext()

  if (isLoading) return <BasicInformationSkeleton />

  return (
    <div className="flex w-full px-4xl flex-wrap gap-3xl">
      <div className="flex space-x-xl">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatar} alt="Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-1">
          <p className="text-xl font-semibold">Latte Larry</p>
          <p className="font-normal text-text-tertiary">
            Owner and Chief Barista
          </p>
          <p className="font-normal text-text-tertiary">larry@borrower.com</p>
        </div>
      </div>
      <div className="flex gap-xl md:gap-2xl lg:gap-3xl flex-1">
        <LoanInformationCard title="Loan Type" content="Micro Loan" />
        <LoanInformationCard title="Loan Amount Requested" content="$25,000" />
        <LoanInformationCard title="Location" content="Kansas City, MO" />
      </div>
    </div>
  )
}

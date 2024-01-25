import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoanInformationCard } from "../atoms/LoanInformationCard"
import avatar from "/avatar.svg"

export const BasicInformation = () => {
  return (
    <div className="flex space-x-3xl w-full px-4xl">
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
      <LoanInformationCard title="Loan Type" content="Micro Loan" />
      <LoanInformationCard title="Loan Amount Requested" content="$25,000" />
      <LoanInformationCard title="Location" content="Kansas City, MO" />
    </div>
  )
}

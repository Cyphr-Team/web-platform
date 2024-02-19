import { PayStubCapturedType } from "@/modules/loan-application-management/constants/types/document"
import { EmployeeInformation } from "../../molecules/capture/paystub/EmployeeInformation"
import { EmployerInformation } from "../../molecules/capture/paystub/EmployerInformation"
import { PayStubInformation } from "../../molecules/capture/paystub/PayStubInformation"
import { PayStubEarnings } from "../../molecules/capture/paystub/PayStubEarnings"
import { PayStubDistribution } from "../../molecules/capture/paystub/PayStubDistribution"
import { PayStubDeduction } from "../../molecules/capture/paystub/PayStubDeduction"

type Props = {
  data: PayStubCapturedType
}

export const PayStubDocument: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <EmployeeInformation data={data.employeeInformation} />
      <EmployerInformation data={data.employerInformation} />
      <PayStubInformation data={data.payStubDetail} />
      <PayStubDistribution data={data.payDistribution} />
      <PayStubEarnings data={data.earnings} />
      <PayStubDeduction data={data.deductions} />
    </div>
  )
}

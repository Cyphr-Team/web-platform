import { Button } from "@/components/ui/button"
import { type KybDetailLiens } from "../../constants/type"
import { LienStatus } from "../atoms/LienStatus"
import { Card } from "@/components/ui/card"

interface Props {
  lienDetails?: KybDetailLiens
}

export const KybLienDetails: React.FC<Props> = ({ lienDetails }) => {
  return (
    <Card className="flex h-fit flex-1 flex-col gap-y-4xl p-4xl">
      {" "}
      <p className="text-2xl font-semibold">Liens</p>
      <div className="flex flex-col gap-y-sm bg-gray-100 p-4xl">
        <p className="text-lg font-medium">File a lien</p>
        <p className="text-sm font-medium text-text-secondary">
          Order a UCC1 lien for this business
        </p>
        <Button className="mt-4xl w-fit rounded-lg bg-error">
          File a lien
        </Button>
      </div>{" "}
      <div className="flex flex-wrap gap-lg">
        <div className="flex flex-1 flex-col gap-lg bg-error-100 p-xl">
          <p className="text-3xl text-error-600">{lienDetails?.open ?? 0}</p>
          <p className="text-sm font-medium text-text-secondary">Open</p>
        </div>{" "}
        <div className="flex flex-1 flex-col gap-lg bg-gray-100 p-xl">
          <p className="text-3xl text-gray-500">{lienDetails?.closed ?? 0}</p>
          <p className="text-sm font-medium text-text-secondary">Closed</p>
        </div>
      </div>
      {!!lienDetails?.data?.length && (
        <div className="grid grid-cols-4 gap-x-3xl">
          <div className="flex flex-col gap-y-3xl">
            <p className="text-sm">Type • Date</p>
            {lienDetails?.data?.map((item, index) => (
              <p key={index} className="flex flex-col text-sm">
                <span>{item.type}</span>
                <span>{item.date}</span>
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-y-4xl">
            <p className="text-sm">Status</p>
            {lienDetails?.data?.map((item, ind) => (
              <LienStatus key={ind} status={item.status} />
            ))}
          </div>
          <div className="col-span-2 flex flex-col gap-y-4xl">
            <p className="text-sm">Secured Parties</p>
            {lienDetails?.data?.map((item, index) => (
              <p key={index} className="flex flex-col text-sm">
                {item.securedParties.map((val, ind) => (
                  <span key={ind}>{val}</span>
                ))}
              </p>
            ))}
          </div>
        </div>
      )}
      <Button className="w-fit rounded-lg border border-gray-300 bg-white px-lg py-md text-black">
        Download CSV
      </Button>
    </Card>
  )
}

import { Button } from "@/components/ui/button"
import { KybDetailLiens } from "../../constants/type"
import { LienStatus } from "../atoms/LienStatus"
import { Card } from "@/components/ui/card"

type Props = {
  lienDetails?: KybDetailLiens
}

export const KybLienDetails: React.FC<Props> = ({ lienDetails }) => {
  return (
    <Card className="h-fit p-4xl gap-y-4xl flex flex-col">
      {" "}
      <p className="text-2xl font-semibold">Liens</p>
      <div className="flex flex-col p-4xl gap-y-sm bg-gray-100">
        <p className="text-lg font-medium">File a lien</p>
        <p className="text-sm font-medium text-text-secondary">
          Order a UCC1 lien for this business
        </p>
        <Button className="w-fit mt-4xl rounded-lg bg-error">
          File a lien
        </Button>
      </div>{" "}
      <div className="grid grid-cols-2 gap-x-lg">
        <div className="flex flex-col p-xl gap-y-lg bg-error-100">
          <p className="text-3xl text-error-600">{lienDetails?.open ?? 0}</p>
          <p className="text-sm font-medium text-text-secondary">Open</p>
        </div>{" "}
        <div className="flex flex-col p-xl gap-y-lg bg-gray-100">
          <p className="text-3xl text-gray-500">{lienDetails?.closed ?? 0}</p>
          <p className="text-sm font-medium text-text-secondary">Closed</p>
        </div>
      </div>
      {!!lienDetails?.data?.length && (
        <div className="grid grid-cols-4 gap-x-3xl">
          <div className="flex flex-col gap-y-3xl">
            <p className="text-sm">Type • Date</p>
            {lienDetails?.data?.map((item, index) => (
              <p key={index} className="text-sm flex flex-col">
                <span>{item.type}</span>
                <span>{item.date}</span>
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-y-4xl">
            <p className="text-sm">Status</p>
            {lienDetails?.data?.map((item, ind) => (
              <LienStatus status={item.status} key={ind} />
            ))}
          </div>
          <div className="col-span-2 flex flex-col gap-y-4xl">
            <p className="text-sm">Secured Parties</p>
            {lienDetails?.data?.map((item, index) => (
              <p key={index} className="text-sm flex flex-col">
                {item.securedParties.map((val, ind) => (
                  <span key={ind}>{val}</span>
                ))}
              </p>
            ))}
          </div>
        </div>
      )}
      <Button className="px-lg py-md bg-white text-black border-gray-300 rounded-lg border w-fit">
        Download CSV
      </Button>
    </Card>
  )
}

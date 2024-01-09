import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { useCustomerFeedback } from "../hooks/useCustomerFeedbackCarousel"

export function SignUpCustomerFeedback() {
  const { customerFeedBack, onNext, onPrevious } = useCustomerFeedback()

  return (
    <div className="relative hidden h-full flex-col text-white lg:flex mr-6">
      <div className="w-full absolute inset-0 bg-zinc-900 mt-6 mb-6 rounded-2xl self-center overflow-hidden">
        <img
          src={customerFeedBack.photo}
          className="rounded-md object-cover h-full w-full"
          alt="Customer feedback photo"
          loading="lazy"
          width="100%"
          height="100%"
        />
      </div>

      <div className="mt-auto mb-6">
        <div className="p-8 bg-zinc-400 rounded-b-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 ">
          <blockquote className="space-y-2 mb-8">
            <p className="font-semibold text-3xl line-clamp-3">
              &ldquo;{customerFeedBack.feedback}&rdquo;
            </p>
          </blockquote>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between space-x-4">
              <h2 className="text-4xl font-semibold tracking-tight truncate">
                {customerFeedBack.name}
              </h2>

              <div className="flex space-x-1">
                {Array(customerFeedBack.rating)
                  .fill(0)
                  .map((_, key) => (
                    <Star key={key} fill="white" size={20} />
                  ))}
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <div className="min-w-0">
                <p className="text-lg font-semibold truncate">
                  {customerFeedBack.role}
                </p>
                <p className="text-base mt-1 truncate">
                  {customerFeedBack.cap}
                </p>
              </div>
              <div className="flex gap-8">
                <Button
                  variant="outline"
                  className="border-white bg-transparent rounded-full w-[56px] h-[56px]"
                  onClick={onPrevious}
                >
                  <ArrowLeft />
                </Button>

                <Button
                  variant="outline"
                  className="border-white bg-transparent rounded-full w-[56px] h-[56px]"
                  onClick={onNext}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

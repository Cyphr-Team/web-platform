import { CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import appInsightCashFlow from "@/assets/app-insight-cash-flow.png"

function LoginAppInsightDescription() {
  return (
    <div className="flex flex-col space-y-md text-center mb-8">
      <h3 className="text-xl">Welcome to Foresight</h3>
      <p className="text-[#D0F8AB]">
        Your portal to fair-access alternative financing
      </p>
    </div>
  )
}

export function LoginAppInsight() {
  return (
    <div className="relative hidden h-full flex-col text-white lg:flex items-center">
      <div className="w-full absolute inset-0 bg-[#326212]"></div>
      <Carousel className="w-full max-w-lg m-auto">
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <CardContent className="flex items-center justify-center p-6">
                  <img src={appInsightCashFlow} alt="App insight" />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <LoginAppInsightDescription />

        <div className="relative flex justify-center max-w-64 m-auto">
          <CarouselPrevious
            variant="ghost"
            className="hover:bg-transparent hover:text-white"
          />
          <CarouselDots />
          <CarouselNext
            variant="ghost"
            className="hover:bg-transparent hover:text-white"
          />
        </div>
      </Carousel>
    </div>
  )
}

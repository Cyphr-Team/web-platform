import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import {
  Block,
  ComponentMapper,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate"
import { RHFProvider } from "@/modules/form-template/providers"
import { Option } from "@/types/common.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

const enum FormField {
  USER_ID = "userId",
  COMPANY_NAME = "companyName",
  COMPANY_DESCRIPTION = "companyDescription",
  BUSINESS_STAGE = "businessStage",
  FISCAL_YEAR_CYCLE = "fiscalYearCycle",
  FIRST_YEAR_OF_FORECAST = "firstYearOfForecast",
  LENGTH_OF_FORECAST = "lengthOfForecast",
  MONTHLY_DETAIL = "monthlyDetail"
}

const BUSINESS_STAGE_OPTIONS: Option[] = [
  {
    label: "I have a business idea",
    value: "BUSINESS_IDEA"
  },
  {
    label: "I'm staring a business",
    value: "STARTING_BUSINESS"
  },
  {
    label: "I'm running a business",
    value: "RUNNING_BUSINESS"
  }
]

const FISCAL_YEAR_CYCLE_OPTIONS: Option[] = [
  {
    label: "January",
    value: "JANUARY"
  },
  {
    label: "February",
    value: "FEBRUARY"
  },
  {
    label: "March",
    value: "MARCH"
  },
  {
    label: "April",
    value: "APRIL"
  },
  {
    label: "May",
    value: "MAY"
  },
  {
    label: "June",
    value: "JUNE"
  },
  {
    label: "July",
    value: "JULY"
  },
  {
    label: "August",
    value: "AUGUST"
  },
  {
    label: "September",
    value: "SEPTEMBER"
  },
  {
    label: "October",
    value: "OCTOBER"
  },
  {
    label: "November",
    value: "NOVEMBER"
  },
  {
    label: "December",
    value: "DECEMBER"
  }
]

const FIRST_YEAR_OF_FORECAST_OPTIONS: Option[] = [
  {
    label: "2021",
    value: "2021"
  },
  {
    label: "2022",
    value: "2022"
  },
  {
    label: "2023",
    value: "2023"
  },
  {
    label: "2024",
    value: "2024"
  },
  {
    label: "2025",
    value: "2025"
  }
]

const LENGTH_OF_FORECAST_OPTIONS: Option[] = [
  {
    label: "3 years",
    value: "3"
  },
  {
    label: "5 years",
    value: "5"
  }
]

const CreateNewCompanyPage = () => {
  const schema = z.object({
    [FormField.COMPANY_NAME]: z.string(),
    [FormField.COMPANY_DESCRIPTION]: z.string(),
    [FormField.BUSINESS_STAGE]: z.string(),
    [FormField.FISCAL_YEAR_CYCLE]: z.string(),
    [FormField.FIRST_YEAR_OF_FORECAST]: z.string(),
    [FormField.LENGTH_OF_FORECAST]: z.string(),
    [FormField.MONTHLY_DETAIL]: z.string()
  })

  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema)
  })

  const blocks: Block[] = [
    {
      type: FieldType.TEXT,
      name: FormField.COMPANY_NAME,
      props: {
        label: "Company name",
        placeholder: "Enter your company name",
        className: "col-span-6",
        required: true
      }
    },
    {
      type: FieldType.SELECT,
      name: FormField.BUSINESS_STAGE,
      props: {
        label: "Business stage",
        placeholder: "Enter your Business stage",
        className: "col-span-6",
        required: true,
        options: BUSINESS_STAGE_OPTIONS
      }
    },
    {
      type: FieldType.TEXT,
      name: FormField.COMPANY_DESCRIPTION,
      props: {
        label: "Company description",
        className: "col-span-12",
        required: true,
        multiline: true,
        description:
          "Which month does your fiscal year start? January is the most common."
      }
    },
    {
      type: FieldType.SELECT,
      name: FormField.FISCAL_YEAR_CYCLE,
      props: {
        label: "Fiscal year cycle",
        placeholder: "Enter your fiscal year cycle",
        className: "col-span-6",
        required: true,
        options: FISCAL_YEAR_CYCLE_OPTIONS,
        description:
          "Which month does your fiscal year start? January is the most common."
      }
    },
    {
      type: FieldType.SELECT,
      name: FormField.FIRST_YEAR_OF_FORECAST,
      props: {
        label: "First year of forecast",
        placeholder: "Enter your first year of forecast",
        className: "col-span-6",
        required: true,
        options: FIRST_YEAR_OF_FORECAST_OPTIONS,
        description:
          "When do you expect to start executing your business plan? Make your best guess. You can change this later."
      }
    },
    {
      type: FieldType.SELECT,
      name: FormField.LENGTH_OF_FORECAST,
      props: {
        label: "Length of forecast",
        placeholder: "Enter your length of forecast",
        className: "col-span-6",
        required: true,
        options: LENGTH_OF_FORECAST_OPTIONS,
        description: "How many full years do you want your forecast to cover?"
      }
    },
    {
      type: FieldType.SELECT,
      name: FormField.MONTHLY_DETAIL,
      props: {
        label: "Monthly detail",
        className: "col-span-6",
        required: true,
        options: LENGTH_OF_FORECAST_OPTIONS,
        description:
          "How many of those years do you want to use monthly vs. annual detail?"
      }
    }
  ]

  const navigate = useNavigate()

  const onSubmit = useCallback(() => {
    console.log("submitted")
  }, [])

  const onCancelled = useCallback(() => {
    navigate(APP_PATH.LOAN_APPLICATION.FINANCIAL.index)
  }, [navigate])

  return (
    <div className="mx-auto w-full max-w-screen-md  p-4xl">
      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border bg-card text-card-foreground shadow-sm flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8">
          <div className="flex justify-between items-center">
            <h5 className="text-lg font-semibold">Create a New Company</h5>
            <div className="flex">
              <Button
                variant="secondary"
                className="mr-4"
                onClick={onCancelled}
              >
                Cancel
              </Button>
              <Button className="">Create Company</Button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-12 gap-4">
              {blocks.map(({ type, props, name }) => {
                const Component = ComponentMapper[type]
                return (
                  <Component
                    key={name}
                    className="col-span-12"
                    name={name}
                    {...props}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </RHFProvider>
    </div>
  )
}

export default CreateNewCompanyPage

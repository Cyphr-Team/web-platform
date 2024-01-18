import { useCallback, useMemo, useState } from "react"

const MAX_FEEDBACK_SIZE = 5

const feedbackData = [
  {
    photo: "https://picsum.photos/700",
    feedback:
      "Foresight has saved me months of loan application work. I was able to get access to much-needed capital in critical times.",
    name: "Carry Cappuccino",
    role: "Founder and Lead Barista",
    cap: "No Cap Cappuccino",
    rating: 5
  },
  {
    photo: "https://picsum.photos/800",
    feedback: "The team was prompt in addressing my concerns. Good job!",
    name: "Jane Smith",
    role: "Client",
    cap: "Neutral",
    rating: 3
  },
  {
    photo: "https://picsum.photos/900",
    feedback:
      "Excellent customer support. I will definitely recommend to others. The product exceeded my expectations, and the team went above and beyond to assist me with any queries. Truly impressed!",
    name: "Sam Johnson",
    role: "User",
    cap: "Positive",
    rating: 5
  },
  {
    photo: "https://picsum.photos/500",
    feedback:
      "Slight issue initially, but the team resolved it quickly. Impressed!",
    name: "Alice Williams",
    role: "Customer",
    cap: "Positive",
    rating: 4
  },
  {
    photo: "https://picsum.photos/400",
    feedback:
      "Overall, a good experience. Looking forward to future collaborations. The platform's features are user-friendly, and the customer service is responsive and helpful.",
    name: "Very long long customer name like Huy Le",
    role: "Very short but long long long long customer role like Engineer",
    cap: "Very short but long long long long customer role like Cap Very short but long long long long customer role like Engineer",
    rating: 4
  }
]

export const useCustomerFeedback = () => {
  const [feedBackIndex, setFeedBackIndex] = useState(0)

  const customerFeedBack = useMemo(() => {
    return feedbackData[feedBackIndex]
  }, [feedBackIndex])

  const onNext = useCallback(() => {
    setFeedBackIndex((preIndex) => (preIndex + 1) % MAX_FEEDBACK_SIZE)
  }, [])

  const onPrevious = useCallback(() => {
    setFeedBackIndex(
      (preIndex) => (preIndex - 1 + MAX_FEEDBACK_SIZE) % MAX_FEEDBACK_SIZE
    )
  }, [])

  return { feedbackData, customerFeedBack, onNext, onPrevious }
}

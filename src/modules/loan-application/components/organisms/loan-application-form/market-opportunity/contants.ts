import { MarketOpportunityFormResponse } from "./type"

export const questions = [
  {
    question: "What market do you serve (size, target, demographic, etc.)?",
    field: "marketServed"
  },
  {
    question:
      "Who are your direct and indirect competitors? How is your product or service unique?",
    field: "competitors"
  },
  {
    question:
      "How will you access your market? How will you find/identify potential customers?",
    field: "accessMarket"
  }
]

export const FAKE_DATA = {
  id: "1",
  marketServed:
    "We serve the small and medium-sized enterprise (SME) market, which consists of businesses with 10 to 250 employees. Our target demographic includes business owners, sales managers, and customer service teams across various industries such as retail, professional services, and technology. The global SME market is vast, with millions of businesses in need of efficient CRM solutions.",
  competitors:
    "Our direct competitors include established CRM providers such as Salesforce, HubSpot, and Zoho CRM. These companies offer comprehensive CRM solutions with advanced features and integrations. However, their pricing models are often complex and expensive, making them less accessible to SMEs. Our indirect competitors are manual methods like spreadsheets and email, which lack the automation and scalability of dedicated CRM software. EasyCRM differentiates itself by offering a user-friendly interface, affordable pricing, and tailored features for SMEs.",
  accessMarket:
    "We will access our market through a multi-channel approach that combines online and offline strategies. Our online channels include digital marketing campaigns, social media advertising, and search engine optimization to reach potential customers through targeted messaging and content. Offline channels involve attending industry events, networking with business associations, and partnering with local consultants to promote our solution to SMEs. By leveraging a mix of digital and traditional marketing tactics, we aim to maximize our reach and engage with diverse segments of the SME market."
} as MarketOpportunityFormResponse

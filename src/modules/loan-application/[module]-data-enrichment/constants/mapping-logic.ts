// TODO: fetch from BE

export interface TransactionCategorization {
  plaidPrimaryCreditCategory: string
  plaidDetailedCreditCategory: string
  cyphrPrimaryCreditCategory: string
  cyphrDetailedCreditCategory: string
  cyphrFinancialCategory: string
}

export const TRANSACTION_MAPPING_LOGIC: TransactionCategorization[] = [
  {
    plaidPrimaryCreditCategory: "income",
    plaidDetailedCreditCategory: "income_salary",
    cyphrPrimaryCreditCategory: "revenue",
    cyphrDetailedCreditCategory: "revenue",
    cyphrFinancialCategory: "revenue_other"
  },
  {
    plaidPrimaryCreditCategory: "income",
    plaidDetailedCreditCategory: "income_government_income",
    cyphrPrimaryCreditCategory: "revenue",
    cyphrDetailedCreditCategory: "revenue",
    cyphrFinancialCategory: "revenue_other"
  },
  {
    plaidPrimaryCreditCategory: "income",
    plaidDetailedCreditCategory: "income_other",
    cyphrPrimaryCreditCategory: "revenue",
    cyphrDetailedCreditCategory: "revenue",
    cyphrFinancialCategory: "revenue_other"
  },
  {
    plaidPrimaryCreditCategory: "tax_refund",
    plaidDetailedCreditCategory: "tax_refund_tax_refund",
    cyphrPrimaryCreditCategory: "revenue",
    cyphrDetailedCreditCategory: "taxes",
    cyphrFinancialCategory: "revenue_other"
  },
  {
    plaidPrimaryCreditCategory: "interests_and_dividends",
    plaidDetailedCreditCategory:
      "interests_and_dividends_interests_and_dividends",
    cyphrPrimaryCreditCategory: "revenue",
    cyphrDetailedCreditCategory: "interest_income",
    cyphrFinancialCategory: "revenue_other"
  },
  {
    plaidPrimaryCreditCategory: "interest_payments",
    plaidDetailedCreditCategory: "interest_payments_interest_charged",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "interest_expense",
    cyphrFinancialCategory: "interest_expense"
  },
  {
    plaidPrimaryCreditCategory: "interest_payments",
    plaidDetailedCreditCategory: "interest_payments_interest_received",
    cyphrPrimaryCreditCategory: "revenue",
    cyphrDetailedCreditCategory: "revenue",
    cyphrFinancialCategory: "interest_income"
  },
  {
    plaidPrimaryCreditCategory: "bank_fees",
    plaidDetailedCreditCategory: "bank_fees_foreign_transaction_fees",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "fees",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "bank_fees",
    plaidDetailedCreditCategory: "bank_fees_other_bank_fees",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "fees",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "bank_penalties",
    plaidDetailedCreditCategory:
      "bank_penalties_cash_advance_and_overdraft_fees",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "fees",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "entertainment",
    plaidDetailedCreditCategory: "entertainment_events_and_tickets",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "entertainment",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "entertainment",
    plaidDetailedCreditCategory:
      "entertainment_music_video_games_tv_and_movies",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "entertainment",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "entertainment",
    plaidDetailedCreditCategory: "entertainment_casinos_and_gambling",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "entertainment",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "entertainment",
    plaidDetailedCreditCategory: "entertainment_other_entertainment",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "entertainment",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "dining",
    plaidDetailedCreditCategory: "dining_wine_bars_and_pubs",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "meals",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "dining",
    plaidDetailedCreditCategory: "dining_coffee",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "meals",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "dining",
    plaidDetailedCreditCategory: "dining_food_delivery",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "meals",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "dining",
    plaidDetailedCreditCategory: "dining_other_dining",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "meals",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "food_retail",
    plaidDetailedCreditCategory: "food_retail_liquor_stores",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "meals",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "food_retail",
    plaidDetailedCreditCategory: "food_retail_other",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "meals",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory: "general_merchandise_apparel_and_accessories",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory: "general_merchandise_convenience_stores",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory: "general_merchandise_department_stores",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory: "general_merchandise_discount_stores",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory:
      "general_merchandise_computers_and_electronics",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory: "general_merchandise_online_marketplaces",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory: "general_merchandise_sporting_goods",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory: "general_merchandise_furniture_and_hardware",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory:
      "general_merchandise_other_general_merchandise",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "medical",
    plaidDetailedCreditCategory: "medical_primary_care",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "medical",
    plaidDetailedCreditCategory: "medical_dental_and_vision",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "medical",
    plaidDetailedCreditCategory: "medical_pharmacies_and_supplements",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "medical",
    plaidDetailedCreditCategory: "medical_other_medical",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "personal_care",
    plaidDetailedCreditCategory: "personal_care_hair_and_beauty",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "personal_care",
    plaidDetailedCreditCategory: "personal_care_gyms_and_fitness_centers",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "pet_care_and_supplies",
    plaidDetailedCreditCategory: "pet_care_and_supplies_veterinary_services",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "pet_care_and_supplies",
    plaidDetailedCreditCategory: "pet_care_and_supplies_pet_supplies",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "childcare_and_education",
    plaidDetailedCreditCategory:
      "childcare_and_education_childcare_and_education",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_services",
    plaidDetailedCreditCategory:
      "general_services_accounting_and_financial_services",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "accounting",
    cyphrFinancialCategory: "operating_expense_accounting"
  },
  {
    plaidPrimaryCreditCategory: "general_services",
    plaidDetailedCreditCategory:
      "general_services_consulting_and_legal_services",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "legal",
    cyphrFinancialCategory: "operating_expense_legal"
  },
  {
    plaidPrimaryCreditCategory: "general_services",
    plaidDetailedCreditCategory: "general_services_religious_services",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_services",
    plaidDetailedCreditCategory: "general_services_other_services",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "governments_and_non_profit",
    plaidDetailedCreditCategory:
      "governments_and_non_profit_governments_and_non_profit",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "governments_and_non_profit",
    plaidDetailedCreditCategory: "governments_and_non_profit_donations",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "governments_and_non_profit",
    plaidDetailedCreditCategory:
      "governments_and_non_profit_other_governments_and_non_profit",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "travel",
    cyphrFinancialCategory: "operating_expense_travel"
  },
  {
    plaidPrimaryCreditCategory: "travel_and_transportation",
    plaidDetailedCreditCategory: "travel_and_transportation_public_transit",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "travel",
    cyphrFinancialCategory: "operating_expense_travel"
  },
  {
    plaidPrimaryCreditCategory: "travel_and_transportation",
    plaidDetailedCreditCategory:
      "travel_and_transportation_taxis_and_ride_shares",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "travel",
    cyphrFinancialCategory: "operating_expense_travel"
  },
  {
    plaidPrimaryCreditCategory: "travel_and_transportation",
    plaidDetailedCreditCategory: "travel_and_transportation_flights",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "travel",
    cyphrFinancialCategory: "operating_expense_travel"
  },
  {
    plaidPrimaryCreditCategory: "travel_and_transportation",
    plaidDetailedCreditCategory: "travel_and_transportation_automotive",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "travel",
    cyphrFinancialCategory: "operating_expense_travel"
  },
  {
    plaidPrimaryCreditCategory: "insurance_and_tax",
    plaidDetailedCreditCategory: "insurance_and_tax_tax_payment",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "tax",
    cyphrFinancialCategory: "taxes"
  },
  {
    plaidPrimaryCreditCategory: "bank_fees",
    plaidDetailedCreditCategory: "bank_fees_atm",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "fees",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "bank_penalties",
    plaidDetailedCreditCategory: "bank_penalties_insufficient_and_late_fees",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "fees",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "dining",
    plaidDetailedCreditCategory: "dining_dining",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "meals",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "food_retail",
    plaidDetailedCreditCategory: "food_retail_groceries",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "meals",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_merchandise",
    plaidDetailedCreditCategory: "general_merchandise_superstores",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "personal_care",
    plaidDetailedCreditCategory: "personal_care_other_personal_care",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "general_services",
    plaidDetailedCreditCategory: "general_services_home_improvement_services",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "opex_other",
    cyphrFinancialCategory: "operating_expense_other"
  },
  {
    plaidPrimaryCreditCategory: "travel_and_transportation",
    plaidDetailedCreditCategory: "travel_and_transportation_lodging",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "travel",
    cyphrFinancialCategory: "operating_expense_travel"
  },
  {
    plaidPrimaryCreditCategory: "travel_and_transportation",
    plaidDetailedCreditCategory:
      "travel_and_transportation_other_travel_and_transportation",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "travel",
    cyphrFinancialCategory: "operating_expense_travel"
  },
  {
    plaidPrimaryCreditCategory: "rent_and_utilities",
    plaidDetailedCreditCategory: "rent_and_utilities_gas_and_electricity",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "utilities",
    cyphrFinancialCategory: "operating_expense_utilities"
  },
  {
    plaidPrimaryCreditCategory: "rent_and_utilities",
    plaidDetailedCreditCategory: "rent_and_utilities_internet_and_cable",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "utilities",
    cyphrFinancialCategory: "operating_expense_utilities"
  },
  {
    plaidPrimaryCreditCategory: "rent_and_utilities",
    plaidDetailedCreditCategory: "rent_and_utilities_telecommunications",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "utilities",
    cyphrFinancialCategory: "operating_expense_utilities"
  },
  {
    plaidPrimaryCreditCategory: "rent_and_utilities",
    plaidDetailedCreditCategory: "rent_and_utilities_water",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "utilities",
    cyphrFinancialCategory: "operating_expense_utilities"
  },
  {
    plaidPrimaryCreditCategory: "rent_and_utilities",
    plaidDetailedCreditCategory: "rent_and_utilities_other_utilities",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "utilities",
    cyphrFinancialCategory: "operating_expense_utilities"
  },
  {
    plaidPrimaryCreditCategory: "rent_and_utilities",
    plaidDetailedCreditCategory: "rent_and_utilities_rent",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "rent",
    cyphrFinancialCategory: "operating_expense_rent"
  },
  {
    plaidPrimaryCreditCategory: "insurance_and_tax",
    plaidDetailedCreditCategory: "insurance_and_tax_insurance",
    cyphrPrimaryCreditCategory: "expense",
    cyphrDetailedCreditCategory: "insurance",
    cyphrFinancialCategory: "operating_expense_insurance"
  },
  {
    plaidPrimaryCreditCategory: "other",
    plaidDetailedCreditCategory: "other_other",
    cyphrPrimaryCreditCategory: "other",
    cyphrDetailedCreditCategory: "other",
    cyphrFinancialCategory: "na"
  },
  {
    plaidPrimaryCreditCategory: "unknown",
    plaidDetailedCreditCategory: "unknown_unknown",
    cyphrPrimaryCreditCategory: "other",
    cyphrDetailedCreditCategory: "other",
    cyphrFinancialCategory: "na"
  }
]

export function findByPlaidCategory(
  primaryOrDetailed: string
): TransactionCategorization {
  const found = TRANSACTION_MAPPING_LOGIC.find(
    (value) => value.plaidPrimaryCreditCategory === primaryOrDetailed
  )

  if (found) return found

  // case not found
  const byDetailed = TRANSACTION_MAPPING_LOGIC.find(
    (value) => value.plaidDetailedCreditCategory === primaryOrDetailed
  )

  if (byDetailed) return byDetailed

  if (primaryOrDetailed === "revenue")
    return {
      plaidPrimaryCreditCategory: "other",
      plaidDetailedCreditCategory: "other",
      cyphrPrimaryCreditCategory: "revenue",
      cyphrDetailedCreditCategory: "revenue",
      cyphrFinancialCategory: "revenue_other"
    }

  if (primaryOrDetailed === "expense")
    return {
      plaidPrimaryCreditCategory: "other",
      plaidDetailedCreditCategory: "other",
      cyphrPrimaryCreditCategory: "expense",
      cyphrDetailedCreditCategory: "opex_other",
      cyphrFinancialCategory: "operating_expense_other"
    }

  return {
    plaidPrimaryCreditCategory: "other",
    plaidDetailedCreditCategory: "other_other",
    cyphrPrimaryCreditCategory: "other",
    cyphrDetailedCreditCategory: "other",
    cyphrFinancialCategory: "na"
  }
}

import {
  type DocumentDetailsType,
  DocumentType
} from "@/modules/conference-demo/admin/constants/type"

export const MOCK_OCROLUS_DATA: DocumentDetailsType = {
  documentType: DocumentType.BANK_STATEMENT,
  documentStatus: "verified",
  detect: {
    formAuthenticity: {
      score: 50,
      reasonCode: [
        {
          confidence: "LOW",
          description: "document contains a suspicious address"
        },
        {
          confidence: "HIGH",
          description: "bank statement transactions tampered"
        },
        {
          confidence: "MEDIUM",
          description: "bank statement unreconciled balance"
        },
        {
          confidence: "MEDIUM",
          description: "bank statement invalid transaction dates"
        }
      ]
    },
    signals: [
      {
        signalIdentifier: "transaction_description_edits",
        signalDisplayName: "Transaction Description Edits",
        signalIdentifierDescription:
          "Transaction descriptions have been altered from their original state.",
        signalCount: 3,
        page: 4,
        tabularData: {
          headers: [
            {
              page: "The page in the document that the transaction appears on"
            },
            {
              originalText:
                "The recovered text that was originally on the document"
            },
            {
              tamperedText: "The text that now appears on the document"
            }
          ],
          rows: [
            {
              values: [
                "4",
                null,
                "ROBINHOOD DES : Funds ID : XXXXXXXXX INDN : Mykel Williams CO ID : 1464364776 WEB"
              ]
            },
            {
              values: ["4", null, "Capital DES : EDI"]
            },
            {
              values: [
                "4",
                null,
                "WEB ROBINHOOD DES : Funds ID : XXXXXXXXX INDN : Mykel Williams CO ID : 1464364776"
              ]
            }
          ]
        }
      },
      {
        signalIdentifier: "suspicious_address",
        signalDisplayName: "Suspicious Address",
        signalIdentifierDescription:
          "The address could not be validated. To verify the address, we recommend searching the specific address online and being wary of potential auto-corrections to the zip code or other parts of the address that may be made by Google or another search engine.",
        signalCount: 1,
        tabularData: {
          headers: [
            {
              address: "The address that could not be validated."
            },
            {
              addressType: "The type of address within the document."
            },
            {
              confidence:
                "The confidence with which the signal was found to be suspicious."
            }
          ],
          rows: [
            {
              values: [
                "0000 MAGIC MOUNTAIN PKWY, VALENCIA, CA, 00000-0000",
                "account_holder",
                "low"
              ]
            }
          ]
        }
      },
      {
        signalIdentifier: "invalid_bank_statement_txn_date",
        signalDisplayName: "Invalid Transaction Dates",
        signalIdentifierDescription:
          "The date of the given transaction does not fall within the statement period dates.",
        signalCount: 71,
        tabularData: {
          headers: [
            {
              transactionPk: "The primary key of the transaction"
            },
            {
              transactionDate: "The date of the transaction"
            },
            {
              periodBeginDate:
                "The beginning date of the statement period that the transaction appears in"
            },
            {
              periodEndDate:
                "The ending date of the statement period that the transaction appears in"
            }
          ],
          rows: [
            {
              values: ["5917067374", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067375", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067376", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067377", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067378", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067379", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067380", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067381", "2022-02-04", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067382", "2022-02-04", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067383", "2022-02-08", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067384", "2022-02-08", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067385", "2022-02-09", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067386", "2022-02-10", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067387", "2022-02-10", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067388", "2022-02-12", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067389", "2022-02-12", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067390", "2022-02-18", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067391", "2022-02-22", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067392", "2022-02-22", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067393", "2022-02-25", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917067394", "2022-02-25", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917070275", "2022-02-26", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917070276", "2022-02-26", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917070277", "2022-02-26", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917070278", "2022-02-26", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917070279", "2022-02-26", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917070280", "2022-02-26", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917070281", "2022-02-26", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072926", "2022-02-08", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072927", "2022-02-08", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072928", "2022-02-08", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072929", "2022-02-09", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072930", "2022-02-11", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072931", "2022-02-12", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072932", "2022-02-12", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072933", "2022-02-24", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072934", "2022-02-25", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072935", "2022-02-26", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072936", "2022-02-26", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072937", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072938", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072939", "2022-02-01", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072940", "2022-02-02", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917072941", "2022-02-02", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077351", "2022-02-03", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077352", "2022-02-04", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077354", "2022-02-04", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077355", "2022-02-05", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077357", "2022-02-08", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077358", "2022-02-08", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077360", "2022-02-08", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077361", "2022-02-16", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077363", "2022-02-16", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077365", "2022-02-16", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077366", "2022-02-16", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077368", "2022-02-16", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077369", "2022-02-17", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077371", "2022-02-17", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077372", "2022-02-19", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077374", "2022-02-19", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077375", "2022-02-22", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077377", "2022-02-22", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077379", "2022-02-22", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077380", "2022-02-23", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077382", "2022-02-23", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077383", "2022-02-23", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077384", "2022-02-24", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917077385", "2022-02-24", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917079918", "2022-02-25", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917079916", "2022-02-08", "2022-07-01", "2022-07-31"]
            },
            {
              values: ["5917079917", "2022-02-09", "2022-07-01", "2022-07-31"]
            }
          ]
        }
      },
      {
        signalIdentifier: "unreconciled_bank_statement_balance_data",
        signalDisplayName: "Unreconciled Balance",
        signalIdentifierDescription: "Unreconciled Balance",
        signalCount: 1,
        tabularData: {
          headers: [
            {
              statedBeginBalance:
                "The opening balance of the account for the statement period"
            },
            {
              statedEndingBalance:
                "The ending balance of the account for the statement period"
            },
            {
              totalTransactionSum:
                "The total transaction sum for all transactions during the statement period"
            },
            {
              delta:
                "The difference between the sum of the transactions and the difference between the opening and ending balances"
            }
          ],
          rows: [
            {
              values: ["203.63", "2398.38", "0.0", "2194.75"]
            }
          ]
        }
      }
    ],
    visualizations: [
      {
        pageNumber: 1,
        pageVisualizations: [
          {
            imageUrl: "/example/documents/document_1",
            displayName: "Tamper Overview",
            visualType: "TAMPER_OVERVIEW",
            description: "Tampered fields are highlighted in red."
          }
        ]
      },
      {
        pageNumber: 4,
        pageVisualizations: [
          {
            imageUrl: "/example/documents/document_2",
            displayName: "Tamper Overview",
            visualType: "TAMPER_OVERVIEW",
            description: "Tampered fields are highlighted in red."
          },
          {
            imageUrl: "/example/documents/document_3",
            displayName: "Tampered fonts",
            visualType: "TAMPERED_FONT",
            description:
              "Multiple fonts have been used within the same field. Within a field, fonts are distinguished by different color highlights. When possible, added fonts are shown in red. In some cases, three or more fonts are used within a single field and additional colors will be shown."
          }
        ]
      }
    ]
  },
  capture: {
    transactions: [
      {
        pageIndex: 3,
        amount: "-48.00",
        transactionDate: "02/01/2022",
        description: "CHECKCARD 0203 AUTOCODE NY XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 3,
        amount: "-120.00",
        transactionDate: "02/01/2022",
        description:
          "PMNT SENT 0130 CASH APP * Y KEL * AD 4153753176 CA 55429501030855986880545 CKCD 02/01/22 -120.00 4829 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 2,
        amount: "300.00",
        transactionDate: "02/01/2022",
        description: "ZELLE TRANSFER CONF # 580341DF4 ; WILLIAMS , MYKEL"
      },
      {
        pageIndex: 2,
        amount: "120.00",
        transactionDate: "02/01/2022",
        description: "ZELLE TRANSFER CONF # 59EDC634E ; WILLIAMS , MYKEL"
      },
      {
        pageIndex: 2,
        amount: "98.50",
        transactionDate: "02/01/2022",
        description:
          "02/01 # 000315426 PMNT RCVD CASH APP * CASH OUT SAN FRANCISCO CA"
      },
      {
        pageIndex: 2,
        amount: "40.00",
        transactionDate: "02/01/2022",
        description: "ZELLE TRANSFER CONF 2961317BC ; WILLIAMS , MYKEL"
      },
      {
        pageIndex: 2,
        amount: "29.70",
        transactionDate: "02/01/2022",
        description:
          "02/01 # 000389821 PMNT RCVD CASH APP * CASH OUT SAN FRANCISCO CA"
      },
      {
        pageIndex: 2,
        amount: "127.06",
        transactionDate: "02/01/2022",
        description:
          "01/31 # 000284935 PMNT RCVD CASH APP CASH OUT SAN FRANCISCO CA"
      },
      {
        pageIndex: 2,
        amount: "150.00",
        transactionDate: "02/01/2022",
        description: "ZELLE TRANSFER CONF 13FB912CC ; WILLIAMS , MYKEL"
      },
      {
        pageIndex: 3,
        amount: "-35.00",
        transactionDate: "02/01/2022",
        description: "CHECKCARD 013 AUTOCODE NY XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 3,
        amount: "-520.00",
        transactionDate: "02/02/2022",
        description:
          "CHECKCARD 0202 SUMMIT MEDIA SOLU 8166285492 MO 55546501033206750400174 CKCD\n7311 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 3,
        amount: "-337.90",
        transactionDate: "02/02/2022",
        description:
          "CHECKCARD 0201 UHS HARDWARE INC HOLLYWOOD FL 85101591032980010232363 CKCD 02/02/22 -337.90 5072 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-27.00",
        transactionDate: "02/03/2022",
        description:
          "CHECKCARD 0203 AUTOCODE NY . 718-404-9691 NY 55432861034200344993392 CKCD 8999\nXXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-232.66",
        transactionDate: "02/04/2022",
        description:
          "CHECKCARD 0204 FACEBK 6WLR23B2S2 MENLO PARK CA 15270211035000109967342 02/04/22 -232.66 RECURRING CKCD 7311 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-30.91",
        transactionDate: "02/04/2022",
        description:
          "CHECKCARD 0204 QT 208 OUTSIDE LEE'S SUMMIT MO CKCD 5542 XXXXXXXXXXXX6916 02/04/22 -30.91 XXXX 6916"
      },
      {
        pageIndex: 2,
        amount: "500.00",
        transactionDate: "02/04/2022",
        description:
          "BKOFAMERICA ATM 02/04 # 000003175 DEPOSIT EASTLAND INDEPENDENCE MO"
      },
      {
        pageIndex: 2,
        amount: "500.00",
        transactionDate: "02/04/2022",
        description:
          "BKOFAMERICA ATM 02/05 # 000003384 DEPOSIT EASTLAND INDEPENDENCE MO"
      },
      {
        pageIndex: 4,
        amount: "-45.00",
        transactionDate: "02/05/2022",
        description:
          "CHECKCARD 0204 DISCOUNT KEY CODE LAS VEGAS NV 85506471035980000588942 CKCD\n7399 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 3,
        amount: "-500.00",
        transactionDate: "02/08/2022",
        description:
          "WEB DES : FUNDS ID : INDN : MYKEL WILLIAMS CO ID : 1464364776"
      },
      {
        pageIndex: 2,
        amount: "2000.00",
        transactionDate: "02/08/2022",
        description:
          "BKOFAMERICA ATM 02/05 # 000007054 DEPOSIT WATKINS CROSSING KANSAS CITY MO"
      },
      {
        pageIndex: 2,
        amount: "100.00",
        transactionDate: "02/08/2022",
        description: "ZELLE TRANSFER CONF # OCCD96946 ; WILLIAMS , MYKEL"
      },
      {
        pageIndex: 3,
        amount: "-2000.00",
        transactionDate: "02/08/2022",
        description:
          "WEB DES : FUNDS ID : INDN : MYKEL WILLIAMS CO ID : 1464364776"
      },
      {
        pageIndex: 3,
        amount: "-50.00",
        transactionDate: "02/08/2022",
        description:
          "APPLECARD GSBANK DES : PAYMENT ID : 8838921 INDN : MYKEL WILLIAMS CO\nID : 9999999999 WEB"
      },
      {
        pageIndex: 4,
        amount: "-180.00",
        transactionDate: "02/08/2022",
        description: "PMNT SENT CASH APP CA CKCD XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-38.25",
        transactionDate: "02/08/2022",
        description:
          "CHECKCARD 0206 STRAIGHTTALK * SERV 877-430-2355 FL 55432861037200213303571 02/08/22 -38.25 RECURRING CKCD 4814 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-34.73",
        transactionDate: "02/08/2022",
        description:
          "CHECKCARD 0207 THEPARKINGSPOT - EC 3124531700 MO 55309591038083734443155 CKCD 02/08/22 -34.73 7523 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 5,
        amount: "-35.00",
        transactionDate: "02/08/2022",
        description: "OVERDRAFT ITEM FEE FOR ACTIVITY OF 02-08"
      },
      {
        pageIndex: 5,
        amount: "-35.00",
        transactionDate: "02/09/2022",
        description: "NSF : RETURNED ITEM FEE FOR ACTIVITY OF 02-09"
      },
      {
        pageIndex: 2,
        amount: "4950.00",
        transactionDate: "02/09/2022",
        description:
          "BKOFAMERICA ATM 02/09 # 000002722 DEPOSIT EASTLAND INDEPENDENCE MO"
      },
      {
        pageIndex: 3,
        amount: "-5000.00",
        transactionDate: "02/09/2022",
        description:
          "ROBINHOOD DES : FUNDS ID : INDN : MYKEL WILLIAMS CO ID : 1464364776\nWEB"
      },
      {
        pageIndex: 2,
        amount: "2640.00",
        transactionDate: "02/10/2022",
        description:
          "BKOFAMERICA ATM 02/10 # 000008144 DEPOSIT CLAIRBORNE OLATHE KS"
      },
      {
        pageIndex: 2,
        amount: "5500.00",
        transactionDate: "02/10/2022",
        description: "RETURN OF POSTED CHECK / ITEM ( RECEIVED ON 02-09 )"
      },
      {
        pageIndex: 3,
        amount: "-2500.00",
        transactionDate: "02/11/2022",
        description: "DES : FUNDS ID : INDN : MYKEL WILLIAMS CO ID : 1464364776"
      },
      {
        pageIndex: 2,
        amount: "405.00",
        transactionDate: "02/12/2022",
        description:
          "BKOFAMERICA ATM 02/12 # 000003561 DEPOSIT RAYTOWN SOUTH RAYTOWN ΜΟ"
      },
      {
        pageIndex: 3,
        amount: "-5000.00",
        transactionDate: "02/12/2022",
        description:
          "WEB DES : FUNDS ID : XXXXXXXXX INDN : MYKEL WILLIAMS CO ID : 1464364776"
      },
      {
        pageIndex: 2,
        amount: "300.00",
        transactionDate: "02/12/2022",
        description: "COUNTER CREDIT"
      },
      {
        pageIndex: 3,
        amount: "-866.76",
        transactionDate: "02/12/2022",
        description:
          "CAPITAL DES : EDI ID : DCC - 1647719 INDN : KC UNLOCKING CO\nPYMNTS COMPANY"
      },
      {
        pageIndex: 4,
        amount: "-35.00",
        transactionDate: "02/16/2022",
        description:
          "CHECKCARD 0214 AUTOCODE NY . 718-404-9691 NY 55432861045200236543021 CKCD 8999\nXXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-152.21",
        transactionDate: "02/16/2022",
        description:
          "CHECKCARD 0214 BLUE RIDGE BANK INDEPENDENCE MO 85140541045900010341421 CKCD\n6012 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-30.00",
        transactionDate: "02/16/2022",
        description:
          "PMNT SENT 0212 CASH APP * Y KEL * AD 4153753176 CA 55429501043855979992708 CKCD\n4829 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-111.00",
        transactionDate: "02/16/2022",
        description:
          "CHECKCARD SYNCB PAYMENT GA CKCD 6012 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-8.08",
        transactionDate: "02/16/2022",
        description:
          "CHECKCARD TACOS EL GUERO LL KANSANS CITY CKCD 5812 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-35.00",
        transactionDate: "02/17/2022",
        description:
          "CHECKCARD 0217 AUTOCODE NY . 718-404-9691 NY 55432861048200960918347 CKCD 8999 02/17/22 -35.00 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-15.00",
        transactionDate: "02/17/2022",
        description:
          "CHECKCARD 0216 DISCOUNT KEY CODE LAS VEGAS NV 85506471047980000588989 CKCD 02/17/22 -15.00 7399 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 2,
        amount: "500.00",
        transactionDate: "02/18/2022",
        description:
          "BKOFAMERICA ATM 02/18 # 000004623 DEPOSIT EASTLAND INDEPENDENCE MO"
      },
      {
        pageIndex: 4,
        amount: "-48.00",
        transactionDate: "02/19/2022",
        description:
          "CHECKCARD 0219 AUTOCODE NY . 718-404-9691 NY 55432861050200463159576 CKCD 8999\nXXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-48.00",
        transactionDate: "02/19/2022",
        description:
          "CHECKCARD 0219 AUTOCODE NY . 718-404-9691 NY 55432861050200463159618 CKCD 8999 02/19/22 -48.00 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-31.35",
        transactionDate: "02/22/2022",
        description:
          "CHECKCARD 0222 QT 224 OUTSIDE KANSAS CITY MO CKCD 5542 XXXXXXXXXXXX6916 02/22/22 -31.35 XXXX 6916"
      },
      {
        pageIndex: 2,
        amount: "3110.00",
        transactionDate: "02/22/2022",
        description:
          "BKOFAMERICA ATM 02/23 # 000006235 DEPOSIT EASTLAND INDEPENDENCE MO"
      },
      {
        pageIndex: 4,
        amount: "-224.49",
        transactionDate: "02/22/2022",
        description:
          "CHECKCARD 0220 TIME PAYMENT CORP 7819944800 MA 55488721051206754701420 CKCD\n7394 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 2,
        amount: "240.00",
        transactionDate: "02/22/2022",
        description:
          "BKOFAMERICA ATM 02/22 # 000002502 DEPOSIT COLLEGE OVERLAND PARK KS"
      },
      {
        pageIndex: 4,
        amount: "-6.88",
        transactionDate: "02/22/2022",
        description:
          "PRICE CHOPPER 02/22 # 000540110 PURCHASE 937 NE WOODS CHAP LEE'S SUMMIT MO"
      },
      {
        pageIndex: 4,
        amount: "-5.37",
        transactionDate: "02/23/2022",
        description:
          "CHECKCARD 0222 BHM CAR WASH LLC LEES SUMMIT MO 85456671053900012343484 CKCD 02/23/22 -5.37 7542 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-48.00",
        transactionDate: "02/23/2022",
        description:
          "CHECKCARD 0223 AUTOCODE NY . 718-404-9691 NY 55432861054200468962889 CKCD 8999 02/23/22 -48.00 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-185.34",
        transactionDate: "02/23/2022",
        description:
          "CHECKCARD 0222 UHS HARDWARE INC HOLLYWOOD FL 85101591053980010232334 CKCD\n5072 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 4,
        amount: "-39.49",
        transactionDate: "02/24/2022",
        description:
          "CHECKCARD 0223 UHS HARDWARE INC HOLLYWOOD FL 85101591054980010232382 CKCD 02/24/22 -39.49 5072 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 3,
        amount: "-3000.00",
        transactionDate: "02/24/2022",
        description:
          "ROBINHOOD DES : FUNDS ID : INDN : MYKEL WILLIAMS CO ID : 1464364776\nWEB"
      },
      {
        pageIndex: 4,
        amount: "-117.81",
        transactionDate: "02/24/2022",
        description:
          "CHECKCARD 0223 UHS HARDWARE INC HOLLYWOOD FL 85101591054980010232382 CKCD 02/24/22 -117.81 5072 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 2,
        amount: "500.00",
        transactionDate: "02/25/2022",
        description: "COUNTER CREDIT"
      },
      {
        pageIndex: 3,
        amount: "-573.06",
        transactionDate: "02/25/2022",
        description:
          "DIRECT CAPITAL DES : EDI PYMNTS ID : DCC - 1649470 INDN : KC UNLOCKING COMPANY CO ID : 1020468001\nCCD"
      },
      {
        pageIndex: 5,
        amount: "-138.50",
        transactionDate: "02/25/2022",
        description:
          "CHECKCARD 0225 AUTOCODE NY . 718-404-9691 NY 55432861056200004165961 CKCD 8999 02/25/22 -138.50 XXXXXXXXXXXX6916 XXXX 6916"
      },
      {
        pageIndex: 2,
        amount: "162.52",
        transactionDate: "02/25/2022",
        description:
          "02/25 # 000380007 PMNT RCVD CASH APP * CASH OUT SAN FRANCISCO CA"
      },
      {
        pageIndex: 3,
        amount: "0.22",
        transactionDate: "02/26/2022",
        description:
          "TD AMERITRADE DES : ACH MICRO ID : AZ9PTQCFVS INDN : WILLIAMS MYKEL CO\nID : 4470533629 PPD"
      },
      {
        pageIndex: 3,
        amount: "0.10",
        transactionDate: "02/26/2022",
        description:
          "TD AMERITRADE DES : ACH MICRO ID : AZ9PTQCFVS INDN : MYKEL CO 02/26/22 0.10 ID : 4470533629 PPD"
      },
      {
        pageIndex: 3,
        amount: "499.00",
        transactionDate: "02/26/2022",
        description: "ZELLE TRANSFER CONF # T09WYHB9G ; ASHLEY SANCHEZ"
      },
      {
        pageIndex: 3,
        amount: "300.00",
        transactionDate: "02/26/2022",
        description:
          "MERCH BNKCD NSD DES : DEPOSIT ID : 526219256884 INDN : KC UNLOCKING\nCOMPANY ID : BXXXXXXXXX CCD"
      },
      {
        pageIndex: 3,
        amount: "20.68",
        transactionDate: "02/26/2022",
        description:
          "02/26 # 000321709 PMNT RCVD CASH APP * CASH OUT SAN FRANCISCO CA"
      },
      {
        pageIndex: 3,
        amount: "1.00",
        transactionDate: "02/26/2022",
        description: "TELLE TRANSFER CONF # T09WYGVRV ; ASHLEY SANCHEZ"
      },
      {
        pageIndex: 3,
        amount: "-1000.00",
        transactionDate: "02/26/2022",
        description:
          "WEB DES : FUNDS ID : XXXXXXXXX INDN : MYKEL WILLIAMS CO ID : 1464364776"
      },
      {
        pageIndex: 3,
        amount: "-1000.00",
        transactionDate: "02/26/2022",
        description:
          "WEB DES : FUNDS ID : XXXXXXXXX INDN : MYKEL WILLIAMS CO ID : 1464364776"
      },
      {
        pageIndex: 3,
        amount: "2000.00",
        transactionDate: "02/26/2022",
        description: "COUNTER CREDIT"
      }
    ],
    bankAccount: [
      {
        bankAccountPk: "21456760",
        name: "0000 BANK OF AMERICA CHECKING",
        bankName: "BANK OF AMERICA",
        accountType: "CHECKING",
        accountHolder: "KC UNLOCKING COMPANY",
        accountNumber: "0000",
        holderZip: "00000-0000",
        holderCountry: "US",
        holderState: "CA",
        holderCity: "VALENCIA",
        holderAddress1: "0000 MAGIC MOUNTAIN PKWY",
        holderAddress2: "0000 MAGIC MOUNTAIN PKWY",
        accountCategory: "BUSINESS ACCOUNT"
      }
    ]
  },
  verifiedDate: "2024-09-04T16:43:36.114403Z"
} as const

const v = {
  kind: 'qpxExpress#tripsSearch',
  trips: {
    kind: 'qpxexpress#tripOptions',
    requestId: string,
    data: {
      kind: 'qpxexpress#data',
      airport: [
        {
          kind: 'qpxexpress#airportData',
          code: string,
          city: string,
          name: string,
        },
      ],
      city: [
        {
          kind: 'qpxexpress#cityData',
          code: string,
          country: string,
          name: string,
        },
      ],
      aircraft: [
        {
          kind: 'qpxexpress#aircraftData',
          code: string,
          name: string,
        },
      ],
      tax: [
        {
          kind: 'qpxexpress#taxData',
          id: string,
          name: string,
        },
      ],
      carrier: [
        {
          kind: 'qpxexpress#carrierData',
          code: string,
          name: string,
        },
      ],
    },
    tripOption: [
      {
        kind: 'qpxexpress#tripOption',
        saleTotal: string,
        id: string,
        slice: [
          {
            kind: 'qpxexpress#sliceInfo',
            duration: integer,
            segment: [
              {
                kind: 'qpxexpress#segmentInfo',
                duration: integer,
                flight: {
                  carrier: string,
                  number: string,
                },
                id: string,
                cabin: string,
                bookingCode: string,
                bookingCodeCount: integer,
                marriedSegmentGroup: string,
                subjectToGovernmentApproval: boolean,
                leg: [
                  {
                    kind: 'qpxexpress#legInfo',
                    id: string,
                    aircraft: string,
                    arrivalTime: string,
                    departureTime: string,
                    origin: string,
                    destination: string,
                    originTerminal: string,
                    destinationTerminal: string,
                    duration: integer,
                    operatingDisclosure: string,
                    onTimePerformance: integer,
                    mileage: integer,
                    meal: string,
                    secure: boolean,
                    connectionDuration: integer,
                    changePlane: boolean,
                  },
                ],
                connectionDuration: integer,
              },
            ],
          },
        ],
        pricing: [
          {
            kind: 'qpxexpress#pricingInfo',
            fare: [
              {
                kind: 'qpxexpress#fareInfo',
                id: string,
                carrier: string,
                origin: string,
                destination: string,
                basisCode: string,
                private: boolean,
              },
            ],
            segmentPricing: [
              {
                kind: 'qpxexpress#segmentPricing',
                fareId: string,
                segmentId: string,
                freeBaggageOption: [
                  {
                    kind: 'qpxexpress#freeBaggageAllowance',
                    bagDescriptor: [
                      {
                        kind: 'qpxexpress#bagDescriptor',
                        commercialName: string,
                        count: integer,
                        description: [string],
                        subcode: string,
                      },
                    ],
                    kilos: integer,
                    kilosPerPiece: integer,
                    pieces: integer,
                    pounds: integer,
                  },
                ],
              },
            ],
            baseFareTotal: string,
            saleFareTotal: string,
            saleTaxTotal: string,
            saleTotal: string,
            passengers: {
              kind: 'qpxexpress#passengerCounts',
              adultCount: integer,
              childCount: integer,
              infantInLapCount: integer,
              infantInSeatCount: integer,
              seniorCount: integer,
            },
            tax: [
              {
                kind: 'qpxexpress#taxInfo',
                id: string,
                chargeType: string,
                code: string,
                country: string,
                salePrice: string,
              },
            ],
            fareCalculation: string,
            latestTicketingTime: string,
            ptc: string,
            refundable: boolean,
          },
        ],
      },
    ],
  },
};

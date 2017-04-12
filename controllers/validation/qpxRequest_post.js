const Joi = require('joi');
const _ = require('lodash');
const moment = require('moment')

const dateValidation = /^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/;
const timeValidation = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // /^(2[0-3]|[01]?[0-9]):(0[1-9]{1}|[1-5]{1}[0-9])$/
const priceValidation = /^[A-Z]{3}\d+(\.\d+)?/;

const minNumberOfPassengers = 0;
const maxNumberOfPassengers = 15;

const minNumberOfChildren = 0;
const maxNumberOfChildren = 6;

const minNumberOfInLapChid = minNumberOfChildren;
const maxNumberOfInLapChid = maxNumberOfChildren;

const minNumberOfInSeatChid = minNumberOfChildren;
const maxNumberOfInSeatChid = maxNumberOfChildren;

const minNumberOfSeniors = 0;
const maxNumberOfSeniors = maxNumberOfPassengers;


// schema definition 

const IATACountryCodeISO = [ 
    'AF', 'AL',
    'DZ', 'AS', 'AD', 'AO',
    'AI', 'AQ', 'AG', 'AR',
    'AM', 'AW', 'AU', 'AT',
    'AZ', 'BS', 'BH', 'BD',
    'BB', 'BY', 'BE', 'BZ',
    'BJ', 'BM', 'BT', 'BO',
    'BQ', 'BA', 'BW', 'BV',
    'BR', 'IO', 'BN', 'BG',
    'BF', 'BI', 'KH', 'CM',
    'CA', 'CV', 'KY', 'CF',
    'TD', 'CL', 'CN', 'ET',
    'CX', 'CC', 'CO', 'KM',
    'CG', 'CD', 'CK', 'CR',
    'HR', 'CU', 'CW', 'CY',
    'CZ', 'CI', 'DK', 'DJ',
    'DM', 'DO', 'EC', 'EG',
    'SV', 'GQ', 'ER', 'EE', 
    'FK', 'FO', 'FJ', 'FI',
    'FR', 'GF', 'PF', 'TF',
    'GA', 'GM', 'GE', 'DE',
    'GH', 'GI', 'GR', 'GL',
    'GD', 'GP', 'GU', 'GT',
    'GG', 'GN', 'GW', 'GY',
    'HT', 'HM', 'VA', 'HN',
    'HK', 'HU', 'IS', 'IN',
    'ID', 'IR', 'IQ', 'IE',
    'IM', 'IL', 'IT', 'JM',
    'JP', 'JE', 'JO', 'KZ',
    'KE', 'KI', 'KP', 'KR',
    'KW', 'KG', 'LA', 'LV',
    'LB', 'LS', 'LR', 'LY',
    'LI', 'LT', 'LU', 'MO',
    'MK', 'MG', 'MW', 'MY',
    'MV', 'ML', 'MT', 'MH',
    'MQ', 'MR', 'MU', 'YT',
    'MX', 'FM', 'MD', 'MC',
    'MN', 'ME', 'MS', 'MA',
    'MZ', 'MM', 'NA', 'NR',
    'NP', 'NL', 'NC', 'NZ',
    'NI', 'NE', 'NG', 'NU',
    'NF', 'MP', 'NO', 'OM',
    'PK', 'PW', 'PS', 'PA',
    'PG', 'PY', 'PE', 'PH',
    'PN', 'PL', 'PT', 'PR',
    'QA', 'RO', 'RU', 'RW',
    'RE', 'BL', 'SH', 'KN',
    'LC', 'MF', 'PM', 'VC',
    'WS', 'SM', 'ST', 'SA',
    'SN', 'RS', 'SC', 'SL',
    'SG', 'SX', 'SK', 'SI',
    'SB', 'SO', 'ZA', 'GS',
    'SS', 'ES', 'LK', 'SD',
    'SR', 'SJ', 'SZ', 'SE',
    'CH', 'SY', 'TW', 'TJ',
    'TZ', 'TH', 'TL', 'TG',
    'TK', 'TO', 'TT', 'TN',
    'TR', 'TM', 'TC', 'TV',
    'UG', 'UA', 'AE', 'GB',
    'US', 'UM', 'UY', 'UZ',
    'VU', 'VE', 'VN', 'VG',
    'VI', 'WF', 'EH', 'YE',
    'ZM', 'ZW', 'AX'
]; 

const IATACountryCodeUN = [
    'AFG', 'ALB', 'DZA', 'ASM',
    'AND','AGO', 'AIA', 'ATA',
    'ATG', 'ARG', 'ARM', 'ABW',
    'AUS', 'AUT', 'AZE', 'BHS',
    'BHR', 'BGD', 'BRB', 'BLR',
    'BEL', 'BLZ', 'BEN', 'BMU',
    'BTN', 'BOL', 'BES', 'BIH',
    'BWA', 'BVT', 'BRA', 'IOT',
    'BRN', 'BGR', 'BFA', 'BDI',
    'KHM', 'CMR', 'CAN', 'CPV',
    'CYM', 'CAF', 'TCD', 'CHL',
    'CHN', 'CXR', 'CCK', 'COL',
    'COM', 'COG', 'COD', 'COK',
    'CRI', 'HRV', 'CUB', 'CUW',
    'CYP', 'CZE', 'CIV', 'DNK',
    'DJI', 'DMA', 'DOM', 'ECU',
    'EGY', 'SLV', 'GNQ', 'ERI',
    'EST', 'ETH', 'FLK', 'FRO',
    'FJI', 'FIN', 'FRA', 'GUF',
    'PYF', 'ATF', 'GAB', 'GMB',
    'GEO', 'DEU', 'GHA', 'GIB',
    'GRC', 'GRL', 'GRD', 'GLP',
    'GUM', 'GTM', 'GGY', 'GIN',
    'GNB', 'GUY', 'HTI', 'HMD',
    'VAT', 'HND', 'HKG', 'HUN',
    'ISL', 'IND', 'IDN', 'IRN',
    'IRQ', 'IRL', 'IMN', 'ISR',
    'ITA', 'JAM', 'JPN', 'JEY',
    'JOR', 'KAZ', 'KEN', 'KIR',
    'PRK', 'KOR', 'KWT', 'KGZ',
    'LAO', 'LVA', 'LBN', 'LSO',
    'LBR', 'LBY', 'LIE', 'LTU',
    'LUX', 'MAC', 'MKD', 'MDG',
    'MWI', 'MYS', 'MDV', 'MLI',
    'MLT', 'MHL', 'MTQ', 'MRT',
    'MUS', 'MYT', 'MEX', 'FSM',
    'MDA', 'MCO', 'MNG', 'MNE',
    'MSR', 'MAR', 'MOZ', 'MMR',
    'NAM', 'NRU', 'NPL', 'NLD',
    'NCL', 'NZL', 'NIC', 'NER',
    'NGA', 'NIU', 'NFK', 'MNP',
    'NOR', 'OMN', 'PAK', 'PLW',
    'PSE', 'PAN', 'PNG', 'PRY',
    'PER', 'PHL', 'PCN', 'POL',
    'PRT', 'PRI', 'QAT', 'ROU',
    'RUS', 'RWA', 'REU', 'BLM', 
    'LCA', 'MAF', 'SPM', 'VCT',
    'WSM', 'SMR', 'STP', 'SAU',
    'SEN', 'SRB', 'SYC', 'SLE',
    'SGP', 'SXM', 'SVK', 'SVN',
    'SLB', 'SOM', 'ZAF', 'SGS',
    'SSD', 'ESP', 'LKA', 'SDN',
    'SUR', 'SJM', 'SWZ', 'SWE',
    'CHE', 'SYR', 'TWN', 'TJK',
    'TZA', 'THA', 'TLS', 'TGO',
    'TKL', 'TON', 'TTO', 'TUN',
    'TUR', 'TKM', 'TCA', 'TUV',
    'UKR', 'ARE', 'GBR', 'USA',
    'UMI', 'URY', 'UZB', 'VUT',
    'VEN', 'VNM', 'VGB', 'VIR',
    'WLF', 'ESH', 'YEM', 'ZMB',
    'ZWE', 'ALA', 'UGA', 'SHN', 'KNA'
];

const airlineCode = [
    'JP', 'A3',
    'RE', 'EI',
    'SU', 'AR',
    'AM', 'AH',
    'KC', 'AB',
    'AC', 'CA',
    'UX', 'AF',
    'AI', 'KM',
    'SW', 'NZ',
    'HM', 'VT',
    'UM', 'AS',
    'AZ', 'NH',
    'AA', 'W3',
    'OZ', 'RC',
    'GR', 'OS',
    'AV', 'J2',
    'PG', 'KF',
    'BA', 'SN',
    'FB', 'CX',
    'OK', 'CI',
    'MU', 'CZ',
    'OU', 'CY',
    'DL', 'T3',
    'MS', 'LY',
    'EK', 'OV',
    'ET', 'EY',
    'BR', 'AY',
    'BE', 'GA',
    'GF', 'HR',
    'HX', 'IB',
    'FI', 'JL',
    '9W', 'KQ',
    'KL', 'KE',
    'KU', 'LA',
    'LO', 'LH',
    'LG', 'MH',
    'ME', 'IG',
    'MX', 'ZB',
    'NW', 'DY',
    'OA', 'WY',
    'FV', 'QF',
    'QR', 'AT',
    'BI', 'RJ',
    'S7', 'SV',
    'SK', 'SQ',
    'SA', 'JK',
    'UL', 'LX',
    'JJ', 'TP',
    'RO', 'TG',
    'UN', 'TU',
    'TK', 'PS',
    'UA', 'US',
    'HY', 'VN',
    'VS', 'VG'
];

const passengerSchema = {
    kind: Joi.string().valid('qpxexpress#passengerCounts'),
    adultCount: Joi.number().integer().min(minNumberOfPassengers).max(maxNumberOfPassengers).required(),
    childCount: Joi.number().integer().min(minNumberOfChildren).max(maxNumberOfChildren),
    infantInLapCount: Joi.number().integer().min(minNumberOfInLapChid).max(maxNumberOfInLapChid),
    infantInSeatCount: Joi.number().integer().min(minNumberOfInSeatChid).max(maxNumberOfInSeatChid),
    seniorCount: Joi.number().integer().min(0).max(maxNumberOfSeniors)
    .when('adultCount', { is: 0, then: Joi.number().integer().min(1).max(maxNumberOfSeniors).required() } )
};

const sliceSchema = {
    kind: Joi.string().valid('qpxexpress#sliceInput'),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    date: Joi.string().required().regex(dateValidation),
    maxStops: Joi.number().integer(),
    maxConnectionDuration: Joi.number().integer(),
    preferredCabin: Joi.string().valid('COACH', 'PREMIUM_COACH', 'BUSINESS', 'FIRST').insensitive(),
    permittedDepartureTime: {
        kind: Joi.string().valid('qpxexpress#timeOfDayRange'),
        earliestTime: Joi.string().regex(timeValidation),
        latestTime: Joi.string().regex(timeValidation)
    },
    permittedCarrier: Joi.array().items(Joi.string().valid(airlineCode).insensitive()),
    alliance: Joi.string().valid('ONEWORLD', 'SKYTEAM', 'STAR').insensitive(),
    prohibitedCarrier: Joi.array().items(Joi.string().valid(airlineCode).insensitive())
};


const schema = Joi.object().keys({
    request: Joi.object().keys({
        passengers: Joi.object().keys(passengerSchema),
        slice: Joi.array().items(sliceSchema),
        maxPrice: Joi.string().regex(priceValidation),
        saleCountry: Joi.string().insensitive().min(2).max(3).valid(IATACountryCodeISO).valid(IATACountryCodeUN),
        ticketingCountry: Joi.string().insensitive().min(2).max(3).valid(IATACountryCodeISO).valid(IATACountryCodeUN),
        refundable: Joi.boolean(),
        solutions: Joi.number().integer().max(500)
    })
});
 



function validate(body) {
    Joi.validate(body, schema, function (err, value) {
        if(!_.isNull(err)) {
            _.each(err.details, (element) => {
                console.log(element.message);
                return "Validation failed !"
            })
        } else {
            console.log('validation passed!');
            return "Validation passed successfully !"
            // const currentDate = moment(new Date()).format('YYYY-MM-DD');
            // const receviedDate = moment(body.request.slice[0].date).format('YYYY-MM-DD');
            // Joi.assert(currentDate < receviedDate, Joi.valid(true), 'Invalid date inputed!');
        }

    }); 
};

module.exports = {
    validate,
};
const ENABLE_USER_MOCK = true;
const ENABLE_DB_MOCK = true;
const DB_JSON_SERVER_HOST = "http://localhost:5000";
const DB_MONGO_HOST = "DUMMY";//TBD
const MOCK_USER_ID = 103;


const CATEGORY = { 1: 'Annual Objectives', 2: 'Customer Driven', 3: 'Innovation Obsessed' }

const QUARTERLY_CYCLE = [
    { id: 1, value: 'Q1' },
    { id: 2, value: 'Q2' },
    { id: 3, value: 'Q3' },
    { id: 4, value: 'Q4' }
];

const QUARTERLY_CHECKIN = [
    { id: 1, value: 'OK' },
    { id: 2, value: 'Needs Improvement' }
];

const MANAGER_RATING = [
    { rating: 1, value: 'Exceeds Always' },
    { rating: 2, value: 'Exceeds Some Time' },
    { rating: 3, value: 'Meets Expectations' },
    { rating: 4, value: 'Needs Improvement' }
]

module.exports = {
    ENABLE_USER_MOCK,
    ENABLE_DB_MOCK,
    DB_JSON_SERVER_HOST,
    DB_MONGO_HOST,
    MOCK_USER_ID
}
const moment = require('moment');

const greetings = {
    'en': 'Hello',
    'de': 'Hallo',
    'by': 'Прывiтанне',
}

module.exports.handler = async (event) => {
    const { lang, ...info } = event.queryStringParameters;
    const name = event.pathParameters;

    const message = `${greetings[lang] ?? greetings.en}, ${name}`;

    const response = {
        statusCode: 200,
        message,
        timestamp: moment().unix(),
        info,
    };

    return response;
}
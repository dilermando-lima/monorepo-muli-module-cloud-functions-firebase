

import * as functions from 'firebase-functions';
import * as str from 'string-module';

const funcA = functions.https.onRequest((req, res) => {
    res.statusCode = 200;
    res.send(str.upper("apiA"));
});

export {funcA}

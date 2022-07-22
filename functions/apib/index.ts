

import * as functions from 'firebase-functions';
import * as str from 'string-module';

const funcB = functions.https.onRequest((req: any, res: any) => {
    res.statusCode = 200;
    res.send(str.upper("apiB"));
});

export {funcB}

/**
 *
 * Create a new contact:
 *
 */

const MJ_APIKEY_PUBLIC = 'cf3cf01291eae5465f93278413418ee0'
const MJ_APIKEY_PRIVATE = '6cf5f30f60d2db2006bf516a25e10400'

const mailjet = require('node-mailjet')
    .connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE)


exports.handler = function (event, context, callback) {

    console.dir(event)

    const request = mailjet
        .post("contact", { 'version': 'v3' })
        .request({
            "Email": event.queryStringParameters.email,
            "Name": event.queryStringParameters.name,
            "IsExcludedFromCampaigns": "true"
        })

    request
        .then((result) => {
            if (result && result.response && result.response.status === 201) {
                callback(null, {
                    statusCode: 200,
                    body: "Hello, World"
                });
            } else {
                callback('ERROR');
            }
        })
        .catch((err) => {
            callback('ERROR');
        })

}
/**
 *
 * Create a new contact
 *
 */

const MJ_APIKEY_PUBLIC = 'cf3cf01291eae5465f93278413418ee0'
const MJ_APIKEY_PRIVATE = '6cf5f30f60d2db2006bf516a25e10400'

const mailjet = require('node-mailjet')
    .connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE)

const get = require('lodash/get')

exports.handler = function (event, context, callback) {

    const createContact = mailjet
        .post("contact", { 'version': 'v3' })
        .request({
            "Email": event.queryStringParameters.email || ""
        })

    createContact
        .then((result) => {

            const addToList = mailjet
                .post("listrecipient", { 'version': 'v3' })
                .request({
                    "ContactAlt": event.queryStringParameters.email,
                    "ListID": "2363091",
                })

            addToList
                .then((result) => {
                    callback(
                        null, {
                        statusCode: 200,
                        body: JSON.stringify({
                            result: result
                        })
                    });
                })
                .catch((err) => {
                    callback(
                        null, {
                        statusCode: 400,
                        body: JSON.stringify({
                            result: err
                        })
                    });
                })

        })
        .catch((err) => {
            callback(
                null, {
                statusCode: 400,
                body: JSON.stringify({
                    result: err
                })
            });
        })

}
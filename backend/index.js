const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");

const app = express();

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

    /* use cors */
    .use(cors())

    /* use helmet */
    .use(helmet())

    .get('/stats', async (req, res) => {
        axios.get("http://45.79.111.106/interview.json")
            .then(response => {
                let { data } = response;
                let { sd, ed, p: page = 1, n: limit = 999 } = req.query;

                let matchingRecords;

                if (sd || ed) {
                    matchingRecords = data.filter(record => {
                        let match = true;
                        if (!(sd && new Date(sd) <= new Date(record.date))) match = false;
                        if (!(ed && new Date(ed) >= new Date(record.date))) match = false;

                        if (match) return record;
                    })
                } else matchingRecords = data;

                const temp = {};

                matchingRecords.forEach(element => {
                    temp[element.websiteId] = temp[element.websiteId] ? temp[element.websiteId] : {};

                    temp[element.websiteId].chats = temp[element.websiteId].chats
                        ? temp[element.websiteId].chats + element.chats
                        : element.chats;

                    temp[element.websiteId].missedChats = temp[element.websiteId].missedChats
                        ? temp[element.websiteId].missedChats + element.missedChats
                        : element.missedChats;
                });

                const records = [];

                Object.keys(temp).sort().forEach(key => {
                    records.push({
                        websiteId: key,
                        chats: temp[key].chats,
                        missedChats: temp[key].missedChats
                    });
                });

                res.send({ success: true, message: "records!", data: records });
            })
            .catch(error => res.status(500).send({ success: false, message: "internal error!", data: error.stack }));
    })

    .listen(4545, cb => console.log("Get data from : http://localhost:4545/stats"));
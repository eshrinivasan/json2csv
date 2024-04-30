const fs = require("fs");
const { Parser } = require("json2csv");
const participants = require("./devchallengeresponse.json").data.items;


// Create an object in the required format, add it to a list and return the list from this function
// The object generation needs to be changed depending on the input json and output csv required

/*

    Output list format:

    [
      { type: 'message', id: '157865' },
      { type: 'message', id: '9180' },
      ...
    ]

*/


function createAListFromJson(){
    let participantsDataList = [];
    for (var i = 0; i < participants.length; i++) { 
        let dataObject = {};
        dataObject["type"] = "message";
        dataObject["id"] = participants[i].id;
        participantsDataList.push(dataObject);
    }
    return participantsDataList;
}


// Convert the list to CSV using parser.parse

/*

    Required output csv format

    type    id
    message 123
    message 22

*/

function outputAttendeesCSV(){
    let list = createAListFromJson();

    const parser = new Parser({ delimiter: ';' });
    const csv = parser.parse(list);

    fs.writeFile("attendees.csv", csv, "utf8", function (err) {
      if (err) {
        console.log("An error occurred while writing JSON Object to CSV.");
        return console.log(err);
      }
      console.log("CSV Attendees has been saved.");
    });
}

outputAttendeesCSV();
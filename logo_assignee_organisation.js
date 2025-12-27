const request = require('request'),

    AssigneeOrganizations = require("./models/AssigneeOrganizations");

let totalRecords = 0, totalPages = 0, startIndex = 0, errorCodes = [], currentPage = 0, findOrganisations = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9]

(async function() {
    try {
        initiateProcess()
    } catch (e) {
      console.log('caught', e)
    }
})();

const initiateProcess = () => {
    const url = `https://api.patentsview.org/assignees/query?q={"_begins":{"assignee_organization":"${findOrganisations[startIndex]}"}}&f=["assignee_organization"]`
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const responseBody = JSON.parse(body)
            if(responseBody.total_assignee_count > 0) {
                totalRecords = responseBody.total_assignee_count
                totalPages = Math.ceil(totalRecords / 1e4)
                if(totalPages > 0) {
                    currentPage = 1
                    startScrappingData()
                } else {
                    errorCodes.push(findOrganisations[startIndex])
                    startNext()
                } 
            } else {
                errorCodes.push(findOrganisations[startIndex])
                startNext()
            }           
        } else {
            errorCodes.push(findOrganisations[startIndex])
            startNext()
        }
    })
}

const startNext = () => {
    startIndex += 1
    currentPage = 0
    totalRecords = 0
    totalPages = 0
    if(startIndex < findOrganisations.length) {
        initiateProcess()
    } else {
        console.log('ERROR', JSON.stringify(errorCodes))
    }
}

const startScrappingData = () => {
    const url = `https://api.patentsview.org/assignees/query?q={"_begins":{"assignee_organization":"${findOrganisations[startIndex]}"}}&f=["assignee_organization"]&o={"page":${currentPage}, "per_page": 10000}`
    request(url, async(error, response, body) => {
        if (!error && response.statusCode == 200) {
            const responseBody = JSON.parse(body)
            const { assignees, count } = responseBody
            if(count > 0) {
                await AssigneeOrganizations.bulkCreate(assignees, { ignoreDuplicates: true })
                currentPage += 1                
                if( currentPage <= totalPages) {
                    startScrappingData()
                } else {
                    startNext()
                }
            }            
        }
    })
}

import { url, typeModel, image, headers, endpoints } from "../../fixtures/data/data"

class OpenAi {

    writeChat(message = '') {
        return cy.api({
            failOnStatusCode: false,
            method : 'POST',
            url : url + endpoints.chat,
            headers : {
                'content-type' : headers.ContentType,
                Authorization : headers.Authorization
            },
            body : {
                model : typeModel.modelGPT,
                messages : message
            }
		})
    }

    createImage(promptUser = '') {
        return cy.api({
            failOnStatusCode: false,
            method : 'POST',
            url : url + endpoints.image,
            headers : {
                'content-type' : headers.ContentType,
                Authorization : headers.Authorization
            },
            body : {
                prompt : promptUser,
                size : image.size,
                n : image.n
            }
        })
    }

    inputModeration(inputUser = '') {
        return cy.api({
            method : 'POST',
            url : url + endpoints.moderation,
            headers : {
                'content-type' : headers.ContentType,
                Authorization : headers.Authorization
            },
            body : {
                input : inputUser
            }
        })
    }
}

export const open_AI = new OpenAi
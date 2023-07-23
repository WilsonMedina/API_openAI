import { open_AI } from "../../support/pages/pom"

describe('openAI | API', function () {

	before('', () => {

		cy.fixture('data/data').then(ftx => { this.ftx = ftx })

	})
	it('Validate create a chat', () => {

		let message = this.ftx.messages

		open_AI.writeChat(message).then(response => {
			expect(response.status).eq(200)
			expect(response.body).to.have.property('id')
			expect(response.body.choices[0].message).to.have.property('content').to.contain('\n')
		})

	})
	it('Validate not create a chat with messages empty', () => {

		open_AI.writeChat().then(response => {
			expect(response.status).eq(400)
			expect(response.body.error).to.have.property('param').eq(null)
		})

	})
	it('Validate create images', () => {

		let nData = this.ftx.image.n
		let promptData = this.ftx.image.prompt

		open_AI.createImage(promptData).then(response => {
			expect(response.status).to.eq(200)
			expect(response.body).to.have.property('data').and.to.be.an('array').and.to.have.lengthOf(nData)
		})

	})
	it('Validate not create images with prompt empty', () => {

		open_AI.createImage().then(response => {
			expect(response.status).eq(400)
			expect(response.body.error).to.have.property('param').eq(null)
		})

	})
	it('Validate moderation in the entered text', () => {

		let enter = this.ftx.input

		open_AI.inputModeration(enter).then(response => {
			expect(response.status).to.eq(200)
			expect(response.body.results[0].categories).to.have.property('violence').eq(true)
		})
	})
	it('Validate not moderation with the entered text empty', () => {

		open_AI.inputModeration().then(response => {
			expect(response.status).to.eq(200)
			expect(response.body.results[0].categories).to.have.property('violence').eq(false)
		})
	})
})









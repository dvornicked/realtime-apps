import express from 'express'
import cors from 'cors'
import events from 'events'

const emmiter = new events.EventEmitter()

export const app = express()
app.use(cors())
app.use(express.json())

app.get('/get-messages', (req, res) => {
	emmiter.once('newMessage', (message) => {
		res.json(message)
	})
})

app.post('/new-messages', (req, res) => {
	const message = req.body
	emmiter.emit('newMessage', message)
	res.status(200).end()
})

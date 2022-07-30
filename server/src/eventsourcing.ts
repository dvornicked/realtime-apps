import express from 'express'
import cors from 'cors'
import events from 'events'

const emitter = new events.EventEmitter()

export const app = express()
app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
	res.writeHead(200, {
		Connection: 'keep-alive',
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
	})
	emitter.on('newMessage', (message) => {
		res.write(`data: ${JSON.stringify(message)} \n\n`)
	})
})

app.post('/new-messages', (req, res) => {
	const message = req.body
	emitter.emit('newMessage', message)
	res.status(200).end()
})

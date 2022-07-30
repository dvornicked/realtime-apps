import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react'
import { useState, KeyboardEvent, useEffect } from 'react'
import axios from 'axios'

interface IMessage {
	id: number
	message: string
}

export const EventSourcing = () => {
	const [messages, setMessages] = useState<IMessage[]>([])
	const [value, setValue] = useState<string>('')

	useEffect(() => {
		subscribe()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const subscribe = async () => {
		const eventSourcing = new EventSource('http://localhost:3001/connect')
		eventSourcing.onmessage = ({data}) => {
			const message = JSON.parse(data)
			setMessages(prev => [message, ...prev])
		}
	}

	return (
		<>
			<Text align="center" fontSize="xl" mb="4">
				Event Sourcing
			</Text>
			<Flex>
				<Input
					value={value}
					onChange={(e: KeyboardEvent<HTMLInputElement>) => {
						setValue(e.target.value)
					}}
					type="text"
				/>
				<Button
					onClick={async () => {
						setValue('')
						await axios.post('http://localhost:3001/new-messages', {
							id: Date.now(),
							message: value,
						})
					}}
				>
					Send
				</Button>
			</Flex>
			<VStack>
				{messages.map((item) => (
					<Box key={item.id}>{item.message}</Box>
				))}
			</VStack>
		</>
	)
}

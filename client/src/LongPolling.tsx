import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react'
import { useState, KeyboardEvent, useEffect } from 'react'
import axios from 'axios'

interface IMessage {
	id: number
	message: string
}

export const LongPulling = () => {
	const [messages, setMessages] = useState<IMessage[]>([])
	const [value, setValue] = useState<string>('')

	useEffect(() => {
		subscribe()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const subscribe = async () => {
		try {
			const { data } = await axios.get('http://localhost:3001/get-messages')
			setMessages(prev => [data, ...prev])
			await subscribe()
		} catch (e) {
			setTimeout(() => {
				subscribe()
			}, 500)
		}
	}

	return (
		<>
			<Text align="center" fontSize="xl" mb="4">
				Long Polling
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

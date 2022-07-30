import { Container } from '@chakra-ui/react'
import { EventSourcing } from './EventSourcing'
import { LongPulling } from './LongPolling'

export const App = () => {
	return (
		<Container my="12">
			<EventSourcing />
		</Container>
	)
}

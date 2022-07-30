import { app } from './longpolling'

const PORT = 3001

app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}`))

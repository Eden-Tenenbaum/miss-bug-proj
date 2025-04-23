import { eventBusService } from '../../services/event-bus.service.js'
const { useEffect, useState } = React

export function UserMsg() {
	const [msg, setMsg] = useState(null)

	useEffect(() => {
		if (!eventBusService || typeof eventBusService.on !== 'function') {
			console.error('eventBusService or on method not available');
			return;
		}

		const unsubscribe = eventBusService.on('show-user-msg', msg => {
			setMsg(msg)
			setTimeout(() => setMsg(null), 3000)
		})

		// Return the unsubscribe function for cleanup
		return unsubscribe;
	}, [])

	if (!msg) return null

	const type = msg.type || '';
	const text = msg.txt || '';

	return (
		<section className={'user-msg ' + type}>
			<p>{text}</p>
			<button className="close-btn" onClick={() => setMsg(null)}>×</button>
		</section>
	)
}
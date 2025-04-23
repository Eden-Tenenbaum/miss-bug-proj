import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug }) {
    if (!bugs || bugs.length === 0) return <p>No bugs to show</p>
    return (
        <ul className="bug-list">
            {bugs.map(bug => (
                <li key={bug._id}>
                    <BugPreview bug={bug} onRemoveBug={onRemoveBug} />
                </li>
            ))}
        </ul>
    )
}

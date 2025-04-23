export function BugPreview({ bug, onRemoveBug }) {
    return (
        <article className="bug-preview">
            <h4>{bug.title}</h4>
            <p>Severity: {bug.severity}</p>
            <p>Created: {new Date(bug.createdAt).toLocaleString()}</p>
            <button onClick={() => onRemoveBug(bug._id)}>Remove</button>
            <a href={`#/bug/${bug._id}`}>Details</a>
        </article>
    )
}

const { useState, useEffect } = React

export function BugFilter({ onSetFilter }) {
    const [filterBy, setFilterBy] = useState({ txt: '', minSeverity: '' })

    useEffect(() => {
        onSetFilter(filterBy)
    }, [filterBy])

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterBy(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section className="bug-filter">
            <form onSubmit={ev => ev.preventDefault()}>
                <input
                    type="text"
                    name="txt"
                    value={filterBy.txt}
                    onChange={handleChange}
                    placeholder="Search bugs"
                />
                <select name="minSeverity" value={filterBy.minSeverity} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="1">Low (1)</option>
                    <option value="2">Medium (2)</option>
                    <option value="3">High (3)</option>
                </select>
            </form>
        </section>
    )
}

import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { bugService } from './bug.service.js'
import { loggerService } from './logger.service.js'
import { fileURLToPath } from 'url'
import path from 'path'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/api/bug', (req, res) => {

    bugService.query()
        .then(bugs => res.send(bugs))
        .catch(err => {
            loggerService.error('Cannot get bug', err)
            res.status(500).send('Error loading bugs')
        })
})

app.post('/api/bug', (req, res) => {
    const bugToSave = req.body
    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
        .catch(err => {
            loggerService.error('Cannot save bug', err)
            res.status(400).send('Cannot save bag')
        })

})

app.put('/api/bug/:bugId', (req, res) => {
    const bugToSave = { ...req.body, _id: req.params.bugId }
    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
        .catch(err => {
            loggerService.error('Cannot update bug', err)
            res.status(400).send('Cannot update bug')
        })
})

app.delete('/api/bug/:bugId', (req, res) => {
    const bugId = req.params.bugId
    bugService.remove(bugId)
        .then(() => res.send({ msg: `Bug ${bugId} removed` }))
        .catch(err => {
            loggerService.error('Cannot remove bug', err)
            res.status(400).send('Cannot remove bug')
        })
})

app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    let visitedBugIds = []
    if (req.cookies.visitedBugs) {
        try {
            visitedBugIds = JSON.parse(req.cookies.visitedBugs)
            if (!Array.isArray(visitedBugIds)) visitedBugIds = []
        } catch {
            visitedBugIds = []
        }
    }
    if (!visitedBugIds.includes(bugId)) visitedBugIds.push(bugId)
    if (visitedBugIds.length > 3) {
        return res.status(401).send('wait for a bit')
    }

    res.cookie('visitedBugs', JSON.stringify(visitedBugIds), { maxAge: 15000 })

    bugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch(err => {
            loggerService.error('Cannot get bug', err)
            res.status(400).send('Cannot get bug')
        })
})

const port = 3030
app.listen(port, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`))



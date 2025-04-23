import fs from 'fs'
import { utilService } from './util.service.js'

const bugs = utilService.readJsonFile('data/bugs.json')


export const bugService = {
    query,
    getById,
    remove,
    save,
}

function query(filterBy = {}) {
    const bugs = utilService.readJsonFile('data/bugs.json')
    return Promise.resolve(bugs)

    // let bugsToDisplay = [...bugs]
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     bugsToDisplay = bugsToDisplay.filter(bug => regex.test(bug.title) || regex.test(bug.description))
    // }
    // if (filterBy.minSeverity) {
    //     bugsToDisplay = bugsToDisplay.filter(bug => bug.severity >= +filterBy.minSeverity)
    // }
    // return Promise.resolve(bugsToDisplay)
}

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('cannot find bug - ' + bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    const bugIdx = bugs.findIndex(bug => bug._id === bugId)
    if (bugIdx === -1) return Promise.reject('cannot remove bug - ' + bugId)
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}

function save(bugToSave) {
    if (bugToSave._id) {
        const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
        if (bugIdx === -1) return Promise.reject('cannot update bug - ' + bugToSave._id)
        bugs[bugIdx] = { ...bugs[bugIdx], ...bugToSave }
    } else {
        bugToSave._id = utilService.makeId()
        bugToSave.createdAt = Date.now()
        bugs.push(bugToSave)
    }
    return _saveBugsToFile().then(() => bugToSave)
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data')
        }
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}
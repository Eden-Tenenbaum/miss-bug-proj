import axios from "axios"

const BASE_URL = '/api/bug'

export const bugService = {
    query,
    getById,
    remove,
    save,
    getEmptyBug,
    getDefaultFilter
}

function query(filterBy = {}) {
    return axios.get(BASE_URL, { params: filterBy })
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(`${BASE_URL}/${bugId}`)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.delete(`${BASE_URL}/${bugId}`)
        .then(res => res.data)
}

function save(bug) {
    if (bug._id) {
        return axios.put(`${BASE_URL}/${bug._id}`)
            .then(res => res.data)
    } else {
        return axios.post(BASE_URL, bug)
            .then(res => res.data)
    }
}

function getEmptyBug() {
    return {
        title: '',
        description: '',
        severity: 1,
        labels: []
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        minSeverity: 0,
        labels: '',
        sortBy: 'createdAt',
        sortDir: 1,
        pageIdx: 0
    }
}
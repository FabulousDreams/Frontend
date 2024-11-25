import axios from 'axios'

const API_URL = 'http://localhost:5005/api/dreams/analytics'

export const fetchAnalysis = async () => {
    const response = await axios.get(`${API_URL}`)
    return response.data
}
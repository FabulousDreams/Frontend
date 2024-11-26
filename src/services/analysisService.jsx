import axios from 'axios'

const API_BASE_URL = 'http://localhost:5005/api'

export const fetchEmotionsAnalysis = async () => {
  const response = await axios.get(`${API_BASE_URL}/analysis/emotions`, {})
  console.log(response)
  return response.data
}

export const fetchTagsAnalysis = async () => {
  const response = await axios.get(`${API_BASE_URL}/analysis/tags`, {})
  return response.data
}

export const fetchTrendsAnalysis = async () => {
  const response = await axios.get(`${API_BASE_URL}/analysis/trends`, {})
  return response.data
}

import { useEffect, useState } from 'react'
import { useDreamContext } from '../context/dreamContext'
import {
  fetchEmotionsAnalysis,
  fetchTagsAnalysis,
  fetchTrendsAnalysis
} from '../services/analysisService'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Analysis = () => {
  const { tags, emotions } = useDreamContext()
  console.log(tags)
  const [emotionData, setEmotionData] = useState([])
  const [tagData, setTagData] = useState([])
  const [trendData, setTrendData] = useState([])
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState('')

  const [endDate, setEndDate] = useState('')
  const getNameByIdOrDirectName = (id, list) => {
    if (typeof id === 'string' && list.find(el => el.name === id)) {
      return id
    }
    // Otherwise, check for an _id match in the list
    const item = list.find(el => el._id === id)
    return item ? item.name : id // Return name if found, otherwise fallback to id
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emotionsAnalysis, tagsAnalysis, trendsAnalysis] =
          await Promise.all([
            fetchEmotionsAnalysis(),
            fetchTagsAnalysis(),
            fetchTrendsAnalysis()
          ])

        const mappedEmotions = emotionsAnalysis.map(item => ({
          name: getNameByIdOrDirectName(item._id, emotions),
          count: item.count
        }))

        const mappedTags = tagsAnalysis.map(item => ({
          name: getNameByIdOrDirectName(item._id, tags),
          count: item.count
        }))
        setEmotionData(mappedEmotions)
        setTagData(mappedTags)
        setTrendData(trendsAnalysis)
      } catch (err) {
        console.error('Error fetching analysis data:', err)
        setError('Failed to fetch analysis data.')
      }
    }

    fetchData()
  }, [])
  const filterTrendsByDate = data => {
    if (!startDate && !endDate) return data

    const start = startDate ? new Date(startDate) : null
    const end = endDate ? new Date(endDate) : null

    return data.filter(item => {
      const date = new Date(`${item._id.year}-${item._id.month}-01`)
      if (start && date < start) return false
      if (end && date > end) return false
      return true
    })
  }
  if (error) {
    return <p>{error}</p>
  }

  // Popular Tags
  const pieTagData = {
    labels: tagData.map(item => item.name),
    datasets: [
      {
        data: tagData.map(item => item.count),
        backgroundColor: tagData.map(
          (_, index) =>
            `rgba(${50 + index * 20}, ${100 + index * 15}, ${
              200 - index * 10
            }, 0.6)`
        ),
        borderWidth: 1
      }
    ]
  }
  //  Popular Emotions Chart
  const pieEmotionData = {
    labels: emotionData.map(item => item.name),
    datasets: [
      {
        data: emotionData.map(item => item.count),
        backgroundColor: emotionData.map(
          (_, index) =>
            `rgba(${200 - index * 10}, ${50 + index * 20}, ${
              100 + index * 15
            }, 0.6)`
        ),
        borderWidth: 1
      }
    ]
  }
  const filteredTrendData = filterTrendsByDate(trendData)
  const trendedChartData = {
    labels: filteredTrendData.map(item => `${item._id.year}-${item._id.month}`),
    datasets: [
      {
        label: 'Dream Trends Over Time',
        data: filteredTrendData.map(item => item.count),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  }
  const emotionChartData = {
    labels: emotionData.map(item => item.name),
    datasets: [
      {
        label: 'Dreams per Emotion',
        data: emotionData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

  // Prepare data for Tag Chart
  const tagChartData = {
    labels: tagData.map(item => item.name),
    datasets: [
      {
        label: 'Dreams per Tag',
        data: tagData.map(item => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  }

  // Prepare data for Trend Chart
  const trendChartData = {
    labels: trendData.map(item => `${item._id.year}-${item._id.month}`),
    datasets: [
      {
        label: 'Dream Trends Over Time',
        data: trendData.map(item => item.count),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  }

  return (
    <div>
      <h1>Dream Analysis</h1>
      {/* Date Filter */}
      <div>
        <label>
          Start Date:
          <input
            type='date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type='date'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <h2>Dreams per Emotion</h2>
        <Bar data={emotionChartData} key='emotionsChart' />
        <Pie data={pieTagData} />
      </div>
      <div>
        <h2>Dreams per Tag</h2>

        <Bar data={tagChartData} key='tagsChart' />
        <Pie data={pieEmotionData} />
      </div>
      <div>
        <h2>Dream Trends Over Time</h2>
        <Line data={trendChartData} key='trendsChart' />
        <Line data={trendedChartData} />
      </div>
    </div>
  )
}

export default Analysis

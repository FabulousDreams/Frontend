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
import { Colors } from 'chart.js'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors
)

const Analysis = () => {
  const { tags, emotions } = useDreamContext()
  console.log(tags)
  const [emotionData, setEmotionData] = useState([])
  const [tagData, setTagData] = useState([])
  const [trendData, setTrendData] = useState([])
  const [filteredTrendData, setFilteredTrendData] = useState([]) // New state to store filtered trend data
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

  const aggregateTrendData = (data) => {
    // Create a map to store aggregated counts by month and year
    const aggregated = {}

    data.forEach(item => {
      const { year, month } = item._id // Destructure year and month
      const key = `${year}-${month}` // Create a key like '2024-11'

      // If this key exists, increment the count, otherwise set the count
      if (aggregated[key]) {
        aggregated[key] += item.count
      } else {
        aggregated[key] = item.count
      }
    })

    // Convert the aggregated object into an array suitable for charting
    return Object.keys(aggregated).map(key => {
      const [year, month] = key.split('-')
      return {
        year,
        month,
        count: aggregated[key]
      }
    })
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

        // Aggregate the trend data
        const aggregatedTrendData = aggregateTrendData(trendsAnalysis)

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
        setTrendData(aggregatedTrendData)

      } catch (err) {
        console.error('Error fetching analysis data:', err)
        setError('Failed to fetch analysis data.')
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Only recalculate filtered data when trendData or start/end date change
    const filtered = filterTrendsByDate(trendData)
    setFilteredTrendData(filtered)
  }, [trendData, startDate, endDate])

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
            `rgba(${50 + index * 20}, ${100 + index * 15}, ${200 - index * 10
            }, 0.6)`
        ),
        borderWidth: 1
      }
    ]
  }
  // Popular Emotions Chart
  const pieEmotionData = {
    labels: emotionData.map(item => item.name),
    datasets: [
      {
        data: emotionData.map(item => item.count),
        backgroundColor: emotionData.map(
          (_, index) =>
            `rgba(${200 - index * 10}, ${50 + index * 20}, ${100 + index * 15
            }, 0.6)`
        ),
        borderWidth: 1
      }
    ]
  }

  // Prepare data for Trend Chart
  const trendChartData = {
    labels: filteredTrendData.map(item => `${item.year}-${item.month}`), // Format as 'YYYY-MM'
    datasets: [
      {
        label: 'Dream Trends Over Time',
        data: filteredTrendData.map(item => item.count), // Use filtered count values
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  }

  // Prepare data for Emotion Chart
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height/width
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  }

  return (
    <div>
      <h1>Dream Analysis</h1>

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

      <div className="chart-container">
        <h2>Dreams per Emotion</h2>

        <div className="chart-item">
          <Bar data={emotionChartData} options={chartOptions} key="emotionsChart" />
        </div>

        <div className="chart-item">
          <h2>Dreams per Tag</h2>
          <Pie data={pieTagData} options={chartOptions} />
        </div>
      </div>

      <div className="chart-container">
        <h2>Dreams per Tag</h2>
        <div className="chart-item">
          <Bar data={tagChartData} options={chartOptions} key="tagsChart" />
        </div>

        <div className="chart-item">
          <h2>Dreams per Emotion</h2>
          <Pie data={pieEmotionData} options={chartOptions} />
        </div>
      </div>

      <div className="chart-container">
        <h2>Dream Trends Over Time</h2>
        <div className="chart-item">
          <Line data={trendChartData} options={chartOptions} key="trendsChart" />
        </div>
      </div>
    </div>
  )
}

export default Analysis


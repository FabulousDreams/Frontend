import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from 'react-chartjs-2';
import axios from "axios";


const DreamAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:5005/api/dreams/analytics', {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            })
            .then((response) => setAnalytics(response.data))
            .catch((error) => console.error(error));
    }, []);

    // prepare data for charts
    const emotionData = {
        labels: analytics.emotionCount.map((item) => item._id),
        datasets: [
            {
                label: 'Emotion Distribution',
                data: analytics.emotionCounts.map((item) => item.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }
        ]
    };

    const tagData = {
        labels: analytics.tagCounts.map((item) => item._id),
        datasets: [
            {
                label: 'Tag Usage',
                data: analytics.tagCounts.map((item) => item.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }
        ]
    };

    const publicPrivateData = {
        labels: ['Private', 'Public'],
        datasets: [
            {
                label: 'Dream Type',
                data: analytics.publicPrivateCounts.map((item) => item.count),
                backgroundColor: ['#FF6384', '#36A2EB']
            }
        ]
    };

    const dreamsOverTimeData = {
        labels: analytics.dreamsOverTime.map((item) => item._id),
        datasets: [
            {
                label: 'Dreams Over Time',
                data: analytics.dreamsOverTime.map((item) => item.count),
                borderColor: '#36A2EB',
                fill: false
            }
        ]
    };

    return (
        <div>
            <h2>Dream Analytics</h2>
            <div style={{ width: '600px', margin: '0 auto' }}>
                <Pie data={emotionData} />
                <Bar data={tagData} />
                <Pie data={publicPrivateData} />
                <Line data={dreamsOverTimeData} />
            </div>
        </div>
    );
};

export default DreamAnalytics;

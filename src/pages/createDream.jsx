import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

import axios from 'axios'

const CreateDream = () => {
  const { user } = useAuthContext()
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    emotions: [],
    tags: [],
    isPublic: false,
    imageUrl: ''
  })

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      setForm(prevForm => ({
        ...prevForm,
        [name]: checked
      }))
    } else if (name === 'emotions' || name === 'tags') {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value.split(',').map(item => item.trim())
      }))
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const dreamData = {
      ...form,
      userId: user._id
    }

    try {
      await axios.post('/api/dreams', dreamData)
      // navigate("/dre");
    } catch (error) {
      console.error('Error creating a new dream', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type='text'
          name='title'
          value={form.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name='description'
          value={form.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date:
        <input
          type='date'
          name='date'
          value={form.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Emotions (comma separated):
        <input
          type='text'
          name='emotions'
          value={form.emotions.join(',')}
          onChange={handleChange}
        />
      </label>
      <label>
        Tags (comma separated):
        <input
          type='text'
          name='tags'
          value={form.tags.join(',')}
          onChange={handleChange}
        />
      </label>
      <label>
        Public:
        <input
          type='checkbox'
          name='isPublic'
          checked={form.isPublic}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type='text'
          name='imageUrl'
          value={form.imageUrl}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Add Dream</button>
    </form>
  )
}

export default CreateDream

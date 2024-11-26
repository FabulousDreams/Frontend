import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { useDreamContext } from '../context/dreamContext'

import axios from 'axios'

const CreateDream = () => {
  const { user } = useAuthContext()
  const { tags, emotions, createDream, error } = useDreamContext()

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
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }))
    }
  }
  const handleDropdownChange = (e, dataSource) => {
    const { name } = e.target
    const selectedOptions = Array.from(e.target.selectedOptions, option => {
      return dataSource.find(item => item._id === option.value)
    })

    setForm(prevForm => ({
      ...prevForm,
      [name]: selectedOptions
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault()

    const dreamData = {
      ...form,
      userId: user._id
    }

    try {
      await createDream(dreamData)
      // navigate('/mine-dreams')
    } catch (error) {
      console.error('Error creating a new dream', error)
    }
  }

  return (
    <div id='create-dream'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            name='description'
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date: </label>
          <input
            type='date'
            name='date'
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emotions : </label>
          <select
            name='emotions'
            multiple
            value={form.emotions.map(emotion => emotion._id)}
            onChange={e => handleDropdownChange(e, emotions)}
            required
          >
            {emotions.map(emotion => (
              <option key={emotion._id} value={emotion._id}>
                {emotion.name}
              </option>
            ))}
          </select>

          <label>Tags : </label>
          <select
            name='tags'
            multiple
            value={form.tags.map(tag => tag._id)}
            onChange={e => handleDropdownChange(e, tags)}
            required
          >
            {tags.map(tag => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Public:</label>
          <input
            type='checkbox'
            name='isPublic'
            checked={form.isPublic}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL: </label>
          <input
            type='text'
            name='imageUrl'
            value={form.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Add Dream</button>
      </form>
    </div>
  )
}

export default CreateDream

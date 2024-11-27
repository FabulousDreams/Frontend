import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { useDreamContext } from '../context/dreamContext'
import InputField from '../components/common/inputField'

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

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(form)
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
        <div className='dream-data'>
          <div className='text-area'>
            <InputField className='inputField mediumInput' label='Subject'>
              <input
                type='text'
                name='title'
                value={form.title}
                onChange={handleChange}
                required
              />
            </InputField>
            <div>
              <InputField className='inputField mediumInput' label='Date:'>
                <input
                  type='date'
                  name='date'
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </InputField>
            </div>
            <InputField className='inputField mediumInput' label='Description:'>
              <textarea
                name='description'
                value={form.description}
                onChange={handleChange}
                required
              />
            </InputField>
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
          </div>

          <div className='checkbox-area'>
            <div className='emotion'>
              <label>Emotions:</label>
              {emotions.map(emotion => (
                <div key={emotion._id}>
                  <label className='checkbox-container'>
                    <input
                      type='checkbox'
                      name='emotions'
                      value={emotion._id}
                      checked={form.emotions.some(e => e._id === emotion._id)}
                      onChange={e => {
                        const { value, checked } = e.target
                        setForm(prevForm => ({
                          ...prevForm,
                          emotions: checked
                            ? [...prevForm.emotions, emotion]
                            : prevForm.emotions.filter(e => e._id !== value)
                        }))
                      }}
                    />
                    <span className='checkmark'></span>
                    {emotion.name}
                  </label>
                </div>
              ))}
            </div>

            <hr className='solid' />
            <div className='emotion'>
              <label>Tags:</label>
              {tags.map(tag => (
                <div key={tag._id}>
                  <label className='checkbox-container'>
                    <input
                      type='checkbox'
                      name='tags'
                      value={tag._id}
                      checked={form.tags.some(t => t._id === tag._id)}
                      onChange={e => {
                        const { value, checked } = e.target
                        setForm(prevForm => ({
                          ...prevForm,
                          tags: checked
                            ? [...prevForm.tags, tag]
                            : prevForm.tags.filter(t => t._id !== value)
                        }))
                      }}
                    />
                    <span className='checkmark'></span>

                    {tag.name}
                  </label>{' '}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type='submit'>Add Dream</button>
      </form>
    </div>
  )
}

export default CreateDream

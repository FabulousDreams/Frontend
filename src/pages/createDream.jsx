import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { useDreamContext } from '../context/dreamContext'
import InputField from '../components/common/inputField'

const CreateDream = () => {
  const { user } = useAuthContext()
  const { tags, emotions, createDream, error, uploadImage } = useDreamContext()

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    emotions: [],
    tags: [],
    isPublic: false,
    imageUrl: ''
  })
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false)

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
  const handleImageUpload = async e => {
    const file = e.target.files[0]

    setWaitingForImageUrl(true)
    try {
      const imageUrl = await uploadImage(file)
      setForm(prevForm => ({ ...prevForm, imageUrl }))
    } catch (error) {
      console.error(error.message)
    } finally {
      setWaitingForImageUrl(false)
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()

    const dreamData = {
      ...form,
      userId: user._id
    }
    console.log(dreamData)
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
            <InputField className='inputField mediumInput' label='Image Upload'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                disabled={waitingForImageUrl}
              />
              {waitingForImageUrl && <p>Uploading...</p>}
            </InputField>
          </div>
          {form.imageUrl && (
            <div>
              <h4>Image Preview:</h4>
              <img
                src={form.imageUrl}
                alt='Uploaded'
                style={{ width: '100px', margin: '5px' }}
              />
            </div>
          )}
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
        <button type='submit' disabled={waitingForImageUrl}>
          {waitingForImageUrl ? 'Uploading...' : 'Add Dream'}
        </button>
      </form>
    </div>
  )
}

export default CreateDream

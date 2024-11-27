import { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { useDreamContext } from '../context/dreamContext'
const Card = ({
  id,
  title,
  subtitle,
  description,
  emotions,
  tags,
  imageUrl
}) => {
  const { updateDream, deleteDream } = useDreamContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({ title, subtitle, description })

  const handleDelete = async dreamId => {
    await deleteDream(dreamId)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData({ title, subtitle, description })
  }

  const handleSave = async () => {
    setIsEditing(false)
    await updateDream(id, editedData)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setEditedData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='card'>
      {imageUrl && (
        <div className='card-image-container'>
          <img src={imageUrl} alt='Dream Image' className='card-image' />
        </div>
      )}

      <div className='card-content'>
        {isEditing ? (
          <>
            <input
              type='text'
              name='title'
              value={editedData.title}
              onChange={handleInputChange}
              className='edit-input'
            />
            <textarea
              name='description'
              value={editedData.description}
              onChange={handleInputChange}
              className='edit-textarea'
            />
            <div className='card-actions'>
              <SaveIcon className='save-icon' onClick={handleSave} />
              <CancelIcon className='cancel-icon' onClick={handleCancel} />
            </div>
          </>
        ) : (
          <>
            {' '}
            <div className='card-actions'>
              <EditIcon className='edit-icon' onClick={handleEdit} />
              <DeleteIcon className='delete-icon' onClick={handleDelete} />
            </div>
            {title && <h3 className='card-title'>{editedData.title}</h3>}
            {emotions && emotions.length > 0 && (
              <p className='card-emotions'>Emotions: {emotions.join(', ')}</p>
            )}
            {tags && tags.length > 0 && (
              <p className='card-tags'>Tags: {tags.join(', ')}</p>
            )}
            {subtitle && <p className='card-subtitle'>{editedData.subtitle}</p>}
            {description && (
              <p className='card-description'>{editedData.description}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Card

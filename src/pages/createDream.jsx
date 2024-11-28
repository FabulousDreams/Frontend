import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { useDreamContext } from '../context/dreamContext'
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Autocomplete, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';


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

  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handlePublicChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      isPublic: e.target.value === 'true',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dreamData = {
      ...form,
      userId: user._id,
    };

    try {
      await createDream(dreamData)
      setConfirmation(true) // Show confirmation message
      setTimeout(() => setConfirmation(false), 3000);
      setForm({ 
        title: '',
        description: '',
        date: '',
        emotions: [],
        tags: [],
        isPublic: false,
        imageUrl: ''
      })
    } catch (error) {
      console.error('Error creating a new dream', error)
    }
  }

  return (
    <div id='create-dream'>
      <form onSubmit={handleSubmit} className="create-dream-form">
        <h2>Create a New Dream</h2>

        {confirmation && (
          <Alert severity="success" className="confirmation-message">
            Dream created successfully!
          </Alert>
        )}

        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={form.date}
            onChange={(newDate) =>
              setForm((prevForm) => ({
                ...prevForm,
                date: newDate,
              }))
            }
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Autocomplete
          multiple
          options={emotions}
          getOptionLabel={(option) => option.name}
          value={form.emotions}
          onChange={(e, newValue) =>
            setForm((prevForm) => ({
              ...prevForm,
              emotions: newValue,
            }))
          }
          renderInput={(params) => <TextField {...params} label="Emotions" margin="normal" />}
        />
        <Autocomplete
          multiple
          options={tags}
          getOptionLabel={(option) => option.name}
          value={form.tags}
          onChange={(e, newValue) =>
            setForm((prevForm) => ({
              ...prevForm,
              tags: newValue,
            }))
          }
          renderInput={(params) => <TextField {...params} label="Tags" margin="normal" />}
        />
        <RadioGroup
          row
          value={form.isPublic.toString()}
          onChange={handlePublicChange}
          className="public-choice"
        >
          <FormControlLabel value="false" control={<Radio />} label="Private Dream" />
          <FormControlLabel value="true" control={<Radio />} label="Public Dream" />
          
        </RadioGroup>
        <TextField
          label="Image URL"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" className='create-dream-button'>
          Create New Dream
        </Button>
      </form>
    </div>
  );
};

export default CreateDream;

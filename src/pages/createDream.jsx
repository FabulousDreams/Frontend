import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateDream = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    emotions: [],
    tags: [],
    isPublic: false,
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: checked,
      }));
    } else if (name === "emotions" || name === "tags") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value.split(",").map((item) => item.trim()),  // Split the input string into an array
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

     const dreamData = {
      ...form,
      userId: "673dd0ba159bcf268885e8ae"  // Add userId from props (or context)
    }; 

    try {
      await axios.post("/api/dreams",dreamData);
      //navigate("/dashboard");
    } catch (error) {
      console.error("Error creating a new dream", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Emotions (comma separated):
        <input
          type="text"
          name="emotions"
          value={form.emotions.join(",")}
          onChange={handleChange}
        />
      </label>
      <label>
        Tags (comma separated):
        <input
          type="text"
          name="tags"
          value={form.tags.join(",")}
          onChange={handleChange}
        />
      </label>
      <label>
        Public:
        <input
          type="checkbox"
          name="isPublic"
          checked={form.isPublic}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Dream</button>
    </form>
  );
};

export default CreateDream;

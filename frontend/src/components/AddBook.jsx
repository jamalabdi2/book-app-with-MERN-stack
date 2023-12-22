import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fieldConfigurations = [
  { name: "name", label: "Book Name", type: "text" },
  { name: "author", label: "Author", type: "text" },
  { name: "language", label: "Language", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "year", label: "Year", type: "number" },
  { name: "datePublished", label: "Date Published", type: "date" },
  { name: "rating", label: "Rating", type: "number" },
  { name: "publisher", label: "Publisher", type: "text" },
];

const FormField = ({ name, label, type, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default function AddBook() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    language: "",
    category: "",
    year: 0,
    datePublished: "",
    rating: 0,
    publisher: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postBookUrl = "http://localhost:5400/bookapi/v1/postBook";
      const response = await fetch(postBookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        navigate('/books')
      } else {
        const result = await response.json();
        console.log("error: ", result);
      }
    } catch (error) {
      console.error("Error submitting form");
    }
  };

  return (
    <div>
      <form action="" method="POST" onSubmit={handleSubmit}>
        {fieldConfigurations.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
        <div className="">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

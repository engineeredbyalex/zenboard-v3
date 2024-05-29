// importing Layout
import Layout from "@/components/Layout";
// importing useEffect and useState
import { useEffect, useState } from "react";
// importing axios
import axios from "axios";

function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    setIsLoading(true);
    axios.get('/api/categories/categories').then(result => {
      setCategories(result.data);
      setIsLoading(false);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map(p => ({
        name: p.name,
        values: p.values.split(','),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories/categories', data);
    }

    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(',')
      }))
    );
  }

  function deleteCategory(category) {
    const confirmDelete = window.confirm(`Do you want to delete ${category.name}?`);

    if (confirmDelete) {
      const { _id } = category;
      axios.delete('/api/categories/categories?_id=' + _id)
        .then(() => {
          fetchCategories();
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  }

  function addProperty() {
    setProperties(prev => {
      return [...prev, { name: '', values: '' }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 flex flex-col">
        <div className="text-center mb-8">
          <h3 className="uppercase font-bold text-black text-2xl">
            Categories
          </h3>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-2/5 md:mr-4">
            <div className="mb-4 text-center">
              <label className="uppercase text-gray-600 ">
                <p className="font-semibold ">
                  Add/Edit Category
                </p>
              </label>
              <form onSubmit={saveCategory} className="flex flex-col gap-4">
                <input
                  className="input py-3 px-3"
                  type="text"
                  placeholder="Category name"
                  onChange={ev => setName(ev.target.value)}
                  value={name} />
                <select
                  className="input py-3 px-3"
                  onChange={ev => setParentCategory(ev.target.value)}
                  value={parentCategory}>
                  <option  value="">Main category</option>
                  {categories.length > 0 && categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
                <button
                  onClick={addProperty}
                  type="button"
                  className="btn-primary">
                  <h5 className="font-normal uppercase  text-center ">
                    Add Property
                  </h5>
                </button>
                {properties.length > 0 && properties.map((property, index) => (
                  <div key={index} className="flex gap-1 items-center">
                    <input type="text"
                      value={property.name}
                      className="input"
                      onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                      placeholder="Property name" />
                    <input type="text"
                      className="input"
                      onChange={ev =>
                        handlePropertyValuesChange(
                          index,
                          property, ev.target.value
                        )}
                      value={property.values}
                      placeholder="Values, comma separated" />
                    <button
                      onClick={() => removeProperty(index)}
                      type="button"
                      className="btn-red">
                      <h5 className="font-normal uppercase text-black text-center">
                        Delete
                      </h5>
                    </button>
                  </div>
                ))}
                <div className="flex justify-center">
                  {editedCategory && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditedCategory(null);
                        setName('');
                        setParentCategory('');
                        setProperties([]);
                      }}
                      className="btn-primary">
                      <h5 className="font-normal uppercase text-black text-center">
                        Cancel
                      </h5>
                    </button>
                  )}
                  <button type="submit"
                    className="btn-primary w-full">
                   <h5 className="font-normal   text-center ">
                        Save
                      </h5>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full md:w-3/5 text-center">
            {!editedCategory && (
              <div>
                <h4 className="uppercase font-bold text-black  b-4 ">Categories List</h4>
                {isLoading && <p>Loading...</p>}
                {!isLoading && categories.length === 0 && <p>No categories found.</p>}
                {!isLoading && categories.length > 0 && (
                  <ul className="list-disc pl-4">
                    {categories.map(category => (
                      <li key={category._id} className="mb-2">
                        <span className="font-bold">{category.name}</span> - {category.parent?.name || "No parent"}
                        <div className="flex flex-col gap-2">
                          <button
                          onClick={() => editCategory(category)}
                          className="btn-primary w-full">
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(category)}
                          className="btn-red w-full">
                          Delete
                        </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Categories;

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  newPrice: existingNewPrice,
  images: existingImages,
  category: assignedCategory,
  properties: existingProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [newPrice, setNewPrice] = useState(existingNewPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState(existingProperties || []);

  useEffect(() => {
    axios.get("/api/categories/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  function addProperty() {
    setProperties([...properties, { name: "", values: [""] }]);
  }

  function removeProperty(index) {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
  }

  function addPropertyValue(propertyIndex) {
    const newProperties = [...properties];
    newProperties[propertyIndex].values.push("");
    setProperties(newProperties);
  }

  function removePropertyValue(propertyIndex, valueIndex) {
    const newProperties = [...properties];
    newProperties[propertyIndex].values.splice(valueIndex, 1);
    setProperties(newProperties);
  }

  function handlePropertyNameChange(ev, index) {
    const newProperties = [...properties];
    newProperties[index].name = ev.target.value;
    setProperties(newProperties);
  }

  function handlePropertyValueChange(ev, propertyIndex, valueIndex) {
    const newProperties = [...properties];
    newProperties[propertyIndex].values[valueIndex] = ev.target.value;
    setProperties(newProperties);
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      try {
        const res = await axios.post("/api/upload", data);
        setImages((oldImages) => {
          return [...oldImages, ...res.data.links];
        });
        setIsUploading(false);
      } catch (error) {
        console.error('Error uploading images:', error);
        setIsUploading(false);
      }
    }
  }

  function deleteImage(index) {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  async function saveProduct(ev) {
    ev.preventDefault();

    const data = {
      title,
      description,
      price,
      newPrice,
      images,
      category,
      properties: properties.map(property => ({ name: property.name, values: property.values })),
    };

    try {
      if (_id) {
        await axios.put("/api/products/products", { ...data, _id });
      } else {
        await axios.post("/api/products/products", data);
      }

      setGoToProducts(true);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }

  return (
    <form onSubmit={saveProduct} className="p-4">
      <div className="font-medium uppercase w-full flex items-center justify-center">
        <h5>Product Name</h5>
      </div>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="border p-2 my-2 w-full"
      />
      <select
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
        className="border p-2 my-2 w-full"
      >
        <option value="">No Category Selected</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c.name} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      <div className="w-full mb-10">
        <div className="flex w-full text-center items-center justify-center font-medium uppercase">
          <h5>Properties</h5>
        </div>
        <div className="flex flex-wrap gap-[2rem]">
          {properties.map((property, index) => (
            <div key={index} className="flex flex-wrap gap-5 w-full">
              <input
                className="border p-2 w-full"
                type="text"
                placeholder="Property Name"
                value={property.name}
                onChange={(ev) => handlePropertyNameChange(ev, index)}
              />
              {property.values?.map((value, valueIndex) => (
                <div key={valueIndex} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Property Value"
                    value={value}
                    onChange={(ev) => handlePropertyValueChange(ev, index, valueIndex)}
                    className="border px-5"
                  />
                  <button
                    type="button"
                    onClick={() => removePropertyValue(index, valueIndex)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-5 w-full">
                <button className="bg-black text-white font-medium uppercase w-[50%] rounded h-[3rem]" type="button" onClick={() => addPropertyValue(index)}>
                  Add Value
                </button>
                <button className="bg-black text-white font-medium uppercase w-[50%] rounded h-[3rem]" type="button" onClick={() => removeProperty(index)}>
                  Delete Property
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addProperty}
          className="bg-black text-white font-medium uppercase w-full rounded mt-10 h-[3rem]"
        >
          Add Property
        </button>
      </div>
      <div className="font-medium uppercase w-full flex items-center justify-center">
        <h5>Images</h5>
      </div>
      <div className="mb-2 flex flex-wrap gap-5 items-center justify-center w-full">
        <ReactSortable
          list={images}
          className="grid grid-cols-2 w-auto items-center justify-center gap-1"
          setList={(images) => setImages(images)}
        >
          {images?.length > 0 &&
            images.map((link, index) => (
              <div
                key={link}
                className="h-[10rem] w-[10rem] bg-white p-4 shadow-sm rounded-sm border border-gray-200 flex flex-col items-center justify-center"
              >
                <img
                  src={link}
                  alt=""
                  className="rounded-lg w-[150px] h-[150px]"
                />
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mt-1"
                  onClick={() => deleteImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
        </ReactSortable>
        {isUploading && <div className="h-24 flex items-center"></div>}

        <label className="h-[200px] w-[200px] cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add Image</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <div className="font-medium uppercase w-full flex items-center justify-center">
        <h5>Description</h5>
      </div>
      <textarea
        className="min-h-[30vh] border p-2 my-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <div>
        <div>
          <div className="font-medium uppercase w-full flex items-center justify-center">
            <h5>Price</h5>
          </div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            className="border p-2 my-2 w-full"
          />
        </div>
        <div className="font-medium uppercase w-full flex items-center justify-center">
          <h5>Extras - UNDER DEVELOPMENT</h5>
        </div>
        <div className="font-medium uppercase w-full flex items-center justify-center">
          <h5>Discounted Price</h5>
        </div>
        <input
          type="number"
          placeholder="New Price"
          value={newPrice}
          onChange={(ev) => setNewPrice(ev.target.value)}
          className="border p-2 my-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white font-bold py-2 px-4 rounded mt-4 w-full"
      >
        Save
      </button>
    </form>
  );
}

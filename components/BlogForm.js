import React, { useState } from "react";
import axios from "axios";

export default function BlogForm({ _id, title: existingTitle, properties: existingProperties }) {
    const [title, setTitle] = useState(existingTitle || "");
    const [properties, setProperties] = useState(existingProperties || []);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    async function saveBlog(ev) {
        ev.preventDefault();

        const data = {
            title,
            category,
            properties: properties.map(property => ({
                name: property.name,
                values: property.values,
                images: property.images // Include images for each property
            })),
        };

        try {
            if (_id) {
                await axios.put(`/api/blog/${_id}`, data);
            } else {
                await axios.post("/api/blog", data);
            }
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    }

    function addProperty() {
        setProperties([...properties, { name: "", values: [""], images: [] }]);
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

    async function uploadImages(ev, propertyIndex) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            try {
                const res = await axios.post("/api/upload", data);
                setProperties(prevProperties => {
                    const newProperties = [...prevProperties];
                    newProperties[propertyIndex].images = [...newProperties[propertyIndex].images, ...res.data.links];
                    return newProperties;
                });
                setIsUploading(false);
            } catch (error) {
                console.error('Error uploading images:', error);
                setIsUploading(false);
            }
        }
    }

    return (
        <form onSubmit={saveBlog} className="p-4">
            <div className="flex w-full text-center items-center justify-center font-medium uppercase">
                <h5>Blog Title</h5>
            </div>
            <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                className="border p-2 my-2 w-full"
            />
            <div className="flex flex-col w-full text-center items-center justify-center font-medium uppercase">
                <h5>Blog Category</h5>
                <select
                    value={category}
                    onChange={(ev) => setCategory(ev.target.value)}
                    className="border p-2 my-2 w-full"
                >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-full mb-10">
                <div className="flex w-full text-center items-center justify-center font-medium uppercase">
                    <h5>Blog Content</h5>
                </div>
                <div className="flex flex-wrap gap-[2rem]">
                    {properties.map((property, index) => (
                        <div key={index} className="flex flex-wrap gap-5 w-full">
                            <div className="mb-2 flex flex-wrap gap-5 items-center justify-center w-full">
                                <label className="cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
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
                                    <input type="file" onChange={(ev) => uploadImages(ev, index)} className="hidden" />
                                </label>
                                {property.images?.map((link, idx) => (
                                    <div key={idx}>
                                        <img src={link} alt={`Image ${idx + 1}`} className="w-24 h-24 object-cover rounded" />
                                    </div>
                                ))}
                            </div>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                placeholder="Title"
                                value={property.name}
                                onChange={(ev) => handlePropertyNameChange(ev, index)}
                            />
                            {property.values?.map((value, valueIndex) => (
                                <input
                                    key={valueIndex}
                                    type="text"
                                    placeholder="Content"
                                    value={value}
                                    onChange={(ev) => handlePropertyValueChange(ev, index, valueIndex)}
                                    className="border px-5"
                                />
                            ))}
                            <div className="flex items-center gap-5 w-full">
                                <button
                                    className="bg-black text-white font-medium uppercase w-[50%] rounded h-[3rem]"
                                    type="button"
                                    onClick={() => addPropertyValue(index)}
                                >
                                    <h5>Add Content</h5>
                                </button>
                                <button
                                    className="bg-black text-white font-medium uppercase w-[50%] rounded h-[3rem]"
                                    type="button"
                                    onClick={() => removeProperty(index)}
                                >
                                    <h5>Delete</h5>
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
                    <h5>Add Content</h5>
                </button>
            </div>
            <button
                type="submit"
                className="bg-black text-white font-medium uppercase w-full rounded mt-10 h-[3rem]"
            >
                <h5>Save Blog Post</h5>
            </button>
        </form>
    );
}

"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editingImage, setEditingImage] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected API response", data);
          setProducts([]);
        }
      });
  }, []);

  async function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);

    setUploading(true);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });
    const uploaded = await res.json();
    setUploading(false);

    if (!res.ok || !uploaded?.secure_url) {
      console.error("Upload failed:", uploaded);
      throw new Error(uploaded?.error || "Upload failed");
    }
    return uploaded.secure_url;
  }

  async function addProduct(e) {
    e.preventDefault();

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, description, image: imageUrl }),
      credentials: "include",
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Create product failed:", errText);
      alert("Failed to add product");
      return;
    }

    const created = await res.json();
    setTitle("");
    setPrice("");
    setDescription("");
    setImage(null);
    setProducts((prev) => [...prev, created]);
    toast.success("Product added successfully!");
  }

  async function deleteProduct(id) {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("🗑️ Product deleted successfully!");
    }
  }

  async function updateProduct(e) {
    e.preventDefault();
    const { _id, title, price, description } = editing;

    let imageUrl = editing.image;
    if (editingImage) {
      imageUrl = await uploadImage(editingImage);
    }

    const res = await fetch(`/api/products/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, description, image: imageUrl }),
      credentials: "include",
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setEditing(null);
      setEditingImage(null);
      toast.success("Product updated successfully!");
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 container max-w-full md:max-w-6xl shadow-lg border border-gray-300 my-6 md:my-10 rounded-xl bg-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-800">
        Admin Dashboard
      </h1>

      {/* Add Products */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-600 mb-4 md:mb-5">
        Add Products
      </h1>

      {/* Add product form */}
      <form
        onSubmit={addProduct}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10"
      >
        <input
          type="text"
          placeholder="Title"
          className="p-2 md:p-3 border outline-0 border-gray-400 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="p-2 md:p-3 border outline-0 border-gray-400 rounded-lg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="p-2 md:p-3 border outline-0 border-gray-400 rounded-lg sm:col-span-2 lg:col-span-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="p-2 border outline-0 border-gray-400 rounded-lg"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-2 md:p-3 font-semibold cursor-pointer"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>

      {/* Products list */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-5 text-gray-700">
          My Products
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="border border-gray-400 rounded-lg p-3 md:p-4 shadow-md hover:shadow-lg transition"
            >
              {editing && editing._id === p._id ? (
                // Edit mode
                <form onSubmit={updateProduct} className="space-y-2">
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                    className="w-full border outline-0 border-gray-400 p-2 rounded"
                  />
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) =>
                      setEditing({ ...editing, price: e.target.value })
                    }
                    className="w-full border outline-0 border-gray-400 p-2 rounded"
                  />
                  <input
                    type="text"
                    value={editing.description}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                    className="w-full border outline-0 border-gray-400 p-2 rounded"
                  />

                  {editing.image && (
                    <img
                      src={editing.image}
                      alt={editing.title}
                      className="h-28 md:h-32 w-full object-cover rounded mb-2"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border outline-0 border-gray-300 p-2 rounded"
                    onChange={(e) => setEditingImage(e.target.files[0])}
                  />

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded">
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-300 px-3 py-1 rounded"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-36 md:h-40 w-full object-cover rounded mb-3"
                    />
                  )}
                  <div className="border p-3 md:p-4 rounded-lg border-gray-400">
                    <h3 className="font-semibold text-base md:text-lg mb-1">
                      {p.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2 border p-2 rounded border-gray-400">
                      {p.description}
                    </p>
                    <div className="border p-3 md:p-4 rounded border-gray-400">
                      <p className="text-green-700 font-bold text-sm md:text-base">
                        ₦{p.price}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-3">
                        <button
                          className="bg-gray-600 hover:bg-gray-500 cursor-pointer text-white px-3 py-1 rounded"
                          onClick={() => setEditing(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-400 cursor-pointer text-white px-3 py-1 rounded"
                          onClick={() => deleteProduct(p._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

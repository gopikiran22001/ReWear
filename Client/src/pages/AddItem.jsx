import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { Alert } from "@/components/ui/alert";

export default function AddItem() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [formData, setFormData] = useState({
    name: "", // Changed from title to name
    description: "",
    brand: "",
    category: "",
    condition: "",
    size: "",
    colors: [], // Changed from color to colors array
    tags: [], // Added tags array
    exchangePreference: "",
    cost: 0, // Added cost field
  });

  const categories = [
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Accessories",
    "Shoes",
    "Other",
  ];

  const conditions = ["New with tags", "Like new", "Good", "Fair", "Poor"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "colors" || name === "tags") {
      // Handle arrays by splitting on commas
      setFormData((prev) => ({
        ...prev,
        [name]: value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }));
    } else if (name === "cost") {
      // Ensure cost is a non-negative number
      const numValue = Math.max(0, parseFloat(value) || 0);
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 5 images
    if (files.length > 5) {
      toast({
        title: "Too many images",
        description: "Please select a maximum of 5 images.",
        variant: "destructive",
      });
      return;
    }

    setImages(files);

    // Create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !images.length || formData.cost < 0) {
      toast({
        title: "Validation Error",
        description:
          "Product name, at least one image, and a valid cost are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          // Handle arrays (colors and tags)
          formData[key].forEach((value) => {
            formDataToSend.append(key, value);
          });
        } else {
          const value = formData[key] || "";
          formDataToSend.append(key, value);
        }
      });

      // Append all images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await fetch(API_ENDPOINTS.PRODUCT.BASE, {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.errors?.join(", ") || "Failed to create product"
        );
      }

      toast({
        title: "Success!",
        description: "Item added successfully! Redirecting to dashboard...",
      });

      // Clean up preview URLs
      previewUrls.forEach((url) => URL.revokeObjectURL(url));

      // Immediate navigation
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message || "Failed to add item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-eco-600"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add New Item
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div className="mb-6">
                <Label>Product Images</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="images"
                  />
                  <label
                    htmlFor="images"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-600">
                      Click to upload images (max 5)
                    </span>
                  </label>
                </div>
                {/* Image Previews */}
                {previewUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-5 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  >
                    <option value="">Select Condition</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition.toLowerCase()}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="colors">Colors (comma-separated)</Label>
                  <Input
                    id="colors"
                    name="colors"
                    value={formData.colors.join(", ")}
                    onChange={handleInputChange}
                    placeholder="e.g. Red, Blue, Green"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags.join(", ")}
                    onChange={handleInputChange}
                    placeholder="e.g. Summer, Casual, Vintage"
                  />
                </div>

                <div>
                  <Label htmlFor="cost">Cost (in Rs.) *</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.cost}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter the cost of your item (minimum 0)
                  </p>
                </div>
              </div>

              <div className="col-span-full">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="exchangePreference">Exchange Preference</Label>
                <Textarea
                  id="exchangePreference"
                  name="exchangePreference"
                  value={formData.exchangePreference}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="What would you like in exchange for this item?"
                  required
                />
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={loading || !images.length}
                  className="bg-eco-600 hover:bg-eco-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Item...
                    </>
                  ) : (
                    "Add Item"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

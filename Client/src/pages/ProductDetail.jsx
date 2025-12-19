import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Leaf, Droplets, Heart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.PRODUCT.BY_ID}?productId=${productId}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch product");
      const data = await response.json();
      setProduct(data.products);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async () => {
    setRequesting(true);
    try {
      const response = await fetch(API_ENDPOINTS.REQUEST.BASE, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) throw new Error("Failed to create request");

      toast({
        title: "Success",
        description: "Exchange request sent successfully!",
      });
      navigate("/requests");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setRequesting(false);
    }
  };

  const toggleWishlist = async () => {
    try {
      const isInWishlist = user?.wishlist?.includes(productId);
      const method = isInWishlist ? "DELETE" : "PUT";

      const response = await fetch(
        `${API_ENDPOINTS.USER.WISHLIST}?productId=${productId}`,
        { method, credentials: "include" }
      );

      if (!response.ok) throw new Error("Failed to update wishlist");

      toast({
        title: "Success",
        description: isInWishlist
          ? "Removed from wishlist"
          : "Added to wishlist",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-eco-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-eco-600"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-full h-20 object-cover rounded cursor-pointer ${
                      selectedImage === idx ? "ring-2 ring-eco-600" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex gap-2 mb-4">
                <Badge className="bg-eco-100 text-eco-900">
                  {product.condition}
                </Badge>
                <Badge className="bg-eco-100 text-eco-900">
                  {product.size}
                </Badge>
                <Badge className="bg-eco-100 text-eco-900">
                  {product.category}
                </Badge>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Brand</p>
                <p className="font-semibold">{product.brand}</p>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-eco-600" />
                  <span className="text-sm">
                    {product.carbonFootprint} kg CO₂
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-eco-600" />
                  <span className="text-sm">{product.waterUsage} L saved</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-2xl font-bold text-eco-600">
                  ₹{product.cost}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleRequest}
                  disabled={requesting || product.owner._id === user?._id}
                  className="flex-1 bg-eco-600 hover:bg-eco-700"
                >
                  {requesting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Request Exchange"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={toggleWishlist}
                  className="border-eco-600 text-eco-600"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

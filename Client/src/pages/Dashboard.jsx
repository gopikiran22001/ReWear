import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { API_ENDPOINTS } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import {
  Leaf,
  Package,
  RefreshCcw,
  Heart,
  Bell,
  Settings,
  LogOut,
  Droplets,
  Plus,
  MessageSquare,
  FileText,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DEFAULT_PROFILE_IMAGE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

// Add fetchMyProducts function
async function fetchMyProducts() {
  const response = await fetch(
    API_ENDPOINTS.PRODUCT.MY_PRODUCTS,
    {
      credentials: "include", // send cookies for JWT auth
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products;
}

export default function Dashboard() {
  const { user, signOut, fetchUserDetails } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // Fetch user details when dashboard mounts
  useEffect(() => {
    const loadUserDetails = async () => {
      await fetchUserDetails();
    };
    loadUserDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    // ... existing user fetch ...
    const loadProducts = async () => {
      try {
        setLoadingProducts(true);
        setProductsError(null);
        const products = await fetchMyProducts();
        setProducts(products);
      } catch {
        setProductsError("Could not load your products.");
      } finally {
        setLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  const handleSignOut = async () => {
    try {
      toast({
        title: "Signing out... 👋",
        description: "Please wait while we clear your session.",
      });

      const { error } = await signOut();

      if (error) {
        toast({
          title: "Logout failed",
          description: "An error occurred while signing out. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Logout failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      title: "Items Listed",
      value: "12",
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Swaps Completed",
      value: "8",
      icon: RefreshCcw,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "CO₂ Saved",
      value: user?.co2Saved ? `${user.co2Saved}kg` : "0kg",
      icon: Leaf,
      color: "text-eco-600",
      bgColor: "bg-eco-100",
    },
    {
      title: "Water Saved",
      value: user?.waterSaved ? `${user.waterSaved}L` : "0L",
      icon: Droplets,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Leaf className="h-8 w-8 text-eco-600" />
              <span className="text-2xl font-bold text-eco-900">ReWear</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/requests">
                <Button variant="ghost" size="icon" title="Requests">
                  <FileText className="h-5 w-5 text-gray-600" />
                </Button>
              </Link>
              <Link to="/transactions">
                <Button variant="ghost" size="icon" title="Transactions">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="ghost" size="icon" title="Chat">
                  <MessageSquare className="h-5 w-5 text-gray-600" />
                </Button>
              </Link>
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {user?.notifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {user.notifications.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/profile">
                <div className="flex items-center space-x-2 text-gray-600 hover:text-eco-600">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={user?.profilePhoto || DEFAULT_PROFILE_IMAGE}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-red-600"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section with Add Item Button */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={user?.profilePhoto || DEFAULT_PROFILE_IMAGE}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName || "User"}!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your sustainable fashion journey
              </p>
            </div>
          </div>
          <Link to="/add-item">
            <Button className="bg-eco-600 hover:bg-eco-700 text-white">
              <Plus className="h-5 w-5 mr-2" />
              List a New Item
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center"
            >
              <div
                className={`${stat.bgColor} rounded-full p-3 mr-4 flex-shrink-0`}
              >
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* User Details */}
        {user && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{user.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-600">Address</p>
                <p className="font-medium">{user.address || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-600">Points</p>
                <p className="font-medium">{user.points || 0} points</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {user?.notifications?.slice(0, 5).map((notification, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {notification.message}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {(!user?.notifications || user.notifications.length === 0) && (
              <p className="text-gray-500 text-center py-4">
                No recent activity to show
              </p>
            )}
          </div>
        </div>

        {/* My Listed Products Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            My Listed Products
          </h2>
          {loadingProducts ? (
            <p>Loading...</p>
          ) : productsError ? (
            <p className="text-red-500">{productsError}</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">
              You have not listed any products yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <Card
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="bg-white border border-eco-200 rounded-lg shadow p-1 group hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between h-full min-h-[420px] max-w-[320px] mx-auto"
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={
                          Array.isArray(product.images) &&
                          product.images.length > 0
                            ? product.images[0]
                            : DEFAULT_PROFILE_IMAGE
                        }
                        alt={product.name || product.title || "Product Image"}
                        width="100%"
                        height="100%"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                        style={{ minHeight: "192px", maxHeight: "192px" }}
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        <Badge className="bg-eco-100 text-eco-900 text-xs px-3 py-1 rounded-full font-semibold shadow">
                          {product.condition || "-"}
                        </Badge>
                        <Badge className="bg-eco-100 text-eco-900 text-xs px-3 py-1 rounded-full font-semibold shadow">
                          {product.size || "-"}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-[1.25rem] font-semibold leading-none tracking-tight text-eco-900 mb-1">
                      {product.name || product.title || "Unnamed Product"}
                    </h3>
                    <p className="text-sm text-eco-700 mb-2">
                      Brand: {product.brand || "-"}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="bg-eco-50 text-eco-700 text-xs px-2 py-1 rounded font-medium">
                        Category: {product.category || "-"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs md:text-sm mb-4">
                      <div className="flex items-center space-x-1 text-eco-600">
                        <Leaf className="h-4 w-4" />
                        <span>
                          {product.carbonFootprint
                            ? `${product.carbonFootprint} kg CO₂`
                            : "-"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-eco-600">
                        <Droplets className="h-4 w-4" />
                        <span>
                          {product.waterUsage
                            ? `${product.waterUsage} L saved`
                            : "-"}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-eco-600 text-eco-600 hover:bg-eco-50 bg-transparent w-full text-base font-semibold py-2 mb-2 cursor-default"
                      disabled
                    >
                      ₹{product.cost}
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product._id}`);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white w-full text-base font-semibold py-2 mt-auto"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
// If Card, CardContent, Badge, and Footer exist, keep these imports. Otherwise, stub or implement them.
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Droplets,
  Leaf,
  Recycle,
  Star,
  Users,
  User,
  Plus,
  Settings,
} from "lucide-react";
import { Link, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/config/api";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Toaster } from "sonner";
import Profile from "@/pages/Profile";
import AddItem from "@/pages/AddItem";
import Requests from "@/pages/Requests";
import Transactions from "@/pages/Transactions";
import Notifications from "@/pages/Notifications";
import Chat from "@/pages/Chat";
import ProductDetail from "@/pages/ProductDetail";
import React, { useEffect, useState } from "react";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function Navigation() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { href: "/", label: "Home", icon: Leaf },
    { href: "/dashboard", label: "Dashboard", icon: User },
    { href: "/add-item", label: "Add Item", icon: Plus },
    { href: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-eco-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm font-sans py-4">
      <div className="container flex h-auto items-center justify-between px-2 md:px-0">
        <Link to="/" className="flex items-center space-x-3">
          <Leaf className="h-8 w-8 text-eco-600" />
          <span className="text-[1.5rem] font-bold text-eco-900 tracking-tight">
            ReWear
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors text-eco-900 hover:text-eco-600 px-2 py-1 rounded-lg",
                pathname === item.href
                  ? "text-eco-600 bg-eco-100"
                  : "text-eco-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-eco-600 text-base font-medium px-6 py-2 rounded-md shadow"
          >
            <Link to="/Register">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function HomePage({ featuredItems }) {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-eco-50 to-eco-100 min-h-[90vh] flex items-center justify-center px-4">
        <div className="container mx-auto text-center flex flex-col items-center justify-center mb-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-eco-100 text-eco-900 font-semibold text-base shadow-sm">
                <Leaf className="h-5 w-5 text-eco-600" />
                Sustainable Fashion Revolution
              </span>
            </div>
            {/* Main Heading */}
            <h1 className="font-bold text-center leading-tight text-eco-900 mb-2 text-[2.25rem] md:text-[3.75rem] lg:text-[4.5rem]">
              Give Your Clothes
              <br />
              <span className="bg-gradient-to-r from-primary via-green-500 to-primary bg-clip-text text-transparent font-bold">
                A Second Life
              </span>
            </h1>
            {/* Description */}
            <p className="text-[1.125rem] md:text-[1.25rem] text-eco-700 mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
              Join thousands who are swapping, sharing, and saving the planet
              one outfit at a time. Make sustainable fashion accessible and
              rewarding.
            </p>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-eco-600 text-white text-[1.125rem] font-medium px-8 py-6 rounded-lg shadow-xl hover:scale-105 transition-transform min-w-[180px] w-full sm:w-auto"
              >
                <Link to="/Register">
                  <h1>Get Started</h1> <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-eco-100 border border-eco-200 text-eco-700 hover:bg-eco-200 text-[1.125rem] font-medium px-12 py-6 rounded-lg shadow-xl hover:scale-105 transition-transform min-w-[180px] w-full sm:w-auto"
              >
                <Link to="#featured">Browse Items</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section id="featured" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-[2.25rem] font-bold text-eco-900 mb-4">
              Featured Items
            </h2>
            <p className="text-[1.125rem] md:text-[1.25rem] text-eco-700 max-w-2xl mx-auto leading-relaxed">
              Discover amazing pieces from our community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredItems.slice(0, 4).map((item) => (
              <Card
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="bg-white border border-eco-200 rounded-lg shadow p-1 group hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={
                        Array.isArray(item.images) && item.images.length > 0
                          ? item.images[0]
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt={item.name}
                      width="100%"
                      height="100%"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-eco-100 text-eco-900 text-xs px-3 py-1 rounded-full font-semibold shadow">
                        {item.condition}
                      </Badge>
                      <Badge className="bg-eco-100 text-eco-900 text-xs px-3 py-1 rounded-full font-semibold shadow">
                        {item.size}
                      </Badge>
                    </div>
                    <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-eco-50 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-eco-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6.75a4.125 4.125 0 00-6.075 0l-.475.525-.475-.525a4.125 4.125 0 10-6.075 6.075l.475.525L12 21.375l8.025-8.025.475-.525a4.125 4.125 0 00-6.075-6.075z"
                        />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-[1.25rem] font-semibold leading-none tracking-tight text-eco-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-eco-700 mb-2">
                    by {item.owner?.name || item.ownerName || "Unknown"}
                  </p>
                  <div className="flex items-center gap-4 text-xs md:text-sm mb-4">
                    <div className="flex items-center space-x-1 text-eco-600">
                      <Leaf className="h-4 w-4" />
                      <span>
                        {item.carbonFootprint
                          ? `${item.carbonFootprint} kg CO₂`
                          : "-"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-eco-600">
                      <Droplets className="h-4 w-4" />
                      <span>
                        {item.waterUsage ? `${item.waterUsage} L saved` : "-"}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${item._id}`);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white w-full text-base font-semibold py-2 mt-auto"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-eco-600 text-eco-600 hover:bg-eco-50 bg-transparent text-sm md:text-lg px-7 py-6 rounded-md font-semibold"
            >
              <Link to="/browse">
                View All Items <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-eco-900 mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-lg md:text-xl text-eco-700 max-w-2xl mx-auto leading-relaxed">
              Together, we're making a difference. Every swap helps reduce waste
              and protect our planet for future generations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* CO2 Saved */}
            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                <Leaf className="h-8 w-8 text-green-500" />
              </span>
              <div className="text-eco-700 text-lg font-medium mb-1">
                CO Saved
              </div>
              <div className="text-2xl font-semibold text-eco-900 mb-1">
                12,847{" "}
                <span className="text-lg font-normal text-eco-700">kg</span>
              </div>
            </div>
            {/* Water Saved */}
            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                <Droplets className="h-8 w-8 text-green-500" />
              </span>
              <div className="text-eco-700 text-lg font-medium mb-1">
                Water Saved
              </div>
              <div className="text-2xl font-semibold text-eco-900 mb-1">
                985,432{" "}
                <span className="text-lg font-normal text-eco-700">liters</span>
              </div>
            </div>
            {/* Users Joined */}
            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-50 mb-4">
                <Users className="h-8 w-8 text-yellow-500" />
              </span>
              <div className="text-eco-700 text-lg font-medium mb-1">
                Users Joined
              </div>
              <div className="text-2xl font-semibold text-eco-900 mb-1">
                2,847
              </div>
            </div>
            {/* Items Swapped */}
            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-neutral-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v1.5M3 7.5v9A2.25 2.25 0 005.25 18.75h13.5A2.25 2.25 0 0021 16.5v-9M3 7.5h18"
                  />
                </svg>
              </span>
              <div className="text-eco-700 text-lg font-medium mb-1">
                Items Swapped
              </div>
              <div className="text-2xl font-semibold text-eco-900 mb-1">
                5,692
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [featuredItems, setFeaturedItems] = useState([]);
  useEffect(() => {
    async function fetchFeaturedItems() {
      try {
        const response = await fetch(API_ENDPOINTS.PRODUCT.BASE, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setFeaturedItems(data.products || []);
      } catch {
        setFeaturedItems([]);
      }
    }
    fetchFeaturedItems();
  }, []);
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-item"
            element={
              <ProtectedRoute>
                <AddItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <HomePage featuredItems={featuredItems} />
                <Footer />
              </>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

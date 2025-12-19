import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { WS_ENDPOINTS } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Chat() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [ws, setWs] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    let websocket = null;
    let reconnectTimeout = null;

    const connect = () => {
      try {
        websocket = new WebSocket(`${WS_ENDPOINTS.CHAT}?userId=${user._id}`);

        websocket.onopen = () => {
          console.log("WebSocket connected");
          setLoading(false);
          setWs(websocket);
          websocket.send(JSON.stringify({ type: "GET_CONVERSATIONS" }));
        };

        websocket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            handleWebSocketMessage(data);
          } catch (err) {
            console.error("Message parse error:", err);
          }
        };

        websocket.onerror = (error) => {
          console.error("WebSocket error:", error);
          setLoading(false);
        };

        websocket.onclose = () => {
          console.log("WebSocket disconnected");
          setWs(null);
          setLoading(false);
        };
      } catch (err) {
        console.error("WebSocket connection error:", err);
        setLoading(false);
      }
    };

    connect();

    return () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (websocket) {
        websocket.onclose = null;
        websocket.close();
      }
    };
  }, [user?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case "CONVERSATIONS_LIST":
        setConversations(data.payload.conversations);
        setLoading(false);
        break;
      case "MESSAGES_HISTORY":
        setMessages(data.payload.messages);
        break;
      case "NEW_MESSAGE":
        setMessages((prev) => [...prev, data.payload]);
        break;
      case "MESSAGE_SENT":
        // Message sent confirmation
        break;
      default:
        break;
    }
  };

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "GET_MESSAGES",
          payload: { conversationId: conversation._id },
        })
      );
    }
  };

  const sendMessage = () => {
    if (!messageText.trim() || !selectedConversation || !ws || ws.readyState !== WebSocket.OPEN) return;

    try {
      ws.send(
        JSON.stringify({
          type: "SEND_MESSAGE",
          payload: {
            conversationId: selectedConversation._id,
            text: messageText,
          },
        })
      );
      setMessageText("");
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-eco-600 mx-auto mb-4" />
          <p className="text-gray-600">Connecting to chat...</p>
        </div>
      </div>
    );
  }

  if (!ws || ws.readyState !== WebSocket.OPEN) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="text-gray-600 hover:text-eco-600"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">Unable to connect to chat server.</p>
            <p className="text-sm text-gray-500 mb-4">Please ensure the backend server is running.</p>
            <Button onClick={() => window.location.reload()} className="bg-eco-600 hover:bg-eco-700">
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 hover:text-eco-600"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Conversations List */}
            <div className="border-r border-gray-200 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
              </div>
              {conversations.length === 0 ? (
                <p className="text-gray-500 text-center py-8 text-sm">
                  No conversations yet
                </p>
              ) : (
                <div>
                  {conversations.map((conv) => (
                    <div
                      key={conv._id}
                      onClick={() => selectConversation(conv)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedConversation?._id === conv._id
                          ? "bg-eco-50"
                          : ""
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">
                        {conv.receiver?.name || "Unknown"}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {conv.lastMessage?.text || "No messages"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div className="md:col-span-2 flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">
                      {selectedConversation.receiver?.name || "Unknown"}
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex ${
                          msg.sender === user._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.sender === user._id
                              ? "bg-eco-600 text-white"
                              : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Input
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1"
                      />
                      <Button
                        onClick={sendMessage}
                        className="bg-eco-600 hover:bg-eco-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

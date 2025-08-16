import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton, Chip } from "@mui/material";
import { keyframes } from "@mui/system";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { BsStars, BsLightningChargeFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Stunning animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4); }
  50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.6); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (!content.trim()) return;
    
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    
    setIsLoading(true);
    try {
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  const getUserInitials = (name: string | undefined): string => {
    if (!name) return "U";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0][0]?.toUpperCase() || "U";
    } else {
      const firstInitial = nameParts[0][0]?.toUpperCase() || "";
      const secondInitial = nameParts[1][0]?.toUpperCase() || "";
      return firstInitial + secondInitial;
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          animation: `${float} 20s ease-in-out infinite`,
        }
      }}
    >
      {/* Animated background orbs */}
      <Box sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        <Box sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "10%",
          left: "10%",
          filter: "blur(40px)",
          animation: `${float} 15s ease-in-out infinite`,
        }} />
        <Box sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "20%",
          right: "15%",
          filter: "blur(40px)",
          animation: `${float} 18s ease-in-out infinite reverse`,
        }} />
      </Box>

      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          width: "320px",
          flexDirection: "column",
          p: 3,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "85vh",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: "24px",
            flexDirection: "column",
            p: 3,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
              animation: `${shimmer} 3s linear infinite`,
            }
          }}
        >
          {/* Profile Section */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            position: "relative",
          }}>
            <Box sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "-4px",
                background: "linear-gradient(45deg, #8b5cf6, #3b82f6, #ec4899)",
                borderRadius: "50%",
                filter: "blur(15px)",
                opacity: 0.6,
                animation: `${pulse} 2s ease-in-out infinite`,
              }
            }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {getUserInitials(auth?.user?.name)}
              </Avatar>
            </Box>
            
            <Typography sx={{ 
              mt: 3,
              fontSize: "1.2rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}>
              {auth?.user?.name || "User"}
            </Typography>
          </Box>

          {/* AI Assistant Badge */}
          <Box sx={{ 
            mt: 4, 
            display: "flex", 
            justifyContent: "center",
            gap: 1,
          }}>
            <Chip
              icon={<BsStars style={{ color: "#fbbf24" }} />}
              label="GPT-4o Turbo"
              sx={{
                background: "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)",
                border: "1px solid rgba(251, 191, 36, 0.3)",
                color: "#fbbf24",
                fontWeight: 600,
                "& .MuiChip-icon": {
                  color: "#fbbf24",
                }
              }}
            />
            <Chip
              icon={<BsLightningChargeFill />}
              label="Fast"
              size="small"
              sx={{
                background: "rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                color: "#22c55e",
              }}
            />
          </Box>

          {/* Info Cards */}
          <Box sx={{ mt: 4, flex: 1 }}>
            <Box sx={{
              p: 3,
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
              borderRadius: "16px",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              mb: 2,
            }}>
              <HiSparkles style={{ fontSize: "1.5rem", color: "#8b5cf6", marginBottom: "8px" }} />
              <Typography sx={{ 
                color: "#e2e8f0",
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}>
                Experience the power of advanced AI with instant responses, code generation, and intelligent conversations.
              </Typography>
            </Box>

            <Box sx={{
              p: 2,
              background: "rgba(251, 191, 36, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(251, 191, 36, 0.2)",
            }}>
              <Typography sx={{ 
                color: "#fbbf24",
                fontSize: "0.85rem",
                fontWeight: 600,
                mb: 1,
              }}>
                ⚡ Pro Tips
              </Typography>
              <Typography sx={{ 
                color: "#cbd5e1",
                fontSize: "0.8rem",
                lineHeight: 1.5,
              }}>
                • Be specific in your questions<br/>
                • Use code blocks for formatting<br/>
                • Ask follow-up questions
              </Typography>
            </Box>
          </Box>

          {/* Clear Button */}
          <Button
            onClick={handleDeleteChats}
            startIcon={<RiDeleteBin6Line />}
            sx={{
              mt: 3,
              py: 1.5,
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#f87171",
              borderRadius: "12px",
              fontWeight: 600,
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(239, 68, 68, 0.2) 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(239, 68, 68, 0.2)",
              }
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          p: 3,
          zIndex: 10,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Header */}
        <Box sx={{ 
          textAlign: "center", 
          mb: 3,
          position: "relative",
        }}>
          <Typography
            sx={{
              fontSize: "3rem",
              fontWeight: 800,
              background: `linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)`,
              backgroundSize: "200% 200%",
              animation: `${gradientShift} 3s ease infinite`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(139, 92, 246, 0.5)",
              mb: 1,
            }}
          >
            AI Assistant
          </Typography>
          <Typography sx={{ 
            color: "#94a3b8",
            fontSize: "1rem",
          }}>
            Powered by GPT-4o • Lightning fast responses
          </Typography>
        </Box>

        {/* Messages Container */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            p: 3,
            overflowY: "auto",
            position: "relative",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              borderRadius: "4px",
            },
          }}
        >
          {chatMessages.length === 0 && (
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#64748b",
            }}>
              <HiSparkles style={{ fontSize: "4rem", marginBottom: "1rem", color: "#8b5cf6" }} />
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 600, color: "#cbd5e1" }}>
                Start a conversation
              </Typography>
              <Typography sx={{ mt: 1, color: "#94a3b8" }}>
                Ask me anything - I'm here to help!
              </Typography>
            </Box>
          )}

          {chatMessages.map((chat, index) => (
            <ChatItem 
              content={chat.content} 
              role={chat.role} 
              key={index}
              isLatest={
                index === chatMessages.length - 1 && 
                chat.role === "assistant" && 
                !isLoading
              }
            />
          ))}
          
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                p: 2.5,
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: "16px",
                my: 2,
                animation: `${glow} 2s ease-in-out infinite`,
              }}
            >
              <Avatar sx={{ 
                background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
              }}>
                <img src="openai.png" alt="openai" width={"24px"} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography sx={{ 
                  fontSize: "1rem",
                  color: "#e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}>
                  <span>Thinking</span>
                  <span style={{ 
                    display: "inline-flex",
                    gap: "4px",
                  }}>
                    <span style={{ 
                      animation: "bounce 1.4s ease-in-out infinite",
                      animationDelay: "0s",
                      display: "inline-block",
                    }}>.</span>
                    <span style={{ 
                      animation: "bounce 1.4s ease-in-out infinite",
                      animationDelay: "0.2s",
                      display: "inline-block",
                    }}>.</span>
                    <span style={{ 
                      animation: "bounce 1.4s ease-in-out infinite",
                      animationDelay: "0.4s",
                      display: "inline-block",
                    }}>.</span>
                  </span>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            mt: 3,
            background: inputFocused 
              ? "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            backdropFilter: "blur(20px)",
            border: inputFocused
              ? "2px solid rgba(139, 92, 246, 0.5)"
              : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            transition: "all 0.3s ease",
            boxShadow: inputFocused
              ? "0 0 40px rgba(139, 92, 246, 0.3)"
              : "none",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message here..."
            onKeyPress={handleKeyPress}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            disabled={isLoading}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "16px",
              border: "none",
              outline: "none",
              color: "#e2e8f0",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          />
          <IconButton 
            onClick={handleSubmit} 
            disabled={isLoading}
            sx={{ 
              background: isLoading 
                ? "linear-gradient(135deg, #64748b, #475569)"
                : "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              color: "#fff",
              mx: 1,
              p: 1.5,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: !isLoading ? "scale(1.1)" : "none",
                boxShadow: !isLoading ? "0 8px 24px rgba(139, 92, 246, 0.4)" : "none",
              },
              "&:active": {
                transform: !isLoading ? "scale(0.95)" : "none",
              }
            }}
          >
            <IoMdSend size={20} />
          </IconButton>
        </Box>
      </Box>

      <style>
        {`
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-10px); }
          }
        `}
      </style>
    </Box>
  );
};

export default Chat;
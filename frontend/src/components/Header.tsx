import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button, Chip } from "@mui/material";
import { keyframes } from "@mui/system";
import { useAuth } from "../context/AuthContext";
import { HiSparkles } from "react-icons/hi";
import { IoMdPower } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";
import { BsPersonPlus, BsChatDots } from "react-icons/bs";

// Stunning animations
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;


const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
`;

// Custom styled button component
const GlowButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  icon,
  ...props 
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
  [key: string]: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStyles = () => {
    switch(variant) {
      case "primary":
        return {
          background: isHovered 
            ? "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)"
            : "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          color: isHovered ? "#fff" : "#a78bfa",
          boxShadow: isHovered ? "0 8px 25px rgba(139, 92, 246, 0.4)" : "none",
        };
      case "secondary":
        return {
          background: isHovered
            ? "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)"
            : "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          color: isHovered ? "#fff" : "#10b981",
          boxShadow: isHovered ? "0 8px 25px rgba(16, 185, 129, 0.4)" : "none",
        };
      case "danger":
        return {
          background: isHovered
            ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
            : "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: isHovered ? "#fff" : "#f87171",
          boxShadow: isHovered ? "0 8px 25px rgba(239, 68, 68, 0.4)" : "none",
        };
    }
  };

  const styles = getStyles();

  return (
    <Button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      startIcon={icon}
      sx={{
        ...styles,
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        px: 3,
        py: 1,
        fontWeight: 600,
        textTransform: "none",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        fontSize: "0.9rem",
        minWidth: "120px",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          transition: "left 0.5s ease",
        },
        "&:hover::before": {
          left: "100%",
        },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

const Header = () => {
  const auth = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      sx={{
        background: scrolled
          ? "linear-gradient(135deg, rgba(15, 12, 41, 0.98) 0%, rgba(48, 43, 99, 0.98) 50%, rgba(36, 36, 62, 0.98) 100%)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        position: "fixed",
        boxShadow: scrolled ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "none",
        transition: "all 0.3s ease",
        py: 1,
      }}
    >
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between",
        px: { xs: 2, sm: 4, md: 6 },
      }}>
        {/* Logo Section */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          gap: 2,
        }}>
          <Box sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 2,
            animation: `${float} 3s ease-in-out infinite`,
          }}>
            {/* Animated Logo Background */}
            <Box sx={{
              position: "absolute",
              inset: "-10px",
              background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #ec4899)",
              borderRadius: "50%",
              filter: "blur(20px)",
              opacity: 0.4,
              animation: `${pulse} 2s ease-in-out infinite`,
            }} />
            
            {/* Logo with glow effect */}
            <Box sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 1,
              zIndex: 1,
            }}>
              <HiSparkles style={{ 
                fontSize: "2rem", 
                color: "#8b5cf6",
                filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))",
              }} />
              <Box>
                <Box sx={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)",
                  backgroundSize: "200% 200%",
                  animation: `${gradientShift} 3s ease infinite`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                }}>
                  AI Chat
                </Box>
                <Box sx={{
                  fontSize: "0.7rem",
                  color: "#94a3b8",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  mt: "-2px",
                }}>
                  GPT-4o Powered
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Status Badge */}
          <Chip
            size="small"
            label="Online"
            sx={{
              ml: 2,
              height: "24px",
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: "#22c55e",
              fontSize: "0.75rem",
              fontWeight: 600,
              "& .MuiChip-label": {
                px: 1.5,
              },
              "&::before": {
                content: '""',
                position: "absolute",
                left: "8px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22c55e",
                animation: `${pulse} 2s ease-in-out infinite`,
              }
            }}
          />
        </Box>

        {/* Navigation Section */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          gap: 2,
        }}>
          {auth?.isLoggedIn ? (
            <>
              {/* User Info Display */}
              <Chip
                label={auth.user?.name || "User"}
                sx={{
                  mr: 1,
                  background: "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  color: "#fbbf24",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  height: "32px",
                  "& .MuiChip-label": {
                    px: 2,
                  }
                }}
              />
              
              <GlowButton
                variant="primary"
                icon={<BsChatDots />}
                href="/chat"
                sx={{ mr: 1 }}
              >
                Go to Chat
              </GlowButton>
              
              <GlowButton
                variant="danger"
                icon={<IoMdPower />}
                onClick={auth.logout}
              >
                Logout
              </GlowButton>
            </>
          ) : (
            <>
              <GlowButton
                variant="secondary"
                icon={<RiLoginCircleLine />}
                href="/login"
                sx={{ mr: 1 }}
              >
                Login
              </GlowButton>
              
              <GlowButton
                variant="primary"
                icon={<BsPersonPlus />}
                href="/signup"
              >
                Sign Up
              </GlowButton>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Animated border line */}
      <Box sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)",
        animation: `${shimmer} 3s linear infinite`,
      }} />
    </AppBar>
  );
};

export default Header;
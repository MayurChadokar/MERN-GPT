import  { useState, useEffect } from "react";
import { Box, Typography, Button, useMediaQuery, useTheme, Chip } from "@mui/material";
import { keyframes } from "@mui/system";
import { BsStars, BsLightningChargeFill, BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { IoMdRocket } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// Stunning animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
`;

const glow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))
            drop-shadow(0 0 60px rgba(139, 92, 246, 0.3));
  }
  50% { 
    filter: drop-shadow(0 0 40px rgba(139, 92, 246, 0.7))
            drop-shadow(0 0 80px rgba(139, 92, 246, 0.5));
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
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

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const morphing = keyframes`
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
`;

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Box 
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        {/* Morphing gradient orbs */}
        <Box sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "-20%",
          left: "-10%",
          filter: "blur(60px)",
          animation: `${morphing} 20s ease-in-out infinite`,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }} />
        <Box sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "-15%",
          right: "-10%",
          filter: "blur(60px)",
          animation: `${morphing} 15s ease-in-out infinite reverse`,
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }} />
        <Box sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
          animation: `${float} 18s ease-in-out infinite`,
        }} />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: "4px",
              height: "4px",
              background: "rgba(139, 92, 246, 0.8)",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `${float} ${10 + Math.random() * 20}s ease-in-out ${Math.random() * 5}s infinite`,
              boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
            }}
          />
        ))}
      </Box>

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          pt: 15,
        }}
      >
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: "center",
          animation: `${slideUp} 1s ease-out`,
          mb: 6,
        }}>
          {/* Badge */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Chip
              icon={<BsStars style={{ color: "#fbbf24" }} />}
              label="Powered by GPT-4o Turbo"
              sx={{
                background: "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)",
                border: "1px solid rgba(251, 191, 36, 0.3)",
                color: "#fbbf24",
                fontWeight: 600,
                fontSize: "0.9rem",
                py: 2.5,
                px: 1,
                backdropFilter: "blur(10px)",
                animation: `${pulse} 2s ease-in-out infinite`,
              }}
            />
          </Box>

          {/* Main heading with gradient */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              fontWeight: 900,
              background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)",
              backgroundSize: "200% 200%",
              animation: `${gradientShift} 3s ease infinite`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 80px rgba(139, 92, 246, 0.5)",
              mb: 2,
              lineHeight: 1.1,
            }}
          >
            Welcome to the Future
            <br />
            of AI Conversation
          </Typography>

          {/* Subheading */}
          <Typography
            sx={{
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              color: "#94a3b8",
              maxWidth: "600px",
              mx: "auto",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Experience lightning-fast responses, intelligent code generation, 
            and seamless conversations with the most advanced AI assistant
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ 
            display: "flex", 
            gap: 2, 
            justifyContent: "center",
            flexWrap: "wrap",
          }}>
            <Button
              onClick={() => navigate("/chat")}
              endIcon={<BsArrowRight />}
              sx={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                color: "#fff",
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 10px 40px rgba(139, 92, 246, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 50px rgba(139, 92, 246, 0.5)",
                },
                "&:active": {
                  transform: "translateY(-1px)",
                }
              }}
            >
              Start Chatting Now
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              sx={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#e2e8f0",
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Feature Cards */}
        <Box sx={{
          display: "flex",
          gap: 3,
          mt: 8,
          mb: 6,
          flexWrap: "wrap",
          justifyContent: "center",
          px: 3,
          animation: `${slideUp} 1.2s ease-out`,
        }}>
          {[
            { icon: <BsLightningChargeFill />, title: "Lightning Fast", desc: "Get responses in milliseconds", color: "#fbbf24" },
            { icon: <HiSparkles />, title: "Smart & Accurate", desc: "Powered by GPT-4o technology", color: "#8b5cf6" },
            { icon: <IoMdRocket />, title: "Always Improving", desc: "Continuously learning and evolving", color: "#10b981" },
          ].map((feature, index) => (
            <Box
              key={index}
              sx={{
                p: 3,
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                width: "250px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Box sx={{ 
                fontSize: "2rem", 
                color: feature.color,
                mb: 2,
                filter: `drop-shadow(0 0 20px ${feature.color}50)`,
              }}>
                {feature.icon}
              </Box>
              <Typography sx={{ 
                fontWeight: 700, 
                fontSize: "1.1rem", 
                color: "#e2e8f0",
                mb: 1,
              }}>
                {feature.title}
              </Typography>
              <Typography sx={{ 
                fontSize: "0.9rem", 
                color: "#94a3b8",
              }}>
                {feature.desc}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Interactive Demo Preview */}
        <Box sx={{ 
          position: "relative",
          mt: 8,
          mb: 10,
          animation: `${slideUp} 1.4s ease-out`,
        }}>
          <Box sx={{
            position: "relative",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            p: 2,
            width: isBelowMd ? "90vw" : "70vw",
            maxWidth: "1200px",
            boxShadow: "0 25px 100px rgba(139, 92, 246, 0.2)",
            animation: `${glow} 4s ease-in-out infinite`,
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              animation: `${shimmer} 3s linear infinite`,
            }
          }}>
            <img
              src="chat.png"
              alt="AI Chat Interface"
              style={{
                width: "100%",
                borderRadius: "16px",
                display: "block",
              }}
            />
            
            {/* Overlay badge */}
            <Box sx={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)",
              backdropFilter: "blur(10px)",
              px: 2,
              py: 1,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}>
              <Box sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
                animation: `${pulse} 2s ease-in-out infinite`,
              }} />
              <Typography sx={{ 
                color: "#fff", 
                fontSize: "0.85rem",
                fontWeight: 600,
              }}>
                Live Demo
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
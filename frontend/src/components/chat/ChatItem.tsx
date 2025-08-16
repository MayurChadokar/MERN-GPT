import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, Chip } from "@mui/material";
import { keyframes } from "@mui/system";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BsRobot } from "react-icons/bs";
import { HiUser } from "react-icons/hi";
import { BiCodeAlt } from "react-icons/bi";

// Beautiful animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.4),
                inset 0 0 20px rgba(139, 92, 246, 0.1);
  }
  50% { 
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.6),
                inset 0 0 30px rgba(139, 92, 246, 0.2);
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
`;

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

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

// Enhanced Typewriter with gradient cursor
const TypewriterText = ({ 
  text, 
  speed = 20,
  onComplete 
}: { 
  text: string; 
  speed?: number;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <Typography sx={{ 
      fontSize: "1rem",
      color: "#e2e8f0",
      lineHeight: 1.7,
      fontWeight: 400,
    }}>
      {displayedText}
      {currentIndex < text.length && (
        <span 
          style={{ 
            display: "inline-block",
            width: "3px",
            height: "1.2em",
            background: "linear-gradient(180deg, #8b5cf6, #3b82f6)",
            marginLeft: "2px",
            animation: "blink 1s infinite",
            verticalAlign: "text-bottom",
          }}
        />
      )}
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </Typography>
  );
};

const ChatItem = ({
  content,
  role,
  isLatest = false,
}: {
  content: string;
  role: "user" | "assistant";
  isLatest?: boolean;
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (role === "assistant" && isLatest) {
      setShowTypewriter(true);
    }
  }, [role, isLatest]);

  const handleTypewriterComplete = () => {
    setShowTypewriter(false);
  };

  // Custom syntax highlighter theme
  const customTheme = {
    ...atomDark,
    'pre[class*="language-"]': {
      ...atomDark['pre[class*="language-"]'],
      background: 'linear-gradient(135deg, rgba(30, 30, 40, 0.95) 0%, rgba(20, 20, 30, 0.95) 100%)',
      borderRadius: '12px',
      padding: '1.5rem',
      fontSize: '0.9rem',
      border: '1px solid rgba(139, 92, 246, 0.2)',
    }
  };

  return role === "assistant" ? (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        p: 2.5,
        background: isHovered
          ? "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)"
          : "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)",
        backdropFilter: "blur(10px)",
        gap: 2,
        borderRadius: "16px",
        my: 2,
        border: "1px solid rgba(139, 92, 246, 0.2)",
        animation: `${fadeIn} 0.5s ease-out`,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent)",
          animation: isLatest ? `${shimmer} 3s linear infinite` : "none",
        },
        "&:hover": {
          transform: "translateX(4px)",
          boxShadow: "0 8px 32px rgba(139, 92, 246, 0.2)",
        }
      }}
    >
      <Avatar 
        sx={{ 
          background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
          width: 40,
          height: 40,
          boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
          animation: isLatest ? `${pulse} 2s ease-in-out infinite` : "none",
        }}
      >
        <BsRobot size={20} />
      </Avatar>
      <Box sx={{ flex: 1 }}>
        {/* AI Label */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Chip
            label="GPT-4o"
            size="small"
            sx={{
              height: "20px",
              fontSize: "0.7rem",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#a78bfa",
            }}
          />
          {isLatest && (
            <Chip
              label="Live"
              size="small"
              sx={{
                height: "20px",
                fontSize: "0.7rem",
                background: "rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                color: "#22c55e",
                animation: `${pulse} 1s ease-in-out infinite`,
              }}
            />
          )}
        </Box>
        
        {!messageBlocks && (
          <>
            {showTypewriter && isLatest ? (
              <TypewriterText 
                text={content} 
                speed={20}
                onComplete={handleTypewriterComplete}
              />
            ) : (
              <Typography sx={{ 
                fontSize: "1rem",
                color: "#e2e8f0",
                lineHeight: 1.7,
              }}>
                {content}
              </Typography>
            )}
          </>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <Box key={index} sx={{ position: "relative", my: 2 }}>
                <Box sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  background: "rgba(139, 92, 246, 0.2)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  zIndex: 10,
                }}>
                  <BiCodeAlt size={14} color="#a78bfa" />
                  <Typography sx={{ fontSize: "0.75rem", color: "#a78bfa" }}>
                    Code
                  </Typography>
                </Box>
                <SyntaxHighlighter 
                  style={customTheme} 
                  language="javascript"
                  showLineNumbers={true}
                  wrapLines={true}
                >
                  {block}
                </SyntaxHighlighter>
              </Box>
            ) : (
              <Box key={index}>
                {showTypewriter && isLatest && index === 0 ? (
                  <TypewriterText 
                    text={block} 
                    speed={20}
                    onComplete={handleTypewriterComplete}
                  />
                ) : (
                  <Typography sx={{ 
                    fontSize: "1rem",
                    color: "#e2e8f0",
                    lineHeight: 1.7,
                  }}>
                    {block}
                  </Typography>
                )}
              </Box>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        p: 2.5,
        background: isHovered
          ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)"
          : "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)",
        backdropFilter: "blur(10px)",
        gap: 2,
        borderRadius: "16px",
        my: 2,
        border: "1px solid rgba(16, 185, 129, 0.2)",
        animation: `${slideIn} 0.3s ease-out`,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.6), transparent)",
        },
        "&:hover": {
          transform: "translateX(-4px)",
          boxShadow: "0 8px 32px rgba(16, 185, 129, 0.2)",
        }
      }}
    >
      <Avatar 
        sx={{ 
          background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
          width: 40,
          height: 40,
          color: "#fff",
          fontWeight: 600,
          boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
        }}
      >
        {getUserInitials(auth?.user?.name)}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        {/* User Label */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Chip
            label="You"
            size="small"
            sx={{
              height: "20px",
              fontSize: "0.7rem",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#10b981",
            }}
          />
          <Typography sx={{ 
            fontSize: "0.7rem",
            color: "#64748b",
          }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>
        
        {!messageBlocks && (
          <Typography sx={{ 
            fontSize: "1rem",
            color: "#e2e8f0",
            lineHeight: 1.7,
          }}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <Box key={index} sx={{ position: "relative", my: 2 }}>
                <Box sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  background: "rgba(16, 185, 129, 0.2)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  zIndex: 10,
                }}>
                  <BiCodeAlt size={14} color="#10b981" />
                  <Typography sx={{ fontSize: "0.75rem", color: "#10b981" }}>
                    Code
                  </Typography>
                </Box>
                <SyntaxHighlighter 
                  style={customTheme} 
                  language="javascript"
                  showLineNumbers={true}
                  wrapLines={true}
                >
                  {block}
                </SyntaxHighlighter>
              </Box>
            ) : (
              <Typography key={index} sx={{ 
                fontSize: "1rem",
                color: "#e2e8f0",
                lineHeight: 1.7,
              }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
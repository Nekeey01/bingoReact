import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useAuth } from "../../Auth/AuthContext.jsx";
import { useProfile } from "../../components/ProfileContext.jsx";
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Divider,
    IconButton,
    Paper,
} from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { token } = useAuth();
    const { userAvatarLink } = useProfile();

    // WebSocket подключение
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        `ws://localhost:8000/ws/comments?token=${token}`,
        {
            shouldReconnect: () => true,
            onClose: () => console.log("WebSocket закрыт"),
            onError: (error) => console.error("Ошибка WebSocket:", error),
        }
    );

    // Обработка полученных данных от сервера
    useEffect(() => {
        if (lastMessage?.data) {
            try {
                const data = JSON.parse(lastMessage.data);
                if (data.comments) {
                    setComments(data.comments);
                }
            } catch (error) {
                console.error("Ошибка парсинга:", error);
            }
        }
    }, [lastMessage]);

    // Отправка нового комментария
    const sendComment = () => {
        if (readyState === 1 && newComment.trim()) {
            const commentData = {
                content: newComment,
                timestamp: new Date().toISOString(),
            };
            sendMessage(JSON.stringify(commentData));
            setNewComment(""); // Очищаем поле ввода
        } else {
            console.warn("WebSocket не открыт или комментарий пустой");
        }
    };

    // Обработка лайков/дизлайков
    const handleReaction = (commentId, reaction) => {
        if (readyState === 1) {
            sendMessage(
                JSON.stringify({
                    commentId,
                    reaction: reaction === "like" ? "like" : "dislike",
                })
            );
        }
    };

    return (
        <Box
            sx={{
                bgcolor: "#1a1a1a",
                minHeight: "100vh",
                color: "#fff",
                p: 3,
            }}
        >
            {/* Заглушка для Bingo */}
            <Box
                sx={{
                    bgcolor: "#2a2a2a",
                    p: 4,
                    borderRadius: 2,
                    mb: 4,
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Bingo Placeholder
                </Typography>
                <Typography variant="body1" sx={{ color: "#e0e0e0" }}>
                    Здесь будет карточка бинго (в разработке)
                </Typography>
            </Box>

            {/* Секция комментариев */}
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Комментарии
            </Typography>

            {/* Форма для нового комментария */}
            <Box sx={{ display: "flex", mb: 3, alignItems: "center" }}>
                <Avatar src={userAvatarLink} sx={{ mr: 2, width: 40, height: 40 }} />
                <TextField
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Напишите комментарий..."
                    fullWidth
                    variant="outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            bgcolor: "#333",
                            color: "#fff",
                            borderRadius: 2,
                            "& fieldset": { borderColor: "#6200ea" },
                            "&:hover fieldset": { borderColor: "#4500a0" },
                        },
                    }}
                />
                <Button
                    onClick={sendComment}
                    disabled={readyState !== 1 || !newComment.trim()}
                    variant="contained"
                    sx={{
                        ml: 2,
                        bgcolor: "#6200ea",
                        "&:hover": { bgcolor: "#4500a0" },
                        borderRadius: 2,
                        textTransform: "none",
                    }}
                >
                    Отправить
                </Button>
            </Box>

            {/* Список комментариев */}
            <Box>
                {comments.length === 0 ? (
                    <Typography sx={{ color: "#e0e0e0" }}>
                        Пока нет комментариев. Будьте первым!
                    </Typography>
                ) : (
                    comments.map((comment) => (
                        <Paper
                            key={comment.id}
                            sx={{
                                bgcolor: "#2a2a2a",
                                p: 2,
                                mb: 2,
                                borderRadius: 2,
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <Avatar src={comment.avatar} sx={{ mr: 2, width: 36, height: 36 }} />
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                        {comment.username}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#b0b0b0" }}>
                                        {new Date(comment.timestamp).toLocaleString()} {comment.edited && "(ред.)"}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ mb: 1, color: "#e0e0e0" }}>
                                {comment.content}
                            </Typography>
                            <Divider sx={{ bgcolor: "#fff", opacity: 0.1, mb: 1 }} />
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <IconButton
                                    onClick={() => handleReaction(comment.id, "like")}
                                    sx={{ color: comment.likes > 0 ? "#6200ea" : "#fff" }}
                                >
                                    <ThumbUp fontSize="small" />
                                </IconButton>
                                <Typography sx={{ mr: 2 }}>
                                    {comment.likes || 0}
                                </Typography>
                                <IconButton
                                    onClick={() => handleReaction(comment.id, "dislike")}
                                    sx={{ color: comment.dislikes > 0 ? "#ef5350" : "#fff" }}
                                >
                                    <ThumbDown fontSize="small" />
                                </IconButton>
                                <Typography>{comment.dislikes || 0}</Typography>
                            </Box>
                        </Paper>
                    ))
                )}
            </Box>

            {/* Статус WebSocket */}
            <Typography variant="caption" sx={{ mt: 2, color: "#b0b0b0" }}>
                Статус WebSocket: {["Закрыт", "Открыт", "Закрывается", "Ожидание"][readyState]}
            </Typography>
        </Box>
    );
}
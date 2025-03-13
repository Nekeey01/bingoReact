import { useState, useEffect } from "react";
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
import { ThumbUp, ThumbDown, Edit } from "@mui/icons-material";

// Мок-данные для начальных комментариев
const mockComments = [
    {
        id: "1",
        username: "PlayerOne",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "Отличная игра, жду бинго!",
        timestamp: "2025-03-12T10:00:00Z",
        edited: false,
        likes: 3,
        dislikes: 1,
    },
    {
        id: "2",
        username: "Gamer42",
        avatar: "https://i.pravatar.cc/150?img=2",
        content: "Надеюсь, скоро добавят карточки.",
        timestamp: "2025-03-12T10:05:00Z",
        edited: true,
        likes: 5,
        dislikes: 0,
    },
];

export default function Comments() {
    const [comments, setComments] = useState(mockComments);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null); // ID редактируемого комментария
    const [editedContent, setEditedContent] = useState(""); // Текст редактируемого комментария
    const { token } = useAuth();
    const { userAvatarLink } = useProfile();

    const [readyState] = useState(1); // 1 = "Открыт"
    const currentUser = "CurrentUser"; // Имя текущего пользователя (можно заменить на реальное из профиля)

    useEffect(() => {
        console.log("WebSocket подключен (имитация)");
    }, []);

    // Отправка нового комментария
    const sendComment = () => {
        if (newComment.trim()) {
            const commentData = {
                id: Date.now().toString(),
                username: currentUser,
                avatar: userAvatarLink || "https://i.pravatar.cc/150?img=3",
                content: newComment,
                timestamp: new Date().toISOString(),
                edited: false,
                likes: 0,
                dislikes: 0,
            };
            setComments((prev) => [...prev, commentData]);
            setNewComment("");
        }
    };

    // Обработка лайков/дизлайков
    const handleReaction = (commentId, reaction) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        likes: reaction === "like" ? comment.likes + 1 : comment.likes,
                        dislikes: reaction === "dislike" ? comment.dislikes + 1 : comment.dislikes,
                    }
                    : comment
            )
        );
    };

    // Начало редактирования
    const startEditing = (comment) => {
        setEditingCommentId(comment.id);
        setEditedContent(comment.content);
    };

    // Сохранение отредактированного комментария
    const saveEditedComment = (commentId) => {
        if (editedContent.trim()) {
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            content: editedContent,
                            edited: true,
                            timestamp: new Date().toISOString(), // Обновляем время
                        }
                        : comment
                )
            );
            setEditingCommentId(null); // Завершаем редактирование
            setEditedContent("");
        }
    };

    // Отмена редактирования
    const cancelEditing = () => {
        setEditingCommentId(null);
        setEditedContent("");
    };

    // Обработчик нажатия Enter для нового комментария
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendComment();
        }
    };

    // Обработчик Enter для редактирования
    const handleEditKeyDown = (event, commentId) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            saveEditedComment(commentId);
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

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Комментарии
            </Typography>

            <Box sx={{ display: "flex", mb: 3, alignItems: "center" }}>
                <Avatar src={userAvatarLink} sx={{ mr: 2, width: 40, height: 40 }} />
                <TextField
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
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
                    disabled={!newComment.trim()}
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
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                        {comment.username}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#b0b0b0" }}>
                                        {new Date(comment.timestamp).toLocaleString()}{" "}
                                        {comment.edited && "(ред.)"}
                                    </Typography>
                                </Box>
                                {/* Кнопка редактирования только для своих комментариев */}
                                {comment.username === currentUser && (
                                    <IconButton
                                        onClick={() => startEditing(comment)}
                                        sx={{ color: "#fff" }}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>

                            {/* Отображение текста или формы редактирования */}
                            {editingCommentId === comment.id ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <TextField
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        onKeyDown={(e) => handleEditKeyDown(e, comment.id)}
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
                                        onClick={() => saveEditedComment(comment.id)}
                                        variant="contained"
                                        sx={{
                                            ml: 2,
                                            bgcolor: "#6200ea",
                                            "&:hover": { bgcolor: "#4500a0" },
                                            borderRadius: 2,
                                            textTransform: "none",
                                        }}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button
                                        onClick={cancelEditing}
                                        variant="outlined"
                                        sx={{
                                            ml: 1,
                                            color: "#fff",
                                            borderColor: "#fff",
                                            borderRadius: 2,
                                            textTransform: "none",
                                        }}
                                    >
                                        Отмена
                                    </Button>
                                </Box>
                            ) : (
                                <Typography sx={{ mb: 1, color: "#e0e0e0" }}>
                                    {comment.content}
                                </Typography>
                            )}

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

            <Typography variant="caption" sx={{ mt: 2, color: "#b0b0b0" }}>
                Статус WebSocket: {["Закрыт", "Открыт", "Закрывается", "Ожидание"][readyState]}
            </Typography>
        </Box>
    );
}
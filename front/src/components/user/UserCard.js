import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import { keyframes } from "@emotion/react";
import getRandomImage from "../../util/getRandomImage";

const popAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [liked, setLiked] = useState(
    user?.likeUsers?.includes(userState.user?.id)
  );
  const [likesCount, setLikesCount] = useState(user?.likeCount);
  const theme = useTheme();
  const handleLikeClick = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (!liked) {
        res = await Api.put(`users/${user.id}/like`, {
          pressLikeUserId: userState.user.id,
        });
        setLiked(true);
        setLikesCount(res.data.likeCount);
      } else {
        res = await Api.put(`users/${user.id}/dislike`, {
          pressLikeUserId: userState.user.id,
        });
        setLiked(false);
        setLikesCount(res.data.likeCount);
      }
    } catch (error) {
      console.log(error);
      alert("좋아요 버튼 누르기에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="mb-3 ml-3 mr-3">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "18rem", height: "22rem" }} className="mb-3">
          <CardMedia
            component="img"
            height="140"
            image={user?.image || getRandomImage(user.id)}
            alt="사용자 프로필 사진"
            sx={{
              borderRadius: "50%",
              width: "140px",
              height: "140px",
              margin: "0 auto",
              objectFit: "cover",
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
            <Box sx={{ height: "5rem", overflow: "hidden" }}>
              <Typography variant="body2" color="text.secondary">
                <span style={{ whiteSpace: "pre-line" }}>
                  {user?.description}
                </span>
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {isEditable && (
                <Button
                  variant="text"
                  color="primary"
                  size="large"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              )}
              {isNetwork && (
                <Button
                  variant="text"
                  size="large"
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  포트폴리오
                </Button>
              )}
              <Button
                onClick={handleLikeClick}
                sx={{
                  "& .MuiSvgIcon-root": {
                    transition: "all 0.3s",
                    "&.MuiSvgIcon-liked": {
                      color: theme.palette.primary.main,
                      animation: `${popAnimation} 0.5s`,
                    },
                  },
                }}
              >
                {liked ? (
                  <FavoriteIcon
                    className={liked ? "MuiSvgIcon-liked" : ""}
                    style={{ color: "purple" }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className={liked ? "MuiSvgIcon-liked" : ""}
                    style={{ color: "purple" }}
                  />
                )}
                <Box ml={1}>{likesCount}</Box>
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default UserCard;

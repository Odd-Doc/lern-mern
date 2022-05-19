import React from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles.js";
import Post from "./Post/Post.js";
import { Grid, CircularProgress } from "@material-ui/core";
const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((val) => (
        <Grid item key={val._id} xs={12} sm={6} md={6}>
          <Post post={val} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Posts;

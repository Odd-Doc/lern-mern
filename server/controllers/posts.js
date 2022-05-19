import mongoose from "mongoose";
import express from "express";
import PostMessage from "../models/postMessage.js";
/*
Let's extract all of the functionality and
logic from the router functions and define 
them as controllers. Essentially these will 
all of the callbacks used in the router
*/

//going to try using callback as async functions rather than how FCC taught ->(synchronous?)

//HTTP status code reference-> https://www.restapitutorial.com/httpstatuscodes.html
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;
  const newPost = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//the next controller will receive http://..../posts/2468, where '2468' is ':id' (a given id in the url/request)
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  //const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id ${id}`);
  }
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send(`No post with id: ${id}, was found`);
  }

  const likedPost = await PostMessage.findByIdAndUpdate(
    id,
    {
      likesCount: likesCount + 1,
    },
    { new: true }
  );
  res.json(likedPost);
};

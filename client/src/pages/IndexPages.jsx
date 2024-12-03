import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts'
import LoadingSpinner from '../components/LoadingSpinner'

const IndexPages = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://blogginghub-5pp8.onrender.com/post", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        posts.length > 0 ? (
          posts.map(post => (
            <Posts key={post._id} {...post} />
          ))
        ) : (
          <div>No posts available</div>
        )
      )}
    </>
  )
}

export default IndexPages

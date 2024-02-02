import "./Post.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import TimeAgo from "react-timeago";

const Post = ({ isUpdate }) => {
  const [profile, setProfile] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/post/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data);
    };
    fetchProfile();
  }, [isUpdate]);

  if (!profile) {
    return <p>Loading....</p>;
  }

  return (
    <main>
      {profile.map((post, index) => {
        const date = new Date(post.created_at);
        return (
          <article className="post" key={index}>
            <section className="post__container">
              <div className="post__avatar-container">
                <img src={post.avatar} alt="" className="post__avatar" />
                <div className="post__text-container">
                  <h3 className="post__username">{post.username}</h3>
                  <p className="post__location">{`${post.site_name}, ${post.city}`}</p>
                </div>
              </div>
              <p className="post__timestamp">
                <TimeAgo date={date} />
              </p>
            </section>
            <img
              src={post.image_link}
              alt={post.site_name}
              className="post__img"
            />
            <p className="post__description">{post.description}</p>
          </article>
        );
      })}
    </main>
  );
};
export default Post;

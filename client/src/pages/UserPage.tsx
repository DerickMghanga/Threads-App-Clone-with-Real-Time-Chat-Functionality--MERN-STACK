import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

export default function UserPage() {
  return (
    <>
      <UserHeader />
      <UserPost postImg={'/post1.png'} postTitle={'Nice tutorial'} likes={200} replies={40}  />
      <UserPost postTitle={'This is my first post on Threads'} likes={79} replies={26}  />
      <UserPost postImg={'/post2.png'} postTitle={'Lets talk about Threads'} likes={147} replies={20}  />
      <UserPost postImg={'/post3.png'} postTitle={'This guy is a genius'} likes={2000} replies={490}  />
    </>
  )
}

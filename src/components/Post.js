import './Post.css'
import picture from '../assets/beef.jpeg'

function Post({ post }) {
  const {
    name,
    description,
    meatDTO: { typeOfCut, meatType },
    rubDTO: { name: rubName },
    createdByUser: { username },
    createdAt,
  } = post

  return (
    <article className='post'>
      <h1 className='meal-name'>{name}</h1>
      <img src={picture} alt='beef' className='picture' />
      <div className='about'>
        <p className='meal-description'>{description.slice(0, 200)}...</p>
        <p>{typeOfCut}</p>
        <p>{meatType}</p>
        <p>{rubName}</p>
        <p>{username}</p>
        <p>{createdAt}</p>
      </div>
    </article>
  )
}
export default Post

import { Ix } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { Wrapper, Column, Photo, Username, Payload, DeleteButton } from "../components/tweet-component";

export default function X({ username, photo, x, userId, id }: Ix){
  const user = auth.currentUser;
  const onDelete = async() => {
    const ok = confirm("Are you sure you want to delete this x?");
    if(!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if(photo){
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{x}</Payload>
        {user?.uid == userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
      </Column>
      <Column>
        {photo ? <Photo src={photo} /> : null}
      </Column>
    </Wrapper>
  )
}
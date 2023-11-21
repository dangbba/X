import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Form, TextArea, AttachFileButton, AttachFileInput, SubmitBtn } from "../components/post-component";

export default function PostForm(){
  const [isLoading, setLoading] = useState(false);
  const [x, setX] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setX(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
      if (files && files.length === 1) {
        setFile(files[0]);
      }
  };
  const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || x === '' || x.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        x,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url
        });
      }
      setX('');
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea required rows={5} maxLength={180} onChange={onChange} value={x} placeholder="What is happening?!" />
      <AttachFileButton htmlFor="file">{file ? "Photo added ✔" : "Add photo"}</AttachFileButton>
      <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
      <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post X"} />
    </Form>
  )
}
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import X from "./x";

export interface Ix {
  id: string;
  photo?: string;
  x: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div``;

export default function Timeline(){
  const [xs, setX] = useState<Ix[]>([]);
  const fetchXs = async() => {
    const XsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(XsQuery);
    const tweets = snapshot.docs.map(doc => {
      const {x, createdAt, userId, username, photo} = doc.data();
      return {
        x,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setX(tweets);
  };
  useEffect(() => {
    fetchXs();
  }, []);
  return (
    <Wrapper>
      {xs.map(x => (<X key={x.id} {...x} />))}
    </Wrapper>
  );
}
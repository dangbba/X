import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import X from "./x";
import { Unsubscribe } from "firebase/auth";

export interface Ix {
  id: string;
  photo?: string;
  x: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline(){
  const [xs, setX] = useState<Ix[]>([]);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchXs = async() => {
      const XsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      // const snapshot = await getDocs(XsQuery);
      // const tweets = snapshot.docs.map(doc => {
      //   const {x, createdAt, userId, username, photo} = doc.data();
      //   return {
      //     x,
      //     createdAt,
      //     userId,
      //     username,
      //     photo,
      //     id: doc.id,
      //   };
      // });
      // setX(tweets);
      unsubscribe = await onSnapshot(XsQuery, snapshot => {
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
      })
    };
    fetchXs();
    return () => {
      unsubscribe && unsubscribe();
    }
  }, []);
  return (
    <Wrapper>
      {xs.map(x => (<X key={x.id} {...x} />))}
    </Wrapper>
  );
}
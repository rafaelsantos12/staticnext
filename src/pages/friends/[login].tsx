import { GetStaticPaths, GetStaticProps } from "next";
import Image from 'next/image'

export default function Friends( {friend}){
    
    return(
        <div>
            <Image src={friend.avatar_url} width="80" alt="Avatar"/>
            <h1>{friend.login}</h1>
            <p>{friend.bio}</p>
        </div>
       
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    
    const response = await fetch('https://api.github.com/users/rafaelsantos12/following');
    const data = await response.json()

    const paths = data.map(friend => {
        return(
            {params:{ login: friend.login}}
        )
    });

    return{
        paths,
        fallback: false,
    }

}

export const getStaticProps: GetStaticProps = async (context) =>{
    
    const { login } = context.params;
    const response = await fetch(`https://api.github.com/users/${login}`);
    const data = await response.json()

    return{
        props:{
            friend: data,
        }
    }
}
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";


export default function Friends( { friend } ){
    
    const { isFallback } = useRouter();

    if( isFallback){
        return <p>Carregando...</p>
    }
    
    return(
        <div>
            <img src={friend.avatar_url} width="80" alt="Avatar" style={{ borderRadius: 40 }}/>
            <h1>{friend.login}</h1>
            <p>{friend.bio}</p>
        </div>
       
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    
    const response = await fetch('https://api.github.com/users/rafaelsantos12/following');
    const data = await response.json()

    const paths = data.map( friends => {
        return(
            {params:{ login: friends.login}}
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
        },
        revalidate: 10,
    }
}
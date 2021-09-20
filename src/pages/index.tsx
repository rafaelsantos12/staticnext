import { GetStaticProps } from "next";



export default function Home({ org }) {
  return (
    <div>
      <img src={org.avatar_url } alt="Avatar"  width="80" alt="Avatar" style={{ borderRadius: 40 }}/>
      <h1>{org.login}</h1>
      <p>{org.bio}</p>
    </div> 
  ) 
}

// Quando a página não muda constantemente, ou seja, a última versão
export const getStaticProps: GetStaticProps = async () =>{

    const response = await fetch('https://api.github.com/users/rafaelsantos12');
    const data = await response.json();

   
    return{
      props:{
        org: data,
      },
      revalidate: 10
    }
};

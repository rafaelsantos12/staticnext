import { GetStaticProps } from "next";
import Image from 'next/image'


export default function Home({org}) {
  return (
    <div>
      <Image src={org.avatar_url } alt="Avatar"/>
      <h1>{org.login}</h1>
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

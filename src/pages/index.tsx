import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function IndexPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/app');
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Portfolify - Redirecionando...</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Carregando...</p>
      </div>
    </>
  );
} 
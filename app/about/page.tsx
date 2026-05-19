export default async function About() {
  return (
    <div className="mt-6 lg:p-6">
      <h2 className="font-semibold text-4xl">About</h2>
      <hr className="text-muted-background mb-3" />
      <p className="mb-2">
        I am a full stack software engineer who is enthusiastic about learning
        new skills and building impactful products. Over the past 4 years I have been working at Immutable
        as a Software Engineer and as a Solutions Architect. This has enabled me to build product that is consumer facing and 
        interface directly with our B2B customers. As I started my career at a consultancy and digital
        agency, I worked on a broad range of projects using different tech
        stacks which enabled me to gather skills in a wide variety of
        technologies and programming languages. The technologies that I&apos;m most familar with are:
      </p>

      <h2 className="font-semibold text-2xl my-2">Technologies</h2>
      <h3 className="text-lg font-semibold my-2">Frontend</h3>
      <p className="mb-2">React, Next.js, Typescript, TailwindCSS, Chakra UI</p>
      <h3 className="text-lg font-semibold my-2">Backend</h3>
      <p className="mb-2">NodeJS, NestJS, Express, Fastify</p>
      <h3 className="text-lg font-semibold my-2">Database & Messaging</h3>
      <p className="mb-2">SQL, PostgreSQL, RabbitMQ</p>
      <h3 className="text-lg font-semibold my-2">Cloud</h3>
      <p className="mb-2">Azure, AWS</p>
      <h3 className="text-lg font-semibold my-2">CI/CD</h3>
      <p className="mb-2">GitHub, Git</p>
      <h3 className="text-lg font-semibold my-2">Blockchain</h3>
      <p className="mb-2">Solidity, Hardhat, Foundry, ethers.js</p>
    </div>
  );
}

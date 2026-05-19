export default async function Portfolio() {
  return (
    <div className="flex-1 lg:p-6">
      <h2 className="font-semibold text-4xl">Portfolio</h2>
      <hr className="text-muted-background mb-3" />
      <p>Below is a list of the projects that I have worked on:</p>

      <h2 className="text-2xl mt-6 mb-2">Immutable Checkout SDK + UI</h2>
      <p className="my-2">
        Immutable Checkout provides an SDK and embeddable UI widgets for
        marketplaces and games to connect their users to the Immutable zkEVM
        blockchain. Checkout facilitates web3 wallet connection, funding methods
        such as token swaps, token bridges (to and from Ethereum), fiat onramps
        and a Smart NFT Checkout flow for easy purchases.
      </p>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 justify-center gap-4 py-4 my-4 ">
        <div className="flex flex-col items-center gap-2">
          <img
            className="rounded-md"
            alt="Immutable Checkout UI"
            src="/img/portfolio/ImmutableCheckout.png"
            width={300}
          />
          <p className="text-muted-foreground">Connect a wallet</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <img
            className="rounded-md"
            alt="Immutable Balances UI"
            src="/img/portfolio/ImmutableBalancesWidget.png"
            width={300}
          />
          <p className="text-muted-foreground">View balances</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img
            className="rounded-md"
            alt="Immutable Swap UI"
            src="/img/portfolio/ImmutableSwapWidget.png"
            width={300}
          />
          <p className="text-muted-foreground">Swap tokens on a DEX</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img
            className="rounded-md"
            alt="Immutable Bridge UI"
            src="/img/portfolio/ImmutableBridgeWidget.png"
            width={300}
          />
          <p className="text-muted-foreground">Bridge funds from Ethereum</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img
            className="rounded-md"
            alt="Immutable Bridge Review UI"
            src="/img/portfolio/ImmutableBridgeReview.png"
            width={300}
          />
          <p className="text-muted-foreground">Review bridge transaction</p>
        </div>
      </div>

      <h2 className="text-2xl mt-6 mb-2">Immutable Toolkit</h2>
      <p className="my-2">
        The Immutable Toolkit is a consumer facing web application that started
        as platform to internally showcase the Immutable Checkout Widgets that
        grew into a consumer facing application for our users to interface with
        the Immutable zkEVM blockhain.
      </p>
      <div className="flex justify-center py-4 my-4">
        <img
          className="rounded-md w-full"
          alt="Immutable Toolkit"
          src="/img/portfolio/ImmutableToolkit.png"
        />
      </div>

      <h2 className="text-2xl mt-6 mb-2">Immutable X Marketplace</h2>
      <div className="flex justify-center py-4 my-4">
        <img
          className="w-full"
          alt="Immutable X Marketplace"
          src="/img/portfolio/ImmutableXMarketplace.png"
        />
      </div>

      <p className="mb-2">
        The Immutable X Marketplace is a web3 enabled site or dApp, where gamers
        and traders can go to trade their NFTs and game items. During my time
        working on the marketplace I built many features including: the ‘make an
        offer’ trading experience, enabling a new way to facilitate trades an
        asset price history section a renewed text search for ease of finding
        items a ‘recently sold’ search filter a refreshed token balances view
        USD equivalent prices This role gave me the opportunity to take
        ownership of the design and implementation of new features. I was also
        able to guide the rest of the team on domain specific knowledge and
        facilitate cross team strategy and collaboration. We also made it a
        habit to present new releases to the IMX community through Discord and
        other channels for gathering and implementing feedback. With all of this
        I am proud of what the team was able to achieve.
      </p>

      <h2 className="text-2xl mt-6 mb-2">Cruz LMS </h2>
      <div className="flex justify-center py-4 my-4">
        <img
          className="w-full"
          alt="Cruz LMS"
          src="/img/portfolio/CruzLMS.png"
        />
      </div>
      <p className="mb-2">
        I took on this project as a independent contractor working for Cruz
        Financial Planning. The Cruz Learning Management System was an MVP
        project to help customers sort out their personal finances giving them a
        better understanding of where they are and how they can achieve their
        goals in the future. As I took on the software build of this project
        alone, I was responsible for the application end to end. Everything from
        the front end website, the backend API, persistance of data, user
        authentication and sign up, CI/CD pipelines as well as cloud
        infrastructure, security and deployment. I collaborated with Cruz’s
        marketing specialist to integrate customer analytics into the system for
        observation of user progress and gathering of feedback. This role
        challenged me to make the appropriate trade-offs to balance project
        delivery and quality.
      </p>

      <h2 className="text-2xl mt-6 mb-2">Grow Super - Member Online</h2>
      <p className="mb-2">
        Portal Grow’s Member Online portal is a web based platform that connects
        users to their superannuation (retirement) fund. It enables super fund
        providers to give their members a great online experience. I joined the
        team for a 6 month period to help build out their onboarding /
        registration flow. Then adding more options for user’s to manage their
        account details and finally showing the superannuation investment
        breakdown options.
      </p>
      <h2 className="text-2xl mt-6 mb-2">Guzman Y Gomez App (Aus)</h2>
      <p className="mb-2">
        {" "}
        Guzman Y Gomez App GYG’s app and website is an online ordering platform
        for all of the Guzman Y Gomez restaurants across Australia. I’m most
        proud about creating the menu and restaurant selection features.
      </p>

      <h2 className="text-2xl mt-6 mb-2">Public Transport Victoria API</h2>

      <p className="mb-2">
        When I joined Tigerspike (now Concentrix Catalyst), our team worked on
        managing and improving the backend APIs for Public Transport Victoria.
        We primarily worked on the integration of Real-time Bus scheduling,
        departure and disruption information across the network. This data was
        then used by consumers to feed the PTV Website, mobile application and
        bus stop passenger displays.{" "}
      </p>

      <div className="flex justify-center py-4 my-4">
        <img
          className="w-full"
          alt="PTV Train Map"
          src="/img/portfolio/PTV-TrainGPS.png"
        />
      </div>
      <p>
        The flashing and moving blue train icon is made possible by GPS location
        data integration The other project I was proud to be a part of was the
        integration of train GPS vehicle location information into the APIs.
        This data is currently used in the website and mobile app to show
        greater real time position information to the end user of when their
        train is approaching.
      </p>
    </div>
  );
}

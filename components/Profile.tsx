import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default async function Profile() {
  const linkedIn = "https://www.linkedin.com/in/zacharycouchman/";
  const github = "https://github.com/ZacharyCouchman";
  return (
    <aside className="w-full h-20 flex items-center gap-4 lg:py-6 lg:w-64 lg:h-[calc(100vh-100px)] lg:sticky lg:overflow-y-auto lg:top-11 lg:flex-col lg:items-start">
      <img
        alt="Profile picture"
        src="/img/zach-profile.jpg"
        className="w-12 h-12 lg:w-30 lg:h-30 rounded-full ring-1 ring-muted-background"
      />
      <div className="flex items-center justify-between w-full lg:flex-col lg:items-start gap-4">
        <div>
          <h3 className="lg:text-xl font-bold text-muted-foreground">
            Zachary Couchman
          </h3>
          <p className="lg:text-lg text-muted-foreground">
            Senior Software Engineer
          </p>
        </div>
        <Popover className="lg:hidden pr-4">
          <PopoverButton className="block text-sm/6 p-1 w-24 font-semibold border border-muted-foreground rounded-xl text-foreground/50 focus:outline-none data-active:text-foreground data-focus:outline data-focus:outline-white data-hover:text-foreground">
            Contact
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="text-foreground rounded-xl shadow-lg bg-background text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(2)] data-closed:-translate-y-1 data-closed:opacity-0"
          >
            <div className="p-2 text-center">
              <a
                className="block rounded-lg px-3 py-2 transition hover:bg-foreground/5"
                href={linkedIn}
                target="_blank"
              >
                <p className="text-foreground">LinkedIn</p>{" "}
              </a>
              <a
                className="block rounded-lg px-3 py-2 transition hover:bg-foreground/5"
                href={github}
                target="_blank"
              >
                <p className="text-foreground">GitHub</p>
              </a>
            </div>
          </PopoverPanel>
        </Popover>
        <div className="hidden lg:flex lg:flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>

            <p className="text-muted-foreground">Boston, MA</p>
          </div>
          {/** LinkedIn */}
          <div className="flex items-center gap-2">
            <img
              alt="LinkedIn icon"
              src="/icon/linkedin-svgrepo-com.svg"
              height={20}
              width={20}
              className="dark:bg-white rounded-sm"
            />
            <a
              href={linkedIn}
              target="_blank"
              className="text-muted-foreground hover:underline"
            >
              LinkedIn
            </a>
          </div>
          {/** GitHub */}
          <div className="flex items-center gap-2">
            <img
              alt="GitHub icon"
              src="/icon/GitHub_Invertocat_Black.svg"
              height={20}
              width={20}
              className="block dark:hidden"
            />
            <img
              alt="GitHub icon"
              src="/icon/GitHub_Invertocat_White.svg"
              height={20}
              width={20}
              className="hidden dark:block"
            />
            <a
              href={github}
              target="_blank"
              className="text-muted-foreground hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

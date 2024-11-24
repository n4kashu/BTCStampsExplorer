interface PlaceholderImageProps {
  className: string;
}

function PlaceholderImage({ className }: PlaceholderImageProps) {
  return (
    <div
      className={`bg-gradient-to-b from-[#CC0000] via-[#CCCC00] to-[#0000CC] flex justify-center items-center mx-auto max-w-full ${className}`}
    >
      <img
        src="/img/icons/image-upload.svg"
        className="w-[72px] h-[72px]"
        alt="Placeholder"
        width={72}
        height={72}
      />
    </div>
  );
}

interface ArticleLink {
  title: string;
  href: string;
}

const ARTICLE_LINKS: ArticleLink[] = [
  { title: "DEPLOY YOUR OWN TOKEN", href: "/howto/deploytoken" },
  { title: "MINT YOUR OWN TOKEN", href: "/howto/mint" },
  { title: "STAMPING ART", href: "/howto/getstamping" },
  { title: "TRANSFER FUNCTIONALITY", href: "/howto/transfer" },
  { title: "CREATE A WALLET", href: "/howto/leathercreate" },
  { title: "CONNECT YOUR LEATHER WALLET", href: "/howto/leatherconnect" },
];

export default function HowTo() {
  return (
    <div className="text-[#CCCCCC] text-lg font-medium flex flex-col gap-12 mt-20 tablet:mt-40">
      <div className="max-w-[660px] w-full mx-auto flex flex-col gap-12">
        <section>
          <h1 className="gray-gradient3 text-6xl font-black">How-To</h1>
          <h2 className="text-2xl tablet:text-5xl font-extralight mb-3">
            Transfer
          </h2>
          <p className="mb-12">
            Recepient address must start with 1 if classic, or with bc1q if
            SegWit.<br />
            Start typing the token to access to your list of tokens.<br />
            <br />
            Enter the amount of tokens that you want to transfer. <br />
            <br />
            FEES shows the suggested amount, and you can adjust it with the
            slider.Lowering the fee may delay your art being stamped.<br />
            Fees are displayed in BTC by default, but you can switch to USDT
            using the TOGGLE.<br />
            All related costs are listed under the DETAILS section.<br />
            Accept the terms and conditions to enable the Transfer button.<br />
            <br />
            The Transfer button will submit your transaction with all the
            provided information.<br />
          </p>
          <PlaceholderImage className="w-full tablet:w-[660px] h-[318px]" />
          <p className="mt-6">
            Ut elementum porta ante, malesuada lacinia dolor rutrum vel. Vivamus
            rutrum volutpat sagittis. Vestibulum text link primis in faucibus
            orci luctus et ultrices posuere cubilia curae; Nullam vel sem non
            enim pulvinar suscipit.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl tablet:text-5xl font-extralight">
            SUBHEADING
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sem
            vitae lacus venenatis blandit. Curabitur pharetra ipsum id mauris
            pulvinar auctor.<br />
            <br />
            Ut sit amet diam condimentum, vehicula justo in, vulputate justo.
            Aenean tincidunt nisl mattis, bibendum velit at, dictum leo. Nam
            tempus suscipit velit non interdum. Donec ullamcorper, ante ac
            condimentum suscipit, diam lorem luctus nulla, at dictum diam nunc
            ornare ante. Ut elementum porta ante, malesuada lacinia dolor rutrum
            vel.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl tablet:text-5xl font-extralight">
            SUBHEADING
          </h2>
          <div className="grid grid-cols-1 tablet:grid-cols-2 items-center gap-6">
            <div className="space-y-6">
              <p>
                Aliquam ac convallis tellus. Proin ullamcorper eu magna in
                iaculis. Pellentesque nulla ex, finibus id purus quis, dictum
                posuere velit. Proin sit amet condimentum neque. Nulla facilisi.
                Nam laoreet ornare sem quis eleifend. Nulla facilisi. Praesent
                dui nibh, finibus maximus nunc vitae, efficitur finibus enim.
                Fusce in sem rutrum eros porttitor aliquam a id enim.
              </p>
              <p>
                Aliquam ac convallis tellus. Proin ullamcorper eu magna in
                iaculis. Pellentesque nulla ex, finibus id purus quis, dictum
                posuere velit. Proin sit amet condimentum neque. Nulla facilisi.
                Nam laoreet ornare sem quis eleifend. Nulla facilisi. Praesent
                dui nibh, finibus maximus nunc vitae, efficitur finibus enim.
                Fusce in sem rutrum eros porttitor aliquam a id enim.
              </p>
              <PlaceholderImage className="w-full tablet:w-[318px] h-[178px]" />
            </div>

            <div className="space-y-6">
              <PlaceholderImage className="w-full tablet:w-[318px] h-[424px]" />
              <p>
                Aliquam tellus. Proin ullamcorper eu magna in iaculis.
                Pellentesque nulla ex, finibus id purus quis, dictum posuere
                velit. Proin sit amet condimentum neque. Nulla facilisi. Nam
                laoreet ornare sem quis eleifend. Nulla facilisi. Praesent dui
                nibh, finibus maximus nunc vitae, efficitur finibus enim. Fusce
                in sem rutrum eros porttitor aliquam a id enim.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl tablet:text-5xl font-extralight">
            SUBHEADING
          </h2>
          <p className="mb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sem
            vitae lacus venenatis blandit. Curabitur pharetra ipsum id mauris
            pulvinar auctor. Ut sit amet diam condimentum, vehicula justo in,
            vulputate justo. Aenean tincidunt nisl mattis, bibendum velit at,
            dictum leo. Nam tempus suscipit velit non interdum. Donec
            ullamcorper, ante ac condimentum suscipit, diam lorem luctus nulla,
            at dictum diam nunc ornare ante. Ut elementum porta ante, malesuada
            lacinia dolor rutrum vel. Vivamus rutrum volutpat sagittis.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Nullam vel sem non enim pulvinar suscipit.
          </p>
          <PlaceholderImage className="w-full tablet:w-[660px] h-[372px]" />
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mt-3">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id
              sem vitae lacus venenatis blandit. Curabitur pharetra ipsum id
              mauris pulvinar auctor. Ut sit amet diam condimentum, vehicula
              justo in, vulputate justo. Aenean tincidunt nisl mattis, bibendum
              velit at, dictum leo. Nam tempus suscipit velit non interdum.
              Donec ullamcorper, ante ac condimentum suscipit, diam lorem luctus
              nulla, at dictum diam nunc ornare ante. Ut elementum porta ante,
              malesuada lacinia dolor rutrum vel. Vivamus rutrum volutpat
              sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae; Nullam vel sem non enim pulvinar
              suscipit.
            </p>
            <PlaceholderImage className="w-full tablet:w-[318px] h-[318px]" />
          </div>
        </section>
      </div>
      <section className="mt-24">
        <h1 className="gray-gradient3 text-4xl tablet:text-5xl desktop:text-6xl font-black">
          KEEP READING
        </h1>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl tablet:text-5xl font-extralight">HOW-TO</h2>
            {ARTICLE_LINKS.map(({ title, href }) => (
              <a
                key={`${title}-${href}`}
                href={href}
                f-partial={href}
                className="block gray-gradient3 text-xl tablet:text-2xl font-bold"
              >
                {title}
              </a>
            ))}
          </div>
          <div className="flex flex-col tablet:items-end tablet:text-right">
            <h2 className="text-2xl tablet:text-5xl font-extralight">FAQ</h2>
            <p>
              All you ever wanted to know about the Bitcoin Stamps protocol and
              stuff you never thought you needed to know.
            </p>
            <div className="w-full flex justify-end">
              <a
                href="/faq"
                f-partial="/faq"
                className="float-right border-2 border-[#999999] text-[#999999] w-[78px] h-[48px] flex justify-center items-center rounded-md"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

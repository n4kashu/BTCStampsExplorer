import { useState } from "preact/hooks";
import { SRC20Row } from "globals";

import { ViewAllButton } from "$components/shared/ViewAllButton.tsx";

import { SRC20TokenMintingCard } from "$islands/src20/cards/SRC20TokenMintingCard.tsx";
import { SRC20TokenOutmintedCard } from "$islands/src20/cards/SRC20TokenOutmintedCard.tsx";
import { ModulesStyles } from "$islands/modules/Styles.ts";

type SRC20SectionProps = {
  title?: string;
  subTitle?: string;
  type: "all" | "trending";
  data: SRC20Row[];
};

const ImageModal = (
  { imgSrc, isOpen, onClose }: {
    imgSrc: string | null;
    isOpen: boolean;
    onClose: () => void;
  },
) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      class="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {imgSrc && <img class="w-60 h-60" src={imgSrc} alt="Modal" />}
      </div>
    </div>
  );
};

export const SRC20Section = (props: SRC20SectionProps) => {
  const { data } = props;
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => setModalOpen(false);
  const handleImageClick = (imgSrc: string) => {
    setModalImg(imgSrc);
    setModalOpen(!isModalOpen);
  };

  return (
    <div>
      {props.title && (
        <h1 class={ModulesStyles.titlePurpleDLClassName}>
          {props.title}
        </h1>
      )}
      {props.subTitle && (
        <h2
          class={ModulesStyles.subTitlePurple +
            " mb-3 mobileMd:mb-6 desktop:mb-9"}
        >
          {props.subTitle}
        </h2>
      )}

      <div class="grid grid-cols-1 gap-3 mobileLg:gap-6 items-end max-w-desktop w-full mx-auto">
        <ImageModal
          imgSrc={modalImg}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        <div class="flex flex-col gap-6">
          {data.map((src20) => (
            src20.progress !== "100"
              ? (
                <SRC20TokenMintingCard
                  src20={src20}
                  variant="deploy"
                  onImageClick={handleImageClick}
                />
              )
              : (
                <SRC20TokenOutmintedCard
                  src20={src20}
                  variant="deploy"
                  onImageClick={handleImageClick}
                />
              )
          ))}
        </div>

        <div className="flex justify-end">
          <ViewAllButton href={`/src20?type=${props.type}`} />
        </div>
      </div>
    </div>
  );
};
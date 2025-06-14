import { convertToEmoji } from "utils/util.ts";

interface SRC20TickHeaderProps {
  deployment: any;
  mint_status: any;
  total_holders: number;
  total_mints: number;
  total_sends: number;
}
export const SRC20TickHeader = (props: SRC20TickHeaderProps) => {
  const { deployment, mint_status, total_holders, total_mints, total_sends } =
    props;
  return (
    <div class="flex w-full flex-col md:flex-row gap-4 items-center justify-center">
      <img
        src={`/content/${deployment.tx_hash}.svg`}
        class="w-full md:w-2/5 h-full rounded-lg"
      />

      <div class="relative w-full md:w-3/5 overflow-x-auto flex flex-col gap-8 text-white">
        <div class="flex flex-col gap-5">
          <p class="text-5xl uppercase">{convertToEmoji(deployment.tick)}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p>
        </div>
        <hr />
        <div class="flex flex-col gap-5">
          <p class="text-[#03A606] text-2xl font-semibold">Properties</p>
          <div class="flex justify-between">
            <div class="w-1/5 flex items-center justify-start">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">{total_holders}</p>
                <p class="text-base">Total Holders</p>
              </div>
            </div>
            <div class="border-r border-[#ffffff49]"></div>
            <div class="w-2/5 flex items-center justify-center">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">{total_mints}</p>
                <p class="text-base">Total Mints</p>
              </div>
            </div>
            <div class="border-r border-[#ffffff49]"></div>
            <div class="w-2/5 flex items-center justify-center">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">{total_sends}</p>
                <p class="text-base">Total Sends</p>
              </div>
            </div>
            <div class="border-r border-[#ffffff49]"></div>
            <div class="w-1/5 flex items-center justify-end">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">
                  {total_sends + total_mints}
                </p>
                <p class="text-base">TXs</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-5">
          <p class="text-[#03A606] text-2xl font-semibold">Others</p>
          <div class="flex justify-between">
            <div class="w-1/3 flex items-center justify-start">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">
                  {convertToEmoji(deployment.tick)}
                </p>
                <p class="text-base">Tick</p>
              </div>
            </div>
            <div class="border-r border-[#ffffff49]"></div>
            <div class="w-2/5 flex items-center justify-center">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">{deployment.block_index}</p>
                <p class="text-base">Block</p>
              </div>
            </div>
            <div class="border-r border-[#ffffff49]"></div>
            <div class="w-1/3 flex items-center justify-end">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">
                  {new Date(deployment.block_time).toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p class="text-base">Time</p>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="w-1/3 flex items-center justify-start">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">{deployment.max}</p>
                <p class="text-base">Total Supply</p>
              </div>
            </div>
            <div class="border-r border-[#ffffff49]"></div>
            <div class="w-2/5 flex items-center justify-center">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">{total_holders}</p>
                <p class="text-base">Total Holders</p>
              </div>
            </div>
            <div class="border-r border-[#ffffff49]"></div>
            <div class="w-1/3 flex items-center justify-end">
              <div class="flex flex-col">
                <p class="text-2xl font-semibold">{mint_status.progress}%</p>
                <p class="text-base">Total minted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

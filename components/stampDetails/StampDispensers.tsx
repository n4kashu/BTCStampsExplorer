import dayjs from "$dayjs/";
import relativeTime from "$dayjs/plugin/relativeTime";

import { abbreviateAddress } from "utils/util.ts";

dayjs.extend(relativeTime);

export function StampDispensers(
  { dispensers }: {
    dispensers: {
      source: string;
      give_remaining: number;
      satoshirate: number;
    }[];
  },
) {
  return (
    <div className="relative shadow-md max-w-256">
      <p class="text-[#F5F5F5] text-[26px] font-semibold">
        Dispensers ({dispensers.length})
      </p>
      <div className={"custom-scrollbar max-h-96 overflow-x-auto"}>
        <div className="w-full min-h-96 h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-[#2B0E49] py-6 pl-7">
          <div
            className={"border border-[#B9B9B9] border-l-0 border-b-0 min-h-96 h-full"}
          >
            {dispensers.map((dispenser) => (
              <div
                className="border-b border-[#B9B9B9] flex justify-between text-[#F5F5F5] text-[18px]"
                key={dispenser.source}
              >
                <p className="pr-6 py-4">
                  {abbreviateAddress(dispenser.source)}
                </p>
                <p className="pr-6 py-4">
                  {dispenser.give_remaining}
                </p>
                <p className="pr-6 py-4">{dispenser.satoshirate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { HandlerContext } from "$fresh/server.ts";

import { CommonClass, getClient, Src20Class } from "$lib/database/index.ts";
import { paginate } from "utils/util.ts";
import { SRC20Header } from "$islands/src20/SRC20Header.tsx";
import { SRC20DeployTable } from "$islands/src20/SRC20DeployTable.tsx";

//TODO: Add pagination

export const handler = {
  async GET(req: Request, ctx: HandlerContext) {
    try {
      const url = new URL(req.url);
      const limit = Number(url.searchParams.get("limit")) || 1000;
      const page = Number(url.searchParams.get("page")) || 1;

      const client = await getClient();
      const data = await Src20Class.get_valid_src20_tx_with_client(
        client,
        null,
        null,
        "DEPLOY",
        limit,
        page,
      );
      const total = await Src20Class.get_total_valid_src20_tx_with_client(
        client,
        null,
        "DEPLOY",
      );
      const last_block = await CommonClass.get_last_block_with_client(client);

      const pagination = paginate(total.rows[0]["total"], page, limit);

      const body = {
        ...pagination,
        last_block: last_block.rows[0]["last_block"],
        data: data.rows.map((row) => {
          return {
            ...row,
            max: row.max ? row.max.toString() : null,
            lim: row.lim ? row.lim.toString() : null,
            amt: row.amt ? row.amt.toString() : null,
          };
        }),
      };
      return await ctx.render(body);
    } catch (error) {
      console.error(error);
      const body = { error: `Error: Internal server error` };
      return ctx.render(body);
    }
  },
};

export function SRC20Page(props) {
  const { data, total, page, pages, limit } = props.data;
  return (
    <div class="flex flex-col gap-8">
      <SRC20Header />
      <SRC20DeployTable data={data} />
    </div>
  );
}
export default SRC20Page;

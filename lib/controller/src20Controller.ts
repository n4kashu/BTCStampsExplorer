import { Src20Service } from "$lib/services/src20Service.ts";
import { SRC20Repository } from "$lib/database/src20Repository.ts";
import {
  SRC20BalanceRequestParams,
  SRC20SnapshotRequestParams,
  SRC20TrxRequestParams,
} from "globals";
import { StampService } from "$lib/services/stampService.ts";
import { getBtcAddressInfo } from "utils/btc.ts";
import { BlockService } from "$lib/services/blockService.ts";
import { convertToEmoji } from "utils/util.ts";
import {
  MarketListingSummary,
  Src20MktService,
} from "$lib/services/src20MktService.ts";

export class Src20Controller {
  static async getTotalCountValidSrc20Tx(
    params: { tick?: string; op?: string | string[] },
    excludeFullyMinted: boolean = false,
  ): Promise<number> {
    try {
      const result = await SRC20Repository.getTotalCountValidSrc20TxFromDb(
        params,
        excludeFullyMinted,
      );
      return result.rows[0].total;
    } catch (error) {
      console.error("Error getting total valid SRC20 transactions:", error);
      throw error;
    }
  }

  static async handleSrc20TransactionsRequest(
    _req: Request,
    params: SRC20TrxRequestParams,
    excludeFullyMinted: boolean = false,
  ) {
    try {
      return await Src20Service.fetchAndFormatSrc20Data(
        params,
        excludeFullyMinted,
      );
    } catch (error) {
      console.error("Error processing SRC20 transaction request:", error);
      throw error;
    }
  }

  static async handleAllSrc20DataForTickRequest(tick: string) {
    try {
      return await Src20Service.fetchAllSrc20DataForTick(tick);
    } catch (error) {
      console.error("Error processing all SRC20 data request for tick:", error);
      throw error;
    }
  }

  static async handleSrc20BalanceRequest(
    balanceParams: SRC20BalanceRequestParams,
  ) {
    try {
      // Assign default values if limit and page are undefined or invalid
      const limit = Number(balanceParams.limit) || 50; // Set a default limit, e.g., 50
      const page = Number(balanceParams.page) || 1;

      // Update balanceParams with safe values
      balanceParams.limit = limit;
      balanceParams.page = page;

      const [fetchedData, lastBlock] = await Promise.all([
        Src20Service.fetchSrc20Balance(balanceParams),
        BlockService.getLastBlock(),
      ]);

      let restructuredResult: any = {
        last_block: lastBlock,
      };

      if (balanceParams.includePagination) {
        const fetchedTotalCount = await Src20Service.getTotalSrc20BalanceCount(
          balanceParams,
        );

        restructuredResult = {
          page,
          limit,
          totalPages: Math.ceil(fetchedTotalCount / limit),
          total: fetchedTotalCount,
          ...restructuredResult,
        };
      }

      restructuredResult.data = fetchedData;

      return restructuredResult;
    } catch (error) {
      console.error("Error processing SRC20 balance request:", error);
      console.error("Params:", JSON.stringify(balanceParams));
      // Return an empty response instead of throwing an error
      return {
        last_block: await BlockService.getLastBlock(),
        data: balanceParams.address && balanceParams.tick ? {} : [],
      };
    }
  }

  static async handleSrc20SnapshotRequest(params: SRC20SnapshotRequestParams) {
    try {
      const [snapshotData, lastBlock, total] = await Promise.all([
        Src20Service.fetchSrc20Snapshot(params),
        BlockService.getLastBlock(),
        Src20Service.getTotalSrc20BalanceCount(params),
      ]);

      const limit = params.limit || snapshotData.length;
      const page = params.page || 1;

      const restructuredResult = {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total,
        snapshot_block: lastBlock,
        data: snapshotData,
      };

      return restructuredResult;
    } catch (error) {
      console.error("Error processing SRC20 snapshot request:", error);
      throw error;
    }
  }

  static async handleSrc20MintProgressRequest(tick: string) {
    try {
      const responseBody = await Src20Service.getSrc20MintProgressByTick(tick);
      if (responseBody === null) {
        return null; // Return null instead of throwing an error
      }
      return responseBody;
    } catch (error) {
      console.error("Error processing SRC20 mint progress request:", error);
      return null; // Return null in case of any error
    }
  }

  static async handleCheckMintedOut(tick: string, amount: string) {
    try {
      return await Src20Service.checkMintedOut(tick, amount);
    } catch (error) {
      console.error("Error checking minted out status:", error);
      throw error;
    }
  }

  static async handleWalletBalanceRequest(
    address: string,
    limit = 50,
    page = 1,
  ) {
    try {
      const subLimit = Math.ceil(limit / 2);
      const [btcInfo, stampsResponse, src20Response, lastBlock] = await Promise
        .allSettled([
          getBtcAddressInfo(address),
          StampService.getStampBalancesByAddress(address, subLimit, page),
          this.handleSrc20BalanceRequest({
            address,
            limit: subLimit,
            page,
            sortBy: "ASC",
          }),
          BlockService.getLastBlock(),
        ]);

      const btcData = btcInfo.status === "fulfilled" ? btcInfo.value : null;
      const stampsData = stampsResponse.status === "fulfilled"
        ? stampsResponse.value
        : { stamps: [], total: 0 };
      const src20Data = src20Response.status === "fulfilled"
        ? src20Response.value
        : { data: [], last_block: 0 };
      const lastBlockData = lastBlock.status === "fulfilled"
        ? lastBlock.value
        : null;

      const stampsTotal = stampsData.total || 0;
      const src20Total = Array.isArray(src20Data.data)
        ? src20Data.data.length
        : 0;
      const totalItems = stampsTotal + src20Total;
      const totalPages = Math.ceil(totalItems / limit);

      return {
        btc: btcData,
        data: {
          stamps: stampsData.stamps,
          src20: Array.isArray(src20Data.data) ? src20Data.data : [],
        },
        pagination: {
          page,
          limit,
          total: totalItems,
          totalPages,
        },
        last_block: src20Data.last_block || lastBlockData?.last_block || 0,
      };
    } catch (error) {
      console.error("Error processing wallet balance request:", error);
      throw error;
    }
  }

  static async getValidSrc20Tx(params: SRC20TrxRequestParams) {
    return await SRC20Repository.getValidSrc20TxFromDb(params);
  }

  static async getLastBlock() {
    return await BlockService.getLastBlock();
  }

  static async getSrc20MintProgressByTick(tick: string) {
    return await Src20Service.getSrc20MintProgressByTick(tick);
  }

  static async getTickData(params: {
    tick: string;
    limit: number;
    page: number;
    op?: string | string[];
    sortBy?: string;
  }) {
    const [src20_txs, totalResult, lastBlock, mint_status] = await Promise.all([
      this.getValidSrc20Tx(params),
      this.getTotalCountValidSrc20Tx({ tick: params.tick, op: params.op }),
      this.getLastBlock(),
      this.getSrc20MintProgressByTick(params.tick),
    ]);

    const total = totalResult;
    return { src20_txs, total, lastBlock, mint_status };
  }

  static async getUploadData(params: {
    op: string;
    limit: number;
    page: number;
  }) {
    const [data, totalResult, lastBlock] = await Promise.all([
      this.getValidSrc20Tx(params),
      this.getTotalCountValidSrc20Tx({ op: params.op }),
      this.getLastBlock(),
    ]);

    const total = totalResult;
    return { data, total, lastBlock };
  }

  static async handleDeploymentRequest(tick: string, req: Request) {
    try {
      const [deploymentData, mintStatusData, lastBlockData] = await Promise.all(
        [
          this.handleSrc20TransactionsRequest(req, {
            tick: [tick],
            op: "DEPLOY",
            limit: 1,
            page: 1,
          }),
          this.handleSrc20MintProgressRequest(tick).catch(() => null),
          this.handleSrc20TransactionsRequest(req, {
            limit: 1,
            page: 1,
            sortBy: "DESC",
          }),
        ],
      );

      // If deploymentData is empty, it means the tick doesn't exist
      if (!deploymentData.data || deploymentData.data.length === 0) {
        return {
          last_block: lastBlockData.last_block,
          mint_status: null,
          data: null,
        };
      }

      return {
        last_block: lastBlockData.last_block,
        mint_status: mintStatusData,
        data: {
          ...deploymentData.data[0],
          tick: convertToEmoji(deploymentData.data[0].tick),
        },
      };
    } catch (error) {
      console.error("Error in handleDeploymentRequest:", error);
      throw error;
    }
  }

  static async handleTickPageRequest(tick: string) {
    try {
      const balanceParams = {
        tick,
        sortBy: "DESC",
        includePagination: false,
      };

      const [
        balanceResponse,
        mintProgressResponse,
        allSrc20DataResponse,
      ] = await Promise.all([
        this.handleSrc20BalanceRequest(balanceParams),
        this.handleSrc20MintProgressRequest(tick),
        this.handleAllSrc20DataForTickRequest(tick),
      ]);

      // Check if deployment is null
      if (!allSrc20DataResponse || !allSrc20DataResponse.deployment) {
        throw new Error(`Deployment data not found for tick: ${tick}`);
      }

      const { deployment, total_mints, total_transfers } = allSrc20DataResponse;

      const totalCount = total_transfers + total_mints;

      return {
        last_block: balanceResponse.last_block,
        deployment,
        total_transfers,
        total_mints,
        total_holders: Array.isArray(balanceResponse.data)
          ? balanceResponse.data.length
          : 0,
        holders: Array.isArray(balanceResponse.data)
          ? balanceResponse.data.map((row) => {
            const amt = this.formatAmount(row.amt || "0");
            const totalMinted = this.formatAmount(
              mintProgressResponse?.total_minted || "1",
            );
            const percentage = this.calculatePercentage(amt, totalMinted);
            return { ...row, amt, percentage };
          })
          : [],
        mint_status: {
          ...mintProgressResponse,
          max_supply: mintProgressResponse?.max_supply?.toString() || "0",
          total_minted: mintProgressResponse?.total_minted?.toString() || "0",
          limit: mintProgressResponse?.limit?.toString() || "0",
        },
        total_transactions: totalCount,
      };
    } catch (error) {
      console.error("Error in handleTickPageRequest:", error);
      // Optionally, you can throw an error or return a default response
      throw error;
    }
  }

  private static formatAmount(value: string): string {
    const [whole, decimal = ""] = value.replace(/^0+/, "").split(".");
    const trimmedDecimal = decimal.replace(/0+$/, "");
    return trimmedDecimal ? `${whole}.${trimmedDecimal}` : whole;
  }

  private static calculatePercentage(amount: string, total: string): string {
    const amountNum = parseFloat(amount.replace(/,/g, ""));
    const totalNum = parseFloat(total.replace(/,/g, ""));
    if (totalNum === 0) return "0.00";
    const percentage = (amountNum / totalNum) * 100;
    return percentage.toFixed(2);
  }

  static async fetchSrc20DetailsWithHolders(
    req: Request,
    params: SRC20TrxRequestParams,
    excludeFullyMinted: boolean = false,
  ) {
    try {
      const [resultData, marketData] = await Promise.all([
        this.handleSrc20TransactionsRequest(req, params, excludeFullyMinted),
        Src20MktService.fetchMarketListingSummary(),
      ]);

      const marketDataMap = new Map<string, MarketListingSummary>(
        marketData.map((item) => [item.tick, item]),
      );

      const enrichedData = [];

      for (const row of resultData.data) {
        const balanceParams: SRC20BalanceRequestParams = {
          tick: row.tick,
          includePagination: true,
        };
        const balanceResult = await this.handleSrc20BalanceRequest(
          balanceParams,
        );

        const marketInfo = marketDataMap.get(row.tick) || {
          mcap: 0,
          floor_unit_price: 0,
        };

        // Fetch mint progress data
        const mintProgress = await this.handleSrc20MintProgressRequest(
          row.tick,
        );
        const progress = mintProgress ? mintProgress.progress : null;

        enrichedData.push({
          ...row,
          holders: balanceResult.total,
          mcap: marketInfo.mcap,
          floor_unit_price: Number(
            marketInfo.floor_unit_price.toFixed(10),
          ),
          progress,
        });
      }

      // Use total from resultData, which now correctly reflects the total items
      const total = resultData.total;
      const limit = params.limit || 50;
      const page = params.page || 1;
      const totalPages = Math.ceil(total / limit);

      return {
        data: enrichedData,
        total,
        page,
        totalPages,
        limit,
      };
    } catch (error) {
      console.error("Error fetching SRC20 details with holders:", error);
      throw error;
    }
  }

  static async fetchTrendingTokens(
    req: Request,
    limit: number,
    page: number,
    transactionCount: number,
  ) {
    try {
      const trendingData = await Src20Service.fetchTrendingSrc20Data(
        limit,
        page,
        transactionCount,
      );

      const marketData = await Src20MktService.fetchMarketListingSummary();
      const marketDataMap = new Map<string, MarketListingSummary>(
        marketData.map((item) => [item.tick, item]),
      );

      const enrichedData = [];

      for (const row of trendingData.data) {
        const balanceParams: SRC20BalanceRequestParams = {
          tick: row.tick,
          includePagination: true,
        };
        const balanceResult = await this.handleSrc20BalanceRequest(
          balanceParams,
        );

        const marketInfo = marketDataMap.get(row.tick) || {
          mcap: 0,
          floor_unit_price: 0,
        };

        // Fetch mint progress data
        const mintProgress = await this.handleSrc20MintProgressRequest(
          row.tick,
        );
        const progress = mintProgress ? mintProgress.progress : null;

        enrichedData.push({
          ...row,
          holders: balanceResult.total,
          mcap: marketInfo.mcap,
          floor_unit_price: Number(marketInfo.floor_unit_price.toFixed(10)),
          progress,
          mint_count: row.mint_count,
          total_minted: mintProgress?.total_minted || "0",
          max_supply: mintProgress?.max_supply || "0",
        });
      }

      const total = trendingData.total;
      const totalPages = Math.ceil(total / limit);

      return {
        data: enrichedData,
        total,
        page,
        totalPages,
        limit,
      };
    } catch (error) {
      console.error("Error fetching trending SRC20 tokens:", error);
      throw error;
    }
  }
}

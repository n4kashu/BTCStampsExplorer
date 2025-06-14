// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_v2_balance_address_ from "./routes/api/v2/balance/[address].ts";
import * as $api_v2_balance_getStampsBalance from "./routes/api/v2/balance/getStampsBalance.ts";
import * as $api_v2_block_block_index_ from "./routes/api/v2/block/[block_index].ts";
import * as $api_v2_block_block_count_number_ from "./routes/api/v2/block/block_count/[...number].ts";
import * as $api_v2_block_related_block_index_ from "./routes/api/v2/block/related/[block_index].ts";
import * as $api_v2_cursed_id_ from "./routes/api/v2/cursed/[id].ts";
import * as $api_v2_cursed_block_block_index_ from "./routes/api/v2/cursed/block/[block_index].ts";
import * as $api_v2_cursed_index from "./routes/api/v2/cursed/index.ts";
import * as $api_v2_olga_mint from "./routes/api/v2/olga/mint.ts";
import * as $api_v2_src20_balance_address_ from "./routes/api/v2/src20/balance/[address].ts";
import * as $api_v2_src20_balance_address_tick_ from "./routes/api/v2/src20/balance/[address]/[tick].ts";
import * as $api_v2_src20_balance_snapshot_tick_ from "./routes/api/v2/src20/balance/snapshot/[tick].ts";
import * as $api_v2_src20_block_block_index_tick_ from "./routes/api/v2/src20/block/[block_index]/[tick].ts";
import * as $api_v2_src20_block_block_index_index from "./routes/api/v2/src20/block/[block_index]/index.ts";
import * as $api_v2_src20_create from "./routes/api/v2/src20/create.ts";
import * as $api_v2_src20_index from "./routes/api/v2/src20/index.ts";
import * as $api_v2_src20_tick_tick_deploy from "./routes/api/v2/src20/tick/[tick]/deploy.ts";
import * as $api_v2_src20_tick_tick_index from "./routes/api/v2/src20/tick/[tick]/index.ts";
import * as $api_v2_src20_tick_index from "./routes/api/v2/src20/tick/index.ts";
import * as $api_v2_src20_tx_tx_hash_ from "./routes/api/v2/src20/tx/[tx_hash].ts";
import * as $api_v2_stamps_id_ from "./routes/api/v2/stamps/[id].ts";
import * as $api_v2_stamps_balance_address_ from "./routes/api/v2/stamps/balance/[address].tsx";
import * as $api_v2_stamps_block_block_index_ from "./routes/api/v2/stamps/block/[block_index].ts";
import * as $api_v2_stamps_dispensers_id_ from "./routes/api/v2/stamps/dispensers/[id].ts";
import * as $api_v2_stamps_dispensers_index from "./routes/api/v2/stamps/dispensers/index.ts";
import * as $api_v2_stamps_ident_ident_ from "./routes/api/v2/stamps/ident/[ident].ts";
import * as $api_v2_stamps_index from "./routes/api/v2/stamps/index.ts";
import * as $block_id_ from "./routes/block/[id].tsx";
import * as $block_index from "./routes/block/index.tsx";
import * as $collection_index from "./routes/collection/index.tsx";
import * as $content_imgpath_ from "./routes/content/[...imgpath].tsx";
import * as $cursed_index from "./routes/cursed/index.tsx";
import * as $docs_index from "./routes/docs/index.tsx";
import * as $home_index from "./routes/home/index.tsx";
import * as $index from "./routes/index.tsx";
import * as $mint_index from "./routes/mint/index.tsx";
import * as $quicknode_getPrice from "./routes/quicknode/getPrice.ts";
import * as $s_id_ from "./routes/s/[...id].tsx";
import * as $src20_tick_ from "./routes/src20/[tick].tsx";
import * as $src20_index from "./routes/src20/index.tsx";
import * as $stamp_id_ from "./routes/stamp/[id].tsx";
import * as $stamp_index from "./routes/stamp/index.tsx";
import * as $upload_index from "./routes/upload/index.tsx";
import * as $wallet_address_ from "./routes/wallet/[address].tsx";
import * as $BlockSelector from "./islands/BlockSelector.tsx";
import * as $Footer from "./islands/Footer.tsx";
import * as $Header from "./islands/Header.tsx";
import * as $MempoolWeather from "./islands/MempoolWeather.tsx";
import * as $Navigator_navigator from "./islands/Navigator/navigator.tsx";
import * as $PageControl from "./islands/PageControl.tsx";
import * as $StampNavigator from "./islands/StampNavigator.tsx";
import * as $StampSearch from "./islands/StampSearch.tsx";
import * as $Toast_ToastComponent from "./islands/Toast/ToastComponent.tsx";
import * as $Toast_toast from "./islands/Toast/toast.tsx";
import * as $Wallet_ConnectWallet from "./islands/Wallet/ConnectWallet.tsx";
import * as $Wallet_ConnectedModal from "./islands/Wallet/ConnectedModal.tsx";
import * as $Wallet_ConnectorsModal from "./islands/Wallet/ConnectorsModal.tsx";
import * as $Wallet_WalletModal from "./islands/Wallet/WalletModal.tsx";
import * as $Wallet_connectors_Wallet_connector from "./islands/Wallet/connectors/Wallet.connector.tsx";
import * as $block_BlockHeader from "./islands/block/BlockHeader.tsx";
import * as $block_BlockSelector from "./islands/block/BlockSelector.tsx";
import * as $collection_CollectionHeader from "./islands/collection/CollectionHeader.tsx";
import * as $home_HomeHeader from "./islands/home/HomeHeader.tsx";
import * as $hooks_useFeePolling from "./islands/hooks/useFeePolling.tsx";
import * as $mint_MintHeader from "./islands/mint/MintHeader.tsx";
import * as $mint_UploadImage from "./islands/mint/UploadImage.tsx";
import * as $src20_SRC20DeployTable from "./islands/src20/SRC20DeployTable.tsx";
import * as $src20_SRC20DetailsTab from "./islands/src20/SRC20DetailsTab.tsx";
import * as $src20_SRC20Header from "./islands/src20/SRC20Header.tsx";
import * as $stamp_StampNavigator from "./islands/stamp/StampNavigator.tsx";
import * as $stamp_StampSearch from "./islands/stamp/StampSearch.tsx";
import * as $upload_UploadImageHeader from "./islands/upload/UploadImageHeader.tsx";
import * as $upload_UploadImageTable from "./islands/upload/UploadImageTable.tsx";
import * as $upload_UploadTickHeader from "./islands/upload/UploadTickHeader.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/v2/balance/[address].ts": $api_v2_balance_address_,
    "./routes/api/v2/balance/getStampsBalance.ts":
      $api_v2_balance_getStampsBalance,
    "./routes/api/v2/block/[block_index].ts": $api_v2_block_block_index_,
    "./routes/api/v2/block/block_count/[...number].ts":
      $api_v2_block_block_count_number_,
    "./routes/api/v2/block/related/[block_index].ts":
      $api_v2_block_related_block_index_,
    "./routes/api/v2/cursed/[id].ts": $api_v2_cursed_id_,
    "./routes/api/v2/cursed/block/[block_index].ts":
      $api_v2_cursed_block_block_index_,
    "./routes/api/v2/cursed/index.ts": $api_v2_cursed_index,
    "./routes/api/v2/olga/mint.ts": $api_v2_olga_mint,
    "./routes/api/v2/src20/balance/[address].ts":
      $api_v2_src20_balance_address_,
    "./routes/api/v2/src20/balance/[address]/[tick].ts":
      $api_v2_src20_balance_address_tick_,
    "./routes/api/v2/src20/balance/snapshot/[tick].ts":
      $api_v2_src20_balance_snapshot_tick_,
    "./routes/api/v2/src20/block/[block_index]/[tick].ts":
      $api_v2_src20_block_block_index_tick_,
    "./routes/api/v2/src20/block/[block_index]/index.ts":
      $api_v2_src20_block_block_index_index,
    "./routes/api/v2/src20/create.ts": $api_v2_src20_create,
    "./routes/api/v2/src20/index.ts": $api_v2_src20_index,
    "./routes/api/v2/src20/tick/[tick]/deploy.ts":
      $api_v2_src20_tick_tick_deploy,
    "./routes/api/v2/src20/tick/[tick]/index.ts": $api_v2_src20_tick_tick_index,
    "./routes/api/v2/src20/tick/index.ts": $api_v2_src20_tick_index,
    "./routes/api/v2/src20/tx/[tx_hash].ts": $api_v2_src20_tx_tx_hash_,
    "./routes/api/v2/stamps/[id].ts": $api_v2_stamps_id_,
    "./routes/api/v2/stamps/balance/[address].tsx":
      $api_v2_stamps_balance_address_,
    "./routes/api/v2/stamps/block/[block_index].ts":
      $api_v2_stamps_block_block_index_,
    "./routes/api/v2/stamps/dispensers/[id].ts": $api_v2_stamps_dispensers_id_,
    "./routes/api/v2/stamps/dispensers/index.ts":
      $api_v2_stamps_dispensers_index,
    "./routes/api/v2/stamps/ident/[ident].ts": $api_v2_stamps_ident_ident_,
    "./routes/api/v2/stamps/index.ts": $api_v2_stamps_index,
    "./routes/block/[id].tsx": $block_id_,
    "./routes/block/index.tsx": $block_index,
    "./routes/collection/index.tsx": $collection_index,
    "./routes/content/[...imgpath].tsx": $content_imgpath_,
    "./routes/cursed/index.tsx": $cursed_index,
    "./routes/docs/index.tsx": $docs_index,
    "./routes/home/index.tsx": $home_index,
    "./routes/index.tsx": $index,
    "./routes/mint/index.tsx": $mint_index,
    "./routes/quicknode/getPrice.ts": $quicknode_getPrice,
    "./routes/s/[...id].tsx": $s_id_,
    "./routes/src20/[tick].tsx": $src20_tick_,
    "./routes/src20/index.tsx": $src20_index,
    "./routes/stamp/[id].tsx": $stamp_id_,
    "./routes/stamp/index.tsx": $stamp_index,
    "./routes/upload/index.tsx": $upload_index,
    "./routes/wallet/[address].tsx": $wallet_address_,
  },
  islands: {
    "./islands/BlockSelector.tsx": $BlockSelector,
    "./islands/Footer.tsx": $Footer,
    "./islands/Header.tsx": $Header,
    "./islands/MempoolWeather.tsx": $MempoolWeather,
    "./islands/Navigator/navigator.tsx": $Navigator_navigator,
    "./islands/PageControl.tsx": $PageControl,
    "./islands/StampNavigator.tsx": $StampNavigator,
    "./islands/StampSearch.tsx": $StampSearch,
    "./islands/Toast/ToastComponent.tsx": $Toast_ToastComponent,
    "./islands/Toast/toast.tsx": $Toast_toast,
    "./islands/Wallet/ConnectWallet.tsx": $Wallet_ConnectWallet,
    "./islands/Wallet/ConnectedModal.tsx": $Wallet_ConnectedModal,
    "./islands/Wallet/ConnectorsModal.tsx": $Wallet_ConnectorsModal,
    "./islands/Wallet/WalletModal.tsx": $Wallet_WalletModal,
    "./islands/Wallet/connectors/Wallet.connector.tsx":
      $Wallet_connectors_Wallet_connector,
    "./islands/block/BlockHeader.tsx": $block_BlockHeader,
    "./islands/block/BlockSelector.tsx": $block_BlockSelector,
    "./islands/collection/CollectionHeader.tsx": $collection_CollectionHeader,
    "./islands/home/HomeHeader.tsx": $home_HomeHeader,
    "./islands/hooks/useFeePolling.tsx": $hooks_useFeePolling,
    "./islands/mint/MintHeader.tsx": $mint_MintHeader,
    "./islands/mint/UploadImage.tsx": $mint_UploadImage,
    "./islands/src20/SRC20DeployTable.tsx": $src20_SRC20DeployTable,
    "./islands/src20/SRC20DetailsTab.tsx": $src20_SRC20DetailsTab,
    "./islands/src20/SRC20Header.tsx": $src20_SRC20Header,
    "./islands/stamp/StampNavigator.tsx": $stamp_StampNavigator,
    "./islands/stamp/StampSearch.tsx": $stamp_StampSearch,
    "./islands/upload/UploadImageHeader.tsx": $upload_UploadImageHeader,
    "./islands/upload/UploadImageTable.tsx": $upload_UploadImageTable,
    "./islands/upload/UploadTickHeader.tsx": $upload_UploadTickHeader,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;

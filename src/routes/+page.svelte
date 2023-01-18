<script lang="ts">
  import { contracts, account, contract } from "$lib/svark";
  import LUSD_ABI from "$lib/data/LUSD_ABI.json";
  import YEARN_ABI from "$lib/data/YEARN_ABI.json";
  import Approve from "$lib/components/Approve.svelte";

  contract("LUSD", {
    contractAddress: import.meta.env.VITE_LUSD_CONTRACT,
    abi: LUSD_ABI,
    providerOrAccount: $account.account
  });
  contract("yearnLUSD", {
    contractAddress: import.meta.env.VITE_YEARN_CONTRACT,
    abi: YEARN_ABI,
    providerOrAccount: $account.account
  });
</script>

<h1>Chicken bonds</h1>

<p>
  Hello, {$account.address.substring(0, 4)}...{$account.address.slice(-5)}
</p>
<p>
  To begin, you'll have to authorize the smart contracts to manage your LUSD,
  and yearn LUSD. You can specify how much LUSD is controlled by the contract.
</p>
<Approve contract={$contracts.LUSD} name="LUSD" />
<Approve contract={$contracts.yearnLUSD} name="Yearn" />

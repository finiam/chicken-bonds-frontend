<script lang="ts">
  import accountStore from "$lib/svark/accountStore";
  import { number } from "starknet";
  import { parseInputAmountToUint256 } from "$lib/utils/parseInputAmountToUint256";
  import contractsStore from "$lib/svark/contractsStore";

  const lusdCt = $contractsStore.LUSD;
  const yearnCt = $contractsStore.yearnLUSD;

  async function approveLUSD() {
    const spender = number.toFelt($accountStore.address);
    const amount = parseInputAmountToUint256("0");

    $lusdCt.approve(spender, amount);
  }

  async function approveYearnLUSD() {
    const spender = number.toFelt($accountStore.address);
    const amount = parseInputAmountToUint256("0");

    $yearnCt.approve(spender, amount);
  }
</script>

<p>
  To begin, you'll have to authorize the smart contracts to manage your LUSD,
  and yearn LUSD. You can specify how much LUSD is controlled by the contract.
</p>
<button on:click={approveLUSD}>Approve LUSD</button>
<button on:click={approveYearnLUSD}>Approve yearn LUSD</button>

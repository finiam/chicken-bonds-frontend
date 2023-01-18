<script lang="ts">
  let inputAmount: number;

</script>

<div>
  <h2 class="text-2xl">Create new bond</h2>

  <form>
    <input
      type="number"
      name="amount"
      bind:value={inputAmount}
      class="border border-gray-600"
    />
    <button type="submit">Create</button>
  </form>
</div>

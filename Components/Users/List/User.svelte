<script lang="ts">
  import { getProfilePicture } from "$ts/stores/pfp";
  import { PartialUser } from "$types/user";
  import { onMount } from "svelte";

  export let user: PartialUser;

  let url = "";

  onMount(() => {
    url = getProfilePicture(user.acc.profilePicture);
  });
</script>

<div class="user">
  <img src={url} alt={user.username} />
  <span class="username">{user.username}</span>
</div>

<script lang="ts">
  import ProfilePicture from "$lib/Components/ProfilePicture.svelte";
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
  <ProfilePicture src={url} height={24} />
  <span class="username">{user.username}</span>
</div>

<script>
  import SettingsOption from "$apps/Settings/Components/SettingsOption.svelte";
  import { UserDataStore } from "$ts/stores/user";
</script>

<div class="top security-settings">
  <h2 class="title">Security Settings</h2>
  <p>
    The ArcOS Secure Context is put in place to protect you from performing unwanted operations. It
    asks for<br />
    your confirmation when performing elevated operations, like managing services, and stopping processes.<br
    /><br />
    We recommend leaving it on it's default settings for the best security.
  </p>
  <hr />
  <SettingsOption
    title="Disable elevation"
    context="Completely disable operations that require elevation"
  >
    <input type="checkbox" class="switch" bind:checked={$UserDataStore.sh.elevationDisabled} />
  </SettingsOption>
  <SettingsOption
    title="Don't ask for password"
    context="Don't require a password to approve an elevation request"
  >
    <input
      type="checkbox"
      class="switch"
      bind:checked={$UserDataStore.sh.securityNoPassword}
      disabled={$UserDataStore.sh.elevationDisabled}
    />
  </SettingsOption>
</div>
<div class="toolbar" />

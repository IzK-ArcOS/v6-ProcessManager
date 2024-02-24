<script lang="ts">
  import SettingsOption from "$apps/Settings/Components/SettingsOption.svelte";
  import { GetUserElevation } from "$ts/elevation";
  import { SecurityHighIcon, SecurityLowIcon, SecurityMediumIcon } from "$ts/images/general";
  import { LockIcon } from "$ts/images/power";
  import { ElevationEnableBypass } from "$ts/stores/elevation";
  import { ProcessStack } from "$ts/stores/process";
  import { UserDataStore } from "$ts/stores/user";

  async function disableElevation() {
    const permitted = await GetUserElevation(ElevationEnableBypass(), ProcessStack);

    if (permitted) {
      $UserDataStore.sh.bypassElevation = true;
    }
  }

  function enableElevation() {
    $UserDataStore.sh.bypassElevation = false;
  }
</script>

<div class="top security-settings">
  <h2
    class="title"
    class:bypass={$UserDataStore.sh.bypassElevation}
    class:nopass={$UserDataStore.sh.securityNoPassword}
    class:lockdown={$UserDataStore.sh.elevationDisabled}
  >
    <span
      >Security - {$UserDataStore.sh.bypassElevation
        ? "Inadvisable configuration"
        : $UserDataStore.sh.elevationDisabled
          ? "In lockdown"
          : $UserDataStore.sh.securityNoPassword
            ? "Mildly insecure"
            : "Recommended configuration"}
    </span>
    <img
      src={$UserDataStore.sh.bypassElevation
        ? SecurityHighIcon
        : $UserDataStore.sh.elevationDisabled
          ? LockIcon
          : $UserDataStore.sh.securityNoPassword
            ? SecurityMediumIcon
            : SecurityLowIcon}
      alt=""
    />
  </h2>
  <p>
    The ArcOS Secure Context is put in place to protect you from performing unwanted operations. It
    asks for<br />
    your confirmation when performing elevated operations, like managing services, and stopping processes.<br
    /><br />
    We recommend leaving it on it's default settings for the best security.
  </p>
  <SettingsOption
    title="{$UserDataStore.sh.bypassElevation ? 'Re-enable' : 'Disable'} elevation"
    context={$UserDataStore.sh.bypassElevation
      ? "Elevation is currently DISABLED. This allows any application from performing elevated operations without asking you for permission first. <b>We recommend that you re-enable elevation</b>."
      : "Disabling elevation allows all elevated operations from running without your permission. <b>We recommend that you leave elevation ENABLED.</b>"}
    className="bypass {$UserDataStore.sh.bypassElevation}"
  >
    {#if $UserDataStore.sh.bypassElevation}
      <button class="enable" on:click={enableElevation}>Enable elevation</button>
    {:else}
      <button
        class="disable"
        on:click={disableElevation}
        disabled={$UserDataStore.sh.elevationDisabled}>Disable elevation</button
      >
    {/if}
  </SettingsOption>
  <SettingsOption
    title="Lock down elevation"
    context="Completely prevent any operations that require elevation"
    disabled={$UserDataStore.sh.bypassElevation}
  >
    <input
      type="checkbox"
      class="switch"
      disabled={$UserDataStore.sh.bypassElevation}
      bind:checked={$UserDataStore.sh.elevationDisabled}
    />
  </SettingsOption>
  <SettingsOption
    title="Don't ask for password"
    context="Don't require a password to approve an elevation request"
    disabled={$UserDataStore.sh.elevationDisabled || $UserDataStore.sh.bypassElevation}
  >
    <input
      type="checkbox"
      class="switch"
      bind:checked={$UserDataStore.sh.securityNoPassword}
      disabled={$UserDataStore.sh.elevationDisabled || $UserDataStore.sh.bypassElevation}
    />
  </SettingsOption>
</div>

<script lang="ts">
    export let direction: "horizontal" | "vertical";
</script>

<div class="flex {direction}">
    <div class="child">
        <slot name="alpha"></slot>
    </div>
    <div class="child">
        <slot name="beta"></slot>
    </div>
</div>

<style>
    .flex {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .horizontal {
        flex-direction: row;
    }

    .vertical {
        flex-direction: column;
    }

    .child {
        flex: 1;
    }
</style>

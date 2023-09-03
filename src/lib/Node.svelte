<script lang="ts">
    export let direction: "horizontal" | "vertical";
</script>

<div class="flex {direction}">
    <div class="child">
        <slot name="alpha"></slot>
    </div>
    <div class="sash sash-{direction}"></div>
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

    .sash {
        background-color: #ccc;
    }

    .sash-horizontal {
        width: 4px;
        height: 100%;
        cursor: ew-resize;
    }

    .sash-vertical {
        height: 4px;
        width: 100%;
        cursor: ns-resize;
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

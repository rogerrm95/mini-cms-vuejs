<template>
    <div class="load">
        <img src="@/assets/loading.gif" alt="Loading">
    </div>
</template>

<script>
export default {
    name:'Loading'
}
</script>

<style>
.load{
    grid-area: content;
    display: flex;
    align-items: center;
    justify-content: center
}
</style>
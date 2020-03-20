<template>
  <footer class="footer">
    ©2020 Copyright
    <strong class="strong"> Rogério Marques </strong>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style>

.footer {
    grid-area: footer;
    background-color: rgb(82, 81, 81);
    color: white;

    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: flex-end;
    padding-right: 10px;
    letter-spacing: 3px;
    font-size: 1rem;
}
@media (max-width: 600px){ .footer{flex-direction: column; font-size: 0.8rem;} }

.strong{
  margin-left: 7px;
}
</style>
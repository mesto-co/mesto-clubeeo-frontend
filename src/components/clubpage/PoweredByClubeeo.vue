<template>
  <div class='powered-by-clubeeo'>
    <slot>
      powered by <a href='https://clubeeo.com' target='_blank'>clubeeo.com</a>
    </slot>
  </div>
</template>

<style lang='scss'>

.powered-by-clubeeo {
  padding: 0 0 10px;
  font-size: 0.7rem;
  text-align: center;

  a {
    color: inherit;
  }
}

</style>
